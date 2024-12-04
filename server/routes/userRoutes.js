const express = require('express');
const { registerUser, loginUser, toggleFavorite, getFavorites } = require('../controllers/userController');
let userController = require('../controllers/userController');

const router = express.Router();

// User registration and login
router.post('/login', loginUser);
router.post('/signup', registerUser);

// User update and profile
router.get('/user/:id', userController.getUserProfile);
router.put('/update/:id', userController.updateUser);

// Routes for managing favorites
router.post('/:userId/favorites/:serviceId/toggle', toggleFavorite); // Handle adding/removiong services to favorites
router.get('/:userId/favorites', getFavorites); // Get all favorite services for a user


module.exports = router; 