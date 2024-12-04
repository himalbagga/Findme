// routes/bookingRoutes.js
const express = require('express');
const { createBooking, getUserBookings, cancelBooking } = require('../controllers/bookingController');

const router = express.Router();

router.post('/create', createBooking);
// router.get('/user/:userId', getUserBookings);
router.get('/user/:userId', (req, res, next) => {
    console.log('GET /api/bookings/user/:userId accessed', req.params.userId);
    next();
  }, getUserBookings);
router.delete('/:bookingId', cancelBooking);

module.exports = router;