"use client";

import { useSyncExternalStore } from "react";
import { Builder } from "./Builder";

const subscribe = () => () => {};

export function BuilderLoader() {
  const search = useSyncExternalStore(
    subscribe,
    () => window.location.search,
    () => "",
  );
  return <Builder key={search} search={search} />;
}
