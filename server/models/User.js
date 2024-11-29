const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  serviceName: String,
  location: String,
  languages: [String],
  price: { type: Number, min: 0 },
  //resume: String,
  availableDays: [String],
  startTime: String,
  endTime: String,
});

// Booking Schema (Embedded in User)
const BookingSchema = new mongoose.Schema({
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  serviceName: { type: String, required: true },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true },
  paymentInfo: {
    amount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    paymentStatus: {
      type: String,
      enum: ['Not Paid', 'Paid', 'Pending'],
      default: 'Not Paid',
    },
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please add a username..'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
  },
  mobileNumber: {
    type: String,
    required: [true, 'Please add a mobile number'],
  },
  userType: {
    type: String,
    enum: ['ServiceProvider', 'ServiceSeeker'], // Example values, adjust as needed
  },
  serviceType: {
    type: String,
  },
  serviceName: {
    type: String,
  },
  location: {
    type: String,
  },
  resume: {
    type: String, // Consider using Buffer if you plan to store the file directly in MongoDB
  },
  availableDays: {
    type: [String],
  },
  startTime: {
    type: String,
  },
  endTime: {
    type: String,
  },
  price: {
    type: Number,
    min: 0,
  },
  languages: {
    type: [String],
  },

  services: [ServiceSchema], // New field for multiple services
  bookings: [BookingSchema], // New field for multiple bookings

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model('User', userSchema);
