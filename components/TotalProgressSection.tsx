import DashboardCard from './DashboardCard';
import { useWorkflow, CompanyId } from '@/context/WorkflowContext';
import { BarChart3, PenTool, Send, Linkedin, TrendingUp, Users, ArrowUpRight, Eye, Clock } from 'lucide-react';

const COMPANY_STATS: Record<CompanyId, { designed: string; published: string; pending: string; engagement: string }> = {
  'maven-jobs': { designed: '55+', published: '54', pending: '1', engagement: '5K' },
  'profit-pathshala': { designed: '75+', published: '74', pending: '1', engagement: '5.5K' },
  'mks': { designed: '20+', published: '20', pending: '1', engagement: '1K' },
  'savvi': { designed: '20+', published: '20', pending: '0', engagement: '1K' },
};

const LINKEDIN_DATA: Record<CompanyId, { accounts: { name: string; growth: string; from: string; to: string }[]; totalGrowth: string }> = {
  'maven-jobs': {
    accounts: [
      { name: 'Ketan Sir', growth: '+760', from: '2,000', to: '2,760' },
    ],
    totalGrowth: '760',
  },
  'profit-pathshala': {
    accounts: [
      { name: 'Content Account', growth: '+200', from: '100', to: '300' },
    ],
    totalGrowth: '200',
  },
  'mks': {
    accounts: [
      { name: 'MKS Account', growth: '+50', from: '20', to: '70' },
    ],
    totalGrowth: '50',
  },
  'savvi': {
    accounts: [
      { name: 'Bhavishya Sharma', growth: '+900', from: '5', to: '900' },
    ],
    totalGrowth: '900',
  },
};

export default function TotalProgressSection() {
  const { activeCompany, activeCompanyData } = useWorkflow();
  const stats = COMPANY_STATS[activeCompany];
  const linkedin = LINKEDIN_DATA[activeCompany];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 animate-slide-up" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
        <StatStrip icon={<PenTool className="h-4 w-4" />} label="Total Designed" value={stats.designed} color="hsl(217 91% 50%)" />
        <StatStrip icon={<Send className="h-4 w-4" />} label="Total Published" value={stats.published} color="hsl(152 60% 42%)" />
        <StatStrip icon={<Clock className="h-4 w-4" />} label="Pending" value={stats.pending} color="hsl(40 85% 52%)" />
        <StatStrip icon={<Eye className="h-4 w-4" />} label="Engagement" value={stats.engagement} color="hsl(270 70% 55%)" />
      </div>

      <DashboardCard title={`LinkedIn Growth — ${activeCompanyData.name}`} icon={<Linkedin className="h-4 w-4 text-primary" />} delay={150}>
        <div className="grid gap-3 sm:grid-cols-3">
          {linkedin.accounts.map(acc => (
            <div key={acc.name} className="stat-card">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1.5">
                <Users className="h-3.5 w-3.5" />
                {acc.name}
              </div>
              <p className="text-2xl font-bold text-foreground">{acc.growth}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1.5">
                <ArrowUpRight className="h-3 w-3 text-green-500" />
                {acc.from} → {acc.to}
              </p>
            </div>
          ))}
          <div className="stat-card !border-primary/20" style={{ background: 'hsl(var(--primary) / 0.06)' }}>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1.5">
              <TrendingUp className="h-3.5 w-3.5" />
              Total Growth
            </div>
            <p className="text-3xl font-bold text-primary">{linkedin.totalGrowth}</p>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
}

function StatStrip({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="stat-card flex items-center gap-3">
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
        style={{ background: `${color}15`, color }}
      >
        {icon}
      </span>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-xl font-bold text-foreground">{value}</p>
      </div>
    </div>
  );
}
