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
  profilePicture: {
    data: Buffer,
    contentType: String,
    defaultUrl: {
      type: String,
      default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' // Replace with actual URL to your default image
    }
  },
  emailToChange: String, // New field to store the temporary email
  verificationToken: String // New field to store the verification token
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
