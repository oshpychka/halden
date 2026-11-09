import type { Photo } from "@/lib/types";

const living: Photo = {
  src: "/images/interior-living.webp",
  alt: "Bright living room with white sofas and tall windows",
};
const lounge: Photo = {
  src: "/images/interior-lounge.webp",
  alt: "Living room with a dark sofa, a round pendant lamp and a garden view",
};
const kitchen: Photo = {
  src: "/images/interior-kitchen.webp",
  alt: "White kitchen with glass-front cabinets and a window over a small table",
};
const bath: Photo = {
  src: "/images/interior-bath.webp",
  alt: "Bathroom with a freestanding tub and floor-to-ceiling windows",
};

export const planPhotos: Record<string, Photo> = {
  "the-inlet": lounge,
  "the-mooring": kitchen,
  "the-harbor": living,
  "the-causeway": lounge,
  "the-point": living,
  "the-key": kitchen,
  "the-bayfront": living,
  "the-penthouse": bath,
};
