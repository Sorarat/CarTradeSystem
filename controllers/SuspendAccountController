const Admin = require('../entities/admin');

class SuspendAccountController {
    async suspendAccount(req, res) {
        const userId = req.params.userId;

        console.log(`Attempting to suspend account with ID: ${userId}`); // Log the user ID

        try {
            const admin = new Admin();
            const suspended = await admin.suspendAccount(userId);

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


module.exports = SuspendAccountController;