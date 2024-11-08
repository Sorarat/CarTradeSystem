const Shortlist = require('../entities/shortlist');

class viewBuyerShortlistedCarsController {
    async viewBuyerShortlistedCars(req, res) {
        const buyerEmail = req.params.buyerEmail;

        try {
            const shortlistedCars =  new Shortlist();
            const buyerShortlistedCars = await shortlistedCars.viewBuyerShortlistedCars(buyerEmail);

            return res.status(200).json(buyerShortlistedCars);
        }

        catch(error) {
            console.error(error);
            return res.status(500).json({ error: 'Error fetching car listings'});
        }
    }
}

module.exports = viewBuyerShortlistedCarsController;