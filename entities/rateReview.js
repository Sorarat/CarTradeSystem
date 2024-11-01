const db = require('../config/db');
const User = require('../entities/user');

class rateReview {

    // private variables
    #agent_id
    #reviewer_id
    #rating
    #review

    constructor(rateReviewData = {}) {
        this.#agent_id = rateReviewData.agent_id || null;
        this.#reviewer_id = rateReviewData.reviewer_id || null;
        this.#rating = rateReviewData.rating || 0;
        this.#review = rateReviewData.review || '';

    }

     // Getters
     get getAgentId() {
        return this.#agent_id;
    }

    get getReviewerId() {
        return this.#reviewer_id;
    }

    get getRating() {
        return this.#rating;
    }

    get getReview() {
        return this.#review;
    }

    async createRatingReview(agent_id, rating, review, reviewer_id) {

        // create empty instance of user
        const user = new User();
	
	

    }

    async getRatingReview(agent_id) {

        // const query = 'SELECT * FROM RateReview WHERE agent_id = ?';
        // const [rows] = await db.promise().query(query, [agent_id]);
        // return rows;

        const query = `
            SELECT rr.*, u.username
            FROM RateReview rr
            JOIN User u ON rr.reviewer_id = u.user_id
            WHERE rr.agent_id = ? `;

        const [rows] = await db.promise().query(query, [agent_id]);
        return rows;

    }


}


module.exports = rateReview; 
