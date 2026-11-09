"use client";

import { useEffect, useRef, useState } from "react";
import { useRequest } from "@/components/forms/RequestProvider";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/data/site";
import { formatUsPhone } from "@/lib/validate";
import { NavLink } from "./NavLink";
import { navigation } from "./nav";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const request = useRequest();

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (open && !element.open) element.showModal();
    if (!open && element.open) element.close();
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="-mr-2 grid size-11 place-items-center lg:hidden"
      >
        <Icon name="menu" size={22} />
      </button>
      <dialog
        ref={dialog}
        aria-label="Menu"
        onClose={() => setOpen(false)}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-paper p-0 text-ink backdrop:bg-transparent lg:hidden"
      >
        <div className="flex h-full flex-col px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="-mr-2 grid size-11 place-items-center"
            >
              <Icon name="close" size={22} />
            </button>
          </div>
          <nav
            aria-label="Main"
            className="mt-6 flex flex-col border-t border-line"
          >
            {navigation.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                onNavigate={() => setOpen(false)}
                className="border-b border-line py-3 font-display text-3xl after:hidden aria-[current=page]:text-bay"
              />
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-4">
            <a
              href={`tel:${site.phone}`}
              className="tabular inline-flex min-h-11 items-center gap-2 text-lg"
            >
              <Icon name="phone" />
              {formatUsPhone(site.phone)}
            </a>
            <ButtonLink
              href="/build"
              variant="accent"
              size="lg"
              className="w-full"
            >
              Design your home
            </ButtonLink>
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => {
                setOpen(false);
                request({ title: "Request a private presentation" });
              }}
            >
              Request a presentation
            </Button>
          </div>
        </div>
      </dialog>
    </>
  );
}
