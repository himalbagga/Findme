const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('../User'); // Import the user model
const userRoutes = require('../routes/userRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/FindmeDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use('/api', userRoutes);

// API endpoint to handle signup
app.post('/api/signup', async (req, res) => {
  try {
    const { username, email, password, mobileNumber, userType, serviceType, serviceName, location, resume, availableDays, startTime, endTime, price, languages } = req.body;
    const newUser = new User({ username, email, password, mobileNumber, userType, serviceType, serviceName, location, resume, availableDays, startTime, endTime, price, languages });

    await newUser.save();
    res.status(201).json({ message: 'User signed up successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to sign up' });
  }
});

app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});