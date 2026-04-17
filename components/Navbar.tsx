import { useWorkflow, COMPANIES } from '@/context/WorkflowContext';
import { Settings, Clock, Sun, Moon, BarChart3, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const { activeCompanyData, setActiveCompany, activeCompany, adminMode, toggleAdminMode, themeMode, setThemeMode, analyticsPeriod, setAnalyticsPeriod } = useWorkflow();
  const [time, setTime] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
const [user, setUser] = useState<{
  email?: string;
  name?: string;
} | null>(null);
const [mounted, setMounted] = useState(false);
useEffect(() => {
  setMounted(true);

  const storedUser = localStorage.getItem("smm_user");
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
}, []);

// logout
const handleLogout = () => {
  localStorage.removeItem("smm_user");
  window.location.href = "/login";
};

if (!mounted) return null;
  return (
    <nav className="glass-card sticky top-0 z-50 mx-4 mt-4 px-4 py-3 sm:px-6">
      <div className="flex items-center justify-between">
        {/* Left: Back + Logo + Brand */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            title="Back to Home"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <img src={activeCompanyData.logo} alt={activeCompanyData.name} className="h-9 w-9 rounded-lg object-contain" />
          <span className="hidden font-display text-sm font-semibold text-foreground sm:block">
            Social Media Marketing
          </span>
        </div>

        {/* Center: Company Switcher */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 rounded-xl border border-border bg-secondary px-4 py-2 font-display text-sm font-semibold text-foreground transition-all hover:border-primary/30"
          >
            <img src={activeCompanyData.logo} alt="" className="h-5 w-5 object-contain" />
            <span>{activeCompanyData.name}</span>
            <svg className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {open && (
            <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 rounded-xl border border-border bg-card p-1 shadow-lg animate-fade-in min-w-[200px]">
              {COMPANIES.map(c => (
                <button
                  key={c.id}
                  onClick={() => { setActiveCompany(c.id); setOpen(false); }}
                  className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-left text-sm transition-colors ${
                    c.id === activeCompany ? 'bg-primary/10 text-primary font-semibold' : 'text-foreground hover:bg-secondary'
                  }`}
                >
                  <img src={c.logo} alt="" className="h-5 w-5 object-contain" />
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Time + Theme + Admin + Profile */}
        <div className="flex items-center gap-2">
          {/* <div className="hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex">
            <Clock className="h-3.5 w-3.5" />
            <span>{time.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
            <span className="font-mono">{time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
          </div> */}
          <button
            onClick={() => setThemeMode(themeMode === 'blue' ? 'dark' : 'blue')}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary"
            title={`Switch to ${themeMode === 'blue' ? 'Dark' : 'Blue'} theme`}
          >
            {themeMode === 'blue' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
          <button
            onClick={toggleAdminMode}
            className={`rounded-lg p-2 transition-colors ${adminMode ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary'}`}
            title={adminMode ? 'Admin Mode ON' : 'Admin Mode OFF'}
          >
            <Settings className="h-4 w-4" />
          </button>
          <div className="relative">
 {mounted && (
  <button  onClick={() => setProfileOpen(!profileOpen)} className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
    {user?.name?.charAt(0)?.toUpperCase() ||
      user?.email?.charAt(0)?.toUpperCase() ||
      "U"}
  </button>
)}

  {profileOpen && (
    <div className="absolute right-0 mt-2 w-56 rounded-xl border border-border bg-card shadow-lg p-2">

      {/* 👤 Name */}
      <div className="px-3 py-2 text-sm font-semibold text-foreground">
        {user?.name || "User"}
      </div>

      {/* 📧 Email */}
      <div className="px-3 pb-2 text-xs text-muted-foreground border-b border-border">
        {user?.email || "No email"}
      </div>

      {/* 🚪 Logout */}
      <button
        onClick={handleLogout}
        className="mt-1 w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-secondary rounded-lg"
      >
        Logout
      </button>
    </div>
  )}
</div>
        </div>
      </div>

      {/* Analytics Toggle Buttons - second row */}
      <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
        <BarChart3 className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs font-medium text-muted-foreground">Analytics:</span>
        <button
          onClick={() => setAnalyticsPeriod('7d')}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
            analyticsPeriod === '7d'
              ? 'brand-gradient text-primary-foreground shadow-md'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
        >
          Last 7 Days
        </button>
        <button
          onClick={() => setAnalyticsPeriod('april')}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
            analyticsPeriod === 'april'
              ? 'brand-gradient text-primary-foreground shadow-md'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
        >
          April Report
        </button>
        <button
          onClick={() => setAnalyticsPeriod('april-projection')}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
            analyticsPeriod === 'april-projection'
              ? 'brand-gradient text-primary-foreground shadow-md'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
        >
          April Projection
        </button>
        <button
          onClick={() => setAnalyticsPeriod('march')}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
            analyticsPeriod === 'march'
              ? 'brand-gradient text-primary-foreground shadow-md'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
        >
          March Report
        </button>
        <button
          onClick={() => setAnalyticsPeriod('30d')}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
            analyticsPeriod === '30d'
              ? 'brand-gradient text-primary-foreground shadow-md'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
        >
          Feb Report
        </button>
        <button
          onClick={() => setAnalyticsPeriod('90d')}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
            analyticsPeriod === '90d'
              ? 'brand-gradient text-primary-foreground shadow-md'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
        >
          Nov - Jan Report
        </button>
        {analyticsPeriod && (
          <span className="ml-auto text-[10px] text-muted-foreground">Click again to close</span>
        )}
      </div>
    </nav>
  );
}
