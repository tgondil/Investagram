const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
const Message = require('../../../../models/Message');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Adjust according to your frontend's origin for security
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Your existing routes
// ...

// Socket.IO for real-time communication
io.on('connection', (socket) => {
  console.log('A user connected', socket.id);

  // Handling message sending
  socket.on('sendMessage', async ({ sender, receiver, content }) => {
    const newMessage = new Message({ sender, receiver, content });
    await newMessage.save();
    io.emit('message', { sender, receiver, content }); // Emit the message to all clients
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
