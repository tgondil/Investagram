"use client";
import React, { useState } from "react";
import Sidebar from "../../components/sidebar";
import { LuPencil } from "react-icons/lu";

export default function PostManagementPage({ currentUser }) {
  const [posts, setPosts] = useState([
    // Initial posts data
    { id: 1, title: "What stocks should I buy", content: "I think I want to buy 1000 units of Tesla", createdBy: "user1" },
    { id: 2, title: "What's happening with the market", content: "I don't understand what is happening, can someone explain it?", createdBy: "user2" },
    { id: 3, title: "Positive vibes check in", content: "How is everyone feeling today :)", createdBy: "user1" },
  ]);

  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [editingPost, setEditingPost] = useState(null); // State to track the post being edited

  const handleAddPost = () => {
    // Logic to add a new post
    const id = posts.length + 1;
    setPosts([...posts, { id, ...newPost, createdBy: currentUser }]);
    setNewPost({ title: "", content: "" }); // Clear input fields after adding
  };

  const handleEditPost = (post) => {
    // Check if the current user matches the creator of the post
    if (currentUser === post.createdBy) {
      // Set the post to be edited in the state
      setEditingPost(post);
      setNewPost({ title: post.title, content: post.content }); // Initialize input fields with existing post details
    } else {
      alert("You can only edit your own posts.");
    }
  };

  const handleSaveEdit = () => {
    // Logic to save the edited post
    setPosts((prevPosts) =>
      prevPosts.map((prevPost) =>
        prevPost.id === editingPost.id ? { ...prevPost, ...newPost } : prevPost
      )
    );
    setEditingPost(null); // Clear editing state
    setNewPost({ title: "", content: "" }); // Clear input fields after editing
  };

  const handleDeletePost = (id) => {
    // Logic to delete a post
    const postToDelete = posts.find((post) => post.id === id);
    if (currentUser === postToDelete.createdBy) {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      setEditingPost(null); // Clear editing state
      setNewPost({ title: "", content: "" }); // Clear input fields after deleting
    } else {
      alert("You can only delete your own posts.");
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
            <div className="w-4/5 h-full flex flex-col justify-center items-center">
              <h1 className="text-3xl font-semibold text-teal-500 my-6 animate-text bg-gradient-to-r from-teal-500 via-tacao-300 to-teal-500 bg-clip-text text-transparent">
                Manage Posts
              </h1>
              {/* Add New Post Section */}
              <div className="mb-6 w-full flex justify-center items-center">
                <input
                  type="text"
                  placeholder="Title"
                  value={newPost.title}
                  onChange={(e) =>
                    setNewPost({ ...newPost, title: e.target.value })
                  }
                  className="border rounded-lg px-4 py-2 mr-4 w-64"
                />
                <input
                  type="text"
                  placeholder="Content"
                  value={newPost.content}
                  onChange={(e) =>
                    setNewPost({ ...newPost, content: e.target.value })
                  }
                  className="border rounded-lg px-4 py-2 mr-4 w-64"
                />
                <button
                  className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition duration-300"
                  onClick={handleAddPost}
                >
                  Add Post
                </button>
              </div>
              {/* Display Posts */}
              <div className="w-full overflow-y-auto scrollbar-thin scrollbar-thumb-teal-500 scrollbar-track-gray-800">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="hover:bg-gray-700 border rounded-3xl mb-4 w-full text-teal-300 hover:shadow-2xl hover:text-tacao-300 transition duration-300"
                  >
                    <div className="bg-gray-800 rounded-3xl w-full p-6">
                      <div className="flex items-center justify-between w-full mb-4 hover:text-tacao-300">
                        <h2 className="text-lg font-semibold font-poppins">
                          {post.title}
                        </h2>
                        {currentUser === post.createdBy && (
                          <div className="flex gap-4">
                            <button
                              className="bg-teal-500 text-white px-3 py-1 rounded-lg hover:bg-teal-600 transition duration-300"
                              onClick={() => handleEditPost(post)}
                            >
                              Edit
                            </button>
                            <button
                              className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300"
                              onClick={() => handleDeletePost(post.id)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                      <p className="text-sm">{post.content}</p>
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
}
