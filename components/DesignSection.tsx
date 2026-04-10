import DashboardCard from './DashboardCard';
import LinkButton from './LinkButton';
import { useWorkflow } from '@/context/WorkflowContext';
import { Palette, Bookmark, FolderOpen, PenTool } from 'lucide-react';

export default function DesignSection() {
  const { links, activeCompany } = useWorkflow();
  const companyLinks = links[activeCompany];

  return (
    <DashboardCard title="Canva & Design" icon={<PenTool className="h-4 w-4" style={{ color: 'hsl(152 60% 42%)' }} />} delay={300} accentColor="hsl(152 60% 42%)">
      <div className="flex flex-col gap-2">
        <LinkButton label="Open Canva Dashboard" href={companyLinks.canvaDashboard} icon={<Palette className="h-4 w-4" style={{ color: 'hsl(152 60% 42%)' }} />} linkKey="canvaDashboard" companyKey={activeCompany} />
        <LinkButton label="Open Brand Kit" href={companyLinks.brandKit} icon={<Bookmark className="h-4 w-4" style={{ color: 'hsl(152 60% 42%)' }} />} linkKey="brandKit" companyKey={activeCompany} />
        <LinkButton label="Open Design Folder" href={companyLinks.designFolder} icon={<FolderOpen className="h-4 w-4" style={{ color: 'hsl(152 60% 42%)' }} />} linkKey="designFolder" companyKey={activeCompany} />
      </div>
    </DashboardCard>
  );
}
