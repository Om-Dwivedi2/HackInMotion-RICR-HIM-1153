import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Resume from './pages/Resume'
import Analysis from './pages/Analysis'
import MockInterview from './pages/MockInterview'
import History from './pages/History'
import Settings from './pages/Settings'
import Contact from './pages/Contact'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

const AppContent = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <div className="flex flex-col min-h-screen w-full bg-[var(--background)]">
      <Toaster position="top-center" />

      {!isDashboard && <Navbar />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/resume" element={<Resume />} />
          <Route path="/dashboard/analysis" element={<Analysis />} />
          <Route path="/dashboard/interview" element={<MockInterview />} />
          <Route path="/dashboard/history" element={<History />} />
          <Route path="/dashboard/settings" element={<Settings />} />

          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {!isDashboard && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App