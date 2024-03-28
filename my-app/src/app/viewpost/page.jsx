import React from "react";
import Sidebar from "../../components/sidebar";
import { LuPencil } from "react-icons/lu";
import Feed from "../../components/feed";

export default function UserProfile() {
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
                  <img
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    alt="placeholder"
                    className="object-contain rounded-full"
                  />
                </div>
                <div>
                  <h1 className="text-3xl flex justify-center items-center font-poppins font-normal animate-text bg-gradient-to-r from-teal-500 via-tacao-300 to-teal-500 bg-clip-text text-transparent">
                    Username
                  </h1>
                  <div className="flex justify-center items-center gap-4">
                    <h1 className="text-tacao-300 text-m font-normal mt-6 flex justify-center items-center">
                      <span className="font-bold mr-1">10</span> Friends
                    </h1>
                    <h1 className="text-tacao-300 text-m font-normal mt-6 flex justify-center items-center">
                      <span className="font-bold mr-1">2</span> Posts
                    </h1>
                  </div>
                </div>
              </div>
              <div className="h-1/5 w-full flex justify-center items-center border-b border-dotted">
                <div className="w-1/3">
                  <h1 className="text-tacao-300 text-m font-bold">
                    Full Name
                  </h1>
                  <h1 className="text-tacao-300 mt-2">
                    Bio/Description
                  </h1>
                </div>
              </div>
              <div className="w-full mt-4">
                <h1 className="text-tacao-300 text-m font-semibold mb-2">
                  Post History
                </h1>
                <Feed className="w-full"></Feed>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
