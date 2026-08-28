// ponytail: seeds the DB with the same data the admin frontend's mock files used
// to hardcode (data/customers.ts, data/orders.ts, ProductsContext.tsx, data/events.ts),
// so pages migrated onto the real API show familiar data instead of an empty state.
// Skipped: data/inventory.ts / onlineInventory.ts / liveDeductions.ts (multi-warehouse
// stock + simulated deduction feed) — that's Phase 5's own dataset, seed it then.
import { PrismaClient, MainCategory, ProductStatus, OrderStatus, Carrier, EventType, EventStatus } from "@prisma/client";

const prisma = new PrismaClient();

const customersData = [
  { id: "1", name: "Michael Brown", email: "michael@example.com", phone: "+1 202-555-0143", location: "Austin, TX, USA" },
  { id: "2", name: "Sofia Mendez", email: "sofia.mendez@example.com", phone: "+1 415-555-0118", location: "San Francisco, CA, USA" },
  { id: "3", name: "Marie Dupont", email: "marie.dupont@example.com", phone: "+33 1 42 68 53 00", location: "Paris, France" },
  { id: "4", name: "Yuki Tanaka", email: "yuki.tanaka@example.com", phone: "+81 3-1234-5678", location: "Tokyo, Japan" },
  { id: "5", name: "Clara Hoffmann", email: "clara.hoffmann@example.com", phone: "+49 30 12345678", location: "Berlin, Germany" },
  { id: "6", name: "Amara Osei", email: "amara.osei@example.com", phone: "+233 24 123 4567", location: "Accra, Ghana" },
  { id: "7", name: "Liam O'Connor", email: "liam.oconnor@example.com", phone: "+353 1 234 5678", location: "Dublin, Ireland" },
];

function parseLocation(location: string) {
  const parts = location.split(",").map((p) => p.trim());
  if (parts.length === 3) return { city: parts[0], state: parts[1], country: parts[2] };
  if (parts.length === 2) return { city: parts[0], state: null, country: parts[1] };
  return { city: null, state: null, country: location };
}

const productsData = [
  { id: "seed-1", name: "Pachakuti Scarf", sku: "SC-001", subcategory: "Shawls / Scarfs", group: "Accessories", section: "Scarfs", price: 140, stock: 145, status: "Active", composition: "70% Baby Alpaca 30% Silk", weight: "130 g", dimensions: "180 x 30 cm", origin: "Made in Peru", colors: ["Fuchsia & Blue", "Coral & Red", "Stone Gray"], description: "PACHAKUTI takes its name from the Quechua word for transformation, a scarf woven to move easily between seasons and settings." },
  { id: "seed-2", name: "Quri Scarf", sku: "SC-002", subcategory: "Shawls / Scarfs", group: "Accessories", section: "Scarfs", price: 130, stock: 145, status: "Active" },
  { id: "seed-3", name: "Yachay Scarf", sku: "SC-003", subcategory: "Shawls / Scarfs", group: "Accessories", section: "Scarfs", price: 210, stock: 145, status: "Active" },
  { id: "seed-3b", name: "Scarf T'ikay", sku: "SC-004", subcategory: "Shawls / Scarfs", group: "Accessories", section: "Scarfs", price: 190, stock: 145, status: "Active", composition: "70% Baby Alpaca 30% Silk", weight: "100 g", dimensions: "180 x 30 cm", origin: "Peru", colors: ["Fuchsia & Blue", "Coral & Red", "Stone Gray"] },
  { id: "seed-3c", name: "Lianpu Scarf", sku: "SC-005", subcategory: "Shawls / Scarfs", group: "Accessories", section: "Scarfs", price: 130, stock: 145, status: "Active" },
  { id: "seed-3d", name: "Tinkuy Scarf", sku: "SC-006", subcategory: "Shawls / Scarfs", group: "Accessories", section: "Scarfs", price: 149, stock: 145, status: "Active" },
  { id: "seed-3e", name: "Tawa Scarf", sku: "SC-007", subcategory: "Shawls / Scarfs", group: "Accessories", section: "Scarfs", price: 190, stock: 145, status: "Active" },
  { id: "seed-3f", name: "Ñahua Scarf", sku: "SC-008", subcategory: "Shawls / Scarfs", group: "Accessories", section: "Scarfs", price: 500, stock: 145, status: "Active" },
  { id: "seed-4", name: "Q'uñi Shawl", sku: "SH-001", subcategory: "Shawls / Scarfs", group: "Accessories", section: "Shawls", price: 190, stock: 145, status: "Active" },
  { id: "seed-5", name: "Sinchi Shawl", sku: "SH-002", subcategory: "Shawls / Scarfs", group: "Accessories", section: "Shawls", price: 190, stock: 145, status: "Active" },
  { id: "seed-5b", name: "Sumaq Shawl", sku: "SH-003", subcategory: "Shawls / Scarfs", group: "Accessories", section: "Shawls", price: 170, stock: 145, status: "Active" },
  { id: "seed-5c", name: "Sayri Shawl", sku: "SH-004", subcategory: "Shawls / Scarfs", group: "Accessories", section: "Shawls", price: 160, stock: 145, status: "Active" },
  { id: "seed-6", name: "Soft Pullover", sku: "PL-001", subcategory: "Pullovers", group: "Ready to Wear", price: 210, stock: 80, status: "Active" },
  { id: "seed-7", name: "Cream Cardigan", sku: "CG-001", subcategory: "Cardigans", group: "Ready to Wear", price: 240, stock: 60, status: "Active" },
  { id: "seed-8", name: "Alpaca Coat", sku: "CT-001", subcategory: "Coats", group: "Ready to Wear", price: 480, stock: 35, status: "Active" },
  { id: "seed-9", name: "Wool Cape", sku: "CP-001", subcategory: "Capes", group: "Ready to Wear", price: 320, stock: 42, status: "Active" },
  { id: "seed-10", name: "Knit Beanie", sku: "HW-001", subcategory: "Headwears", group: "Accessories", price: 95, stock: 120, status: "Active" },
  { id: "seed-11", name: "Alpaca Mittens", sku: "GM-001", subcategory: "Gloves & Mittens", group: "Accessories", price: 70, stock: 150, status: "Active" },
  { id: "seed-12", name: "Alpaca Snood", sku: "SN-001", subcategory: "Snoods & Hoods", group: "Accessories", price: 110, stock: 70, status: "Active" }, // ponytail: mock data reused "SH-001" here, collides with seed-4's SKU — renumbered to SN-001 since Product.sku is unique
];

