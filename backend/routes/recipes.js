var express = require("express");
var router = express.Router();

// GET /api/recipes - get all recipes
router.get("/", function (req, res, next) {
    res.send("recipes");
});

module.exports = router;
