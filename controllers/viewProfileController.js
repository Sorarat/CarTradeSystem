const Profile = require('../entities/userprofile');

class viewProfileController {
    async viewProfiles(req, res) {
        try {
            const aProfile = new Profile();
            const profiles = await aProfile.getAllProfiles();

            res.json(profiles);
        }
        catch (error) {
            res.status(500).send({ message: error.message });
            console.error("Error fetching profiles:", error);
        }
    }
}

module.exports = viewProfileController;