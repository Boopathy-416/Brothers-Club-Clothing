
import { SEED_PRODUCTS } from "./catlog";

export const DEMO_RETAILER_PASSWORD = "demo1234";

export const SEED_STAFF = [
  {
    id: "s1",
    name: "Karthik Raja",
    email: "admin@winstartex.com",
    role: "Super Admin",
    passwordHash:
      "c759c1b0c71ce37e59cd91d5d28a2a1af9840e27c0ede7a57806fd537d884c3b",
    active: true,
  },
  {
    id: "s2",
    name: "Priya Senthil",
    email: "manager@winstartex.com",
    role: "Manager",
    passwordHash:
      "39f49dc90d3e0534f4dcc133674d389ef114cff87fdbf5716f91a01ced21f519",
    active: true,
  },
  {
    id: "s3",
    name: "Arun Kumar",
    email: "sales@winstartex.com",
    role: "Sales Staff",
    passwordHash:
      "97627167cfcf714a14d3a0c6e8408c1d4949f5dc2f5c6f62cd7c4706ee3df092",
    active: true,
  },
];

const demoHash =
  "ab7603f80e56e5c9712aa91ace15e8642f1c14b5fe4f201ecc2be809fd5ab212";

export const SEED_RETAILERS = [
  {
    id: "r1",
    shopName: "ABC Menswear",
    ownerName: "Ravi Shankar",
    mobile: "9876543210",
    whatsapp: "9876543210",
    email: "retailer@demo.in",
    gst: "33ABCDE1234F1Z5",
    address: "24, Ranganathan Street, T. Nagar",
    city: "Chennai",
    state: "Tamil Nadu",
    pincode: "600017",
    businessType: "Retail Shop",
    status: "Approved",
    passwordHash: demoHash,
    createdAt: "2026-08-02T09:00:00.000Z",
    addresses: [
      {
        id: "a1",
        label: "Main store",
        address: "24, Ranganathan Street, T. Nagar",
        city: "Chennai",
        state: "Tamil Nadu",
        pincode: "600017",
      },
    ],
  },
  {
    id: "r2",
    shopName: "Style Hub Garments",
    ownerName: "Mohammed Irfan",
    mobile: "9845012345",
    whatsapp: "9845012345",
    email: "stylehub@demo.in",
    address: "11, Commercial Street",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560001",
    businessType: "Wholesale Dealer",
    status: "Approved",
    passwordHash: demoHash,
    createdAt: "2026-08-20T09:00:00.000Z",
    addresses: [],
  },
  {
    id: "r3",
    shopName: "Kerala Fashion Point",
    ownerName: "Anil Thomas",
    mobile: "9447001122",
    whatsapp: "9447001122",
    email: "kfp@demo.in",
    address: "MG Road",
    city: "Kochi",
    state: "Kerala",
    pincode: "682016",
    businessType: "Distributor",
    status: "Pending",
    passwordHash: demoHash,
    createdAt: "2026-11-12T09:00:00.000Z",
    addresses: [],
  },
  {
    id: "r4",
    shopName: "Royal Mens Corner",
    ownerName: "Suresh Patel",
    mobile: "9824055667",
    whatsapp: "9824055667",
    email: "royal@demo.in",
    address: "Ring Road",
    city: "Surat",
    state: "Gujarat",
    pincode: "395002",
    businessType: "Retail Shop",
    status: "Pending",
    passwordHash: demoHash,
    createdAt: "2026-11-14T09:00:00.000Z",
    addresses: [],
  },
];

function items(spec) {
  return spec.map(([pi, colour, size, qty]) => {
    const p = SEED_PRODUCTS[pi];

    return {
      productId: p.id,
      productName: p.name,
      productCode: p.code,
      colour,
      size,
      qty,
    };
  });
}

