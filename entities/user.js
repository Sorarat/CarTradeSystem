const db = require('../config/db');
const bcrypt = require('bcrypt');

class User {
    constructor(userData) {
        this.user_id = userData.user_id;
        this.email = userData.email;
        this.username = userData.username;
        this.password_hash = userData.password_hash;
        this.phone = userData.phone;
        this.suspendStatus = userData.suspendStatus;
        this.profile_id = userData.profile_id;
    }

    static async findByEmail(email) {
        const query = 'SELECT * FROM User WHERE email = ?';
        const [results] = await db.promise().query(query, [email]);

        // return an instance of user if found
        return results.length > 0 ? new User(results[0]) : null;
    }

    static async verifyPassword(password, storedHash) {
        const hash = await bcrypt.hash(password, 10);

        const match = await bcrypt.compare(password, storedHash);
        console.log(`Password: ${password}, Newly hash: ${hash}, Stored Hash: ${storedHash}, Match: ${match}`);
        return match;
    }

    async getRole() {
        const query = 'SELECT role FROM UserProfile WHERE profile_id = ?';
        const [results] = await db.promise().query(query, [this.profile_id]);
        return results.length > 0 ? results[0].role : null;
    }
}

module.exports = User;