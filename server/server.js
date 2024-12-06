const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Loads environment variables
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const multer = require('multer');
const upload = require('./Middleware/multer');


const { sendMail } = require('./controllers/emailController');

const userRoutes = require('./routes/userRoutes'); // User-related routes
const reviewRoutes = require('./routes/reviewRoutes'); // Review-related routes
const serviceRoutes = require('./routes/serviceRoutes'); // Service-related routes
const bookingRoutes = require('./routes/bookingRoutes'); // Booking routes
const resumeRoutes = require('./routes/resumeRoutes'); // Resume related routes

const Stripe = require('stripe');
const stripe = new Stripe('sk_test_51OCe4mKFcgoflAzwSpLvuZj43Iprt97iWvPtZIGErPrm5q1agYUl0a4q2MmNijnxBayf2qipVkRmIxThnIpVqjhB008IF2mYXk');

const app = express();
const PORT = process.env.PORT || 5001 || 5000;

// Middleware for handling cross-origin requests and parsing JSON
app.use(cors());

// app.use(express.urlencoded({ extended: true })); // Parsing URL-encoded data (optional, can be used with 'multer')
// app.use(upload.single('resume'));

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://donotreplyfindme4:AP3F0rVogR7HMr7W@cluster0.4mcfz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'/*'mongodb://localhost:27017/FindmeDB'*/, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Registering all route handlers to specific base paths
app.use('/api/users', userRoutes); // All user-related routes start with /api/users
app.use('/api/services', serviceRoutes); // All service-related routes start with /api/services
app.use('/api/reviews', reviewRoutes); // All review-related routes
app.use('/api/bookings', bookingRoutes); // All booking-related routes start with /api/bookings
app.use('/api/users', resumeRoutes); // All resume-related routes start with /api/_

// API endpoint to handle signup
// app.post('/api/signup', async (req, res) => {
//   try {
//     const { username, email, password, mobileNumber, userType, serviceType, serviceName, location, resume, availableDays, startTime, endTime, price, languages } = req.body;
//     const newUser = new User({ username, email, password, mobileNumber, userType, serviceType, serviceName, location, resume, availableDays, startTime, endTime, price, languages });

//     await newUser.save();
//     res.status(201).json({ message: 'User signed up successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to sign up' });
//   }
// });

// API endpoint for Stripe payment intent
app.post('/api/create-payment-intent', async (req, res) => {
  const { amount, currency, email } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: 'Email is required for payment confirmation' });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in cents
      currency, // e.g., 'usd'
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });

    const message = `Your payment of $${(amount / 100).toFixed(2)} was successful! Thank you for booking!`;
    // sendMail(email, 'Payment Confirmation!', message)
    //   .then(() => console.log(`Confimation email sent to ${email}`))
    //   .catch((error) => console.error(`Error sending email: `, error));

  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

