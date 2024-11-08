const express = require('express');
const ViewBuyerShortlistedCarsController = require('../controllers/viewBuyerShortlistedCarsController');
const router = express.Router();

const viewBuyerShortlistedCarsController = new ViewBuyerShortlistedCarsController();
// viw all buyer's car listing
router.get('/view-shortlisted-cars/:buyerEmail', (req, res) => viewBuyerShortlistedCarsController.viewBuyerShortlistedCars(req, res));

module.exports = router;