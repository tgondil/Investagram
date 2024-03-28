'use client';


import React, { useState } from 'react';
import Link from "next/link";




export default function SignUp() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSignUp = async () => {
    try {
      const response = await fetch("http://localhost:3000/createAccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        console.log("Account created successfully");
        // Redirect or show success message
      } else {
        console.error("Failed to create account");
      
      }
    } catch (error) {
      console.error("Error creating account:", error);
     
    }
  };

  return (
    <>
      <main className="flex min-h-screen flex-col bg-shark-950 items-center justify-center">
        <div className="text-8xl font-poppins font-semibold animate-intro-slide flex flex-col items-center justify-center">
          <h1 className="h-[7rem] sm:h-[7rem] text-8xl font-poppins font-semibold animate-intro-slide animate-text bg-gradient-to-r from-teal-500 via-tacao-300 to-teal-500 bg-clip-text text-transparent">
            Investagram
          </h1>
          <h1 className="animate-intro-unhide text-xl animate-text bg-gradient-to-r from-teal-500 via-tacao-300 to-teal-500 bg-clip-text text-transparent">
            Investing just got smarter.
          </h1>
        </div>
        <div id="signup-fields" className="flex flex-col gap-8 w-3/12 pt-8 text-tacao-300 text-xl animate-intro-unhide">
          <div id="account-create" className="flex text-3xl font-light items-center flex-col font-poppins ">
            <h1>
              Create your Account
            </h1>
          </div>
          
          <div>
            <label
              className="block text-tacao-300 text-sm font-light mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              className="block text-tacao-300 text-sm font-light mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label
              className="block text-tacao-300 text-sm font-light mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="mt-3 text-lg mt-8 font-semibold bg-tacao-300 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:animate-text hover:font-bold hover:bg-gradient-to-r hover:from-teal-500 hover:via-tacao-300 hover:to-teal-500 hover:bg-clip-text hover:text-transparent"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </div>
          <h1 className="text-xl font-poppins font-normal flex items-center justify-center">
            Already have an account?{" "}
            <Link
              className="pl-1.5 hover:animate-text hover:font-bold hover:bg-gradient-to-r hover:from-teal-500 hover:via-tacao-300 hover:to-teal-500 hover:bg-clip-text hover:text-transparent"
              href={"/login"}
            >
              Login.
            </Link>
          </h1>
        </div>
      </main>
    </>
  );
}
