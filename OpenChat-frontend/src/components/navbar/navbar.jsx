'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <nav className="bg-gradient-to-r from-indigo-100 via-rose-100 to-indigo-50 shadow-lg fixed w-full top-0 left-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-3xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-rose-500">
                OpenChat
              </span>
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-8">
            <NavLink href="/builder">Pipeline Builder</NavLink>
            <NavLink href="/testing">Playground</NavLink>
            <NavLink href="/chatbots">Integration</NavLink>
            <NavLink href="/documentation">Docs</NavLink>
            <Button className="bg-gradient-to-r from-indigo-500 to-rose-500 text-white shadow-lg hover:from-indigo-600 hover:to-rose-600 transition-all">
              Create Your Bot
            </Button>
          </div>
          <div className="flex items-center sm:hidden">
            <Button variant="ghost" onClick={toggleMenu} className="text-indigo-700 hover:text-indigo-900">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-gradient-to-r from-indigo-100 via-rose-100 to-indigo-50 border-t border-gray-200 shadow-lg">
          <div className="pt-2 pb-3 space-y-2">
            <MobileNavLink href="#features" onClick={toggleMenu}>Features</MobileNavLink>
            <MobileNavLink href="#how-it-works" onClick={toggleMenu}>How It Works</MobileNavLink>
            <MobileNavLink href="#contribute" onClick={toggleMenu}>Contribute</MobileNavLink>
            <MobileNavLink href="/docs" onClick={toggleMenu}>Documentation</MobileNavLink>
            <div className="px-4 pt-2">
              <Button className="w-full bg-gradient-to-r from-indigo-500 to-rose-500 text-white shadow-md hover:from-indigo-600 hover:to-rose-600 transition-all">
                Create Your Bot
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

function NavLink({ href, children }) {
  return (
    <Link 
      href={href} 
      className="text-gray-700 hover:text-gray-900 px-3 py-2 text-lg font-medium transition-colors duration-200"
    >
      {children}
    </Link>
  )
}

function MobileNavLink({ href, onClick, children }) {
  return (
    <Link 
      href={href} 
      className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-lg font-medium transition-colors duration-200"
      onClick={onClick}
    >
      {children}
    </Link>
  )
}
