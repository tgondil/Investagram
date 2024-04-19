"use client";
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar'
import Chat from '../../components/chat'
import Cookies from 'js-cookie'

function page() {
  const [selectedUsername, setSelectedUsername] = useState('Frank');
  const [selectedEmail, setSelectedEmail] = useState('');
  const [selectedProfilePicture, setSelectedProfilePicture] = useState('https://talkjs.com/new-web/avatar-8.jpg');
  const selectedUserID = Cookies.get('selectedUserID') || 'frank';

  useEffect(() => {
    if (selectedUserID != 'frank') {
      fetch(`/userID/${selectedUserID}`)
        .then(response => response.json())
        .then(data => {
          setSelectedUsername(data.username);
          setSelectedProfilePicture(data.profilePicture);
        })
        .catch(error => console.error('Error fetching user data:', error));
    }
  }, []);

  const currentUser = {
    id: Cookies.get('userID'),
    username: Cookies.get('name'),
    email: Cookies.get('email'),
    photoUrl: Cookies.get('profilePicture'),
    welcomeMessage: 'Hi there, how can I help?',
    role: 'user'
  };

  const otherUser = {
    id: Cookies.get("selectedUserID") || 'frank',
    username: Cookies.get("selectedUsername") || 'Frank',
    email: Cookies.get("selectedEmail") || null,
    photoUrl: Cookies.get("selectedProfilePicture") || 'https://talkjs.com/new-web/avatar-8.jpg',
    welcomeMessage: 'Hey! What can I do for you today?',
    role: 'user'
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
