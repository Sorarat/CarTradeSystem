const Admin = require('../entities/admin');
const User = require('../entities/user');

class ViewAccountController {
    // view all accounts
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

    // get specific account for update form
    async getAccount(req, res) {
        const userId = req.params.userId;

        try {
            const admin = new Admin();
            const userAccount = await admin.getAccountById(userId);

            res.json(userAccount);
        }

        catch(error) {
            res.status(500).send({ message: error.message });
            console.error("Error fetching account:", error);
        }
    }

    // view agents 
    async viewAllAgents(req, res) {
        const user = new User();

        try {
            const agentAccounts = await user.getAgentAccounts();
            res.json(agentAccounts);
        }

        catch(error) {
            res.status(500).send({ message: error.message });
            console.error("Error fetching agents:", error); 
        }
    }

}

module.exports = ViewAccountController;