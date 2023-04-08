var express = require("express");
var app = express();

var authMiddleware = require("../middleware/auth.middleware");

var authRouter = require("./auth.routes");
var usersRouter = require("./users.routes");
var categoriesRouter = require("./categories.routes");

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/categories", authMiddleware, categoriesRouter);

module.exports = app;
