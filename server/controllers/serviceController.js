//const Service = require('../models/Service');
const User = require('../User');

// @desc    Get search results based on the query
// @route   GET /api/services/search
// @access  Public
exports.searchServices = async (req, res) => {
  const { q, maxPrice } = req.query; // Extract query from the URL
  const searchQuery = String(q);
  // Check if query is not a string or empty, set it to an empty string
//   console.log(typeof query);
  console.log(searchQuery);
  //searchQuery = typeof query === 'string' ? query : 'carpainter';
  console.log(typeof searchQuery);

  const filter = {
    serviceName: { $regex: new RegExp(searchQuery, 'i') },  // Search for serviceName using regex (case-insensitive)
  };

  if (maxPrice) {
    filter.price = { ...filter.price, $lte: Number(maxPrice) };  // Maximum price filter
  }

  try {
    // Search for services that match the query in serviceName, location, or languages
    const results = await User.find(filter);
    // ({
    //   $or: [
    //     { serviceName: { $regex: new RegExp(searchQuery, 'i') } },  // Search for serviceName
    //     // { location: { $regex: query, $options: 'i' } },    // Search for location
    //     // { languages: { $in: [query] } }                     // Search if the language exists in the array
    //   ],
    // });
    console.log(results);
    
    res.status(200).json({ results });
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

