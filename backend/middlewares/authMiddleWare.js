const jwt = require('jsonwebtoken')
const config = require('../config/config');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    console.log('No token, authorization denied');
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    console.log('User authenticated:', req.user);
    next();
  } catch (error) {
    console.log('Token is not valid:', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};


module.exports = authMiddleware