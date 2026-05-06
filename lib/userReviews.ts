import type { Review } from "./reviews";

const KEY        = "pz-user-reviews";
const VOTED_KEY  = "pz-reviewed-products";

type Store = Record<string, Review[]>;

function load(): Store {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(KEY) ?? "{}"); } catch { return {}; }
}

function getVoted(): string[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(VOTED_KEY) ?? "[]"); } catch { return []; }
}

export function getUserReviews(productId: string): Review[] {
  return load()[productId] ?? [];
}

export function hasAlreadyReviewed(productId: string): boolean {
  return getVoted().includes(productId);
}

export function addUserReview(productId: string, review: Review): void {
  const store = load();
  store[productId] = [review, ...(store[productId] ?? [])];
  localStorage.setItem(KEY, JSON.stringify(store));

  const voted = getVoted();
  if (!voted.includes(productId)) {
    localStorage.setItem(VOTED_KEY, JSON.stringify([...voted, productId]));
  }
}
