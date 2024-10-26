const Profile = require('../entities/userprofile');

class updateProfileController {
    async updateProfile(req, res) {
        const profileId = req.params.profileId;
        const { role, description } = req.body;

        try {
            const profile = new Profile();
            const updated = await profile.updateProfile(profileId, role, description);

            if (updated) {
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

module.exports = updateProfileController;