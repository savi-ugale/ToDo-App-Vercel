// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Fetch user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    // Check if email and password match
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      setIsAuthenticated(true); // Set authenticated state
      localStorage.setItem('user', JSON.stringify(storedUser)); // Optionally save user again to confirm
      navigate('/todos'); // Redirect to Todo page
    } else {
      setError('Invalid credentials, please try again!');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[rgb(162,156,204)]">
      {/* Logo at the top */}
      <div className="flex justify-center mb-8">
        <img
          src="\src\assets\iconPromax.svg" // Replace with your logo file path
          alt="Logo"
          className="w-40 h-40 object-contain" // Adjust the size here
        />
      </div>

      {/* Login Form Container */}
      <div className="bg-purple-200 p-10 rounded-lg shadow-md w-full max-w-lg h-[60vh]">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-500 text-white rounded-md shadow-md hover:bg-purple-700 transition"
          >
            Login
          </button>
        </form>

        {/* Sign Up Button */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-700">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-blue-600 hover:underline font-medium"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
