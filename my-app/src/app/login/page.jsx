'use client';
import Cookies from 'js-cookie'
import React, { useState } from 'react';
import Link from "next/link";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    
    try {
      const response = await fetch("/accountLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success('Logged in successfully!');
        console.log("Logged in successfully");
        Cookies.set('name', username);
        Cookies.set('userID', data.userProfile.userID);
        Cookies.set('email', data.userProfile.email);
        Cookies.set('profilePicture', data.userProfile.profilePicture);
        router.push('/home');
      } else {
        toast.error('Login failed!');
        console.error("Failed to log in");
      }
    } catch (error) {
      console.error("Error logging in", error);
      toast.error('Login failedd!');
    }
  };

  return (
    <>
      <main className="flex min-h-screen flex-col bg-shark-950 items-center justify-center">
        <div className="flex flex-col text-tacao-300 items-center justify-center gap-12">
          <div className="text-8xl font-poppins font-semibold animate-intro-slide flex flex-col items-center justify-center">
            <h1 className="h-[7rem] sm:h-[7rem] text-8xl font-poppins font-semibold animate-intro-slide animate-text bg-gradient-to-r from-teal-500 via-tacao-300 to-teal-500 bg-clip-text text-transparent">
              Investagram
            </h1>
            <h1 className="animate-intro-unhide text-xl animate-text bg-gradient-to-r from-teal-500 via-tacao-300 to-teal-500 bg-clip-text text-transparent">
              Investing just got smarter.
            </h1>
          </div>

          <div className="w-10/12 delay-5000 animate-intro-unhide">
            <div className="flex items-center justify-center">
              <h1 className="text-3xl font-poppins font-light">
                Welcome back!
              </h1>
            </div>
            <div className="transition mb-4 w-full delay-2000 animate-intro-unhide">
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
            <div className="mb-4 w-full animate-intro-unhide">
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
                onClick={handleLogin}
              >
                Login
              </button>
              <h1 className="text-xl font-poppins font-normal flex items-center justify-center pt-6">
                Don't have an account?{" "}
                <Link
                  className="pl-1.5 hover:animate-text hover:font-bold hover:bg-gradient-to-r hover:from-teal-500 hover:via-tacao-300 hover:to-teal-500 hover:bg-clip-text hover:text-transparent"
                  href={"/signup"}
                >
                  Sign up.
                </Link>
              </h1>
            </div>
          </div>
        </div>
        <Toaster
  position="bottom-center"
  reverseOrder={false}
/>
      </main>
    </>
  );
}
