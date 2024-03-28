// /my-app/src/app/friendRequests/db.js

const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://yang2166:Creepa1688@mydb.9xtm0sn.mongodb.net/?retryWrites=true&w=majority&appName=mydb";
const client = new MongoClient(uri);

async function saveFriendRequest(senderId, receiverId) {
  try {
    await client.connect();
    const database = client.db("mydb");
    const collection = database.collection("friendRequests");
    await collection.insertOne({ senderId, receiverId, status: 'pending' }); // Add status field with default value
  } finally {
    await client.close();
  }
}

async function getIncomingRequests(userId) {
  try {
    await client.connect();
    const database = client.db("mydb");
    const collection = database.collection("friendRequests");
    return await collection.find({ receiverId: userId }).toArray();
  } finally {
    await client.close();
  }
}

async function respondToFriendRequest(requestId, response) {
  try {
    await client.connect();
    const database = client.db("mydb");
    const collection = database.collection("friendRequests");
    await collection.updateOne(
      { _id: requestId },
      { $set: { status: response } }
    );
  } finally {
    await client.close();
  }
}

module.exports = { saveFriendRequest, getIncomingRequests, respondToFriendRequest };
