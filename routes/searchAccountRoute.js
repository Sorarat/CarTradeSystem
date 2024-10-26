const express = require('express');
const SearchAccountController = require('../controllers/searchAccountController');
const router = express.Router();

const searchAccountController = new SearchAccountController();
// search accounts
router.get('/searchAccounts', (req, res) => searchAccountController.searchAccount(req, res));

module.exports = router;