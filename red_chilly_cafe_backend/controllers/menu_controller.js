
const menu_model = require("../models/menu_model");
const { generateId } = require("../utils/id");

function create_menu(req, reply) {
    let { menu } = req.body;
    try {
        let menu_id = generateId(7);
        for (let i = 0; i < 3; i++) {
            const is_id_exists = menu_model.get_menu_by_menu_id(menu_id);
            if (!is_id_exists) break;
            menu_id = generateId(7);
        }
        menu.menu_id = menu_id;
        menu.regular_price_in_subunits = Math.round(menu.regular_price * 100);
        menu.large_price_in_subunits = Math.round(menu.large_price * 100);
        menu_model.create_menu(menu);
        return reply.code(201).send({ message: "Menu Created Successfully", menu_id });
    } catch (err) {
        if (err.code === "SQLITE_CONSTRAINT_UNIQUE") {
            return reply.code(409).send({ error: "Menu Already Exists" });
        }
        console.error("❌ DB Error:", err && err.message);
        return reply.code(500).send({ error: "Internal server error" });
    }
}

function update_menu(req, reply) {
    const { menu } = req.body;
    try {
        menu.regular_price_in_subunits = Math.round(menu.regular_price * 100);
        menu.large_price_in_subunits = Math.round(menu.large_price * 100);
        menu_model.update_menu(menu);
        return reply.code(201).send({ message: "Menu Updated Successfully" });
    } catch (err) {
        if (err.code === "SQLITE_CONSTRAINT_UNIQUE") {
            return reply.code(409).send({ error: "Menu Already Exists" });
        }
        console.error("❌ DB Error:", err && err.message);
        return reply.code(500).send({ error: "Internal server error" });
    }
}

function delete_menu(req, reply) {
    if (typeof req.params.menu_id !== "string" || req.params.menu_id.length !== 7) {
        return reply.code(400).send({ error: "Invalid Menu ID" });
    }
    try {
        const result = menu_model.delete_menu(req.params.menu_id);
        if (result.changes === 0) return reply.code(404).send({ error: "Menu Not Found" });
        return reply.code(200).send({ message: "Menu Deleted Successfully" });
    } catch (err) {
        console.error("❌ DB Error:", err && err.message);
        return reply.code(500).send({ error: "Internal server error" });
    }
}

function get_all_menus(req, reply) {
    try {
        const menus = menu_model.get_all_menus();
        return reply.code(200).send({ menus });
    } catch (err) {
        console.error("❌ DB Error:", err && err.message);
        return reply.code(500).send({ error: "Internal server error" });
    }
}
module.exports = {
    create_menu,
    get_all_menus,
    update_menu,
    delete_menu
};