const Admin = require('../entities/admin');

class UpdateAccountController {
    async updateAccount(req, res) {
        const userId = req.params.userId;
        const { email, password, username, phoneNumber, role } = req.body;

        try {
            const admin = new Admin();
            const updated = await admin.updateAccount(userId, email, password, username, phoneNumber, role);
            
            if (updated) {
                return res.status(200).json({ success: true });
            }
            else {
                return res.status(403).json({ success: false});
            }
        }

        catch (error) {
            console.error(error);
            return res.status(500).json({ success: false });
        }
    }
}

module.exports = UpdateAccountController;