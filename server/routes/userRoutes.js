const express = require('express');
const { registerUser } = require('../controllers/userController');
const { searchServices } = require('../controllers/serviceController');

const router = express.Router();

router.post('/signup', registerUser);
router.get('/search', searchServices);

// Add more routes here as needed

module.exports = router;