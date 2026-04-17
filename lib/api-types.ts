export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

export interface WorkflowState {
  activeCompany: string;
  adminMode: boolean;
  themeMode: 'blue' | 'dark';
  analyticsPeriod: string | null;
  links: Record<string, Record<string, string>>;
  notes: Record<string, string>;
  checklist: Record<string, Record<string, boolean>>;
}

export interface AnalyticsData {
  period: string;
  metrics: {
    totalPosts: number;
    totalReach: number;
    totalEngagement: number;
    growth: number;
  };
  platformBreakdown: Array<{
    platform: string;
    posts: number;
    reach: number;
    engagement: number;
  }>;
}

export interface Company {
  id: string;
  name: string;
  shortName: string;
  logo: string;
}

export interface ChecklistItem {
  key: string;
  label: string;
  completed: boolean;
}