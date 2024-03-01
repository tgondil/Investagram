import React from "react";
import Sidebar from "../../components/sidebar";
import { LuPencil } from "react-icons/lu";

export default function FriendRequestsPage() {
  return (
    <main className="h-screen bg-shark-950 w-full overflow-hidden">
      <div className="flex">
        <Sidebar className="w-1/5"></Sidebar>
        <div className="w-10/12 h-screen">
          <div
            id="info"
            className="flex flex-col justify-center  items-center h-full"
          >
            <div className="mt-4 w-4/5 h-full flex flex-col justify-center items-center">
              <h1 className="text-xl font-semibold text-teal-500 mb-6">
                Friend Requests
              </h1>
              {/* Friend Requests Feed */}
              <div className="w-10/12 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-teal-500 scrollbar-track-gray-800">
                {/* Friend Request Card 1 */}

                <div className="hover:bg-gray-700 hover:shadow-xl transition duration-300">
                  <div className="bg-gray-800 rounded-lg p-6 mb-4">
                    <div className="flex items-center justify-between mb-4">
                    <div className="w-20 h-20 rounded-full">
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="placeholder" className="object-contain rounded-full" />
                </div>
                      <h2 className="text-lg font-semibold text-white hover:text-tacao-300 transition duration-300">Arjav S</h2>
                      <div className="flex gap-4">
                        <button className="bg-teal-500 text-white px-3 py-1 rounded-lg hover:bg-teal-600 transition duration-300">Accept</button>
                        <button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300">Reject</button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Friend Request Card 2 */}
                <div className="hover:bg-gray-700 hover:shadow-xl transition duration-300">
                  <div className="bg-gray-800 rounded-lg p-6 mb-4">
                    <div className="flex items-center justify-between mb-4">
                    <div className="w-20 h-20 rounded-full">
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="placeholder" className="object-contain rounded-full" />
                </div> 
                      <h2 className="text-lg font-semibold text-white hover:text-tacao-300 transition duration-300">Elliot S</h2>
                      <div className="flex gap-4">
                        <button className="bg-teal-500 text-white px-3 py-1 rounded-lg hover:bg-teal-600 transition duration-300">Accept</button>
                        <button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300">Reject</button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Friend Request Card 3 */}
                <div className="hover:bg-gray-700 hover:shadow-xl transition duration-300">
                  <div className="bg-gray-800 rounded-lg p-6 mb-4">
                    <div className="flex items-center justify-between mb-4">
                    <div className="w-20 h-20 rounded-full">
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="placeholder" className="object-contain rounded-full" />
                </div>
                      <h2 className="text-lg font-semibold text-white hover:text-tacao-300 transition duration-300">Tanay G</h2>
                      <div className="flex gap-4">
                        <button className="bg-teal-500 text-white px-3 py-1 rounded-lg hover:bg-teal-600 transition duration-300">Accept</button>
                        <button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300">Reject</button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Friend Request Card 4 */}
                <div className="hover:bg-gray-700 hover:shadow-xl transition duration-300">
                  <div className="bg-gray-800 rounded-lg p-6 mb-4">
                    <div className="flex items-center justify-between mb-4">
                    <div className="w-20 h-20 rounded-full">
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="placeholder" className="object-contain rounded-full" />
                </div>
                      <h2 className="text-lg font-semibold text-white hover:text-tacao-300 transition duration-300">Mohana B</h2>
                      <div className="flex gap-4">
                        <button className="bg-teal-500 text-white px-3 py-1 rounded-lg hover:bg-teal-600 transition duration-300">Accept</button>
                        <button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300">Reject</button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Friend Request Card 5 */}
                <div className="hover:bg-gray-700 hover:shadow-xl transition duration-300">
                  <div className="bg-gray-800 rounded-lg p-6 mb-4">
                    <div className="flex items-center justify-between mb-4">
                    <div className="w-20 h-20 rounded-full">
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="placeholder" className="object-contain rounded-full" />
                </div>
                      <h2 className="text-lg font-semibold text-white group-hover:text-tacao-300 transition duration-300">Jason Y</h2>
                      <div className="flex gap-4">
                        <button className="bg-teal-500 text-white px-3 py-1 rounded-lg hover:bg-teal-600 transition duration-300">Accept</button>
                        <button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300">Reject</button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Additional Friend Requests Cards */}
                {/* Add more friend requests cards as needed */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
