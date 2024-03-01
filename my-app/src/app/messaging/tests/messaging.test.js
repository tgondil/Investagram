// Make sure to be in the root directory to install the packages.
// npm install express mongoose body-parser crypto mongodb
// npm install --save-dev mocha chai
// Run in the tests directory: npx mocha profilePicture.test.js
// Control c to close server

const app = require('../app');
const request = require('supertest');
const mongoose = require('mongoose');
const assert = require('assert'); // Import Node.js's assert module

const Message = require('../models/Message');

describe('Messaging routes', () => {

  // After running all tests, disconnect from the MongoDB test database
  after(async () => {
    // Drop the Message collection
    await Message.deleteMany({});
    
    // Disconnect from the MongoDB test database
    await mongoose.disconnect();
  });

  // Test case for sending a message
  it('should send a message', async () => {
    const messageData = {
      sender: 'user1',
      receiver: 'user2',
      content: 'Test message',
    };

    try {
      // Send a POST request to the /send-message route with message data
      const response = await request(app)
        .post('/send-message')
        .send(messageData);

      // Assert that the response status is 201 (Created)
      assert.strictEqual(response.status, 201);
      // Assert that the response body contains the expected message
      assert.deepStrictEqual(response.body, { message: 'Message sent successfully' });

      // Check if the message was saved in the database
      const message = await Message.findOne(messageData);
      // Assert that the message exists in the database
      assert.ok(message);
      // Assert that the message content matches the sent message
      assert.strictEqual(message.content, messageData.content);
    } catch (error) {
      // If an error occurs, log it and fail the test
      console.error(error);
      throw error;
    }
  });

  // Test case for retrieving messages
  it('should retrieve messages', async () => {
    try {
      // Send a GET request to the /messages route
      const response = await request(app).get('/messages');

      // Assert that the response status is 200 (OK)
      assert.strictEqual(response.status, 200);
      // Assert that the response body is an array
      assert.ok(Array.isArray(response.body));
    } catch (error) {
      // If an error occurs, log it and fail the test
      console.error(error);
      throw error;
    }
  });
});
