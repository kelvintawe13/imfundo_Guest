import { Hero } from '../components/landing/Hero';
import { InsightBand } from '../components/landing/InsightBand';
import { ProblemOpportunity } from '../components/landing/ProblemOpportunity';
import { PlatformSection } from '../components/landing/PlatformSection';
import { FounderCta } from '../components/landing/FounderCta';

export function Landing() {
  return (
    <>
      <Hero />
      <InsightBand />
      <ProblemOpportunity />
      <PlatformSection />
      <FounderCta />
    </>);

}