const express = require('express');
const DeleteCarlistingController = require('../controllers/deleteCarlistingController');
const router = express.Router();

const deleteCarlistingController = new DeleteCarlistingController();

router.delete('/deleteCarlisting/:car_id', (req, res) => deleteCarlistingController.deleteCarlisting(req, res));

module.exports = router;