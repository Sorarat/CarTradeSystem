const Shortlist = require('../entities/shortlist');

class saveListingController {
    async saveListing(req, res) {
        const { carId, buyerEmail } = req.body;

        try {
            const shortlist = new Shortlist();
            const saved = await shortlist.saveListing(carId, buyerEmail);

            if (saved) {
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

module.exports = saveListingController;