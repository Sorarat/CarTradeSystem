const db = require('../config/db');
const bcrypt = require('bcrypt');

// insert test data
async function setupDatabase() {
    // test data password
    adminPassword = await bcrypt.hash("testadminPassword", 10);
    agentPassword = await bcrypt.hash("testagentPassword", 10);
    buyerPassword = await bcrypt.hash("testbuyerPassword", 10);
    sellerPassword = await bcrypt.hash("testsellerPassword", 10);
    suspendedPassword = await bcrypt.hash("testsuspendPassword", 10);
    // test data for all types of users
    await db.promise().query(`INSERT INTO User (email, password_hash, username, phone, profile_id) VALUES ('testadmin@email.com', '${adminPassword}', 'testadmin', '0000000000', 1)`);
    await db.promise().query(`INSERT INTO User (email, password_hash, username, phone, profile_id) VALUES ('testagent@email.com', '${agentPassword}', 'testagent', '1111111111', 2)`);
    await db.promise().query(`INSERT INTO User (email, password_hash, username, phone, profile_id) VALUES ('testbuyer@email.com', '${buyerPassword}', 'testbuyer', '2222222222', 3)`);
    await db.promise().query(`INSERT INTO User (email, password_hash, username, phone, profile_id) VALUES ('testseller@email.com', '${sellerPassword}', 'testseller', '3333333333', 4)`);

    // test data for suspended user
    await db.promise().query(`INSERT INTO User (email, password_hash, username, phone, suspendStatus, profile_id) VALUES ('testsuspend@email.com', '${suspendedPassword}', 'testsuspend', '0000000000', 1, 1)`)
}

async function teardownDatabase() {
    await db.promise().query("DELETE FROM User WHERE email IN ('testadmin@email.com', 'testagent@email.com', 'testbuyer@email.com', 'testseller@email.com', 'testsuspend@email.com')");
    db.end();
}

module.exports = { setupDatabase, teardownDatabase }