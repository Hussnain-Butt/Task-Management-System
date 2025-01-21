const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('name email _id'); // Fetch users with only required fields
    res.status(200).json(users); // Return an array of users
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};
