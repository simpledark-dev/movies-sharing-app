const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");
const authMiddleware = require("../middleware/authMiddleware");
const connectDb = require("../middleware/connectDb");

router.use(connectDb);

router.get("/", movieController.getAllSharedMovies);
router.post("/", authMiddleware, movieController.postMovie);

module.exports = router;
