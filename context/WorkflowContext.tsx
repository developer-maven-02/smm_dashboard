import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { IG_ACCOUNTS } from '@/lib/instagram';
export type CompanyId = 'maven-jobs' | 'profit-pathshala' | 'mks' | 'savvi';
export type ThemeMode = 'blue' | 'dark';
export type AnalyticsPeriod = '7d' | 'march' | 'april' | 'april-projection' | '30d' | '90d' | null;

export interface Company {
  id: CompanyId;
  name: string;
  shortName: string;
  logo: string;
 igUserId: string;
}

const LOGO_MAVEN = '/logo-maven.png';
const LOGO_PP = '/logo-profit-pathshala.png';
const LOGO_MKS = '/logo-mks.png';
const LOGO_SAVVI = '/logo-savvi.png';

export const COMPANIES: Company[] = [
  {
    id: 'maven-jobs',
    name: 'Maven Jobs',
    shortName: 'MJ',
    logo: LOGO_MAVEN,
    igUserId: IG_ACCOUNTS.MAVEN,
  },
  {
    id: 'profit-pathshala',
    name: 'Profit Pathshala',
    shortName: 'PP',
    logo: LOGO_PP,
    igUserId: IG_ACCOUNTS.PP,
  },
  {
    id: 'mks',
    name: 'MKS',
    shortName: 'MKS',
    logo: LOGO_MKS,
    igUserId: IG_ACCOUNTS.MKS,
  },
  {
    id: 'savvi',
    name: 'Savvi',
    shortName: 'SV',
    logo: LOGO_SAVVI,
    igUserId: IG_ACCOUNTS.SAVVI,
  },
];

export const COMPANY_NAME_TO_ID: Record<string, CompanyId> = {
  'Maven Jobs': 'maven-jobs',
  'Profit Pathshala': 'profit-pathshala',
  'MKS': 'mks',
  'Savvi': 'savvi',
};

export interface CompanyLinks {
  canvaDashboard: string;
  brandKit: string;
  designFolder: string;
  slack: string;
  instagram: string;
  facebook: string;
  twitter: string;
  pinterest: string;
  linkedin: string;
}

const DEFAULT_LINKS: CompanyLinks = {
  canvaDashboard: 'https://www.canva.com/',
  brandKit: 'https://www.canva.com/brand/',
  designFolder: '',
  slack: 'https://slack.com/',
  instagram: 'https://www.instagram.com/',
  facebook: 'https://www.facebook.com/',
  twitter: 'https://x.com/',
  pinterest: 'https://www.pinterest.com/',
  linkedin: 'https://www.linkedin.com/',
};

export interface ChecklistState {
  pickTopic: boolean;
  generateContent: boolean;
  designPost: boolean;
  updateSheet: boolean;
  sendForReview: boolean;
  publish: boolean;
}

const DEFAULT_CHECKLIST: ChecklistState = {
  pickTopic: false,
  generateContent: false,
  designPost: false,
  updateSheet: false,
  sendForReview: false,
  publish: false,
};

interface WorkflowState {
  activeCompany: CompanyId;
  adminMode: boolean;
  themeMode: ThemeMode;
  analyticsPeriod: AnalyticsPeriod;
  links: Record<CompanyId, CompanyLinks>;
  notes: Record<CompanyId, string>;
  checklist: Record<CompanyId, ChecklistState>;
}

interface WorkflowContextType extends WorkflowState {
  setActiveCompany: (id: CompanyId) => void;
  toggleAdminMode: () => void;
  setThemeMode: (mode: ThemeMode) => void;
  setAnalyticsPeriod: (period: AnalyticsPeriod) => void;
  updateLink: (company: CompanyId, key: keyof CompanyLinks, value: string) => void;
  setNotes: (notes: string) => void;
  toggleChecklist: (key: keyof ChecklistState) => void;
  resetChecklist: () => void;
  activeCompanyData: Company;
  /** Current company's notes */
  currentNotes: string;
  /** Current company's checklist */
  currentChecklist: ChecklistState;
}

const STORAGE_KEY = 'prashant-workflow-hub';

const DEFAULT_ALL_CHECKLISTS: Record<CompanyId, ChecklistState> = {
  'maven-jobs': { ...DEFAULT_CHECKLIST },
  'profit-pathshala': { ...DEFAULT_CHECKLIST },
  'mks': { ...DEFAULT_CHECKLIST },
  'savvi': { ...DEFAULT_CHECKLIST },
};

const DEFAULT_ALL_NOTES: Record<CompanyId, string> = {
  'maven-jobs': '',
  'profit-pathshala': '',
  'mks': '',
  'savvi': '',
};

