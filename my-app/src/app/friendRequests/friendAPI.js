// /my-app/src/app/friendRequests/friendAPI.js

const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

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
  senderEmail: String,
});

const FriendRequest = mongoose.model('FriendRequest', friendRequestSchema);

// Function to send email notification for friend request
async function sendFriendRequestEmail(receiverEmail, senderName) {
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ellsmith1309@gmail.com', // Your Gmail email address
      pass: '2100Smith', // Your Gmail password or App Password
    },
  });

  // Define email options
  const mailOptions = {
    from: 'Investagram <ellsmith1309@gmail.com>',
    to: receiverEmail,
    subject: 'You have received a friend request',
    html: `<p>Tanay has sent you a friend request.</p>`,
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    console.log("Friend request notification sent successfully");
  } catch (error) {
    console.error("Error sending friend request notification:", error);
    throw new Error("Failed to send friend request notification");
  }
}

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
    const { friendName, friendEmail } = req.body;
    const newRequest = new FriendRequest({ senderName: friendName, senderEmail: friendEmail });
    await newRequest.save();
    
    // Send friend request email notification
    await sendFriendRequestEmail(friendEmail, friendName);
    
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
