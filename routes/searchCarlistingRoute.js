const express = require('express');
const SearchCarlistingController = require('../controllers/searchCarlistingController');
const router = express.Router();

const searchCarlistingController = new SearchCarlistingController();
// search car listings
router.get('/searchCarlisting', (req, res) => searchCarlistingController.searchCarlisting(req, res));


module.exports = router;