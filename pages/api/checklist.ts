import type { NextApiRequest, NextApiResponse } from 'next';
import { api } from '@/lib/api';
import type { ChecklistItem } from '@/lib/api-types';

type ResponseData = { success: boolean; data?: ChecklistItem[]; error?: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { method } = req;
  const { companyId } = req.query;

  switch (method) {
    case 'GET':
      try {
        const data = await api.get<ChecklistItem[]>(`/checklist?companyId=${companyId}`);
        res.status(200).json({ success: true, data });
      } catch (error) {
        res.status(500).json({ 
          success: false, 
          error: error instanceof Error ? error.message : 'Failed to fetch checklist' 
        });
      }
      break;

    case 'PUT':
      try {
        const data = await api.put<ChecklistItem[]>('/checklist', req.body);
        res.status(200).json({ success: true, data });
      } catch (error) {
        res.status(500).json({ 
          success: false, 
          error: error instanceof Error ? error.message : 'Failed to update checklist' 
        });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).json({ success: false, error: `Method ${method} not allowed` });
  }
}
