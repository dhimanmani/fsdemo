const cloudinary = require('cloudinary').v2;

const configureCloudinary = () => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret =
    process.env.CLOUDINARY_API_SECRET || process.env.CLOUDINARY_SECRET_KEY;

  if (!cloudName || !apiKey || !apiSecret) {
    console.warn(
      'Cloudinary is not configured. Image upload features will be disabled.'
    );
    return null;
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });

  return cloudinary;
};

module.exports = configureCloudinary();
