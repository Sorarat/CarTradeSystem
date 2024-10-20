const express = require('express');
const LoginController = require('../controllers/loginController');
const router = express.Router();

const loginController = new LoginController();

// Use the instance method
router.post('/login', (req, res) => loginController.login(req, res));

module.exports = router;
