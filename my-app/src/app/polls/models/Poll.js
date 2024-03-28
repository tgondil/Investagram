const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true
  }
});

module.exports = mongoose.model("Poll", pollSchema);
