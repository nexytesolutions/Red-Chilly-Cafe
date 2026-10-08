
const menu_controller = require("../controllers/menu_controller");
const menu_validation = require("../validations/menu_validation")


async function menu_routes(fastify, options) {
    const create_menu_opts = {
        preValidation: [fastify.authenticate], // ✅ auth middleware
        preHandler: menu_validation.create_menu_validation,
        handler: menu_controller.create_menu
    };
    const update_menu_opts = {
        preValidation: [fastify.authenticate], // ✅ auth middleware
        preHandler: menu_validation.update_menu_validation,
        handler: menu_controller.update_menu
    };
    const delete_menu_opts = {
                preValidation: [fastify.authenticate], // ✅ auth middleware
        handler: menu_controller.delete_menu
    };
    const get_all_menus_opts = {
        // preValidation: [fastify.authenticate], // ✅ auth middleware
        handler: menu_controller.get_all_menus,
    };
    fastify.post("/", create_menu_opts);
    fastify.put("/", update_menu_opts);
    fastify.delete("/:menu_id", delete_menu_opts);
    fastify.get("/", get_all_menus_opts);

}

module.exports = menu_routes;