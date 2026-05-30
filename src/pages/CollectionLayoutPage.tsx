import { useState } from 'react'
import PageLayout from '../components/PageLayout'

const img = (file: string) => `/${encodeURIComponent(file)}`

/* ── Category blocks ── */
const CATEGORIES = [
  {
    label: 'Racesuits',
    img: img("ARC. RACESUIT - ONYX ' CLOUD WHITE.png"),
    description: 'Precision-engineered race systems for speed, endurance, and streamlined design.',
    href: '/collection?cat=racesuits',
  },
  {
    label: 'Jerseys',
    img: img("ARC. Jersey - BURGUNDY ' BLUSH PINK (NO CHEST LOGO).png"),
    description: 'Crafted for performance. Made for every condition on the road.',
    href: '/collection?cat=jerseys',
  },
  {
    label: 'Accessories',
    img: '/ma.png',
    description: 'Thoughtful accessories for the modern athlete.',
    href: '/collection?cat=accessories',
  },
]

/* ── New arrivals ── */
const NEW_ARRIVALS = [
  { img: img("ARC. RACESUIT - DUST ROSE ' CHARCOAL.png"),   name: 'ARC Racesuit',  color: 'Dust Rose / Charcoal',    price: 'R$ 649', badge: true  },
  { img: img("ARC. RACESUIT - ARCTIC SKY ' CARBON.png"),    name: 'ARC Racesuit',  color: 'Arctic Sky / Carbon',     price: 'R$ 649', badge: true  },
  { img: img("ARC. Jersey - FOREST OLIVE ' LAVANDER HAZE (NO CHEST LOGO).png"), name: 'ARC Jersey', color: 'Forest Olive / Lavender', price: 'R$ 399', badge: true  },
  { img: '/cycle.jpeg',                                       name: 'ARC Racesuit',  color: 'Athlete Lookbook',        price: 'R$ 649', badge: false },
  { img: img("ARC. RACESUIT - LILAC ' SMOKE.png"),           name: 'ARC Racesuit',  color: 'Lilac / Smoke',           price: 'R$ 649', badge: false },
  { img: img("ARC. Jersey - CHARCOAL ' LASER PINK (NO CHEST LOGO).png"),        name: 'ARC Jersey', color: 'Charcoal / Laser Pink',  price: 'R$ 399', badge: true  },
  { img: '/pumar-2.jpeg',                                     name: 'ARC Racesuit',  color: 'Race Collection',         price: 'R$ 649', badge: false },
]

export default function CollectionLayoutPage() {
  return (
    <PageLayout>
      {/* ── Header ── */}
      <div style={{ textAlign: 'center', padding: '0 48px 56px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <h1 style={{
          fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontStyle: 'italic',
          fontSize: 'clamp(64px, 8vw, 110px)', color: '#fff',
          lineHeight: 0.9, letterSpacing: '-2px', marginBottom: '18px',
        }}>
          COLLECTION
        </h1>
        <p style={{
          fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '13px',
          color: 'rgba(255,255,255,0.45)', letterSpacing: '1.5px',
        }}>
          Engineered for speed. Tailored for performance. Built to win.
        </p>
      </div>

      {/* ── 3 Category blocks ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.07)' }}>
        {CATEGORIES.map(cat => (
          <CategoryBlock key={cat.label} {...cat} />
        ))}
      </div>

      {/* ── New Arrivals ── */}
      <div style={{ padding: '64px 0 100px' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 48px' }}>

          {/* Section header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
            <div>
              <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '9px', color: 'rgba(255,255,255,0.35)', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '8px' }}>
                JUST DROPPED
              </p>
              <h2 style={{
                fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontStyle: 'italic',
                fontSize: 'clamp(32px, 4vw, 52px)', color: '#fff', lineHeight: 0.9, letterSpacing: '-0.5px',
              }}>
                NEW ARRIVALS
              </h2>
            </div>
            <button style={{
              fontFamily: 'Barlow, sans-serif', fontSize: '10px', color: 'rgba(255,255,255,0.45)',
              letterSpacing: '2.5px', textTransform: 'uppercase',
              background: 'none', border: '1px solid rgba(255,255,255,0.15)',
              padding: '10px 20px', cursor: 'pointer', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}
            >
              Shop All →
            </button>
          </div>

          {/* Product cards row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '2px',
          }}>
            {NEW_ARRIVALS.map((item, i) => (
              <ArrivalCard key={i} {...item} />
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

/* ── Category block component ── */
function CategoryBlock({ label, img: imgSrc, description, href }: typeof CATEGORIES[0]) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{ background: '#0A0A0A', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => window.location.href = href}
    >
      {/* Image */}
      <div style={{ aspectRatio: '4/3', overflow: 'hidden', background: '#111' }}>
        <img
          src={imgSrc}
          alt={label}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center',
            display: 'block',
            filter: hovered ? 'brightness(0.6)' : 'brightness(0.45)',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'all 0.5s ease',
          }}
        />
      </div>

      {/* Text */}
      <div style={{ padding: '24px 28px 32px' }}>
        <h3 style={{
          fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontStyle: 'italic',
          fontSize: '28px', color: '#fff', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px',
        }}>
          {label}
        </h3>
        <p style={{
          fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '13px',
          color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: '20px',
        }}>
          {description}
        </p>
        <span style={{
          fontFamily: 'Barlow, sans-serif', fontSize: '10px', fontWeight: 600,
          color: hovered ? '#fff' : 'rgba(255,255,255,0.5)',
          letterSpacing: '3px', textTransform: 'uppercase',
          transition: 'color 0.2s',
        }}>
          EXPLORE →
        </span>
      </div>

      {hovered && (
        <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(255,255,255,0.12)', pointerEvents: 'none' }} />
      )}
    </div>
  )
}

/* ── New arrival card ── */
function ArrivalCard({ img: imgSrc, name, color, price, badge }: typeof NEW_ARRIVALS[0]) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{ background: hovered ? '#141414' : '#0D0D0D', cursor: 'pointer', transition: 'background 0.2s', position: 'relative' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ aspectRatio: '1', overflow: 'hidden', background: '#111', position: 'relative' }}>
        <img
          src={imgSrc}
          alt={name}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.4s ease',
          }}
        />
        {badge && (
          <div style={{
            position: 'absolute', top: '8px', left: '8px',
            background: '#fff', color: '#000',
            fontFamily: 'Barlow, sans-serif', fontSize: '8px', fontWeight: 700,
            letterSpacing: '1.5px', textTransform: 'uppercase', padding: '3px 7px',
          }}>
            NEW
          </div>
        )}
      </div>
      <div style={{ padding: '10px 12px 14px' }}>
        <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600, fontStyle: 'italic', fontSize: '13px', color: '#fff', textTransform: 'uppercase' }}>
          {name}
        </p>
        <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '10px', color: 'rgba(255,255,255,0.35)', marginTop: '2px' }}>
          {color}
        </p>
        <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '11px', fontWeight: 500, color: 'rgba(255,255,255,0.7)', marginTop: '6px' }}>
          {price}
        </p>
      </div>
      {hovered && <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(255,255,255,0.1)', pointerEvents: 'none' }} />}
    </div>
  )
}
