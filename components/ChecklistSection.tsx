import DashboardCard from './DashboardCard';
import { useWorkflow, ChecklistState } from '@/context/WorkflowContext';
import { RotateCcw, CheckSquare, Target, Cpu, PenTool, FileText, Send, Megaphone } from 'lucide-react';

const ITEMS: { key: keyof ChecklistState; label: string; icon: React.ReactNode }[] = [
  { key: 'pickTopic', label: 'Pick Topic', icon: <Target className="h-3.5 w-3.5" /> },
  { key: 'generateContent', label: 'Generate Content', icon: <Cpu className="h-3.5 w-3.5" /> },
  { key: 'designPost', label: 'Design Post', icon: <PenTool className="h-3.5 w-3.5" /> },
  { key: 'updateSheet', label: 'Update Sheet', icon: <FileText className="h-3.5 w-3.5" /> },
  { key: 'sendForReview', label: 'Send for Review', icon: <Send className="h-3.5 w-3.5" /> },
  { key: 'publish', label: 'Publish', icon: <Megaphone className="h-3.5 w-3.5" /> },
];

export default function ChecklistSection() {
  const { currentChecklist, toggleChecklist, resetChecklist, activeCompanyData } = useWorkflow();
  const allDone = Object.values(currentChecklist).every(Boolean);
  const doneCount = Object.values(currentChecklist).filter(Boolean).length;

  return (
    <DashboardCard title={`Daily Checklist — ${activeCompanyData.name}`} icon={<CheckSquare className="h-4 w-4 text-primary" />} delay={700}>
      <div className="mb-4 h-2 overflow-hidden rounded-full bg-secondary">
        <div
          className="brand-gradient h-full rounded-full transition-all duration-500"
          style={{ width: `${(doneCount / ITEMS.length) * 100}%` }}
        />
      </div>

      <div className="space-y-2">
        {ITEMS.map(item => (
          <label
            key={item.key}
            className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-2.5 text-sm transition-all ${
              currentChecklist[item.key]
                ? 'border-primary/20 bg-primary/5 text-foreground line-through opacity-70'
                : 'border-border bg-secondary/30 text-foreground hover:border-primary/20'
            }`}
          >
            <input
              type="checkbox"
              checked={currentChecklist[item.key]}
              onChange={() => toggleChecklist(item.key)}
              className="sr-only"
            />
            <div className={`flex h-5 w-5 items-center justify-center rounded-md border-2 text-xs transition-all ${
              currentChecklist[item.key] ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground/30'
            }`}>
              {currentChecklist[item.key] && '✓'}
            </div>
            <span className="text-muted-foreground">{item.icon}</span>
            <span>{item.label}</span>
          </label>
        ))}
      </div>

      {allDone && (
        <div className="mt-4 flex items-center gap-2 rounded-xl brand-gradient p-4 text-primary-foreground animate-fade-in">
          <CheckSquare className="h-5 w-5" />
          <span className="font-display font-semibold">All Tasks Completed</span>
        </div>
      )}

      <button
        onClick={resetChecklist}
        className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <RotateCcw className="h-3 w-3" />
        Reset Checklist
      </button>
    </DashboardCard>
  );
}
