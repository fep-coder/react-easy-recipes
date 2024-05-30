var express = require("express");
var router = express.Router();
const Recipe = require("../models/recipe");
const multer = require("multer");
const path = require("path");

// GET /api/recipes - get all recipes
router.get("/", async function (req, res, next) {
    const searchTerm = req.query.searchTerm
        ? { name: { $regex: req.query.searchTerm, $options: "i" } }
        : {};

    try {
        const recipes = await Recipe.find({ ...searchTerm });
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

// POST /api/recipes/upload - upload image
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./frontend/public/images");
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getTime() + "-" + file.originalname);
    },
});

function fileFilter(req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(new Error("Images only!"), false);
    }
}

const upload = multer({ storage, fileFilter });

const uploadSingle = upload.single("image");

router.post("/upload", function (req, res, next) {
    uploadSingle(req, res, function (error) {
        if (error) {
            return res.status(400).json({ message: error.message });
        }

        return res.status(200).json({
            message: "File uploaded",
            image: req.file.filename,
        });
    });
});

module.exports = router;
