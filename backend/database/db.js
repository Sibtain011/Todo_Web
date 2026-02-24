const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "%raza786",
  host: "localhost",
  port: 5432,
  database: "todo_db",
});

// Test connection
pool.connect((err, todo_db, release) => {
  if (err) {
    return console.error("Error connecting to database", err.stack);
  }
  console.log("Connected to PostgreSQL database");
  release();
});

module.exports = pool;

