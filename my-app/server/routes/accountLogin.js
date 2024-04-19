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
        let userProfile = {
          userID: existingUser._id,
          email: existingUser.email,
          profilePicture: existingUser.profilePicture.defaultUrl
        };

        // If profile picture is stored as binary data
        if (existingUser.profilePicture && existingUser.profilePicture.data) {
          userProfile.profilePicture = `data:${existingUser.profilePicture.contentType};base64,${existingUser.profilePicture.data.toString('base64')}`;
        }
        
        res.json({
          message: 'Logged in successfully',
          userProfile: userProfile
        });
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
