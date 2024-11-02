const db = require('../config/db');
const User = require('../entities/user');

class Carlisting {
    // private variables
    #car_id;
    #car_model;
    #reg_date;
    #price;
    #agent_id;
    #seller_id;
    #num_views;
    #num_shortlist;
    #status;

    constructor(carData = {}) {
        this.#car_id = carData.car_id || null;
        this.#car_model = carData.car_model || '';
        this.#reg_date = carData.reg_date || '';
        this.#price = carData.price || null;
        this.#agent_id = carData.agent_id || null;
        this.#seller_id = carData.seller_id || null;
        this.#num_views = carData.num_views || null;
        this.#num_shortlist = carData.num_shortlist || null;
        this.#status = carData.status || true;
    }

    // getters
    get getCarId() {
        return this.#car_id;
    }

    get getCarModel() {
        return this.#car_model;
    }

    get getRegDate() {
        return this.#reg_date;
    }

    get getPrice() {
        return this.#price;
    }

    get getAgentId() {
        return this.#agent_id;
    }

    get getSellerId() {
        return this.#seller_id;
    }

    get getNumViews() {
        return this.#num_views;
    }

    get getNumShortlist() {
        return this.#num_shortlist;
    }

    get getStatus() {
        return this.#status;
    }

    // create car listing
    async createListing(carModel, regDate, price, agentEmail, sellerEmail) {
        // create empty instance of user
        const user = new User();
        // get seller id
        const seller = await user.findByEmail(sellerEmail);

        if (seller == null) {
            return false;
        }   
        // check if it is a seller email
        const sellerRole = await user.getRole(seller.profile_id);
        if (sellerRole !== 'seller') {
            return false;
        }

        // get agent id
        const agent = await user.findByEmail(agentEmail);

        // insert listing
        const query = 'INSERT INTO Carlisting (car_model, reg_date, price, agent_id, seller_id) VALUES (?, ?, ?, ?, ?)';
        const values = [carModel, regDate, price, agent.user_id, seller.user_id];

        const [result] = await db.promise().query(query, values);

        return result.affectedRows > 0;
    }

    // view particular agent's car listings
    async viewAgentCarListings(agentEmail) {
        // get agent id
        const user = new User();
        const agent = await user.findByEmail(agentEmail);

        const query = 'SELECT car_id, car_model, DATE_FORMAT(reg_date, "%Y-%m-%d") as reg_date, price, seller_id, status from Carlisting WHERE agent_id = ?';
        const [listings] = await db.promise().query(query, [agent.user_id]);

        // For each listing, retrieve the seller's email
        const listingsWithSellerEmail = await Promise.all(
            listings.map(async (listing) => {
                const sellerQuery = 'SELECT email FROM User WHERE user_id = ?';
                const [sellerResult] = await db.promise().query(sellerQuery, [listing.seller_id]);
    
                const sellerEmail = sellerResult[0]?.email || 'Email not found';
                return {
                    ...listing,
                    seller_email: sellerEmail,
                };
            })
        );

        return listingsWithSellerEmail;
    }

    // update car listing
    async updateCarListing(car_id, car_model, reg_date, price, sellerEmail, status) {
        // create empty instance of user
        const user = new User();
        // get seller id
        const seller = await user.findByEmail(sellerEmail);

        if (seller == null) {
            return false;
        }   
        // check if it is a seller email
        const sellerRole = await user.getRole(seller.profile_id);
        if (sellerRole !== 'seller') {
            return false;
        }

        // update listing
        const query = 'UPDATE Carlisting SET car_model = ?, reg_date = ?, price = ?, seller_id = ?, status = ? WHERE car_id = ?';
        const [result] = await db.promise().query(query, [car_model, reg_date, price, seller.user_id, status, car_id]);

        return result.affectedRows > 0;
    }

    // delete car listing
    async deleteCarListing(car_id) {
        const query = 'DELETE FROM Carlisting WHERE car_id = ?';
        const [result] = await db.promise().query(query, [car_id]);
        return result.affectedRows > 0;
    }

    // search for car listing by model name
    async searchCarlistingByModel(carModel, agentEmail) {
        // get agent id
        const user = new User();
        const agent = await user.findByEmail(agentEmail);

        const query = 'SELECT car_id, car_model, DATE_FORMAT(reg_date, "%Y-%m-%d") as reg_date, price, seller_id, status FROM Carlisting WHERE agent_id = ? AND car_model LIKE ?';
        const [listings] = await db.promise().query(query, [agent.user_id, `%${carModel}%`]);

        // For each listing, retrieve the seller's email
        const listingsWithSellerEmail = await Promise.all(
            listings.map(async (listing) => {
                const sellerQuery = 'SELECT email FROM User WHERE user_id = ?';
                const [sellerResult] = await db.promise().query(sellerQuery, [listing.seller_id]);

                const sellerEmail = sellerResult[0]?.email || 'Email not found';
                return {
                    ...listing,
                    seller_email: sellerEmail,
                };
            })
        );

        return listingsWithSellerEmail;
    }
}

module.exports = Carlisting;