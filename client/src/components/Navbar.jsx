import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiSearch, FiMenu, FiX, FiBell, FiChevronDown } from 'react-icons/fi';
import logo from "../assets/logo.png"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isDashboard = location.pathname.includes('/dashboard');

  const isLinkActive = (path) => {
    if (path === '/') return location.pathname === '/' && !location.hash;
    if (path.startsWith('/#')) {
      return location.pathname === '/' && location.hash === path.substring(1);
    }
    return location.pathname === path;
  };
  
  // Use localStorage to determine login state. For a real app, use Context.
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location]);

  return (
    <nav className={`w-full border-b border-[var(--border)] bg-[var(--surface)] ${isDashboard ? '' : 'sticky top-0 z-50'}`}>
      <div className={`${isDashboard ? 'w-full' : 'max-w-[var(--container-width)]'} mx-auto px-4 sm:px-6 lg:px-8`}>
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="CareerLens Logo" className="h-16 md:h-20 w-auto object-contain" />
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-8">
            {!isLoggedIn ? (
              <>
                <Link to="/" className={`font-medium text-sm transition-colors ${isLinkActive('/') ? 'text-[var(--primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--primary)]'}`}>Home</Link>
                <Link to="/#how-it-works" className={`font-medium text-sm transition-colors ${isLinkActive('/#how-it-works') ? 'text-[var(--primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--primary)]'}`}>How It Works</Link>
                <Link to="/#features" className={`font-medium text-sm transition-colors ${isLinkActive('/#features') ? 'text-[var(--primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--primary)]'}`}>Features</Link>
                <Link to="/about" className={`font-medium text-sm transition-colors ${isLinkActive('/about') ? 'text-[var(--primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--primary)]'}`}>About Us</Link>
                <Link to="/contact" className={`font-medium text-sm transition-colors ${isLinkActive('/contact') ? 'text-[var(--primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--primary)]'}`}>Contact</Link>
              </>
            ) : (
              !isDashboard && (
                <Link to="/dashboard" className="text-[var(--primary)] font-medium text-sm hover:underline">Go to Dashboard</Link>
              )
            )}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="text-[var(--text-primary)] font-medium text-sm px-4 py-2 hover:bg-[var(--background)] rounded-full transition-colors">Sign In</Link>
                <Link to="/register" className="bg-[var(--primary)] text-white font-medium text-sm px-6 py-2.5 rounded-[var(--radius-full)] hover:bg-[var(--primary-hover)] transition-colors shadow-[var(--shadow-sm)]">Get Started</Link>
              </>
            ) : (
              <div className="flex items-center gap-2 md:gap-6">
                {isDashboard && <span className="hidden md:block font-bold text-lg mr-4">Overview</span>}
                <button className="text-gray-400 hover:text-blue-600 transition-colors p-2 rounded-full hover:bg-gray-100">
                  <FiBell className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-3 cursor-pointer py-1 px-2 rounded-full hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-sm">
                    OD
                  </div>
                  <span className="font-semibold text-sm hidden md:block text-[var(--text-primary)]">Om Dwivedi</span>
                  <FiChevronDown className="w-4 h-4 text-gray-500 hidden md:block" />
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] focus:outline-none"
            >
              {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[var(--surface)] border-t border-[var(--border)] shadow-[var(--shadow-md)]">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {!isLoggedIn ? (
              <>
                <Link to="/" onClick={() => setIsOpen(false)} className={`block px-3 py-2 rounded-md text-base font-medium ${isLinkActive('/') ? 'text-[var(--primary)] bg-[var(--primary-light)]' : 'text-[var(--text-secondary)] hover:bg-[var(--background)]'}`}>Home</Link>
                <Link to="/#how-it-works" onClick={() => setIsOpen(false)} className={`block px-3 py-2 rounded-md text-base font-medium ${isLinkActive('/#how-it-works') ? 'text-[var(--primary)] bg-[var(--primary-light)]' : 'text-[var(--text-secondary)] hover:bg-[var(--background)]'}`}>How It Works</Link>
                <Link to="/#features" onClick={() => setIsOpen(false)} className={`block px-3 py-2 rounded-md text-base font-medium ${isLinkActive('/#features') ? 'text-[var(--primary)] bg-[var(--primary-light)]' : 'text-[var(--text-secondary)] hover:bg-[var(--background)]'}`}>Features</Link>
                <Link to="/about" onClick={() => setIsOpen(false)} className={`block px-3 py-2 rounded-md text-base font-medium ${isLinkActive('/about') ? 'text-[var(--primary)] bg-[var(--primary-light)]' : 'text-[var(--text-secondary)] hover:bg-[var(--background)]'}`}>About Us</Link>
                <Link to="/contact" onClick={() => setIsOpen(false)} className={`block px-3 py-2 rounded-md text-base font-medium ${isLinkActive('/contact') ? 'text-[var(--primary)] bg-[var(--primary-light)]' : 'text-[var(--text-secondary)] hover:bg-[var(--background)]'}`}>Contact</Link>
                <div className="mt-4 pt-4 border-t border-[var(--border)] flex flex-col space-y-3">
                  <Link to="/login" onClick={() => setIsOpen(false)} className="block w-full text-center px-4 py-2 border border-[var(--border)] rounded-md font-medium text-[var(--text-primary)]">Sign In</Link>
                  <Link to="/register" onClick={() => setIsOpen(false)} className="block w-full text-center px-4 py-2 bg-[var(--primary)] text-white rounded-md font-medium shadow-[var(--shadow-sm)]">Get Started</Link>
                </div>
              </>
            ) : (
              <>
                {!isDashboard && <Link to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-[var(--primary)] bg-[var(--primary-light)]">Dashboard</Link>}
                <div className="mt-4 pt-4 border-t border-[var(--border)] flex flex-col space-y-3 px-3">
                  <div className="flex items-center gap-3 py-2">
                    <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-sm">
                      OD
                    </div>
                    <span className="font-medium text-[var(--text-primary)]">Om Dwivedi</span>
                  </div>
                  <button className="text-left px-3 py-2 text-[var(--text-secondary)] hover:bg-[var(--background)] rounded-md">Notifications</button>
                  <button className="text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-md" onClick={() => {
                    localStorage.removeItem('token');
                    setIsLoggedIn(false);
                    navigate('/login');
                  }}>Sign Out</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;