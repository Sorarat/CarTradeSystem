const express = require('express');
const SearchBuyerCarlistingController = require('../controllers/searchBuyerCarlistingController');
const router = express.Router();

const searchBuyerCarlistingController = new SearchBuyerCarlistingController();
// search car listings
router.get('/searchBuyerCarlisting', (req, res) => searchBuyerCarlistingController.searchBuyerCarlisting(req, res));


module.exports = router;