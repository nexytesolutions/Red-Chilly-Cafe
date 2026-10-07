const review_controller = require("../controllers/review_controller");

async function review_routes(fastify) {
    fastify.get("/", review_controller.get_all_reviews);
    fastify.post("/", review_controller.create_review);
    fastify.put("/:review_id/status", review_controller.update_review_status);
    fastify.delete("/:review_id", review_controller.delete_review);
}

module.exports = review_routes;