'use client'
import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { Send, Loader2, MessageSquare, Settings, HelpCircle, Key, User, Bot } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const defaultApiKey = '16e22a5351e10611'

const FullPageChatbotWithApiKey = () => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [isChatStarted, setIsChatStarted] = useState(false)
  const scrollAreaRef = useRef(null)

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const startChat = (e) => {
    e.preventDefault()
    if (apiKey.trim()) {
      setIsChatStarted(true)
    }
  }

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { id: Date.now(), content: input, isUser: true }
    const loadingMessage = { id: Date.now() + 1, content: '', isUser: false, isLoading: true }
    setMessages((prev) => [...prev, userMessage, loadingMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await axios.post('http://127.0.0.1:5000/query', {
        query: input,
        api_key: apiKey || defaultApiKey
      })

      setMessages((prev) => 
        prev.map((msg) => 
          msg.id === loadingMessage.id 
            ? { ...msg, content: response.data.response, isLoading: false } 
            : msg
        )
      )
    } catch (error) {
      console.error('Error sending message:', error)
      setMessages((prev) => 
        prev.map((msg) => 
          msg.id === loadingMessage.id 
            ? { ...msg, content: 'Sorry, I encountered an error. Please try again.', isLoading: false } 
            : msg
        )
      )
    } finally {
      setIsLoading(false)
    }
  }

  if (!isChatStarted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-indigo-50 via-white to-rose-50">
        <div className="w-[500px] bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-100 to-rose-100 p-6 rounded-t-lg">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-rose-500">Welcome to Playgroud</h2>
            <p className="text-gray-600 text-lg">Enter your API key to start chatting</p>
          </div>
          <div className="p-6">
            <form onSubmit={startChat}>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter your API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-indigo-500"
                />
                <button type="submit" className="w-full bg-gradient-to-r from-indigo-500 to-rose-500 text-white p-3 rounded-md hover:from-indigo-600 hover:to-rose-600 transform hover:scale-105 transition-all duration-300 shadow-md">
                  Start Chat
                </button>
              </div>
            </form>
          </div>
          <div className="bg-gray-50 p-4 text-center rounded-b-lg">
            <p className="text-sm text-gray-600">
              Don't have an API key? A default key will be used.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gradient-to-b from-indigo-50 via-white to-rose-50 pt-14">
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
          <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-100">
            <h1 className="text-lg font-semibold text-gray-800">OpenChat</h1>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 py-2 space-y-1">
              {[
                { icon: MessageSquare, text: 'Chats' },
                { icon: Settings, text: 'Settings' },
                { icon: HelpCircle, text: 'Help' },
                { icon: Key, text: `API Key: ${apiKey ? '****' + apiKey.slice(-4) : 'Default'}` },
              ].map((item, index) => (
                <button key={index} className="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 w-full">
                  <item.icon className="mr-3 h-6 w-6" />
                  {item.text}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 md:pl-64">
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-3xl mx-auto px-6 sm:px-6 md:px-8">
              <div className="bg-white shadow-lg rounded-lg flex flex-col h-[calc(90vh-2rem)] border border-gray-200">
                <div className="px-4 py-3 border-b bg-gray-100">
                  <h2 className="text-lg font-semibold text-gray-800 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-rose-500">Chat with AI</h2>
                </div>

                <div className="flex-1 p-2 overflow-y-auto" ref={scrollAreaRef}>
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start mb-2 ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      {!message.isUser && (
                        <Bot className="w-8 h-8 rounded-full bg-indigo-100 p-1 mr-2 flex-shrink-0" />
                      )}
                      <div
                        className={`inline-block p-3 rounded-lg ${
                          message.isUser
                            ? 'bg-indigo-100 text-gray-800'
                            : 'bg-gray-200 text-gray-800'
                        } max-w-[70%]`}
                      >
                        {message.content}
                      </div>
                      {message.isUser && (
                        <User className="w-8 h-8 rounded-full bg-rose-100 p-1 ml-2 flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </div>

                <div className="border-t p-2 bg-gray-50">
                  <form onSubmit={sendMessage} className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      disabled={isLoading}
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="p-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      {isLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Send className="h-5 w-5" />
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
export default FullPageChatbotWithApiKey