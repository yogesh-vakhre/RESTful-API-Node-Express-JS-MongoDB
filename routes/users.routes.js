var express = require('express');
var router = express.Router();
const usersController = require("../controllers/user.controller.js");

 // Create a new User
 router.post("/", usersController.create);

 // Retrieve all users
 router.get("/", usersController.findAll);

 // Retrieve all published users
 router.get("/published", usersController.findAllPublished);

 // Retrieve a single User with id
 router.get("/:id", usersController.findOne);

 // Update a User with id
 router.put("/:id", usersController.update);

 // Delete a User with id
 router.delete("/:id", usersController.delete);

 // Create a new User
 router.delete("/", usersController.deleteAll);

module.exports = router;
