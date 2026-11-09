"use client";

import { Button } from "./Button";
import { Icon } from "./Icon";
import { useToast } from "./Toast";

export function ShareButton({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  const toast = useToast();

  async function share() {
    const url = window.location.href;
    if (navigator.share && window.matchMedia("(pointer: coarse)").matches) {
      try {
        await navigator.share({ title, url });
      } catch {
        return;
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      toast("Link copied. It opens this exact configuration.");
    } catch {
      toast("Copy the address from the browser bar to share.");
    }
  }

  return (
    <Button variant="secondary" onClick={share} className={className}>
      <Icon name="link" size={18} />
      Share
    </Button>
  );
}
