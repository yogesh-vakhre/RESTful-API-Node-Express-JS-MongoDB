const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hpp = require('hpp');
const helmet = require("helmet");

const indexRouter = require('./routes/index.routes');
 
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Setup Express middleware to protect against HTTP Parameter Pollution attacks
app.use(hpp());

//Helmet helps you secure your Express apps by setting various HTTP headers
app.use(helmet());

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
