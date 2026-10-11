
require("dotenv").config();

const path = require("path");
const fs = require("fs");
const pino = require("pino");

// Create a write stream to the log file
const logDir = path.join(__dirname, "logs");
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

// Set up logging
const logFileStream = pino.destination({
    dest: path.join(logDir, "app.log"),
    sync: false,
});
const fastify = require("fastify")({
    trustProxy: true,  // REQUIRED for X-Forwarded-For
    routerOptions: {
        ignoreTrailingSlash: true,
        maxParamLength: 40,
        caseSensitive: false,
    },
    bodyLimit: 1024,
    logger: {
        level: "trace",
        redact: ["req.headers.authorization", "req.body.password"],
        timestamp: pino.stdTimeFunctions.isoTime,
        stream: logFileStream,
    },
});

fastify.addHook("preHandler", async (request) => {
    request.log.trace(
        {
            method: request.method,
            url: request.url,
            headers: request.headers,
            ip: request.ip,
            body: request.body, // ✅ available here
        },
        "Incoming request with body",
    );
});

// Log response details
fastify.addHook("onResponse", async (request, reply) => {
    request.log.trace(
        {
            statusCode: reply.statusCode,
        },
        "Response sent",
    );
});
fastify.setErrorHandler((error, request, reply) => {
    request.log.error(
        {
            err: error,
            url: request.raw.url,
            method: request.raw.method,
            headers: request.headers,
            body: request.body,
        },
        "Unhandled error occurred",
    );
    if (error.code === 429) {
        // Customize your response here
        return reply
            .code(429)
            .send({
                error: error.error
            });
    }
    console.log(error)
    reply.code(500).send({ error: "Internal Server Error" });
});
fastify.register(require("@fastify/cors"), {
    origin: ["http://localhost:5173"], // Or restrict to specific origin
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
});

fastify.register(require("@fastify/cookie"), {
    secret: process.env.COOKIE_SECRET,
});

fastify.register(require("@fastify/jwt"), {
    secret: process.env.JWT_SECRET,
    cookie: {
        cookieName: "token",
        signed: true,
    },
    sign: { expiresIn: "24h" },
});

const rateLimit = require("@fastify/rate-limit");

fastify.register(rateLimit, {
    global: true, // applies to all routes
    hook: "preHandler",    // <-- FIX: cookies available
    max: 30,
    timeWindow: "1 minute",
    keyGenerator: (req) => {

        // 2️⃣ Cookies are parsed now
        if (req.cookies?.token) {
            req.log.trace(
                {
                    cookies: req.cookies// ✅ available here
                },
                "Incoming request with body",
            );
            return req.cookies.token;
        }

        // 1️⃣ Trust proxy is active, now this works
        const xff = req.headers["x-forwarded-for"];
        if (xff) {
            req.log.trace(
                {
                    xff// ✅ available here
                },
                "Incoming request with body",
            );
            return xff.split(",")[0].trim();
        }

        // 3️⃣ Fallback
        return req.ip;
    },
    errorResponseBuilder: () => ({
        code: 429,
        error: "Too Many Requests",
    }),
});

const helmet = require("@fastify/helmet");

fastify.register(helmet, {
    hidePoweredBy: true,
    frameguard: {
        action: "deny",
    },
    xssFilter: true, // Deprecated but included for older browser support
    noSniff: true,
    hsts: {
        maxAge: 86400,
        includeSubDomains: false,
    },
    crossOriginOpenerPolicy: false, // 👈 disable COOP completely
    ieNoOpen: true,
    permittedCrossDomainPolicies: true,
    contentSecurityPolicy: {
        directives: {
            //         defaultSrc: ["'self'", "data:", "https:", "*.yourdomain.com"],
            //         scriptSrc: ["'self'", "data:", "https:", "*.yourdomain.com"],
            // scriptSrc: ["'self'", "https://www.clarity.ms"],
            // connectSrc: ["'self'", "https://www.clarity.ms", "https://lh3.googleusercontent.com"], // 👈 Add this
            //         fontSrc: ["'self'", "data:", "https:", "*.yourdomain.com"],
            //         connectSrc: ["'self'", "https://api.yourdomain.com"],
            // imgSrc: ["'self'", "data:", "https://lh3.googleusercontent.com"],
            //         frameSrc: ["'self'", "data:", "https:"],
            // frameSrc: ["'self'", "https://www.youtube.com"],
            //         styleSrc: ["'self'", "data:", "https:"],
            //         objectSrc: ["'self'"],
            //         frameAncestors: ["'none'"],
            //         mediaSrc: ["'self'", "data:", "https:"],
            //         manifestSrc: ["'self'", "https:"],
            //         workerSrc: ["'self'"],
            //         formAction: ["'self'", "https:"],
        },
    },
});
// for ocr
// scriptSrc: ["'self'", "https://www.clarity.ms", "https://cdn.jsdelivr.net/", "'unsafe-eval'"],
//     connectSrc: ["'self'", "https://www.clarity.ms", "https://cdn.jsdelivr.net/", "data:", "blob:"], // 👈 Add this

const { authenticate } = require("./utils/auth");

fastify.decorate("authenticate", authenticate);

fastify.register(require("./routes/auth_route"), {prefix: "/auth"});
fastify.register(async function (api) {
    api.register(require("./routes/category_route"), { prefix: "/categories" });
    api.register(require("./routes/diet_type_route"), { prefix: "/diet_types" });
    api.register(require("./routes/menu_route"), { prefix: "/menus" });
    api.register(require("./routes/review_route"), { prefix: "/reviews" });
    api.register(require("./routes/status_route"), { prefix: "/statuses" });

}, { prefix: "/api" });

// fastify.get('/ping', async (_request, _reply) => {
//     return { message: 'pong' };
// });

const start = async () => {
    try {
        await fastify.listen({ port: process.env.PORT || 3000, host: "0.0.0.0" });
        console.log(
            `Server is running on http://localhost:${process.env.PORT || 3000}`,
        );
    } catch (err) {
        fastify.log.error("Failed to start server:", err);
        console.log(err);
        // Delay exit slightly to allow logging to flush
        setTimeout(() => process.exit(1), 100);
    }
};

start();
