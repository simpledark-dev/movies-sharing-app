const connection = require("../config/db");

// Create the movies table
const createMoviesTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS movies (
        id INT NOT NULL AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        youtube_video_id VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
    );
    `;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Movies table created:", result);
  });

  connection.end();
};

const dropTable = (tableName) => {
  const query = `DROP TABLE IF EXISTS ${tableName}`;

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error(`Error dropping table ${tableName}: ${error}`);
      connection.destroy();
      return;
    }

    console.log(`Table ${tableName} dropped successfully.`);
    connection.destroy();
  });
};

// dropTable("movies");

createMoviesTable();
