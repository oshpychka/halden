export type RoomType =
  | "living"
  | "dining"
  | "kitchen"
  | "foyer"
  | "bedroom"
  | "den"
  | "bath"
  | "powder"
  | "closet"
  | "laundry";

export type Rect = { x: number; y: number; w: number; h: number };

export type Room = Rect & {
  id: string;
  type: RoomType;
  label: string;
  open?: boolean;
};

export type Door = {
  id: string;
  axis: "x" | "y";
  at: number;
  from: number;
  to: number;
};

export type WindowSpan = {
  side: "front" | "left" | "right";
  from: number;
  to: number;
};

export type PlanOption = {
  id: string;
  label: string;
  description: string;
  price: number;
  patch?: Record<string, Partial<Room>>;
  remove?: string[];
  add?: Room[];
  addDoors?: Door[];
  removeDoors?: string[];
  excludes?: string[];
};

export type Plan = {
  slug: string;
  name: string;
  summary: string;
  description: string;
  width: number;
  depth: number;
  rooms: Room[];
  doors: Door[];
  windows: WindowSpan[];
  balcony: Rect;
  options: PlanOption[];
  basePrice: number;
};

export type Stack = "A" | "B" | "C" | "D" | "E";

export type UnitStatus = "available" | "reserved" | "sold";

export type View = "bay" | "bay-park" | "bay-skyline";

export type Unit = {
  slug: string;
  floor: number;
  stack: Stack | "PH1" | "PH2";
  plan: string;
  mirrored: boolean;
  view: View;
  balcony: boolean;
  status: UnitStatus;
  price: number;
};

export type Block =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string };

export type Photo = { src: string; alt: string };

export type Post = {
  slug: string;
  title: string;
  description: string;
  author: { name: string; role: string };
  published: string;
  updated: string;
  cover: Photo;
  body: Block[];
};

export type Update = {
  slug: string;
  title: string;
  date: string;
  milestone: string;
  progress: number;
  summary: string;
  photo: Photo;
  body: Block[];
};

export type Finish = {
  id: string;
  label: string;
  description: string;
  pricePerSqft: number;
  floor: string;
  cabinetry: string;
  stone: string;
};
