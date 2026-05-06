import type { Metadata } from "next";
import { PRODUCTS } from "@/lib/products";
import { REVIEWS } from "@/lib/reviews";
import { ProductPageClient } from "./ProductPageClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://padzone.fr";

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = PRODUCTS.find(p => p.slug === params.slug);
  if (!product) return { title: "Produit introuvable" };

  const title       = `${product.name} | Tapis Gaming PadZone`;
  const description = `${product.description} Format ${product.size} (${product.dimensions}). ${product.price.toFixed(2)}€. Livraison internationale 15-30 jours. ${product.features.join(", ")}.`;
  const canonical   = `${SITE_URL}/produits/${product.slug}`;
  const image       = product.images?.[0] ?? null;

  return {
    title,
    description,
    keywords: [
      `tapis gaming ${product.subCategory}`,
      product.name,
      `mouse pad ${product.subCategory}`,
      `tapis souris ${product.size}`,
      `${product.shortName} gaming`,
      "tapis gaming anime", "tapis gaming jeux vidéo",
    ],
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      siteName: "PadZone",
      locale: "fr_FR",
      ...(image && { images: [{ url: image.startsWith("http") ? image : `${SITE_URL}${image}`, width: 800, height: 600, alt: product.name }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image && { images: [image.startsWith("http") ? image : `${SITE_URL}${image}`] }),
    },
  };
}

export async function generateStaticParams() {
  return PRODUCTS.map(p => ({ slug: p.slug }));
}

export default function ProductPage({ params }: Props) {
  const product = PRODUCTS.find(p => p.slug === params.slug);
  const reviews = product ? (REVIEWS[product.id] ?? []) : [];
  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  const productJsonLd = product ? {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images?.[0]
      ? (product.images[0].startsWith("http") ? product.images[0] : `${SITE_URL}${product.images[0]}`)
      : undefined,
    sku: product.id,
    brand: { "@type": "Brand", name: "PadZone" },
    offers: {
      "@type": "Offer",
      price: product.price.toFixed(2),
      priceCurrency: "EUR",
      availability: product.stock > 0
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${SITE_URL}/produits/${product.slug}`,
      priceValidUntil: "2027-12-31",
      seller: { "@type": "Organization", name: "PadZone" },
    },
    ...(avgRating && reviews.length > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: avgRating,
        reviewCount: reviews.length.toString(),
        bestRating: "5",
        worstRating: "1",
      },
    }),
  } : null;

  const breadcrumbJsonLd = product ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Catégories", item: `${SITE_URL}/categories` },
      { "@type": "ListItem", position: 3, name: product.category.charAt(0).toUpperCase() + product.category.slice(1), item: `${SITE_URL}/categories/${product.category}` },
      { "@type": "ListItem", position: 4, name: product.shortName, item: `${SITE_URL}/produits/${product.slug}` },
    ],
  } : null;

  return (
    <>
      {productJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      )}
      {breadcrumbJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      )}
      <ProductPageClient slug={params.slug} />
    </>
  );
}
