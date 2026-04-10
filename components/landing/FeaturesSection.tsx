import { CalendarDays, Sparkles, Palette, CheckCircle2, Share2 } from 'lucide-react';

const features = [
  { icon: CalendarDays, title: 'Content Calendar & Master Sheet', desc: 'Plan and organize all posts in one place', color: 'hsl(217 91% 50%)' },
  { icon: Sparkles, title: 'AI Content Generator', desc: 'Generate captions, ideas, and reels instantly', color: 'hsl(270 70% 55%)' },
  { icon: Palette, title: 'Canva & Design Integration', desc: 'Manage designs and brand assets easily', color: 'hsl(152 60% 42%)' },
  { icon: CheckCircle2, title: 'Review & Approval System', desc: 'Streamline team collaboration and approvals', color: 'hsl(40 85% 52%)' },
  { icon: Share2, title: 'Multi-Platform Publishing', desc: 'Publish to Instagram, Facebook, LinkedIn, Twitter, Pinterest', color: 'hsl(199 89% 48%)' },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Powerful <span className="brand-gradient-text">Features</span>
          </h2>
          <p className="mt-3 text-muted-foreground">Everything you need to manage social media at scale.</p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group section-card hover-lift"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ background: `${f.color}15` }}
              >
                <f.icon className="h-6 w-6" style={{ color: f.color }} />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
