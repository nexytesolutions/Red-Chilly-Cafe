const review_model = require("../models/review_model");
const status_model = require("../models/status_model");

async function create_review_validation(req, reply) {
    const review = req.body?.review;
    if (!review || typeof review !== "object" || Array.isArray(review)) {
        return reply.code(400).send({ error: "Invalid review" });
    }

    if (typeof review.name !== "string" || typeof review.email !== "string" ||
        typeof review.description !== "string" || !Number.isInteger(review.rating)) {
        return reply.code(400).send({ error: "Invalid review" });
    }

    const name = review.name.trim();
    const email = review.email.trim().toLowerCase();
    const description = review.description.trim();
    if (!name || name.length > 50 || !email || email.length < 6 || email.length > 50 ||
        !/^\S+@\S+\.\S+$/.test(email) || !description || description.length > 200 ||
        review.rating < 1 || review.rating > 5) {
        return reply.code(400).send({ error: "Invalid review" });
    }
    if (review_model.get_review_by_email(email)) {
        return reply.code(409).send({ error: "A review already exists with this email" });
    }

    review.name = name;
    review.email = email;
    review.description = description;
}

async function update_review_status_validation(req, reply) {
    const reviewId = req.params?.review_id;
    const status = req.body?.status;
    if (typeof reviewId !== "string" || reviewId.length !== 7) {
        return reply.code(400).send({ error: "Invalid review ID" });
    }
    if (typeof status !== "string") {
        return reply.code(400).send({ error: "Invalid review status" });
    }
    if (!review_model.get_review_by_id(reviewId)) {
        return reply.code(404).send({ error: "Review Not Found" });
    }
    if (!status_model.get_status_by_name(status)) {
        return reply.code(400).send({ error: "Invalid review status" });
    }
}

async function delete_review_validation(req, reply) {
    const reviewId = req.params?.review_id;
    if (typeof reviewId !== "string" || reviewId.length !== 7) {
        return reply.code(400).send({ error: "Invalid review ID" });
    }
    if (!review_model.get_review_by_id(reviewId)) {
        return reply.code(404).send({ error: "Review Not Found" });
    }
}

module.exports = {
    create_review_validation,
    update_review_status_validation,
    delete_review_validation,
};
