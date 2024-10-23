const express = require('express');
const CreateProfileController = require('../controllers/createProfileController');
const router = express.Router();

const createProfileController = new CreateProfileController();

router.post('/createProfile', (req, res) => createProfileController.createProfile(req, res));

module.exports = router;