import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // backend only
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
  

    // 1. Get current token
    const { data, error } = await supabase
      .from("meta_tokens")
      .select("*")
      .single();

    if (error || !data) {
      throw new Error("Token not found");
    }

    const currentToken = data.access_token;

    // 2. Refresh token (Meta Graph API)
    const response = await fetch(
      `https://graph.facebook.com/v19.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.FB_APP_ID}&client_secret=${process.env.FB_APP_SECRET}&fb_exchange_token=${currentToken}`
    );

    const newData = await response.json();

    if (!newData.access_token) {
      throw new Error("Failed to refresh token");
    }

    // 3. Update in Supabase
    await supabase
      .from("meta_tokens")
      .update({
        access_token: newData.access_token,
        updated_at: new Date(),
      })
      .eq("id", data.id);

    return res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}