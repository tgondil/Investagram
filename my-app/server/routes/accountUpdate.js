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

router.post('/update-username', async (req, res) => {
  const { userId, newUsername } = req.body;

  try {
    if (await User.findOne({ username: newUsername })) {
      return res.status(409).json({ error: 'Username is already taken' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.username = newUsername;
    await user.save();
    res.json({ message: 'Username updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update username' });
  }
});

router.post('/update-email', async (req, res) => {
  const { userId, verificationToken } = req.body;

  try {
    const user = await User.findOne({ _id: userId, verificationToken: verificationToken });

    if (!user) {
      return res.status(404).json({ error: 'Invalid or expired verification token' });
    }

    // Ensure there's an email to change to
    if (!user.emailToChange) {
      return res.status(400).json({ error: 'No email change requested' });
    }

    // Update the user's email
    user.email = user.emailToChange;
    user.emailToChange = undefined;
    user.verificationToken = undefined;

    await user.save();
    res.json({ message: 'Email updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to verify new email' });
  }
});

router.post('/update-password', async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Here you should compare the currentPassword with the stored hash, 
    // not just assign the new password. Use bcrypt to hash and compare passwords.
    if (!bcrypt.compareSync(currentPassword, user.password)) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    // Hash the new password before saving it
    const hashedPassword = bcrypt.hashSync(newPassword, 12);
    user.password = hashedPassword;
    await user.save();
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update password' });
  }
});

module.exports = router;
