// sendResetEmail.js

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { to, subject, text } = req.body;

  try {
    // Configure your email sending service (e.g., SMTP, Gmail, etc.)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'investagram76@gmail.com',
        pass: 'cs307project',
      },
    });

    // Send email
    await transporter.sendMail({
      from: 'Investagram <investagram76@gmail.com>',
      to: 'gondil.tanay@gmail.com',
      subject: 'Username or Password Reset',
      text: 'Dear Tanay, \nYou have requested to reset your password for your Investagram account.\nIf you did not make this request, please ignore this email.\nTo sign in or create a new account, click this link: http://localhost:3000/login\nThank you, Investagram Team',
    });

    console.log(`Email sent to ${to} with subject: ${subject}`);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Error sending email' });
  }
}
