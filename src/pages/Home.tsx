import React from 'react';
import { HomeHero } from '../components/home/HomeHero';
import { StatsBand } from '../components/home/StatsBand';
import { CoreProblem } from '../components/home/CoreProblem';
import { WhySection } from '../components/home/WhySection';
import { HowItWorks } from '../components/home/HowItWorks';
import { FounderStory } from '../components/home/FounderStory';
import { CtaBand } from '../components/CtaBand';

export function Home() {
  return (
    <>
      <HomeHero />
      <StatsBand />
      <CoreProblem />
      <WhySection />
      <HowItWorks />
      <FounderStory />
      <CtaBand />
    </>
  );
}
