const db = require('../config/db');

class UserProfile {
    // private variables
    #profile_id;
    #role;
    #roleDesc;
    #suspendStatus

    constructor(profileData = {}) {
        this.#profile_id = profileData.profile_id || null;
        this.#role = profileData.role || '';
        this.#roleDesc = profileData.roleDesc || '';
        this.#suspendStatus = profileData.suspendStatus || false;
    }

    async check_role(role) {
        const query = 'SELECT * FROM UserProfile WHERE role = ?';
        const [existingRoles] = await db.promise().query(query, [role]);

        if (existingRoles.length > 0) {
            return false;   // role already exist
        }

        return true;
    }

    // create profile
    async createProfile(role, description) {
        // check if role already exist
        const existingRole = await this.check_role(role);
        
        if (existingRole) {
            const query = 'INSERT INTO UserProfile (role, roleDesc) VALUES (?, ?)';
            await db.promise().query(query, [role, description]);
            return true;
        }
        else {
            return false;
        }
    }

    async getAllProfiles() {
        const query = 'SELECT * FROM UserProfile';
        const [rows] = await db.promise().query(query);
        return rows;
    }



    
}

module.exports = UserProfile;