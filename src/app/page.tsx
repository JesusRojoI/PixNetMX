import HeroSection from '@/components/home/HeroSection';
import ServicesAccordion from '@/components/home/ServicesAccordion';
import AboutSection from '@/components/home/AboutSection';
import MissionVision from '@/components/home/MissionVision';
import DistinguishSection from '@/components/home/DistinguishSection';
import ObjectiveSection from '@/components/home/ObjectiveSection';
import CtaSection from '@/components/home/CtaSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesAccordion />
      <AboutSection />
      <MissionVision />
      <DistinguishSection />
      <ObjectiveSection />
      <CtaSection />
    </>
  );
}