const eventsData = [
  { id: "1", title: "Les Automnales — Geneva", location: "Palexpo, Geneva, Switzerland", standSubtitle: "Munay Stand : D51", type: "FAIR_EXPO" as const, status: "PUBLISHED" as const, startsAt: new Date("2025-11-07"), endsAt: new Date("2025-11-10"), venueCallout: "Here's where you'll find us inside Les Automnales: Stand D51 in the Market Area.", bulletPoints: ["Step into Munay's world — a space inspired by the landscapes of Peru and the softness of baby alpaca.", "Touch and feel our natural fibres.", "Discover new pieces from our 2025 collection.", "Meet Shalie, Munay's founder, and hear the story behind the brand."], description: "Munay is delighted to be part of Les Automnales Geneva 2025, from November 7 to 10 at Palexpo." },
  { id: "2", title: "An Evening of Empowerment & Elegance", location: "Munay Flagship, Lima, Peru", standSubtitle: null, type: "IN_STORE" as const, status: "PUBLISHED" as const, startsAt: new Date("2025-06-14"), endsAt: null, venueCallout: "Join us in-store for an evening of stories, craft, and community.", bulletPoints: ["Meet the artisans behind our alpaca weaves.", "Preview new arrivals before they launch online.", "Enjoy refreshments and live music."], description: "An intimate evening at our Lima flagship celebrating the women behind Munay's craft." },
  { id: "3", title: "Munay Winter Collection Preview", location: "Grand Palais, Paris, France", standSubtitle: null, type: "FAIR_EXPO" as const, status: "PUBLISHED" as const, startsAt: new Date("2024-12-03"), endsAt: null, venueCallout: "Find our showcase near the east entrance of the Grand Palais.", bulletPoints: ["See the full Winter Collection before it drops.", "Learn about our sourcing from Andean alpaca farms."], description: "A first look at Munay's Winter Collection, showcased at the Grand Palais." },
  { id: "4", title: "Alpaca Pop-up — Larco Mar", location: "Larco Mar, Miraflores, Lima", standSubtitle: null, type: "POP_UP" as const, status: "DRAFT" as const, startsAt: new Date("2025-11-20"), endsAt: new Date("2025-11-23"), venueCallout: "Look for the Munay kiosk on the ocean-view terrace.", bulletPoints: ["Shop limited-run pieces not available online.", "Get accessories made to order on-site."], description: "A weekend pop-up overlooking the Miraflores coastline." },
  { id: "5", title: "Maison & Objet — Paris", location: "Paris Nord Villepinte, France", standSubtitle: null, type: "FAIR_EXPO" as const, status: "SCHEDULED" as const, startsAt: new Date("2025-09-04"), endsAt: new Date("2025-09-08"), venueCallout: "Visit our booth in the Craft & Origins hall.", bulletPoints: ["Meet our team for wholesale and press inquiries.", "Preview our new home accessories line."], description: "Munay returns to Maison & Objet to present our latest home and accessory lines." },
];

const orderStatusSequence: OrderStatus[] = ["SHIPPED", "PENDING", "SHIPPED", "DELIVERED", "PROCESSING", "CANCELLED", "DELIVERED", "DELIVERED"];
const orderProducts = ["Oversized Coat", "Alpaca Silk Scarf", "Alpaca Overcoat", "Alpaca Knit Sweater", "Women's Alpaca Cardigan"];
const orderAmounts = [189.5, 259.0, 342.0, 120.0, 258.5, 85.0, 510.0, 149.0];
const orderCarriers: Carrier[] = ["DHL", "DPD", "LA_POSTE"];
const SHIPPING_COST = 9.99;
const TAX_RATE = 0.08;

