const { customAlphabet } = require("nanoid");

function generate_password(size) {
  const nanoid = customAlphabet(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>/?",
    size,
  );
  return nanoid();
}
function generate_otp(size) {
  const nanoid = customAlphabet(
    "0123456789",
    size,
  );
  return nanoid();
}
function generateId(size) {
  const nanoid = customAlphabet(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>/?~",
    size,
  );
  return nanoid();
}
// for (let index = 0; index < 7; index++) {
  
// }
//   console.log(generateId(7));

module.exports = { generateId, generate_password, generate_otp };
