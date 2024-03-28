const express = require('express');
const router = express.Router();
const multer = require('multer');
const ProfilePicture = require('../models/ProfilePicture');

// Configure multer for image storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/update-profile-picture', upload.single('profilePicture'), async (req, res) => {
  const userId = req.body.userId;

  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    // Check if a profile picture already exists for the user and update it, or create a new one
    const existingProfilePic = await ProfilePicture.findOne({ userId: userId });
    if (existingProfilePic) {
      existingProfilePic.image.data = req.file.buffer;
      existingProfilePic.image.contentType = req.file.mimetype;
      await existingProfilePic.save();
    } else {
      const newProfilePic = new ProfilePicture({
        userId: userId,
        image: {
          data: req.file.buffer,
          contentType: req.file.mimetype
        }
      });
      await newProfilePic.save();
    }

    res.json({ message: 'Profile picture updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update profile picture' });
  }
});

module.exports = router;
