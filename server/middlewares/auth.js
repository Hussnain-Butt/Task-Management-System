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
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password'); // Attach user object to request
      next();
    } catch (error) {
      console.error('Not authorized, token failed');
      res.status(401).json({ error: 'Not authorized' });
    }
  } else {
    res.status(401).json({ error: 'Not authorized, no token' });
  }
};
module.exports =  authMiddleware 
