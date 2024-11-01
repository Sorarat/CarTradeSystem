const rateReview = require('../entities/rateReview');

class viewRatingReviewController {

    // view all ratings & reviews
    async viewRatingReview(req, res) {

        const agent_id = req.params.agent_id;
    
        try {

            const rateReviewInstance = new rateReview();
            const ratingReviews = await rateReviewInstance.getRatingReview(agent_id);
            res.json(ratingReviews);
        }

        catch(error) {
            res.status(500).send({ message: error.message});
            console.error("Error fetching ratings and reviews: ", error);
        }
    }
}

module.exports = viewRatingReviewController