function enquiry(
  n,
  createdAt,
  status,
  retailer,
  lines,
  assignedTo
) {
  return {
    id: `BC-2026-${String(n).padStart(5, "0")}`,
    createdAt,
    status,
    retailerId: retailer.id,

    retailer: {
      shopName: retailer.shopName,
      ownerName: retailer.ownerName,
      mobile: retailer.mobile,
      whatsapp: retailer.whatsapp,
      email: retailer.email,
      gst: retailer.gst,
    },

    delivery: {
      address: retailer.address,
      city: retailer.city,
      state: retailer.state,
      pincode: retailer.pincode,
    },

    instructions:
      n % 2 === 0
        ? "Please pack each size separately with size stickers."
        : "",

    items: lines,

    totalPieces: lines.reduce((a, l) => a + l.qty, 0),

    assignedTo,

    notes: [],

    history: [
      {
        at: createdAt,
        by: "Website",
        status: "New Enquiry",
      },
    ],
  };
}

const [r1, r2, r3] = SEED_RETAILERS;

export const SEED_ENQUIRIES = [
  enquiry(
    1,
    "2026-09-05T11:20:00.000Z",
    "Completed",
    r1,
    items([
      [0, "Black", "M", 12],
      [0, "Black", "L", 24],
      [0, "Black", "XL", 24],
      [5, "Navy", "L", 12],
      [5, "Navy", "XL", 12],
    ]),
    "s3"
  ),

  enquiry(
    2,
    "2026-09-28T09:10:00.000Z",
    "Dispatched",
    r2,
    items([
      [3, "Black", "M", 30],
      [3, "Black", "L", 40],
      [8, "White", "L", 48],
    ]),
    "s3"
  ),

  enquiry(
    3,
    "2026-10-10T15:45:00.000Z",
    "Confirmed",
    r1,
    items([
      [6, "Beige", "M", 15],
      [6, "Beige", "L", 15],
      [9, "Navy", "XL", 36],
    ]),
    "s2"
  ),

  enquiry(
    4,
    "2026-10-22T10:00:00.000Z",
    "Quotation Sent",
    r3,
    items([
      [2, "Grey", "XL", 18],
      [2, "Grey", "2XL", 18],
      [0, "Navy", "L", 24],
    ]),
    "s3"
  ),

  enquiry(
    5,
    "2026-11-03T12:30:00.000Z",
    "Under Review",
    r2,
    items([
      [5, "Olive", "M", 12],
      [5, "Olive", "L", 12],
      [5, "Olive", "XL", 12],
    ])
  ),

  enquiry(
    6,
    "2026-11-09T08:15:00.000Z",
    "Enquiry Received",
    r1,
    items([
      [0, "Grey", "M", 12],
      [0, "Grey", "L", 12],
      [8, "Charcoal", "M", 24],
      [8, "Charcoal", "L", 24],
    ]),
    "s3"
  ),

  enquiry(
    7,
    "2026-11-13T17:05:00.000Z",
    "New Enquiry",
    r2,
    items([
      [11, "Navy", "L", 30],
      [3, "Black", "XL", 30],
    ])
  ),

  enquiry(
    8,
    "2026-11-15T13:40:00.000Z",
    "New Enquiry",
    r3,
    items([
      [0, "Black", "L", 24],
      [0, "Black", "XL", 24],
      [6, "Olive", "L", 30],
    ])
  ),
];

SEED_ENQUIRIES[3].quotation = {
  notes:
    "Ex-factory Tiruppur. Grey formal at special volume rate, King Roma navy at standard trade rate. Freight extra.",
  amount: "₹ 41,760",
  validUntil: "2026-11-30",
  sharedWithRetailer: true,
  updatedAt: "2026-10-23T10:00:00.000Z",
  updatedBy: "Arun Kumar",
};

export const SEED_SETTINGS = {
  guestEnquiry: true,
  whatsappNumber: "918056171978",
  announcement:
    "Manufacturer-direct wholesale from Tiruppur · Pan-India dispatch",
  heroHeadline: "Premium menswear. Built for retailers.",
  heroSubheadline:
    "Formal pants, track pants, shorts and t-shirts manufactured by Winstar Tex, Tiruppur. Build your wholesale order by colour and size, then send it straight to our sales desk.",
};
