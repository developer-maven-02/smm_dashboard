import type { NextApiRequest, NextApiResponse } from "next";
import { getAccessToken } from "@/lib/accessToken";
const ACCESS_TOKEN = await getAccessToken();
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { ig_user_id } = req.query;

 
  if (!ig_user_id) {
    return res.status(400).json({ error: "Missing ig_user_id" });
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v19.0/${ig_user_id}?fields=username,followers_count,follows_count,media_count,profile_picture_url,biography&access_token=${ACCESS_TOKEN}`
    );

    const data = await response.json();

    if (data.error) {
      return res.status(400).json({ error: data.error.message });
    }

    return res.status(200).json({
      success: true,
      username: data.username,
      followers_count: data.followers_count,
      follows_count: data.follows_count,
      media_count: data.media_count,
      profile_picture_url: data.profile_picture_url,
    });

  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}