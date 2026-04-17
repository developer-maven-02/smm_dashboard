import Head from 'next/head';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useWorkflow, COMPANIES, CompanyId, ThemeMode, AnalyticsPeriod, COMPANY_NAME_TO_ID } from '@/context/WorkflowContext';
import { Settings, Clock, Sun, Moon, BarChart3, ArrowLeft, PenTool, CalendarDays, Sparkles, FileSpreadsheet, Bot, Cpu, Search, Palette, Bookmark, FolderOpen, MessageSquare, Send, ClipboardCheck, CheckCircle, Instagram, Facebook, Twitter, Image, Linkedin, Share2, RotateCcw, Target, FileText, Megaphone, StickyNote, Activity, TrendingUp, Eye, Users, Award, Briefcase, Layout, Globe, CheckSquare as CheckSquareIcon, Linkedin as LinkedInIcon, BarChart, Filter, X, Video, Play } from 'lucide-react';
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1COfJb6dZVkpcaIWqu7tdMYHKLuYkLdJv01tbCPMVaRY/edit?gid=1607619286#gid=1607619286';

export default function Dashboard() {
  return <DashboardContent />;
}

function DashboardContent() {
  const { analyticsPeriod, activeCompany, activeCompanyData, adminMode, toggleAdminMode, themeMode, setThemeMode, setAnalyticsPeriod, links, activeCompany: companyId, setActiveCompany, currentNotes, setNotes, currentChecklist, toggleChecklist, resetChecklist } = useWorkflow();
  const [time, setTime] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState<{ email?: string; name?: string } | null>(null);
  const [mounted, setMounted] = useState(false);
    const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  // Date filter state - pending (input values before apply)
  const [pendingStartDate, setPendingStartDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return date.toISOString().split('T')[0];
  });
  const [pendingEndDate, setPendingEndDate] = useState(() => new Date().toISOString().split('T')[0]);
  
  // Applied dates (trigger API calls only when Apply is clicked)
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return date.toISOString().split('T')[0];
  });
  const [endDate, setEndDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [showDateFilter, setShowDateFilter] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedUser = localStorage.getItem("smm_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-company', 'maven-jobs');
    document.documentElement.setAttribute('data-theme', 'blue');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("smm_user");
    window.location.href = "/login";
  };

  const handleApplyDateFilter = () => {
    if (pendingStartDate && pendingEndDate) {
      // Apply the pending dates - this triggers API calls
      setStartDate(pendingStartDate);
      setEndDate(pendingEndDate);
      setAnalyticsPeriod({ start: pendingStartDate, end: pendingEndDate });
      setShowDateFilter(false);
    }
  };

  const handleClearFilter = () => {
    setAnalyticsPeriod(null);
    const defaultStart = (() => {
      const date = new Date();
      date.setDate(date.getDate() - 7);
      return date.toISOString().split('T')[0];
    })();
    const defaultEnd = new Date().toISOString().split('T')[0];
    
    setStartDate(defaultStart);
    setEndDate(defaultEnd);
    setPendingStartDate(defaultStart);
    setPendingEndDate(defaultEnd);
  };

  if (!mounted) return null;

  const companyLinks = links[activeCompany];

  return (
    <>
      <Head>
        <title>Dashboard - Social Media Marketing</title>
      </Head>
      <div className="dashboard-bg transition-colors duration-500">
        <nav className="glass-card sticky top-0 z-50 mx-4 mt-4 px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href="/" className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground" title="Back to Home">
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <img src={activeCompanyData.logo} alt={activeCompanyData.name} className="h-9 w-9 rounded-lg object-contain" />
              <span className="hidden font-display text-sm font-semibold text-foreground sm:block">Social Media Marketing</span>
            </div>

            <div className="relative">
              <button onClick={() => setOpen(!open)} className="flex items-center gap-2 rounded-xl border border-border bg-secondary px-4 py-2 font-display text-sm font-semibold text-foreground transition-all hover:border-primary/30">
                <img src={activeCompanyData.logo} alt="" className="h-5 w-5 object-contain" />
                <span>{activeCompanyData.name}</span>
                <svg className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {open && (
                <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 rounded-xl border border-border bg-card p-1 shadow-lg animate-fade-in min-w-[200px]">
                  {COMPANIES.map(c => (
                    <button key={c.id} onClick={() => { setActiveCompany(c.id); setOpen(false); }} className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-left text-sm transition-colors ${c.id === activeCompany ? 'bg-primary/10 text-primary font-semibold' : 'text-foreground hover:bg-secondary'}`}>
                      <img src={c.logo} alt="" className="h-5 w-5 object-contain" />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => setThemeMode(themeMode === 'blue' ? 'dark' : 'blue')} className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary" title={`Switch to ${themeMode === 'blue' ? 'Dark' : 'Blue'} theme`}>
                {themeMode === 'blue' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </button>
              <button onClick={toggleAdminMode} className={`rounded-lg p-2 transition-colors ${adminMode ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary'}`} title={adminMode ? 'Admin Mode ON' : 'Admin Mode OFF'}>
                <Settings className="h-4 w-4" />
              </button>
              <div className="relative">
                <button onClick={() => setProfileOpen(!profileOpen)} className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || "U"}
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl border border-border bg-card shadow-lg p-2">
                    <div className="px-3 py-2 text-sm font-semibold text-foreground">{user?.name || "User"}</div>
                    <div className="px-3 pb-2 text-xs text-muted-foreground border-b border-border">{user?.email || "No email"}</div>
                    <button onClick={handleLogout} className="mt-1 w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-secondary rounded-lg">Logout</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Date Range Filter - Replaces Analytics Buttons */}
          {/* Date Range Filter - Apply button only */}
<div className="mt-3 flex flex-wrap items-center gap-3 border-t border-border pt-3">
  <div className="flex items-center gap-2">
    <CalendarDays className="h-4 w-4 text-muted-foreground" />
    <span className="text-xs font-medium text-muted-foreground">Date Range:</span>
  </div>
  
  <div className="flex flex-wrap items-center gap-2">
    <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-1.5">
      <span className="text-xs text-muted-foreground">From</span>
      <input
        type="date"
        value={pendingStartDate}
        onChange={(e) => setPendingStartDate(e.target.value)}
        className="bg-transparent text-xs font-medium text-foreground outline-none"
      />
    </div>
    <span className="text-xs text-muted-foreground">→</span>
    <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-1.5">
      <span className="text-xs text-muted-foreground">To</span>
      <input
        type="date"
        value={pendingEndDate}
        onChange={(e) => setPendingEndDate(e.target.value)}
        className="bg-transparent text-xs font-medium text-foreground outline-none"
      />
    </div>
    <button
      onClick={handleApplyDateFilter}
      className="rounded-lg bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground transition-all hover:bg-primary/90 flex items-center gap-1"
    >
      <Filter className="h-3 w-3" />
      Apply
    </button>
    {analyticsPeriod && (
      <button
        onClick={handleClearFilter}
        className="rounded-lg border border-border bg-secondary px-4 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:bg-secondary/80 flex items-center gap-1"
      >
        <X className="h-3 w-3" />
        Clear
      </button>
    )}
  </div>
  
  {analyticsPeriod && (
    <div className="ml-auto flex items-center gap-2">
      <div className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
        <span className="flex items-center gap-1">
          <CalendarDays className="h-3 w-3" />
          {formatDate(startDate)} → {formatDate(endDate)}
        </span>
      </div>
    </div>
  )}
</div>
        </nav>

        <main className="mx-auto max-w-6xl px-4 py-8 space-y-6">
         
            <>
              <InstagramProfileSection startDate={startDate} endDate={endDate} />
              <InstagramPostAnalyticsSection startDate={startDate} endDate={endDate} />
              <QuickActions />
              <TotalProgressSection startDate={startDate} endDate={endDate} />
              <ContentSheetSection />
              <div className="grid gap-6 md:grid-cols-2">
                <AIToolsSection links={companyLinks} adminMode={adminMode} activeCompany={activeCompany} />
                <DesignSection links={companyLinks} adminMode={adminMode} activeCompany={activeCompany} />
                <ReviewSection links={companyLinks} adminMode={adminMode} activeCompany={activeCompany} />
                <PublishSection links={companyLinks} adminMode={adminMode} activeCompany={activeCompany} />
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <ChecklistSection activeCompanyData={activeCompanyData} currentChecklist={currentChecklist} toggleChecklist={toggleChecklist} resetChecklist={resetChecklist} />
                <NotesSection activeCompanyData={activeCompanyData} currentNotes={currentNotes} setNotes={setNotes} />
              </div>
            </>
       
        </main>

        <footer className="py-8 text-center text-xs text-muted-foreground">
          <span className="brand-gradient-text font-semibold">Social Media Marketing</span> · Dashboard v2.0
        </footer>
      </div>
    </>
  );
}

// Date Range Header Component for Analytics
function DateRangeHeader({ startDate, endDate }: { startDate: string; endDate: string }) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };
  return (
    <div className="mb-4 flex items-center justify-between rounded-xl border border-border/50 bg-gradient-to-r from-primary/5 to-transparent px-4 py-2">
      <div className="flex items-center gap-2">
        <CalendarDays className="h-4 w-4 text-primary" />
        <span className="text-sm font-medium text-foreground">Analytics Period:</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <span className="rounded-lg bg-secondary px-3 py-1 font-mono text-xs font-semibold text-foreground">
          {formatDate(startDate)}
        </span>
        <span className="text-muted-foreground">→</span>
        <span className="rounded-lg bg-secondary px-3 py-1 font-mono text-xs font-semibold text-foreground">
            {formatDate(endDate)}
        </span>
      </div>
    </div>
  );
}

function InstagramProfileSection({ startDate, endDate }: { startDate: string; endDate: string }) {
  const { activeCompanyData } = useWorkflow();
  const igUserId = activeCompanyData?.igUserId;

  const [profile, setProfile] = useState({
    username: "",
    profileImage: "",
    posts: 0,
    followers: 0,
    following: 0,
    bio: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!igUserId) return;

    const fetchInstagramProfile = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/meta/profile?ig_user_id=${igUserId}`);
        const data = await res.json();

        if (data.success) {
          setProfile({
            username: data.username,
            profileImage: data.profile_picture_url,
            posts: data.media_count,
            followers: data.followers_count,
            following: data.follows_count,
            bio: data.biography || "",
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramProfile();
  }, [igUserId]);

  if (loading) {
    return (
      <div className="mx-4 mt-4 p-5 rounded-2xl border bg-card">
        <p className="text-sm text-muted-foreground">Loading Instagram profile...</p>
      </div>
    );
  }

  return (
    <div className="mx-4 mt-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center gap-5">
        <img
          src={profile.profileImage || "/default-avatar.png"}
          alt="profile"
          className="h-20 w-20 rounded-full object-cover border"
        />

        <div className="flex-1">
          <h2 className="text-lg font-semibold text-foreground mb-2">
            {profile.username}
          </h2>

          <div className="flex gap-6 text-sm">
            <div>
              <p className="font-bold">{profile.posts}</p>
              <p className="text-muted-foreground">Posts</p>
            </div>

            <div>
              <p className="font-bold">{profile.followers}</p>
              <p className="text-muted-foreground">Followers</p>
            </div>

            <div>
              <p className="font-bold">{profile.following}</p>
              <p className="text-muted-foreground">Following</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InstagramPostAnalyticsSection({ startDate, endDate }: { startDate: string; endDate: string }) {
  const { activeCompanyData } = useWorkflow();
  const igUserId = activeCompanyData?.igUserId;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    totalPosts: 0,
    totalViews: 0,
    posts: [] as any[],
  });

  const fetchData = async () => {
    if (!igUserId) return;

    try {
      setLoading(true);

      const res = await fetch(
        `/api/meta/post?ig_user_id=${igUserId}&since=${startDate}&until=${endDate}`
      );

      const json = await res.json();
     
      if (json.success) {
        setData({
          totalPosts: json.totalPosts,
          totalViews: json.totalViews,
          posts: json.posts || [],
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  function formatNumber(num: number) {
  if (!num) return "0";

  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }

  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  }

  return num.toString();
}

  useEffect(() => {
    fetchData();
  }, [igUserId ,startDate, endDate]);

  return (
    <div className="section-card">
      <div className="mb-4 flex items-center justify-between">
  
  {/* LEFT TITLE */}
  <h3 className="text-base font-semibold flex items-center gap-2">
    📸 Instagram Analytics
  </h3>

  {/* RIGHT DATE RANGE */}
  <div className="flex items-center gap-2 rounded-lg bg-secondary/30 px-3 py-1.5">
    
    <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />

    <span className="text-xs text-muted-foreground">
      {startDate}
    </span>

    <span className="text-muted-foreground">→</span>

    <span className="text-xs font-medium text-foreground">
      {endDate}
    </span>

  </div>
</div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        

        <StatStrip icon={<PenTool className="h-4 w-4" />} label="Total Designed" value='123' color="hsl(217 91% 50%)" />
        <StatStrip icon={<Send className="h-4 w-4" />} label="Total Published" value={data.totalPosts.toString()} color="hsl(152 60% 42%)" />
        <StatStrip icon={<Clock className="h-4 w-4" />} label="Pending" value='0' color="hsl(40 85% 52%)" />
        <StatStrip icon={<Eye className="h-4 w-4" />} label="Engagement" value={data.totalViews.toString()} color="hsl(270 70% 55%)" />
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-sm text-muted-foreground">Loading posts...</p>
      )}

      {/* Empty State */}
      {!loading && data.posts.length === 0 && (
        <div className="text-center text-sm text-muted-foreground py-10">
          No posts found for selected dates 📭
        </div>
      )}

{/* Instagram Grid */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  {data.posts.map((post: any) => {
    const isVideo = post.media_type === 'VIDEO' || post.media_type === 'REELS';
    const isCarousel = post.media_type === 'CAROUSEL_ALBUM';
    
    // Use thumbnail_url if available, otherwise use media_url
    const displayImage = post.thumbnail_url || post.media_url;
    
    return (
<div
  key={post.id}
  onClick={() => window.open(post.permalink, "_blank")}
  className="rounded-2xl overflow-hidden bg-white shadow-md cursor-pointer"
>

  {/* IMAGE ONLY */}
  <div className="relative">
    <img
      src={displayImage}
      alt={post.caption || "Instagram post"}
      className="w-full h-56 object-cover"
      onError={(e) => {
        e.currentTarget.src = "/placeholder-image.png";
      }}
    />

    {/* MEDIA BADGE */}
    <div className="absolute top-2 right-2 bg-black/70 text-white text-[10px] px-2 py-1 rounded-full">
      {isVideo ? "Video" : isCarousel ? "Carousel" : "Post"}
    </div>
  </div>

  {/* BOTTOM DETAILS SECTION */}
  <div className="p-3 space-y-2">

    {/* VIEWS */}
<div className="text-xs font-semibold space-y-1">

  {/* TOP: Metrics */}
 <div className="flex gap-3 flex-wrap text-xs">

  <span title="Views">
    👁 {formatNumber(post.views || 0)}
  </span>

  <span title="Reach">
    📊 {formatNumber(post.reach || 0)}
  </span>

  <span title="Likes">
    ❤️ {formatNumber(post.likes || 0)}
  </span>

  <span title="Shares">
    🔁 {formatNumber(post.shares || 0)}
  </span>

</div>

 

</div>

    {/* CAPTION */}
    <p className="text-sm text-gray-700 line-clamp-2">
      {post.caption || "No caption"}
    </p>
 
    {/* TYPE INFO */}
    <div className="text-xs text-gray-500">
      {isVideo && "🎥 Video Post"}
      {isCarousel && `📸 ${post.children?.length || 0} slides`}
    </div>
{/* BOTTOM: Date (left aligned) */}
  <div className="text-gray-500 text-xs font-semibold">
    {new Date(post.timestamp).toLocaleDateString("en-GB")}
  </div>
  </div>
</div>
    );
  })}
</div>
    </div>
  );
}

function QuickActions() {
  const actions = [
    { label: 'Create Post', icon: PenTool, href: 'https://www.canva.com/', color: 'hsl(152 60% 42%)' },
    { label: 'Open Calendar', icon: CalendarDays, href: SHEET_URL, color: 'hsl(217 91% 50%)' },
    { label: 'Generate Content', icon: Sparkles, href: 'https://chat.openai.com/', color: 'hsl(270 70% 55%)' },
    { label: 'Master Sheet', icon: FileSpreadsheet, href: SHEET_URL, color: 'hsl(40 85% 52%)' },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 animate-slide-up" style={{ animationDelay: '50ms', animationFillMode: 'both' }}>
      {actions.map((a) => (
        <a key={a.label} href={a.href} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2.5 rounded-2xl border border-border/50 bg-card p-4 transition-all duration-300 hover:scale-[1.04] hover:shadow-lg hover:border-primary/20">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110" style={{ background: `${a.color}15` }}>
            <a.icon className="h-5 w-5" style={{ color: a.color }} />
          </span>
          <span className="text-xs font-semibold text-foreground">{a.label}</span>
        </a>
      ))}
    </div>
  );
}

function TotalProgressSection({ startDate, endDate }: { startDate: string; endDate: string }) {
  const { activeCompany, activeCompanyData } = useWorkflow();
  const igUserId = activeCompanyData?.igUserId;
  const [igStats, setIgStats] = useState({ totalPosts: 0, totalViews: 0 });

  const COMPANY_STATS: Record<CompanyId, { designed: string; published: string; pending: string; engagement: string }> = {
    'maven-jobs': { designed: '55+', published: '54', pending: '1', engagement: '5K' },
    'profit-pathshala': { designed: '75+', published: '74', pending: '1', engagement: '5.5K' },
    'mks': { designed: '20+', published: '20', pending: '1', engagement: '1K' },
    'savvi': { designed: '20+', published: '20', pending: '0', engagement: '1K' },
  };

  const LINKEDIN_DATA: Record<CompanyId, { accounts: { name: string; growth: string; from: string; to: string }[]; totalGrowth: string }> = {
    'maven-jobs': { accounts: [{ name: 'Ketan Sir', growth: '+760', from: '2,000', to: '2,760' }], totalGrowth: '760' },
    'profit-pathshala': { accounts: [{ name: 'Content Account', growth: '+200', from: '100', to: '300' }], totalGrowth: '200' },
    'mks': { accounts: [{ name: 'MKS Account', growth: '+50', from: '20', to: '70' }], totalGrowth: '50' },
    'savvi': { accounts: [{ name: 'Bhavishya Sharma', growth: '+900', from: '5', to: '900' }], totalGrowth: '900' },
  };

  useEffect(() => {
    if (!igUserId) return;
    const fetchInstagramData = async () => {
      try {
        const res = await fetch(`/api/meta/report?ig_user_id=${igUserId}&since=${startDate}&until=${endDate}`);
        const data = await res.json();
        if (data.success) {
          setIgStats({ totalPosts: data.totalPosts, totalViews: data.totalViews });
        }
      } catch (error) {
        console.error("Instagram API error:", error);
      }
    };
    fetchInstagramData();
  }, [igUserId]);

  function formatNumber(num: number) {
  if (!num) return "0";

  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }

  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  }

  return num.toString();
}

  const stats = COMPANY_STATS[activeCompany];
  const linkedin = LINKEDIN_DATA[activeCompany];

  return (
    <div className="space-y-6">
      {/* <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 animate-slide-up" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
        <StatStrip icon={<PenTool className="h-4 w-4" />} label="Total Designed" value={stats.designed} color="hsl(217 91% 50%)" />
        <StatStrip icon={<Send className="h-4 w-4" />} label="Total Published" value={igStats.totalPosts.toString()} color="hsl(152 60% 42%)" />
        <StatStrip icon={<Clock className="h-4 w-4" />} label="Pending" value={stats.pending} color="hsl(40 85% 52%)" />
        <StatStrip icon={<Eye className="h-4 w-4" />} label="Engagement" value={igStats.totalViews.toString()} color="hsl(270 70% 55%)" />
      </div> */}
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
                <TrendingUp className="h-3 w-3 text-green-500" />
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
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: `${color}15`, color }}>
        {icon}
      </span>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-xl font-bold text-foreground">{value}</p>
      </div>
    </div>
  );
}

function ContentSheetSection() {
  return (
    <DashboardCard title="Content Calendar & Master Sheet" icon={<FileSpreadsheet className="h-4 w-4 text-primary" />} delay={100}>
      <p className="mb-4 text-sm text-muted-foreground">Content Calendar · Topic Planning · Design Tracking · Publishing Status · All Workflow Steps</p>
      <a href={SHEET_URL} target="_blank" rel="noopener noreferrer" className="pill-btn brand-gradient brand-glow text-primary-foreground">
        <FileSpreadsheet className="h-4 w-4" />
        Open Master Content Sheet
      </a>
    </DashboardCard>
  );
}

function AIToolsSection({ links, adminMode, activeCompany }: { links: any; adminMode: boolean; activeCompany: CompanyId }) {
  return (
    <DashboardCard title="Generate Content with AI" icon={<Cpu className="h-4 w-4" style={{ color: 'hsl(270 70% 55%)' }} />} delay={200} accentColor="hsl(270 70% 55%)">
      <div className="flex flex-col gap-2">
        <LinkButton label="Open ChatGPT" href="https://chat.openai.com/" icon={<Bot className="h-4 w-4" style={{ color: 'hsl(270 70% 55%)' }} />} adminMode={adminMode} />
        <LinkButton label="Open Gemini" href="https://gemini.google.com/" icon={<Sparkles className="h-4 w-4" style={{ color: 'hsl(270 70% 55%)' }} />} adminMode={adminMode} />
        <LinkButton label="Open Perplexity" href="https://www.perplexity.ai/" icon={<Search className="h-4 w-4" style={{ color: 'hsl(270 70% 55%)' }} />} adminMode={adminMode} />
      </div>
    </DashboardCard>
  );
}

function DesignSection({ links, adminMode, activeCompany }: { links: any; adminMode: boolean; activeCompany: CompanyId }) {
  return (
    <DashboardCard title="Canva & Design" icon={<PenTool className="h-4 w-4" style={{ color: 'hsl(152 60% 42%)' }} />} delay={300} accentColor="hsl(152 60% 42%)">
      <div className="flex flex-col gap-2">
        <LinkButton label="Open Canva Dashboard" href={links.canvaDashboard} icon={<Palette className="h-4 w-4" style={{ color: 'hsl(152 60% 42%)' }} />} adminMode={adminMode} />
        <LinkButton label="Open Brand Kit" href={links.brandKit} icon={<Bookmark className="h-4 w-4" style={{ color: 'hsl(152 60% 42%)' }} />} adminMode={adminMode} />
        <LinkButton label="Open Design Folder" href={links.designFolder} icon={<FolderOpen className="h-4 w-4" style={{ color: 'hsl(152 60% 42%)' }} />} adminMode={adminMode} />
      </div>
    </DashboardCard>
  );
}

function ReviewSection({ links, adminMode, activeCompany }: { links: any; adminMode: boolean; activeCompany: CompanyId }) {
  return (
    <DashboardCard title="Review & Approval" icon={<CheckCircle className="h-4 w-4" style={{ color: 'hsl(40 85% 52%)' }} />} delay={400} accentColor="hsl(40 85% 52%)">
      <div className="flex flex-col gap-2">
        <LinkButton label="Open Slack" href={links.slack} icon={<MessageSquare className="h-4 w-4" style={{ color: 'hsl(40 85% 52%)' }} />} adminMode={adminMode} />
        <LinkButton label="Send for Review Template" href="#" icon={<Send className="h-4 w-4" style={{ color: 'hsl(40 85% 52%)' }} />} adminMode={adminMode} />
        <LinkButton label="Approval Tracking" href="#" icon={<ClipboardCheck className="h-4 w-4" style={{ color: 'hsl(40 85% 52%)' }} />} adminMode={adminMode} />
      </div>
    </DashboardCard>
  );
}

function PublishSection({ links, adminMode, activeCompany }: { links: any; adminMode: boolean; activeCompany: CompanyId }) {
  return (
    <DashboardCard title="Publish to Social Media" icon={<Share2 className="h-4 w-4" style={{ color: 'hsl(199 89% 48%)' }} />} delay={500} accentColor="hsl(199 89% 48%)">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <LinkButton label="Instagram" href={links.instagram} icon={<Instagram className="h-4 w-4" style={{ color: 'hsl(340 75% 55%)' }} />} adminMode={adminMode} />
        <LinkButton label="Facebook" href={links.facebook} icon={<Facebook className="h-4 w-4" style={{ color: 'hsl(220 70% 50%)' }} />} adminMode={adminMode} />
        <LinkButton label="Twitter (X)" href={links.twitter} icon={<Twitter className="h-4 w-4" style={{ color: 'hsl(199 89% 48%)' }} />} adminMode={adminMode} />
        <LinkButton label="Pinterest" href={links.pinterest} icon={<Image className="h-4 w-4" style={{ color: 'hsl(0 70% 50%)' }} />} adminMode={adminMode} />
        <LinkButton label="LinkedIn" href={links.linkedin} icon={<Linkedin className="h-4 w-4" style={{ color: 'hsl(210 80% 45%)' }} />} adminMode={adminMode} />
      </div>
    </DashboardCard>
  );
}

function ChecklistSection({ activeCompanyData, currentChecklist, toggleChecklist, resetChecklist }: { activeCompanyData: any; currentChecklist: any; toggleChecklist: any; resetChecklist: any }) {
  const ITEMS = [
    { key: 'pickTopic', label: 'Pick Topic', icon: <Target className="h-3.5 w-3.5" /> },
    { key: 'generateContent', label: 'Generate Content', icon: <Cpu className="h-3.5 w-3.5" /> },
    { key: 'designPost', label: 'Design Post', icon: <PenTool className="h-3.5 w-3.5" /> },
    { key: 'updateSheet', label: 'Update Sheet', icon: <FileText className="h-3.5 w-3.5" /> },
    { key: 'sendForReview', label: 'Send for Review', icon: <Send className="h-3.5 w-3.5" /> },
    { key: 'publish', label: 'Publish', icon: <Megaphone className="h-3.5 w-3.5" /> },
  ];
  const allDone = Object.values(currentChecklist).every(Boolean);
  const doneCount = Object.values(currentChecklist).filter(Boolean).length;

  return (
    <DashboardCard title={`Daily Checklist — ${activeCompanyData.name}`} icon={<CheckSquareIcon className="h-4 w-4 text-primary" />} delay={700}>
      <div className="mb-4 h-2 overflow-hidden rounded-full bg-secondary">
        <div className="brand-gradient h-full rounded-full transition-all duration-500" style={{ width: `${(doneCount / ITEMS.length) * 100}%` }} />
      </div>
      <div className="space-y-2">
        {ITEMS.map(item => (
          <label key={item.key} className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-2.5 text-sm transition-all ${currentChecklist[item.key] ? 'border-primary/20 bg-primary/5 text-foreground line-through opacity-70' : 'border-border bg-secondary/30 text-foreground hover:border-primary/20'}`}>
            <input type="checkbox" checked={currentChecklist[item.key]} onChange={() => toggleChecklist(item.key)} className="sr-only" />
            <div className={`flex h-5 w-5 items-center justify-center rounded-md border-2 text-xs transition-all ${currentChecklist[item.key] ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground/30'}`}>
              {currentChecklist[item.key] && '✓'}
            </div>
            <span className="text-muted-foreground">{item.icon}</span>
            <span>{item.label}</span>
          </label>
        ))}
      </div>
      {allDone && (
        <div className="mt-4 flex items-center gap-2 rounded-xl brand-gradient p-4 text-primary-foreground animate-fade-in">
          <CheckSquareIcon className="h-5 w-5" />
          <span className="font-display font-semibold">All Tasks Completed</span>
        </div>
      )}
      <button onClick={resetChecklist} className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground">
        <RotateCcw className="h-3 w-3" />
        Reset Checklist
      </button>
    </DashboardCard>
  );
}

