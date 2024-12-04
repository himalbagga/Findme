// controllers/bookingController.js
const Booking = require('../models/Booking');
const User = require('../models/User');
const mongoose = require('mongoose');

exports.createBooking = async (req, res) => {
  try {
    const { userId, serviceProviderId, date, timeSlot, paymentInfo } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const serviceProvider = await User.findById(serviceProviderId);
    if (!serviceProvider) {
      return res.status(404).json({ message: 'Service provider not found' });
    }

    const newBooking = new Booking({
      user: userId,
      serviceProvider: serviceProviderId,
      date,
      timeSlot: Object.keys(timeSlot).map((day) => ({
        day,
        startTime: timeSlot[day].startTime,
        endTime: timeSlot[day].endTime,
      })),
      paymentInfo
    });

    await newBooking.save();

    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    // const userId = req.params.userId;
    const { userId } = req.params;
    console.log('Fetching bookings for user ID:', userId);

    // const user = await User.findById(userId);
    // if (!user) {
    //   console.log('User not found');
    //   return res.status(404).json({ message: 'User not found' });
    // }

        // Convert userId to ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
          return res.status(400).json({ message: 'Invalid user ID format' });
        }

    // const bookings = await Booking.find({ user: userId }).populate('serviceProvider', 'serviceName location price');
    // console.log('Bookings found:', bookings);

    // if (bookings.length === 0) {
    //   console.log('No bookings found for user');
    // }

     // Create a new ObjectId instance
     const objectId = new mongoose.Types.ObjectId(userId);


    const bookings = await Booking.find({ user: objectId });
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findByIdAndDelete(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ message: 'Server error' });
  }
};