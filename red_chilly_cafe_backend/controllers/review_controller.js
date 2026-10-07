const review_model = require("../models/review_model");
const status_model = require("../models/status_model");
const { generateId } = require("../utils/id");

function get_all_reviews(req, reply) {
    try {
        return reply.code(200).send({ reviews: review_model.get_all_reviews() });
    } catch (err) {
        console.error("❌ DB Error:", err && err.message);
        return reply.code(500).send({ error: "Internal server error" });
    }
}

function create_review(req, reply) {
    const { review } = req.body || {};
    if (!review || typeof review.name !== "string" || typeof review.email !== "string" ||
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

    try {
        const pending = status_model.get_status_by_name("Pending");
        if (!pending) return reply.code(500).send({ error: "Pending review status is not configured" });
        let review_id = generateId(7);
        for (let attempt = 0; attempt < 3 && review_model.get_review_by_id(review_id); attempt++) {
            review_id = generateId(7);
        }
        review_model.create_review({
            review_id,
            name,
            email,
            status_id: pending.status_id,
            description,
            rating: review.rating
        });
        return reply.code(201).send({ message: "Review Created Successfully", review_id });
    } catch (err) {
        if (err.code === "SQLITE_CONSTRAINT_UNIQUE") {
            return reply.code(409).send({ error: "A review already exists with this email" });
        }
        console.error("❌ DB Error:", err && err.message);
        return reply.code(500).send({ error: "Internal server error" });
    }
}

function update_review_status(req, reply) {
    const { status } = req.body || {};
    if (typeof req.params.review_id !== "string" || req.params.review_id.length !== 7) {
        return reply.code(400).send({ error: "Invalid review ID" });
    }
    if (typeof status !== "string") return reply.code(400).send({ error: "Invalid review status" });
    const review = review_model.get_review_by_id(req.params.review_id);
    if (!review) return reply.code(404).send({ error: "Review Not Found" });
    const status_row = status_model.get_status_by_name(status);
    if (!status_row) return reply.code(400).send({ error: "Invalid review status" });

    try {
        review_model.update_review_status(req.params.review_id, status_row.status_id);
        return reply.code(200).send({ message: "Review Status Updated Successfully" });
    } catch (err) {
        console.error("❌ DB Error:", err && err.message);
        return reply.code(500).send({ error: "Internal server error" });
    }
}

function delete_review(req, reply) {
    if (typeof req.params.review_id !== "string" || req.params.review_id.length !== 7) {
        return reply.code(400).send({ error: "Invalid review ID" });
    }
    try {
        const result = review_model.delete_review(req.params.review_id);
        if (result.changes === 0) return reply.code(404).send({ error: "Review Not Found" });
        return reply.code(200).send({ message: "Review Deleted Successfully" });
    } catch (err) {
        console.error("❌ DB Error:", err && err.message);
        return reply.code(500).send({ error: "Internal server error" });
    }
}

module.exports = {
    get_all_reviews,
    create_review,
    update_review_status,
    delete_review
};