const db = require('../config/db');
const User = require('../entities/user');

class Shortlist {
    // private variables
    #shortlist_id;
    #buyer_id;
    #car_id;

    constructor(shortlistData = {}) {
        this.#shortlist_id = shortlistData.shortlist_id || null;
        this.#buyer_id = shortlistData.buyer_id || null;
        this.#car_id = shortlistData.car_id || null;
    }

    // getters
    get getShortlistId() {
        return this.#shortlist_id;
    }

    get getBuyerId() {
        return this.#buyer_id;
    }

    get getCarId() {
        return this.#car_id;
    }

    // save carlisting into shortlist 
    async saveListing(carId, buyerEmail) {
        // get buyer id
        const user = new User();
        const buyer = await user.findByEmail(buyerEmail);
        console.log()

        const query = 'INSERT INTO Shortlist (buyer_id, car_id) VALUES (?, ?)';
        const [result] = await db.promise().query(query, [buyer.user_id, carId]);

        return result.affectedRows > 0;
    }

    // remove carlisting from shortlist 
    async removeListing(carId, buyerEmail) {
        // get buyer id
        const user = new User();
        const buyer = await user.findByEmail(buyerEmail);

        const query = 'DELETE FROM Shortlist WHERE buyer_id = ? AND car_id = ?';
        const [result] = await db.promise().query(query, [buyer.user_id, carId]);

        return result.affectedRows > 0;
    }

    // view buyer's shortlisted car listings
    async viewBuyerShortlistedCars(buyerEmail) {
        // get buyer id
        const user = new User();
        const buyer = await user.findByEmail(buyerEmail);
        const query = `
            SELECT 
                Carlisting.*, 
                User.email AS agent_email,
                TRUE AS is_shortlisted
            FROM
                Shortlist
            INNER JOIN
                Carlisting ON Shortlist.car_id = Carlisting.car_id
            LEFT JOIN
                User ON Carlisting.agent_id = User.user_id
            WHERE
                Shortlist.buyer_id = ?
        `;
        const [listings] = await db.promise().query(query, [buyer.user_id]);
        return listings;
    }
}

module.exports = Shortlist;