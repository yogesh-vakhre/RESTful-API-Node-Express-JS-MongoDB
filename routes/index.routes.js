var express = require("express");
var app = express();
var usersRouter = require("./users.routes");
var categoriesRouter = require("./categories.routes");

app.use("/users", usersRouter);
app.use("/categories", categoriesRouter);

module.exports = app;
