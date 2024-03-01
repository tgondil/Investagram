import React, { useState } from "react";
import Sidebar from "../../components/sidebar";
import { LuPencil } from "react-icons/lu";

export default function PostManagementPage() {
  const [posts, setPosts] = useState([
    // Initial posts data
    { id: 1, title: "Post 1", content: "Content of Post 1" },
    { id: 2, title: "Post 2", content: "Content of Post 2" },
    { id: 3, title: "Post 3", content: "Content of Post 3" },
  ]);

  const [newPost, setNewPost] = useState({ title: "", content: "" });

  const handleAddPost = () => {
    // Logic to add a new post
    const id = posts.length + 1;
    setPosts([...posts, { id, ...newPost }]);
    setNewPost({ title: "", content: "" }); // Clear input fields after adding
  };

  const handleEditPost = (id) => {
    // Logic to edit a post
    // In a real application, you may open a modal with the post details to edit
    console.log("Edit post with ID:", id);
  };

  const handleDeletePost = (id) => {
    // Logic to delete a post
    setPosts(posts.filter((post) => post.id !== id));
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
                        <div className="flex gap-4">
                          <button
                            className="bg-teal-500 text-white px-3 py-1 rounded-lg hover:bg-teal-600 transition duration-300"
                            onClick={() => handleEditPost(post.id)}
                          >
                            <LuPencil />
                          </button>
                          <button
                            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300"
                            onClick={() => handleDeletePost(post.id)}
                          >
                            Delete
                          </button>
                        </div>
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
