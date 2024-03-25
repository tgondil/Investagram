// /my-app/src/app/friendRequests/friendAPI.js

// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');

// Create an Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB setup
const uri = "mongodb+srv://yang2166:Creepa1688@mydb.9xtm0sn.mongodb.net/?retryWrites=true&w=majority&appName=mydb";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define MongoDB schema and model for FriendRequest
const friendRequestSchema = new mongoose.Schema({
  senderName: String,
});

const FriendRequest = mongoose.model('FriendRequest', friendRequestSchema);

// Route to accept a friend request
app.post('/api/friendRequests/accept', async (req, res) => {
  try {
    const { requestId } = req.body;
    await FriendRequest.findByIdAndDelete(requestId);
    res.json({ success: true });
  } catch (error) {
    console.error('Error accepting friend request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to reject a friend request
app.post('/api/friendRequests/reject', async (req, res) => {
  try {
    const { requestId } = req.body;
    await FriendRequest.findByIdAndDelete(requestId);
    res.json({ success: true });
  } catch (error) {
    console.error('Error rejecting friend request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to send a friend request
app.post('/api/friendRequests/send', async (req, res) => {
  try {
    const { friendName } = req.body;
    const newRequest = new FriendRequest({ senderName: friendName });
    await newRequest.save();
    res.json({ success: true, requestId: newRequest._id });
  } catch (error) {
    console.error('Error sending friend request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to fetch incoming friend requests
app.get('/api/friendRequests/incoming', async (req, res) => {
  try {
    const incomingRequests = await FriendRequest.find();
    res.json({ incomingRequests });
  } catch (error) {
    console.error('Error fetching incoming friend requests:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
