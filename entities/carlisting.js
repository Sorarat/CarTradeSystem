const db = require('../config/db');

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
    async createListing(carModel, regDate, price, coeMonths, sellerEmail) {
        
    }
}