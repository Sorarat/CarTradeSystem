const Carlisting = require('../entities/carlisting');

class searchCarlistingController {
    async searchCarlisting(req, res) {
        const carModel = req.query.carModel || ''; // Extract car model from query parameter
        const agentEmail = req.query.agentEmail || ''; // Extract agent email from query parameter

        try {
            const carlisting = new Carlisting();
            const carlistings = await carlisting.searchCarlistingByModel(carModel, agentEmail);

            return res.status(200).json(carlistings);
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error searching car listings' });
        }
    }
}

module.exports = searchCarlistingController;