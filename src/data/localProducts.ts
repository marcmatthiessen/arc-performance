export interface LocalProduct {
  slug: string
  name: string
  colorway: string
  file: string
  price: number
  priceStr: string
  type: 'racesuit' | 'jersey'
  category: string
  features: string[]
  sizes: string[]
  description: string
  materials: string
  care: string
}

const imgUrl = (file: string) => `/${encodeURIComponent(file)}`

const RACESUIT_FEATURES = [
  'UltraAero™ fabric 180g/m² with 25mmHg graduated compression',
  '6mm triathlon pad — optimized for swim/bike/run',
  'Anti-slip silicone panels on legs',
  'Flatlock seams — zero friction',
  '30cm YKK front zip with chin guard',
  'Waterproof rear pocket 15cm × 8cm',
  'UV 50+ certification',
  'World Triathlon approved',
]

const JERSEY_FEATURES = [
  'AeroMesh™ fabric 140g/m² — 35% more breathable',
  'Semi-aero cut with structured panels',
  '3 rear pockets + 1 waterproof zip pocket',
  'Anti-slip silicone at cuffs',
  'Full-length YKK front zip',
  '360° reflective details for night visibility',
  'UV 50+ protection',
]

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

function toSlug(name: string, type: string) {
  return `${type}-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`
}

const RACESUITS_RAW = [
  { name: "Onyx / Cloud White",       file: "ARC. RACESUIT - ONYX ' CLOUD WHITE.png" },
  { name: "Burgundy / Soft Pink",     file: "ARC. RACESUIT - BURGUNDY ' SOFT PINK.png" },
  { name: "Midnight Navy / Onyx",     file: "ARC. RACESUIT - MIDNIGHT NAVY ' ONYX.png" },
  { name: "Arctic Sky / Carbon",      file: "ARC. RACESUIT - ARCTIC SKY ' CARBON.png" },
  { name: "Graphite / Hyper Lime",    file: "ARC. RACESUIT - GRAPHITE ' HYPER LIME.png" },
  { name: "Petro Blue / Graphite",    file: "ARC. RACESUIT - PETRO BLUE ' GRAPHITE.png" },
  { name: "Dust Rose / Charcoal",     file: "ARC. RACESUIT - DUST ROSE ' CHARCOAL.png" },
  { name: "Lilac / Smoke",            file: "ARC. RACESUIT - LILAC ' SMOKE.png" },
  { name: "Bone White / Slate Black", file: "ARC. RACESUIT - BONE WHITE ' SLATE BLACK.png" },
  { name: "Butter Cream / Smoke",     file: "ARC. RACESUIT - BUTTER CREAM ' SMOKE.png" },
  { name: "Cloud White / Sandstone",  file: "ARC. RACESUIT - CLOUD WHITE ' SANDSTONE.png" },
  { name: "Onyx / Lavender",          file: "ARC. RACESUIT - ONYX ' LAVANDER.png" },
  { name: "Dust Rose / Plum Ink",     file: "ARC. RACESUIT - DUST ROSE ' PLUM INK.png" },
  { name: "Dust Rose / Smoke",        file: "ARC. RACESUIT - DUST ROSE ' SMOKE CHARCOAL.png" },
]

const JERSEYS_RAW = [
  { name: "Burgundy / Blush Pink",      file: "ARC. Jersey - BURGUNDY ' BLUSH PINK (NO CHEST LOGO).png" },
  { name: "Charcoal / Laser Pink",      file: "ARC. Jersey - CHARCOAL ' LASER PINK (NO CHEST LOGO).png" },
  { name: "Deep Navy / Acid Lime",      file: "ARC. Jersey - DEEP NAVY ' ACID LIME (NO CHEST LOGO).png" },
  { name: "Deep Navy / Neon Mint",      file: "ARC. Jersey - DEEP NAVY ' NEON MINT (NO CHEST LOGO) (2).png" },
  { name: "Deep Teal / Soft Cream",     file: "ARC. Jersey - DEEP TEAL ' SOFT CREAM (NO CHEST LOGO).png" },
  { name: "Dust Rose / Coral Glow",     file: "ARC. Jersey - DUST ROSE ' CORAL GLOW (NO CHEST LOGO).png" },
  { name: "Forest / Acid Lime",         file: "ARC. Jersey - FOREST ' ACID LIME (NO CHEST LOGO).png" },
  { name: "Forest Olive / Lavender",    file: "ARC. Jersey - FOREST OLIVE ' LAVANDER HAZE (NO CHEST LOGO).png" },
  { name: "Galaxy Blue / Soft Violet",  file: "ARC. Jersey - GALAXY BLUE ' SOFT VIOLET (NO CHEST LOGO).png" },
  { name: "Midnight Navy / Neon Coral", file: "ARC. Jersey - MIDNIGHT NAVY ' NEON CORAL (NO CHEST LOGO).png" },
  { name: "Onyx / Electric Lime",       file: "ARC. Jersey - ONYX ' ELECTRIC LIME 2(NO CHEST LOGO).png" },
  { name: "Petro Blue / Chalk",         file: "ARC. Jersey - PETRO BLUE ' CHALK (NO CHEST LOGO).png" },
  { name: "Plum / Ice Blue",            file: "ARC. Jersey - PLUM ' ICE BLUE (NO CHEST LOGO).png" },
  { name: "Stone Sage / Chalk White",   file: "ARC. Jersey - STOEN SAGE ' CHALK WHITE (NO CHEST LOGO).png" },
]

export const LOCAL_PRODUCTS: LocalProduct[] = [
  ...RACESUITS_RAW.map(p => ({
    slug: toSlug(p.name, 'racesuit'),
    name: 'ARC Pro Racesuit',
    colorway: p.name,
    file: imgUrl(p.file),
    price: 649,
    priceStr: 'R$ 649',
    type: 'racesuit' as const,
    category: 'Triathlon',
    features: RACESUIT_FEATURES,
    sizes: SIZES,
    description: 'The ARC Pro Racesuit is engineered for peak performance in triathlon, cycling, and running. Developed with elite athletes to eliminate aerodynamic drag, maximize muscle compression, and ensure comfort across all three disciplines.',
    materials: 'Shell: 78% Polyamide, 22% Elastane. Pad: 60% Polyester, 40% Polyurethane. Oeko-Tex Standard 100 certified.',
    care: 'Hand wash or machine wash on delicate cycle at 30°C. No fabric softener. Do not wring. Dry in the shade. Do not tumble dry.',
  })),
  ...JERSEYS_RAW.map(p => ({
    slug: toSlug(p.name, 'jersey'),
    name: 'ARC Aero Jersey',
    colorway: p.name,
    file: imgUrl(p.file),
    price: 399,
    priceStr: 'R$ 399',
    type: 'jersey' as const,
    category: 'Cycling',
    features: JERSEY_FEATURES,
    sizes: SIZES,
    description: 'The ARC Aero Jersey combines aerodynamic performance with breathable comfort. Designed for cyclists who demand speed without sacrificing comfort on long rides.',
    materials: '88% Recycled Polyester, 12% Elastane. Oeko-Tex certified.',
    care: 'Machine wash delicate cycle 30°C. No fabric softener. Dry in the shade.',
  })),
]

export const getProductBySlug = (slug: string) =>
  LOCAL_PRODUCTS.find(p => p.slug === slug) ?? null
