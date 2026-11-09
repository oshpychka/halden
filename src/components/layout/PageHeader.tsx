import Link from "next/link";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbs } from "@/lib/seo";
import { Container } from "./Container";

type Crumb = { name: string; path: string };

type PageHeaderProps = {
  title: ReactNode;
  lead?: ReactNode;
  trail: Crumb[];
  children?: ReactNode;
};

export function PageHeader({ title, lead, trail, children }: PageHeaderProps) {
  const items = [{ name: "Home", path: "/" }, ...trail];
  return (
    <Container className="pt-6 pb-10 sm:pt-8 sm:pb-14">
      <JsonLd data={breadcrumbs(items)} />
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-x-2 text-sm text-muted">
          {items.map((item, index) => (
            <li key={item.path} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">/</span>}
              {index === items.length - 1 ? (
                <span
                  aria-current="page"
                  className="inline-flex min-h-11 items-center text-ink"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className="inline-flex min-h-11 items-center hover:text-ink"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <h1 className="rise mt-4 max-w-4xl font-display text-display">{title}</h1>
      {lead && <div className="mt-5 max-w-2xl text-lg text-muted">{lead}</div>}
      {children}
    </Container>
  );
}
