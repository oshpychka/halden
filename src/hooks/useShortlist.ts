"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  parseShortlist,
  SHORTLIST_KEY,
  type SavedResidence,
} from "@/lib/shortlist";

const EVENT = "halden-shortlist-change";
const EMPTY = "[]";

function read(): string {
  try {
    return window.localStorage.getItem(SHORTLIST_KEY) ?? EMPTY;
  } catch {
    return EMPTY;
  }
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(EVENT, callback);
  };
}

const cache = new Map<string, SavedResidence[]>();

function parsed(raw: string): SavedResidence[] {
  const hit = cache.get(raw);
  if (hit) return hit;
  const value = parseShortlist(raw);
  cache.clear();
  cache.set(raw, value);
  return value;
}

export function useShortlist() {
  const raw = useSyncExternalStore(subscribe, read, () => EMPTY);
  const list = parsed(raw);

  const save = useCallback((next: SavedResidence[]) => {
    try {
      window.localStorage.setItem(SHORTLIST_KEY, JSON.stringify(next));
    } catch {
      return false;
    }
    window.dispatchEvent(new Event(EVENT));
    return true;
  }, []);

  return { list, save };
}
