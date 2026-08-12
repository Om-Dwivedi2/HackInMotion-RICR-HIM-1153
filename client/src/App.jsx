import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Resume from './pages/Resume'
import Analysis from './pages/Analysis'
import MockInterview from './pages/MockInterview'
import History from './pages/History'
import Settings from './pages/Settings'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/resume" element={<Resume />} />
        <Route path="/dashboard/analysis" element={<Analysis />} />
        <Route path="/dashboard/interview" element={<MockInterview />} />
        <Route path="/dashboard/history" element={<History />} />
        <Route path="/dashboard/settings" element={<Settings />} />
      </Routes>
    </Router>
  )
}

export default App