"use client";
import React, { useState } from "react";
import { sendUsernameResetEmail, sendPasswordResetEmail } from "./emailService"; // Update the path
import Sidebar from "../../components/sidebar";
import Link from 'next/link';

export default function ResetPage() {
  const [email, setEmail] = useState("");
  const [resetType, setResetType] = useState("username"); // or "password"
  const [resetStatus, setResetStatus] = useState(null);

  const handleReset = async () => {
    // Email validation check
    if (!email.includes('@')) {
      alert('Invalid email. Please enter a valid email address.');
      return;
    }

    try {
      // Call the backend to send reset email
      if (resetType === "username") {
        const username = "new-username"; // Replace with logic to generate new username
        await sendUsernameResetEmail(email, username);
      } else {
        const temporaryPassword = "temp-password"; // Replace with logic to generate temporary password
        await sendPasswordResetEmail(email, temporaryPassword);
      }
      // Update reset status
      setResetStatus("success");
    } catch (error) {
      console.error("Error sending reset email:", error);
      setResetStatus("error");
    }
  };

  return (
    <main className="h-screen bg-shark-950 w-full overflow-hidden">
      <div className="flex">
        <Sidebar className="w-1/5"></Sidebar>
        <div className="w-10/12 h-screen">
          <div
            id="info"
            className="flex flex-col justify-center  items-center h-full"
          >
            <div className="  w-4/5 h-full flex flex-col justify-center items-center">
              <h1 className="text-3xl font-semibold text-teal-500 my-6 animate-text bg-gradient-to-r from-teal-500 via-tacao-300 to-teal-500 bg-clip-text text-transparent">
                {resetType === "username" ? "Username" : "Password"} Reset
              </h1>
              {/* Reset Type Toggle Button */}
              <button
                onClick={() => setResetType(resetType === "username" ? "password" : "username")}
                className="bg-teal-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-teal-600 transition duration-300"
              >
                Toggle Reset Type
              </button>

              <div className="h-4/5 shadow-xl  w-full flex flex-col items-center">
                <div className="mb-4 w-full animate-intro-unhide">
                  <label
                    className="block text-tacao-300 text-sm font-light mb-2"
                    htmlFor="email"
                  >
                    Enter Your {resetType === "username" ? "Email" : "Email"} For Your Account
                  </label>
                  <input
                    className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type={resetType === "username" ? "email" : "text"}
                    placeholder={`Your ${resetType === "username" ? "Email" : "Email"} Address`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button
                  className="mt-3 text-lg mt-8 font-semibold 
                bg-tacao-300 w-full text-white rounded-lg
                px-6 py-3 block shadow-xl hover:animate-text hover:font-bold hover:bg-gradient-to-r hover:from-teal-500 hover:via-tacao-300 hover:to-teal-500 hover:bg-clip-text hover:text-transparent"
                  onClick={handleReset}
                >
                  {`Send ${resetType === "username" ? "Username" : "Password"} Reset`}
                </button>
                {resetStatus && (
                  <p className={`${resetStatus === "success" ? "text-green-500" : "text-red-500"} mt-4`}>
                    {resetStatus === "success"
                      ? `Reset email sent successfully! Check your email.`
                      : `Error sending reset email. Please try again.`}
                  </p>
                )}
              </div>
              <div className="bg-teal-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-teal-600 transition duration-300 justify-center">
                Remember your details?{" "}
                <Link
                  className="pl-1.5 hover:animate-text hover:font-bold hover:bg-gradient-to-r hover:from-teal-500 hover:via-tacao-300 hover:to-teal-500 hover:bg-clip-text hover:text-transparent"
                  href={"/login"}
                >
                  Login.
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
