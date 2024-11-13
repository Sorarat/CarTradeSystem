const Carlisting = require('../entities/carlisting');

class updateCarlistingController {
    async updateCarlisting(req, res) {
        const carId = req.params.car_id;
        const { car_model, reg_date, price, seller_email, status } = req.body;

        try {
            const carlisting = new Carlisting();
            const updated = await carlisting.updateCarListing(carId, car_model, reg_date, price, seller_email, status);

            if (updated) {
                return res.status(200).json({ success: true });
            } else {
                return res.status(403).json({ success: false });
            }
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ success: false });
        }
    }

    /* hidden functions onwards */ 

    async increaseListingNumViews(req, res) {
        const carId = req.params.car_id;

        try {
            const carlisting = new Carlisting();
            const increaseViews = await carlisting.increaseListingNumViews(carId);

            if (increaseViews) {
                return res.status(200).json({ success: true });
            }
            else {
                return res.status(403).json({ success: false });
            }
        }

        catch(error) {
            console.error(error);
            return res.status(500).json({ success: false });
        }   
    }

    async increaseListingNumShortlist(req, res) {
        const carId = req.params.car_id;

        try {
            const carlisting = new Carlisting();
            const increaseNumShortlist = await carlisting.increaseListingNumShortlist(carId);

            if (increaseNumShortlist) {
                return res.status(200).json({ success: true });
            }
            else {
                return res.status(403).json({ success: false });
            }
        }

        catch(error) {
            console.error(error);
            return res.status(500).json({ success: false });
        }
    }

    async decreaseListingNumShortlist(req, res) {
        const carId = req.params.car_id;

        try {
            const carlisting = new Carlisting();
            const decreaseNumShortlist = await carlisting.decreaseListingNumShortlist(carId);

            if (decreaseNumShortlist) {
                return res.status(200).json({ success: true });
            }
            else {
                return res.status(403).json({ success: false });
            }
        }

        catch(error) {
            console.error(error);
            return res.status(500).json({ success: false });
        }
    }
}

module.exports = updateCarlistingController;