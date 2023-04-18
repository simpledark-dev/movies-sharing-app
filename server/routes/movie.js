const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", movieController.getAllSharedMovies);
router.post("/", authMiddleware, movieController.postMovie);

module.exports = router;
