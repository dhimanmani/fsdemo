const nodemailer = require('nodemailer');

const smtpHost = process.env.SMTP_HOST?.trim();
const smtpPort = Number(process.env.SMTP_PORT) || 587;
const smtpUser = process.env.SMTP_USER?.trim();
const smtpPass = process.env.SMTP_PASS?.trim();
const smtpFrom = process.env.SMTP_FROM?.trim() || smtpUser || 'Auth Demo <no-reply@example.com>';

const isConfigured = Boolean(smtpHost && smtpPort && smtpUser && smtpPass);

if (!isConfigured) {
  console.warn(
    'SMTP is not configured. Missing one or more of SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS. OTP email will not be sent.'
  );
}

const transporter = isConfigured
  ? nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })
  : null;

module.exports = {
  transporter,
  isConfigured,
  smtpFrom,
};
