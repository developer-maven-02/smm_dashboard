import DashboardCard from './DashboardCard';
import { useWorkflow } from '@/context/WorkflowContext';
import { StickyNote } from 'lucide-react';

export default function NotesSection() {
  const { currentNotes, setNotes, activeCompanyData } = useWorkflow();

  return (
    <DashboardCard title={`Quick Notes — ${activeCompanyData.name}`} icon={<StickyNote className="h-4 w-4 text-primary" />} delay={800}>
      <textarea
        value={currentNotes}
        onChange={e => setNotes(e.target.value)}
        placeholder={`Write notes for ${activeCompanyData.name}...`}
        className="min-h-[120px] w-full resize-none rounded-xl border border-border bg-secondary/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/30 transition-colors"
      />
      <p className="mt-2 text-xs text-muted-foreground">Auto-saved · {activeCompanyData.name}</p>
    </DashboardCard>
  );
}
