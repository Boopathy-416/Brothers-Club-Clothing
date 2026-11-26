
const C = {
  black: { name: "Black", hex: "#1c1c1c" },
  navy: { name: "Navy", hex: "#1f2a44" },
  grey: { name: "Grey", hex: "#8a8a88" },
  olive: { name: "Olive", hex: "#5b5f3a" },
  beige: { name: "Beige", hex: "#d6c6a8" },
  white: { name: "White", hex: "#ffffff" },
  charcoal: { name: "Charcoal", hex: "#3a3a3a" },
};

function colour(key, image) {
  return { ...C[key], image };
}

function seededStock(code, colours, sizes) {
  const stock = {};

  let seed = [...code].reduce(
    (a, ch) => a + ch.charCodeAt(0),
    0
  );

  for (const c of colours) {
    for (const s of sizes) {
      seed = (seed * 9301 + 49297) % 233280;

      const n = Math.floor((seed / 233280) * 420);

      stock[`${c.name}|${s}`] = n < 30 ? 0 : n;
    }
  }

  return stock;
}

const seeds = [
  {
    code: "BC-FP-101",
    slug: "king-roma-premium-formal-pant",
    name: "King Roma Premium Formal Pant",
    category: "formal",
    styleType: "Slim Fit Formal",
    fabric: "Premium Lycra Blend",
    gsm: 240,
    description:
      "Our signature formal trouser. A soft, wrinkle-resistant lycra blend with four-way stretch, a clean flat front and a tapered slim leg that holds its crease from morning to evening.",
    highlights: [
      "Four-way stretch",
      "Wrinkle resistant",
      "Flat front, slim taper",
      "Hook-and-bar closure",
    ],
    colours: [
      colour("black", "/images/p-kingroma-black.png"),
      colour("navy", "/images/p-kingroma-navy.png"),
      colour("grey", "/images/p-kingroma-grey.png"),
    ],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL"],
    moq: 24,
    gallery: [
      "/images/p-detail-waist.png",
      "/images/cat-formal.png",
    ],
    availability: "in-stock",
    featured: true,
    isNew: false,
  },
  {
    code: "BC-FP-104",
    slug: "king-roma-slim-fit-formal",
    name: "King Roma Slim Fit Formal",
    category: "formal",
    styleType: "Extra Slim Formal",
    fabric: "Poly Viscose Lycra",
    gsm: 230,
    description:
      "A sharper, narrower cut of the King Roma line for younger retail customers. Lightweight poly-viscose with lycra for movement and a smooth, matte finish.",
    highlights: [
      "Extra slim leg",
      "Matte finish",
      "Lightweight",
      "Side slant pockets",
    ],
    colours: [
      colour("navy", "/images/p-kingroma-navy.png"),
      colour("black", "/images/p-kingroma-black.png"),
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    moq: 24,
    gallery: ["/images/p-detail-waist.png"],
    availability: "in-stock",
    featured: false,
    isNew: true,
  },
  {
    code: "BC-FP-110",
    slug: "executive-stretch-trouser",
    name: "Executive Stretch Trouser",
    category: "formal",
    styleType: "Regular Fit Formal",
    fabric: "Cotton Lycra Twill",
    gsm: 260,
    description:
      "A comfortable regular-fit trouser in a structured cotton-lycra twill. Generous through the seat and thigh with extended sizes up to 6XL.",
    highlights: [
      "Regular comfort fit",
      "Extended sizes to 6XL",
      "Durable twill",
      "Double-stitched seams",
    ],
    colours: [
      colour("grey", "/images/p-kingroma-grey.png"),
      colour("black", "/images/p-kingroma-black.png"),
    ],
    sizes: ["M", "L", "XL", "2XL", "3XL", "4XL", "5XL", "6XL"],
    moq: 36,
    gallery: [
      "/images/p-detail-waist.png",
      "/images/cat-formal.png",
    ],
    availability: "low-stock",
    featured: true,
    isNew: false,
  },
  {
    code: "BC-TP-201",
    slug: "velocity-lycra-track-pant",
    name: "Velocity Lycra Track Pant",
    category: "track-pants",
    styleType: "Track Pant",
    fabric: "Polyester Lycra",
    gsm: 210,
    description:
      "A quick-dry polyester lycra track pant with a contrast side stripe, zip pockets and a tapered leg. A dependable best seller for sportswear counters.",
    highlights: [
      "Quick dry",
      "Zip side pockets",
      "Contrast side stripe",
      "Elastic waist with drawcord",
    ],
    colours: [
      colour("black", "/images/p-track-black.png"),
      colour("navy", "/images/cat-track.png"),
    ],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    moq: 30,
    gallery: ["/images/cat-track.png"],
    availability: "in-stock",
    featured: true,
    isNew: false,
  },
  {
    code: "BC-TP-205",
    slug: "core-fleece-jogger",
    name: "Core Fleece Jogger",
    category: "track-pants",
    styleType: "Jogger",
    fabric: "Cotton Fleece",
    gsm: 280,
    description:
      "A brushed cotton fleece jogger with ribbed cuffs and a soft hand-feel. Built for lounge and winter season retail.",
    highlights: [
      "Brushed inner fleece",
      "Ribbed cuffs",
      "Deep side pockets",
      "Drawstring waist",
    ],
    colours: [
      colour("grey", "/images/p-track-grey.png"),
      colour("charcoal", "/images/p-track-black.png"),
    ],
    sizes: ["M", "L", "XL", "2XL", "3XL"],
    moq: 30,
    gallery: [],
    availability: "made-to-order",
    featured: false,
    isNew: true,
  },
  {
    code: "BC-CJ-301",
    slug: "urban-cargo-jogger",
    name: "Urban Cargo Jogger",
    category: "track-pants",
    styleType: "Cargo Jogger",
    fabric: "Cotton Spandex Twill",
    gsm: 250,
    description:
      "A utility cargo jogger with flap side pockets, an elasticated cuff and a relaxed tapered fit. Rugged cotton-spandex twill for street style.",
    highlights: [
      "Six-pocket utility build",
      "Elastic cuffs",
      "Relaxed taper",
      "Garment washed",
    ],
    colours: [
      colour("olive", "/images/p-cargo-olive.png"),
      colour("navy", "/images/cat-track.png"),
    ],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL"],
    moq: 24,
    gallery: [],
    availability: "in-stock",
    featured: true,
    isNew: true,
  },
  {
    code: "BC-SH-401",
    slug: "weekend-chino-short",
    name: "Weekend Chino Short",
    category: "shorts",
    styleType: "Chino Short",
    fabric: "Cotton Stretch Twill",
    gsm: 220,
    description:
      "A clean chino short with a mid-thigh length, slant pockets and a soft stretch twill. Easy summer retail staple.",
    highlights: [
      "Mid-thigh length",
      "Soft stretch twill",
      "Back welt pockets",
      "Button and zip fly",
    ],
    colours: [
      colour("beige", "/images/p-shorts-beige.png"),
      colour("olive", "/images/cat-shorts.png"),
    ],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    moq: 30,
    gallery: ["/images/cat-shorts.png"],
    availability: "in-stock",
    featured: true,
    isNew: false,
  },
  {
    code: "BC-SH-405",
    slug: "active-cargo-short",
    name: "Active Cargo Short",
    category: "shorts",
    styleType: "Cargo Short",
    fabric: "Cotton Ripstop",
    gsm: 230,
    description:
      "A durable ripstop cargo short with flap pockets and an elastic-back waistband for an easier fit across sizes.",
    highlights: [
      "Ripstop weave",
      "Flap cargo pockets",
      "Elastic-back waist",
      "Knee length",
    ],
    colours: [
      colour("olive", "/images/cat-shorts.png"),
      colour("beige", "/images/p-shorts-beige.png"),
    ],
    sizes: ["M", "L", "XL", "2XL", "3XL", "4XL"],
    moq: 30,
    gallery: [],
    availability: "low-stock",
    featured: false,
    isNew: false,
  },
  {
    code: "BC-TS-501",
    slug: "essential-crew-tee",
    name: "Essential Crew Tee",
    category: "t-shirts",
    styleType: "Crew Neck T-Shirt",
    fabric: "100% Combed Cotton Bio-Washed",
    gsm: 180,
    description:
      "A refined everyday crew neck in bio-washed combed cotton. Pre-shrunk, colour fast and finished with a taped neckline.",
    highlights: [
      "Bio-washed combed cotton",
      "Pre-shrunk",
      "Taped neckline",
      "Colour fast",
    ],
    colours: [
      colour("white", "/images/p-tee-white.png"),
      colour("charcoal", "/images/cat-tshirts.png"),
    ],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
    moq: 48,
    gallery: ["/images/cat-tshirts.png"],
    availability: "in-stock",
    featured: true,
    isNew: false,
  },
  {
    code: "BC-TS-510",
    slug: "classic-pique-polo",
    name: "Classic Pique Polo",
    category: "t-shirts",
    styleType: "Polo T-Shirt",
    fabric: "Cotton Pique",
    gsm: 220,
    description:
      "A structured pique polo with a ribbed collar and two-button placket. Smart enough for uniforms and casual Fridays alike.",
    highlights: [
      "Cotton pique knit",
      "Ribbed collar and cuffs",
      "Two-button placket",
      "Side vents",
    ],
    colours: [
      colour("navy", "/images/p-polo-navy.png"),
    ],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    moq: 36,
    gallery: [],
    availability: "in-stock",
    featured: false,
    isNew: true,
  },
  {
    code: "BC-FP-120",
    slug: "signature-pleated-formal",
    name: "Signature Pleated Formal",
    category: "formal",
    styleType: "Pleated Formal",
    fabric: "Terry Rayon",
    gsm: 250,
    description:
      "A classic single-pleat formal trouser in terry rayon with a fuller leg. Favoured by traditional menswear stores.",
    highlights: [
      "Single front pleat",
      "Fuller leg",
      "Terry rayon drape",
      "Extended waistband",
    ],
    colours: [
      colour("grey", "/images/p-kingroma-grey.png"),
      colour("navy", "/images/p-kingroma-navy.png"),
    ],
    sizes: ["M", "L", "XL", "2XL", "3XL", "4XL"],
    moq: 24,
    gallery: ["/images/p-detail-waist.png"],
    availability: "out-of-stock",
    featured: false,
    isNew: false,
  },
  {
    code: "BC-TP-212",
    slug: "track-pro-tapered-pant",
    name: "Track Pro Tapered Pant",
    category: "track-pants",
    styleType: "Track Pant",
    fabric: "NS Lycra",
    gsm: 200,
    description:
      "A lightweight NS lycra track pant with a slim taper and ankle zips. Ideal for gyms, sportswear and school uniform retailers.",
    highlights: [
      "Ankle zips",
      "Slim taper",
      "Lightweight NS lycra",
      "Anti-pilling",
    ],
    colours: [
      colour("navy", "/images/cat-track.png"),
      colour("black", "/images/p-track-black.png"),
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    moq: 30,
    gallery: [],
    availability: "in-stock",
    featured: false,
    isNew: false,
  },
];

export const SEED_PRODUCTS = seeds.map((s, i) => ({
  ...s,
  id: `p${String(i + 1).padStart(3, "0")}`,
  published: true,
  createdAt:
    s.createdAt ?? `2026-0${(i % 9) + 1}-1${i % 9}T10:00:00.000Z`,
  stock: seededStock(s.code, s.colours, s.sizes),
}));

export function getSeedProduct(slug) {
  return SEED_PRODUCTS.find((p) => p.slug === slug);
}
