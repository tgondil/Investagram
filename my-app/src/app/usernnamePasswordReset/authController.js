// authController.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { JWT_SECRET } = require('../utils/config');
const userService = require('../services/userService'); // Update the path
const emailService = require('./emailService'); // Update the path

const authController = {
  async resetPassword(req, res, next) {
    try {
      const { email, newPassword, token } = req.body;

      // Validate the email format
      if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }

      // Check if the email exists in the database
      const user = await userService.getUserByEmail(email);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Verify the reset token
      if (!verifyResetToken(token, user.id)) {
        return res.status(400).json({ error: 'Invalid or expired reset token' });
      }

      // Implement logic to update the user's password
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      await userService.updateUserPassword(user.id, hashedPassword);

      return res.json({ message: 'Password reset successful' });
    } catch (err) {
      return next(err);
    }
  },

  async recoverUsername(req, res, next) {
    try {
      const { email } = req.body;

      // Validate the email format
      if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }

      // Check if the email exists in the database
      const user = await userService.getUserByEmail(email);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Implement logic for sending an email with the username
      await emailService.sendEmail(email, 'Username Reminder', `Your username is: ${user.username}`);

      return res.json({ message: 'Username recovery email sent successfully' });
    } catch (err) {
      return next(err);
    }
  },
};

function isValidEmail(email) {
  // Implement your email validation logic here
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function verifyResetToken(token, userId) {
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    // Check if the token matches the user ID
    return decodedToken.userId === userId;
  } catch (error) {
    // Token verification failed
    return false;
  }
}

module.exports = authController;
