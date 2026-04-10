import DashboardCard from './DashboardCard';
import LinkButton from './LinkButton';
import { useWorkflow } from '@/context/WorkflowContext';
import { Instagram, Facebook, Twitter, Image, Linkedin, Share2 } from 'lucide-react';

export default function PublishSection() {
  const { links, activeCompany } = useWorkflow();
  const cl = links[activeCompany];

  return (
    <DashboardCard title="Publish to Social Media" icon={<Share2 className="h-4 w-4" style={{ color: 'hsl(199 89% 48%)' }} />} delay={500} accentColor="hsl(199 89% 48%)">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <LinkButton label="Instagram" href={cl.instagram} icon={<Instagram className="h-4 w-4" style={{ color: 'hsl(340 75% 55%)' }} />} linkKey="instagram" companyKey={activeCompany} />
        <LinkButton label="Facebook" href={cl.facebook} icon={<Facebook className="h-4 w-4" style={{ color: 'hsl(220 70% 50%)' }} />} linkKey="facebook" companyKey={activeCompany} />
        <LinkButton label="Twitter (X)" href={cl.twitter} icon={<Twitter className="h-4 w-4" style={{ color: 'hsl(199 89% 48%)' }} />} linkKey="twitter" companyKey={activeCompany} />
        <LinkButton label="Pinterest" href={cl.pinterest} icon={<Image className="h-4 w-4" style={{ color: 'hsl(0 70% 50%)' }} />} linkKey="pinterest" companyKey={activeCompany} />
        <LinkButton label="LinkedIn" href={cl.linkedin} icon={<Linkedin className="h-4 w-4" style={{ color: 'hsl(210 80% 45%)' }} />} linkKey="linkedin" companyKey={activeCompany} />
      </div>
    </DashboardCard>
  );
}
