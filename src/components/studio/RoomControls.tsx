import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { formatFeet } from "@/lib/format";
import { GRID } from "@/lib/studio";
import type { Rect, Room } from "@/lib/types";

type RoomControlsProps = {
  room: Room;
  onResize: (next: Rect) => void;
  onRotate: () => void;
  onRemove: () => void;
};

function Stepper({
  label,
  value,
  onStep,
}: {
  label: string;
  value: number;
  onStep: (delta: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-sm text-muted">{label}</span>
      <div className="flex items-center">
        <button
          type="button"
          aria-label={`Decrease ${label.toLowerCase()}`}
          onClick={() => onStep(-GRID)}
          className="grid size-11 place-items-center rounded-full border border-line hover:border-ink/40"
        >
          <Icon name="minus" size={18} />
        </button>
        <span className="tabular w-16 text-center">{formatFeet(value)}</span>
        <button
          type="button"
          aria-label={`Increase ${label.toLowerCase()}`}
          onClick={() => onStep(GRID)}
          className="grid size-11 place-items-center rounded-full border border-line hover:border-ink/40"
        >
          <Icon name="plus" size={18} />
        </button>
      </div>
    </div>
  );
}

export function RoomControls({
  room,
  onResize,
  onRotate,
  onRemove,
}: RoomControlsProps) {
  const rect = { x: room.x, y: room.y, w: room.w, h: room.h };
  return (
    <div className="grid gap-3 rounded-2xl bg-surface p-4 shadow-card ring-2 ring-bay">
      <p className="flex items-baseline justify-between gap-3">
        <span className="font-medium">{room.label}</span>
        <span className="tabular text-sm text-muted">
          {(room.w * room.h).toLocaleString("en-US")} sq ft
        </span>
      </p>
      <Stepper
        label="Width"
        value={room.w}
        onStep={(delta) => onResize({ ...rect, w: room.w + delta })}
      />
      <Stepper
        label="Depth"
        value={room.h}
        onStep={(delta) => onResize({ ...rect, h: room.h + delta })}
      />
      <div className="flex gap-2">
        <Button variant="secondary" className="flex-1" onClick={onRotate}>
          <Icon name="rotate" size={18} />
          Rotate
        </Button>
        <Button variant="secondary" className="flex-1" onClick={onRemove}>
          <Icon name="close" size={18} />
          Remove
        </Button>
      </div>
    </div>
  );
}
