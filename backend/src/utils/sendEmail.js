const smtp = require('../config/smtp');

const sendEmail = async ({ to, subject, text, html }) => {
  if (!smtp.transporter) {
    const error = new Error('Email service is not configured. OTP cannot be sent.');
    error.statusCode = 503;
    throw error;
  }

  try {
    await smtp.transporter.sendMail({
      from: smtp.smtpFrom,
      to,
      subject,
      text,
      html,
    });
  } catch (err) {
    console.error('Failed to send email:', err.message || err);
    const error = new Error('Failed to send email. Please try again later.');
    error.statusCode = 502;
    throw error;
  }
};

module.exports = sendEmail;
