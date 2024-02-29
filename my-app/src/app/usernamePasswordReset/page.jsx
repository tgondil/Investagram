import Link from "next/link";

export default function Reset() {
  return (
    <>
      <main className="flex min-h-screen flex-col bg-shark-950 items-center justify-center">
        <div className="flex flex-col text-tacao-300 items-center justify-center gap-12">
          <div className="text-8xl font-poppins font-semibold animate-intro-slide flex flex-col items-center justify-center">
            <h1 className="h-[7rem] sm:h-[7rem] text-8xl font-poppins font-semibold animate-intro-slide animate-text bg-gradient-to-r from-teal-500 via-tacao-300 to-teal-500 bg-clip-text text-transparent">
              Investagram
            </h1>
            <h1 className="animate-intro-unhide text-xl animate-text bg-gradient-to-r from-teal-500 via-tacao-300 to-teal-500 bg-clip-text text-transparent">
              Reset Your Account
            </h1>
          </div>
          
          <div className="w-10/12 delay-5000 animate-intro-unhide">
            <div className="flex items-center justify-center">
              <h1 className="text-3xl font-poppins font-light">
                Reset Username or Password
              </h1>
            </div>
            {/* Username Reset */}
            <div class="transition mb-4 w-full delay-2000 animate-intro-unhide">
              <label
                class="block text-tacao-300 text-sm font-light mb-2"
                for="username"
              >
                Enter Your Email
              </label>
              <input
                class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Your Email Address"
              />
            </div>
            {/* Password Reset */}
            <div class="mb-4 w-full animate-intro-unhide">
              <label
                class="block text-tacao-300 text-sm font-light mb-2"
                for="password"
              >
                New Password
              </label>
              <input
                class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="New Password"
              />
            </div>
            <button class="mt-3 text-lg mt-8 font-semibold 
                bg-tacao-300 w-full text-white rounded-lg
                px-6 py-3 block shadow-xl hover:animate-text hover:font-bold hover:bg-gradient-to-r hover:from-teal-500 hover:via-tacao-300 hover:to-teal-500 hover:bg-clip-text hover:text-transparent">
              Reset Account
            </button>
            <h1 className="text-xl font-poppins font-normal flex items-center justify-center pt-6">
              Remember your details? <Link className="pl-1.5 hover:animate-text hover:font-bold hover:bg-gradient-to-r hover:from-teal-500 hover:via-tacao-300 hover:to-teal-500 hover:bg-clip-text hover:text-transparent" href={"/login"}>Login.</Link>
            </h1>
          </div>
        </div>
        
      </main>
    </>
  );
}
