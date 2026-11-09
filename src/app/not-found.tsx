import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const links = [
  { href: "/residences", label: "All residences" },
  { href: "/floor-plans", label: "Floor plans" },
  { href: "/build", label: "Design your home" },
];

export default function NotFound() {
  return (
    <Container className="py-20 sm:py-28">
      <p className="tabular text-sm text-muted">Error 404</p>
      <h1 className="mt-3 max-w-3xl font-display text-display">
        This room is not on the plan.
      </h1>
      <p className="mt-5 max-w-xl text-lg text-muted">
        The page may have moved, or the link is missing a character. Residence
        pages use the floor and stack, for example /residences/14b.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <ButtonLink href="/">Back to the building</ButtonLink>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-bay"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </Container>
  );
}
