import { Monitor } from 'lucide-react';

export default function DashboardPreview() {
  return (
    <section id="dashboard-preview" className="relative py-24 px-6">
      <div className="mx-auto max-w-5xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
          <Monitor className="h-3.5 w-3.5" />
          Platform Preview
        </span>
        <h2 className="mt-4 font-display text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
          Everything You Need in <span className="brand-gradient-text">One Dashboard</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Manage content, design, approvals and publishing from a single platform.
        </p>

        {/* Mock dashboard preview */}
        <div className="mt-12 rounded-2xl border border-border/50 bg-card p-2 shadow-2xl">
          <div className="rounded-xl bg-gradient-to-br from-secondary to-muted p-8 sm:p-12">
            <div className="grid gap-4 sm:grid-cols-3">
              {['Content Calendar', 'AI Generator', 'Publishing'].map((t) => (
                <div key={t} className="rounded-xl border border-border/30 bg-card/80 p-6 backdrop-blur-sm">
                  <div className="mb-3 h-2 w-16 rounded-full bg-primary/30" />
                  <span className="text-sm font-semibold text-foreground">{t}</span>
                  <div className="mt-3 space-y-2">
                    <div className="h-2 w-full rounded-full bg-muted" />
                    <div className="h-2 w-3/4 rounded-full bg-muted" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
