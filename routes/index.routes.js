var express = require("express");
var app = express();
var usersRouter = require('./users.routes');

app.use('/users', usersRouter);
 
module.exports = app;
