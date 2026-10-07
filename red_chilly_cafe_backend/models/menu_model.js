
const { db } = require("../database/db");

function create_menu(menu) {

    try {
        const stmt = db.prepare(`
    INSERT INTO menus (
    menu_id,
    name,
    category_id,
    diet_type_id,
    description,
    image_url,
    regular_price_in_subunits,
    large_price_in_subunits
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);

        stmt.run(
            menu.menu_id,
            menu.name,
            menu.category_id,
            menu.diet_type_id,
            menu.description,
            menu.image_url,
            menu.regular_price_in_subunits,
            menu.large_price_in_subunits,
        );

    } catch (error) {
        throw new Error(error);

    }
}

function update_menu(menu) {
    let info;
    try {


        const stmt = db.prepare(`
        UPDATE menus
        SET
            name = ?,
            category_id = ?,
            diet_type_id = ?,
            description = ?,
            image_url = ?,
            regular_price_in_subunits = ?,
            large_price_in_subunits = ?
        WHERE menu_id = ?
    `);

        info = stmt.run(
            menu.name,
            menu.category_id,
            menu.diet_type_id,
            menu.description,
            menu.image_url,
            menu.regular_price_in_subunits,
            menu.large_price_in_subunits,
            menu.menu_id
        );
    } catch (error) {
        throw error
    }
    return info; // number of rows updated
}

function delete_menu(menu_id) {
    const stmt = db.prepare(`DELETE FROM menus WHERE menu_id = ?`);
    return stmt.run(menu_id);
}

function get_menu_by_menu_id(menu_id) {
    const stmt = db.prepare(`SELECT * FROM menus WHERE menu_id = ? LIMIT 1`);
    const row = stmt.get(menu_id);
    return row;
}

function get_menu_by_name(name) {
    const stmt = db.prepare(`SELECT * FROM menus WHERE name = ? LIMIT 1`);
    const row = stmt.get(name);
    return row;
}

function get_all_menus() {
    const stmt = db.prepare(` SELECT
    m.menu_id,
    m.name,
    m.description,
    m.image_url,
    m.regular_price_in_subunits,
    m.large_price_in_subunits,

    c.category_id,
    c.name AS category_name,

    d.diet_type_id,
    d.name AS diet_type_name

  FROM menus m

  INNER JOIN categories c
    ON c.category_id = m.category_id

  INNER JOIN diet_types d
    ON d.diet_type_id = m.diet_type_id`);

    const rows = stmt.all();
    return rows;
}

module.exports = {
    create_menu,
    update_menu,
    delete_menu,
    get_menu_by_menu_id,
    get_menu_by_name,
    get_all_menus
};