const mongoose = require('mongoose');
const cloudinary = require('../config/cloudinary');
const Demo = require('../models/Demo');
const asyncHandler = require('../utils/asyncHandler');

const testConnection = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Frontend and backend are connected successfully',
    data: {
      server: 'Express API',
      timestamp: new Date().toISOString(),
      clientIp: req.ip,
    },
  });
};

const testMongoDB = asyncHandler(async (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;

  if (!isConnected) {
    const error = new Error('MongoDB is not connected');
    error.statusCode = 503;
    throw error;
  }

  const demoEntry = await Demo.create({
    message: 'MongoDB connection test',
  });

  const totalDocuments = await Demo.countDocuments();

  res.status(200).json({
    success: true,
    message: 'MongoDB connection verified',
    data: {
      status: 'connected',
      host: mongoose.connection.host,
      database: mongoose.connection.name,
      demoDocumentId: demoEntry._id,
      totalDemoDocuments: totalDocuments,
    },
  });
});

const testCloudinary = asyncHandler(async (req, res) => {
  const result = await cloudinary.api.ping();

  res.status(200).json({
    success: true,
    message: 'Cloudinary connection verified',
    data: {
      status: result.status,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    },
  });
});

module.exports = {
  testConnection,
  testMongoDB,
  testCloudinary,
};
