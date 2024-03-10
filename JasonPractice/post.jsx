import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io("http://localhost:3000"); // Adjust the URL to match your server

function Page() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('message', message => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = (sender, receiver, content) => {
    socket.emit('sendMessage', { sender, receiver, content });
  };

  return (
    <div>
      <h2>Messages</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg.sender}: {msg.content}</li>
        ))}
      </ul>
      {/* Implement UI for sending messages */}
    </div>
  );
}

export default Page;
