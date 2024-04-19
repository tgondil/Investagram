// This is for getting account information for a user
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /user/:id - Get a user's information by userID
router.get('/userID/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select('username email profilePicture');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // If you store the profile picture as a URL or path in the User model:
    const userProfile = {
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture.defaultUrl // This should be a URL or path to the image
    };

    // If you store the profile picture as binary data in the User model:
    // In a real-world app, you would likely store images in a static directory
    // or a service like AWS S3 and save the URL in the user document instead.
    if (user.profilePicture && user.profilePicture.data) {
      userProfile.profilePicture = `data:${user.profilePicture.contentType};base64,${user.profilePicture.data.toString('base64')}`;
    }

    res.json(userProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/users', async (req, res) => {
  try {
    // Select only the 'username' and '_id' fields for each user
    const users = await User.find({}).select('username _id');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;