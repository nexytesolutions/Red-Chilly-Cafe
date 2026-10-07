
const status_model = require("../models/status_model");

function get_all_statuses(req, reply) {
    try {
        const statuses = status_model.get_all_statuses();
        return reply.code(200).send({ statuses });
    } catch (err) {
        console.error("❌ DB Error:", err && err.message);
        return reply.code(500).send({ error: "Internal server error" });
    }
}
module.exports = {
    get_all_statuses
};