const express = require('express');
const router = express.Router();
const User = require('./models/User');

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
      user.email = email;
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
