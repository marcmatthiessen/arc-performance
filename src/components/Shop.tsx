import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { LOCAL_PRODUCTS } from '../data/localProducts'

const CATEGORIES = [
  { label: 'Triathlon',    img: '/ironman%20start.jpeg' },
  { label: 'Cycling',     img: '/cycle.jpeg' },
  { label: 'Running',     img: '/pumar-2.jpeg' },
  { label: 'Training',    img: '/ma.png' },
  { label: 'Accessories', img: '/pumar-1.jpeg' },
]

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
          onBack={() => setCategory(null)}
        />
      </section>
    )
  }

  return (
    <section id="collection" style={{ background: '#0D0D0D' }}>
      <div style={{ padding: '0 0 80px' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '64px 48px 0' }}>
          <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '5px', textTransform: 'uppercase', marginBottom: '12px' }}>
            SHOP BY CATEGORY
          </p>
          <h3 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontStyle: 'italic', fontSize: 'clamp(36px, 4vw, 60px)', color: '#fff', lineHeight: 0.9, letterSpacing: '-1px', marginBottom: '40px' }}>
            COLLECTION '26
          </h3>
        </div>
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '2px' }}>
            {CATEGORIES.map(cat => (
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
    <div onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ cursor: 'pointer', position: 'relative', overflow: 'hidden', aspectRatio: '3/4', background: '#111' }}>
      <img src={image} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: hovered ? 'brightness(0.5)' : 'brightness(0.35)', transform: hovered ? 'scale(1.05)' : 'scale(1)', transition: 'all 0.4s ease' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 20px' }}>
        <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontStyle: 'italic', fontSize: '22px', color: '#fff', textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</p>
        <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '10px', color: hovered ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)', letterSpacing: '2px', textTransform: 'uppercase', transition: 'color 0.3s', marginTop: '6px' }}>SHOP ALL →</p>
      </div>
      {hovered && <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(255,255,255,0.2)', pointerEvents: 'none' }} />}
    </div>
  )
}

type FilterType = 'all' | 'racesuit' | 'jersey'

function ProductGrid({ title, onBack }: { title: string; onBack: () => void }) {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<FilterType>('all')
  const [search, setSearch] = useState('')

  const items = useMemo(() => {
    let list = LOCAL_PRODUCTS
    if (filter === 'racesuit') list = list.filter(p => p.type === 'racesuit')
    if (filter === 'jersey')   list = list.filter(p => p.type === 'jersey')
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(p => p.colorway.toLowerCase().includes(q) || p.name.toLowerCase().includes(q))
    }
    return list
  }, [filter, search])

  return (
    <div style={{ background: '#0D0D0D', padding: '60px 0 100px' }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 48px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <button onClick={onBack} style={{ fontFamily: 'Barlow, sans-serif', fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px', textTransform: 'uppercase', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '12px', padding: 0, display: 'block' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>
              ← COLLECTION
            </button>
            <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontStyle: 'italic', fontSize: 'clamp(36px, 5vw, 72px)', color: '#fff', lineHeight: 0.9, letterSpacing: '-1px' }}>{title}</h2>
            <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '8px', letterSpacing: '1px' }}>{items.length} STYLES</p>
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Search */}
            <input
              type="text"
              placeholder="Search colorways..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontFamily: 'Barlow, sans-serif', fontSize: '12px', padding: '9px 16px', outline: 'none', width: '180px', transition: 'border-color 0.2s' }}
              onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
            />

            {/* Type filter */}
            <div style={{ display: 'flex', gap: '2px', background: 'rgba(255,255,255,0.04)', padding: '3px' }}>
              {(['all', 'racesuit', 'jersey'] as FilterType[]).map(f => (
                <button key={f} onClick={() => setFilter(f)} style={{
                  fontFamily: 'Barlow, sans-serif', fontSize: '10px', fontWeight: 500, letterSpacing: '2px',
                  textTransform: 'uppercase', padding: '8px 16px', border: 'none', cursor: 'pointer',
                  background: filter === f ? '#fff' : 'transparent',
                  color: filter === f ? '#000' : 'rgba(255,255,255,0.45)',
                  transition: 'all 0.2s',
                }}>
                  {f === 'all' ? 'All' : f === 'racesuit' ? 'Racesuits' : 'Jerseys'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontStyle: 'italic', fontSize: '28px', color: '#fff', textTransform: 'uppercase', marginBottom: '8px' }}>No results</p>
            <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '20px' }}>Try a different search or filter.</p>
            <button onClick={() => { setFilter('all'); setSearch('') }} style={{ background: 'var(--orange)', color: '#000', border: 'none', cursor: 'pointer', fontFamily: 'Barlow, sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', padding: '12px 24px' }}>
              CLEAR FILTERS
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '2px' }}>
            {items.map(product => (
              <ProductCard
                key={product.slug}
                name={product.name}
                colorway={product.colorway}
                src={product.file}
                price={product.priceStr}
                onClick={() => navigate(`/product/${product.slug}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ProductCard({ name, colorway, src, price, onClick }: { name: string; colorway: string; src: string; price: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: hovered ? '#141414' : '#0D0D0D', cursor: 'pointer', overflow: 'hidden', position: 'relative', transition: 'background 0.2s' }}
    >
      <div style={{ aspectRatio: '1', overflow: 'hidden', background: '#111' }}>
        <img src={src} alt={colorway} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: hovered ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.5s ease' }} loading="lazy" />
      </div>
      {/* Hover overlay with "VIEW PRODUCT" */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', opacity: hovered ? 1 : 0, transition: 'opacity 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        <span style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 700, fontSize: '11px', color: '#fff', letterSpacing: '3px', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.6)', padding: '10px 20px' }}>
          VIEW PRODUCT
        </span>
      </div>
      <div style={{ padding: '14px 18px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600, fontStyle: 'italic', fontSize: '14px', color: '#fff', textTransform: 'uppercase' }}>{name}</p>
          <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.38)', marginTop: '3px' }}>{colorway}</p>
        </div>
        <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 500, fontSize: '13px', color: '#fff', flexShrink: 0 }}>{price}</p>
      </div>
      {hovered && <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(255,255,255,0.12)', pointerEvents: 'none' }} />}
    </div>
  )
}
