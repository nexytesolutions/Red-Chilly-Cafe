
const { db } = require("../database/db");

function get_category_by_category_id(category_id) {
    const stmt = db.prepare(`SELECT * FROM categories WHERE category_id = ? LIMIT 1`);
    const row = stmt.get(category_id);
    return row;
}

function get_category_by_name(name) {
    const stmt = db.prepare(`SELECT * FROM categories WHERE name = ? LIMIT 1`);
    const row = stmt.get(name);
    return row;
}

function get_all_categories() {
    const stmt = db.prepare(`SELECT *
FROM categories`);

    const rows = stmt.all();
    return rows;
}

module.exports = {
    get_category_by_category_id,
    get_all_categories,
    get_category_by_name
};