function NotesSection({ activeCompanyData, currentNotes, setNotes }: { activeCompanyData: any; currentNotes: string; setNotes: any }) {
  return (
    <DashboardCard title={`Quick Notes — ${activeCompanyData.name}`} icon={<StickyNote className="h-4 w-4 text-primary" />} delay={800}>
      <textarea value={currentNotes} onChange={e => setNotes(e.target.value)} placeholder={`Write notes for ${activeCompanyData.name}...`} className="min-h-[120px] w-full resize-none rounded-xl border border-border bg-secondary/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/30 transition-colors" />
      <p className="mt-2 text-xs text-muted-foreground">Auto-saved · {activeCompanyData.name}</p>
    </DashboardCard>
  );
}

function LinkButton({ label, href, icon, adminMode }: { label: string; href: string; icon: React.ReactNode; adminMode?: boolean }) {
  return (
    <div className="group flex items-center gap-2">
      <a href={href || '#'} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center gap-3 rounded-2xl border border-border/50 bg-secondary/40 px-4 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 hover:shadow-md hover:scale-[1.01]">
        {icon}
        <span className="flex-1">{label}</span>
        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </div>
  );
}

const ExternalLink = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

function DashboardCard({ title, children, icon, className = '', delay = 0, accentColor }: { title: string; children: React.ReactNode; icon?: React.ReactNode; className?: string; delay?: number; accentColor?: string }) {
  return (
    <div className={`section-card hover-lift animate-slide-up ${className}`} style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}>
      <h3 className="mb-4 flex items-center gap-2.5 font-display text-base font-semibold text-foreground">
        {icon && (
          <span className="flex h-8 w-8 items-center justify-center rounded-xl" style={{ background: accentColor ? `linear-gradient(135deg, ${accentColor}20, ${accentColor}10)` : 'hsl(var(--primary) / 0.1)' }}>
            {icon}
          </span>
        )}
        {title}
      </h3>
      {children}
    </div>
  );
}

