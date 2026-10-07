const { db } = require("../database/db");

function create_review(review) {
    const stmt = db.prepare(`
        INSERT INTO reviews (review_id, name, email, status_id, description, rating)
        VALUES (?, ?, ?, ?, ?, ?)
    `);
    return stmt.run(
        review.review_id,
        review.name,
        review.email,
        review.status_id,
        review.description,
        review.rating
    );
}

function get_all_reviews() {
    const stmt = db.prepare(`
        SELECT r.review_id, r.name, r.rating, r.description, r.created_on, s.name AS status_name
        FROM reviews r
        INNER JOIN statuses s ON s.status_id = r.status_id
        ORDER BY r.created_on DESC
    `);
    return stmt.all();
}

function get_review_by_id(review_id) {
    const stmt = db.prepare(`SELECT review_id FROM reviews WHERE review_id = ? LIMIT 1`);
    return stmt.get(review_id);
}

function get_review_by_email(email) {
    const stmt = db.prepare(`SELECT review_id FROM reviews WHERE email = ? LIMIT 1`);
    return stmt.get(email);
}

function update_review_status(review_id, status_id) {
    const stmt = db.prepare(`UPDATE reviews SET status_id = ? WHERE review_id = ?`);
    return stmt.run(status_id, review_id);
}

function delete_review(review_id) {
    const stmt = db.prepare(`DELETE FROM reviews WHERE review_id = ?`);
    return stmt.run(review_id);
}

module.exports = {
    create_review,
    get_all_reviews,
    get_review_by_id,
    get_review_by_email,
    update_review_status,
    delete_review
};