const db = require('../config/db');
const bcrypt = require('bcrypt');

class User {
    // private variables
    #user_id;
    #email;
    #username;
    #password_hash;
    #phone;
    #suspendStatus;
    #profile_id;

    constructor(userData = {}) {
        this.#user_id = userData.user_id || null;
        this.#email = userData.email || '';
        this.#username = userData.username || '';
        this.#password_hash = userData.password_hash || '';
        this.#phone = userData.phone || '';
        this.#suspendStatus = userData.suspendStatus || false;
        this.#profile_id = userData.profile_id || null;
    }

    // getters
    get getUserId() {
        return this.#user_id;
    }

    get getEmail() {
        return this.#email;
    }

    get getUsername() {
        return this.#username;
    }

    get getPhone() {
        return this.#phone;
    }

    get getSuspendStatus() {
        return this.#suspendStatus;
    }

    get getProfileId() {
        return this.#profile_id;
    }

    // async findByEmail(email) {
    //     const query = 'SELECT * FROM User WHERE email = ?';
    //     const [results] = await db.promise().query(query, [email]);

    //     // Return plain user data object if found
    //     return results.length > 0 ? results[0] : null; // Return user data or null
    // }

    async findByEmail(email) {
        const lowercasedEmail = email.toLowerCase();  // Convert input email to lowercase
        const query = 'SELECT * FROM User WHERE LOWER(email) = ?';  // Ensure case-insensitive comparison
        const [results] = await db.promise().query(query, [lowercasedEmail]);
    
        return results.length > 0 ? results[0] : null;
    }
    

    async verifyPassword(password) {
        return await bcrypt.compare(password, this.#password_hash);
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

        const isPasswordValid = await userInstance.verifyPassword(password);
        if (!isPasswordValid) {
            return false; // Invalid password
        }

        if (userInstance.getSuspendStatus) {
            return false; // User is suspended
        }

        const userRole = await this.getRole(userInstance.getProfileId); // Use instance method
        if (userRole !== role) {
            return false; // Role does not match
        }

        return true; // All checks passed, valid user

    }
}

module.exports = User;