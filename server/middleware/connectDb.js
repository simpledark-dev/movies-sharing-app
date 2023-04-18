const mysql = require("mysql");
const dbConfig = require("../config/db");

function connectDb(req, res, next) {
  const connection = mysql.createConnection(dbConfig);
  connection.connect(function (err) {
    if (err) {
      console.log("Error connecting to database:", err);
      return next(err);
    }
    console.log("Connected to database!");
    req.db = connection;
    next();
  });
}

module.exports = connectDb;
