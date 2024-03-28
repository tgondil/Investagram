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

module.exports = mongoose.model('ProfilePicture', profilePictureSchema);
