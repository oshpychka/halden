"use client";

import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { useToast } from "@/components/ui/Toast";
import { useShortlist } from "@/hooks/useShortlist";
import { SHORTLIST_LIMIT, toggleSaved, updateSaved } from "@/lib/shortlist";

type SaveButtonProps = {
  slug: string;
  name: string;
  query?: string;
  compact?: boolean;
};

export function SaveButton({
  slug,
  name,
  query = "",
  compact,
}: SaveButtonProps) {
  const { list, save } = useShortlist();
  const toast = useToast();
  const saved = list.find((item) => item.slug === slug);
  const changed = Boolean(saved) && saved?.query !== query && !compact;

  function onClick() {
    if (changed) {
      save(updateSaved(list, { slug, query }));
      toast(`${name} updated in your saved residences.`);
      return;
    }
    if (!saved && list.length >= SHORTLIST_LIMIT) {
      toast(
        `You can save up to ${SHORTLIST_LIMIT} residences. Remove one first.`,
      );
      return;
    }
    const ok = save(toggleSaved(list, { slug, query }));
    if (!ok) toast("Saving is not available in this browser.");
    else
      toast(
        saved
          ? `${name} removed.`
          : `${name} saved. Compare it on the compare page.`,
      );
  }

  if (compact) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={Boolean(saved)}
        aria-label={saved ? `Remove ${name} from saved` : `Save ${name}`}
        className="relative z-10 grid size-11 place-items-center rounded-full border border-line bg-surface hover:border-ink/40"
      >
        <Icon name="heart" className={saved ? "fill-bay text-bay" : ""} />
      </button>
    );
  }

  return (
    <Button
      variant="secondary"
      onClick={onClick}
      aria-pressed={Boolean(saved)}
      className="flex-1"
    >
      <Icon
        name="heart"
        size={18}
        className={saved && !changed ? "fill-bay text-bay" : ""}
      />
      {changed ? "Update saved layout" : saved ? "Saved" : "Save"}
    </Button>
  );
}
