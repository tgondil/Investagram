const mongoose = require('mongoose');

// Define the user profile
const userProfileSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  numberOfFriends: {
    type: Number,
    default: 0
  },
  numberOfPosts: {
    type: Number,
    default: 0
  },
  name: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    default: ''
  }
});

// Create the UserProfile model
const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;
