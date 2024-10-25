const Profile = require('../entities/userprofile');

class viewProfileController {
    // view all profiles
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

    // get specific profile for update form
    async getProfile(req, res) {
        const profileId = req.params.profileId;

        try {
            const aProfile = new Profile();
            const userProfile = await aProfile.getProfileById(profileId);

            res.json(userProfile);
        }
        catch (error) {
            res.status(500).send({ message: error.message });
            console.error("Error fetching profile:", error);
        }
    }
}

module.exports = viewProfileController;