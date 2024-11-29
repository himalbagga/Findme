const express = require('express');
const {
    searchServices,
    getAllServices,
    addService,
    getServiceById,
} = require('../controllers/serviceController');
const router = express.Router();

// Route to search for services by name or location
router.get('/search', searchServices);

// Route to fetch all services from all users
router.get('/listofservices', getAllServices);

// Route to add a service to a user
router.post('/users/:id/services', addService);

// Route to get details for a specific service by ID
router.get('/:serviceId', getServiceById);

module.exports = router;
