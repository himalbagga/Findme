const Service = require('../models/Service');

// @desc    Get search results based on the query
// @route   GET /api/services/search
// @access  Public
exports.searchServices = async (req, res) => {
  const { query } = req.query; // Extract query from the URL

  

  // Check if query is not a string or empty, set it to an empty string
//   console.log(typeof query);
//   console.log(query);
  const searchQuery = typeof query === 'string' ? query : '';

  try {
    // Search for services that match the query in serviceName, location, or languages
    const results = await Service.find({
      $or: [
        { serviceName: { $regex: new RegExp(searchQuery, 'i') } },  // Search for serviceName
        // { location: { $regex: query, $options: 'i' } },    // Search for location
        // { languages: { $in: [query] } }                     // Search if the language exists in the array
      ],
    });
    console.log(results);
    // Respond with the results
    res.status(200).json({ results });
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

