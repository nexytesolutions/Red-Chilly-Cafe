const review_controller = require("../controllers/review_controller");
const review_validation = require("../validations/review_validation");

async function review_routes(fastify) {
    fastify.get("/", review_controller.get_all_reviews);
    fastify.post("/", {
        preValidation: [fastify.authenticate], // ✅ auth middleware
        preHandler: review_validation.create_review_validation,
        handler: review_controller.create_review,
    });
    fastify.put("/:review_id/status", {
        preValidation: [fastify.authenticate], // ✅ auth middleware
        preHandler: review_validation.update_review_status_validation,
        handler: review_controller.update_review_status,
    });
    fastify.delete("/:review_id", {
        preValidation: [fastify.authenticate], // ✅ auth middleware
        preHandler: review_validation.delete_review_validation,
        handler: review_controller.delete_review,
    });
}

module.exports = review_routes;