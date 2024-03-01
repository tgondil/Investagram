const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true
  },
  optionsVotes: {
    type: [Number],
    default: function () {
      return new Array(this.options.length).fill(0);
    }
  }
});

module.exports = mongoose.model('Poll', pollSchema);
