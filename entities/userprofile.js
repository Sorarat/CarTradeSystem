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

    // get specific profile for update form
    async getProfileById(profileId) {
        const query = 'SELECT * FROM UserProfile WHERE profile_id = ?';
        const [rows] = await db.promise().query(query, [profileId]);

        return rows[0] || null;  // Return the first result if exists, otherwise null
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
    async updateProfile(profileId, roleDesc) {
        const query = 'UPDATE UserProfile SET roleDesc = ? WHERE profile_id = ?';
        const [result] = await db.promise().query(query, [roleDesc, profileId]);
        return result.affectedRows > 0;

    }

    // suspend profile
    async suspendProfile(profileId) {
        try {
            const query = 'UPDATE UserProfile SET suspendStatus = ? WHERE profile_id = ?';
            const [result] = await db.promise().query(query, [true, profileId]);

            if (result.affectedRows > 0) { // Profile suspension successful
                const accountSuspensionQuery = 'UPDATE User SET suspendStatus = ? WHERE profile_id = ?';
                const [accountResult] = await db.promise().query(accountSuspensionQuery, [true, profileId]);

                // Return true if either accounts were suspended or no accounts found but profile was suspended
                return accountResult.affectedRows > 0 || true;
            } else {
                console.warn(`No profile found with profile_id: ${profileId}`);
            }

            return false; // Profile suspension failed
        } catch (error) {
            console.error('Error suspending profile and related accounts:', error);
            return false;
        }
    }


    // search profile by role
    async searchProfilesByRole(role) {
        const query = 'SELECT * FROM UserProfile WHERE LOWER(role) LIKE ?';
        const [rows] = await db.promise().query(query, [`%${role.toLowerCase()}%`]);
        return rows;
    }

    // get all active roles for create account form
    async getAllRoles() {
        const query = 'SELECT profile_id, role FROM UserProfile WHERE suspendStatus != 1';
        const [rows] = await db.promise().query(query);
        return rows;
    }    
}

module.exports = UserProfile;