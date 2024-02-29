const { MongoClient } = require('mongodb');

//Replace with appropriate connection string later
const uri = 'connection_string'; 

// Database and collection name
const dbName = 'userinfo';
const collectionName = 'users';

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to the MongoDB server
client.connect(async (err) => {
  if (err) {
    console.error('Failed to connect to the database');
    return;
  }

  console.log('Connected successfully to the database');

  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  // Insert a document
  const result = await collection.insertOne({
    username: 'john_doe',
    email: 'john.doe@example.com',
    password: 'hashed_password' //password will be hashed later
  });

  client.close();
});
