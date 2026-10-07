
const category_model = require("../models/category_model");

function get_all_categories(req, reply) {
    try {
        const categories = category_model.get_all_categories();
        return reply.code(200).send({ categories });
    } catch (err) {
        console.error("❌ DB Error:", err && err.message);
        return reply.code(500).send({ error: "Internal server error" });
    }
}
module.exports = {
    get_all_categories
};