var express = require("express");
var router = express.Router();
const Recipe = require("../models/recipe");

// GET /api/recipes - get all recipes
router.get("/", async function (req, res, next) {
    try {
        const recipes = await Recipe.find({});
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/recipes/:id - get one recipe
router.get("/:id", async function (req, res, next) {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/recipes - create new recipe
router.post("/", async function (req, res, next) {
    try {
        req.body.slug = req.body.name.trim().replace(/ /g, "-").toLowerCase();
        await Recipe.create(req.body);
        res.status(201).json({ message: "Recipe created" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT /api/recipes/:id - update one recipe
router.put("/:id", async function (req, res, next) {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        req.body.slug = req.body.name.trim().replace(/ /g, "-").toLowerCase();
        await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: "Recipe updated!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE /api/recipes/:id - delete one recipe
router.delete("/:id", async function (req, res, next) {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        await Recipe.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Recipe deleted!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
