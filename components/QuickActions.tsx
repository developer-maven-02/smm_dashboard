import { PenTool, CalendarDays, Sparkles, FileSpreadsheet } from 'lucide-react';

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1COfJb6dZVkpcaIWqu7tdMYHKLuYkLdJv01tbCPMVaRY/edit?gid=1607619286#gid=1607619286';

const actions = [
  { label: 'Create Post', icon: PenTool, href: 'https://www.canva.com/', color: 'hsl(152 60% 42%)' },
  { label: 'Open Calendar', icon: CalendarDays, href: SHEET_URL, color: 'hsl(217 91% 50%)' },
  { label: 'Generate Content', icon: Sparkles, href: 'https://chat.openai.com/', color: 'hsl(270 70% 55%)' },
  { label: 'Master Sheet', icon: FileSpreadsheet, href: SHEET_URL, color: 'hsl(40 85% 52%)' },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 animate-slide-up" style={{ animationDelay: '50ms', animationFillMode: 'both' }}>
      {actions.map((a) => (
        <a
          key={a.label}
          href={a.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center gap-2.5 rounded-2xl border border-border/50 bg-card p-4 transition-all duration-300 hover:scale-[1.04] hover:shadow-lg hover:border-primary/20"
        >
          <span
            className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
            style={{ background: `${a.color}15` }}
          >
            <a.icon className="h-5 w-5" style={{ color: a.color }} />
          </span>
          <span className="text-xs font-semibold text-foreground">{a.label}</span>
        </a>
      ))}
    </div>
  );
}
