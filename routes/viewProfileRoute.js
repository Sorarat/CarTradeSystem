const express = require('express');
const ViewProfileController = require('../controllers/viewProfileController');
const router = express.Router();

const viewProfileController = new ViewProfileController();

router.get('/view-profiles', (req, res) => viewProfileController.viewProfiles(req, res));

module.exports = router;