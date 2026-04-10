import { Clock, Target, Users, TrendingUp } from 'lucide-react';

const benefits = [
  { icon: Clock, title: 'Save Time', desc: 'Automate repetitive tasks and focus on strategy' },
  { icon: Target, title: 'Increase Consistency', desc: 'Maintain brand voice across all platforms' },
  { icon: Users, title: 'Improve Team Workflow', desc: 'Collaborate seamlessly with your team' },
  { icon: TrendingUp, title: 'Grow Social Media Faster', desc: 'Data-driven decisions for rapid growth' },
];

export default function BenefitsSection() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
          Why Teams <span className="brand-gradient-text">Love Us</span>
        </h2>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div key={b.title} className="flex flex-col items-center text-center section-card hover-lift">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <b.icon className="h-6 w-6 text-primary" />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold text-foreground">{b.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
