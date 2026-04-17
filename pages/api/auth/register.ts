import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // ❌ Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { fullName, email, phone, password } = req.body;

    // 🔍 Validation
    if (!fullName || !email || !password) {
      return res.status(400).json({
        error: "Full name, email, and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: "Password must be at least 6 characters",
      });
    }

    // 🚀 1. Create user in Supabase Auth
    const { data, error } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
          full_name: fullName,
        },
      });

    if (error || !data?.user) {
      return res.status(400).json({
        error: error?.message || "User creation failed",
      });
    }

    const user = data.user;

    // 🚀 2. Insert into users table
    const { error: dbError } = await supabaseAdmin.from("users").insert([
      {
        id: user.id,
        full_name: fullName,
        email,
        phone: phone || null,
      },
    ]);

    if (dbError) {
      return res.status(400).json({
        error: dbError.message,
      });
    }

    return res.status(201).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
      },
    });

  } catch (error: any) {
    console.error("Register API Error:", error);

    return res.status(500).json({
      error: error.message || "Internal server error",
    });
  }
}