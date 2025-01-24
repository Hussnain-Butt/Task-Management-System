const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    const profilePicture = req.file ? `/uploads/${req.file.filename}` : null;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }
  
      const user = new User({
        name,
        email,
        password,
        profilePicture, // Save profile picture path
      });
  
      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Error registering user' });
    }
  };


  exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log('Request Body:', req.body);
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        console.log('User not found');
        return res.status(400).json({ error: 'Invalid email or password' });
      }
  
      console.log('User Found:', user);
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log('Password mismatch');
        return res.status(400).json({ error: 'Invalid email or password' });
      }
  
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
      console.log('Login successful');
      res.json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          profilePicture: user.profilePicture,
        },
      });
    } catch (err) {
      console.error('Error logging in:', err);
      res.status(500).json({ error: 'Error logging in' });
    }
  };
  
  
  
  exports.getMe = async (req, res) => {
    try {
      const user = await User.findById(req.user._id).select('-password'); // Exclude the password
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user:', error.message);
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  };
  