// Simplified Analytics Section - Just shows data for the selected date range
function AnalyticsSection({ startDate, endDate }: { startDate: string; endDate: string }) {
  const { activeCompany, activeCompanyData } = useWorkflow();
  const brandName = activeCompanyData.name;
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch analytics data for the selected date range
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        // Here you would fetch real data from your API
        // For now, we'll use mock data
        const mockData = {
          designed: 15,
          published: 12,
          views: 450,
          target: 15
        };
        setAnalyticsData(mockData);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [startDate, endDate, activeCompany]);

  if (loading) {
    return (
      <DashboardCard title={`Analytics — ${brandName}`} icon={<BarChart3 className="h-4 w-4 text-primary" />} delay={0}>
        <div className="text-center py-8">
          <p className="text-muted-foreground">Loading analytics data...</p>
        </div>
      </DashboardCard>
    );
  }

  if (!analyticsData) return null;

  return (
    <>
      <DateRangeHeader startDate={startDate} endDate={endDate} />
      <DashboardCard title={`Analytics Report — ${brandName}`} icon={<BarChart3 className="h-4 w-4 text-primary" />} delay={0}>
        <div className="mb-6 rounded-xl border border-border bg-card p-4">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">{brandName} — Performance Summary</span>
            </div>
            <span className="text-sm font-bold text-primary">{analyticsData.published}/{analyticsData.designed} Published</span>
          </div>
          <Progress value={(analyticsData.published / analyticsData.designed) * 100} className="h-2.5" />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Designed', value: analyticsData.designed, icon: <PenTool className="h-4 w-4" /> },
            { label: 'Published', value: analyticsData.published, icon: <Send className="h-4 w-4" /> },
            { label: 'Views', value: `${analyticsData.views}+`, icon: <Eye className="h-4 w-4" /> },
            { label: 'Publish Rate', value: `${Math.round((analyticsData.published / analyticsData.designed) * 100)}%`, icon: <Activity className="h-4 w-4" /> },
          ].map(s => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-3 text-center">
              <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">{s.icon}</div>
              <p className="text-xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </DashboardCard>
    </>
  );
}

const Progress = ({ value, className = '' }: { value: number; className?: string }) => (
  <div className={`relative overflow-hidden rounded-full bg-secondary ${className}`}>
    <div className="absolute left-0 top-0 h-full brand-gradient transition-all duration-500" style={{ width: `${value}%` }} />
  </div>
);