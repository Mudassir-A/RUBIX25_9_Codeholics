const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres", // Replace with your PostgreSQL username
  host: "localhost",     // Or the host of your PostgreSQL service
  database: "community-hub",
  password: "1234", // Replace with your PostgreSQL password
  port: 5432,            // Default PostgreSQL port
});

module.exports = pool;
