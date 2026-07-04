import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/lib/supabase/types";

/**
 * Client Supabase côté serveur (Server Components, Route Handlers).
 * Utilise la clé anonyme via cookies pour respecter la session RLS.
 *
 * Pour des opérations privilégiées (back-office admin), créer un client
 * avec SERVICE_ROLE_KEY — JAMAIS exposer cette clé côté navigateur.
 */
export async function createClient() {
  const cookieStore = cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: Array<{ name: string; value: string; options?: Record<string, unknown> }>) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // Safe to ignore if middleware refreshes sessions.
          }
        },
      },
    }
  );
}
