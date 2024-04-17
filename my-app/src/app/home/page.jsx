"use client"
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import { IoHomeOutline } from "react-icons/io5";
import toast, { Toaster } from 'react-hot-toast';
import Feed from "../../components/feed";
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation';

export default function page() {
  const [searchType, setSearchType] = useState("posts"); // Default search type
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [usersList, setUsersList] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const router = useRouter();

  useEffect(() => {
    // Fetch the list of users when the component mounts
    const fetchUsers = async () => {
      try {
        const response = await fetch('/users');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setUsersList(data); // Set the list of users in state
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchType === "users") {
      const filteredSuggestions = usersList.filter(user =>
        user.username.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery, usersList, searchType]);

  // Handle click on suggestion
  const handleSuggestionClick = (username) => {
    setSearchQuery(username);
    setSuggestions([]);
  };

  // Function to handle the form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Check if the entered username exists in the users list
    const user = usersList.find(user => user.username.toLowerCase() === searchQuery.toLowerCase());

    if (user) {
      Cookies.set('selectedUserID', user._id);
      router.push('/userProfile');
    } else {
      // Show error message using toast
      toast.error('Username does not exist.');
      console.error("Username does not exist.");
    }
  };

  return (
    <main className="h-screen bg-shark-950 overflow-hidden">
    <Toaster />
    <div className="flex">
      <Sidebar className="w-1/5" />
      <div className="w-4/5 relative">
        <form onSubmit={handleSearchSubmit} className="border-b border-dotted fixed top-0 right-0 w-4/5 h-20 bg-shark-950 flex items-center justify-between p-5">
            {/* Wrap the search bar and suggestions in a div */}
            <div className="w-3/4"> {/* Match the width of the search input */}
              <input
                type="text"
                placeholder="Search..."
                className="h-10 px-5 w-full rounded-full text-sm focus:outline-none text-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              {/* Suggestions */}
              {searchType === "users" && searchQuery && (
                <div className="absolute top-16 left-10 w-2/3 bg-white shadow-lg">
                  {suggestions.map((user) => (
                    <div
                      key={user._id}
                      onClick={() => handleSuggestionClick(user.username)}
                      className="p-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 text-black"
                    >
                      {user.username}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Dropdown Menu */}
            <select
              className="h-10 w-1/6 rounded-full text-sm text-black text-center"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="posts">Posts</option>
              <option value="users">Users</option>
            </select>
          </form>
        
          {/* Push content down since the search bar is fixed */}
          <div className="pt-20">
            <Feed />
          </div>
        </div>
      </div>
    </main>
  );
}
