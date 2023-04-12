const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

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
    return next(new AppError("User Already Exist. Please Login", 409));
  }

  //Encrypt user password
  encryptedUserPassword = await bcrypt.hash(password, 10);

  // Create user in our database
  const user = await User.create({
    name: name,
    email: email.toLowerCase(), // sanitize
    password: encryptedUserPassword,
  });

  // Create token
  const token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY, {
    expiresIn: "5h",
  });
  // save user token
  user.token = token;

  // return user
  res.status(200).json({
    status: "success",
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
    // Create token
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY, {
      expiresIn: "5h",
    });

    // save user token
    user.token = token;

    // user
    res.status(200).json({
      status: "success",
      user,
    });
  }
  return next(new AppError("Invalid Credentials", 400));
  // Our login logic ends here
});
