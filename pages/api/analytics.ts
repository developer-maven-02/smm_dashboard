import type { NextApiRequest, NextApiResponse } from 'next';
import { api } from '@/lib/api';
import type { AnalyticsData } from '@/lib/api-types';

type ResponseData = { success: boolean; data?: AnalyticsData; error?: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { method } = req;
  const { companyId, period } = req.query;

  switch (method) {
    case 'GET':
      try {
        const data = await api.get<AnalyticsData>(
          `/analytics?companyId=${companyId}&period=${period}`
        );
        res.status(200).json({ success: true, data });
      } catch (error) {
        res.status(500).json({ 
          success: false, 
          error: error instanceof Error ? error.message : 'Failed to fetch analytics' 
        });
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).json({ success: false, error: `Method ${method} not allowed` });
  }
}
