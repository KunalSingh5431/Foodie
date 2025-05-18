const express = require("express");
const Order = require("../models/Order");
const router = express.Router();

router.post("/", async (req, res) => {
    const { userId, items, total } = req.body;
    const order = await Order.create({ userId, items, total });
    res.json(order);
});

router.get("/:userId", async (req, res) => {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
});

module.exports = router;
