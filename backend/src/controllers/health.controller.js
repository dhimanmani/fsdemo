const mongoose = require('mongoose');
const smtp = require('../config/smtp');

const getHealth = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend is running',
    environment: process.env.NODE_ENV || 'development',
    emailService: smtp.isConfigured ? 'configured' : 'not_configured',
    data: {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    },
  });
};

module.exports = {
  getHealth,
};
