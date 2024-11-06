const Carlisting = require('../entities/carlisting');

class deleteCarlistingController {
    async deleteCarlisting(req, res) {
        const carId = req.params.car_id;

        console.log(`Attempting to delete car listing with ID: ${carId}`); // Log the profile ID

        try {
            const carlisting = new Carlisting();
            const deleted = await carlisting.deleteCarListing(carId);

            if (deleted) {
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

module.exports = deleteCarlistingController;