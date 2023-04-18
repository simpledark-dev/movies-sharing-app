// Init express app
const express = require("express");
const app = express();
app.use(express.json());

// Cors
const cors = require("cors");
app.use(cors());

// Use .env
require("dotenv").config();

// Get routes
const routes = require("./routes");

app.use("/auth", routes.authRoutes);
app.use("/movies", routes.movieRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!`);
});
