const { db } = require("../database/db");

function sign_up(password) {
    const stmt = db.prepare(`INSERT INTO users (id, username, password) VALUES (1, 'admin', ?);`);
    const info = stmt.run(password);
    return info.lastInsertRowid;
}

function get_password(username) {
  const get_user = db.prepare("SELECT * FROM users WHERE username = ? LIMIT 1");
  const user = get_user.get(username);
   return user;
}



module.exports = {
  get_password,
  sign_up
};
