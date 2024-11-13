const express = require('express');
const UpdateCarlistingController = require('../controllers/updateCarlistingController');
const router = express.Router();

const updateCarlistingController = new UpdateCarlistingController();

router.post('/updateCarlisting/:car_id', (req, res) => updateCarlistingController.updateCarlisting(req, res));

router.post('/increaseListingNumViews/:car_id', (req, res) => updateCarlistingController.increaseListingNumViews(req, res));

router.post('/increaseListingNumShortlist/:car_id', (req, res) => updateCarlistingController.increaseListingNumShortlist(req, res));

router.post('/decreaseListingNumShortlist/:car_id', (req, res) => updateCarlistingController.decreaseListingNumShortlist(req, res));

module.exports = router;