const Carlisting = require('../entities/carlisting');

class viewSellerCarlistingController {
    async viewSellerCarlistings(req, res) {
        const sellerEmail = req.params.sellerEmail;

        try {
            const carlisting = new Carlisting();
            const sellerCarlisting = await carlisting.viewSellerCarListings(sellerEmail);

            return res.status(200).json(sellerCarlisting);
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error fetching car listings' });
        }
    }
}

module.exports = viewSellerCarlistingController;