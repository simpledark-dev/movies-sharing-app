// Get all shared movies
exports.getAllSharedMovies = (req, res) => {
  const query = `
    SELECT m.*, u.email
    FROM movies m
    JOIN movies_sharing ms ON m.id = ms.movie_id
    JOIN users u ON ms.user_id = u.id
    ORDER BY m.created_at DESC;
  `;

  req.db.query(query, (err, results) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: "Error getting shared movies" + err });
    }

    return res.json(results);
  });
};

// Add a new movie
exports.postMovie = (req, res) => {
  const { title, description, youtubeVideoId } = req.body;

  // Add movie to movies table
  const query =
    "INSERT INTO movies (title, description, youtube_video_id) VALUES (?, ?, ?)";
  const values = [title, description, youtubeVideoId];

  req.db.query(query, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Error adding movie" });
    }

    // Update the movies_sharing table
    const error = updateMoviesSharingTable(
      req,
      req.body.user.id,
      results.insertId
    );

    if (error) {
      return res.status(500).json({ error: "Error updating movies sharing" });
    }

    return res.json({
      message: "Movie added successfully",
      id: results.insertId,
    });
  });
};

const updateMoviesSharingTable = (req, userId, movieId) => {
  const query = "INSERT INTO movies_sharing (user_id, movie_id) VALUES (?, ?)";
  const values = [userId, movieId];

  req.db.query(query, values, (err) => {
    if (err) {
      console.log(err);
      return err;
    }
  });
};
