const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const fs = require('fs');

describe('Profile Picture', () => {
  let testUser;

  beforeAll(async () => {
    // Create a dummy user for testing
    testUser = await User.create({
      username: 'testuser1',
      email: 'testing@example.com',
      password: 'password123'
    });
  });

  afterAll(async () => {
    // Clean up test data after tests
    await User.deleteMany({});
    // Remove test image if uploaded
    if (fs.existsSync('./uploads/profiles/testuser.png')) {
      fs.unlinkSync('./uploads/profiles/testuser.png');
    }
  });

  it('should upload and retrieve profile picture', async () => {
    // Upload profile picture
    const uploadRes = await request(app)
      .post('/profile-picture')
      .attach('file', './tests/picture.png'); // Adjust the path to your test image

    expect(uploadRes.status).toBe(200);

    // Retrieve profile picture
    const retrieveRes = await request(app).get(`/profile-picture/${testUser._id}`);

    expect(retrieveRes.status).toBe(200);
    expect(retrieveRes.headers['content-type']).toMatch(/image/); // Check if response is an image

    // Additional assertions can be added if needed
  });
});
