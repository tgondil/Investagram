// /my-app/src/components/page.jsx

import { useState, useEffect } from 'react';

const { Router } = require('express');
const router = Router();
const { saveFriendRequest, getIncomingRequests, respondToFriendRequest } = require('./db');

const FriendRequests = () => {
  // Example state for managing friend requests
  const [incomingRequests, setIncomingRequests] = useState([]);

  useEffect(() => {
    // Fetch incoming friend requests from the backend
    fetch('/app/friendRequests/friendAPI') // Update the API path
      .then(response => response.json())
      .then(data => setIncomingRequests(data.incomingRequests))
      .catch(error => console.error('Error fetching friend requests:', error));
  }, []); // Empty dependency array to fetch data once when the component mounts

  // Example function to send a friend request
  const sendFriendRequest = () => {
    // You need to replace the URL with your actual backend API route
    fetch('/app/friendRequests/friendAPI', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        senderId: '123', // Replace '123' with the actual user ID
        receiverId: '456', // Replace '456' with the recipient's user ID
      }),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error sending friend request:', error));
  };

  // Function to respond to a friend request
  const respondToFriendRequest = (requestId, response) => {
    // You need to replace the URL with your actual backend API route
    fetch('/app/friendRequests/friendAPI', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requestId,
        response,
      }),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error responding to friend request:', error));
  };

  return (
    <main className="flex min-h-screen flex-col bg-shark-950 items-center justify-center">
      <div className="flex flex-col text-tacao-300 items-center justify-center gap-12">
        {/* Existing header */}
        <div className="text-8xl font-poppins font-semibold animate-intro-slide flex flex-col items-center justify-center">
          <h1 className="h-[7rem] sm:h-[7rem] text-8xl font-poppins font-semibold animate-intro-slide animate-text bg-gradient-to-r from-teal-500 via-tacao-300 to-teal-500 bg-clip-text text-transparent">
            Investagram
          </h1>
          <h1 className="animate-intro-unhide text-xl animate-text bg-gradient-to-r from-teal-500 via-tacao-300 to-teal-500 bg-clip-text text-transparent">
            Investing just got smarter.
          </h1>
        </div>

        {/* Friend Requests Section */}
        <div className="w-10/12 delay-5000 animate-intro-unhide">
          {/* Existing components */}
          <div className="flex items-center justify-center">
            <h1 className="text-3xl font-poppins font-light">
              Welcome back!
            </h1>
          </div>

          {/* Send Friend Request */}
          <button
            className="mt-3 text-lg mt-8 font-semibold bg-tacao-300 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:animate-text hover:font-bold hover:bg-gradient-to-r hover:from-teal-500 hover:via-tacao-300 hover:to-teal-500 hover:bg-clip-text hover:text-transparent"
            onClick={sendFriendRequest}
          >
            Send Friend Request
          </button>

          {/* Display Incoming Friend Requests */}
          <div className="mt-6">
            <h2 className="text-xl font-poppins font-light mb-2">Incoming Requests</h2>
            <ul>
              {incomingRequests.map(request => (
                <li key={request._id}>
                  {/* Display sender's information or any relevant details */}
                  {request.senderName} has sent you a friend request.{' '}
                  <button
                    className="text-tacao-300 hover:text-white"
                    onClick={() => respondToFriendRequest(request._id, 'accepted')}
                  >
                    Accept
                  </button>{' '}
                  /{' '}
                  <button
                    className="text-tacao-300 hover:text-white"
                    onClick={() => respondToFriendRequest(request._id, 'rejected')}
                  >
                    Reject
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FriendRequests;
