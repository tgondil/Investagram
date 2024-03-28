const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Route to handle account creation
router.post('/createAccount', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if username or email is already in use
    const existingUser = await User.findOne({ $or: [{ username: username }, { email: email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already in use' });
    }

    // Hash the new password before saving it
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user document using the User model
    const user = await User.create({
      username: username,
      email: email,
      password: hashedPassword
    });

    res.json({ message: 'The account has been created successfully!!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error!! Please try again. Either the user already exists or the information is in the wrong format.' });
  }
});

module.exports = router;
