import { useState } from 'react'

const img = (file: string) => `/${encodeURIComponent(file)}`

const CATEGORIES = [
  { label: 'Triathlon',    img: '/ironman%20start.jpeg' },
  { label: 'Cycling',     img: '/cycle.jpeg' },
  { label: 'Running',     img: '/pumar-2.jpeg' },
  { label: 'Training',    img: '/ma.png' },
  { label: 'Accessories', img: '/pumar-1.jpeg' },
]

const RACESUITS = [
  { name: "Onyx / Cloud White",       file: "ARC. RACESUIT - ONYX ' CLOUD WHITE.png",           price: 'R$ 649' },
  { name: "Burgundy / Soft Pink",     file: "ARC. RACESUIT - BURGUNDY ' SOFT PINK.png",         price: 'R$ 649' },
  { name: "Midnight Navy / Onyx",     file: "ARC. RACESUIT - MIDNIGHT NAVY ' ONYX.png",         price: 'R$ 649' },
  { name: "Arctic Sky / Carbon",      file: "ARC. RACESUIT - ARCTIC SKY ' CARBON.png",          price: 'R$ 649' },
  { name: "Graphite / Hyper Lime",    file: "ARC. RACESUIT - GRAPHITE ' HYPER LIME.png",        price: 'R$ 649' },
  { name: "Petro Blue / Graphite",    file: "ARC. RACESUIT - PETRO BLUE ' GRAPHITE.png",        price: 'R$ 649' },
  { name: "Dust Rose / Charcoal",     file: "ARC. RACESUIT - DUST ROSE ' CHARCOAL.png",         price: 'R$ 649' },
  { name: "Lilac / Smoke",            file: "ARC. RACESUIT - LILAC ' SMOKE.png",                price: 'R$ 649' },
  { name: "Bone White / Slate Black", file: "ARC. RACESUIT - BONE WHITE ' SLATE BLACK.png",     price: 'R$ 649' },
  { name: "Butter Cream / Smoke",     file: "ARC. RACESUIT - BUTTER CREAM ' SMOKE.png",         price: 'R$ 649' },
  { name: "Cloud White / Sandstone",  file: "ARC. RACESUIT - CLOUD WHITE ' SANDSTONE.png",      price: 'R$ 649' },
  { name: "Onyx / Lavender",          file: "ARC. RACESUIT - ONYX ' LAVANDER.png",              price: 'R$ 649' },
  { name: "Dust Rose / Plum Ink",     file: "ARC. RACESUIT - DUST ROSE ' PLUM INK.png",         price: 'R$ 649' },
  { name: "Dust Rose / Smoke",        file: "ARC. RACESUIT - DUST ROSE ' SMOKE CHARCOAL.png",   price: 'R$ 649' },
]

const JERSEYS = [
  { name: "Burgundy / Blush Pink",      file: "ARC. Jersey - BURGUNDY ' BLUSH PINK (NO CHEST LOGO).png",          price: 'R$ 399' },
  { name: "Charcoal / Laser Pink",      file: "ARC. Jersey - CHARCOAL ' LASER PINK (NO CHEST LOGO).png",          price: 'R$ 399' },
  { name: "Deep Navy / Acid Lime",      file: "ARC. Jersey - DEEP NAVY ' ACID LIME (NO CHEST LOGO).png",          price: 'R$ 399' },
  { name: "Deep Navy / Neon Mint",      file: "ARC. Jersey - DEEP NAVY ' NEON MINT (NO CHEST LOGO) (2).png",      price: 'R$ 399' },
  { name: "Deep Teal / Soft Cream",     file: "ARC. Jersey - DEEP TEAL ' SOFT CREAM (NO CHEST LOGO).png",         price: 'R$ 399' },
  { name: "Dust Rose / Coral Glow",     file: "ARC. Jersey - DUST ROSE ' CORAL GLOW (NO CHEST LOGO).png",         price: 'R$ 399' },
  { name: "Forest / Acid Lime",         file: "ARC. Jersey - FOREST ' ACID LIME (NO CHEST LOGO).png",             price: 'R$ 399' },
  { name: "Forest Olive / Lavender",    file: "ARC. Jersey - FOREST OLIVE ' LAVANDER HAZE (NO CHEST LOGO).png",   price: 'R$ 399' },
  { name: "Galaxy Blue / Soft Violet",  file: "ARC. Jersey - GALAXY BLUE ' SOFT VIOLET (NO CHEST LOGO).png",      price: 'R$ 399' },
  { name: "Midnight Navy / Neon Coral", file: "ARC. Jersey - MIDNIGHT NAVY ' NEON CORAL (NO CHEST LOGO).png",     price: 'R$ 399' },
  { name: "Onyx / Electric Lime",       file: "ARC. Jersey - ONYX ' ELECTRIC LIME 2(NO CHEST LOGO).png",          price: 'R$ 399' },
  { name: "Petro Blue / Chalk",         file: "ARC. Jersey - PETRO BLUE ' CHALK (NO CHEST LOGO).png",             price: 'R$ 399' },
  { name: "Plum / Ice Blue",            file: "ARC. Jersey - PLUM ' ICE BLUE (NO CHEST LOGO).png",                price: 'R$ 399' },
  { name: "Stone Sage / Chalk White",   file: "ARC. Jersey - STOEN SAGE ' CHALK WHITE (NO CHEST LOGO).png",       price: 'R$ 399' },
]

