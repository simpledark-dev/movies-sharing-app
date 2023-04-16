const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

router.get("/", movieController.getAllSharedMovies);
router.post("/", movieController.postMovie);

module.exports = router;
