const express = require("express");
const Food = require("../models/Food");
const router = express.Router();
router.get("/", async (req, res) => {
    const foods = await Food.find();
    res.json(foods);
});
module.exports = router;