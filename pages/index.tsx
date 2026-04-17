import Head from 'next/head';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import HeroSection from '@/components/landing/HeroSection';
import DashboardPreview from '@/components/landing/DashboardPreview';
import FeaturesSection from '@/components/landing/FeaturesSection';
import WorkflowSection from '@/components/landing/WorkflowSection';
import BenefitsSection from '@/components/landing/BenefitsSection';
import CTASection from '@/components/landing/CTASection';
import LandingFooter from '@/components/landing/LandingFooter';

export default function LandingPage() {

  const router = useRouter();
  const [userState, setUserState] = useState<"loading" | "authenticated" | "unauthenticated">("loading");

  useEffect(() => {
    const user = localStorage.getItem("smm_user");
    if (user) {
      setUserState("authenticated");
      router.replace("/dashboard");
    } else {
      setUserState("unauthenticated");
    }
  }, []);

  if (userState === "loading") {
    return <div style={{ minHeight: '100vh' }}></div>;
  }

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
