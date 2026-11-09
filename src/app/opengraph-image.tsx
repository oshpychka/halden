import { site } from "@/data/site";
import { facadeDrawing } from "@/lib/og-drawings";
import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "The Halden, residences on Biscayne Bay in Edgewater, Miami";

export default function Image() {
  return ogImage({
    eyebrow: `Edgewater, Miami. Completion ${site.completion}`,
    title: "Residences on Biscayne Bay, planned your way.",
    drawing: facadeDrawing(14),
    tall: true,
  });
}
