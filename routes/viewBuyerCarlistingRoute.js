const express = require('express');
const ViewBuyerCarlistingController = require('../controllers/viewBuyerCarlistingController');
const router = express.Router();

const viewBuyerCarlistingController = new ViewBuyerCarlistingController();
// viw all buyer's car listing
router.get('/view-buyer-carlisting', (req, res) => viewBuyerCarlistingController.viewBuyerCarlistings(req, res));

module.exports = router;