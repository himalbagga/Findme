const User = require('../models/User');
const Service = require('../models/Service');


// @desc    Create a new booking
// @route   POST /api/bookings/create
// @access  Public
exports.createBooking = async (req, res) => {
    try {
        const { userId, serviceId, date, timeSlot, paymentInfo } = req.body;

        // Find the user and service by their IDs
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const service = user.services.id(serviceId);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        // Create a new booking
        const newBooking = {
            serviceId,
            serviceName: service.serviceName,
            date,
            timeSlot,
            paymentInfo: {
                amount: paymentInfo.amount,
                paymentMethod: paymentInfo.paymentMethod,
                paymentStatus: paymentInfo.paymentStatus,
            },
        };

        // Add booking to user's bookings array
        user.bookings.push(newBooking);
        await user.save();

        res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.cancelBooking = async (req, res) => {
    try {
        const { userId, bookingId } = req.body;

        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const bookingIndex = user.bookings.findIndex(
            (booking) => booking._id.toString() === bookingId
        );

        if (bookingIndex === -1) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        user.bookings.splice(bookingIndex, 1);
        await user.save();

        res.status(200).json({ message: 'Booking cancelled successfully' });
    } catch (error) {
        console.error('Error cancelling booking: ', error);
        res.status(500).json({ message: 'Server error' });
    }
};