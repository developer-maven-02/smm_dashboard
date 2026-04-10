import { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  delay?: number;
  accentColor?: string;
}

export default function DashboardCard({ title, children, icon, className = '', delay = 0, accentColor }: DashboardCardProps) {
  return (
    <div
      className={`section-card hover-lift animate-slide-up ${className}`}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      <h3 className="mb-4 flex items-center gap-2.5 font-display text-base font-semibold text-foreground">
        {icon && (
          <span
            className="flex h-8 w-8 items-center justify-center rounded-xl"
            style={{
              background: accentColor
                ? `linear-gradient(135deg, ${accentColor}20, ${accentColor}10)`
                : 'hsl(var(--primary) / 0.1)',
            }}
          >
            {icon}
          </span>
        )}
        {title}
      </h3>
      {children}
    </div>
  );
}
