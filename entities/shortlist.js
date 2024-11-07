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
}

module.exports = Shortlist;