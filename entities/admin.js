const db = require('../config/db');
const bcrypt = require('bcrypt');
const User = require('../entities/user');

class Admin extends User{

    
    constructor(adminData = {}) {
        // call parent constructor to initoalize 
        super(adminData);
        
    }


    async check_email(email)
    {
        const user = await this.findByEmail(email);
        return user == null; // return true if the user doees not exist (email is available)

    }

    async createAccount(email, password, username, phoneNumber, role) {

        // check if the email is already in use
        const emailAvailable = await this.check_email(email);
        
        if (!emailAvailable) {
            throw new Error("Email already exists.");
        }

        const profileId = this.getProfileId(role);

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // insert new user into the database
        const query = 'INSERT INTO User (email, password_hash, username, phone, profile_id) VALUES (?, ?, ?, ?, ?)';
        const values = [email, hashedPassword, username, phoneNumber, profileId];

        await db.promise().query(query, values);

        return { success: true, message: "Account created successfully."};

    }



    async getUserAccounts() {

        const query = 'SELECT * FROM User';
        const [rows] = await db.promise().query(query);
        return rows; // returns an array of user accounts

    }

    async updateAccount() {

    }

    async suspendAccount() {

    }

    getProfileId(role) {
        switch(role) {
            case 'admin':
                return 1; 
            case 'agent':
                return 2; 
            case 'buyer':
                return 3; 
            case 'seller':
                return 4; 
            default:
                throw new Error('Invalid role'); // Handle invalid role
        }
    }


}

module.exports = Admin;