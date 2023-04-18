const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const connectDb = require("../middleware/connectDb");

router.use(connectDb);

router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);

module.exports = router;
