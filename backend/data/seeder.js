const Category = require("../models/category");
const Recipe = require("../models/recipe");
const categories = require("./categories");
const recipes = require("./recipes");

const dbconnect = require("./db");

dbconnect();

async function SeedData() {
    try {
        await Category.deleteMany({});
        await Recipe.deleteMany({});

        const createdCategories = await Category.insertMany(categories);
        const lunch = createdCategories[1]._id;
        const sampleRecipes = recipes.map((recipe) => {
            return { ...recipe, category: lunch };
        });
        await Recipe.insertMany(sampleRecipes);

        console.log("Data Imported");
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

async function DestroyData() {
    try {
        await Category.deleteMany({});
        await Recipe.deleteMany({});

        console.log("Data destroyed!");
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

// console.log(process.argv);

if (process.argv[2] === "-d") {
    DestroyData();
} else {
    SeedData();
}
