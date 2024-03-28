const mongoose = require('mongoose');

const groupChatMessageSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const GroupChatMessage = mongoose.model('GroupChatMessage', groupChatMessageSchema);

module.exports = GroupChatMessage;
