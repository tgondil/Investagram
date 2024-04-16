"use client"
import React, { useState } from "react";
import Sidebar from "../../components/sidebar";
import { IoHomeOutline } from "react-icons/io5";
import Feed from "../../components/feed";
import Cookies from 'js-cookie'

export default function page() {
  const [searchType, setSearchType] = useState("posts"); // Default search type
  const [searchQuery, setSearchQuery] = useState(""); // Search query

  return (
    <main className="h-screen bg-shark-950 overflow-hidden">
    <div className="flex">
      <Sidebar className="w-1/5" />
      <div className="w-4/5">
          {/* Search bar container */}
          <div className="border-b border-dotted fixed top-0 right-0 w-4/5 h-20 bg-shark-950 flex items-center justify-between p-5">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search..."
              className="h-10 px-5 w-3/4 rounded-full text-sm focus:outline-none text-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            {/* Dropdown Menu */}
            <select
              className="h-10 w-1/6 rounded-full text-sm text-black text-center"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="posts">Posts</option>
              <option value="users">Users</option>
            </select>
          </div>
          
          {/* Push content down since the search bar is fixed */}
          <div className="pt-20">
            <Feed />
          </div>
        </div>
      </div>
    </main>
  );
}
