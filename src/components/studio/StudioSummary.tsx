import { formatArea } from "@/lib/format";
import { layoutStats } from "@/lib/plan";
import { MODULES, studioHints, studioLayout } from "@/lib/studio";
import type { Plan, Room } from "@/lib/types";

export function StudioSummary({ plan, rooms }: { plan: Plan; rooms: Room[] }) {
  const stats = layoutStats(studioLayout(plan, rooms));
  const shell = plan.width * plan.depth;
  const hints = studioHints(plan, rooms);
  const rows = MODULES.map((preset) => ({
    label: preset.label,
    area: rooms
      .filter((room) => room.type === preset.type)
      .reduce((sum, room) => sum + room.w * room.h, 0),
  })).filter((row) => row.area > 0);

  return (
    <div className="grid gap-4">
      <dl className="tabular grid grid-cols-3 border-t border-l border-line text-sm">
        {[
          ["Bedrooms", String(stats.bedrooms)],
          ["Baths", String(stats.bathrooms)],
          ["Assigned", `${Math.round((stats.area / shell) * 100)}%`],
        ].map(([label, value]) => (
          <div key={label} className="border-r border-b border-line px-3 py-2">
            <dt className="text-muted">{label}</dt>
            <dd className="text-lg">{value}</dd>
          </div>
        ))}
      </dl>
      {rows.length > 0 && (
        <table className="tabular w-full text-sm">
          <caption className="sr-only">Area by room type</caption>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-line">
                <th
                  scope="row"
                  className="py-1.5 text-left font-normal text-muted"
                >
                  {row.label}
                </th>
                <td className="py-1.5 text-right">{formatArea(row.area)}</td>
              </tr>
            ))}
            <tr>
              <th scope="row" className="py-1.5 text-left font-medium">
                Shell
              </th>
              <td className="py-1.5 text-right font-medium">
                {formatArea(shell)}
              </td>
            </tr>
          </tbody>
        </table>
      )}
      <ul aria-live="polite" className="grid gap-2 text-sm">
        {hints.map((hint) => (
          <li
            key={hint}
            className="border-l-2 border-reserved pl-3 text-reserved"
          >
            {hint}
          </li>
        ))}
      </ul>
    </div>
  );
}
