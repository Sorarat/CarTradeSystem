const express = require('express');
const AgentViewRatingReviewController = require('../controllers/agentViewRatingReviewController');
const router = express.Router();

const agentViewRatingReviewController = new AgentViewRatingReviewController();

// agents view their own ratings & reviews 
router.get('/agent-view-ratings-reviews/:agent_email', (req, res) => agentViewRatingReviewController.agentViewRatingReview(req, res));

// agent rating
router.get('/agent-rating/:email', (req, res) => agentViewRatingReviewController.agentRating(req, res));

module.exports = router;
