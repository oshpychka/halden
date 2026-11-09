import { finishes } from "@/data/finishes";
import { compatibleOptions } from "./plan";
import type { Plan } from "./types";
import type { Configuration } from "./units";

type Params = { get(name: string): string | null };

export const defaultConfiguration: Configuration = {
  options: [],
  finish: "shell",
};

export function parseConfiguration(params: Params, plan: Plan): Configuration {
  const requested = (params.get("o") ?? "").split(",").filter(Boolean);
  const finish = params.get("f") ?? "";
  return {
    options: compatibleOptions(plan, requested),
    finish: finishes.some((item) => item.id === finish)
      ? finish
      : defaultConfiguration.finish,
  };
}

export function configurationQuery(config: Configuration): string {
  const parts: string[] = [];
  if (config.options.length) {
    parts.push(`o=${[...config.options].sort().join(",")}`);
  }
  if (config.finish !== defaultConfiguration.finish) {
    parts.push(`f=${config.finish}`);
  }
  return parts.length ? `?${parts.join("&")}` : "";
}

export function describeConfiguration(
  plan: Plan,
  config: Configuration,
): string {
  const labels = plan.options
    .filter((option) => config.options.includes(option.id))
    .map((option) => option.label);
  const finish =
    finishes.find((item) => item.id === config.finish)?.label ?? "Shell";
  return [...labels, `${finish} finish`].join(", ");
}
