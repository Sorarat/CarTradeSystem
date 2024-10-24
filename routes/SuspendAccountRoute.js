const express = require('express');
const SuspendAccountController = require('../controllers/SuspendAccountController');
const router = express.Router();

const suspendAccountController = new SuspendAccountController();

router.put('/suspend/:userId', (req, res) => suspendAccountController.suspendAccount(req, res));

module.exports = router;