const mongoose = require('mongoose');

const profilePictureSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  image: {
    data: Buffer,
    contentType: String
  }
});

const ProfilePicture = mongoose.model('ProfilePicture', profilePictureSchema);

module.exports = ProfilePicture;
