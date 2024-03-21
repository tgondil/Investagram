const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  emailToChange: String, // New field to store the temporary email
  verificationToken: String // New field to store the verification token
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
