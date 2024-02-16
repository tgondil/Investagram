import Image from "next/image";
import "./style.css";

export default function Home() {
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
            <div class="transition mb-4 w-full delay-2000 animate-intro-unhide">
              <label
                class="block text-tacao-300 text-sm font-light mb-2"
                for="username"
              >
                Username
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
              />
            </div>
            <div class="mb-4 w-full animate-intro-unhide">
              <label
                class="block text-tacao-300 text-sm font-light mb-2"
                for="username"
              >
                Password
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
              />
              <h1 className="text-xl font-poppins font-normal flex items-center justify-center pt-8">
                Don't have an account? Sign up.
              </h1>
            </div>
          </div>
        </div>
        
      </main>
    </>
  );
}
