
export const SITE = {
  brand: "Brothers Club Clothing",
  brandShort: "Brothers Club",
  manufacturer: "Winstar Tex",
  tagline: "Premium menswear. Built for retailers.",
  address: "Karuvampalayam, Tiruppur – 641604, Tamil Nadu, India",
  whatsappDisplay: "+91 80561 71978",
  whatsappNumber: "918056171978",
  email: "sales@winstartex.com",
};

export const CATEGORIES = [
  {
    slug: "formal",
    name: "Formal Pants",
    shortName: "Formal",
    description:
      "Tailored lycra-blend trousers with a sharp drape, built for everyday office wear.",
    image: "/images/cat-formal.png",
  },
  {
    slug: "track-pants",
    name: "Track Pants & Joggers",
    shortName: "Track Pants",
    description:
      "Performance track pants, fleece joggers and cargo joggers for all-day comfort.",
    image: "/images/cat-track.png",
  },
  {
    slug: "shorts",
    name: "Shorts",
    shortName: "Shorts",
    description:
      "Cotton chino and cargo shorts with clean finishing for casual retail.",
    image: "/images/cat-shorts.png",
  },
  {
    slug: "t-shirts",
    name: "T-Shirts",
    shortName: "T-Shirts",
    description:
      "Combed cotton crew necks and pique polos in core retail colours.",
    image: "/images/cat-tshirts.png",
  },
];

export function getCategory(slug) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu & Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];
