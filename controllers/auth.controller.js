const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const generateToken = require("../utils/generateToken");
const { authErrors } = require("../utils/errors");

// Create and Save a new User
exports.create = catchAsync(async (req, res, next) => {
  // Our register logic starts here
  // Get user input
  const { name, email, password } = req.body;

  // Validate user input
  if (!(email && password && name)) {
    return next(new AppError("All input is required", 400));
  }

  // check if user already exist
  // Validate if user exist in our database
  const oldUser = await User.findOne({ email });

  if (oldUser) {
    return next(new AppError(authErrors.userAlreadyExists, 409));
  }

  //Encrypt user password
  encryptedUserPassword = await bcrypt.hash(password, 10);

  // Create user in our database
  const user = await User.create({
    name: name,
    email: email.toLowerCase(), // sanitize
    password: encryptedUserPassword,
  });

  // return user
  res.status(200).json({
    status: "success",
    token: generateToken(user._id), // Create token
    user,
  });
  // Our register logic ends here
});

//Login a User
exports.login = catchAsync(async (req, res, next) => {
  // Our login logic starts here
  // Get user input
  const { email, password } = req.body;

  // Validate user input
  if (!(email && password)) {
    return next(new AppError("All input is required", 400));
  }
  // Validate if user exist in our database
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    // user
    res.status(200).json({
      status: "success",
      token: generateToken(user._id), // Create token
      user,
    });
  }
  return next(new AppError(authErrors.invalidUser, 400));
  // Our login logic ends here
});
