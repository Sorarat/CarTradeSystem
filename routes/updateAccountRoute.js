const express = require('express');
const UpdateAccountController = require('../controllers/updateAccountController');
const router = express.Router();

const updateAccountController = new UpdateAccountController();

router.post('/updateAccount/:userId', (req, res) => updateAccountController.updateAccount(req, res));

module.exports = router;