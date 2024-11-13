const express = require('express');
const SaveListingController = require('../controllers/saveListingController');
const router = express.Router();

const saveListingController = new SaveListingController();

router.post('/saveListing', (req, res) => saveListingController.saveListing(req, res));

module.exports = router;