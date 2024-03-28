// /my-app/src/app/friends/page.jsx
"use client";
import React, { useState } from "react";
import Sidebar from "../../components/sidebar";

const FriendsPage = () => {
  const [friends, setFriends] = useState([
    { id: "1", name: "Mohanna", tier: 3 },
    { id: "2", name: "Arjav", tier: 3 },
    { id: "3", name: "Elliot", tier: 2 },
    { id: "4", name: "Jason", tier: 1 },
    { id: "5", name: "Tanay", tier: 1 },
    // Add more friends as needed
  ]);

  const moveFriendToTier = (friendId, newTier) => {
    // Ensure the newTier is within the allowed range (1 to 3)
    if (newTier < 1 || newTier > 3) return;

    // Logic to move friend to a different tier
    // Update the frontend
    const updatedFriends = friends.map((friend) =>
      friend.id === friendId ? { ...friend, tier: newTier } : friend
    );

    // Sort friends by tier level in descending order
    updatedFriends.sort((a, b) => b.tier - a.tier);

    setFriends(updatedFriends);

    // Update the backend
    fetch(`/app/friends/${friendId}/tier`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tier: newTier }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data)) // Log success message or handle response as needed
      .catch((error) => console.error("Error updating friend tier:", error));
  };

  return (
    <main className="h-screen bg-shark-950 w-full overflow-hidden">
      <div className="flex">
        <Sidebar className="w-1/5" />
        <div className="w-10/12 h-screen">
          <div
            id="info"
            className="flex flex-col justify-center items-center h-full"
          >
            <h1 className="text-4xl font-bold animate-rainbow mb-8 text-tacao-300">
              Friend Tiers
            </h1>
            <div className="w-full flex flex-col gap-4">
              {friends.map((friend) => (
                <div
                  key={friend.id}
                  className="flex justify-between items-center bg-gray-300 px-4 py-2 rounded"
                >
                  <span>
                    {friend.name} - Tier {friend.tier}
                  </span>
                  <div>
                    <button
                      className="px-3 py-1 bg-tacao-300 text-gray-900 rounded mr-2 hover:bg-tacao-400 focus:outline-none"
                      onClick={() =>
                        moveFriendToTier(friend.id, friend.tier - 1)
                      }
                      disabled={friend.tier === 1}
                    >
                      Lower Tier
                    </button>
                    <button
                      className="px-3 py-1 bg-tacao-300 text-gray-900 rounded hover:bg-tacao-400 focus:outline-none"
                      onClick={() =>
                        moveFriendToTier(friend.id, friend.tier + 1)
                      }
                      disabled={friend.tier === 3}
                    >
                      Higher Tier
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FriendsPage;
