import {
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
  type CookieOptions,
} from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types/database.types";

const SUPABASE_URL: string | undefined = process.env.SUPABASE_URL;
const SUPABASE_API_KEY: string | undefined = process.env.SUPABASE_API_KEY;

if (!SUPABASE_URL || !SUPABASE_API_KEY) {
  throw new Error("Missing Supabase URL or API KEY");
}

export function createClient(request: Request): {
  supabaseClient: SupabaseClient<Database>;
  headers: Headers;
} {
  const headers: Headers = new Headers();

  const supabaseClient = createServerClient<Database>(
    SUPABASE_URL!,
    SUPABASE_API_KEY!,
    {
      cookies: {
        getAll() {
          return parseCookieHeader(request.headers.get("Cookie") ?? "") as {
            name: string;
            value: string;
          }[];
        },
        setAll(
          cookiesToSet: {
            name: string;
            value: string;
            options: CookieOptions;
          }[],
        ) {
          cookiesToSet.forEach(({ name, value, options }) =>
            headers.append(
              "Set-Cookie",
              serializeCookieHeader(name, value, options),
            ),
          );
        },
      },
    },
  );

  return { supabaseClient, headers };
}
