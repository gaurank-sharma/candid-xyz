import React from 'react';
import HeroSection from '../components/HeroSection';
import WhoWeAreSection from '../components/WhoWeAreSection';
import OurVisionSection from '../components/OurVisionSection';
import AchievementsSection from '../components/AchievementsSection';
import OurThinkingSection from '../components/OurThinkingSection';
import StoriesOfImpactSection from '../components/StoriesOfImpactSection';
import ExploreIndustrySection from '../components/ExploreIndustrySection';
import GetInTouchSection from '../components/GetInTouchSection';
import CertificateSection from '../components/CertificateSection';
import OurAccreditationsSection from "../components/OurAccreditationsSection";
import Logos from '../components/logos';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 font-inter text-gray-800">
   
      <HeroSection />
      <WhoWeAreSection />
      <OurVisionSection />
      <AchievementsSection />
      <CertificateSection />
      {/* <OurThinkingSection /> */}
      <StoriesOfImpactSection />
       <OurAccreditationsSection />
      <Logos />
      {/* <ExploreIndustrySection /> */}
      {/* <GetInTouchSection /> */}

    </div>
  );
};

export default Home;


