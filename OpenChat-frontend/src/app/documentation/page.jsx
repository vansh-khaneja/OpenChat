'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CopyIcon } from 'lucide-react'

export default function DocumentationPage() {
  const [copiedTab, setCopiedTab] = useState(null)

  const copyToClipboard = (text, tab) => {
    navigator.clipboard.writeText(text)
    setCopiedTab(tab)
    setTimeout(() => setCopiedTab(null), 2000)
  }

  const CodeBlock = ({ code, language, tab }) => (
    <div className="relative bg-gray-50 p-4 rounded-lg shadow-sm">
      <pre className={`language-${language} overflow-x-auto`}>
        <code>{code}</code>
      </pre>
      <Button
        variant="outline"
        size="sm"
        className="absolute top-2 right-2 bg-indigo-100 hover:bg-indigo-200 transition-all"
        onClick={() => copyToClipboard(code, tab)}
      >
        {copiedTab === tab ? 'Copied!' : <CopyIcon className="h-4 w-4 text-indigo-500" />}
      </Button>
    </div>
  )

  return (
    <div className="container mx-auto px-6 py-28 bg-gradient-to-r from-indigo-50 to-rose-50">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">AI Chatbot API Documentation</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Introduction</h2>
        <p className="mb-4 text-gray-600">
          Welcome to the AI Chatbot API documentation. This API allows you to integrate our advanced AI chatbot into your applications with ease. By sending a simple POST request with your API key and the user's query, you can receive intelligent responses from our AI.
        </p>
        <p className="mb-4 text-gray-600">
          To get started, you'll need an API key. If you haven't obtained one yet, please sign up on our platform to receive your unique API key.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">API Endpoint</h2>
        <Card>
          <CardHeader className="bg-gradient-to-r from-indigo-100 to-rose-100 p-4 rounded-t-lg">
            <CardTitle className="text-lg font-semibold text-gray-800">POST Request URL</CardTitle>
            <CardDescription className="text-gray-600">Send your requests to this endpoint:</CardDescription>
          </CardHeader>
          <CardContent>
            <code className="bg-gray-100 p-2 rounded-lg text-gray-800">http://127.0.0.1:5000/query</code>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Request Format</h2>
        <p className="mb-4 text-gray-600">
          Your POST request should include a JSON body with the following structure:
        </p>
        <CodeBlock
          code={`{
  "query": "Your user's question goes here",
  "api_key": "Your_API_Key_Here"
}`}
          language="json"
          tab="request"
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Implementation Examples</h2>
        <Tabs defaultValue="html">
          <TabsList className="mb-4">
            <TabsTrigger value="html">HTML/JavaScript</TabsTrigger>
            <TabsTrigger value="nextjs">Next.js</TabsTrigger>
            <TabsTrigger value="python">Python</TabsTrigger>
          </TabsList>
          <TabsContent value="html">
            <Card>
              <CardHeader className="bg-gradient-to-r from-indigo-100 to-rose-100 p-4 rounded-t-lg">
                <CardTitle className="text-lg font-semibold text-gray-800">HTML/JavaScript Example</CardTitle>
                <CardDescription className="text-gray-600">Using fetch API in vanilla JavaScript</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  code={`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Chatbot Demo</title>
</head>
<body>
    <h1>AI Chatbot Demo</h1>
    <input type="text" id="userInput" placeholder="Ask a question...">
    <button onclick="sendQuery()">Send</button>
    <div id="response"></div>

    <script>
        async function sendQuery() {
            const userInput = document.getElementById('userInput').value;
            const apiKey = 'Your_API_Key_Here';

            try {
                const response = await fetch('http://127.0.0.1:5000/query', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: userInput,
                        api_key: apiKey
                    })
                });

                const data = await response.json();
                document.getElementById('response').innerText = data.response;
            } catch (error) {
                console.error('Error:', error);
                document.getElementById('response').innerText = 'An error occurred';
            }
        }
    </script>
</body>
</html>`}
                  language="html"
                  tab="html"
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="nextjs">
            <Card>
              <CardHeader className="bg-gradient-to-r from-indigo-100 to-rose-100 p-4 rounded-t-lg">
                <CardTitle className="text-lg font-semibold text-gray-800">Next.js Example</CardTitle>
                <CardDescription className="text-gray-600">Using API routes and React hooks</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  code={`// pages/api/chat.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { query, api_key } = req.body;

    try {
      const response = await fetch('http://127.0.0.1:5000/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, api_key }),
      });

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(\`Method \${req.method} Not Allowed\`);
  }
}

// pages/index.js
import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiKey = 'Your_API_Key_Here';

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, api_key: apiKey }),
      });

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error('Error:', error);
      setResponse('An error occurred');
    }
  };

  return (
    <div>
      <h1>AI Chatbot Demo</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a question..."
        />
        <button type="submit">Send</button>
      </form>
      {response && <p>{response}</p>}
    </div>
  );
}`}
                  language="jsx"
                  tab="nextjs"
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="python">
            <Card>
              <CardHeader className="bg-gradient-to-r from-indigo-100 to-rose-100 p-4 rounded-t-lg">
                <CardTitle className="text-lg font-semibold text-gray-800">Python Example</CardTitle>
                <CardDescription className="text-gray-600">Using the requests library</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  code={`import requests

def send_query(query, api_key):
    url = 'http://127.0.0.1:5000/query'
    payload = {
        'query': query,
        'api_key': api_key
    }

    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()  # Raise an exception for bad status codes
        data = response.json()
        return data['response']
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
        return None

# Example usage
api_key = 'Your_API_Key_Here'
user_query = 'What is the capital of France?'

bot_response = send_query(user_query, api_key)
if bot_response:
    print(f"Bot: {bot_response}")
else:
    print("Failed to get a response from the chatbot.")`}
                  language="python"
                  tab="python"
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Response Format</h2>
        <p className="mb-4 text-gray-600">
          The API will respond with a JSON object containing the AI's response:
        </p>
        <CodeBlock
          code={`{
  "response": "The AI-generated response to the user's query"
}`}
          language="json"
          tab="response"
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Error Handling</h2>
        <p className="mb-4 text-gray-600">
          In case of an error, the API will return an appropriate HTTP status code along with a JSON object containing an error message:
        </p>
        <CodeBlock
          code={`{
  "error": "Description of the error"
}`}
          language="json"
          tab="error"
        />
        <p className="mt-4 text-gray-600">
          Common error codes:
        </p>
        <ul className="list-disc list-inside ml-4 text-gray-600">
          <li>400 Bad Request - Invalid input or missing required fields</li>
          <li>401 Unauthorized - Invalid or missing API key</li>
          <li>429 Too Many Requests - Rate limit exceeded</li>
          <li>500 Internal Server Error - Unexpected server error</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Rate Limiting</h2>
        <p className="mb-4 text-gray-600">
          To ensure fair usage and maintain service quality, we implement rate limiting on our API. The current limits are:
        </p>
        <ul className="list-disc list-inside ml-4 text-gray-600">
          <li>100 requests per minute per API key</li>
          <li>5000 requests per day per API key</li>
        </ul>
        <p className="mt-4 text-gray-600">
          If you exceed these limits, you'll receive a 429 Too Many Requests response. Please contact our support team if you need higher limits for your use case.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Best Practices</h2>
        <ul className="list-disc list-inside ml-4 text-gray-600">
          <li>Always use HTTPS to ensure secure communication with our API.</li>
          <li>Implement proper error handling in your application to gracefully manage API errors.</li>
          <li>Cache responses when appropriate to reduce unnecessary API calls.</li>
          <li>Respect the rate limits to ensure uninterrupted service.</li>
          <li>Keep your API key secure and never expose it in client-side code.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Testing the API</h2>
        <p className="mb-4 text-gray-600">
          To test the API and see it in action, visit our interactive API testing page:
        </p>
        <Button asChild>
          <a href="/testing" target="_blank" rel="noopener noreferrer" className="text-indigo-600 bg-indigo-300 hover:text-indigo-800">Go to API Testing Page</a>
        </Button>
      </section>
    </div>
  )
}
