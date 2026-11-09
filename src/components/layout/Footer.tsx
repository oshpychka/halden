import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/data/site";
import { formatUsPhone } from "@/lib/validate";
import { navigation } from "./nav";

export function Footer() {
  const { address, gallery } = site;
  return (
    <footer className="mt-24 bg-ink text-paper">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-4 py-14 sm:px-6 md:grid-cols-12 lg:px-8">
        <div className="md:col-span-5">
          <p className="text-3xl font-bold tracking-tight">The Halden</p>
          <p className="mt-3 max-w-sm text-paper/70">{site.tagline}</p>
          <ButtonLink href="/build" variant="accent" className="mt-6">
            Design your home
          </ButtonLink>
        </div>
        <div className="grid gap-2 text-sm md:col-span-4">
          <p className="font-semibold">Sales gallery</p>
          <p className="text-paper/70">{gallery.street}, Miami</p>
          <dl className="grid gap-1">
            {gallery.hours.map((row) => (
              <div key={row.days} className="flex justify-between gap-4">
                <dt className="text-paper/70">{row.days}</dt>
                <dd className="tabular">{row.time}</dd>
              </div>
            ))}
          </dl>
          <a
            href={`tel:${site.phone}`}
            className="tabular mt-2 inline-flex min-h-11 items-center text-lg font-semibold whitespace-nowrap hover:text-bay-tint"
          >
            {formatUsPhone(site.phone)}
          </a>
          <address className="text-paper/70 not-italic">
            Residences at {address.street}, {address.neighborhood},{" "}
            {address.city}, {address.region} {address.postalCode}
          </address>
        </div>
        <nav aria-label="Footer" className="md:col-span-3">
          <ul className="grid gap-0.5">
            {[{ href: "/build", label: "Design your home" }, ...navigation].map(
              (item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center hover:text-bay-tint"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
            <li>
              <Link
                href="/privacy"
                className="inline-flex min-h-11 items-center hover:text-bay-tint"
              >
                Privacy
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-paper/15">
        <p className="mx-auto max-w-[1320px] px-4 py-5 text-xs text-paper/60 sm:px-6 lg:px-8">
          Developed by {site.developer}. Architecture by {site.architect}.
        </p>
      </div>
    </footer>
  );
}
