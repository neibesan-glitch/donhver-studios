import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware de sécurité — ajoute des headers HTTP de protection sur toutes
 * les routes. (Audit sécurité 2026-07-04 : il n'existait aucun header de
 * sécurité auparavant.)
 *
 * Headers ajoutés :
 * - Content-Security-Policy : restreint les sources de script/style/connect
 * - X-Frame-Options : anti-clickjacking (frame-ancestors 'none')
 * - Referrer-Policy : ne leak que l'origin
 * - Permissions-Policy : désactive les API navigateur sensibles
 * - X-Content-Type-Options : déjà géré par Next, on le garantit
 */
export function middleware(_req: NextRequest) {
  const res = NextResponse.next();

  // CSP : on autorise self + les domaines réellement utilisés.
  // - fonts.googleapis.com / fonts.gstatic.com (Anton + Archivo)
  // - *.supabase.co (API + storage)
  // - *.vercel-storage.com (Blob vidéos)
  // - openrouter n'est appelé QUE côté serveur (pas dans connect-src client)
  const csp = [
    "default-src 'self'",
    "img-src 'self' https: data:",
    "media-src 'self' https:",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https://*.supabase.co",
    "frame-ancestors 'none'",
    "base-uri 'none'",
    "form-action 'self'",
  ].join("; ");

  res.headers.set("Content-Security-Policy", csp);
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=()"
  );
  res.headers.set("X-Content-Type-Options", "nosniff");

  return res;
}

export const config = {
  // Applique le middleware sur toutes les routes sauf les assets statiques
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
