import type { NextApiRequest, NextApiResponse } from "next";
import { getAccessToken } from "@/lib/accessToken";

// ✅ Safe fetch
async function fetchWithTimeout(url: string, options: any = {}, timeout = 45000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(id);
  }
}

// ✅ chunk helper (batch max = 50)
function chunkArray(arr: any[], size: number) {
  const res = [];
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }
  return res;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const ACCESS_TOKEN = await getAccessToken();

    const ig_user_id = Array.isArray(req.query.ig_user_id)
      ? req.query.ig_user_id[0]
      : req.query.ig_user_id;

    const since = req.query.since as string | undefined;
    const until = req.query.until as string | undefined;

    if (!ig_user_id) {
      return res.status(400).json({ success: false, error: "Missing ig_user_id" });
    }

    // =========================
    // 🚀 1. PAGINATION (UP TO 500)
    // =========================
    let allMedia: any[] = [];
    let nextUrl: string | null =
      `https://graph.facebook.com/v19.0/${ig_user_id}/media` +
      `?fields=id,caption,media_type,media_product_type,media_url,timestamp,permalink,thumbnail_url` +
      `&limit=50&access_token=${ACCESS_TOKEN}`;

    while (nextUrl && allMedia.length < 500) {
      const resMedia = await fetchWithTimeout(nextUrl);
      const data = await resMedia.json();

      if (!data?.data) break;

      allMedia.push(...data.data);
      nextUrl = data.paging?.next || null;
    }

    // =========================
    // 🔥 2. MANUAL DATE FILTER
    // =========================
    let media = allMedia;

    if (since || until) {
      const sinceDate = since ? new Date(since) : null;
      const untilDate = until ? new Date(until) : null;

      media = media.filter((post: any) => {
        const d = new Date(post.timestamp);
        if (sinceDate && d < sinceDate) return false;
        if (untilDate && d > untilDate) return false;
        return true;
      });
    }

    if (media.length === 0) {
      return res.status(200).json({
        success: true,
        totalPosts: 0,
        totalViews: 0,
        posts: [],
      });
    }

    // =========================
    // 🚀 3. BATCH IN CHUNKS (50)
    // =========================
    const chunks = chunkArray(media, 50);
    let posts: any[] = [];

    for (const chunk of chunks) {
      const batch = chunk.map((post: any) => ({
        method: "GET",
        relative_url: `${post.id}/insights?metric=views,reach,shares,likes`
      }));

      const batchRes = await fetchWithTimeout(
        "https://graph.facebook.com/v19.0",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_token: ACCESS_TOKEN,
            batch: batch,
          }),
        }
      );

      const batchData = await batchRes.json();

      // map chunk results
      const mapped = chunk.map((post: any, i: number) => {
       

     let views = 0;
let reach = 0;
let likes = 0;

let shares = 0;


try {
  const body = JSON.parse(batchData[i]?.body || "{}");

  if (body.data?.length > 0) {
    for (const metric of body.data) {
      const value = metric.values?.[0]?.value || 0;

      switch (metric.name) {
        case "views":
          views = value;
          break;
        case "reach":
          reach = value;
          break;
        case "likes":
          likes = value;
          break;
        case "shares":
          shares = value;
          break;
      }
    }
  }

  // 🔥 fallback (very important)
  if (!views) views = reach;

} catch (e) {
  console.log("Parse error:", post.id);
}

        return {
          id: post.id,
          media_url: post.media_url,
          thumbnail_url: post.thumbnail_url || null,
          caption: post.caption || "",
          timestamp: post.timestamp,
          media_type: post.media_type,
          permalink: post.permalink,
           views,
  reach,
  likes,
  shares,
        };
      });

      posts.push(...mapped);
    }

    // =========================
    // 📊 4. TOTAL + SORT
    // =========================
    const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0);

    posts.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return res.status(200).json({
      success: true,
      totalPosts: posts.length,
      totalViews,
      posts,
    });

  } catch (error: any) {
    console.error("API ERROR:", error);
    return res.status(500).json({
      success: false,
      error: error?.message || "Internal Server Error",
    });
  }
}