const express = require('express');
const ViewAccountController = require('../controllers/ViewAccountController');
const router = express.Router();

const viewAccountController = new ViewAccountController();

router.get('/view-accounts', (req, res) => viewAccountController.viewUserAccounts(req, res));

module.exports = router;