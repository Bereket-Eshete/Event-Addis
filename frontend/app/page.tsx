import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { PopularEventsSection } from '@/components/sections/PopularEventsSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { CTASection } from '@/components/sections/CTASection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <PopularEventsSection />
      <HowItWorksSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}