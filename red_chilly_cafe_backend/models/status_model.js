
const { db } = require("../database/db");

function get_status_by_status_id(status_id) {
    const stmt = db.prepare(`SELECT * FROM statuses WHERE status_id = ? LIMIT 1`);
    const row = stmt.get(status_id);
    return row;
}

function get_status_by_name(name) {
    const stmt = db.prepare(`SELECT * FROM statuses WHERE name = ? LIMIT 1`);
    const row = stmt.get(name);
    return row;
}

function get_all_statuses() {
    const stmt = db.prepare(`SELECT *
FROM statuses`);

    const rows = stmt.all();
    return rows;
}

module.exports = {
    get_status_by_status_id,
    get_all_statuses,
    get_status_by_name
};