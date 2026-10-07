const {
  login_controller
} = require("../controllers/auth_controller");

const login_opts = {
  handler: login_controller,
};

async function auth_routes(fastify, options) {
  fastify.post("/login", login_opts);
  fastify.get("/logout", async (request, reply) => {
    reply
      .clearCookie("token", { path: "/" })
      .clearCookie("active", { path: "/" })
      .code(200)
      .send({ success: true });
  });
}

module.exports = auth_routes;
