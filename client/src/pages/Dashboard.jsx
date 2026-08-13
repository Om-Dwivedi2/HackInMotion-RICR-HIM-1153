import React from 'react'
import DashboardLayout from '../components/dashboard/DashboardLayout'
import Overview from '../components/dashboard/overview/Overview'

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Overview />
    </DashboardLayout>
  )
}

export default Dashboard