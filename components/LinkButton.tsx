import { useWorkflow } from '@/context/WorkflowContext';
import { ExternalLink, Edit3 } from 'lucide-react';
import { useState } from 'react';

interface LinkButtonProps {
  label: string;
  href: string;
  icon?: React.ReactNode;
  linkKey?: string;
  companyKey?: string;
}

export default function LinkButton({ label, href, icon, linkKey, companyKey }: LinkButtonProps) {
  const { adminMode, updateLink, activeCompany } = useWorkflow();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(href);

  const handleSave = () => {
    if (linkKey && companyKey) {
      updateLink(activeCompany, linkKey as any, value);
    }
    setEditing(false);
  };

  if (adminMode && editing) {
    return (
      <div className="flex gap-2">
        <input
          className="flex-1 rounded-full border border-border bg-secondary px-4 py-2.5 text-xs text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Paste URL..."
          autoFocus
        />
        <button onClick={handleSave} className="pill-btn brand-gradient text-primary-foreground text-xs">
          Save
        </button>
      </div>
    );
  }

  return (
    <div className="group flex items-center gap-2">
      <a
        href={href || '#'}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center gap-3 rounded-2xl border border-border/50 bg-secondary/40 px-4 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 hover:shadow-md hover:scale-[1.01]"
      >
        {icon}
        <span className="flex-1">{label}</span>
        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
      {adminMode && (
        <button
          onClick={() => setEditing(true)}
          className="rounded-xl p-2.5 text-muted-foreground transition-all hover:bg-secondary hover:text-foreground hover:scale-110"
        >
          <Edit3 className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
