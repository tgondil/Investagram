const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Assuming you have a User model

router.post('/addFriend', async (req, res) => {
  const { username, friend } = req.body;
  try {
    User.findOneAndUpdate(
      { username: username },
      { $push: { friends: friend } }, // Assuming 'friend' is the username you want to add to the 'friends' array
      { new: true }, // To return the updated document
    );
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
