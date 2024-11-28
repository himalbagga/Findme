const express = require('express');
const router = express.Router();
const listOfServicesController = require('../controllers/listOfServices');

// Route to get all services
router.get('/listofservices', listOfServicesController.getAllServices);

module.exports = router;
