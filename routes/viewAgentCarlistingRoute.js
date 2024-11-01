const express = require('express');
const ViewAgentCarlistingController = require('../controllers/viewAgentCarlistingController');
const router = express.Router();

const viewAgentCarlistingController = new ViewAgentCarlistingController();
// view all agent's car listing
router.get('/view-carlisting/:agentEmail', (req, res) => viewAgentCarlistingController.viewAgentCarlistings(req, res));

module.exports = router;