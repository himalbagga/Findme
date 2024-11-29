const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    status: { type: String, default: 'Pending' },
    paymentInfo: {
        amount: Number,
        paymentMethod: String,
        paymentStatus: {
            type: String,
            enum: ['Not Paid', 'Paid', 'Pending'],
            default: 'Not Paid',
        },
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Booking', BookingSchema);
