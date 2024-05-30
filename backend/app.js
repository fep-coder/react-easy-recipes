var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const dbconnect = require("./data/db");
require("dotenv").config();
const cors = require("cors");

dbconnect();

const recipesRouter = require("./routes/recipes");
const categoriesRouter = require("./routes/categories");
const usersRouter = require("./routes/users");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/api/recipes", recipesRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/users", usersRouter);

module.exports = app;
