export const site = {
  name: "The Halden",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  tagline: "Residences on Biscayne Bay, planned your way.",
  description:
    "The Halden is a 20-storey residential tower on Biscayne Bay in Edgewater, Miami. 82 residences from studios to half-floor penthouses, completion in the second quarter of 2028.",
  completion: "Q2 2028",
  floors: 20,
  address: {
    street: "2410 Bayshore Lane",
    city: "Miami",
    region: "FL",
    postalCode: "33137",
    neighborhood: "Edgewater",
  },
  geo: { latitude: 25.8003, longitude: -80.1873 },
  phone: "+13055550142",
  gallery: {
    street: "2380 Biscayne Boulevard",
    hours: [
      { days: "Monday to Friday", time: "10 am to 7 pm" },
      { days: "Saturday and Sunday", time: "11 am to 5 pm" },
    ],
  },
  updated: "2026-11-02",
  developer: "Halden Bay Partners",
  architect: "Okafor Lindqvist Architects",
};