const ALL_PRODUCTS = [...RACESUITS, ...JERSEYS]

interface ShopProps {
  category: string | null
  setCategory: (cat: string | null) => void
}

export default function Shop({ category, setCategory }: ShopProps) {
  if (category !== null) {
    return (
      <section id="collection" style={{ background: '#0D0D0D' }}>
        <ProductGrid
          title={category === '' ? 'ALL PRODUCTS' : category.toUpperCase()}
          items={ALL_PRODUCTS}
          onBack={() => setCategory(null)}
        />
      </section>
    )
  }

  return (
    <section id="collection" style={{ background: '#0D0D0D' }}>

      {/* ── Category tiles ── */}
      <div style={{ padding: '0 0 80px' }}>

        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '64px 48px 0' }}>
          <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '5px', textTransform: 'uppercase', marginBottom: '12px' }}>
            SHOP BY CATEGORY
          </p>
          <h3 style={{
            fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontStyle: 'italic',
            fontSize: 'clamp(36px, 4vw, 60px)', color: '#fff', lineHeight: 0.9, letterSpacing: '-1px', marginBottom: '40px',
          }}>
            COLLECTION '26
          </h3>
        </div>

        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '2px' }}>
            {CATEGORIES.map((cat) => (
              <CategoryTile key={cat.label} label={cat.label} image={cat.img} onClick={() => setCategory(cat.label)} />
            ))}

          </div>
        </div>
      </div>
    </section>
  )
}

function CategoryTile({ label, image, onClick }: { label: string; image: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: 'pointer', position: 'relative', overflow: 'hidden', aspectRatio: '3/4', background: '#111' }}
    >
      <img
        src={image}
        alt={label}
        style={{
          width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center',
          display: 'block', filter: hovered ? 'brightness(0.5)' : 'brightness(0.35)',
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'all 0.4s ease',
        }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 20px',
        display: 'flex', flexDirection: 'column', gap: '8px',
      }}>
        <p style={{
          fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontStyle: 'italic',
          fontSize: '22px', color: '#fff', textTransform: 'uppercase', letterSpacing: '1px',
        }}>
          {label}
        </p>
        <p style={{
          fontFamily: 'Barlow, sans-serif', fontSize: '10px',
          color: hovered ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)',
          letterSpacing: '2px', textTransform: 'uppercase', transition: 'color 0.3s',
        }}>
          SHOP ALL →
        </p>
      </div>
      {hovered && <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(255,255,255,0.2)', pointerEvents: 'none' }} />}
    </div>
  )
}

function ProductCard({ name, src, price }: { name: string; src: string; price: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{ background: hovered ? '#141414' : '#0D0D0D', cursor: 'pointer', overflow: 'hidden', position: 'relative', transition: 'background 0.2s' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ aspectRatio: '1', overflow: 'hidden', background: '#111' }}>
        <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: hovered ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.5s ease' }} />
      </div>
      <div style={{ padding: '16px 20px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600, fontStyle: 'italic', fontSize: '14px', color: '#fff', textTransform: 'uppercase' }}>ARC Racesuit</p>
          <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '3px' }}>{name}</p>
        </div>
        <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 500, fontSize: '13px', color: '#fff' }}>{price}</p>
      </div>
      {hovered && <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(255,255,255,0.1)', pointerEvents: 'none' }} />}
    </div>
  )
}

function ProductGrid({ title, items, onBack }: { title: string; items: typeof ALL_PRODUCTS; onBack: () => void }) {
  return (
    <section id="collection" style={{ background: '#0D0D0D', padding: '60px 0 100px' }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 48px' }}>

        <button onClick={onBack} style={{
          fontFamily: 'Barlow, sans-serif', fontSize: '10px', color: 'rgba(255,255,255,0.4)',
          letterSpacing: '2px', textTransform: 'uppercase', background: 'none', border: 'none',
          cursor: 'pointer', marginBottom: '24px', padding: 0,
        }}
          onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
        >
          ← COLLECTION
        </button>

        <h2 style={{
          fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontStyle: 'italic',
          fontSize: 'clamp(48px, 6vw, 80px)', color: '#fff', lineHeight: 0.9, letterSpacing: '-1px', marginBottom: '8px',
        }}>
          {title}
        </h2>
        <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '1px', marginBottom: '40px' }}>
          {items.length} ESTILOS
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '2px' }}>
          {items.map((item, i) => (
            <ProductCard key={i} name={item.name} src={img(item.file)} price={item.price} />
          ))}
        </div>
      </div>
    </section>
  )
}
