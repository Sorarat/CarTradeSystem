const express = require('express');
const CreateAccountController = require('../controllers/CreateAccountController');
const router = express.Router();

const createAccountController = new CreateAccountController();

router.post('/create', (req, res) => createAccountController.createAccount(req, res));

module.exports = router;