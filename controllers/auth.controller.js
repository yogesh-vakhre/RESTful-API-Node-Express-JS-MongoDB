const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const generateToken = require("../utils/generateToken");
const { authErrors } = require("../utils/errors");

// signUp and Save a new User
exports.signUp = catchAsync(async (req, res, next) => {
 
  // Get user input
  const { email } = req.body;
  // Validate if user exist in our database
  const userPresent = await User.findOne({ email });
  // check if user already exist
  if (userPresent) {
    return next(new AppError(authErrors.userAlreadyExists, 409));
  }

  // Create user in our database
  const user = await User.createUser(req.body);
  if (!user) {
    return next(new AppError("Some error occurred while creating the user", 400));
  }

  // return user
  res.status(200).json({
    status: "success",
    token: generateToken(user._id), // Create token
    user,
  });

});

//Login a User
exports.login = catchAsync(async (req, res, next) => {
  // Get user input
  let { email, password } = req.body;

  // Validate user input
  email = email.toLowerCase();
  if (!email) {
    return next(new AppError(authErrors.provideEmail, 404));
  }
  if (!password) {
    return next(new AppError(authErrors.providePassword, 404));
  }
  // Validate if user exist in our database
  const user = await User.findOne({ email }).select("+password");
  //check if user email not valid
  if (!user) {
    return next(new AppError(authErrors.invalidUser, 400));
  }
  
  //check if user not email Verified
  if (!user.emailVerified) {    
    return next(new AppError(authErrors.emailNotVerified, 401));
  }
   
  //reset password token
  user.passwordResetExpires = undefined;
  user.passwordResetToken = undefined;

  await user.save({ validateBeforeSave: false });

  //check if user password not valid
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError(authErrors.invalidUser, 401));
  }
  user.password = undefined;

  // user
   res.status(200).json({
    status: "success",
    token: generateToken(user._id), // Create token
    user,
  });
});
