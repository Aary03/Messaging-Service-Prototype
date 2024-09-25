"use client";
import { useState } from 'react'

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('') // Reset error message
    try {
      const response = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      })
      if (response.ok) {
        onRegister()
      } else {
        const errorData = await response.json()
        setErrorMessage(errorData.message || 'Registration failed')
      }
    } catch (error) {
      console.error('Registration error:', error)
      setErrorMessage('Registration error. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
        className="block w-full px-4 py-2 mt-2 border rounded-md text-gray-900 bg-white"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="block w-full px-4 py-2 mt-2 border rounded-md text-gray-900 bg-white"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="block w-full px-4 py-2 mt-2 border rounded-md text-gray-900 bg-white"
      />
      {errorMessage && (
        <p className="mt-2 text-red-500">{errorMessage}</p>
      )}
      <button
        type="submit"
        className="mt-4 w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        Register
      </button>
    </form>
  )
}

export default Register