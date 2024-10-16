const express = require('express');
const loginController = require('../controllers/loginController');
const router = express.Router();

// Define a POST route for logging in
router.post('/login', loginController.login);

module.exports = router;
