var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const dbconnect = require("./data/db");
require("dotenv").config();

dbconnect();

const recipesRouter = require("./routes/recipes");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/recipes", recipesRouter);

module.exports = app;
