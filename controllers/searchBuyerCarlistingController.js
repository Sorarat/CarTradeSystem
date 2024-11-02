const Carlisting = require('../entities/carlisting');

class searchBuyerCarlistingController {
    async searchBuyerCarlisting(req, res) {
        const carModel = req.query.carModel || '';
        const minPrice = req.query.minPrice || 0;
        const maxPrice = req.query.maxPrice || 0;
        
        try {
            const carlisting = new Carlisting();
            const carlistings = await carlisting.searchForCarListing(carModel, minPrice, maxPrice);

            return res.status(200).json(carlistings);
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error searching car listings' });
        }
    }
}

module.exports = searchBuyerCarlistingController;