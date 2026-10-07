const menu_model = require("../models/menu_model");
const category_model = require("../models/category_model");
const diet_type_model = require("../models/diet_type_model");

async function create_menu_validation(req, reply) {
    const menu = req.body?.menu;
    if (!menu || typeof menu !== "object" || Array.isArray(menu)) {
        return reply.code(400).send({ error: "Menu Is Required" });
    }
    if (!validate_menu(reply, menu)) return;
    if (!is_menu_name_exists(reply, menu)) return;
}
async function update_menu_validation(req, reply) {
    const menu = req.body?.menu;
    if (!menu || typeof menu !== "object" || Array.isArray(menu)) {
        return reply.code(400).send({ error: "Menu Is Required" });
    }
    if (typeof menu.menu_id !== "string" || menu.menu_id.length !== 7) {
        return reply.code(400).send({ error: "Invalid Menu ID" });
    }
    if (!menu_model.get_menu_by_menu_id(menu.menu_id)) {
        return reply.code(404).send({ error: "Menu Not Found" });
    }
    if (!validate_menu(reply, menu)) return;
    if (!is_menu_name_exists(reply, menu)) return;
}

function validate_menu(reply, menu) {
    if (typeof menu.name !== "string" || !menu.name.trim() || menu.name.trim().length > 50) {
        return reply.code(400).send({ error: "Menu name must contain 1 to 50 characters" });
    }
    if (typeof menu.category_id !== "string" || menu.category_id.length !== 7 ||
        !category_model.get_category_by_category_id(menu.category_id)) {
        return reply.code(400).send({ error: "Invalid category" });
    }
    if (typeof menu.diet_type_id !== "string" || menu.diet_type_id.length !== 7 ||
        !diet_type_model.get_diet_type_by_diet_type_id(menu.diet_type_id)) {
        return reply.code(400).send({ error: "Invalid diet type" });
    }
    if (typeof menu.description !== "string" || !menu.description.trim() || menu.description.trim().length > 200) {
        return reply.code(400).send({ error: "Description must contain 1 to 200 characters" });
    }
    if (typeof menu.image_url !== "string" || menu.image_url.trim().length < 5 || menu.image_url.trim().length > 150) {
        return reply.code(400).send({ error: "Image URL must contain 5 to 150 characters" });
    }
    try {
        const imageUrl = new URL(menu.image_url.trim());
        if (imageUrl.protocol !== "http:" && imageUrl.protocol !== "https:") throw new Error();
    } catch {
        return reply.code(400).send({ error: "Image URL must be a valid HTTP or HTTPS URL" });
    }
    if (!isValidPrice(menu.regular_price) || !isValidPrice(menu.large_price)) {
        return reply.code(400).send({ error: "Prices must be valid amounts with at most two decimal places" });
    }
    if (menu.large_price < menu.regular_price) {
        return reply.code(400).send({ error: "Large price must be greater than or equal to regular price" });
    }

    menu.name = menu.name.trim();
    menu.description = menu.description.trim();
    menu.image_url = menu.image_url.trim();
    return true;
}

function isValidPrice(value) {
    if (typeof value !== "number" || !Number.isFinite(value) || value < 0 || value > 100000000) {
        return false;
    }
    return Math.abs(value * 100 - Math.round(value * 100)) < 1e-7;
}

function is_menu_name_exists(reply, menu) {
    const row = menu_model.get_menu_by_name(menu.name);
    if (row && row.menu_id !== menu.menu_id) {
        return reply.code(409).send({ error: "Menu Already Exists" });
    }
    return true;
}

function validate_menu_id(reply, menu_id) {
    if (typeof menu_id !== "string" || menu_id.length !== 7) {
        return reply.code(400).send({ error: "Invalid Menu ID" });
    }
    if (!menu_model.get_menu_by_menu_id(menu_id)) {
        return reply.code(404).send({ error: "Menu Not Found" });
    }
    return true;
}
module.exports = {
    create_menu_validation,
    update_menu_validation,
    validate_menu_id
};