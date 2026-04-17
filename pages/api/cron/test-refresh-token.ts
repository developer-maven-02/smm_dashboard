import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
  
    // ✅ Only testing (NO DB, NO META API)
    return res.status(200).json({
      success: true,
      message: "Vercel Cron TEST is working 🚀",
      time: new Date(),
    
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}