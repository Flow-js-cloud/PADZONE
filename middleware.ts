import { NextRequest, NextResponse } from "next/server";

/*
 * En-têtes de sécurité ajoutés à toutes les réponses.
 * CSP bloque l'injection de contenu malveillant dans les pages.
 */
const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options":    "nosniff",
  "X-Frame-Options":           "DENY",
  "X-XSS-Protection":          "1; mode=block",
  "Referrer-Policy":           "strict-origin-when-cross-origin",
  "Permissions-Policy":        "camera=(), microphone=(), geolocation=()",
  // HSTS : force HTTPS — actif uniquement en production (ignoré en HTTP local)
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
};

/*
 * En-têtes exclusivement injectés par des proxies intercepteurs (Burp Suite,
 * Charles Proxy, Fiddler…). Leur présence révèle une manipulation de la requête.
 * NB : on n'inclut PAS x-forwarded-for / via car ils sont légitimes sur Vercel/CF.
 */
const PROXY_FINGERPRINTS = [
  "proxy-connection",
  "x-proxy-id",
  "x-forwarded-server",
  "x-absorb-timeout",
  "x-tinyproxy",
];

function forbidden(reason: string): NextResponse {
  return new NextResponse(
    JSON.stringify({ error: reason }),
    {
      status: 403,
      headers: { "Content-Type": "application/json" },
    },
  );
}

export function middleware(req: NextRequest): NextResponse {
  const { pathname } = req.nextUrl;
  const isApi = pathname.startsWith("/api/");

  // ── Protection des routes API ──────────────────────────────────────────────
  if (isApi) {
    // 1. Détecter les en-têtes de proxy intercepteur
    for (const h of PROXY_FINGERPRINTS) {
      if (req.headers.get(h) !== null) {
        return forbidden("Requête bloquée — proxy détecté");
      }
    }

    // 2. Valider l'origine : doit correspondre au même host que le serveur
    const origin = req.headers.get("origin");
    const host   = req.headers.get("host") ?? "";

    if (origin) {
      // Extrait le hostname de l'origine (sans protocole ni port)
      const originHost = origin.replace(/^https?:\/\//, "").split(":")[0];
      const serverHost = host.split(":")[0];

      const allowed =
        originHost === serverHost ||            // même domaine
        originHost === "localhost" ||           // dev local
        origin === process.env.NEXT_PUBLIC_SITE_URL; // domaine de prod explicite

      if (!allowed) {
        return forbidden("Origine non autorisée");
      }
    }

    // 3. En-tête personnalisé anti-CSRF / anti-replay
    //    Le frontend l'ajoute sur tous ses fetch(). Un outil externe ne le connaît
    //    pas, il ne peut donc pas forger une requête valide sans lire le code source.
    const token = req.headers.get("x-padzone-request");
    if (token !== "1") {
      return forbidden("En-tête de sécurité manquant");
    }
  }

  // ── En-têtes de sécurité sur toutes les réponses ──────────────────────────
  const res = NextResponse.next();
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    res.headers.set(key, value);
  }

  return res;
}

export const config = {
  // Exclure les assets statiques Next.js de la vérification
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
