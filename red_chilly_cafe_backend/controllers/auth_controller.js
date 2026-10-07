const auth_model = require("../models/auth_model");
const { generate_password } = require("../utils/id");
const bcrypt = require("bcrypt");

async function sign_up_controller() {

  const password = generate_password(8);
  const hashedPassword = await bcrypt.hash(
    password,
    Number(process.env.SALT_ROUNDS),
  );
  try {
    const result = auth_model.sign_up(
      hashedPassword,
    );
   console.log(password)
  } catch (err) {
    console.error("❌ DB Error:", err.message);
  }
}
// sign_up_controller();
async function login_controller(request, reply) {
  const fastify = reply.server;
  const user = request.body?.user;
  if (!user || typeof user !== "object" || Array.isArray(user) ||
    user.username !== "admin" || typeof user.password !== "string" ||
    user.password.length === 0 || Buffer.byteLength(user.password, "utf8") > 72) {
    return reply.code(400).send({ error: "Invalid login request" });
  }

  try {
    const result = auth_model.get_password(user.username);
    if (!result) {

      return reply.status(401).send({
        error: "Invalid Credentials",
      });
    }
    const match = await bcrypt.compare(user.password, result.password);
    if (match) {
      const token = fastify.jwt.sign({
        username: 'admin'
      });
      return reply
        .setCookie("token", token, {
          httpOnly: true,
          secure: true, //true in production
          sameSite: "None",
          path: "/",
          maxAge: 60 * 60 * 24, // 1 hour
          signed: true, // ✅ Sign the cookie
        })
        .setCookie("active", true, {
          httpOnly: false,
          secure: true,
          sameSite: "None",
          path: "/",
          maxAge: 60 * 60 * 24, // 24 hours in seconds
          signed: false,
        })
        .send({ success: true});
    } else {
      return reply.status(401).send({
        error: "Invalid Credentials",
      });
    }
  } catch (err) {
    console.error("❌ DB Error:", err);
    reply.status(500).send({ error: "Internal server error" });
  }
}

module.exports = {
  login_controller,
};
