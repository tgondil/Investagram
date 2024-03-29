const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Assuming you have a User model

router.post('/accountLogin', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if username exists
    const existingUser = await User.findOne({ username: username });

    if (existingUser) {
      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, existingUser.password);

      if (passwordMatch) {
        // Passwords match, user authentication successful
        res.json({ message: 'Logged in successfully' });
      } else {
        // Passwords don't match, authentication failed
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } else {
      // No user with this username exists
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
