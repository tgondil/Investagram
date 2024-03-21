// /my-app/src/app/friendRequests/friendAPI.js

const http = require('http');
const { saveFriendRequest, getIncomingRequests, respondToFriendRequest } = require('./db');

const server = http.createServer((req, res) => {
  if (req.url === '/app/friendRequests/send' && req.method === 'POST') { // Updated endpoint
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      const { senderId, receiverId } = JSON.parse(body);
      try {
        await saveFriendRequest(senderId, receiverId);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Friend request sent successfully' }));
      } catch (error) {
        console.error('Error sending friend request:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'An error occurred while sending the friend request' }));
      }
    });
  } else if (req.url === '/app/friendRequests/incoming' && req.method === 'GET') { // Updated endpoint
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      const { userId } = JSON.parse(body); // Assuming userId is sent in the request body
      try {
        const incomingRequests = await getIncomingRequests(userId);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ incomingRequests }));
      } catch (error) {
        console.error('Error retrieving incoming friend requests:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'An error occurred while retrieving incoming friend requests' }));
      }
    });
  } else if (req.url === '/app/friendRequests/respond' && req.method === 'POST') { // Updated endpoint
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      const { requestId, response } = JSON.parse(body);
      try {
        await respondToFriendRequest(requestId, response);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Friend request responded successfully' }));
      } catch (error) {
        console.error('Error responding to friend request:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'An error occurred while responding to the friend request' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
