var express = require("express");
var router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// POST /api/users/register - register a new user
router.post("/register", async function (req, res, next) {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ message: "You have been registered" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/users/login - login a user
router.post("/login", async function (req, res, next) {
    const user = await User.findOne({ name: req.body.name });

    if (user && (await user.matchPassword(req.body.password))) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.cookie("jwt", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: false,
            maxAge: 86400000,
        });

        res.status(200).json(user);
    } else {
        res.status(401).json({ message: "Invalid email or password" });
    }
});

// POST /api/users/logout - logout a user
router.post("/logout", function (req, res, next) {
    res.clearCookie("jwt");
    res.status(200).json({ message: "You have been logged out" });
});

module.exports = router;
