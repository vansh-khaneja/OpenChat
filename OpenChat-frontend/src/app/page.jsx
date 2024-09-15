'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BotIcon, CodeIcon, DollarSignIcon, ZapIcon, ChevronDownIcon } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const router = useRouter()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavigate = () => {
    router.push('/builder')
  }

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-rose-50 text-gray-800 overflow-hidden">

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center px-4 overflow-hidden">
        <div className="relative z-10 text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-rose-500">
            Create Your AI Customer Support Chatbot
          </h1>
          <p className="mb-10 text-xl text-gray-600 max-w-2xl mx-auto">
            Build, customize, and deploy AI-powered chatbots without any AI expertise
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-indigo-500 to-rose-500 text-white hover:from-indigo-600 hover:to-rose-600 transform hover:scale-105 transition-all duration-300 shadow-lg font-semibold text-2xl"
            onClick={handleNavigate}
          >
            Get Started
          </Button>
        </div>
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20"></div>
        </div>
        <div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
          onClick={scrollToFeatures}
        >
          <ChevronDownIcon className="w-10 h-10 text-indigo-400 hover:text-indigo-600 transition-colors" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 py-24 bg-white">
        <h2 className="mb-16 text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-rose-500">
          Why Choose Our Platform?
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
          {[
            { title: "Easy to Use", icon: BotIcon, description: "No AI knowledge required" },
            { title: "Customizable", icon: CodeIcon, description: "Tailor your chatbot to your needs" },
            { title: "Cost-Effective", icon: DollarSignIcon, description: "Pay only for what you use" },
            { title: "Fast Integration", icon: ZapIcon, description: "Quick setup with API keys" },
          ].map((feature, index) => (
            <Card key={index} className="bg-gradient-to-br from-white to-indigo-50 border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardHeader>
                <feature.icon className="w-12 h-12 mb-4 text-indigo-500" />
                <CardTitle className="text-xl font-semibold text-gray-800">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 py-24 bg-gradient-to-br from-indigo-50 to-rose-50">
        <h2 className="mb-16 text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-rose-500">
          How It Works
        </h2>
        <div className="max-w-4xl mx-auto space-y-12">
          {[
            { step: 1, title: "Sign Up", description: "Create an account and choose your plan" },
            { step: 2, title: "Customize", description: "Configure your chatbot's knowledge base and behavior" },
            { step: 3, title: "Integrate", description: "Use our API key to add the chatbot to your website" },
            { step: 4, title: "Launch", description: "Your AI customer support is now live!" },
          ].map((step, index) => (
            <div key={index} className="flex items-center space-x-6 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-center w-16 h-16 text-2xl font-bold text-white bg-gradient-to-r from-indigo-500 to-rose-500 rounded-full shadow-lg">
                {step.step}
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="px-4 py-32 text-center bg-gradient-to-r from-indigo-100 to-rose-100 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="mb-6 text-4xl font-bold text-gray-800">Ready to Revolutionize Your Customer Support?</h2>
          <p className="mb-10 text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of businesses already using our AI chatbots to improve customer satisfaction.
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-indigo-500 to-rose-500 text-white hover:from-indigo-600 hover:to-rose-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
            onClick={handleNavigate}
          >
            Start Building Your Chatbot
          </Button>
        </div>
        <div 
          className="absolute inset-0 z-0 bg-[url('/particles.svg')] bg-repeat opacity-10"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />
      </section>
    </div>
  )
}