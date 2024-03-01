import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import { LuPencil } from "react-icons/lu";

const FriendRequestsPage = () => {
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    // Fetch friend requests when the component mounts
    fetchFriendRequests();
  }, []);

  const sendFriendRequest = async (recipientId) => {
    try {
      const response = await fetch(`/api/send-request/${recipientId}`, {
        method: 'POST',
      });

      if (response.ok) {
        // If the request is successful, update the UI or handle as needed
        console.log('Friend request sent successfully');
        fetchFriendRequests(); // Refresh friend requests after sending
      } else {
        // Handle errors
        console.error('Error sending friend request:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending friend request:', error.message);
    }
  };

  const acceptFriendRequest = async (requestId) => {
    try {
      const response = await fetch(`/api/accept-request/${requestId}`, {
        method: 'POST',
      });

      if (response.ok) {
        // If the request is successful, update the UI or handle as needed
        console.log('Friend request accepted successfully');
        fetchFriendRequests(); // Refresh friend requests after accepting
      } else {
        // Handle errors
        console.error('Error accepting friend request:', response.statusText);
      }
    } catch (error) {
      console.error('Error accepting friend request:', error.message);
    }
  };

  const rejectFriendRequest = async (requestId) => {
    try {
      const response = await fetch(`/api/reject-request/${requestId}`, {
        method: 'POST',
      });

      if (response.ok) {
        // If the request is successful, update the UI or handle as needed
        console.log('Friend request rejected successfully');
        fetchFriendRequests(); // Refresh friend requests after rejecting
      } else {
        // Handle errors
        console.error('Error rejecting friend request:', response.statusText);
      }
    } catch (error) {
      console.error('Error rejecting friend request:', error.message);
    }
  };

  const fetchFriendRequests = async () => {
    try {
      const response = await fetch('/api/friend-requests'); // Update the URL if needed

      if (response.ok) {
        const data = await response.json();
        setFriendRequests(data.friendRequests || []);
      } else {
        // Handle errors
        console.error('Error fetching friend requests:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching friend requests:', error.message);
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
              <h1 className="text-xl font-semibold text-teal-500 mb-6">
                Friend Requests
              </h1>
              {/* Friend Requests Feed */}
              <div className="w-10/12 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-teal-500 scrollbar-track-gray-800">
                {friendRequests.map((request) => (
                  <div
                    key={request._id}
                    className="hover:bg-gray-700 hover:shadow-xl transition duration-300"
                  >
                    <div className="bg-gray-800 rounded-lg p-6 mb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-20 h-20 rounded-full">
                          <img
                            src={request.senderProfilePicture || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
                            alt="sender"
                            className="object-contain rounded-full"
                          />
                        </div>
                        <h2 className="text-lg font-semibold text-white hover:text-tacao-300 transition duration-300">
                          {request.senderName}
                        </h2>
                        <div className="flex gap-4">
                          <button
                            onClick={() => acceptFriendRequest(request._id)}
                            className="bg-teal-500 text-white px-3 py-1 rounded-lg hover:bg-teal-600 transition duration-300"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => rejectFriendRequest(request._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FriendRequestsPage;
