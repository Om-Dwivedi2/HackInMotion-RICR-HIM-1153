import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  FiMenu,
  FiX,
  FiLogOut,
  FiChevronDown,
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState(location.hash || '');

  const dropdownRef = useRef(null);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    setActiveHash(location.hash || '');
  }, [location.pathname, location.hash]);

  // Handle scroll detection for shadow and scroll spy
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);

      // Simple scroll spy when on home page
      if (location.pathname === '/') {
        const sections = ['about-us', 'features', 'how-it-works', 'home'];
        for (const sectionId of sections) {
          const el = document.getElementById(sectionId);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 120 && rect.bottom >= 120) {
              setActiveHash(sectionId === 'home' ? '' : `#${sectionId}`);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Handle click outside user dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setUserDropdownOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    if (!sectionId || sectionId === 'home') {
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveHash('');
      } else {
        navigate('/');
      }
      return;
    }

    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveHash(`#${sectionId}`);
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const isHomeActive = location.pathname === '/' && (!activeHash || activeHash === '#home');
  const isHowItWorksActive = location.pathname === '/' && activeHash === '#how-it-works';
  const isFeaturesActive = location.pathname === '/' && activeHash === '#features';
  const isAboutActive = location.pathname === '/' && activeHash === '#about-us';
  const isContactActive = location.pathname === '/contact';
  const isDashboardActive = location.pathname.startsWith('/dashboard');

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md transition-all duration-200 border-b shrink-0 ${
        scrolled ? 'border-slate-200 shadow-sm' : 'border-slate-100'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Brand Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              onClick={() => {
                if (location.pathname === '/') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setActiveHash('');
                }
              }}
              className="flex items-center gap-2.5 group"
            >
              <img
                src={logo}
                alt="CareerLens Logo"
                className="h-14 md:h-16 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                onError={(e) => {
                  e.target.style.display = 'none';
                  const fallback = document.getElementById('brand-text-fallback');
                  if (fallback) fallback.style.display = 'block';
                }}
              />
              <span id="brand-text-fallback" className="text-2xl font-bold text-slate-900 tracking-tight hidden">
                <span className="text-blue-600">Career</span>Lens
              </span>
            </Link>
          </div>

          {/* Center: Navigation Links */}
          <nav className="hidden lg:flex items-center justify-center gap-8">
            {!user ? (
              // Guest Navigation: Home, How It Works, Features, About Us, Contact
              <>
                <button
                  type="button"
                  onClick={() => handleNavClick('home')}
                  className={`text-[15px] transition-colors cursor-pointer py-1 ${
                    isHomeActive
                      ? 'text-blue-600 font-semibold'
                      : 'text-slate-600 font-medium hover:text-blue-600'
                  }`}
                >
                  Home
                </button>

                <button
                  type="button"
                  onClick={() => handleNavClick('how-it-works')}
                  className={`text-[15px] transition-colors cursor-pointer py-1 ${
                    isHowItWorksActive
                      ? 'text-blue-600 font-semibold'
                      : 'text-slate-600 font-medium hover:text-blue-600'
                  }`}
                >
                  How It Works
                </button>

                <button
                  type="button"
                  onClick={() => handleNavClick('features')}
                  className={`text-[15px] transition-colors cursor-pointer py-1 ${
                    isFeaturesActive
                      ? 'text-blue-600 font-semibold'
                      : 'text-slate-600 font-medium hover:text-blue-600'
                  }`}
                >
                  Features
                </button>

                <button
                  type="button"
                  onClick={() => handleNavClick('about-us')}
                  className={`text-[15px] transition-colors cursor-pointer py-1 ${
                    isAboutActive
                      ? 'text-blue-600 font-semibold'
                      : 'text-slate-600 font-medium hover:text-blue-600'
                  }`}
                >
                  About Us
                </button>

                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `text-[15px] transition-colors py-1 ${
                      isActive || isContactActive
                        ? 'text-blue-600 font-semibold'
                        : 'text-slate-600 font-medium hover:text-blue-600'
                    }`
                  }
                >
                  Contact
                </NavLink>
              </>
            ) : (
              // Authenticated Navigation: Home, Contact, Dashboard
              <>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `text-[15px] transition-colors py-1 ${
                      isHomeActive
                        ? 'text-blue-600 font-semibold'
                        : 'text-slate-600 font-medium hover:text-blue-600'
                    }`
                  }
                >
                  Home
                </NavLink>

                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `text-[15px] transition-colors py-1 ${
                      isActive || isContactActive
                        ? 'text-blue-600 font-semibold'
                        : 'text-slate-600 font-medium hover:text-blue-600'
                    }`
                  }
                >
                  Contact
                </NavLink>

                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `text-[15px] transition-colors py-1 ${
                      isDashboardActive
                        ? 'text-blue-600 font-semibold'
                        : 'text-slate-600 font-medium hover:text-blue-600'
                    }`
                  }
                >
                  Dashboard
                </NavLink>
              </>
            )}
          </nav>

          {/* Right: Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {!user ? (
              // Guest Actions: Sign In & Get Started
              <>
                <Link
                  to="/login"
                  className="px-3 py-2 text-[15px] font-semibold text-slate-700 hover:text-blue-600 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-6 py-2.5 text-[15px] font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-all shadow-sm hover:shadow hover:brightness-105 active:scale-95"
                >
                  Get Started
                </Link>
              </>
            ) : (
              // Authenticated Actions: User Profile Pill with Sign Out ONLY in dropdown
              <div className="flex items-center gap-3">
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer focus:outline-none"
                    aria-expanded={userDropdownOpen}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                      {getInitials(user?.name)}
                    </div>
                    <span className="text-sm font-semibold text-slate-700 max-w-[120px] truncate">
                      {user?.name?.split(' ')[0] || 'Account'}
                    </span>
                    <FiChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                        userDropdownOpen ? 'rotate-180 text-slate-700' : ''
                      }`}
                    />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      {/* User Info Header */}
                      <div className="px-4 py-3 border-b border-slate-100">
                        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                          Signed in as
                        </p>
                        <p className="text-sm font-bold text-slate-900 truncate mt-0.5">
                          {user?.name || 'User'}
                        </p>
                        <p className="text-xs text-slate-500 truncate mt-0.5">
                          {user?.email}
                        </p>
                      </div>

                      {/* Only Sign Out Button */}
                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          <FiLogOut className="w-4 h-4 text-red-500" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white shadow-xl animate-in slide-in-from-top duration-200">
          <div className="px-4 py-6 space-y-4">
            {user ? (
              // Mobile Authenticated Menu: Home, Contact, Dashboard, Sign Out
              <>
                <div className="flex items-center gap-3 p-3 bg-blue-50/70 border border-blue-100 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                    {getInitials(user?.name)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-slate-900 truncate">
                      {user?.name}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <NavLink
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                        isHomeActive
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`
                    }
                  >
                    Home
                  </NavLink>

                  <NavLink
                    to="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`
                    }
                  >
                    Contact
                  </NavLink>

                  <NavLink
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                        isDashboardActive
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`
                    }
                  >
                    Dashboard
                  </NavLink>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors cursor-pointer"
                  >
                    <FiLogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              // Mobile Guest Menu
              <>
                <div className="flex flex-col gap-1">
                  <button
                    type="button"
                    onClick={() => handleNavClick('home')}
                    className="flex items-center justify-between px-4 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-xl text-left cursor-pointer"
                  >
                    Home
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('how-it-works')}
                    className="flex items-center justify-between px-4 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-xl text-left cursor-pointer"
                  >
                    How It Works
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('features')}
                    className="flex items-center justify-between px-4 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-xl text-left cursor-pointer"
                  >
                    Features
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('about-us')}
                    className="flex items-center justify-between px-4 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-xl text-left cursor-pointer"
                  >
                    About Us
                  </button>
                  <NavLink
                    to="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-xl"
                  >
                    Contact
                  </NavLink>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-3 text-center text-base font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-3 text-center text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-colors shadow-sm"
                  >
                    Get Started
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;