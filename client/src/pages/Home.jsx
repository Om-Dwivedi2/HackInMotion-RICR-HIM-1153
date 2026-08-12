import React from 'react'
import Hero from '../components/home/Hero'
import ValueStrip from '../components/home/ValueStrip'
import CareerJourney from '../components/home/CareerJourney'
import ResumeAnalyzer from '../components/home/ResumeAnalyzer'
import SkillGap from '../components/home/SkillGap'

const Home = () => {
  return (
    <>
      <Hero />
      <ValueStrip />
      <CareerJourney />
      <ResumeAnalyzer />
      <SkillGap />
      {/* More sections will be added here as we implement them */}
    </>
  )
}

export default Home