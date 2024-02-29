const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


const uri = 'mongodb://localhost:27017';
const dbName = 'userinfo';
const collectionName = 'users';

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to the MongoDB server
client.connect();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to handle account creation
app.post('/createAccount', async (req, res) => {
  const { username, email, password } = req.body;

  // Check if password already exists
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  const existingUser = await collection.findOne({ password });

  if (existingUser) {
    return res.status(400).send('Password already exists');
  }

  // Insert new user
  const result = await collection.insertOne({ username, email, password });

  res.send(`User successfully created with ID: ${result.insertedId}`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
