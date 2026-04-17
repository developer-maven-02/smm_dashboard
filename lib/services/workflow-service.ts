import api from '../api';
import type { ApiResponse, WorkflowState } from '../api-types';

export const workflowService = {
  async getState(): Promise<WorkflowState> {
    const response = await api.get<ApiResponse<WorkflowState>>('/workflow');
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch workflow state');
    }
    return response.data;
  },

  async saveState(state: Partial<WorkflowState>): Promise<WorkflowState> {
    const response = await api.post<ApiResponse<WorkflowState>>('/workflow', state);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to save workflow state');
    }
    return response.data;
  },

  async updateChecklist(
    companyId: string, 
    checklist: Record<string, boolean>
  ): Promise<WorkflowState> {
    const response = await api.put<ApiResponse<WorkflowState>>(
      `/workflow/${companyId}/checklist`,
      { checklist }
    );
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to update checklist');
    }
    return response.data;
  },

  async updateNotes(companyId: string, notes: string): Promise<WorkflowState> {
    const response = await api.put<ApiResponse<WorkflowState>>(
      `/workflow/${companyId}/notes`,
      { notes }
    );
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to update notes');
    }
    return response.data;
  },
};

export default workflowService;