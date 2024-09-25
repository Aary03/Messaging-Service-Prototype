"use client"; 
import { useState, useEffect, useRef } from 'react'
import io from 'socket.io-client'

const Chat = ({ user, room }) => {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const socketRef = useRef()
  const messagesEndRef = useRef(null)

  useEffect(() => {
    socketRef.current = io('http://localhost:5001')
    socketRef.current.emit('join', room)

    socketRef.current.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message])
    })

    fetchMessages()

    return () => socketRef.current.disconnect()
  }, [room])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const fetchMessages = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/messages/${room}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setMessages(data.reverse())
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error)
    }
  }

  const sendMessage = (e) => {
    e.preventDefault()
    if (inputMessage) {
      const messageData = {
        sender: user.userId,
        content: inputMessage,
        room: room
      }
      socketRef.current.emit('sendMessage', messageData)
      setInputMessage('')
    }
  }

  return (
    <div className="mt-4">
      <div className="border rounded p-4 h-96 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 ${message.sender === user.userId ? 'text-right' : ''}`}>
            <span className="font-bold">{message.sender === user.userId ? 'You' : message.sender}: </span>
            {message.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} className="mt-4">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="border rounded px-2 py-1 w-full"
          placeholder="Type a message..."
        />
        <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Send</button>
      </form>
    </div>
  )
}

export default Chat