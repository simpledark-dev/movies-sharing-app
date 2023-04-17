const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Route to register a new user
router.post("/register", authController.register);

// Route to log in a user
router.post("/login", authController.login);

// Route to log out a user
router.post("/logout", authController.logout);

module.exports = router;
