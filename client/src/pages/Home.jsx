import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
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
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);
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