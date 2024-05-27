const mongoose = require("mongoose");

const dbconnect = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/easy-recipes");
        console.log("Connected");
    } catch (error) {
        console.log(error);
        process.exit();
    }
};

module.exports = dbconnect;
