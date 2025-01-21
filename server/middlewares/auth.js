const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to authMiddleware routes
const authMiddleware = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to req object
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Move to the next middleware
    } catch (error) {
      console.error('Not authorized, token failed');
      res.status(401).json({ error: 'Not authorized' });
    }
  }

  if (!token) {
    res.status(401).json({ error: 'Not authorized, no token' });
  }
};

module.exports =  authMiddleware 
