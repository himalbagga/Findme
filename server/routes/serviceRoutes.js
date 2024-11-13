const express = require('express');
const { searchServices } = require('../controllers/serviceController');

const router = express.Router();

// Route to handle search
router.get('/search', searchServices);

module.exports = router;
