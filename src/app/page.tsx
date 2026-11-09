import { Amenities } from "@/components/home/Amenities";
import { Architecture } from "@/components/home/Architecture";
import { BuyingProcess } from "@/components/home/BuyingProcess";
import { Contact } from "@/components/home/Contact";
import { Faq } from "@/components/home/Faq";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Location } from "@/components/home/Location";
import { PlanTypes } from "@/components/home/PlanTypes";
import { Updates } from "@/components/home/Updates";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/data/site";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "The Halden, residences on Biscayne Bay in Miami",
  description:
    "82 residences on Biscayne Bay in Edgewater, Miami, from studios to penthouses. Pick a floor, adjust the layout and see it in 3D. Completion 2028.",
  path: "/",
});

const organization = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: site.name,
      url: site.url,
    },
    {
      "@type": "ApartmentComplex",
      name: site.name,
      description: site.description,
      url: site.url,
      image: absoluteUrl("/images/bay-causeway.webp"),
      telephone: site.phone,
      numberOfAccommodationUnits: 82,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        addressLocality: site.address.city,
        addressRegion: site.address.region,
        postalCode: site.address.postalCode,
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: site.geo.latitude,
        longitude: site.geo.longitude,
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={organization} />
      <Hero />
      <HowItWorks />
      <PlanTypes />
      <Amenities />
      <Location />
      <Architecture />
      <BuyingProcess />
      <Updates />
      <Faq />
      <Contact />
    </>
  );
}
