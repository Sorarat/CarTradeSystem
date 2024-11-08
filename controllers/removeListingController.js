const Shortlist = require('../entities/shortlist');

class removeListingController {
    async removeListing(req, res) {
        const { carId, buyerEmail } = req.body;

        try {
            const shortlist = new Shortlist();
            const removed = await shortlist.removeListing(carId, buyerEmail);

            if (removed) {
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

module.exports = removeListingController;