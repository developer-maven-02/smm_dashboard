import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(200).json({ error: "Method not allowed" });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(200).json({
        error: "Email and password are required",
      });
    }

    // 🚀 Sign in user
    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      return res.status(200).json({
        error: "Invalid email or password",
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
         name: data.user.user_metadata?.full_name || null,
      },
      session: data.session, // optional
    });

  } catch (error: any) {
    console.log('error message:',error.message);
    return res.status(500).json({
      error: error.message || "Login failed",
    });
  }
}