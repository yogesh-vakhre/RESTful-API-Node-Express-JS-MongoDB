const User = require("../models/user.model");
const AppError = require("../utils/appError");
const catchAsync = require('../utils/catchAsync');

// Create and Save a new User
exports.create = catchAsync(async(req, res, next) => {
  console.log(req.body);
  // Validate request
  if (!req.body.name) {
    return next(new AppError("Name can not be empty!", 400));
  }

  if (!req.body.email) {
    return next(new AppError("Email can not be empty!", 400));
  }

  if (!req.body.password) {
    return next(new AppError("Password can not be empty!", 400));
  }

  // Create a User
  const user = await User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    published: req.body.published ? req.body.published : false
  }).save();
  
  // Save User in the database

  if (!user) {
    return next(new AppError("Some error occurred while creating the user", 400));
  }

  res.status(200).json({
    status: "success",    
    user
  });   
   
});

// Retrieve all Users from the database.
exports.findAll = catchAsync(async(req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  const users = await User.find(condition);
  if (!users) {
    return next(new AppError("Some error occurred while retrieving users", 400));
  }

  res.status(200).json({
    status: "success",    
    users
  });
});

// Find a single User with an id
exports.findOne = catchAsync(async(req, res,next) => {
  const id = req.params.id;

  // Find a single Category
  const user = await User.findById(id);
  if (!user) {
    return next(new AppError("Not found user with id " + id, 404));
  }

  res.status(200).json({
    status: "success",    
    user
  });

});

// Update a User by the id in the request
exports.update = catchAsync(async(req, res) => {
  if (!req.body) {
    return next(new AppError("Data to update can not be empty!", 400));     
  }

  const id = req.params.id;
  const user = await User.findByIdAndUpdate(id, req.body, { useFindAndModify: false });
  
  if (!user) {
    return next(new AppError(`Cannot update user with id=${id}. Maybe user was not found!`, 404));
  }

  res.status(200).json({
    status: "success",
    message: "User was updated successfully.",   
    user
  });
   
});

// Delete a User with the specified id in the request
exports.delete = catchAsync(async(req, res) => {
  const id = req.params.id;

  const user = await User.findByIdAndRemove(id, { useFindAndModify: false });
  if (!user) {
    return next(new AppError(`Cannot update user with id=${id}. Maybe user was not found!`, 404));
  }

  res.status(200).json({
    status: "success",
    message: "User was deleted successfully!",   
    user
  });

});

// Delete all Users from the database.
exports.deleteAll = catchAsync(async(req, res) => {
  const user = await User.deleteMany({});
  if (!user) {
    return next(new AppError(`Some error occurred while removing all users!`, 500));
  }

  res.status(200).json({
    status: "success",
    message: `${data.deletedCount} Users were deleted successfully!`,   
   });
});

// Find all published Users
exports.findAllPublished = catchAsync(async(req, res) => {
  const users = await User.find({ published: true });
  if (!users) {
    return next(new AppError("Some error occurred while retrieving users.", 500));
  }

  res.status(200).json({
    status: "success",
    users
  });
});
