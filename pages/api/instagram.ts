import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { user_id } = req.query;

    if (!user_id || typeof user_id !== 'string') {
      return res.status(400).json({
        error: 'Missing or invalid user_id',
      });
    }

    const accessToken = process.env.IG_ACCESS_TOKEN;

    if (!accessToken) {
      return res.status(500).json({
        error: 'Missing IG_ACCESS_TOKEN',
      });
    }

    const url = `https://graph.facebook.com/v25.0/${user_id}?fields=id,username,followers_count,follows_count,media_count&access_token=${accessToken}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error || 'Instagram API error',
      });
    }
 console.log('checj insts',data);
    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message || 'Server error',
    });
  }
}