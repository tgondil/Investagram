const express = require('express');
const router = express.Router(); // Create an instance of Express Router
const Message = require('./models/Message');

// Define the POST route for sending a message
router.post('/send-message', async (req, res) => {
  try {
    const { sender, receiver, content } = req.body;
    const newMessage = new Message({ sender, receiver, content });
    await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Define the GET route for retrieving messages
router.get('/messages', async (req, res) => {
  try {
    const { sender, receiver } = req.query;
    let query = {};
    if (sender) {
      query.sender = sender;
    }
    if (receiver) {
      query.receiver = receiver;
    }
    const messages = await Message.find(query);
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
});

// Export the router containing messaging routes
module.exports = router;
