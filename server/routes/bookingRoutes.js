const express = require('express');
const { createBooking, cancelBooking } = require('../controllers/bookingController');

const router = express.Router();

router.post('/create', createBooking); // Route to create a new booking

router.delete('/cancel', cancelBooking); // Delete endpoint for cancelling a booking

module.exports = router;
