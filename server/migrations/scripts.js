const connection = require("../config/db");

// Create the users table
const createUsersTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
        id INT NOT NULL AUTO_INCREMENT,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE (email)
    );
    `;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Movies table created:", result);
  });

  connection.end();
};

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

// Create the movies_sharing table
const createMoviesSharingTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS movies_sharing (
        id INT NOT NULL AUTO_INCREMENT,
        movie_id INT NOT NULL,
        user_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
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

// createUsersTable();
// createMoviesTable();
createMoviesSharingTable();
