const Profile = require('../entities/userprofile');

class searchProfileController {
    async searchProfile(req, res) {
        const role = req.query.role || ''; // Extract role from query parameter

        try {
            const userProfile = new Profile();
            const profiles = await userProfile.searchProfilesByRole(role);

            return res.status(200).json(profiles);
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error searching profiles' });
        }
    }
}

module.exports = searchProfileController;