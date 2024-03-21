const express = require('express');
const router = express.Router();
const User = require('../models/User');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Function to send verification email
async function sendVerificationEmail(email, verificationToken) {
  // Configure email service
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'gameacc859@gmail.com', // Your Gmail address
      pass: 'utto cpgc mzag jkby' // Your Gmail app password
    }
  });

  // Email content
  const mailOptions = {
    from: 'gameacc859@gmail.com',
    to: email,
    subject: 'Email Verification',
    text: `Your verification token is: ${verificationToken}`,
    html: `<p>Your verification token is: <strong>${verificationToken}</strong></p>`
  };

  // Send email
  await transporter.sendMail(mailOptions);
}

// Route to handle email verification
router.post('/verify', async (req, res) => {
  const { userId, verificationToken } = req.body;

  try {
    // Find the user by verification token
    const user = await User.findOne({ _id: userId, verificationToken: verificationToken });

    if (!user) {
      return res.status(404).json({ error: 'Invalid or expired verification token' });
    }

    // Update user's email verification status
    user.email = user.emailToChange;
    user.emailToChange = undefined; // Remove the temporary email
    user.verificationToken = undefined; // Remove the verification token

    // Save the updated user information to the database
    await user.save();

    // Send a JSON response indicating successful email change
    res.json({ message: 'Email has been successfully changed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to verify email' });
  }
});

// Route to handle updating user information
router.post('/update', async (req, res) => {
  const { userId, email, username, password } = req.body;

  try {
    // Retrieve the user from the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user information
    if (email) {
      // Generate verification token
      const verificationToken = crypto.randomBytes(5).toString('hex');
      
      // Send verification email
      await sendVerificationEmail(email, verificationToken);

      // Store the new email in a temporary field
      user.emailToChange = email;
      user.verificationToken = verificationToken;
    }
    if (username) {
      user.username = username;
    }
    if (password) {
      user.password = password; // Assign the plain text password directly
    }

    // Save the updated user information to the database
    await user.save();

    res.json({ message: 'User information updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update user information' });
  }
});

module.exports = router;
