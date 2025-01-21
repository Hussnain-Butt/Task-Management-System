const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    // Use req.user.id to fetch user details from the database
    const user = await User.findById(req.user.id).select('name email role');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user); // Return user details including role
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};
