import { useWorkflow, COMPANY_NAME_TO_ID, CompanyId } from '@/context/WorkflowContext';
import DashboardCard from './DashboardCard';
import { BarChart3, TrendingUp, Eye, PenTool, Send, Linkedin, Activity, Award, Briefcase, Layout, Globe, CheckCircle, XCircle, Users } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';

interface BrandStats {
  designed: number;
  published: number;
  views: number;
  target?: number;
}

const DATA: Record<'7d' | '30d', Record<string, BrandStats>> = {
  '30d': {
    'Maven Jobs': { designed: 14, published: 13, views: 400 },
    'Profit Pathshala': { designed: 17, published: 16, views: 700 },
    'Savvi': { designed: 3, published: 2, views: 30 },
    'MKS': { designed: 3, published: 2, views: 20 },
  },
  '7d': {
    'Maven Jobs': { designed: 3, published: 3, views: 100, target: 3 },
    'Profit Pathshala': { designed: 3, published: 3, views: 400, target: 3 },
    'Savvi': { designed: 2, published: 2, views: 22, target: 2 },
    'MKS': { designed: 1, published: 1, views: 19, target: 1 },
  },
};

const DATA_90D: Record<string, { published: number; views: number; rate: number; badge?: string }> = {
  'Maven Jobs': { published: 34, views: 16118, rate: 94 },
  'Profit Pathshala': { published: 74, views: 134923, rate: 97, badge: 'Top Performance' },
  'MKS': { published: 10, views: 2743, rate: 85 },
  'Savvi': { published: 3, views: 300, rate: 60 },
};

const LINKEDIN: Record<'7d' | '30d', Record<string, { name: string; subtitle: string; posts: number; views: number; connections?: number }[]>> = {
  '30d': {
    'maven-jobs': [
      { name: 'Ketan Sir', subtitle: 'Maven Content', posts: 3, views: 1500 },
    ],
    'profit-pathshala': [
      { name: 'Content Account', subtitle: 'Profit Pathshala Content', posts: 2, views: 500 },
    ],
    'mks': [
      { name: 'MKS Account', subtitle: 'MKS Content', posts: 1, views: 100 },
    ],
    'savvi': [
      { name: 'Bhavishya Sir', subtitle: 'Savvi Content', posts: 1, views: 190, connections: 30 },
    ],
  },
  '7d': {
    'maven-jobs': [
      { name: 'Ketan Sir', subtitle: 'Maven Content', posts: 2, views: 800, connections: 100 },
    ],
    'profit-pathshala': [
      { name: 'Content Account', subtitle: 'Profit Pathshala Content', posts: 1, views: 300 },
    ],
    'mks': [
      { name: 'MKS Account', subtitle: 'MKS Content', posts: 0, views: 0 },
    ],
    'savvi': [
      { name: 'Bhavishya Sir', subtitle: 'Savvi Content', posts: 1, views: 190, connections: 30 },
    ],
  },
};

const BRAND_COLORS: Record<string, string> = {
  'Maven Jobs': 'hsl(210 75% 48%)',
  'Profit Pathshala': 'hsl(40 85% 52%)',
  'MKS': 'hsl(225 80% 56%)',
  'Savvi': 'hsl(174 65% 42%)',
};

function formatViews(v: number) {
  return v >= 1000 ? `${(v / 1000).toFixed(v >= 10000 ? 0 : 1)}K+` : `${v}+`;
}

