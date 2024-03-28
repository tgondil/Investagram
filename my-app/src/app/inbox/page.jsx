"use client";
import Sidebar from "../../components/sidebar";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Page = () => {
  // State to hold user and messages information
  const [selectedUser, setSelectedUser] = useState(null); // The user whose conversation is selected
  const [messages, setMessages] = useState([]); // The messages in the conversation
  const [newMessage, setNewMessage] = useState(''); // New message input
  const [conversationList, setConversationList] = useState([]); // List of conversations for the logged-in user

  // Dummy user details - replace with actual authentication data in production
  const loggedInUser = {
    id: '65fbaddbb53516dfbf4335c6', // User1's ID
  };

  useEffect(() => {
    // Fetch conversations on component mount
    const fetchConversations = async () => {
      try {
        // API call to get conversation list for the logged-in user
        const response = await axios.get(`/conversations/${loggedInUser.id}`);
        setConversationList(response.data);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };

    fetchConversations();
  }, [loggedInUser.id]);

  // Fetch messages for a selected user
  const fetchMessages = async (otherUserId) => {
    try {
      const response = await axios.get(`/messages/${loggedInUser.id}/${otherUserId}`);
      setSelectedUser(otherUserId);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Send a new message to the selected user
  const handleSendMessage = async () => {
    if (newMessage.trim() && selectedUser) {
      try {
        await axios.post('/send-message', {
          sender: loggedInUser.id,
          receiver: selectedUser,
          content: newMessage,
        });
        setNewMessage('');
        fetchMessages(selectedUser); // Refresh messages after sending
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  // Render the conversations list - replace this with actual rendering logic
  const renderConversations = () => {
    return conversationList.map((conversation) => (
      <div key={conversation._id} onClick={() => fetchMessages(conversation._id)}>
        {/* Placeholder: Display conversation. Adjust with actual data */}
        Conversation with User {conversation._id}
      </div>
    ));
  };

  return (
    <div className="messaging-container">
      <Sidebar /> {/* Sidebar component on the left */}
      <div className="conversations-container">
        {/* List of conversations */}
        <div className="conversation-list">
          {/* renderConversations would be your method to list the conversations */}
        </div>
        <div className="conversation">
          {/* Conversation view, with messages and input to send new messages */}
        </div>
      </div>
      <style jsx>{`
        .messaging-container {
          display: flex;
          height: 100vh; /* take full height of the viewport */
        }
        .conversations-container {
          display: flex;
          flex: 1; /* take the remaining space after the sidebar */
        }
        .conversation-list {
          width: 250px; /* fixed width or you can make it flexible too */
          overflow-y: auto; /* for scrolling */
          border-right: 1px solid #ccc; /* just to visually separate the areas */
        }
        .conversation {
          flex: 1; /* take the remaining space */
          overflow-y: auto; /* for scrolling */
        }
      `}</style>
    </div>
  );
};

export default Page;
