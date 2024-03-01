import { useState } from 'react';
import Link from 'next/link';

export default function Reset() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async () => {
    try {
      const response = await fetch('YOUR_SERVER_URL/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword: password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.error || 'An error occurred.');
      }
    } catch (error) {
      console.error('Error during reset:', error);
      setMessage('An unexpected error occurred.');
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
            <div className="transition mb-4 w-full delay-2000 animate-intro-unhide">
              <label className="block text-tacao-300 text-sm font-light mb-2" htmlFor="email">
                Enter Your Email
              </label>
              <input
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* Password Reset */}
            <div className="mb-4 w-full animate-intro-unhide">
              <label className="block text-tacao-300 text-sm font-light mb-2" htmlFor="password">
                New Password
              </label>
              <input
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              onClick={handleReset}
              className="mt-3 text-lg mt-8 font-semibold 
                bg-tacao-300 w-full text-white rounded-lg
                px-6 py-3 block shadow-xl hover:animate-text hover:font-bold hover:bg-gradient-to-r hover:from-teal-500 hover:via-tacao-300 hover:to-teal-500 hover:bg-clip-text hover:text-transparent"
            >
              Reset Account
            </button>
            <h1 className="text-xl font-poppins font-normal flex items-center justify-center pt-6">
              {message && <span className="text-red-500">{message}</span>}
            </h1>
            <h1 className="text-xl font-poppins font-normal flex items-center justify-center pt-6">
              Remember your details?{' '}
              <Link
                className="pl-1.5 hover:animate-text hover:font-bold hover:bg-gradient-to-r hover:from-teal-500 hover:via-tacao-300 hover:to-teal-500 hover:bg-clip-text hover:text-transparent"
                href={'/login'}
              >
                Login.
              </Link>
            </h1>
          </div>
        </div>
      </main>
    </>
  );
}
