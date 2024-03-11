// /my-app/src/app/friendRequests/routes.js

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { MongoClient } = require('mongodb');
const crypto = require('crypto');

const mongoUri = "mongodb+srv://yang2166:Creepa1688@mydb.9xtm0sn.mongodb.net/?retryWrites=true&w=majority&appName=mydb";

router.post('/initiate-password-reset', async (req, res) => {
  try {
    const { email } = req.body;

    const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const db = client.db('your_database_name'); // Replace 'your_database_name' with your actual MongoDB database name
    const usersCollection = db.collection('users'); // Replace 'users' with your actual users collection name

    const user = await usersCollection.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate a temporary password
    const temporaryPassword = crypto.randomBytes(8).toString('hex');

    // Save the temporary password to the user in the database
    await usersCollection.updateOne({ email }, { $set: { temporaryPassword } });

    // Send password reset email
    const transporter = nodemailer.createTransport({
      service: 'your_email_service_provider', // Replace with your actual email service provider (e.g., 'gmail')
      auth: {
        user: 'your_email@example.com', // Replace with your actual email address
        pass: 'your_email_password', // Replace with your actual email password
      },
    });

    const mailOptions = {
      from: 'your_email@example.com', // Replace with your actual email address
      to: email,
      subject: 'Password Reset',
      text: `Your temporary password is: ${temporaryPassword}`,
    };

    await transporter.sendMail(mailOptions);

    client.close();

    res.status(200).json({ message: 'Password reset email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/recover-username', async (req, res) => {
  try {
    const { email } = req.body;

    const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const db = client.db('your_database_name'); // Replace 'your_database_name' with your actual MongoDB database name
    const usersCollection = db.collection('users'); // Replace 'users' with your actual users collection name

    const user = await usersCollection.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Send username recovery email
    const transporter = nodemailer.createTransport({
      service: 'your_email_service_provider', // Replace with your actual email service provider (e.g., 'gmail')
      auth: {
        user: 'your_email@example.com', // Replace with your actual email address
        pass: 'your_email_password', // Replace with your actual email password
      },
    });

    const mailOptions = {
      from: 'your_email@example.com', // Replace with your actual email address
      to: email,
      subject: 'Username Recovery',
      text: `Your username is: ${user.username}`, // Replace 'username' with the actual field name in your user collection
    };

    await transporter.sendMail(mailOptions);

    client.close();

    res.status(200).json({ message: 'Username recovery email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
