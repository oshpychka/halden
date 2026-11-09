import { units } from "@/data/units";

export type SavedResidence = { slug: string; query: string };

export const SHORTLIST_KEY = "halden-shortlist";
export const SHORTLIST_LIMIT = 6;

const QUERY = /^(\?[a-z0-9=,&-]{0,200})?$/;

export function parseShortlist(raw: string | null): SavedResidence[] {
  if (!raw) return [];
  try {
    const data: unknown = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    const seen = new Set<string>();
    return data
      .filter(
        (item): item is SavedResidence =>
          typeof item === "object" &&
          item !== null &&
          typeof item.slug === "string" &&
          typeof item.query === "string" &&
          units.some((unit) => unit.slug === item.slug) &&
          QUERY.test(item.query),
      )
      .filter((item) => !seen.has(item.slug) && Boolean(seen.add(item.slug)))
      .slice(0, SHORTLIST_LIMIT)
      .map(({ slug, query }) => ({ slug, query }));
  } catch {
    return [];
  }
}

export function toggleSaved(
  list: SavedResidence[],
  item: SavedResidence,
): SavedResidence[] {
  if (list.some((saved) => saved.slug === item.slug)) {
    return list.filter((saved) => saved.slug !== item.slug);
  }
  return [item, ...list].slice(0, SHORTLIST_LIMIT);
}

export function updateSaved(
  list: SavedResidence[],
  item: SavedResidence,
): SavedResidence[] {
  return list.map((saved) => (saved.slug === item.slug ? item : saved));
}
