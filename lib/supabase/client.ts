"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/lib/supabase/types";

/**
 * Client Supabase côté navigateur.
 * Utilise uniquement la clé anonyme (sûre à exposer).
 *
 * Usage :
 *   import { supabase } from "@/lib/supabase/client";
 *   await supabase.from("leads").insert({ ... });
 *
 * RLS : la policy public insert autorise l'écriture, mais pas la lecture
 * depuis le navigateur. La lecture se fait côté serveur (server.ts).
 */
export const supabase = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
