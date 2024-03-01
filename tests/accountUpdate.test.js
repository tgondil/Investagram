// Make sure to be in the root directory to install the packages.
// npm install express mongoose body-parser crypto mongodb nodemailer
// npm install --save-dev mocha chai
// Run in the tests directory: npx mocha profilePicture.test.js
// Control c to close server

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

  it('should send email verification and update email after verification', async () => {
    // Call the /update endpoint to change the email
    const changeEmailRes = await request(app)
      .post('/update')
      .send({
        userId: testUserId,
        email: 'gameacc859@gmail.com'
      });

    // Check if the response status is 200
    if (changeEmailRes.status !== 200) {
      throw new Error('Expected response status code to be 200, First!');
    }

    // Check if the response body contains the expected message
    if (!changeEmailRes.body || changeEmailRes.body.message !== 'User information updated successfully') {
      throw new Error('Expected response body to contain message: "User information updated successfully"');
    }

    // Check if the email has been updated in the database with verification token
    const updatedUser = await User.findById(testUserId);
    if (!updatedUser || updatedUser.emailToChange !== 'gameacc859@gmail.com' || !updatedUser.verificationToken) {
      throw new Error('Expected user email to be updated with verification token');
    }

    // Verify the updated email
    const verifyEmailRes = await request(app)
      .post('/verify')
      .send({
        userId: testUserId,
        verificationToken: updatedUser.verificationToken
      });

    // Check if the response status is 200
    if (verifyEmailRes.status !== 200) {
      throw new Error('Expected response status code to be 200, Second!');
    }

    // Check if the response body contains the expected message
    if (!verifyEmailRes.body || verifyEmailRes.body.message !== 'Email has been successfully changed') {
      throw new Error('Expected response body to contain message: "Email has been successfully changed"');
    }

    // Verify that the email has been updated in the database after verification
    const finalUpdatedUser = await User.findById(testUserId);
    if (!finalUpdatedUser || finalUpdatedUser.email !== 'gameacc859@gmail.com' || finalUpdatedUser.verificationToken) {
      throw new Error('Expected user email to be updated after verification');
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
