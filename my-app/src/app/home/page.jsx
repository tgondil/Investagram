"use client"
import React, { useState } from "react";
import Sidebar from "../../components/sidebar";
import { IoHomeOutline } from "react-icons/io5";
import Feed from "../../components/feed";
import Cookies from 'js-cookie'

export default function page() {
  const [searchType, setSearchType] = useState("users"); // Default search type
  const [searchQuery, setSearchQuery] = useState(""); // Search query

  return (
    <main className="h-screen bg-shark-950 w-full fixed">
    <div className="flex">
      <Sidebar className="w-1/5" />
      <div className="w-10/12 h-screen">
        {/* Search bar container */}
        <div className="border-b border-dotted fixed w-full h-28 bg-shark-950 flex items-center p-4">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search..."
            className="h-10 px-5 pr-16 rounded-full text-sm focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          {/* Dropdown Menu */}
          <select
            className="ml-4 h-10 rounded-full text-sm"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="posts">Users</option>
            <option value="users">Posts</option>
          </select>
        </div>
        
        {/* Push content down since the search bar is fixed */}
        <div className="pt-28">
          <Feed />
        </div>
      </div>
    </div>
  </main>
);
}
