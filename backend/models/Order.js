const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    userId: String,
    items: Array,
    total: Number,
    status: { type: String, default: "Pending" },
});
module.exports = mongoose.model("Order", orderSchema);