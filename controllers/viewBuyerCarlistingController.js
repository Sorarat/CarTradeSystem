const Carlisting = require('../entities/carlisting');

class viewBuyerCarlistingController {
    async viewBuyerCarlistings(req, res) {
        const buyerEmail = req.params.buyerEmail;

        try {
            const carlisting =  new Carlisting();
            const buyerCarlisting = await carlisting.viewAllCarListings(buyerEmail);

            return res.status(200).json(buyerCarlisting);
        }

        catch(error) {
            console.error(error);
            return res.status(500).json({ error: 'Error fetching car listings'});
        }
    }
}

module.exports = viewBuyerCarlistingController;