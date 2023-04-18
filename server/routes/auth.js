const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const connectDb = require("../middleware/connectDb");

router.use(connectDb);

// Route to register a new user
router.post("/register", authController.register);

// Route to log in a user
router.post("/login", authController.login);

// Route to log out a user
router.post("/logout", authController.logout);

// Route to verify token
router.get("/verify-token", authMiddleware, authController.verifyToken);

module.exports = router;
