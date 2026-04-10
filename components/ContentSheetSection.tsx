import DashboardCard from './DashboardCard';
import { FileSpreadsheet } from 'lucide-react';

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1COfJb6dZVkpcaIWqu7tdMYHKLuYkLdJv01tbCPMVaRY/edit?gid=1607619286#gid=1607619286';

export default function ContentSheetSection() {
  return (
    <DashboardCard title="Content Calendar & Master Sheet" icon={<FileSpreadsheet className="h-4 w-4 text-primary" />} delay={100}>
      <p className="mb-4 text-sm text-muted-foreground">
        Content Calendar · Topic Planning · Design Tracking · Publishing Status · All Workflow Steps
      </p>
      <a
        href={SHEET_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="pill-btn brand-gradient brand-glow text-primary-foreground"
      >
        <FileSpreadsheet className="h-4 w-4" />
        Open Master Content Sheet
      </a>
    </DashboardCard>
  );
}
