const db = require("../config/db");

// Get all movies
exports.getAllMovies = (req, res) => {
  const query = "SELECT * FROM movies";

  db.query(query, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Error getting movies" });
    }

    return res.json(results);
  });
};

// Add a new movie
exports.postMovie = (req, res) => {
  const { title, description, youtubeVideoId } = req.body;

  const query =
    "INSERT INTO movies (title, description, youtube_video_id) VALUES (?, ?, ?)";
  const values = [title, description, youtubeVideoId];

  db.query(query, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Error adding movie" });
    }

    return res.json({
      message: "Movie added successfully",
      id: results.insertId,
    });
  });
};
