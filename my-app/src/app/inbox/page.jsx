"use client";
import Sidebar from "@/components/sidebar";
import React from "react";
import { useState } from "react";

export default function Feed() {
    
    const [chatMessages, setChatMessages] = useState([]);
const [selectedUser, setSelectedUser] = useState(null);
const [replyMessage, setReplyMessage] = useState("");

const [messages, setMessages] = useState([
    { id: 1, user: "John Doe", message: "Hey there!" },
    { id: 2, user: "Alice Smith", message: "How's it going?" },
    { id: 3, user: "Bob Johnson", message: "Meeting at 3 PM today." },
    { id: 4, user: "Eve Williams", message: "What's the plan for the weekend?" },
    { id: 5, user: "Charlie Brown", message: "Can you review the document?" },
  ]);

  const handleReply = (id) => {
    setSelectedUser(id);
  };


  const handleSendReply = (e) => {
    e.preventDefault();
    if (selectedUser !== null && replyMessage.trim() !== "") {
      const updatedMessages = messages.map((msg) =>
        msg.id === selectedUser
          ? { ...msg, message: `${msg.message}\n\n${replyMessage}` }
          : msg
      );

      setMessages(updatedMessages);
      setReplyMessage("");
    }
  };

  


  const getChatMessages = () => {
    if (selectedUser !== null) {
      const selectedUserMessages = messages.filter((msg) => msg.id === selectedUser);
      return (
        <>
          <div className="mb-4 text-tacao-300 flex justify-center items-center text-lg font-semibold">
            Conversation with {selectedUserMessages[0].user}
          </div>
          <div className="h-1/3 w-full ">
        {selectedUserMessages.map((msg) => (
          <div key={msg.id} className="text-tacao-300 w-full font-xl flex items-center justify-center my-6 mb-2">
            {/* Use <pre> tag to preserve whitespace */}
            <pre>{msg.message}</pre>
          </div>
        ))}
      </div>
          <div className="h-1/3">

          </div>
          <div>
          <div className="mt-4 flex pl-24 sticky top-0 left-0 w-4/5 flex-col justify-between">
            <form onSubmit={handleSendReply} className="w-full">

            
            <input
              type="text"
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder="Type your reply..."
              className="w-full p-2 border border-gray-500 rounded text-black"
            />
            <button
              className="bg-teal-500 text-white px-3 py-1 w-full rounded-lg mt-2 hover:bg-teal-600 transition duration-300"
              onClick={handleSendReply}
            >
              Send
            </button>
            </form>
          </div>
          </div>
          
        </>
      );
    }
    return <p className="mb-4 text-tacao-300 flex justify-center items-center text-lg font-semibold">Select a user to start a conversation.</p>;
  };

  return (
    <main className="h-screen bg-shark-950 w-full overflow-hidden">
        
    <div className="h-screen bg-shark-950 w-full overflow-hidden">
      <div className="flex">
      <Sidebar></Sidebar>


        <div className="w-10/12 h-screen">
          <div id="info" className="flex flex-col justify-center items-center w-full h-full">
            <div className=" w-full h-full flex flex-col justify-center items-center">
              <h1 className="text-3xl font-semibold text-teal-500 my-8 animate-text bg-gradient-to-r from-teal-500 via-tacao-300 to-teal-500 bg-clip-text text-transparent">
                Messaging Inbox
              </h1>
              <div className="flex  w-10/12 overflow-hidden h-full gap-10">

              
<           div className="w-6/12 h-screen overflow-hidden scrollbar-thin scrollbar-thumb-teal-500 scrollbar-track-gray-800">
                {getChatMessages()}
              </div>
              <div className="w-6/12 pt-2 overflow-y-auto scrollbar-thin scrollbar-thumb-teal-500 scrollbar-track-gray-800">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className="hover:bg-gray-700 border text-teal-300 rounded-3xl mb-4 h-1/12 w-full hover:shadow-2xl hover:text-tacao-300 transition duration-300"
                  >
                    <div className="bg-gray-800 rounded-3xl w-full  p-6">
                      <div className="flex items-center justify-between w-full  mb-4 ">
                        <div className="w-20 h-20 rounded-full">
                          <img
                            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                            alt="placeholder"
                            className="object-contain rounded-full"
                          />
                        </div>
                        <h2 className="text-lg font-semibold  font-poppins ">{msg.user}</h2>
                        <div className="flex gap-4">
                          <button
                            className="bg-teal-500 text-white px-3 py-1 rounded-lg hover:bg-teal-600 transition duration-300"
                            onClick={() => handleReply(msg.id)}
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                      <div className="h-1/3 ">

                      <pre><p className="text-tacao-300 ml-4 flex justify-center items-center">{msg.message.split("\n").slice(-1)}</p></pre>
                      </div>
                    </div>
                  </div>
                ))}
                
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
    </main>

  );
}
