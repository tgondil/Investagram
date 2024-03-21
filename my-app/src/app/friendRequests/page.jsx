"use client";
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar';
import Link from 'next/link';

const FriendRequests = () => {
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const [newFriendName, setNewFriendName] = useState('');

  useEffect(() => {
    // Fetch incoming friend requests
    fetch('/app/friendRequests/incoming', { method: 'GET' })
      .then(response => response.json())
      .then(data => setIncomingRequests(data.incomingRequests))
      .catch(error => console.error('Error fetching incoming friend requests:', error));
    
    // Fetch user's friends list
    fetch('/app/friendRequests/friends', { method: 'GET' })
      .then(response => response.json())
      .then(data => setFriendsList(data.friends))
      .catch(error => console.error('Error fetching friends list:', error));
  }, []);

  const sendFriendRequest = () => {
    // Send friend request to the typed friend name
    fetch('/app/friendRequests/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        friendName: newFriendName,
      }),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error sending friend request:', error));
  };

  const respondToFriendRequest = (requestId, response) => {
    // Respond to an incoming friend request
    fetch('/app/friendRequests/respond', {
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
    <main className="flex min-h-screen bg-shark-950 text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center justify-start p-8">
        <div className="flex items-center justify-between w-full mb-8">
          <h1 className="text-4xl font-bold animate-rainbow">Friends</h1>
          <div className="animate-rainbow">Investagram</div>
        </div>

        <div className="flex flex-col md:flex-row w-full md:space-x-4">
          <section className="md:w-1/3">
            <h2 className="text-2xl font-semibold mb-4 animate-rainbow">Incoming Friend Requests</h2>
            <ul className="w-full">
              {incomingRequests.map(request => (
                <li key={request._id} className="bg-gray-800 p-4 rounded mb-2">
                  <div>{request.senderName} has sent you a friend request.</div>
                  <div className="space-x-4">
                    <button
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:bg-green-600"
                      onClick={() => respondToFriendRequest(request._id, 'accepted')}
                    >
                      Accept
                    </button>
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
                      onClick={() => respondToFriendRequest(request._id, 'rejected')}
                    >
                      Reject
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="md:w-1/3">
            <h2 className="text-2xl font-semibold mb-4 animate-rainbow">Send Friend Request</h2>
            <div className="flex flex-col items-center justify-center">
              <input
                type="text"
                className="bg-gray-800 border border-gray-600 text-white px-4 py-2 rounded mb-4"
                placeholder="Enter friend's name"
                value={newFriendName}
                onChange={(e) => setNewFriendName(e.target.value)}
              />
              <button
                className="px-4 py-2 bg-tacao-300 text-white rounded hover:bg-tacao-400 focus:outline-none"
                onClick={sendFriendRequest}
              >
                Send Request
              </button>
            </div>
          </section>

          <section className="md:w-1/3">
            <h2 className="text-2xl font-semibold mb-4 animate-rainbow">Current Friends</h2>
            <ul className="w-full">
              {friendsList.map(friend => (
                <li key={friend._id} className="bg-gray-800 p-4 rounded mb-2">
                  <Link href={`/profile/${friend.id}`}>
                    <a className="text-blue-500 hover:underline">{friend.name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
};

export default FriendRequests;
