import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-[hsl(var(--brand-primary)/0.08)] to-[hsl(var(--brand-secondary)/0.12)]" />
      <div className="absolute top-20 right-20 h-72 w-72 rounded-full bg-[hsl(var(--brand-primary)/0.1)] blur-[100px]" />
      <div className="absolute bottom-20 left-20 h-96 w-96 rounded-full bg-[hsl(var(--brand-secondary)/0.08)] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center animate-fade-in">
        <span className="mb-6 inline-block rounded-full border border-border/60 bg-secondary/60 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground backdrop-blur-sm">
          Social Media + AI Workflow
        </span>

        <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          Social Media Marketing{' '}
          <span className="brand-gradient-text">Made Simple.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Plan, create, design & publish content — all in one place.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/dashboard"
            className="pill-btn brand-gradient text-primary-foreground text-base shadow-lg hover:shadow-xl"
          >
            Explore Platform
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/dashboard"
            className="pill-btn border border-border bg-card text-foreground text-base hover:bg-secondary"
          >
            Manage Social Media
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
