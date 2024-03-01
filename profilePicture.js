const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
const ProfilePicture = require('../models/ProfilePicture');

// MongoDB connection URI
const mongoURI = 'mongodb+srv://yang2166:Creepa1688@mydb.9xtm0sn.mongodb.net/?retryWrites=true&w=majority&appName=mydb';

// Create a Mongoose connection
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const conn = mongoose.connection;

// Configure Multer storage engine for memory storage
const storage = multer.memoryStorage();

// Initialize Multer with storage engine
const upload = multer({ storage });

// Handle file upload
router.post('/upload/:userId', upload.single('file'), async (req, res) => {
  try {
    // Access the uploaded file from the request
    const file = req.file;
    const userId = req.params.userId;

    // Create a new profile picture document
    const newProfilePicture = new ProfilePicture({
      userId: userId,
      image: {
        data: file.buffer,
        contentType: file.mimetype
      }
    });

    // Save the profile picture document to the database
    await newProfilePicture.save();

    // Respond with success message
    res.json({ message: 'Profile picture uploaded successfully' });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload profile picture' });
  }
});

// Handle file retrieval
router.get('/download/:userId', async (req, res) => {
  try {
    // Retrieve userId from request params
    const userId = req.params.userId;

    // Find the profile picture document by userId
    const profilePicture = await ProfilePicture.findOne({ userId });

    if (!profilePicture) {
      return res.status(404).json({ error: 'Profile picture not found' });
    }

    // Set the appropriate content type
    res.set('Content-Type', profilePicture.image.contentType);

    // Send the image data as response
    res.send(profilePicture.image.data);
  } catch (error) {
    console.error('Error retrieving profile picture:', error);
    res.status(500).json({ error: 'Failed to retrieve profile picture' });
  }
});

module.exports = router;
