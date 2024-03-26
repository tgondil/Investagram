"use client";
import Sidebar from "@/components/sidebar";
import React, { useState } from "react";

export default function Feed() {
  const [groupMessages, setGroupMessages] = useState([
    { id: 1, user: "Group 1", message: "Hello everyone!" },
    { id: 2, user: "Group 2", message: "Good morning, folks!" },
  ]);

  const handleSendGroupMessage = (e) => {
    e.preventDefault();
    if (groupMessage.trim() !== "") {
      const newMessage = {
        id: groupMessages.length + 1,
        user: "You",
        message: groupMessage,
      };
      setGroupMessages([...groupMessages, newMessage]);
      setGroupMessage("");
    }
  };

  const [groupMessage, setGroupMessage] = useState("");

  const handleGroupMessageChange = (e) => {
    setGroupMessage(e.target.value);
  };

  const renderGroupChatMessages = () => {
    return groupMessages.map((msg) => (
      <div key={msg.id} className="message">
        <span className="username">{msg.user}: </span>
        <span className="text">{msg.message}</span>
      </div>
    ));
  };

  return (
    <main className="h-screen bg-shark-950 w-full overflow-hidden">
      <div className="h-screen bg-shark-950 w-full overflow-hidden">
        <div className="flex">
          <Sidebar />
          <div className="w-10/12 h-screen">
            <div id="info" className="flex flex-col justify-center items-center w-full h-full">
              <h1 className="text-3xl font-semibold text-teal-500 my-8 animate-text bg-gradient-to-r from-teal-500 via-tacao-300 to-teal-500 bg-clip-text text-transparent">
                Group Chat Inbox
              </h1>
              <div className="flex w-10/12 overflow-hidden h-full gap-10">
                <div className="w-6/12 h-screen overflow-hidden scrollbar-thin scrollbar-thumb-teal-500 scrollbar-track-gray-800">
                  <div className="group-chat">{renderGroupChatMessages()}</div>
                </div>
                <div className="w-6/12 pt-2 overflow-y-auto scrollbar-thin scrollbar-thumb-teal-500 scrollbar-track-gray-800">
                  <form onSubmit={handleSendGroupMessage} className="w-full">
                    <input
                      type="text"
                      value={groupMessage}
                      onChange={handleGroupMessageChange}
                      placeholder="Type your message..."
                      className="w-full p-2 border border-gray-500 rounded text-black"
                    />
                    <button
                      type="submit"
                      className="bg-teal-500 text-white px-3 py-1 w-full rounded-lg mt-2 hover:bg-teal-600 transition duration-300"
                    >
                      Send
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}