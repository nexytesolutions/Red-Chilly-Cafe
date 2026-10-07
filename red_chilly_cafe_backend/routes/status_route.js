
const status_controller = require("../controllers/status_controller");


async function status_routes(fastify, options) {
    const get_all_statuses_opts = {
        handler: status_controller.get_all_statuses,
    };
   
    fastify.get("/", get_all_statuses_opts);

}

module.exports = status_routes;