const db = require('../config/db');
const bcrypt = require('bcrypt');

class User {
    constructor(userData = {}) {
        this.user_id = userData.user_id || null;
        this.email = userData.email || null;
        this.username = userData.username || null;
        this.password_hash = userData.password_hash || null;
        this.phone = userData.phone || null;
        this.suspendStatus = userData.suspendStatus || false;
        this.profile_id = userData.profile_id || null;
    }

    async findByEmail(email) {
        const query = 'SELECT * FROM User WHERE email = ?';
        const [results] = await db.promise().query(query, [email]);

        // Return plain user data object if found
        return results.length > 0 ? results[0] : null; // Return user data or null
    }

    async getRole(profile_id) {
        const query = 'SELECT role FROM UserProfile WHERE profile_id = ?';
        const [results] = await db.promise().query(query, [profile_id]);
        return results.length > 0 ? results[0].role : null;
    }

    async login(email, password, role) {
        
        const userData = await this.findByEmail(email); // Get plain user data
        if (!userData) {
            return false; // Return false if user not found
        }

        // Create an instance of User using the user data
        const userInstance = new User(userData);

        const isPasswordValid = await bcrypt.compare(password, userInstance.password_hash);
        if (!isPasswordValid) {
            return false; // Invalid password
        }

        if (userInstance.suspendStatus) {
            return false; // User is suspended
        }

        const userRole = await this.getRole(userInstance.profile_id); // Use instance method
        if (userRole !== role) {
            return false; // Role does not match
        }

        return true; // All checks passed, valid user

    }
}

module.exports = User;