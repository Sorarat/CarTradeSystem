const express = require('express');
const ViewAccountController = require('../controllers/viewAccountController');
const router = express.Router();

const viewAccountController = new ViewAccountController();

// view all accounts
router.get('/view-accounts', (req, res) => viewAccountController.viewUserAccounts(req, res));

// view specific account for update account
router.get('/getAccount/:userId', (req, res) => viewAccountController.getAccount(req, res));

// view all agents accounts
router.get('/view-agents', (req, res) => viewAccountController.viewAllAgents(req, res));

// fetch username
router.get('/fetch-username', (req, res) => viewAccountController.getUserName(req, res));

// fetch personal account
router.get('/fetch-personal-account/:email', (req, res) => viewAccountController.getPersonalAccount(req, res));


module.exports = router;