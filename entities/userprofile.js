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

    // getters
    get getProfileId() {
        return this.#profile_id;
    }

    get getRole() {
        return this.#role;
    }

    get getRoleDesc() {
        return this.#roleDesc;
    }

    get getSuspendStatus() {
        return this.#suspendStatus;
    }

    async check_role(role, profileId = null) {
        let query = 'SELECT * FROM UserProfile WHERE role = ?';
        const params = [role];
    
        // If profileId is provided (for update), exclude this profile from the check
        if (profileId) {
            query += ' AND profile_id != ?';
            params.push(profileId);
        }
    
        const [existingRoles] = await db.promise().query(query, params);
    
        // Return false if any matching role exists, except for the current profile
        if (existingRoles.length > 0) {
            return false;   // role already exists
        }
    
        return true;  // role is available
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
    // view all profiles
    async getAllProfiles() {
        const query = 'SELECT * FROM UserProfile';
        const [rows] = await db.promise().query(query);
        return rows;
    }


    // update profile
    async updateProfile(profileId, role, roleDesc) {
        // Check if the updated role belongs to another profile
        const roleIsValid = await this.check_role(role, profileId);

        if (roleIsValid) {
            const query = 'UPDATE UserProfile SET role = ?, roleDesc = ? WHERE profile_id = ?';
            await db.promise().query(query, [role, roleDesc, profileId]);
            return true;
        } else {
            return false;
        }
    }

    // suspend profile
    async suspendProfile(profileId) {
        const query = 'UPDATE UserProfile SET suspendStatus = ? WHERE profile_id = ?';
        const [result] = await db.promise().query(query, [true, profileId]);
        return result.affectedRows > 0; 
    }

    
}

module.exports = UserProfile;