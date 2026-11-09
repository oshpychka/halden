import type { ReactNode } from "react";

type SectionHeadingProps = {
  id: string;
  title: ReactNode;
  lead?: ReactNode;
};

export function SectionHeading({ id, title, lead }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <h2 id={id} className="text-headline">
        {title}
      </h2>
      {lead && <p className="mt-4 text-lg text-muted">{lead}</p>}
    </div>
  );
}
