import type { NextApiRequest, NextApiResponse } from "next";
import { getAccessToken } from "@/lib/accessToken";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { ig_user_id, since, until } = req.query;

    // ✅ Validate params
    if (
      !ig_user_id ||
      typeof ig_user_id !== "string" ||
      !since ||
      !until
    ) {
      return res.status(400).json({
        error: "Missing ig_user_id / since / until",
      });
    }

    const accessToken = await getAccessToken();

    if (!accessToken) {
      return res.status(200).json({
        error: "Missing IG_ACCESS_TOKEN",
      });
    }

    const start = new Date(since as string);
    const end = new Date(until as string);
    end.setHours(23, 59, 59, 999); // include full day

    // ======================================================
    // 📸 1. FETCH POSTS
    // ======================================================
    const mediaRes = await fetch(
      `https://graph.facebook.com/v20.0/${ig_user_id}/media?fields=id,timestamp&limit=100&access_token=${accessToken}`
    );

    const mediaData = await mediaRes.json();

    if (!mediaRes.ok) {
      return res.status(400).json({
        error: mediaData.error || "Media fetch error",
      });
    }

    const posts = mediaData.data || [];

    // ✅ Filter by date
    const filteredPosts = posts.filter((p: any) => {
      const d = new Date(p.timestamp);
      return d >= start && d <= end;
    });

    const totalPosts = filteredPosts.length;

    // ======================================================
    // 📊 2. FETCH VIEWS (INSIGHTS)
    // ======================================================
   const insightsRes = await fetch(
  `https://graph.facebook.com/v20.0/${ig_user_id}/insights` +
    `?metric=views` +
    `&metric_type=total_value` +
    `&period=day` +
    `&since=${since}` +
    `&until=${until}` +
    `&access_token=${accessToken}`
);

    const insightsData = await insightsRes.json();

    if (!insightsRes.ok) {
      return res.status(400).json({
        error: insightsData.error || "Insights fetch error",
      });
    }

    // ✅ Extract total views safely
    const totalViews =
      insightsData?.data?.find((m: any) => m.name === "views")
        ?.total_value?.value || 0;

    // ======================================================
    // ✅ FINAL RESPONSE
    // ======================================================
    return res.status(200).json({
      success: true,
      ig_user_id,
      since,
      until,
      totalPosts,
      totalViews,
      posts: filteredPosts,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message || "Server error",
    });
  }
}