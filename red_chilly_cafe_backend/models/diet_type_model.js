
const { db } = require("../database/db");

function get_diet_type_by_diet_type_id(diet_type_id) {
    const stmt = db.prepare(`SELECT * FROM diet_types WHERE diet_type_id = ? LIMIT 1`);
    const row = stmt.get(diet_type_id);
    return row;
}

function get_diet_type_by_name(name) {
    const stmt = db.prepare(`SELECT * FROM diet_types WHERE name = ? LIMIT 1`);
    const row = stmt.get(name);
    return row;
}

function get_all_diet_types() {
    const stmt = db.prepare(`SELECT * FROM diet_types`);

    const rows = stmt.all();
    return rows;
}

module.exports = {
    get_diet_type_by_diet_type_id,
    get_all_diet_types,
    get_diet_type_by_name
};