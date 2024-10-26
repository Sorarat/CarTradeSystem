const express = require('express');
const SuspendProfileController = require('../controllers/suspendProfileController');
const router = express.Router();

const suspendProfileController = new SuspendProfileController();

router.put('/suspend/:profileId', (req, res) => suspendProfileController.suspendProfile(req, res));

module.exports = router;