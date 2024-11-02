const User = require('../entities/user');

class loginController {
    async login(req, res) {
        const { email, password, role } = req.body;

        try {
            const user = new User();
            const canLogin = await user.login(email, password, role);
            
            // If all checks pass, return success response
            if (canLogin) {
                return res.status(200).json({ success: true });
            } else {
                return res.status(403).json({ success: false });
            }

        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false });
        }
    }
};

module.exports = loginController;