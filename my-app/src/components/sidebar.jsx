import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { IoMailOutline } from "react-icons/io5";
import { IoBookmarksOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi2";
import Link from "next/link";


export default function Sidebar() {
  return (
    <main className="h-screen w-1/5 pl-4 border-r border-dotted">
    <div className="flex flex-col gap-4 l-5 pt-5 w-11/12">
        <div className="pb-3">
        <h1 className=" pt-5 pb-2 pl-2.5 text-4xl rounded-xl font-poppins font-semibold animate-intro-slide animate-text bg-gradient-to-r from-teal-500 via-tacao-300 to-teal-500 bg-clip-text text-transparent">
        Investagram
      </h1>
      <h1 className="animate-intro-unhide pl-4 text-l animate-text bg-gradient-to-r from-teal-500 via-tacao-300 to-teal-500 bg-clip-text text-transparent">
            Investing just got smarter.
          </h1>
        </div>
      <Link href={"./home"}>
      <h1 className="flex flex-row font-poppins font-light rounded-xl py-3.5 text-2xl text-tacao-300 hover:animate-pop hover:bg-shark-800">
        <IoHomeOutline className="mx-2.5"/> Home 
      </h1>
      </Link>
      <h1 className="flex flex-row font-poppins font-light rounded-xl py-3.5 text-2xl text-tacao-300 hover:animate-pop hover:bg-shark-800">
      <IoIosSearch className="mx-2.5"/> Explore
      </h1>
      <Link href={"./inbox"}>
      <h1 className="flex flex-row font-poppins font-light rounded-xl py-3.5  text-2xl text-tacao-300 hover:animate-pop hover:bg-shark-800">
      <IoMailOutline className="mx-2.5 mt-0.5"/> Inbox
      </h1>
      </Link>
      <h1 className="flex flex-row font-poppins font-light rounded-xl py-3.5  text-2xl text-tacao-300 hover:animate-pop hover:bg-shark-800">
      <IoBookmarksOutline className="mx-2.5"/> Watchlist
      </h1>
      <h1 className="flex flex-row font-poppins font-light rounded-xl py-3.5  text-2xl text-tacao-300 hover:animate-pop hover:bg-shark-800">
      <IoMdNotificationsOutline className="mx-2.5"/> Notifications
      </h1>
      <Link href={"./friendRequests"}>
      <h1 className="flex flex-row font-poppins font-light rounded-xl py-3.5  text-2xl text-tacao-300 hover:animate-pop hover:bg-shark-800">
      <HiOutlineUsers className="mx-2.5 mt-0.5"/> Friends
      </h1>
      </Link>
      <Link href={"./profile"}>
      <h1 className="flex flex-row font-poppins font-light rounded-xl py-3.5  text-2xl text-tacao-300 hover:animate-pop hover:bg-shark-800">
      <IoPersonOutline className="mx-2.5 "/> Me
      </h1>
      </Link>
      
      

      </div>
    </main>
  );
}
