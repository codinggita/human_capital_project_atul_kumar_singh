const User = require('../models/User');
const jwt = require('jsonwebtoken');

const authService = {
  register: async (userData) => {
    return await User.create(userData);
  },

  login: async (email, password) => {
    const user = await User.findOne({ email }).select('+password');
    if (!user) return null;

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return null;

    return user;
  },

  getUserById: async (id) => {
    return await User.findById(id);
  },

  generateToken: (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
      expiresIn: process.env.JWT_EXPIRE || '30d'
    });
  }
};

module.exports = authService;