async function main() {
  console.log("Seeding customers...");
  const customerByEmail = new Map<string, { id: string }>();
  for (const c of customersData) {
    const { city, state, country } = parseLocation(c.location);
    const customer = await prisma.customer.upsert({
      where: { email: c.email },
      update: {},
      create: { email: c.email, name: c.name, phone: c.phone, city, state, country },
    });
    customerByEmail.set(c.email, customer);
  }

  console.log("Seeding subcategories + products + variants + inventory...");
  const warehouse = await prisma.warehouse.upsert({
    where: { id: "seed-warehouse-main" },
    update: {},
    create: { id: "seed-warehouse-main", name: "Main Warehouse", type: "PHYSICAL", location: "Lima, Peru" },
  });

  const subcategoryByName = new Map<string, { id: string }>();
  for (const p of productsData) {
    let subcategory = subcategoryByName.get(p.subcategory);
    if (!subcategory) {
      subcategory = await prisma.subcategory.upsert({
        where: { mainCategory_name: { mainCategory: MainCategory.WOMEN, name: p.subcategory } },
        update: {},
        create: { mainCategory: MainCategory.WOMEN, name: p.subcategory, group: p.group },
      });
      subcategoryByName.set(p.subcategory, subcategory);
    }

    const product = await prisma.product.upsert({
      where: { sku: p.sku },
      update: {},
      create: {
        name: p.name,
        sku: p.sku,
        subcategoryId: subcategory.id,
        section: p.section,
        price: p.price,
        composition: p.composition,
        weight: p.weight,
        dimensions: p.dimensions,
        origin: p.origin,
        description: p.description,
        status: p.status === "Active" ? ProductStatus.ACTIVE : ProductStatus.DRAFT,
      },
    });

    const color = p.colors?.[0] ?? "Default";
    const variant = await prisma.productVariant.upsert({
      where: { sku: `${p.sku}-DEF` },
      update: {},
      create: {
        productId: product.id,
        sku: `${p.sku}-DEF`,
        color,
        size: "One Size",
        price: p.price,
        status: ProductStatus.ACTIVE,
      },
    });

    await prisma.inventory.upsert({
      where: { variantId_warehouseId: { variantId: variant.id, warehouseId: warehouse.id } },
      update: {},
      create: { variantId: variant.id, warehouseId: warehouse.id, quantityOnHand: p.stock, reorderPoint: 10 },
    });
  }

  console.log("Seeding orders + order items...");
  for (let i = 0; i < orderStatusSequence.length; i++) {
    const customerMock = customersData[i % customersData.length];
    const customer = customerByEmail.get(customerMock.email)!;
    const status = orderStatusSequence[i];
    const unitPrice = orderAmounts[i % orderAmounts.length];
    const subtotal = unitPrice;
    const tax = subtotal * TAX_RATE;
    const total = subtotal + SHIPPING_COST + tax;
    const carrier = orderCarriers[i % orderCarriers.length];
    const productName = orderProducts[i % orderProducts.length];
    const orderNumber = 12340 + i;

    const existing = await prisma.order.findUnique({ where: { orderNumber } });
    if (existing) continue;

    await prisma.order.create({
      data: {
        orderNumber,
        customerId: customer.id,
        status,
        channel: "ONLINE",
        subtotal,
        shippingCost: SHIPPING_COST,
        tax,
        total,
        shippingFullName: customerMock.name,
        shippingCountry: parseLocation(customerMock.location).country,
        carrier: status === "PENDING" ? null : carrier,
        trackingId: status === "PENDING" ? null : `${carrier.slice(0, 2)}${String(i + 1).padStart(9, "0")}CH`,
        items: {
          create: [
            {
              sku: `${productName.slice(0, 2).toUpperCase()}-${String(i + 1).padStart(3, "0")}`,
              productName,
              variantLabel: "Size: M  Color: Ivory",
              unitPrice,
              quantity: 1,
              lineTotal: unitPrice,
            },
          ],
        },
        statusEvents: { create: [{ status }] },
      },
    });
  }

  console.log("Seeding events...");
  for (const e of eventsData) {
    await prisma.event.upsert({
      where: { id: `seed-event-${e.id}` },
      update: {},
      create: {
        id: `seed-event-${e.id}`,
        title: e.title,
        description: e.description,
        location: e.location,
        standSubtitle: e.standSubtitle,
        venueCallout: e.venueCallout,
        bulletPoints: e.bulletPoints,
        type: e.type as EventType,
        status: e.status as EventStatus,
        startsAt: e.startsAt,
        endsAt: e.endsAt,
      },
    });
  }

  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
