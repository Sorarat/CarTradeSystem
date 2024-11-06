const express = require('express');
const CreateRatingReviewController = require('../controllers/createRatingReviewController');
const router = express.Router();

const createRatingReviewController = new CreateRatingReviewController();

router.post('/createRatingReview', (req, res) => createRatingReviewController.createRatingReview(req, res));

module.exports = router;