import type { MetadataRoute } from "next";
import { PRODUCTS, ANIME_CATEGORIES, GAME_CATEGORIES, SIZE_CATEGORIES, BUREAU_CATEGORIES } from "@/lib/products";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://padzone.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Pages statiques
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "daily",   priority: 1.0 },
    { url: `${SITE_URL}/categories`,          lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${SITE_URL}/categories/anime`,    lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${SITE_URL}/categories/jeux`,     lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${SITE_URL}/categories/rgb`,      lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${SITE_URL}/categories/tailles`,  lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/categories/bureautique`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/categories/nouveautes`,  lastModified: now, changeFrequency: "daily",  priority: 0.8 },
    { url: `${SITE_URL}/categories/promo`,    lastModified: now, changeFrequency: "daily",   priority: 0.8 },
    { url: `${SITE_URL}/connexion`,           lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${SITE_URL}/inscription`,         lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${SITE_URL}/cgv`,                 lastModified: now, changeFrequency: "yearly",  priority: 0.2 },
    { url: `${SITE_URL}/mentions-legales`,    lastModified: now, changeFrequency: "yearly",  priority: 0.2 },
    { url: `${SITE_URL}/politique-confidentialite`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/cookies`,             lastModified: now, changeFrequency: "yearly",  priority: 0.1 },
  ];

  // Sous-catégories anime
  const animeSubCats = ANIME_CATEGORIES.map(c => ({
    url: `${SITE_URL}/categories/anime/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Sous-catégories jeux
  const jeuSubCats = GAME_CATEGORIES.map(c => ({
    url: `${SITE_URL}/categories/jeux/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Sous-catégories bureautique
  const bureauSubCats = BUREAU_CATEGORIES.map(c => ({
    url: `${SITE_URL}/categories/bureautique/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // Tailles
  const tailleCats = SIZE_CATEGORIES.map(s => ({
    url: `${SITE_URL}/categories/tailles/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Pages produits — priorité haute, fréquence quotidienne
  const productPages = PRODUCTS.map(p => ({
    url: `${SITE_URL}/produits/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p.isBestSeller ? 0.95 : p.isNew ? 0.9 : 0.8,
  }));

  return [
    ...staticPages,
    ...animeSubCats,
    ...jeuSubCats,
    ...bureauSubCats,
    ...tailleCats,
    ...productPages,
  ];
}
