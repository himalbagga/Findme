const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const User = require('./models/User'); // Import the user model
const Service = require('./models/Service');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const serviceRoutes = require('./routes/listOfServices'); // Correct the import for service routes
const Stripe = require('stripe');

require('dotenv').config();

const stripe = new Stripe('sk_test_51OCe4mKFcgoflAzwSpLvuZj43Iprt97iWvPtZIGErPrm5q1agYUl0a4q2MmNijnxBayf2qipVkRmIxThnIpVqjhB008IF2mYXk'); 

const app = express();
const PORT = process.env.PORT || 5001 || 5000;


app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://donotreplyfindme4:AP3F0rVogR7HMr7W@cluster0.4mcfz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'/*'mongodb://localhost:27017/FindmeDB'*/, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// API Routes
app.use('/api', userRoutes);
app.use('/api/services', serviceRoutes); // Only use this once
app.use('/api/reviews', reviewRoutes);

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

// API endpoint for Stripe payment intent
app.post('/api/create-payment-intent', async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in cents
      currency, // e.g., 'usd'
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: error.message });
  }
});

// Route to fetch all services from all users
app.get('/api/listofservices', async (req, res) => {
  try {
    // Fetch users with 'serviceName', 'location', and 'price' fields
    const users = await User.find({
      serviceName: { $exists: true, $ne: null },
      location: { $exists: true, $ne: null },
      price: { $exists: true, $ne: null }
    })
    .select('serviceName location price'); // Select only serviceName, location, and price fields

    // If no services are found, send a 404 response
    if (users.length === 0) {
      return res.status(404).json({ message: 'No services available' });
    }

    // Map over the users and extract the necessary service data
    const services = users.map(user => ({
      serviceName: user.serviceName,
      location: user.location,
      price: user.price,
    }));

    res.status(200).json({ services });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Error fetching services', error });
  }
});


// Search for services by name or location (if enabled)
app.get('/api/services/search', async (req, res) => {
  const query = req.query.q;
  try {
    const results = await Service.find({
      $or: [
        { serviceName: { $regex: query, $options: 'i' } },
        { location: { $regex: query, $options: 'i' } }
      ]
    });

    res.json({ results });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching search results' });
  }
});

// Add a service for a user
app.post('/api/users/:id/services', async (req, res) => {
  try {
    const userId = req.params.id;
    const { serviceName, location, languages, price, availableDays, startTime, endTime } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newService = { serviceName, location, languages, price, availableDays, startTime, endTime };
    user.services.push(newService);

    await user.save();

    res.status(201).json({ message: 'Service added successfully', user });
  } catch (error) {
    console.error('Error adding service:', error);
    res.status(500).json({ error: 'Failed to add service' });
  }
});

// Get details for a specific service by ID
app.get('/api/services/:serviceId', async (req, res) => {
  const { serviceId } = req.params;
  try {
    const service = await User.findOne({ 'services._id': serviceId }, { 'services.$': 1 });

    if (!service || !service.services.length) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(service.services[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching service details', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
