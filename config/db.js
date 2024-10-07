const mysql = require('mysql2');

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',  
    password: 'root', 
    database: 'csit314', 
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;