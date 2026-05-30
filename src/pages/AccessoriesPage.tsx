import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageLayout from '../components/PageLayout'

// Placeholder products — user will add photos to public/accessories/
// Add new items here as: { name, file, price }
const ACCESSORIES_PRODUCTS: { name: string; file: string; price: string; tag?: string }[] = [
  // { name: 'ARC Cap', file: '/accessories/cap-black.png', price: 'R$ 89', tag: 'New' },
  // Add products here when photos are ready
]

const PLACEHOLDER_SLOTS = [
  { label: 'Caps & Headwear' },
  { label: 'Sunglasses' },
  { label: 'Transition Bags' },
  { label: 'Race Belts' },
  { label: 'Compression Socks' },
  { label: 'Swim Gear' },
]

export default function AccessoriesPage() {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState<number | null>(null)

  const hasProducts = ACCESSORIES_PRODUCTS.length > 0

  return (
    <PageLayout>
      {/* Hero */}
      <div style={{ position: 'relative', height: '40vh', overflow: 'hidden', marginTop: '-120px', paddingTop: '120px', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src="/pumar-1.jpeg" alt="Accessories" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.25)' }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '12px' }}>ARC PERFORMANCE</p>
          <h1 style={{ fontFamily: 'Bebas Neue, Barlow Condensed, sans-serif', fontSize: 'clamp(48px, 8vw, 100px)', color: '#fff', letterSpacing: '4px', lineHeight: 0.9 }}>ACCESSORIES</h1>
          <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '14px', color: 'rgba(255,255,255,0.5)', letterSpacing: '2px', marginTop: '12px' }}>Complete your setup.</p>
        </div>
      </div>

      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '64px 48px 100px' }}>

        {hasProducts ? (
          <>
            {/* Product count */}
            <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '1px', marginBottom: '32px' }}>
              {ACCESSORIES_PRODUCTS.length} PRODUCTS
            </p>

            {/* Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '2px' }}>
              {ACCESSORIES_PRODUCTS.map((item, i) => (
                <div key={i} style={{ background: '#0D0D0D', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
                  onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
                  <div style={{ aspectRatio: '1', overflow: 'hidden', background: '#111' }}>
                    <img src={item.file} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: hovered === i ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.5s ease' }} loading="lazy" />
                  </div>
                  {item.tag && (
                    <div style={{ position: 'absolute', top: '10px', left: '10px', background: '#fff', color: '#000', fontFamily: 'Barlow, sans-serif', fontSize: '9px', fontWeight: 700, letterSpacing: '2px', padding: '3px 8px' }}>{item.tag}</div>
                  )}
                  <div style={{ padding: '14px 18px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600, fontStyle: 'italic', fontSize: '15px', color: '#fff', textTransform: 'uppercase' }}>{item.name}</p>
                    <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 500, fontSize: '13px', color: '#fff', flexShrink: 0, marginLeft: '12px' }}>{item.price}</p>
                  </div>
                  {hovered === i && <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(255,255,255,0.12)', pointerEvents: 'none' }} />}
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Coming Soon state */}
            <div style={{ marginBottom: '56px' }}>
              <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '5px', textTransform: 'uppercase', marginBottom: '12px' }}>COMING SOON</p>
              <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontStyle: 'italic', fontSize: 'clamp(36px, 4vw, 60px)', color: '#fff', lineHeight: 0.9, letterSpacing: '-1px', marginBottom: '16px' }}>
                ACCESSORIES '26
              </h2>
              <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, maxWidth: '480px' }}>
                Our accessories line is launching soon. Add photos to <code style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--orange)', background: 'rgba(232,100,42,0.1)', padding: '2px 6px' }}>public/accessories/</code> to populate this page.
              </p>
            </div>

            {/* Category placeholder grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '2px' }}>
              {PLACEHOLDER_SLOTS.map((slot, i) => (
                <div key={i} style={{ background: '#0D0D0D', border: '1px dashed rgba(255,255,255,0.08)', aspectRatio: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '20px' }}>+</span>
                  </div>
                  <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.25)', letterSpacing: '2px', textTransform: 'uppercase', textAlign: 'center' }}>{slot.label}</p>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '64px' }}>
              <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '24px' }}>
                Interested? Explore our racesuits and jerseys in the meantime.
              </p>
              <button onClick={() => navigate('/')} style={{ background: 'var(--orange)', color: '#000', border: 'none', cursor: 'pointer', fontFamily: 'Barlow, sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', padding: '14px 32px' }}>
                VIEW COLLECTION
              </button>
            </div>
          </>
        )}
      </div>
    </PageLayout>
  )
}
