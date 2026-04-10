import Head from 'next/head';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import QuickActions from '@/components/QuickActions';
import ContentSheetSection from '@/components/ContentSheetSection';
import AnalyticsSection from '@/components/AnalyticsSection';
import AIToolsSection from '@/components/AIToolsSection';
import DesignSection from '@/components/DesignSection';
import ReviewSection from '@/components/ReviewSection';
import PublishSection from '@/components/PublishSection';
import ChecklistSection from '@/components/ChecklistSection';
import NotesSection from '@/components/NotesSection';
import TotalProgressSection from '@/components/TotalProgressSection';
import { useWorkflow } from '@/context/WorkflowContext';

export default function Dashboard() {
  const { analyticsPeriod } = useWorkflow();
  const isReportOpen = !!analyticsPeriod;

  useEffect(() => {
    document.documentElement.setAttribute('data-company', 'maven-jobs');
    document.documentElement.setAttribute('data-theme', 'blue');
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard - Social Media Marketing</title>
      </Head>
      <div className="dashboard-bg transition-colors duration-500">
        <Navbar />

        <main className="mx-auto max-w-6xl px-4 py-8 space-y-6">
          <AnalyticsSection />

          {!isReportOpen && (
            <>
              <QuickActions />
              <TotalProgressSection />
              <ContentSheetSection />

              <div className="grid gap-6 md:grid-cols-2">
                <AIToolsSection />
                <DesignSection />
                <ReviewSection />
                <PublishSection />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <ChecklistSection />
                <NotesSection />
              </div>
            </>
          )}
        </main>

        <footer className="py-8 text-center text-xs text-muted-foreground">
          <span className="brand-gradient-text font-semibold">Social Media Marketing</span> · Dashboard v2.0
        </footer>
      </div>
    </>
  );
}
