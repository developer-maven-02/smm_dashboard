import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-3xl text-center">
        <div className="section-card py-16 px-8 bg-gradient-to-br from-[hsl(var(--brand-primary)/0.05)] to-[hsl(var(--brand-secondary)/0.08)]">
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Start Managing Social Media <span className="brand-gradient-text">Like a Pro</span>
          </h2>
          <p className="mt-4 text-muted-foreground">Join teams that ship content faster and grow their audience.</p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/login"
              className="pill-btn brand-gradient text-primary-foreground text-base shadow-lg"
            >
              Get Started Now
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/login"
              className="pill-btn border border-border bg-card text-foreground text-base hover:bg-secondary"
            >
              Sign In
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
