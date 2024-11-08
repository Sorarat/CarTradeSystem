const Carlisting = require('../entities/carlisting');

class viewBuyerShortlistedCarsController {
    async viewBuyerShortlistedCars(req, res) {
        const buyerEmail = req.params.buyerEmail;

        try {
            const carlisting =  new Carlisting();
            const buyerShortlistedCars = await carlisting.viewBuyerShortlistedCars(buyerEmail);

            return res.status(200).json(buyerShortlistedCars);
        }

        catch(error) {
            console.error(error);
            return res.status(500).json({ error: 'Error fetching car listings'});
        }
    }
}

module.exports = viewBuyerShortlistedCarsController;