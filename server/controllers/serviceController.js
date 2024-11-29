const User = require('../models/User');

// @desc    Get search results based on the query
// @route   GET /api/services/search
// @access  Public
exports.searchServices = async (req, res) => {
  const { q, maxPrice } = req.query; // Extract query parameters from the URL
  const searchQuery = q ? String(q) : ''; // Default to an empty string if `q` is not provided

  try {
    console.log('Attempting to find users with services matching the criteria...');

    // Find users who have at least one service matching the criteria
    const users = await User.find({
      services: {
        $elemMatch: {
          serviceName: { $regex: new RegExp(searchQuery, 'i') }, // Match serviceName with regex
          ...(maxPrice && { price: { $lte: Number(maxPrice) } }) // Match maxPrice if provided
        },
      },
    });

    // Debugging: Log users with matched services
    console.log('Users matching query:', JSON.stringify(users, null, 2));

    // Extract all matching services from users
    const filteredServices = users.flatMap(user =>
      user.services.filter(service =>
        service.serviceName.match(new RegExp(searchQuery, 'i')) &&
        (!maxPrice || service.price <= maxPrice)
      )
    );

    // Debugging: Log filtered services
    console.log('Filtered services:', JSON.stringify(filteredServices, null, 2));

    // Return the filtered services
    if (filteredServices.length === 0) {
      return res.status(404).json({ results: [] });
    }

    res.status(200).json({ results: filteredServices });
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Fetch all services from all users
// @route   GET /api/services/listofservices
// @access  Public
exports.getAllServices = async (req, res) => {
  try {
    // Fetch all users who have services
    const users = await User.find({ 'services': { $exists: true, $ne: [] } });

    if (!users.length) {
      return res.status(404).json({ message: 'No services available' });
    }

    // Flatten the services array from all users
    const allServices = users.flatMap(user => user.services);

    console.log("Log???", allServices); // Optional, for debugging

    res.status(200).json(allServices); // Return the list of services
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Search for services by name or location
// @route   GET /api/services/search
// @access  Public
exports.searchServices = async (req, res) => {
  const { q } = req.query;

  try {
    console.log('Attempting to find users with services matching the criteria...');

    // Find users with matching services in their `services` array
    const users = await User.find({
      services: {
        $elemMatch: {
          $or: [
            { serviceName: { $regex: q, $options: 'i' } },
            { location: { $regex: q, $options: 'i' } },
          ],
        },
      },
    });

    // Extract the matching services from those users
    const results = users.flatMap(user =>
      user.services.filter(service =>
        service.serviceName.match(new RegExp(q, 'i')) ||
        service.location.match(new RegExp(q, 'i'))
      )
    );

    res.status(200).json({ results });
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).json({ error: 'Error fetching search results' });
  }
};

// @desc    Add a service for a specific user
// @route   POST /api/users/:id/services
// @access  Public
exports.addService = async (req, res) => {
  try {
    const userId = req.params.id;
    const { serviceName, location, languages, price, availableDays, startTime, endTime } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newService = {

      serviceName,
      location,
      languages,
      price,
      availableDays,
      startTime,
      endTime,
    };

    user.services.push(newService);


    await user.save();

    res.status(200).json({
      message: 'Service added successfully',
      user,
    });
    console.log('Service added successfully');
  } catch (error) {
    console.error('Error adding service: ', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get details for a specific service by ID
// @route   GET /api/services/:serviceId
// @access  Public
exports.getServiceById = async (req, res) => {
  const { serviceId } = req.params;
  try {
    const service = await User.findOne({ 'services._id': serviceId }, { 'services.$': 1 });

    if (!service || !service.services.length) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(service.services[0]);
  } catch (error) {
    console.error('Error fetching service details:', error);
    res.status(500).json({ message: 'Error fetching service details', error });
  }
};

exports.getAllServices = async (req, res) => {
  try {
    // Fetch all users who have services
    const users = await User.find({ 'services': { $exists: true, $ne: [] } });

    if (!users.length) {
      return res.status(404).json({ message: 'No services available' });
    }

    // Flatten the services array from all users
    const allServices = users.flatMap(user => user.services);

    console.log(allServices); // Optional, for debugging

    res.status(200).json(allServices); // Return the list of services
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
