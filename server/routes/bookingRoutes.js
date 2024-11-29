const express = require('express');
const { createBooking } = require('../controllers/bookingController');

const router = express.Router();

router.post('/create', createBooking); // Route to create a new booking

module.exports = router;
