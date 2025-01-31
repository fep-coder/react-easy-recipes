const jwt = require("jsonwebtoken");
const User = require("../models/user");

const loggedIn = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select("-password");
            next();
        } catch (error) {
            res.status(401).json({ message: "Token failed" });
            return;
        }
    } else {
        res.status(401).json({ message: "Not logged in" });
        return;
    }
};

module.exports = loggedIn;
