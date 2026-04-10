import DashboardCard from './DashboardCard';
import LinkButton from './LinkButton';
import { useWorkflow } from '@/context/WorkflowContext';
import { MessageSquare, Send, ClipboardCheck, CheckCircle } from 'lucide-react';

export default function ReviewSection() {
  const { links, activeCompany } = useWorkflow();
  const companyLinks = links[activeCompany];

  return (
    <DashboardCard title="Review & Approval" icon={<CheckCircle className="h-4 w-4" style={{ color: 'hsl(40 85% 52%)' }} />} delay={400} accentColor="hsl(40 85% 52%)">
      <div className="flex flex-col gap-2">
        <LinkButton label="Open Slack" href={companyLinks.slack} icon={<MessageSquare className="h-4 w-4" style={{ color: 'hsl(40 85% 52%)' }} />} linkKey="slack" companyKey={activeCompany} />
        <LinkButton label="Send for Review Template" href="#" icon={<Send className="h-4 w-4" style={{ color: 'hsl(40 85% 52%)' }} />} />
        <LinkButton label="Approval Tracking" href="#" icon={<ClipboardCheck className="h-4 w-4" style={{ color: 'hsl(40 85% 52%)' }} />} />
      </div>
    </DashboardCard>
  );
}
