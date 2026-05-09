const mysql = require('mysql2');
require('dotenv').config();

// Create the connection pool to the database
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, // <-- ADD THIS LINE!
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: { rejectUnauthorized: false }
});

// Promisify for Node.js async/await
const promisePool = pool.promise();

// Test the connection
promisePool.getConnection()
  .then(connection => {
    console.log('Successfully connected to the MySQL database.');
    connection.release();
  })
  .catch(err => {
    console.error('Error connecting to the database:', err.message);
    console.log('Please ensure your MySQL service is running and credentials are correct.');
  });

module.exports = promisePool;