function loadState(): WorkflowState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Migrate old single notes/checklist to per-company
      let notes = parsed.notes;
      if (typeof notes === 'string') {
        notes = { ...DEFAULT_ALL_NOTES, [parsed.activeCompany || 'maven-jobs']: notes };
      } else if (!notes || typeof notes !== 'object') {
        notes = { ...DEFAULT_ALL_NOTES };
      }
      let checklist = parsed.checklist;
      if (checklist && !checklist['maven-jobs'] && typeof checklist === 'object') {
        // Old format: single checklist object
        checklist = { ...DEFAULT_ALL_CHECKLISTS, [parsed.activeCompany || 'maven-jobs']: checklist };
      } else if (!checklist) {
        checklist = { ...DEFAULT_ALL_CHECKLISTS };
      }
      return {
        ...parsed,
        themeMode: parsed.themeMode || 'blue',
        analyticsPeriod: null,
        notes,
        checklist,
      };
    }
  } catch {}
  return {
    activeCompany: 'maven-jobs',
    adminMode: false,
    themeMode: 'blue',
    analyticsPeriod: null,
    links: {
      'maven-jobs': { ...DEFAULT_LINKS },
      'profit-pathshala': { ...DEFAULT_LINKS },
      'mks': { ...DEFAULT_LINKS },
      'savvi': { ...DEFAULT_LINKS },
    },
    notes: { ...DEFAULT_ALL_NOTES },
    checklist: { ...DEFAULT_ALL_CHECKLISTS },
  };
}

const WorkflowContext = createContext<WorkflowContextType | null>(null);

export function WorkflowProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState<WorkflowState>(() => mounted ? loadState() : {
    activeCompany: 'maven-jobs',
    adminMode: false,
    themeMode: 'blue',
    analyticsPeriod: null,
    links: {
      'maven-jobs': { ...DEFAULT_LINKS },
      'profit-pathshala': { ...DEFAULT_LINKS },
      'mks': { ...DEFAULT_LINKS },
      'savvi': { ...DEFAULT_LINKS },
    },
    notes: { ...DEFAULT_ALL_NOTES },
    checklist: { ...DEFAULT_ALL_CHECKLISTS },
  });

  useEffect(() => {
    setMounted(true);
    setState(loadState());
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    document.documentElement.setAttribute('data-company', state.activeCompany);
    document.documentElement.setAttribute('data-theme', state.themeMode);
  }, [state.activeCompany, state.themeMode]);

  const setActiveCompany = (id: CompanyId) =>
    setState(s => ({ ...s, activeCompany: id }));

  const toggleAdminMode = () =>
    setState(s => ({ ...s, adminMode: !s.adminMode }));

  const setThemeMode = (mode: ThemeMode) =>
    setState(s => ({ ...s, themeMode: mode }));

  const setAnalyticsPeriod = (period: AnalyticsPeriod) =>
    setState(s => ({ ...s, analyticsPeriod: s.analyticsPeriod === period ? null : period }));

  const updateLink = (company: CompanyId, key: keyof CompanyLinks, value: string) =>
    setState(s => ({
      ...s,
      links: { ...s.links, [company]: { ...s.links[company], [key]: value } },
    }));

  const setNotes = (notes: string) =>
    setState(s => ({
      ...s,
      notes: { ...s.notes, [s.activeCompany]: notes },
    }));

  const toggleChecklist = (key: keyof ChecklistState) =>
    setState(s => ({
      ...s,
      checklist: {
        ...s.checklist,
        [s.activeCompany]: {
          ...s.checklist[s.activeCompany],
          [key]: !s.checklist[s.activeCompany][key],
        },
      },
    }));

  const resetChecklist = () =>
    setState(s => ({
      ...s,
      checklist: {
        ...s.checklist,
        [s.activeCompany]: { ...DEFAULT_CHECKLIST },
      },
    }));

  const activeCompanyData = COMPANIES.find(c => c.id === state.activeCompany)!;
  const currentNotes = state.notes[state.activeCompany] || '';
  const currentChecklist = state.checklist[state.activeCompany] || { ...DEFAULT_CHECKLIST };

  return (
    <WorkflowContext.Provider
      value={{
        ...state,
        setActiveCompany,
        toggleAdminMode,
        setThemeMode,
        setAnalyticsPeriod,
        updateLink,
        setNotes,
        toggleChecklist,
        resetChecklist,
        activeCompanyData,
        currentNotes,
        currentChecklist,
      }}
    >
      {children}
    </WorkflowContext.Provider>
  );
}

export function useWorkflow() {
  const ctx = useContext(WorkflowContext);
  if (!ctx) throw new Error('useWorkflow must be used within WorkflowProvider');
  return ctx;
}
