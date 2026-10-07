
const diet_type_model = require("../models/diet_type_model");

function get_all_diet_types(req, reply) {
    try {
        const diet_types = diet_type_model.get_all_diet_types();
        return reply.code(200).send({ diet_types });
    } catch (err) {
        console.error("❌ DB Error:", err && err.message);
        return reply.code(500).send({ error: "Internal server error" });
    }
}
module.exports = {
    get_all_diet_types
};