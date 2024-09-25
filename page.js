"use client";
import { useState } from 'react';
import Login from '@/component/login';
import Register from '@/component/register';
import Chat from '@/component/chat';

export default function Home() {
  // Set the default page to 'register' or 'login' based on your preference
  const [currentPage, setCurrentPage] = useState('login'); // Change to 'login' if needed
  const [user, setUser] = useState(null);

  const handleLogin = (data) => {
    setUser(data);
    setCurrentPage('chat'); // Switch to chat page upon successful login
  };

  const handleRegister = (data) => {
    setUser(data);
    setCurrentPage('chat'); // Switch to chat page upon successful registration
  };

  // Debug: Log current page to ensure state is changing
  console.log("Current Page:", currentPage);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900">
          Messaging-Service
        </h2>
        <p className="mt-2 text-center text-gray-500">Welcome to our secure chat platform</p>
        <div className="mt-8 bg-white py-8 px-8 shadow-lg rounded-lg sm:px-10">

          {/* Navigation Buttons */}
          <nav className="flex justify-between mb-8">
            <button
              type="button" // Ensure button type is set to prevent unintended behavior
              onClick={() => {
                setCurrentPage('login'); // Switch to login
                console.log('Login button clicked'); // Debug log
              }}
              className={`px-4 py-2 rounded-md font-medium text-sm ${
                currentPage === 'login'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              } hover:bg-blue-500 hover:text-white transition-all`}
            >
              Login
            </button>
            <button
              type="button" // Ensure button type is set to prevent unintended behavior
              onClick={() => {
                setCurrentPage('register'); // Switch to register
                console.log('Register button clicked'); // Debug log
              }}
              className={`px-4 py-2 rounded-md font-medium text-sm ${
                currentPage === 'register'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              } hover:bg-blue-500 hover:text-white transition-all`}
            >
              Register
            </button>
            {user && (
              <button
                type="button" // Ensure button type is set to prevent unintended behavior
                onClick={() => setCurrentPage('chat')} // Switch to chat if user is logged in
                className={`px-4 py-2 rounded-md font-medium text-sm ${
                  currentPage === 'chat'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                } hover:bg-blue-500 hover:text-white transition-all`}
              >
                Chat
              </button>
            )}
          </nav>

          {/* Conditional Rendering of Pages */}
          <main>
            {currentPage === 'login' && <Login onLogin={handleLogin} />}
            {currentPage === 'register' && <Register onRegister={handleRegister} />}
            {currentPage === 'chat' && user && <Chat user={user} />}
          </main>
        </div>
      </div>
    </div>
  );
}
