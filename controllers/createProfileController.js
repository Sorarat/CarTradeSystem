const Profile = require('../entities/userprofile');

class createProfileController {
    async createProfile(req, res) {
        const { role, description } = req.body;

        try {
            const profile = new Profile();
            const created = await profile.createProfile(role, description);

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

module.exports = createProfileController;