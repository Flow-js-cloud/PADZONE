import type { Metadata } from "next";
import { PRODUCTS, ANIME_CATEGORIES, GAME_CATEGORIES, SIZE_CATEGORIES, BUREAU_CATEGORIES } from "@/lib/products";
import { CategoryPageClient, getPageMeta } from "./CategoryPageClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://padzone.fr";

interface Props { params: { slug: string[] } }

function getStaticMeta(slug: string[]): { title: string; description: string } {
  const [type, sub] = slug;

  if (type === "anime" && sub) {
    const cat = ANIME_CATEGORIES.find(c => c.slug === sub);
    return {
      title: `Tapis Gaming ${cat?.name ?? sub} | PadZone`,
      description: `Découvrez notre collection de tapis gaming ${cat?.name ?? sub}. Impression Ultra HD, anti-dérapant, bords cousus. Livraison internationale.`,
    };
  }
  if (type === "anime") return {
    title: "Tapis Gaming Anime | Dragon Ball, Naruto, One Piece | PadZone",
    description: "Tapis gaming anime premium : Dragon Ball Z, Naruto, One Piece, Demon Slayer, Attack on Titan… Impression Ultra HD, livraison mondiale.",
  };
  if (type === "jeux" && sub) {
    const cat = GAME_CATEGORIES.find(c => c.slug === sub);
    return {
      title: `Tapis Gaming ${cat?.name ?? sub} | PadZone`,
      description: `Collection de tapis gaming ${cat?.name ?? sub}. Designs officiels, surface optimisée pour gaming compétitif. Livraison internationale.`,
    };
  }
  if (type === "jeux") return {
    title: "Tapis Gaming Jeux Vidéo | Valorant, LoL, CS2 | PadZone",
    description: "Tapis gaming jeux vidéo : Valorant, League of Legends, Counter-Strike 2, Fortnite, Apex Legends. Surface speed-control premium.",
  };
  if (type === "rgb") return {
    title: "Tapis Gaming RGB LED | Éclairage 16.8M couleurs | PadZone",
    description: "Tapis gaming RGB avec éclairage LED 16.8 millions de couleurs. Synchronisation logicielle, effet lumineux gaming. Full desk disponible.",
  };
  if (type === "tailles" && sub) {
    const size = SIZE_CATEGORIES.find(s => s.slug === sub);
    return {
      title: `Tapis Gaming ${size?.label ?? sub.toUpperCase()} (${size?.dimensions ?? ""}) | PadZone`,
      description: `Tapis gaming format ${size?.label ?? sub.toUpperCase()} — ${size?.dimensions ?? ""}. ${size?.desc ?? ""}. Livraison internationale.`,
    };
  }
  if (type === "tailles") return {
    title: "Tapis Gaming par Taille | S M L XL XXL Full Desk | PadZone",
    description: "Trouvez votre tapis gaming par taille : S (25×20cm), M, L, XL, XXL, XXXL Full Desk (120×60cm). Tous les formats disponibles.",
  };
  if (type === "bureautique") return {
    title: "Tapis Bureau Premium | Minimaliste, Cuir, Marbre | PadZone",
    description: "Tapis de bureau premium : designs minimalistes, effet cuir, nature, marbre. Idéal pour home-office et espace de travail.",
  };
  if (type === "nouveautes") return {
    title: "Nouveaux Tapis Gaming | Dernières Sorties | PadZone",
    description: "Découvrez les dernières sorties PadZone : nouveaux tapis gaming anime et jeux vidéo. Arrivages réguliers.",
  };
  if (type === "promo") return {
    title: "Promotions Tapis Gaming | Soldes | PadZone",
    description: "Tapis gaming en promotion. Réductions sur une sélection de tapis anime et jeux vidéo. Offres limitées.",
  };
  return {
    title: "Catalogue Tapis Gaming | PadZone",
    description: "Toute la collection PadZone : tapis gaming anime, jeux vidéo, RGB, bureautique. Qualité premium, livraison internationale.",
  };
}

export function generateStaticParams() {
  const single = ["anime", "jeux", "rgb", "bureautique", "tailles", "nouveautes", "promo", "best-sellers"];
  const pairs: string[][] = [
    ...ANIME_CATEGORIES.map(c => ["anime", c.slug]),
    ...GAME_CATEGORIES.map(c => ["jeux", c.slug]),
    ...BUREAU_CATEGORIES.map(c => ["bureautique", c.slug]),
    ...SIZE_CATEGORIES.map(s => ["tailles", s.slug]),
    ["rgb", "rgb-anime"], ["rgb", "rgb-jeux"], ["rgb", "rgb-fulldesk"],
  ];
  return [
    ...single.map(s => ({ slug: [s] })),
    ...pairs.map(p => ({ slug: p })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = Array.isArray(params.slug) ? params.slug : [params.slug];
  const { title, description } = getStaticMeta(slug);
  const canonical = `${SITE_URL}/categories/${slug.join("/")}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      siteName: "PadZone",
      locale: "fr_FR",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function CategoryPage({ params }: Props) {
  const slug = Array.isArray(params.slug) ? params.slug : [params.slug];

  // Breadcrumb JSON-LD
  const breadcrumbItems = [
    { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Catégories", item: `${SITE_URL}/categories` },
    ...slug.map((s, i) => ({
      "@type": "ListItem",
      position: i + 3,
      name: s.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
      item: `${SITE_URL}/categories/${slug.slice(0, i + 1).join("/")}`,
    })),
  ];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <CategoryPageClient slug={slug} />
    </>
  );
}
