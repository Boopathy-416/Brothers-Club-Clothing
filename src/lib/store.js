
import { useSyncExternalStore } from "react";
import { SEED_PRODUCTS } from "./catlog";
import {
  SEED_ENQUIRIES,
  SEED_RETAILERS,
  SEED_SETTINGS,
  SEED_STAFF,
} from "./seed";

const STORAGE_KEY = "bc-wholesale-demo-v1";

const initialState = {
  products: SEED_PRODUCTS,
  cart: [],
  savedCart: null,
  wishlist: [],
  enquiries: SEED_ENQUIRIES,
  retailers: SEED_RETAILERS,
  staff: SEED_STAFF,
  settings: SEED_SETTINGS,
  retailerSessionId: null,
  staffSessionId: null,
  enquiryCounter: SEED_ENQUIRIES.length,
};

let state = initialState;
let loaded = false;
const listeners = new Set();

function load() {
  if (loaded || typeof window === "undefined") return;

  loaded = true;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (raw) {
      state = { ...initialState, ...JSON.parse(raw) };
    }
  } catch {
    state = initialState;
  }
}

function persist() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

function setState(updater) {
  load();

  state = { ...state, ...updater(state) };

  persist();

  listeners.forEach((listener) => listener());
}

function subscribe(listener) {
  listeners.add(listener);

  const onStorage = (event) => {
    if (event.key !== STORAGE_KEY) return;

    loaded = false;
    load();
    listener();
  };

  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot() {
  load();
  return state;
}

function getServerSnapshot() {
  return initialState;
}

export function useStore(selector) {
  return selector(
    useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  );
}

export function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export function readState() {
  load();
  return state;
}

export async function hashPassword(password) {
  const data = new TextEncoder().encode(`bc-salt:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);

  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

const lineKey = (line) =>
  `${line.productId}|${line.colour}|${line.size}`;

export const actions = {
  setProductLines(productId, lines) {
    setState((s) => ({
      cart: [
        ...s.cart.filter((line) => line.productId !== productId),
        ...lines
          .filter((line) => line.qty > 0)
          .map((line) => ({
            ...line,
            productId,
            qty: Math.floor(line.qty),
          })),
      ],
    }));
  },

  addLines(lines) {
    setState((s) => {
      const map = new Map(
        s.cart.map((line) => [lineKey(line), { ...line }])
      );

      for (const line of lines) {
        if (line.qty <= 0) continue;

        const existing = map.get(lineKey(line));

        if (existing) {
          existing.qty += Math.floor(line.qty);
        } else {
          map.set(lineKey(line), {
            ...line,
            qty: Math.floor(line.qty),
          });
        }
      }

      return { cart: [...map.values()] };
    });
  },

  updateLineQty(line, qty) {
    const safe = Math.max(
      0,
      Math.floor(Number.isFinite(qty) ? qty : 0)
    );

    setState((s) => ({
      cart:
        safe === 0
          ? s.cart.filter((item) => lineKey(item) !== lineKey(line))
          : s.cart.map((item) =>
              lineKey(item) === lineKey(line)
                ? { ...item, qty: safe }
                : item
            ),
    }));
  },

  removeLine(line) {
    setState((s) => ({
      cart: s.cart.filter(
        (item) => lineKey(item) !== lineKey(line)
      ),
    }));
  },

  removeProduct(productId) {
    setState((s) => ({
      cart: s.cart.filter((line) => line.productId !== productId),
    }));
  },

  clearCart() {
    setState(() => ({ cart: [] }));
  },

  saveCart() {
    setState((s) => ({ savedCart: s.cart }));
  },

  restoreSavedCart() {
    setState((s) => ({
      cart: s.savedCart ?? s.cart,
    }));
  },

  toggleWishlist(productId) {
    setState((s) => ({
      wishlist: s.wishlist.includes(productId)
        ? s.wishlist.filter((id) => id !== productId)
        : [...s.wishlist, productId],
    }));
  },

  submitEnquiry(input) {
    const s = readState();

    const products = new Map(
      s.products.map((product) => [product.id, product])
    );

    const items = s.cart
      .filter((line) => products.has(line.productId))
      .map((line) => {
        const product = products.get(line.productId);

        return {
          productId: product.id,
          productName: product.name,
          productCode: product.code,
          colour: line.colour,
          size: line.size,
          qty: line.qty,
        };
      });

    if (items.length === 0) {
      throw new Error("Your enquiry cart is empty.");
    }

    const n = s.enquiryCounter + 1;
    const now = new Date().toISOString();

    const enquiry = {
      id: `BC-${new Date().getFullYear()}-${String(n).padStart(5, "0")}`,
      createdAt: now,
      status: "New Enquiry",
      retailerId: s.retailerSessionId ?? undefined,
      retailer: input.retailer,
      delivery: input.delivery,
      instructions: input.instructions,
      items,
      totalPieces: items.reduce((total, item) => total + item.qty, 0),
      notes: [],
      history: [
        {
          at: now,
          by: "Website",
          status: "New Enquiry",
        },
      ],
    };

    setState((st) => ({
      enquiries: [enquiry, ...st.enquiries],
      enquiryCounter: n,
      cart: [],
    }));

    return enquiry;
  },

  async registerRetailer(input) {
    const s = readState();
    const email = input.email.trim().toLowerCase();

    if (s.retailers.some((r) => r.email.toLowerCase() === email)) {
      throw new Error("An account with this email already exists.");
    }

    const { password, ...rest } = input;

    const retailer = {
      ...rest,
      email,
      id: `r${Date.now()}`,
      status: "Pending",
      passwordHash: await hashPassword(password),
      createdAt: new Date().toISOString(),
      addresses: [
        {
          id: `a${Date.now()}`,
          label: "Shop address",
          address: rest.address,
          city: rest.city,
          state: rest.state,
          pincode: rest.pincode,
        },
      ],
    };

    setState((st) => ({
      retailers: [...st.retailers, retailer],
      retailerSessionId: retailer.id,
    }));

    return retailer;
  },

  async loginRetailer(email, password) {
    const s = readState();

    const retailer = s.retailers.find(
      (r) =>
        r.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (
      !retailer ||
      retailer.passwordHash !== (await hashPassword(password))
    ) {
      throw new Error("Incorrect email or password.");
    }

    setState(() => ({
      retailerSessionId: retailer.id,
    }));

    return retailer;
  },

  logoutRetailer() {
    setState(() => ({ retailerSessionId: null }));
  },

  updateRetailer(id, patch) {
    setState((s) => ({
      retailers: s.retailers.map((retailer) =>
        retailer.id === id
          ? { ...retailer, ...patch }
          : retailer
      ),
    }));
  },

  async loginStaff(email, password) {
    const s = readState();

    const staff = s.staff.find(
      (member) =>
        member.email.toLowerCase() === email.trim().toLowerCase() &&
        member.active
    );

    if (
      !staff ||
      staff.passwordHash !== (await hashPassword(password))
    ) {
      throw new Error("Incorrect email or password.");
    }

    setState(() => ({
      staffSessionId: staff.id,
    }));

    return staff;
  },

  logoutStaff() {
    setState(() => ({ staffSessionId: null }));
  },

  async addStaff(input) {
    const { password, ...rest } = input;

    const member = {
      ...rest,
      id: `s${Date.now()}`,
      active: true,
      passwordHash: await hashPassword(password),
    };

    setState((s) => ({
      staff: [...s.staff, member],
    }));
  },

  updateStaff(id, patch) {
    setState((s) => ({
      staff: s.staff.map((member) =>
        member.id === id
          ? { ...member, ...patch }
          : member
      ),
    }));
  },

  upsertProduct(product) {
    setState((s) => ({
      products: s.products.some((p) => p.id === product.id)
        ? s.products.map((p) =>
            p.id === product.id ? product : p
          )
        : [product, ...s.products],
    }));
  },

  deleteProduct(id) {
    setState((s) => ({
      products: s.products.filter((p) => p.id !== id),
      cart: s.cart.filter((line) => line.productId !== id),
    }));
  },

  setStock(updates) {
    setState((s) => ({
      products: s.products.map((product) => {
        const mine = updates.filter(
          (update) => update.productId === product.id
        );

        if (!mine.length) return product;

        const stock = { ...product.stock };

        for (const update of mine) {
          stock[update.key] = Math.max(
            0,
            Math.floor(update.qty)
          );
        }

        return { ...product, stock };
      }),
    }));
  },

  updateEnquiry(id, by, patch) {
    const now = new Date().toISOString();

    setState((s) => ({
      enquiries: s.enquiries.map((enquiry) => {
        if (enquiry.id !== id) return enquiry;

        const next = { ...enquiry };

        if (patch.status && patch.status !== enquiry.status) {
          next.status = patch.status;

          next.history = [
            ...enquiry.history,
            {
              at: now,
              by,
              status: patch.status,
            },
          ];
        }

        if ("assignedTo" in patch) {
          next.assignedTo = patch.assignedTo;
        }

        if (patch.quotation) {
          next.quotation = patch.quotation;
        }

        if (patch.note) {
          next.notes = [
            ...enquiry.notes,
            {
              at: now,
              by,
              text: patch.note,
            },
          ];
        }

        return next;
      }),
    }));
  },

  updateSettings(patch) {
    setState((s) => ({
      settings: {
        ...s.settings,
        ...patch,
      },
    }));
  },

  resetDemo() {
    state = initialState;
    persist();
    listeners.forEach((listener) => listener());
  },
};
