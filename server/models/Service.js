const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  
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
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
