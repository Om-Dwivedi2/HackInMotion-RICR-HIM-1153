import React from 'react'
import DashboardLayout from '../components/dashboard/DashboardLayout'

const Analysis = () => {
  return (
    <DashboardLayout>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 min-h-[400px]">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Analysis</h2>
        <p className="text-slate-600">Analysis content goes here.</p>
      </div>
    </DashboardLayout>
  )
}

export default Analysis
