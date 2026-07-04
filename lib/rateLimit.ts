/**
 * Rate limiting simple en mémoire (defense-in-depth).
 *
 * NOTE : ce n'est PAS un rate limiting distribué — chaque instance Vercel a son
 * propre compteur. Sur le plan gratuit (Hobby), c'est suffisant pour bloquer
 * les abus grossiers (boucles de spam). Pour une protection robuste en prod à
 * fort trafic, ajouter @upstash/ratelimit + KV (persistant, partagé entre
 * instances). Mais in-memory suffit déjà à élever fortement la barrière.
 *
 * Stratégie : fenêtre fixe par IP. 8 requêtes / 60s / IP.
 */

const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 8; // par IP par fenêtre

type Bucket = { count: number; resetAt: number };

// Map IP → bucket. On purge périodiquement les buckets expirés pour éviter
// une fuite mémoire.
const buckets = new Map<string, Bucket>();
let lastPurge = Date.now();

export function rateLimit(ip: string): { ok: boolean; retryAfter: number } {
  // Purge tous les ~5 min
  const now = Date.now();
  if (now - lastPurge > 5 * 60_000) {
    for (const [key, b] of buckets) {
      if (b.resetAt <= now) buckets.delete(key);
    }
    lastPurge = now;
  }

  const existing = buckets.get(ip);
  if (existing && existing.resetAt > now) {
    if (existing.count >= MAX_REQUESTS) {
      return { ok: false, retryAfter: Math.ceil((existing.resetAt - now) / 1000) };
    }
    existing.count++;
    return { ok: true, retryAfter: 0 };
  }

  // Nouvelle fenêtre
  buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
  return { ok: true, retryAfter: 0 };
}

/**
 * Extrait l'IP du visiteur depuis les headers Vercel/Next.
 * Vercel met l'IP réelle dans x-forwarded-for ou x-real-ip.
 */
export function getClientIP(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}
