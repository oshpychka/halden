import { site } from "@/data/site";
import { absoluteUrl } from "./seo";
import type { Unit } from "./types";
import { unitName, unitSummary } from "./units";

export function residenceSchema(unit: Unit) {
  const summary = unitSummary(unit);
  return {
    "@context": "https://schema.org",
    "@type": "Apartment",
    name: `${unitName(unit)}, ${site.name}`,
    url: absoluteUrl(`/residences/${unit.slug}`),
    numberOfRooms: summary.bedrooms + 1,
    numberOfBedrooms: summary.bedrooms,
    numberOfBathroomsTotal: summary.bathrooms,
    floorLevel: String(unit.floor),
    floorSize: {
      "@type": "QuantitativeValue",
      value: summary.area,
      unitCode: "FTK",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: "US",
    },
    offers: {
      "@type": "Offer",
      price: unit.price,
      priceCurrency: "USD",
      availability:
        unit.status === "available"
          ? "https://schema.org/PreOrder"
          : "https://schema.org/SoldOut",
    },
  };
}
