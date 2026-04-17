import api from '../api';
import type { ApiResponse, AnalyticsData } from '../api-types';

export const analyticsService = {
  async getAnalytics(companyId: string, period: string): Promise<AnalyticsData> {
    const response = await api.get<ApiResponse<AnalyticsData>>(
      `/analytics?companyId=${companyId}&period=${period}`
    );
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch analytics');
    }
    return response.data;
  },

  async getPlatformBreakdown(companyId: string, period: string) {
    const data = await this.getAnalytics(companyId, period);
    return data.platformBreakdown;
  },

  async getMetrics(companyId: string, period: string) {
    const data = await this.getAnalytics(companyId, period);
    return data.metrics;
  },
};

export default analyticsService;