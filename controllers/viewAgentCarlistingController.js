const Carlisting = require('../entities/carlisting');

class viewAgentCarlistingController {
    async viewAgentCarlistings(req, res) {
        const agentEmail = req.params.agentEmail;

        try {
            const carlisting = new Carlisting();
            const agentCarlisting = await carlisting.viewAgentCarListings(agentEmail);

            return res.status(200).json(agentCarlisting);
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error fetching car listings' });
        }
    }
}

module.exports = viewAgentCarlistingController;