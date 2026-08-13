import React from 'react'
import Hero from '../components/home/Hero'
import ValueStrip from '../components/home/ValueStrip'
import CareerJourney from '../components/home/CareerJourney'
import ResumeAnalyzer from '../components/home/ResumeAnalyzer'
import SkillGap from '../components/home/SkillGap'
import MockInterview from '../components/home/MockInterview'
import ProgressSection from '../components/home/ProgressSection'
import WhyCareerLens from '../components/home/WhyCareerLens'
import FinalCTA from '../components/home/FinalCTA'

const Home = () => {
  return (
    <>
      <Hero />
      <ValueStrip />
      <CareerJourney />
      <ResumeAnalyzer />
      <SkillGap />
      <MockInterview />
      <ProgressSection />
      <WhyCareerLens />
      <FinalCTA />
    </>
  )
}

export default Home