function Section90d() {
  const { activeCompanyData } = useWorkflow();
  const brandName = activeCompanyData.name;
  const b = DATA_90D[brandName];

  if (!b) return null;

  return (
    <div className="space-y-6 animate-slide-up">
      <DashboardCard
        title={`Nov - Jan Report — ${brandName}`}
        icon={<BarChart3 className="h-4 w-4 text-primary" />}
        delay={0}
      >
        <div className="mb-6 rounded-xl border border-border bg-card p-5">
          <h4 className="mb-4 text-sm font-semibold text-foreground">📋 {brandName} — 3 Month Summary</h4>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3">
            {[
              { icon: <Activity className="h-3.5 w-3.5 text-primary" />, label: 'Duration', value: 'Last 3 Months (Nov – Jan)' },
              { icon: <Briefcase className="h-3.5 w-3.5 text-primary" />, label: 'Brand', value: brandName },
              { icon: <Layout className="h-3.5 w-3.5 text-primary" />, label: 'Work Type', value: 'Content, Design, Posting, Reporting' },
              { icon: <Globe className="h-3.5 w-3.5 text-primary" />, label: 'Platforms', value: 'Instagram + LinkedIn' },
            ].map(item => (
              <div key={item.label} className="flex items-start gap-2">
                <div className="mt-0.5">{item.icon}</div>
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-medium text-foreground">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { label: 'Published', value: String(b.published), icon: <Send className="h-4 w-4" /> },
              { label: 'Total Views', value: formatViews(b.views), icon: <Eye className="h-4 w-4" /> },
              { label: 'Publish Rate', value: `${b.rate}%`, icon: <Activity className="h-4 w-4" /> },
            ].map(s => (
              <div key={s.label} className="rounded-xl border border-border bg-card p-3 text-center">
                <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {s.icon}
                </div>
                <p className="text-xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md">
          <div className="mb-3 flex items-center justify-between">
            <h5 className="text-sm font-semibold text-foreground">{brandName}</h5>
            <div className="flex items-center gap-2">
              {'badge' in b && b.badge && (
                <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary flex items-center gap-1">
                  <Award className="h-3 w-3" />
                  {b.badge}
                </span>
              )}
              <span className="flex items-center gap-1 text-xs font-medium text-primary">
                <TrendingUp className="h-3 w-3" />
                {b.rate}%
              </span>
            </div>
          </div>
          <div className="mb-3 grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-lg font-bold text-foreground">{b.published}</p>
              <p className="text-[10px] text-muted-foreground">Published</p>
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">{formatViews(b.views)}</p>
              <p className="text-[10px] text-muted-foreground">Views</p>
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">{b.rate}%</p>
              <p className="text-[10px] text-muted-foreground">Publish Rate</p>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>Publish Rate</span>
              <span>{b.rate}%</span>
            </div>
            <Progress value={b.rate} className="h-1.5" />
          </div>
        </div>
      </DashboardCard>
    </div>
  );
}

const MARCH_DATA = {
  brands: {
    'Maven Jobs': { total: 16, successful: 16, unsuccessful: 0, rate: 100, reach: 900 },
    'Profit Pathshala': { total: 16, successful: 16, unsuccessful: 0, rate: 100, reach: 1000 },
    'MKS': { total: 8, successful: 3, unsuccessful: 5, rate: 38, reach: 30 },
    'Savvi': { total: 8, successful: 5, unsuccessful: 3, rate: 63, reach: 50 },
  },
  linkedin: {
    'maven-jobs': {
      'Ketan Sir': { subtitle: 'Maven', sent: 455, accepted: 455, rejected: 0, rate: 114, reach: 3500 },
    },
    'profit-pathshala': {
      'Content Account': { subtitle: 'Profit Pathshala', sent: 0, accepted: 0, rejected: 0, rate: 0, reach: 0 },
    },
    'mks': {
      'MKS Account': { subtitle: 'MKS', sent: 0, accepted: 0, rejected: 0, rate: 0, reach: 0 },
    },
    'savvi': {
      'Bhavishya Sharma': { subtitle: 'Savvi', sent: 140, accepted: 140, rejected: 0, rate: 112, reach: 900 },
    },
  },
};

function SectionMarch() {
  const { activeCompany, activeCompanyData } = useWorkflow();
  const brandName = activeCompanyData.name;
  const brandData = MARCH_DATA.brands[brandName as keyof typeof MARCH_DATA.brands];
  const companyLinkedinData = MARCH_DATA.linkedin[activeCompany as keyof typeof MARCH_DATA.linkedin];
  const linkedinData = companyLinkedinData as Record<string, { subtitle: string; sent: number; accepted: number; rejected: number; rate: number; reach: number }>;
  const linkedinProfiles = Object.keys(linkedinData);

  if (!brandData) return null;

  return (
    <div className="space-y-6 animate-slide-up">
      <DashboardCard
        title={`March Report — ${brandName}`}
        icon={<BarChart3 className="h-4 w-4 text-primary" />}
        delay={0}
      >
        {/* Summary */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Total Posts', value: brandData.total, icon: <PenTool className="h-4 w-4" /> },
            { label: 'Successful', value: brandData.successful, icon: <CheckCircle className="h-4 w-4" /> },
            { label: 'Reach', value: `${brandData.reach}+`, icon: <Eye className="h-4 w-4" /> },
            { label: 'Success Rate', value: `${brandData.rate}%`, icon: <Activity className="h-4 w-4" /> },
          ].map(s => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-3 text-center">
              <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {s.icon}
              </div>
              <p className="text-xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Brand Card */}
        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
          <Activity className="h-4 w-4 text-primary" />
          Instagram — Post Design & Publish
        </h4>
        <div className="mb-6">
          <div className="rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md">
            <div className="mb-3 flex items-center justify-between">
              <h5 className="text-sm font-semibold text-foreground">{brandName}</h5>
              <span className="flex items-center gap-1 text-xs font-medium text-primary">
                <TrendingUp className="h-3 w-3" />
                {brandData.rate}% success
              </span>
            </div>
            <div className="mb-3 grid grid-cols-4 gap-2 text-center">
              <div>
                <p className="text-lg font-bold text-foreground">{brandData.total}</p>
                <p className="text-[10px] text-muted-foreground">Total</p>
              </div>
              <div>
                <p className="text-lg font-bold text-primary">{brandData.successful}</p>
                <p className="text-[10px] text-muted-foreground">Success</p>
              </div>
              <div>
                <p className="text-lg font-bold text-destructive">{brandData.unsuccessful}</p>
                <p className="text-[10px] text-muted-foreground">Failed</p>
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">{brandData.reach}+</p>
                <p className="text-[10px] text-muted-foreground">Reach</p>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>Success Rate</span>
                <span>{brandData.rate}%</span>
              </div>
              <Progress value={brandData.rate} className="h-1.5" />
            </div>
          </div>
        </div>

        {/* LinkedIn Connection Building */}
        {linkedinProfiles.length > 0 && (
          <>
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
              <Linkedin className="h-4 w-4 text-primary" />
              LinkedIn Connection Building
            </h4>
            <div className="mb-6 grid grid-cols-3 gap-3">
              {(() => {
                const totalSent = Object.values(linkedinData).reduce((s, p) => s + p.sent, 0);
                const totalAccepted = Object.values(linkedinData).reduce((s, p) => s + p.accepted, 0);
                const totalReach = Object.values(linkedinData).reduce((s, p) => s + p.reach, 0);
                return [
                  { label: 'Total Sent', value: `${totalSent}+`, icon: <Send className="h-4 w-4" /> },
                  { label: 'Total Accepted', value: `${totalAccepted}+`, icon: <Users className="h-4 w-4" /> },
                  { label: 'Total Reach', value: formatViews(totalReach), icon: <Eye className="h-4 w-4" /> },
                ].map(s => (
                  <div key={s.label} className="rounded-xl border border-border bg-card p-3 text-center">
                    <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {s.icon}
                    </div>
                    <p className="text-xl font-bold text-foreground">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                ));
              })()}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {linkedinProfiles.map(name => {
                const p = linkedinData[name] as { subtitle: string; sent: number; accepted: number; rejected: number; rate: number; reach: number } | undefined;
                if (!p) return null;
                return (
                  <div key={name} className="rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md">
                    <div className="mb-2 flex items-center justify-between">
                      <div>
                        <h5 className="text-sm font-semibold text-foreground">{name}</h5>
                        <p className="text-xs text-muted-foreground">{p.subtitle} Content</p>
                      </div>
                      <span className="flex items-center gap-1 text-xs font-medium text-primary">
                        <TrendingUp className="h-3 w-3" />
                        {p.rate}% accepted
                      </span>
                    </div>
                    <div className="mb-3 grid grid-cols-4 gap-2 text-center">
                      <div>
                        <p className="text-lg font-bold text-foreground">{p.sent}</p>
                        <p className="text-[10px] text-muted-foreground">Sent</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-primary">{p.accepted}</p>
                        <p className="text-[10px] text-muted-foreground">Accepted</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-destructive">{p.rejected}</p>
                        <p className="text-[10px] text-muted-foreground">Rejected</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-foreground">{formatViews(p.reach)}</p>
                        <p className="text-[10px] text-muted-foreground">Reach</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-muted-foreground">
                        <span>Acceptance Rate</span>
                        <span>{p.rate}%</span>
                      </div>
                      <Progress value={Math.min(p.rate, 100)} className="h-1.5" />
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </DashboardCard>
    </div>
  );
}

const APRIL_DATA = {
  brands: {
    'Maven Jobs': { target: 18, done: 4, views: 85 },
    'Profit Pathshala': { target: 10, done: 4, views: 161 },
    'MKS': { target: 10, done: 2, views: 31 },
    'Savvi': { target: 10, done: 3, views: 217 },
  },
};

function SectionApril() {
  const { activeCompanyData } = useWorkflow();
  const brandName = activeCompanyData.name;
  const b = APRIL_DATA.brands[brandName as keyof typeof APRIL_DATA.brands];

  if (!b) return null;

  const rate = b.target > 0 ? Math.round((b.done / b.target) * 100) : 0;

  return (
    <div className="space-y-6 animate-slide-up">
      <DashboardCard
        title={`April Report — ${brandName}`}
        icon={<BarChart3 className="h-4 w-4 text-primary" />}
        delay={0}
      >
        {/* Overall Progress */}
        <div className="mb-6 rounded-xl border border-border bg-card p-4">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">{brandName} — April Progress</span>
            </div>
            <span className="text-sm font-bold text-primary">{b.done}/{b.target} Done</span>
          </div>
          <Progress value={rate} className="h-2.5" />
          <p className="mt-1.5 text-xs text-muted-foreground">Week 1 — {b.done} of {b.target} posts done ({rate}%)</p>
        </div>

        {/* Summary Stats */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Target', value: b.target, icon: <PenTool className="h-4 w-4" /> },
            { label: 'Done', value: b.done, icon: <CheckCircle className="h-4 w-4" /> },
            { label: 'Views', value: `${b.views}+`, icon: <Eye className="h-4 w-4" /> },
            { label: 'Completion', value: `${rate}%`, icon: <TrendingUp className="h-4 w-4" /> },
          ].map(s => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-3 text-center">
              <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {s.icon}
              </div>
              <p className="text-xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Brand Card */}
        <div className="rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md">
          <div className="mb-3 flex items-center justify-between">
            <h5 className="text-sm font-semibold text-foreground">{brandName}</h5>
            <span className="flex items-center gap-1 text-xs font-medium text-primary">
              <TrendingUp className="h-3 w-3" />
              {rate}%
            </span>
          </div>
          <div className="mb-3 grid grid-cols-4 gap-2 text-center">
            <div>
              <p className="text-lg font-bold text-foreground">{b.target}</p>
              <p className="text-[10px] text-muted-foreground">Target</p>
            </div>
            <div>
              <p className="text-lg font-bold text-primary">{b.done}</p>
              <p className="text-[10px] text-muted-foreground">Done</p>
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">{b.target - b.done}</p>
              <p className="text-[10px] text-muted-foreground">Remaining</p>
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">{b.views}+</p>
              <p className="text-[10px] text-muted-foreground">Views</p>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>Progress</span>
              <span>{b.done}/{b.target} ({rate}%)</span>
            </div>
            <Progress value={rate} className="h-1.5" />
          </div>
        </div>
      </DashboardCard>
    </div>
  );
}

const APRIL_PROJECTION: Record<string, { viewTarget: number; likesMin: number; likesMax: number }> = {
  'Maven Jobs': { viewTarget: 5000, likesMin: 100, likesMax: 200 },
  'Profit Pathshala': { viewTarget: 2500, likesMin: 0, likesMax: 0 },
  'MKS': { viewTarget: 2500, likesMin: 0, likesMax: 0 },
  'Savvi': { viewTarget: 2500, likesMin: 0, likesMax: 0 },
};

function SectionAprilProjection() {
  const { activeCompanyData } = useWorkflow();
  const brandName = activeCompanyData.name;
  const d = APRIL_PROJECTION[brandName];

  if (!d) return null;

  const daysInApril = 30;
  const dailyViews = Math.round(d.viewTarget / daysInApril);
  const dailyLikesMin = d.likesMin > 0 ? Math.round(d.likesMin / daysInApril) : 0;
  const dailyLikesMax = d.likesMax > 0 ? Math.round(d.likesMax / daysInApril) : 0;

  return (
    <div className="space-y-6 animate-slide-up">
      <DashboardCard
        title={`April Projection — ${brandName}`}
        icon={<BarChart3 className="h-4 w-4 text-primary" />}
        delay={0}
      >
        {/* Summary */}
        <div className="mb-6 rounded-xl border border-border bg-card p-5">
          <h4 className="mb-3 text-sm font-semibold text-foreground">🎯 {brandName} — April Targets</h4>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { label: 'View Target', value: `${(d.viewTarget / 1000).toFixed(1)}K`, icon: <Eye className="h-4 w-4" /> },
              { label: 'Daily View Goal', value: `${dailyViews}`, icon: <TrendingUp className="h-4 w-4" /> },
              { label: 'Days in April', value: daysInApril, icon: <Activity className="h-4 w-4" /> },
            ].map(s => (
              <div key={s.label} className="rounded-xl border border-border bg-card p-3 text-center">
                <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {s.icon}
                </div>
                <p className="text-xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Detail Card */}
        <div className="rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md">
          <div className="mb-3 flex items-center justify-between">
            <h5 className="text-sm font-semibold text-foreground">{brandName}</h5>
            <span className="rounded-lg px-2 py-0.5 text-xs font-medium" style={{ backgroundColor: `${BRAND_COLORS[brandName]}20`, color: BRAND_COLORS[brandName] }}>
              {formatViews(d.viewTarget)} target
            </span>
          </div>
          <div className={`mb-3 grid ${d.likesMin > 0 ? 'grid-cols-4' : 'grid-cols-2'} gap-2 text-center`}>
            <div>
              <p className="text-lg font-bold text-foreground">{formatViews(d.viewTarget)}</p>
              <p className="text-[10px] text-muted-foreground">Monthly Views</p>
            </div>
            <div>
              <p className="text-lg font-bold text-primary">{dailyViews}</p>
              <p className="text-[10px] text-muted-foreground">Daily Views</p>
            </div>
            {d.likesMin > 0 && (
              <>
                <div>
                  <p className="text-lg font-bold text-foreground">{d.likesMin}-{d.likesMax}</p>
                  <p className="text-[10px] text-muted-foreground">Monthly Likes</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-primary">{dailyLikesMin}-{dailyLikesMax}</p>
                  <p className="text-[10px] text-muted-foreground">Daily Likes</p>
                </div>
              </>
            )}
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>Monthly Progress</span>
              <span>2% completed</span>
            </div>
            <Progress value={2} className="h-1.5" />
          </div>
        </div>
      </DashboardCard>
    </div>
  );
}

export default function AnalyticsSection() {
  const { analyticsPeriod, activeCompany, activeCompanyData } = useWorkflow();

  if (!analyticsPeriod) return null;
  if (analyticsPeriod === '90d') return <Section90d />;
  if (analyticsPeriod === 'april') return <SectionApril />;
  if (analyticsPeriod === 'april-projection') return <SectionAprilProjection />;
  if (analyticsPeriod === 'march') return <SectionMarch />;

  const period = analyticsPeriod as '7d' | '30d';
  const brandName = activeCompanyData.name;
  const brandStats = DATA[period][brandName];

  if (!brandStats) return null;

  const linkedinAccounts = LINKEDIN[period][activeCompany] || [];

  return (
    <div className="space-y-6 animate-slide-up">
      <DashboardCard
        title={`${period === '7d' ? 'Last 7 Days' : 'Feb Report'} — ${brandName}`}
        icon={<BarChart3 className="h-4 w-4 text-primary" />}
        delay={0}
      >
        {/* Total Tasks This Week - only for 7d */}
        {period === '7d' && (
          <div className="mb-6 rounded-xl border border-border bg-card p-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">{brandName} — Tasks This Week</span>
              </div>
              <span className="text-sm font-bold text-primary">{brandStats.designed}/{brandStats.designed} Done ✅</span>
            </div>
            <Progress value={100} className="h-2.5" />
            <p className="mt-1.5 text-xs text-muted-foreground">All {brandStats.designed} tasks completed — Great work! 🎉</p>
          </div>
        )}

        {/* Summary Stats */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Designed', value: brandStats.designed, icon: <PenTool className="h-4 w-4" /> },
            { label: 'Published', value: brandStats.published, icon: <Send className="h-4 w-4" /> },
            { label: 'Views', value: `${brandStats.views}+`, icon: <Eye className="h-4 w-4" /> },
            { label: 'Publish Rate', value: `${brandStats.designed > 0 ? Math.round((brandStats.published / brandStats.designed) * 100) : 0}%`, icon: <Activity className="h-4 w-4" /> },
          ].map(s => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-3 text-center">
              <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {s.icon}
              </div>
              <p className="text-xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Brand Card */}
        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
          <Activity className="h-4 w-4 text-primary" />
          Instagram Analytics — {brandName}
        </h4>
        <div className="mb-6">
          <div className="rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md">
            <div className="mb-3 flex items-center justify-between">
              <h5 className="text-sm font-semibold text-foreground">{brandName}</h5>
              <span className="flex items-center gap-1 text-xs font-medium text-primary">
                <TrendingUp className="h-3 w-3" />
                {brandStats.designed > 0 ? Math.round((brandStats.published / brandStats.designed) * 100) : 0}% rate
              </span>
            </div>
            <div className={`mb-3 grid ${brandStats.target ? 'grid-cols-4' : 'grid-cols-3'} gap-2 text-center`}>
              {brandStats.target && (
                <div>
                  <p className="text-lg font-bold text-foreground">{brandStats.target}</p>
                  <p className="text-[10px] text-muted-foreground">Target</p>
                </div>
              )}
              <div>
                <p className="text-lg font-bold text-foreground">{brandStats.designed}</p>
                <p className="text-[10px] text-muted-foreground">Designed</p>
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">{brandStats.published}</p>
                <p className="text-[10px] text-muted-foreground">Published</p>
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">{brandStats.views}+</p>
                <p className="text-[10px] text-muted-foreground">Views</p>
              </div>
            </div>
            {brandStats.target && (
              <div className="mb-2 space-y-1">
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>Target Achieved</span>
                  <span>{brandStats.published}/{brandStats.target} ({Math.round((brandStats.published / brandStats.target) * 100)}%)</span>
                </div>
                <Progress value={Math.round((brandStats.published / brandStats.target) * 100)} className="h-1.5" />
              </div>
            )}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>Publish Rate</span>
                <span>{brandStats.designed > 0 ? Math.round((brandStats.published / brandStats.designed) * 100) : 0}%</span>
              </div>
              <Progress value={brandStats.designed > 0 ? Math.round((brandStats.published / brandStats.designed) * 100) : 0} className="h-1.5" />
            </div>
          </div>
        </div>

        {/* LinkedIn Performance */}
        {linkedinAccounts.length > 0 && linkedinAccounts.some(a => a.posts > 0) && (
          <>
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
              <Linkedin className="h-4 w-4 text-primary" />
              LinkedIn Performance — {brandName}
            </h4>
            <div className="mb-6 grid grid-cols-3 gap-3">
              {(() => {
                const totalPosts = linkedinAccounts.reduce((s, p) => s + p.posts, 0);
                const totalViews = linkedinAccounts.reduce((s, p) => s + p.views, 0);
                const totalConnections = linkedinAccounts.reduce((s, p) => s + (p.connections || 0), 0);
                return [
                  { label: 'Posts', value: String(totalPosts), icon: <Send className="h-4 w-4" /> },
                  { label: 'Views', value: `${totalViews}+`, icon: <Eye className="h-4 w-4" /> },
                  { label: 'Connections', value: `${totalConnections}+`, icon: <Linkedin className="h-4 w-4" /> },
                ].map(s => (
                  <div key={s.label} className="rounded-xl border border-border bg-card p-3 text-center">
                    <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {s.icon}
                    </div>
                    <p className="text-xl font-bold text-foreground">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                ));
              })()}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {linkedinAccounts.filter(p => p.posts > 0).map(person => (
                <div key={person.name} className="rounded-xl border border-border bg-card p-4">
                  <h5 className="text-sm font-semibold text-foreground">{person.name}</h5>
                  <p className="mb-2 text-xs text-muted-foreground">{person.subtitle}</p>
                  <div className="flex gap-4">
                    {person.connections && (
                      <div>
                        <p className="text-lg font-bold text-foreground">{person.connections}+</p>
                        <p className="text-[10px] text-muted-foreground">Connections</p>
                      </div>
                    )}
                    <div>
                      <p className="text-lg font-bold text-foreground">{person.posts}</p>
                      <p className="text-[10px] text-muted-foreground">Posts</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-foreground">{person.views}+</p>
                      <p className="text-[10px] text-muted-foreground">Views</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </DashboardCard>
    </div>
  );
}
