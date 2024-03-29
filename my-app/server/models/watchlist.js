const mongoose = require('mongoose');

// Define the stock schema
const stockSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  // marketPrice: Number,
  marketCap: Number,
  sector: String,
  industry: String
});

// Define the user profile schema
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
  name: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    default: ''
  },
  watchlist: [stockSchema] // Embedding stock schema in user profile
});

// Create the UserProfile model
const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;
