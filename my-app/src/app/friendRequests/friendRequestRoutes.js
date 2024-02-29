// friendRequestRoutes.js

const express = require('express');
const router = express.Router();
const friendRequestController = require('../controllers/friendRequestController');

// Endpoint to send a friend request
router.post('/send-request/:recipientId', friendRequestController.sendFriendRequest);

// Endpoint to accept a friend request
router.post('/accept-request/:requestId', friendRequestController.acceptFriendRequest);

// Endpoint to reject a friend request
router.post('/reject-request/:requestId', friendRequestController.rejectFriendRequest);

module.exports = router;
