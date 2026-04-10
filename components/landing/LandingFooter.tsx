import { Instagram, Facebook, Linkedin, Twitter } from 'lucide-react';

export default function LandingFooter() {
  return (
    <footer className="border-t border-border/50 py-10 px-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <span className="brand-gradient-text font-display text-lg font-bold">SMM Platform</span>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <a href="#dashboard-preview" className="hover:text-foreground transition-colors">Features</a>
          <a href="#" className="hover:text-foreground transition-colors">Pricing</a>
          <a href="#" className="hover:text-foreground transition-colors">Contact</a>
        </div>
        <div className="flex gap-3 text-muted-foreground">
          {[Instagram, Facebook, Linkedin, Twitter].map((Icon, i) => (
            <a key={i} href="#" className="rounded-lg p-2 hover:bg-secondary transition-colors">
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
