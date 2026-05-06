import { Hero } from '@/components/sections/Hero';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { ServicesPreview } from '@/components/sections/ServicesPreview';
import { TechStackTicker } from '@/components/sections/TechStackTicker';
import { CallToAction } from '@/components/sections/CallToAction';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <ServicesPreview />
      <TechStackTicker />
      <CallToAction />
    </>
  );
}
