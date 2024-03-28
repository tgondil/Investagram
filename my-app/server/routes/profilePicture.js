const express = require('express');
const router = express.Router();
const multer = require('multer');
const User = require('../models/User'); // Import the User model

// Configure multer for image storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/update-profile-picture', upload.single('profilePicture'), async (req, res) => {
  const userId = req.body.userId;

  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    // Find the user by ID and update the profile picture
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the user's profile picture data
    user.profilePicture.data = req.file.buffer;
    user.profilePicture.contentType = req.file.mimetype;

    await user.save();

    res.json({ message: 'Profile picture updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update profile picture' });
  }
});

module.exports = router;
