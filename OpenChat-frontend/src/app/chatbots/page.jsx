'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { Code, Download } from "lucide-react"

export default function ChatbotImplementationGuide() {
  const [apiKey, setApiKey] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleDownload = () => {
    if (apiKey) {
      const content = `'use client'

import React, { useState } from 'react'
import { MessageCircle, X, Send, User, Bot } from 'lucide-react'

export default function FloatingChatbot({ apiKey = "${apiKey}" }) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [chatHistory, setChatHistory] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    const userMessage = { role: 'user', content: query }
    setChatHistory(prev => [...prev, userMessage])

    try {
      const res = await fetch('http://127.0.0.1:5000/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, api_key: apiKey }),
      })

      const data = await res.json()
      const aiMessage = { role: 'ai', content: data.response }
      setChatHistory(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage = { role: 'ai', content: 'An error occurred. Please try again.' }
      setChatHistory(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      setQuery('')
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          className="rounded-full w-12 h-12 bg-black text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}
      {isOpen && (
        <div className="w-80 bg-white rounded-lg shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-100 to-rose-100 p-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">Chat with AI</h3>
            <button
              className="text-gray-600 hover:text-gray-800"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="h-[300px] overflow-y-auto p-4 bg-gray-50">
            {chatHistory.map((message, index) => (
              <div
                key={index}
                className={\`flex items-start mb-4 \${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }\`}
              >
                {message.role === 'ai' && (
                  <Bot className="w-8 h-8 rounded-full bg-indigo-100 p-1 mr-2 flex-shrink-0" />
                )}
                <div
                  className={\`p-3 rounded-lg max-w-[70%] \${
                    message.role === 'user'
                      ? 'bg-black text-white'
                      : 'bg-gray-200 text-gray-800'
                  }\`}
                >
                  {message.content}
                </div>
                {message.role === 'user' && (
                  <User className="w-8 h-8 rounded-full bg-rose-100 p-1 ml-2 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Ask a question..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="p-2 bg-gradient-to-r from-indigo-500 to-rose-500 text-white rounded-md hover:from-indigo-600 hover:to-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all duration-300"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-t-2 border-white rounded-full animate-spin"></div>
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}`

      const blob = new Blob([content], { type: 'text/javascript' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'FloatingChatbot.jsx'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      setIsDialogOpen(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-28 bg-gradient-to-r from-indigo-50 to-rose-50">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mb-6 bg-gradient-to-r from-indigo-500 to-rose-500 text-white shadow-md hover:from-indigo-600 hover:to-rose-600 transition-all">
            <Download className="mr-2 h-4 w-4" /> Download FloatingChatbot.jsx
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white">
          <DialogHeader >
            <DialogTitle>Enter API Key</DialogTitle>
            <DialogDescription>
              Please enter your API key to download the FloatingChatbot.jsx file.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="api-key" className="text-right">
                API Key
              </Label>
              <Input
                id="api-key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleDownload} disabled={!apiKey}>Download</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <h1 className="text-4xl font-bold mb-6 text-gray-800">Implementing a Chatbot on Your Website</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Introduction</h2>
        <p className="mb-4 text-gray-600">
          Implementing a chatbot on your website can greatly enhance user experience and provide instant support to your visitors. This guide will walk you through the process of adding a floating chatbot to your website using React and a custom chatbot API.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Floating Chatbot Component</h2>
        <p className="mb-4 text-gray-600">
          The FloatingChatbot component creates a chat interface that can be easily integrated into any React application. It includes features such as a collapsible chat window, message history, and API integration.
        </p>
        <Card className="shadow-lg border border-gray-200 rounded-lg">
          <CardHeader className="bg-gradient-to-r from-indigo-100 to-rose-100 p-4 rounded-t-lg">
            <CardTitle className="text-lg font-semibold text-gray-800">FloatingChatbot.jsx</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
              <code className="text-sm text-gray-800">
{`'use client'

import React, { useState } from 'react'
import { MessageCircle, X, Send, User, Bot } from 'lucide-react'

export default function FloatingChatbot({ apiKey = "${apiKey}" }) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [chatHistory, setChatHistory] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    const userMessage = { role: 'user', content: query }
    setChatHistory(prev => [...prev, userMessage])

    try {
      const res = await fetch('http://127.0.0.1:5000/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, api_key: apiKey }),
      })

      const data = await res.json()
      const aiMessage = { role: 'ai', content: data.response }
      setChatHistory(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage = { role: 'ai', content: 'An error occurred. Please try again.' }
      setChatHistory(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      setQuery('')
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          className="rounded-full w-12 h-12 bg-black text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}
      {isOpen && (
        <div className="w-80 bg-white rounded-lg shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-100 to-rose-100 p-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">Chat with AI</h3>
            <button
              className="text-gray-600 hover:text-gray-800"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="h-[300px] overflow-y-auto p-4 bg-gray-50">
            {chatHistory.map((message, index) => (
              <div
                key={index}
                className={\`flex items-start mb-4 \${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }\`}
              >
                {message.role === 'ai' && (
                  <Bot className="w-8 h-8 rounded-full bg-indigo-100 p-1 mr-2 flex-shrink-0" />
                )}
                <div
                  className={\`p-3 rounded-lg max-w-[70%] \${
                    message.role === 'user'
                      ? 'bg-black text-white'
                      : 'bg-gray-200 text-gray-800'
                  }\`}
                >
                  {message.content}
                </div>
                {message.role === 'user' && (
                  <User className="w-8 h-8 rounded-full bg-rose-100 p-1 ml-2 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Ask a question..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="p-2 bg-gradient-to-r from-indigo-500 to-rose-500 text-white rounded-md hover:from-indigo-600 hover:to-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all duration-300"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-t-2 border-white rounded-full animate-spin"></div>
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}`}
              </code>
            </pre>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Implementing the Chatbot</h2>
        <p className="mb-4 text-gray-600">
          To implement the floating chatbot on your website, follow these steps:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-gray-600">
          <li>Click the "Download FloatingChatbot.jsx" button at the top of this page and enter your API key.</li>
          <li>Save the downloaded file as <code className="bg-gray-200 px-1 rounded">FloatingChatbot.jsx</code> in your components folder.</li>
          <li>Import and use the FloatingChatbot component in your desired page or layout file.</li>
          <li>Ensure you have the required dependencies installed (react and lucide-react).</li>
          <li>Customize the styling and behavior as needed.</li>
        </ol>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Example Usage</h2>
        <p className="mb-4 text-gray-600">
          Here's an example of how to use the FloatingChatbot component in a page:
        </p>
        <Card className="shadow-lg border border-gray-200 rounded-lg">
          <CardHeader className="bg-gradient-to-r from-indigo-100 to-rose-100 p-4 rounded-t-lg">
            <CardTitle className="text-lg font-semibold text-gray-800">page.js</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
              <code className="text-sm text-gray-800">
{`import React from 'react';
import FloatingChatbot from '@/components/FloatingChatbot';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold p-8">Welcome to Our Website</h1>
      <p className="px-8">How can we help you today?</p>
      <FloatingChatbot apiKey="YOUR_API_KEY" />
    </div>
  );
};

export default HomePage;`}
              </code>
            </pre>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Additional Considerations</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>Ensure your chatbot API is secure and can handle the expected traffic.</li>
          <li>Implement error handling for API failures or timeouts.</li>
          <li>Consider adding features like typing indicators or message timestamps.</li>
          <li>Test thoroughly across different devices and browsers.</li>
          <li>Customize the chat interface to match your website's design.</li>
        </ul>
      </section>

      <footer className="text-center text-sm text-gray-600 mt-12 border-t border-gray-200 pt-4">
        <p>Created with ❤️ by the OpenChat Team</p>
      </footer>
    </div>
  )
}