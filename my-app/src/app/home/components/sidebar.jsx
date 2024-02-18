import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { IoMailOutline } from "react-icons/io5";
import { IoBookmarksOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";


export default function Sidebar() {
  return (
    <main className="h-screen w-3/12 border-r border-dotted">
    <div className="flex flex-col gap-10 ml-10 pt-5 w-9/12">
      <h1 className="pl-5 py-5 border text-4xl rounded-3xl font-poppins font-semibold animate-intro-slide animate-text bg-gradient-to-r from-teal-500 via-tacao-300 to-teal-500 bg-clip-text text-transparent">
        Investagram
      </h1>
      <h1 className="flex flex-row font-poppins font-semibold text-3xl text-tacao-300 hover:animate-pop">
        <IoHomeOutline className="mx-1.5"/> Home
      </h1>
      <h1 className="flex flex-row font-poppins font-semibold text-3xl text-tacao-300 hover:animate-pop">
      <IoIosSearch className="mx-1.5"/> Explore
      </h1>
      <h1 className="flex flex-row font-poppins font-semibold text-3xl text-tacao-300 hover:animate-pop">
      <IoMailOutline className="mx-1.5 mt-0.5"/> Inbox
      </h1>
      <h1 className="flex flex-row font-poppins font-semibold text-3xl text-tacao-300 hover:animate-pop">
      <IoBookmarksOutline className="mx-1.5"/> Watchlist
      </h1>
      <h1 className="flex flex-row font-poppins font-semibold text-3xl text-tacao-300 hover:animate-pop">
      <IoMdNotificationsOutline className="mx-1.5"/> Notifications
      </h1>
      <h1 className="flex flex-row font-poppins font-semibold text-3xl text-tacao-300 hover:animate-pop">
      <IoPersonOutline className="mx-1.5"/> Me
      </h1>
      <button class=" text-3xl text-tacao-300 font-semibold
                rounded-3xl
                px-6 py-3 block border hover:animate-text hover:font-bold hover:bg-gradient-to-r hover:from-teal-500 hover:via-tacao-300 hover:to-teal-500 hover:bg-clip-text hover:text-transparent">
               Post
              </button>
      </div>
    </main>
  );
}
