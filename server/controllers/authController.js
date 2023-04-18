const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

// Function to generate JWT token
const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
  };
  const secret = process.env.SECRET_KEY;
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, secret, options);
};

// Login controller
exports.login = (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";
  const values = [email];

  db.query(query, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Error logging in" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Error logging in" });
      }

      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = generateToken(user);
      return res.json({ user, token });
    });
  });
  db.release();
};

// Register controller
exports.register = (req, res) => {
  const { email, password } = req.body;

  // Hash password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Error registering user" });
    }

    const query = "INSERT INTO users (email, password) VALUES (?, ?)";
    const values = [email, hashedPassword];

    db.query(query, values, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Error registering user" });
      }

      const user = {
        id: results.insertId,
        email: email,
      };
      const token = generateToken(user);
      return res.json({ user, token });
    });
    db.release();
  });
};

// Logout controller
exports.logout = (req, res) => {
  res.clearCookie("jwt");
  res.json({ message: "Logged out successfully" });
};

// Verify token controller
exports.verifyToken = (req, res) => {
  // Get the user details from the request object (set by the verifyToken middleware)
  const user = req.user;

  // Return the user details
  return res.json({ user });
};
