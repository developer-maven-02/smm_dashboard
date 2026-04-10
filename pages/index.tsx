import Head from 'next/head';
import HeroSection from '@/components/landing/HeroSection';
import DashboardPreview from '@/components/landing/DashboardPreview';
import FeaturesSection from '@/components/landing/FeaturesSection';
import WorkflowSection from '@/components/landing/WorkflowSection';
import BenefitsSection from '@/components/landing/BenefitsSection';
import CTASection from '@/components/landing/CTASection';
import LandingFooter from '@/components/landing/LandingFooter';

export default function LandingPage() {
  return (
    <>
      <Head>
        <title>Social Media Marketing Dashboard</title>
      </Head>
      <div className="dashboard-bg scroll-smooth">
        <HeroSection />
        <DashboardPreview />
        <FeaturesSection />
        <WorkflowSection />
        <BenefitsSection />
        <CTASection />
        <LandingFooter />
      </div>
    </>
  );
}
