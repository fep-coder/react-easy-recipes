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

// POST /api/users/login - login a user
router.post("/login", async function (req, res, next) {
    const user = await User.findOne({ name: req.body.name });

    if (user && (await user.matchPassword(req.body.password))) {
        res.status(200).json(user);
    } else {
        res.status(401).json({ message: "Invalid email or password" });
    }
});

module.exports = router;
