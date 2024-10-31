const db = require('../config/db');
const User = require('../entities/user');

class Carlisting {
    // private variables
    #car_id;
    #car_model;
    #reg_date;
    #price;
    #coe_months;
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
        this.#coe_months = carData.coe_months || null;
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

    get getMonths() {
        return this.#coe_months;
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
    async createListing(carModel, regDate, price, coeMonths, agentEmail, sellerEmail) {
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
        const query = 'INSERT INTO Carlisting (car_model, reg_date, price, coe_months, agent_id, seller_id) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [carModel, regDate, price, coeMonths, agent.user_id, seller.user_id];

        const [result] = await db.promise().query(query, values);

        return result.affectedRows > 0;
    }
}

module.exports = Carlisting;