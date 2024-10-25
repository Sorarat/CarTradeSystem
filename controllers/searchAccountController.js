const Admin = require('../entities/admin');

class searchAccountController {
    async searchAccount(req, res) {
        const email = req.query.email || ''; // extract email from query parameter
        
        try {
            const admin = new Admin();
            const accounts = await admin.searchAccountByEmail(email);

            return res.status(200).json(accounts);
        }

        catch(error) {
            console.error(error);
            return res.status(500).json({ error: 'Error searching accounts' });
        }
    }
}

module.exports = searchAccountController;