import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
   process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // 🔥 backend only
);

export async function getAccessToken() {
  const { data, error } = await supabase
    .from("meta_tokens")
    .select("access_token")
    .single();

  if (error || !data) {
    throw new Error("Access token not found in Supabase");
  }

  return data.access_token;
}