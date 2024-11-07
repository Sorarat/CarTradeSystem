const express = require('express');
const ViewSellerCarlistingController = require('../controllers/viewSellerCarlistingController');
const router = express.Router();

const viewSellerCarlistingController = new ViewSellerCarlistingController();
// view all seller's car listing
router.get('/viewSellerListing/:sellerEmail', (req, res) => viewSellerCarlistingController.viewSellerCarlistings(req, res));

module.exports = router;