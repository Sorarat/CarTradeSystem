const Admin = require('../entities/admin');

class ViewAccountController {
    async viewUserAccounts(req, res) {
        const admin = new Admin();

        try {
            const userAccounts = await admin.getUserAccounts();
            res.json(userAccounts);
        }

        catch (error) {
            res.status(500).send({ message: error.message });
            console.error("Error fetching accounts:", error);  // Log the error

        }
    }

}

module.exports = ViewAccountController;