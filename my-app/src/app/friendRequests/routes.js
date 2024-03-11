// /my-app/src/app/friendRequests/routes.js

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { MongoClient } = require('mongodb');

const mongoUri = "mongodb+srv://yang2166:Creepa1688@mydb.9xtm0sn.mongodb.net/?retryWrites=true&w=majority&appName=mydb";

router.post('/send-friend-request', async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    // Assume you have a "friendRequests" collection in your database
    const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const db = client.db('your_database_name'); // Replace 'your_database_name' with your actual MongoDB database name
    const friendRequestsCollection = db.collection('friendRequests'); // Replace 'friendRequests' with your actual collection name

    // Check if the friend request already exists
    const existingRequest = await friendRequestsCollection.findOne({ senderId, receiverId });

    if (existingRequest) {
      return res.status(400).json({ error: 'Friend request already sent' });
    }

    // Insert the new friend request into the database
    await friendRequestsCollection.insertOne({ senderId, receiverId, status: 'pending' });

    // Send email notification
    const receiverEmail = 'receiver@example.com'; // Replace with the receiver's email
    sendFriendRequestEmail(receiverEmail);

    client.close();

    res.status(200).json({ message: 'Friend request sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/friend-requests/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Assume you have a "friendRequests" collection in your database
    const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const db = client.db('your_database_name'); // Replace 'your_database_name' with your actual MongoDB database name
    const friendRequestsCollection = db.collection('friendRequests'); // Replace 'friendRequests' with your actual collection name

    // Retrieve friend requests for the specified user
    const incomingRequests = await friendRequestsCollection.find({ receiverId: userId, status: 'pending' }).toArray();
    
    client.close();

    res.status(200).json({ incomingRequests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/respond-to-friend-request', async (req, res) => {
  try {
    const { requestId, response } = req.body;

    // Assume you have a "friendRequests" collection in your database
    const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const db = client.db('your_database_name'); // Replace 'your_database_name' with your actual MongoDB database name
    const friendRequestsCollection = db.collection('friendRequests'); // Replace 'friendRequests' with your actual collection name

    // Update the status of the friend request in the database
    await friendRequestsCollection.updateOne({ _id: requestId }, { $set: { status: response } });

    client.close();

    res.status(200).json({ message: 'Friend request responded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Helper function to send email notification
function sendFriendRequestEmail(receiverEmail) {
  // Add your email sending logic here using nodemailer
  // Remember to replace <YOUR_EMAIL_API_KEY> and other placeholders with actual values
}

module.exports = router;
