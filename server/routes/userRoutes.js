const express = require('express');
const { registerUser } = require('../controllers/userController');
const { updateUser } = require('../controllers/updateUser');
const { searchServices } = require('../controllers/serviceController');

const router = express.Router();

router.post('/signup', registerUser);
router.get('/search', searchServices);

// Add more routes here as needed
router.put('/update/:id', updateUser);

module.exports = router;