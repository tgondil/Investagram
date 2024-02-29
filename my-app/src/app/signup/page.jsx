import React from "react";
import Link from "next/link";

export default function SignUp() {
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
              class="block text-tacao-300 text-sm font-light mb-2"
              for="username"
            >
              Email
            </label>
            <input
              class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Email"
            />
          </div>
          <div>
            <label
              class="block text-tacao-300 text-sm font-light mb-2"
              for="username"
            >
              Username
            </label>
            <input
              class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div>
            <label
              class="block text-tacao-300 text-sm font-light mb-2"
              for="username"
            >
              Password
            </label>
            <input
              class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="password"
              placeholder="Password"
            />
            <button class="mt-3 text-lg mt-8 font-semibold 
                bg-tacao-300 w-full text-white rounded-lg
                px-6 py-3 block shadow-xl hover:animate-text hover:font-bold hover:bg-gradient-to-r hover:from-teal-500 hover:via-tacao-300 hover:to-teal-500 hover:bg-clip-text hover:text-transparent">
               Sign Up
              </button>
          </div>
          <h1 className="text-xl font-poppins font-normal flex items-center justify-center">
                Already have an account?  <Link className="pl-1.5 hover:animate-text hover:font-bold hover:bg-gradient-to-r hover:from-teal-500 hover:via-tacao-300 hover:to-teal-500 hover:bg-clip-text hover:text-transparent" href={"/login"}>Login.</Link>
              </h1>
        </div>
      </main>
    </>
  );
}
