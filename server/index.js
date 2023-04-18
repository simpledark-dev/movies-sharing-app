const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const routes = require("./routes");

app.use(express.json());
app.use(cors());

app.use("/auth", routes.authRoutes);
app.use("/users", routes.userRoutes);
app.use("/movies", routes.movieRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!`);
});
