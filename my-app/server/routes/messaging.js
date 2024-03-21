const express = require('express');
const router = express.Router(); // Create an instance of Express Router
const Message = require('../models/Message');

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

// GET route for retrieving a list of conversations for a user
router.get('/conversations/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: userId }, { receiver: userId }]
        }
      },
      {
        $group: {
          _id: {
            $cond: [{ $eq: ["$sender", userId] }, "$receiver", "$sender"]
          },
          lastMessage: { $last: "$$ROOT" }
        }
      },
      { $sort: { "lastMessage.timestamp": -1 } }
    ]);

    res.json(conversations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve conversations' });
  }
});

// GET route for retrieving the chat history between two users
router.get('/messages/:userId/:otherUserId', async (req, res) => {
  const { userId, otherUserId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: otherUserId },
        { sender: otherUserId, receiver: userId }
      ]
    }).sort({ timestamp: 1 }); // Sorting by timestamp to get the conversation in chronological order

    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
});

// Export the router containing messaging routes
module.exports = router;
