"use client";
import React, { useState } from 'react';
import Sidebar from "../../components/sidebar";
import Feed from "../../components/feed";

export default function FriendProfilePage() {
  const [friendTier, setFriendTier] = useState(1); // State for friend tier level
  
  // Function to handle changing friend's tier level
  const handleTierChange = (increment) => {
    const newTier = friendTier + increment;
    if (newTier >= 1 && newTier <= 3) {
      setFriendTier(newTier);
    }
  };

  return (
    <main className="h-screen bg-shark-950 w-full overflow-hidden">
      <div className="flex">
        <Sidebar className="w-1/5"></Sidebar>
        <div className="w-10/12 h-screen">
          <div
            id="info"
            className="flex flex-col justify-center items-center h-full"
          >
            <div className="mt-4 w-4/5 h-full flex flex-col justify-center items-center">
              <div className="w-full flex justify-center items-center gap-10 h-2/5">
                <div className="w-40 h-40 rounded-full">
                  <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="placeholder" className="object-contain rounded-full" />
                </div>
                <div>
                  <h1 className="text-3xl flex justify-center items-center font-poppins font-normal animate-text bg-gradient-to-r from-teal-500 via-tacao-300 to-teal-500 bg-clip-text text-transparent">
                    Elliot.Smith25
                  </h1>
                  <div className="mt-1 text-tacao-300 text-m px-2 py-1 rounded text-sm">
                    Added as Friend
                  </div>
                  <div className="flex justify-center items-center gap-4">
                    <h1 className="text-tacao-300 text-m font-normal mt-6 flex justify-center items-center">
                      <span className="font-bold mr-1">5</span> Friends
                    </h1>
                    <h1 className="text-tacao-300 text-m font-normal mt-6 flex justify-center items-center">
                      <span className="font-bold mr-1">0</span> Posts
                    </h1>
                  </div>
                </div>
              </div>
              <div className="h-1/5 w-full flex justify-center items-center border-b border-dotted">
                <div className="w-1/3">
                  <h1 className="text-tacao-300 text-m font-bold"> 
                    Elliot Smith
                  </h1>
                  <h1 className="text-tacao-300 mt-2">
                    Purdue 2025 || West Lala
                  </h1>
                  {/* Display friend's tier level */}
                  <div className="flex justify-center items-center mt-2">
                    <h1 className="text-tacao-300 text-m font-normal mr-2">
                      Tier Level:
                    </h1>
                    <span className="px-3 py-1 bg-tacao-300 text-gray-900 rounded mr-2">
                      {friendTier}
                    </span>
                    {/* Plus and minus buttons */}
                    <div className="flex ml-2">
                      <button
                        onClick={() => handleTierChange(-1)}
                        className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                      >
                        -
                      </button>
                      <button
                        onClick={() => handleTierChange(1)}
                        className="bg-green-500 text-white px-2 py-1 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  {/* Label indicating friend is already added */}
                  <div className="mt-4">
                  </div>
                </div>
              </div>
              <Feed className="w-5/12"></Feed>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
