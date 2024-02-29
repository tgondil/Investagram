//Import modules and establish required connections
const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const uri = 'mongodb://localhost:27017';
const dbName = 'userinfo';
const collectionName = 'users';

// Create a new MongoClient and connect to server
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect();

// Middleware
app.use(bodyParser.json());

// Endpoint to handle login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Check if username and password match
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  const user = await collection.findOne({ username, password });

  if (user) {
    res.send('Login successful');
  } else {
    res.status(401).send('Login failed');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
