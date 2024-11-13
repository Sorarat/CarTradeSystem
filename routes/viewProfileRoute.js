const express = require('express');
const ViewProfileController = require('../controllers/viewProfileController');
const router = express.Router();

const viewProfileController = new ViewProfileController();
// view all profiles
router.get('/view-profiles', (req, res) => viewProfileController.viewProfiles(req, res));

// view specific profile for update profile
router.get('/getProfile/:profileId', (req, res) => viewProfileController.getProfile(req, res));

// get all roles for create account role options
router.get('/getRoles', (req, res) => viewProfileController.getAllRoles(req, res));

module.exports = router;