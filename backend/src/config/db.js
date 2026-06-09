const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri =
    process.env.MONGODB_URI || process.env.MONGODB_API_KEY;

  if (!mongoUri) {
    throw new Error(
      'MongoDB connection string is missing. Add MONGODB_URI to your .env file.'
    );
  }

  try {
    const connection = await mongoose.connect(mongoUri);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    throw error;
  }
};

module.exports = connectDB;
