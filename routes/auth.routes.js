var express = require("express");
var router = express.Router();
const authController = require("../controllers/auth.controller.js");

// Register a new User
router.post("/register", authController.create);

// Login User
router.post("/login", authController.login);

module.exports = router;
