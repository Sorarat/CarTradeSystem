const express = require('express');
const RemoveListingController = require('../controllers/removeListingController');
const router = express.Router();

const removeListingController = new RemoveListingController();

router.delete('/removeListing', (req, res) => removeListingController.removeListing(req, res));

module.exports = router;