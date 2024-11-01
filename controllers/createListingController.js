const Carlisting = require('../entities/carlisting');

class createListingController {
    async createListing(req, res) {
        const { carModel, regDate, price, agentEmail, sellerEmail } = req.body;

        try {
            const carListing = new Carlisting();
            const created = await carListing.createListing(carModel, regDate, price, agentEmail, sellerEmail);

            if (created) {
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

module.exports = createListingController;