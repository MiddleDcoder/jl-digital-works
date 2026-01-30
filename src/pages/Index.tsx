import { lazy, Suspense } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Problem } from '@/components/Problem';
import { Solution } from '@/components/Solution';
import { Automation } from '@/components/Automation';
import { Tracking } from '@/components/Tracking';

// Lazy load below-fold sections to reduce initial JS bundle
const Portfolio = lazy(() => import('@/components/Portfolio').then(m => ({ default: m.Portfolio })));
const Testimonials = lazy(() => import('@/components/Testimonials').then(m => ({ default: m.Testimonials })));
const FAQ = lazy(() => import('@/components/FAQ').then(m => ({ default: m.FAQ })));
const FinalCTA = lazy(() => import('@/components/FinalCTA').then(m => ({ default: m.FinalCTA })));
const Footer = lazy(() => import('@/components/Footer').then(m => ({ default: m.Footer })));

const Index = () => {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:outline-none"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="min-h-screen">
        <Hero />
        <Problem />
        <Solution />
        <Automation />
        <Tracking />
        <Suspense fallback={null}>
          <Portfolio />
          <Testimonials />
          <FAQ />
          <FinalCTA />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
};

export default Index;
