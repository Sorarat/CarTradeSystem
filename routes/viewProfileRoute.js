const express = require('express');
const ViewProfileController = require('../controllers/viewProfileController');
const router = express.Router();

const viewProfileController = new ViewProfileController();
// view all profiles
router.get('/view-profiles', (req, res) => viewProfileController.viewProfiles(req, res));

// view specific profile for update profile
router.get('/getProfile/:profileId', (req, res) => viewProfileController.getProfile(req, res));

module.exports = router;