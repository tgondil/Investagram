const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://<username>:<password>@mydb.9xtm0sn.mongodb.net/?retryWrites=true&w=majority&appName=mydb', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define message schema
const messageSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  content: String,
  timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

// Routes
app.post('/send-message', async (req, res) => {
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

app.get('/messages', async (req, res) => {
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
