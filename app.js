var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index.routes');
 
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Setup all routes
app.use('/api/v1/', indexRouter); 

// Default page    
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to RESTful API"
  });
});

module.exports = app;
