const express = require('express');
const ViewRatingReviewController = require('../controllers/viewRatingReviewController');
const router = express.Router();

const viewRatingReviewController = new ViewRatingReviewController();

// view all rating & reviews
router.get('/view-rating-reviews/:agent_id', (req, res) => viewRatingReviewController.viewRatingReview(req, res));

module.exports = router;