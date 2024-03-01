const express = require('express');
const router = express.Router();
const { MongoClient, GridFSBucket, ObjectId } = require('mongodb');

// MongoDB connection URI
const mongoURI = 'mongodb+srv://yang2166:Creepa1688@mydb.9xtm0sn.mongodb.net/?retryWrites=true&w=majority&appName=mydb';

// Create a new MongoClient
const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB
client.connect(async (err) => {
  if (err) {
    console.error('Failed to connect to MongoDB:', err);
    return;
  }

  console.log('Connected to MongoDB');

  // Access the database and GridFS bucket
  const db = client.db();
  const bucket = new GridFSBucket(db);

  // Handle file upload
  router.post('/upload', async (req, res) => {
    try {
      // Access the uploaded file from the request body
      const file = req.file;

      // Create a readable stream from the file buffer
      const readableStream = file.createReadStream();

      // Upload the file to GridFS
      const uploadStream = bucket.openUploadStream(file.originalname);
      readableStream.pipe(uploadStream);

      // Respond with success message
      res.json({ message: 'File uploaded successfully' });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ error: 'Failed to upload file' });
    }
  });

  // Handle file retrieval
  router.get('/download/:fileId', (req, res) => {
    try {
      // Retrieve file ID from request params
      const fileId = req.params.fileId;

      // Open a readable stream to download the file
      const downloadStream = bucket.openDownloadStream(ObjectId(fileId));

      // Pipe the file data to the response
      downloadStream.pipe(res);
    } catch (error) {
      console.error('Error retrieving file:', error);
      res.status(404).json({ error: 'File not found' });
    }
  });
});

module.exports = router;
