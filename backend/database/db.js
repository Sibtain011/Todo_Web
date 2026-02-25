const dotenv = require("dotenv");
require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production"
    ? { rejectUnauthorized: false }
    : false,
});

module.exports = pool;

// Test connection
pool.connect((err, todo_db, release) => {
  if (err) {
    return console.error("Error connecting to database", err.stack);
  }
  console.log("Connected to PostgreSQL database");
  release();
});

module.exports = pool;

