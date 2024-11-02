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
}

module.exports = updateCarlistingController;