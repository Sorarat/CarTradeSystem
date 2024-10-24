const express = require('express');
const UpdateProfileController = require('../controllers/updateProfileController');
const router = express.Router();

const updateProfileController = new UpdateProfileController();

router.post('/updateProfile/:profileId', (req, res) => updateProfileController.updateProfile(req, res));

module.exports = router;