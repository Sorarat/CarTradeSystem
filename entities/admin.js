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

    // get specific account for update form
    async getAccountById(userId) {
        const query = `SELECT User.*, role FROM User 
                        LEFT JOIN 
                        UserProfile ON User.profile_id = UserProfile.profile_id
                        WHERE User.user_id = ?`;
        const [rows] = await db.promise().query(query, [userId]);

        return rows[0] || null; // Return the first result if exists, otherwise null
    }

    async createAccount(email, password, username, phoneNumber, profile_id) {

        // check if the email is already in use
        const emailAvailable = await this.check_email(email);
        
        if (!emailAvailable) {
            throw new Error("Email already exists.");
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // insert new user into the database
        const query = 'INSERT INTO User (email, password_hash, username, phone, profile_id) VALUES (?, ?, ?, ?, ?)';
        const values = [email, hashedPassword, username, phoneNumber, profile_id];

        await db.promise().query(query, values);

        return true;

    }

    async findById(userId) {
        const query = 'SELECT * FROM User WHERE user_id = ?';
        const [rows] = await db.promise().query(query, [userId]);
    
        // return the first user found or null
        return rows.length > 0 ? rows[0] : null;
    }
    
    async getUserAccounts() {

        const query = 'SELECT * FROM User';
        const [rows] = await db.promise().query(query);
        return rows; // returns an array of user accounts

    }

    async updateAccount(userId, email, password, username, phoneNumber) {
        
        // Check if an account with the provided email exists (this could be the current user's email or another user's)
        const existingUser = await this.findByEmail(email);

        // If the email exists and belongs to a different user, return an error
        if (existingUser && existingUser.user_id !== Number(userId)) {
            return false;   
        }

        // Hash the password 
        const hashedPassword = await bcrypt.hash(password, 10)

        // Perform the update
        const query = 'UPDATE User SET email = ?, password_hash = ?, username = ?, phone = ? WHERE user_id = ?';
        const [result] = await db.promise().query(query, [email, hashedPassword, username, phoneNumber, userId]);

        return result.affectedRows > 0 ? true : false;
    }


    async suspendAccount(user_id) {
        const query = 'UPDATE User SET suspendStatus = ? WHERE user_id = ?';
        const [result] = await db.promise().query(query, [true, user_id]);
        return result.affectedRows > 0;

    }

    async searchAccountByEmail(email) {
        const query = 'SELECT * FROM User WHERE LOWER(email) LIKE ?';
        const [rows] = await db.promise().query(query, [`%${email.toLowerCase()}%`]);
        return rows; // returns an array of user accounts
    }

}

module.exports = Admin;