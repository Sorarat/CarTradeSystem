const express = require('express');
const CreateListingController = require('../controllers/createListingController');
const router = express.Router();

const createListingController = new CreateListingController();

router.post('/createListing', (req, res) => createListingController.createListing(req, res));

module.exports = router;