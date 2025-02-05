"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import { LuPencil } from "react-icons/lu";

export default function PostManagementPage({ currentUser }) {
  const [posts, setPosts] = useState([
    // Initial posts data
    { id: 1, title: "What stocks should I buy", content: "I think I want to buy 1000 units of Tesla", createdBy: "user1", likes: 0, likedBy: [], comments: [], timestamp: Date.now(), reports: 0 },
    { id: 2, title: "Buy my stock!", content: "Risk free! No strings attached", createdBy: "user2", likes: 0, likedBy: [], comments: [], timestamp: Date.now(), reports: 0 },
    { id: 3, title: "What's happening with the market", content: "I don't understand what is happening, can someone explain it?", createdBy: "user2", likes: 0, likedBy: [], comments: [], timestamp: Date.now(), reports: 0 },
    { id: 4, title: "Positive vibes check in", content: "How is everyone feeling today :)", createdBy: "user1", likes: 0, likedBy: [], comments: [], timestamp: Date.now(), reports: 0 },
  ]);

  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [editingPost, setEditingPost] = useState(null); // State to track the post being edited
  const [commentText, setCommentText] = useState(""); // State to track the comment text
  const [showCommentBox, setShowCommentBox] = useState(null); // State to track which post's comment box is shown
  const [showOptions, setShowOptions] = useState(null); // State to track which post's options are shown

  useEffect(() => {
    // Sort posts by timestamp in descending order to display most recent posts first
    setPosts(prevPosts => prevPosts.sort((a, b) => b.timestamp - a.timestamp));
  }, []);

  const handleAddPost = () => {
    // Logic to add a new post
    const id = posts.length + 1;
    const timestamp = Date.now(); // Get current timestamp
    setPosts([{ id, ...newPost, createdBy: currentUser, likes: 0, likedBy: [], comments: [], timestamp, reports: 0 }, ...posts]);
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

  const handleLikePost = (id) => {
    // Check if the user has already liked the post
    const postIndex = posts.findIndex(post => post.id === id);
    const likedByCurrentUser = posts[postIndex].likedBy.includes(currentUser);
    if (likedByCurrentUser) {
      // Unlike the post
      setPosts(prevPosts => prevPosts.map(post => {
        if (post.id === id) {
          return { ...post, likes: post.likes - 1, likedBy: post.likedBy.filter(user => user !== currentUser) };
        }
        return post;
      }));
    } else {
      // Like the post
      setPosts(prevPosts => prevPosts.map(post => {
        if (post.id === id) {
          return { ...post, likes: post.likes + 1, likedBy: [...post.likedBy, currentUser] };
        }
        return post;
      }));
    }
  };

  const handleComment = (id) => {
    setShowCommentBox(id);
    setCommentText(""); // Clear comment text
  };

  const handleAddComment = (postId) => {
    // Find the post by ID
    const postIndex = posts.findIndex(post => post.id === postId);
    if (postIndex !== -1) {
      // Add the comment to the post's comments array
      const updatedPosts = [...posts];
      updatedPosts[postIndex].comments.push({
        id: updatedPosts[postIndex].comments.length + 1,
        text: commentText,
        createdBy: currentUser,
        likes: 0,
        likedBy: []
      });
      setPosts(updatedPosts);
      // Hide the comment box after adding the comment
      setShowCommentBox(null);
      // Clear the comment text
      setCommentText("");
    }
  };

  const handleLikeComment = (postId, commentId) => {
    // Find the post by ID
    const postIndex = posts.findIndex(post => post.id === postId);
    if (postIndex !== -1) {
      // Find the comment by ID
      const commentIndex = posts[postIndex].comments.findIndex(comment => comment.id === commentId);
      if (commentIndex !== -1) {
        // Check if the user has already liked the comment
        const likedByCurrentUser = posts[postIndex].comments[commentIndex].likedBy.includes(currentUser);
        // Update the likes and likedBy array based on whether the user has already liked the comment
        const updatedPosts = [...posts];
        if (likedByCurrentUser) {
          // Unlike the comment
          updatedPosts[postIndex].comments[commentIndex].likes -= 1;
          updatedPosts[postIndex].comments[commentIndex].likedBy = updatedPosts[postIndex].comments[commentIndex].likedBy.filter(user => user !== currentUser);
        } else {
          // Like the comment
          updatedPosts[postIndex].comments[commentIndex].likes += 1;
          updatedPosts[postIndex].comments[commentIndex].likedBy.push(currentUser);
        }
        setPosts(updatedPosts);
      }
    }
  };

  const handleReportPost = (id) => {
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === id) {
        // Increment the reports count for the post
        const updatedPost = { ...post, reports: post.reports + 1 };
        // Check if the post has been reported 5 times
        if (updatedPost.reports >= 5) {
          // If reported 5 times, remove the post
          return null;
        }
        return updatedPost;
      }
      return post;
    }).filter(Boolean)); // Remove any null entries (posts with 5 or more reports)
    alert("Post has been reported as harmful.");
  };

  const handleReportUser = (username) => {
    alert(`User ${username} has been reported as harmful.`);
  };

  const toggleOptions = (id) => {
    setShowOptions(prevState => (prevState === id ? null : id));
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
                    className={`${
                      post.reports >= 1 ? "border-red-500" : "hover:bg-gray-700"
                    } border rounded-3xl mb-4 w-full text-teal-300 hover:shadow-2xl hover:text-tacao-300 transition duration-300`}
                  >
                    <div className="bg-gray-800 rounded-3xl w-full p-6">
                      <div className="flex items-center justify-between w-full mb-4 hover:text-tacao-300">
                        <h2 className="text-lg font-semibold font-poppins">
                          {post.title}
                        </h2>
                        <div className="flex gap-4">
                          {currentUser === post.createdBy && (
                            <>
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
                            </>
                          )}
                          <button
                            className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition duration-300"
                            onClick={() => handleLikePost(post.id)}
                          >
                            {post.likedBy.includes(currentUser) ? 'Unlike' : 'Like'} ({post.likes})
                          </button>
                          <button
                            className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition duration-300"
                            onClick={() => handleComment(post.id)}
                          >
                            Comment
                          </button>
                          {currentUser !== post.createdBy && (
                            <>
                              <div className="relative">
                                <button
                                  className="bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-600 transition duration-300"
                                  onClick={() => toggleOptions(post.id)}
                                >
                                  Options
                                </button>
                                {showOptions === post.id && (
                                  <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-2">
                                    <button
                                      className="block w-full px-4 py-2 text-white text-left hover:bg-red-600"
                                      onClick={() => handleReportPost(post.id)}
                                    >
                                      Report Post
                                    </button>
                                    <button
                                      className="block w-full px-4 py-2 text-white text-left hover:bg-red-600"
                                      onClick={() => handleReportUser(post.createdBy)}
                                    >
                                      Report User
                                    </button>
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      <p className="text-sm">{post.content}</p>
                      {showCommentBox === post.id && (
                        <div className="mt-4">
                          <textarea
                            rows="3"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            className="border rounded-lg px-4 py-2 w-full mb-2"
                            placeholder="Write your comment here..."
                          ></textarea>
                          <button
                            className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition duration-300"
                            onClick={() => handleAddComment(post.id)}
                          >
                            Add Comment
                          </button>
                        </div>
                      )}
                      <div className="mt-4">
                        {post.comments.map(comment => (
                          <div key={comment.id} className="bg-gray-700 rounded-lg p-2 mb-2">
                            <p className="text-sm">{comment.text}</p>
                            <div className="flex items-center mt-2">
                              <button
                                className="bg-yellow-500 text-white px-2 py-1 rounded-lg mr-2 hover:bg-yellow-600 transition duration-300"
                                onClick={() => handleLikeComment(post.id, comment.id)}
                              >
                                {comment.likedBy.includes(currentUser) ? 'Unlike' : 'Like'} ({comment.likes})
                              </button>
                              <span className="text-xs text-gray-400">By {comment.createdBy}</span>
                            </div>
                          </div>
                        ))}
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
}
