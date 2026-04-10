import { ClipboardList, PenTool, Palette, Send, ArrowRight } from 'lucide-react';

const steps = [
  { icon: ClipboardList, label: 'Plan', color: 'hsl(217 91% 50%)' },
  { icon: PenTool, label: 'Create', color: 'hsl(270 70% 55%)' },
  { icon: Palette, label: 'Design', color: 'hsl(152 60% 42%)' },
  { icon: Send, label: 'Publish', color: 'hsl(199 89% 48%)' },
];

export default function WorkflowSection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-transparent via-[hsl(var(--brand-primary)/0.03)] to-transparent">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
          Simple <span className="brand-gradient-text">Workflow</span>
        </h2>
        <p className="mt-3 text-muted-foreground">Four steps to social media success.</p>

        <div className="mt-14 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-2">
          {steps.map((s, i) => (
            <div key={s.label} className="flex items-center gap-2">
              <div className="flex flex-col items-center gap-3">
                <span
                  className="flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg transition-transform duration-300 hover:scale-110"
                  style={{ background: `${s.color}15` }}
                >
                  <s.icon className="h-7 w-7" style={{ color: s.color }} />
                </span>
                <span className="text-sm font-semibold text-foreground">{s.label}</span>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight className="hidden h-5 w-5 text-muted-foreground/50 sm:block mx-4" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
