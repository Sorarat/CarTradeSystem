// test login controller
const LoginController = require("../controllers/loginController");
const { setupDatabase, teardownDatabase } = require('../tests/testDatabaseSetup');

// Mock response function for simulating the Express response object
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('LoginController - login', () => {
    let loginController;

    // Initialize the controller instance
    beforeAll(async () => {
        loginController = new LoginController(); // Creates an instance of the controller
        await setupDatabase(); // Populate the test database with data
    });

    // Clean up test data after all tests
    afterAll(async () => {
        await teardownDatabase(); // Remove the test data from the database
    });

    // test admin login
    test('Successful admin login with valid credentials and role', async () => {
        const req = {
            body: {
                email: 'testadmin@email.com',
                password: 'testadminPassword', // Use actual password hash if needed
                role: 'admin'
            }
        };
        const res = mockResponse();

        await loginController.login(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: true });
    });

    // test agent login
    test('Successful agent login with valid credentials and role', async () => {
        const req = {
            body: {
                email: 'testagent@email.com',
                password: 'testagentPassword', // Use actual password hash if needed
                role: 'agent'
            }
        };
        const res = mockResponse();

        await loginController.login(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: true });
    });

    // test buyer login
    test('Successful buyer login with valid credentials and role', async () => {
        const req = {
            body: {
                email: 'testbuyer@email.com',
                password: 'testbuyerPassword', // Use actual password hash if needed
                role: 'buyer'
            }
        };
        const res = mockResponse();

        await loginController.login(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: true });
    });

    // test seller login
    test('Successful seller login with valid credentials and role', async () => {
        const req = {
            body: {
                email: 'testseller@email.com',
                password: 'testsellerPassword', // Use actual password hash if needed
                role: 'seller'
            }
        };
        const res = mockResponse();

        await loginController.login(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: true });
    });

    // test suspended user
    test('Failed login due to suspended user', async () => {
        const req = {
            body: {
                email: 'testsuspend@email.com',
                password: 'testsuspendPassword', // Use actual password hash if needed
                role: 'admin'
            }
        };
        const res = mockResponse();

        await loginController.login(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ success: false });
    });

    // test for incorrect password
    test('Failed login due to incorrect password', async () => {
        const req = {
            body: {
                email: 'testadmin@email.com',
                password: 'testagentPassword',      // incorrect password
                role: 'admin'
            }
        };
        const res = mockResponse();

        await loginController.login(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ success: false });
    });

    // test for incorrect username
    test('Failed login due to incorrect username', async () => {
        const req = {
            body: {
                email: 'testadmin@email.com',       // incorrect username
                password: 'testagentPassword',
                role: 'agent'
            }
        };
        const res = mockResponse();

        await loginController.login(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ success: false });
    });

    // test for incorrect role
    test('Failed login due to incorrect role', async () => {
        const req = {
            body: {
                email: 'testadmin@email.com',   
                password: 'testadminPassword',
                role: 'agent'       // incorrect role
            }
        };
        const res = mockResponse();

        await loginController.login(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ success: false });
    });
});