import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiMenu, FiX } from 'react-icons/fi';
import logo from "../assets/logo.png"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full border-b border-[var(--border)] bg-[var(--surface)] sticky top-0 z-50">
      <div className="max-w-[var(--container-width)] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="CareerLens Logo" className="h-16 md:h-20 w-auto object-contain" />
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-8">
              <Link to="/" className="text-[var(--primary)] font-medium text-sm">Home</Link>
              <Link to="#how-it-works" className="text-[var(--text-secondary)] hover:text-[var(--primary)] font-medium text-sm transition-colors">How It Works</Link>
              <Link to="#features" className="text-[var(--text-secondary)] hover:text-[var(--primary)] font-medium text-sm transition-colors">Features</Link>
              <Link to="#about" className="text-[var(--text-secondary)] hover:text-[var(--primary)] font-medium text-sm transition-colors">About</Link>
              <Link to="#contact" className="text-[var(--text-secondary)] hover:text-[var(--primary)] font-medium text-sm transition-colors">Contact</Link>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="text-[var(--text-primary)] font-medium text-sm px-4 py-2 hover:bg-[var(--background)] rounded-full transition-colors">Sign In</Link>
            <Link to="/register" className="bg-[var(--primary)] text-white font-medium text-sm px-6 py-2.5 rounded-[var(--radius-full)] hover:bg-[var(--primary-hover)] transition-colors shadow-[var(--shadow-sm)]">Get Started</Link>
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
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-[var(--primary)] bg-[var(--primary-light)]">Home</Link>
            <Link to="#how-it-works" className="block px-3 py-2 rounded-md text-base font-medium text-[var(--text-secondary)] hover:bg-[var(--background)]">How It Works</Link>
            <Link to="#features" className="block px-3 py-2 rounded-md text-base font-medium text-[var(--text-secondary)] hover:bg-[var(--background)]">Features</Link>
            <Link to="#about" className="block px-3 py-2 rounded-md text-base font-medium text-[var(--text-secondary)] hover:bg-[var(--background)]">About</Link>
            <div className="mt-4 pt-4 border-t border-[var(--border)] flex flex-col space-y-3">
              <Link to="/login" className="block w-full text-center px-4 py-2 border border-[var(--border)] rounded-md font-medium text-[var(--text-primary)]">Sign In</Link>
              <Link to="/register" className="block w-full text-center px-4 py-2 bg-[var(--primary)] text-white rounded-md font-medium shadow-[var(--shadow-sm)]">Get Started</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;