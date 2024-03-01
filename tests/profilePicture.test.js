const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const fs = require('fs');
const assert = require('assert');

describe('Profile Picture', () => {
  let testUserId;

  before(async () => {
    // Create a dummy user for testing
    const newUser = new User({
      username: 'testuser1',
      email: 'testuser1@example.com',
      password: 'password123'
    });
    const savedUser = await newUser.save();
    testUserId = savedUser._id;
  });

  after(async () => {
    // Clean up test data after tests
    await User.deleteMany({});
  });

  it('should upload and retrieve profile picture', async () => {
    // Upload profile picture
    const uploadRes = await request(app)
      .post(`/profile-picture/upload/${testUserId}`)
      .attach('file', './tests/picture.png'); // Attach test image file

    assert.strictEqual(uploadRes.status, 200);

    // Retrieve profile picture
    const retrieveRes = await request(app).get(`/profile-picture/download/${testUserId}`);

    assert.strictEqual(retrieveRes.status, 200);
    assert.ok(retrieveRes.headers['content-type'].includes('image')); // Check if response is an image

    // Additional assertions can be added if needed
  });
});
