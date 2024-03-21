// /my-app/src/app/friendRequests/friendAPI.js

const { Router } = require('express');
const router = Router();
const { MongoClient } = require('mongodb');

// MongoDB connection URI
const uri = "mongodb+srv://yang2166:Creepa1688@mydb.9xtm0sn.mongodb.net/?retryWrites=true&w=majority&appName=mydb";
const client = new MongoClient(uri);

// Connect to MongoDB
async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToDatabase();

// POST endpoint to send a friend request
router.post('/send-request', async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    const database = client.db("mydb"); // Replace "mydb" with your database name
    const collection = database.collection("friendRequests");

    // Insert the friend request into the collection
    await collection.insertOne({ senderId, receiverId });

    res.json({ message: 'Friend request sent successfully' });
  } catch (error) {
    console.error('Error sending friend request:', error);
    res.status(500).json({ error: 'An error occurred while sending the friend request' });
  }
});

// GET endpoint to retrieve incoming friend requests
router.get('/incoming-requests', async (req, res) => {
  const { userId } = req.query;

  try {
    const database = client.db("mydb");
    const collection = database.collection("friendRequests");

    // Find incoming friend requests for the specified user ID
    const incomingRequests = await collection.find({ receiverId: userId }).toArray();

    res.json({ incomingRequests });
  } catch (error) {
    console.error('Error retrieving incoming friend requests:', error);
    res.status(500).json({ error: 'An error occurred while retrieving incoming friend requests' });
  }
});

// POST endpoint to accept or reject a friend request
router.post('/respond-request', async (req, res) => {
  const { requestId, response } = req.body;

  try {
    const database = client.db("mydb");
    const collection = database.collection("friendRequests");

    // Update the status of the friend request
    await collection.updateOne(
      { _id: requestId },
      { $set: { status: response } }
    );

    res.json({ message: 'Friend request responded successfully' });
  } catch (error) {
    console.error('Error responding to friend request:', error);
    res.status(500).json({ error: 'An error occurred while responding to the friend request' });
  }
});

module.exports = router;
