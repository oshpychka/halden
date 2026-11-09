import type { Door } from "@/lib/types";

export function DoorSwing({ door }: { door: Door }) {
  const width = door.to - door.from;
  const path =
    door.axis === "x"
      ? `M ${door.at} ${door.from} L ${door.at + width} ${door.from} A ${width} ${width} 0 0 1 ${door.at} ${door.to}`
      : `M ${door.from} ${door.at} L ${door.from} ${door.at - width} A ${width} ${width} 0 0 1 ${door.to} ${door.at}`;
  return (
    <path d={path} fill="none" className="stroke-ink/60" strokeWidth={0.08} />
  );
}
