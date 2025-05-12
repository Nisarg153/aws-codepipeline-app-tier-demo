const mysql = require('mysql');
const getDbConfig = require('./DbConfig');

async function initializeDatabase() {
  const dbcreds = await getDbConfig();

  // Connect without specifying database
  const connection = mysql.createConnection({
    host: dbcreds.DB_HOST,
    user: dbcreds.DB_USER,
    password: dbcreds.DB_PWD,
	multipleStatements: true
  });

  connection.connect((err) => {
    if (err) throw err;
    console.log("Connected for DB initialization check.");
  });

  // Step 1: Check if the database exists
  connection.query("SHOW DATABASES LIKE 'webappdb'", function (err, results) {
    if (err) throw err;

    if (results.length > 0) {
      console.log("Database already exists. Skipping initialization.");
      connection.end();
    } else {
      console.log("Database not found. Initializing...");

      const setupSQL = `
        CREATE DATABASE webappdb;
        USE webappdb;
        CREATE TABLE IF NOT EXISTS transactions (
          id INT NOT NULL AUTO_INCREMENT,
          amount DECIMAL(10,2),
          description VARCHAR(100),
          PRIMARY KEY(id)
        );
        INSERT INTO transactions (amount, description) VALUES (400, 'groceries');
      `;

      connection.query(setupSQL, function (err, result) {
        if (err) throw err;
        console.log("Database and table created, sample data inserted.");
        connection.end();
      });
    }
  });
}

module.exports = initializeDatabase;
