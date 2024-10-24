const Profile = require('../entities/userprofile');

class suspendProfileController {
    async suspendProfile(req, res) {
        const profileId = req.params.profileId;

        console.log(`Attempting to suspend profile with ID: ${profileId}`); // Log the profile ID


        try {
            const profile = new Profile();
            const suspended = await profile.suspendProfile(profileId);

            if (suspended) {
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

module.exports = suspendProfileController;