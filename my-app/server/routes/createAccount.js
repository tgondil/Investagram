const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route to handle account creation
router.post('/createAccount', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Create a new user document using the User model
    await User.create({ username, email, password });

    res.json({ message: 'The account has been created successfully!!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error!! Please try again. Either the user already exists or the information is in the wrong format.' });
  }
});

module.exports = router;
