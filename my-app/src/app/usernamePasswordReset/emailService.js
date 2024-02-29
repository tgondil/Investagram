// emailService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  // Configure your email sending service (e.g., SMTP, Gmail, etc.)
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

async function sendEmail(to, subject, text) {
  try {
    await transporter.sendMail({
      from: 'your-email@gmail.com',
      to,
      subject,
      text,
    });
    console.log(`Email sent to ${to} with subject: ${subject}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = { sendEmail };
