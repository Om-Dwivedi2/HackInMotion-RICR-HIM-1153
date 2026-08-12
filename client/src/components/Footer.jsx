import React from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiLinkedin, FiTwitter, FiGithub, FiArrowRight } from 'react-icons/fi';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="w-full bg-[var(--background)] border-t border-[var(--border)] pt-16 pb-8">
      <div className="max-w-[var(--container-width)] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
          
          {/* Brand & Description */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <img src={logo} alt="CareerLens Logo" className="h-16 md:h-20 w-auto object-contain" />
            </Link>
            <p className="text-[var(--text-secondary)] text-sm mb-6">
              AI-powered career preparation for your next opportunity.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"><FiLinkedin className="w-5 h-5" /></a>
              <a href="#" className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"><FiTwitter className="w-5 h-5" /></a>
              <a href="#" className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"><FiGithub className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Product Links */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-[var(--text-primary)] mb-4">Product</h3>
            <ul className="space-y-3">
              <li><Link to="/dashboard" className="text-[var(--text-secondary)] hover:text-[var(--primary)] text-sm transition-colors">Resume Analyzer</Link></li>
              <li><Link to="/dashboard" className="text-[var(--text-secondary)] hover:text-[var(--primary)] text-sm transition-colors">Skill Gap Analysis</Link></li>
              <li><Link to="/dashboard" className="text-[var(--text-secondary)] hover:text-[var(--primary)] text-sm transition-colors">Mock Interview</Link></li>
              <li><Link to="/dashboard" className="text-[var(--text-secondary)] hover:text-[var(--primary)] text-sm transition-colors">Progress Tracking</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-[var(--text-primary)] mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-[var(--text-secondary)] hover:text-[var(--primary)] text-sm transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-[var(--text-secondary)] hover:text-[var(--primary)] text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Stay Updated */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-[var(--text-primary)] mb-4">Stay Updated</h3>
            <p className="text-[var(--text-secondary)] text-sm mb-4">
              Join our newsletter for career tips, product updates, and more.
            </p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-l-[var(--radius-sm)] px-4 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]"
              />
              <button 
                type="submit" 
                className="bg-[var(--primary)] text-white px-4 py-2 rounded-r-[var(--radius-sm)] hover:bg-[var(--primary-hover)] transition-colors flex items-center justify-center"
              >
                <FiArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-[var(--border)] pt-8 flex flex-col md:flex-row justify-between items-center text-[var(--text-muted)] text-sm">
          <p>&copy; 2026 CareerLens. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;