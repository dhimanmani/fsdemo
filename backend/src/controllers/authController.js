const bcrypt = require('bcryptjs');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const generateOtp = require('../utils/generateOtp');
const generateToken = require('../utils/generateToken');
const sendEmail = require('../utils/sendEmail');

const OTP_EXPIRES_IN_MINUTES = Number(process.env.OTP_EXPIRES_IN_MINUTES) || 10;

const formatUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  isEmailVerified: user.isEmailVerified,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

const getOtpExpiryDate = () =>
  new Date(Date.now() + OTP_EXPIRES_IN_MINUTES * 60 * 1000);

const saveHashedOtp = async (user, plainOtp) => {
  const hashedOtp = await bcrypt.hash(plainOtp, 10);
  user.otp = hashedOtp;
  user.otpExpiresAt = getOtpExpiryDate();
  await user.save();
};

const sendOtpEmail = async (email, otp, purpose) => {
  const subject =
    purpose === 'register'
      ? 'Verify your email - Registration OTP'
      : 'Login verification OTP';

  const message = `Your OTP is ${otp}. It expires in ${OTP_EXPIRES_IN_MINUTES} minutes. Do not share this code with anyone.`;

  await sendEmail({
    to: email,
    subject,
    text: message,
    html: `<p>Your OTP is <strong>${otp}</strong>.</p><p>It expires in ${OTP_EXPIRES_IN_MINUTES} minutes.</p><p>Do not share this code with anyone.</p>`,
  });
};

const verifyOtpForUser = async (user, plainOtp) => {
  if (!user.otp || !user.otpExpiresAt) {
    const error = new Error('OTP not found. Please request a new one.');
    error.statusCode = 400;
    throw error;
  }

  if (user.otpExpiresAt < new Date()) {
    const error = new Error('OTP has expired. Please request a new one.');
    error.statusCode = 400;
    throw error;
  }

  const isOtpValid = await bcrypt.compare(plainOtp, user.otp);

  if (!isOtpValid) {
    const error = new Error('Invalid OTP');
    error.statusCode = 400;
    throw error;
  }

  user.otp = undefined;
  user.otpExpiresAt = undefined;
};

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    const error = new Error('Name, email, and password are required');
    error.statusCode = 400;
    throw error;
  }

  const existingUser = await User.findOne({ email: email.toLowerCase().trim() });

  if (existingUser) {
    const error = new Error('User already exists with this email');
    error.statusCode = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const plainOtp = generateOtp();

  const user = await User.create({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password: hashedPassword,
    isEmailVerified: false,
  });

  await saveHashedOtp(user, plainOtp);
  await sendOtpEmail(user.email, plainOtp, 'register');

  res.status(201).json({
    success: true,
    message: 'OTP sent to your email. Please verify to complete registration.',
    data: {
      email: user.email,
    },
  });
});

const verifyRegisterOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    const error = new Error('Email and OTP are required');
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() }).select(
    '+otp +otpExpiresAt +password'
  );

  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  if (user.isEmailVerified) {
    const error = new Error('Email is already verified. Please login.');
    error.statusCode = 400;
    throw error;
  }

  await verifyOtpForUser(user, otp);

  user.isEmailVerified = true;
  await user.save();

  const token = generateToken(user._id);

  res.status(200).json({
    success: true,
    message: 'Email verified successfully',
    data: {
      user: formatUser(user),
      token,
    },
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new Error('Email and password are required');
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() }).select(
    '+password'
  );

  if (!user) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  if (!user.isEmailVerified) {
    const error = new Error('Please verify your email before logging in');
    error.statusCode = 403;
    throw error;
  }

  const plainOtp = generateOtp();
  await saveHashedOtp(user, plainOtp);
  await sendOtpEmail(user.email, plainOtp, 'login');

  res.status(200).json({
    success: true,
    message: 'Login OTP sent to your email. Please verify to continue.',
    data: {
      email: user.email,
    },
  });
});

const verifyLoginOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    const error = new Error('Email and OTP are required');
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() }).select(
    '+otp +otpExpiresAt'
  );

  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  await verifyOtpForUser(user, otp);
  await user.save();

  const token = generateToken(user._id);

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      user: formatUser(user),
      token,
    },
  });
});

const getProfile = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Profile fetched successfully',
    data: {
      user: formatUser(req.user),
    },
  });
});

module.exports = {
  register,
  verifyRegisterOtp,
  login,
  verifyLoginOtp,
  getProfile,
};
