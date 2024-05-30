var express = require("express");
var router = express.Router();
const User = require("../models/user");

// POST /api/users/register - register a new user
router.post("/register", async function (req, res, next) {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
