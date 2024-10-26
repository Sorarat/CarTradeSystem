const express = require('express');
const SearchProfileController = require('../controllers/searchProfileController');
const router = express.Router();

const searchProfileController = new SearchProfileController();
// search profiles
router.get('/searchProfiles', (req, res) => searchProfileController.searchProfile(req, res));


module.exports = router;