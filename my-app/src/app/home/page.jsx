import React from "react";
import Sidebar from "../../components/sidebar";
import { IoHomeOutline } from "react-icons/io5";
import Feed from "../../components/feed";

export default function page() {
  return (
    <main className="h-screen bg-shark-950 w-full fixed">
      <div className="flex">
        <Sidebar className="w-1/5"></Sidebar>
        <div className="w-10/12 h-screen">
          <div className="border-b border-dotted fixed w-full h-28 bg-shark-950">
            <div>
                
            </div>
          </div>
          <Feed></Feed>

        </div>
      </div>
    </main>
  );
}
