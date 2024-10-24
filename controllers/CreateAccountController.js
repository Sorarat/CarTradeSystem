const Admin = require('../entities/admin');

class CreateAccountController {
    async createAccount(req, res) {
        const { email, password, username, phoneNumber, role } = req.body;

        try {
            const admin = new Admin();
            const canCreate = await admin.createAccount(email, password, username, phoneNumber, role );
            
            if (canCreate) {
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


module.exports = CreateAccountController;