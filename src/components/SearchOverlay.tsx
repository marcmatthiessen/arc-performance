import { useEffect, useState } from 'react'

interface SearchOverlayProps {
  isOpen: boolean
  onClose: () => void
}

const DUMMY = [
  { name: 'Onyx Racesuit', price: 'R$ 1.290', img: '/ma.png' },
  { name: 'Burgundy Racesuit', price: 'R$ 1.290', img: '/pumar-1.jpeg' },
  { name: 'Deep Navy Jersey', price: 'R$ 590', img: '/ma.png' },
  { name: 'Forest Jersey', price: 'R$ 590', img: '/pumar-1.jpeg' },
]

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setVisible(true)
      setQuery('')
    } else {
      setVisible(false)
    }
  }, [isOpen])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  if (!isOpen && !visible) return null

  const filtered = query.length > 0
    ? DUMMY.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
    : DUMMY

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(0,0,0,0.92)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',
        paddingTop: '18vh',
        opacity: isOpen ? 1 : 0,
        transition: 'opacity 0.22s ease',
        pointerEvents: isOpen ? 'all' : 'none',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ width: '100%', maxWidth: '640px', padding: '0 24px' }}
      >
        <div style={{ position: 'relative', marginBottom: '48px' }}>
          <input
            autoFocus
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search products..."
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              borderBottom: '1px solid rgba(255,255,255,0.25)',
              color: '#fff',
              fontFamily: 'Barlow Condensed, sans-serif',
              fontWeight: 400,
              fontSize: '32px',
              letterSpacing: '1px',
              padding: '12px 0',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          <button
            onClick={onClose}
            style={{
              position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(255,255,255,0.4)', fontSize: '20px', lineHeight: 1,
              padding: '4px',
            }}
          >
            ×
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <p style={{
            fontFamily: 'Barlow, sans-serif', fontSize: '9px', color: 'rgba(255,255,255,0.3)',
            letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px',
          }}>
            {query ? 'Results' : 'Suggested'}
          </p>
          {filtered.map(product => (
            <div
              key={product.name}
              style={{
                display: 'flex', alignItems: 'center', gap: '16px',
                padding: '14px 16px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                cursor: 'pointer',
                transition: 'background 0.15s, border-color 0.15s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.background = 'rgba(200,255,0,0.06)'
                ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(200,255,0,0.2)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.03)'
                ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.06)'
              }}
            >
              <img
                src={product.img}
                alt={product.name}
                style={{ width: '52px', height: '52px', objectFit: 'cover', flexShrink: 0 }}
              />
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 400, fontSize: '14px', color: '#fff', marginBottom: '4px' }}>
                  {product.name}
                </p>
                <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '12px', color: 'rgba(255,255,255,0.45)' }}>
                  {product.price}
                </p>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
