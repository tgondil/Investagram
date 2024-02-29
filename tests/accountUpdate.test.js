const request = require('supertest');
const app = require('../app'); // Assuming your Express app is exported from app.js
const User = require('../models/User');

describe('Account Update', () => {
  let testUserId;

  before(async () => {
    // Set up test user in the database
    const testUser = await User.create({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });
    testUserId = testUser._id; // Save the ID of the created user for use in tests
  });

  after(async () => {
    // Clean up test data after tests
    await User.deleteMany({});
  });

  it('should update user email', async () => {
    const res = await request(app)
      .post('/update')
      .send({
        userId: testUserId, // Use the ID of the test user
        email: 'newemail@example.com'
      });

    // Check if the response status is 200
    if (res.status !== 200) {
      throw new Error('Expected response status code to be 200');
    }

    // Check if the response body contains the expected message
    if (!res.body || res.body.message !== 'User information updated successfully') {
      throw new Error('Expected response body to contain message: "User information updated successfully"');
    }

    // Verify that the email has been updated in the database
    const updatedUser = await User.findById(testUserId);
    if (!updatedUser || updatedUser.email !== 'newemail@example.com') {
      throw new Error('Expected user email to be updated to "newemail@example.com"');
    }
  });

  it('should update username', async () => {
    const res = await request(app)
      .post('/update')
      .send({
        userId: testUserId, // Use the ID of the test user
        username: 'newusername'
      });

    // Check if the response status is 200
    if (res.status !== 200) {
      throw new Error('Expected response status code to be 200');
    }

    // Check if the response body contains the expected message
    if (!res.body || res.body.message !== 'User information updated successfully') {
      throw new Error('Expected response body to contain message: "User information updated successfully"');
    }

    // Verify that the username has been updated in the database
    const updatedUser = await User.findById(testUserId);
    if (!updatedUser || updatedUser.username !== 'newusername') {
      throw new Error('Expected username to be updated to "newusername"');
    }
  });

  it('should update password', async () => {
    const res = await request(app)
      .post('/update')
      .send({
        userId: testUserId, // Use the ID of the test user
        password: 'newpassword123'
      });

    // Check if the response status is 200
    if (res.status !== 200) {
      throw new Error('Expected response status code to be 200');
    }

    // Check if the response body contains the expected message
    if (!res.body || res.body.message !== 'User information updated successfully') {
      throw new Error('Expected response body to contain message: "User information updated successfully"');
    }

    // Verify that the password has been updated in the database
    const updatedUser = await User.findById(testUserId);
    if (!updatedUser || updatedUser.password !== 'newpassword123') {
      throw new Error('Expected password to be updated');
    }
  });

  // Add more test cases for handling error scenarios
});
