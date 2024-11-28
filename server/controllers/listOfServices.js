const User = require('../models/User');

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
