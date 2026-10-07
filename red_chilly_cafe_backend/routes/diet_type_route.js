
const diet_type_controller = require("../controllers/diet_type_controller");


async function diet_type_routes(fastify, options) {
    const get_all_diet_types_opts = {
        handler: diet_type_controller.get_all_diet_types,
    };
   
    fastify.get("/", get_all_diet_types_opts);

}

module.exports = diet_type_routes;