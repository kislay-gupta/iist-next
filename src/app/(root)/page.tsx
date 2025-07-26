import Hero from '@/components/newHome/Hero'
import InnovativeFeatures from '@/components/newHome/InnovativeFeatures'
import InternshipProgramme from '@/components/newHome/InternshipProgramme'
import FutureSkill from '@/components/newHome/FutureSkill'
import React from 'react'
import LogoSlider from '@/components/newHome/LogoSlider'
import GetInspiration from '@/components/newHome/GetInspiration'
import OurChildScientistsSection from '@/components/newHome/OurChildScientistsSection'

const Page = () => {
  return (
    <>
      <Hero />
      <InnovativeFeatures />
      <InternshipProgramme />
      <FutureSkill />
      <LogoSlider />
      <GetInspiration />
      <OurChildScientistsSection />
    </>
  )
}

export default Page