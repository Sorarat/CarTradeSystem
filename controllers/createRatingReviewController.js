const RateReview = require('../entities/rateReview');

class createRatingReviewController {
    async createRatingReview (req, res) {
        const { agent_id, reviewer_email, rating, review } = req.body;

        try {
            const rateReview = new RateReview();
            const canCreate = await rateReview.createRatingReview(agent_id, reviewer_email, rating, review);

            if (canCreate) {
                return res.status(200).json({ success: true});
            }
            else {
                return res.status(403).json({ success: false});
            }

        }

        catch (error) {
            console.error(error);
            return res.status(500).json({success: false});

        }
    }
}

module.exports = createRatingReviewController;
