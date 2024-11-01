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

    async createRatingReview(agent_id, reviewer_email, rating, review, ) {

        const user = new User();

        try {
        
            // verify that the agent_id is valid
            const userQuery = 'SELECT * FROM User WHERE user_id = ?';
            const [agentResult] = await db.promise().query(userQuery, [agent_id]);
            if (agentResult.length == 0) {
                throw new Error(`Agent with ID ${agent_id} does not exist.`);
            }

            const reviewer =  await user.findByEmail(reviewer_email);

            if (reviewer == null) {
                return false;
            }

            // insert the review into the table
            const insertQuery = `INSERT INTO RateReview (agent_id, reviewer_id, rating, review) VALUES (?,?,?,?)`;

            await db.promise().query(insertQuery, [agent_id, reviewer.user_id, rating, review]);

            return true;
            }


        catch(error) {
            console.error("Error creating viewL: ", error.message);
            return false;
        }
        
	
	

    }

    async getRatingReview(agent_id) {

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
