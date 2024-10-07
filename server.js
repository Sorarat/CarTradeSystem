const express = require('express');
const cors = require('cors');
const pool = require('./config/db')

const app = express();
const port = 3000;

// Enable CORS
app.use(cors());
app.use(express.json()); // For parsing application/json

// Test the connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database as ID:', connection.threadId);
    connection.release(); // Release the connection back to the pool
});

// Middleware to serve static files from the 'public' directory
app.use(express.static('public'));

// A test route to ensure the backend is working
app.get('/test', (req, res) => {
    res.json({ message: 'Backend is working!' });
});

// Example route to test server
app.get('/', (req, res) => {
    res.send('Server is running on localhost:3000');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
