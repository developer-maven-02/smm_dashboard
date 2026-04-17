import type { NextApiRequest, NextApiResponse } from 'next';
import { api } from '@/lib/api';
import type { WorkflowState } from '@/lib/api-types';

type ResponseData = { success: boolean; data?: WorkflowState; error?: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const data = await api.get<WorkflowState>('/workflow');
        res.status(200).json({ success: true, data });
      } catch (error) {
        res.status(500).json({ 
          success: false, 
          error: error instanceof Error ? error.message : 'Failed to fetch workflow' 
        });
      }
      break;

    case 'POST':
      try {
        const data = await api.post<WorkflowState>('/workflow', req.body);
        res.status(201).json({ success: true, data });
      } catch (error) {
        res.status(500).json({ 
          success: false, 
          error: error instanceof Error ? error.message : 'Failed to save workflow' 
        });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ success: false, error: `Method ${method} not allowed` });
  }
}
