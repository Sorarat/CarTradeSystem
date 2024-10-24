const express = require('express');
const cors = require('cors');
const pool = require('./config/db');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Enable CORS
const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
};

app.use(cors(corsOptions));

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
app.use(express.static(path.join(__dirname, 'public')));

// Serve LoginPage.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'LoginPage', 'LoginPage.html'));
});

// Dynamically import all route files from the 'routes' directory
const routesPath = path.join(__dirname, 'routes');
fs.readdirSync(routesPath).forEach((file) => {
    if (file.endsWith('.js')) {
        const route = require(`./routes/${file}`);
        const routeName = file.split('.')[0]; // Get the file name without extension
        app.use(`/${routeName}`, route);  // Use the route with the file name as the path
    }
}); 

// A test route to ensure the backend is working
app.get('/test', (req, res) => {
    res.json({ message: 'Backend is working!' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
