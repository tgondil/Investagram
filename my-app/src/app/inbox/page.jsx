"use client";
import { useCallback } from 'react';
import Talk from 'talkjs';
import { Session, Chatbox } from '@talkjs/react';
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar'
import Chat from '../../components/chat'
import Cookies from 'js-cookie'

function page() {

  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const userId = Cookies.get('userID');

  useEffect(() => {
    fetch(`/userID/${userId}`)
      .then(response => response.json())
      .then(data => {
        setUsername(data.username);
        setProfilePicture(data.profilePicture);
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  const currentUser = {
    id: Cookies.get("userID"),
    username: Cookies.get("name"),
    photoUrl: Cookies.get("profilePicture"),
    welcomeMessage: 'Hi there, how can I help?',
    role: 'default'
  };

  const otherUser = {
    id: 'frank',
    username: 'Frank',
    photoUrl: 'https://talkjs.com/new-web/avatar-8.jpg',
    welcomeMessage: 'Hey! What can I do for you today?',
    role: 'default'
  };

  return (
    <main className="h-screen bg-shark-950 w-full overflow-hidden">
      <div className="flex h-full">
        <Sidebar className="w-1/5"></Sidebar>
        <div className="w-4/5">
          {/* Pass users directly to the Chat component */}
          <Chat user={currentUser} otherUser={otherUser} />
        </div>
      </div>
    </main>
  );
}

export default page;
