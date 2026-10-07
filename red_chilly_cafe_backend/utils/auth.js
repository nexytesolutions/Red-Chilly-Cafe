
async function authenticate(request, reply) {
  console.log(request.headers.origin)
  try {
    
      // Verify the JWT
      await request.jwtVerify();

      // Re-sign the JWT to refresh expiration
      const { iat, exp, ...freshPayload } = request.user;
      const token = reply.server.jwt.sign(freshPayload);

      // Refresh the cookies
      reply
        .setCookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "None",
          path: "/",
          maxAge: 60 * 60 * 24, // 24 hours in seconds
          signed: true,
        });
    return;
  } catch (err) {
    request.log.warn({ err }, "Authentication failed");
    return reply.code(401).send({ error: "Unauthorized" });
  }
}


module.exports = { authenticate };
