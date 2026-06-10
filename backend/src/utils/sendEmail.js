const createTransporter = require('../config/smtp');

const sendEmail = async ({ to, subject, text, html }) => {
  const transporter = createTransporter();

  const from =
    process.env.SMTP_FROM?.trim() ||
    process.env.SMTP_USER?.trim() ||
    'Auth Demo <no-reply@example.com>';

  await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });
};

module.exports = sendEmail;
