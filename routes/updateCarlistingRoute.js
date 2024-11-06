const express = require('express');
const UpdateCarlistingController = require('../controllers/updateCarlistingController');
const router = express.Router();

const updateCarlistingController = new UpdateCarlistingController();

router.post('/updateCarlisting/:car_id', (req, res) => updateCarlistingController.updateCarlisting(req, res));

module.exports = router;