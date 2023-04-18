const db = require("../config/db");

exports.getAllUsers = (req, res) => {
  const query = "SELECT * FROM users";

  req.db.query(query, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Error getting users" });
    }

    return res.json(results);
  });
};

exports.createUser = (req, res) => {
  res.send(null);
};
