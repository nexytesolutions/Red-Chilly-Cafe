
const category_controller = require("../controllers/category_controller");


async function category_routes(fastify, options) {
    const get_all_categories_opts = {
        handler: category_controller.get_all_categories,
    };
   
    fastify.get("/", get_all_categories_opts);

}

module.exports = category_routes;