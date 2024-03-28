const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  conversationId: {
    type: String,
    required: true
  }
});

// Pre-save middleware to set the conversationId
messageSchema.pre('save', function(next) {
  // Ensure the sender and receiver IDs are in a consistent order
  const ids = [this.sender.toString(), this.receiver.toString()].sort();
  this.conversationId = ids.join('-');
  next();
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
