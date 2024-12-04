const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
let userController = require('../controllers/userController');

const router = express.Router();

// User registration and login
router.post('/login', loginUser);
router.post('/signup', registerUser);

// User update and profile
router.get('/user/:id', userController.getUserProfile);
router.put('/update/:id', userController.updateUser);
router.get('/:id', userController.getUser);

// Resume management

router.get('/:userId/bookings', userController.getUserBookings);

module.exports = router;