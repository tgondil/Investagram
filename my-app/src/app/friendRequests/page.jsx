"use client";
import React from "react";
import Sidebar from "../../components/sidebar";
import { LuPencil } from "react-icons/lu";
import { useState } from "react";

export default function FriendRequestsPage() {
  const [friends, setFriends] = useState([
    
  ]);

  const [friendRequests, setFriendRequests] = useState([
    // Initial friend requests data
    { id: "Arjav", name: "Arjav S" },
    { id: "Elliot", name: "Elliot S" },
    { id: "Jason", name: "Jason Y" },
    { id: "Mohana", name: "Mohana B" },


    // Add more friend requests as needed
  ]);

  const handleAccept = (id) => {
    // Logic to handle friend request acceptance
    // Remove the accepted friend request from the state
    const acceptedFriend = friendRequests.find((request) => request.id === id);

    // Remove the accepted friend request from the friend requests state
    setFriendRequests((prevRequests) =>
      prevRequests.filter((request) => request.id !== id)
    );

    // Add the accepted friend to the friends list state
    setFriends((prevFriends) => [...prevFriends, acceptedFriend]);
  };

  const handleReject = (id) => {
    // Logic to handle friend request acceptance
    // Remove the accepted friend request from the state
    setFriendRequests((prevRequests) =>
      prevRequests.filter((request) => request.id !== id)
    );
  };

  return (
    <main className="h-screen bg-shark-950 w-full overflow-hidden">
      <div className="flex">
        <Sidebar className="w-1/5"></Sidebar>
        <div className="w-10/12 h-screen">
          <div
            id="info"
            className="flex flex-col justify-center  items-center h-full"
          >
            <div className="  w-4/5 h-full flex flex-col justify-center items-center">
              <h1 className="text-3xl font-semibold text-teal-500 my-6 animate-text bg-gradient-to-r from-teal-500 via-tacao-300 to-teal-500 bg-clip-text text-transparent">
                Friend Requests
              </h1>
              <div className="h-4/5 shadow-xl  w-full flex gap-10">
              <div className="bg-grey-800 border shadow-2xl rounded-xl flex flex-col items-center overflow-auto w-2/6 p-6 mb-4 ">
          <h1 className="font-semibold mb-4 flex items-center justify-center font-poppins text-2xl animate-text bg-gradient-to-r from-teal-500 via-tacao-300 to-teal-500 bg-clip-text text-transparent">My Friends</h1>
          {friends.map((friend) => (
            <div key={friend.id} className="text-tacao-300 font-xlflex items-center justify-center my-6 mb-2">
              {friend.name}
            </div>
          ))}
        </div>
              
              <div className="w-10/12 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-teal-500 scrollbar-track-gray-800">

                <div className="w-10/12  overflow-y-auto scrollbar-thin scrollbar-thumb-teal-500 scrollbar-track-gray-800">
                  {friendRequests.map((request) => (
                    <div
                      key={request.id}
                      className="hover:bg-gray-700 border rounded-3xl mb-4 h-1/12 w-full text-teal-300 hover:shadow-2xl hover:text-tacao-300 transition duration-300"
                    >
                      <div className="bg-gray-800 rounded-3xl w-full p-6 ">
                        <div className="flex items-center justify-between w-full mb-4 hover:text-tacao-300">
                          <div className="w-20 h-20 rounded-full">
                            <img
                              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                              alt="placeholder"
                              className="object-contain rounded-full"
                            />
                          </div>
                          <h2 className="text-lg  font-semibold font-poppins">
                            {request.name}
                          </h2>
                          <div className="flex gap-4">
                            <button
                              className="bg-teal-500 text-white px-3 py-1 rounded-lg hover:bg-teal-600 transition duration-300"
                              onClick={() => handleAccept(request.id)}
                            >
                              Accept
                            </button>
                            <button
                              className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300"
                              onClick={() => handleReject(request.id)}
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Additional Friend Requests Cards */}
                {/* Add more friend requests cards as needed */}
              </div>
              
        </div>
            </div>
            
          </div>
          
        </div>
      </div>
    </main>
  );
}
