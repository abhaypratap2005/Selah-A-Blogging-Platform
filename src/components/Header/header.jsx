import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Logo from '../Logo'
import LogoutBtn from './LogoutBtn'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'Your Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus }
  ]

  const handleNavigate = (slug) => {
    navigate(slug)
    setMenuOpen(false) // Close menu on navigation
  }

  return (
    <header className='sticky top-0 z-50 bg-gray-800 shadow-lg'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className='flex justify-between items-center py-3'>
          <div className='flex-shrink-0'>
            <Link to='/'>
              <Logo width='80px' textColor="text-gray-100" />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-3">
            {navItems.map((item) =>
              item.active ? (
                <button
                  key={item.name}
                  onClick={() => handleNavigate(item.slug)}
                  className={`px-5 py-2.5 rounded-xl font-medium transition-colors text-lg ${
                    window.location.pathname === item.slug 
                      ? 'bg-gray-700 text-gray-100' 
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {item.name}
                </button>
              ) : null
            )}
            {authStatus && <LogoutBtn />}
          </nav>

          {/* Hamburger Button */}
          <button 
            className="md:hidden text-gray-300" 
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="md:hidden flex flex-col space-y-2 pb-4">
            {navItems.map((item) =>
              item.active ? (
                <button
                  key={item.name}
                  onClick={() => handleNavigate(item.slug)}
                  className={`w-full text-left px-5 py-2.5 rounded-xl font-medium transition-colors text-lg ${
                    window.location.pathname === item.slug
                      ? 'bg-gray-700 text-gray-100'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {item.name}
                </button>
              ) : null
            )}
            {authStatus && <LogoutBtn />}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
