const express = require('express');
const { registerUser } = require('../controllers/userController');

const router = express.Router();

router.post('/signup', registerUser);

// Add more routes here as needed

module.exports = router;