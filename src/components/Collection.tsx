import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const COLORWAYS = [
  { name: 'Off-White / Taupe', bg: '#E8E3D8', text: '#6B6455', tag: '#8A7E6E' },
  { name: 'Sage / Coral', bg: '#B5C4B1', text: '#E8642A', tag: '#3D6E45' },
  { name: 'Navy / Neon', bg: '#1A1A2E', text: '#CCFF00', tag: '#CCFF00' },
  { name: 'Teal / Charcoal', bg: '#8BB8BC', text: '#1A2E2E', tag: '#2E5458' },
  { name: 'Sand / Olive', bg: '#D4C4A8', text: '#4A4A2A', tag: '#6A5E3A' },
  { name: 'Blush / Cream', bg: '#C4A8A8', text: '#4A2E2E', tag: '#7A4E4E' },
]

const PRODUCTS = [
  {
    title: 'ARC Pro Racesuit',
    subtitle: 'Triathlon · TT · Cycling',
    img: 'https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a?w=900&q=80',
    colSpan: 7,
    aspect: '3/2',
  },
  {
    title: 'ARC Aero Jersey',
    subtitle: 'Cycling · Road · Gran Fondo',
    img: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?w=900&q=80',
    colSpan: 5,
    aspect: '3/2',
  },
  {
    title: 'ARC Run Kit',
    subtitle: 'Marathon · Trail · Sprint',
    img: 'https://images.unsplash.com/photo-1565992441121-4367ef2f9f18?w=900&q=80',
    colSpan: 5,
    aspect: '3/2',
  },
  {
    title: 'ARC Open Water Suit',
    subtitle: 'Open Water · Pool · XTERRA',
    img: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=900&q=80',
    colSpan: 7,
    aspect: '3/2',
  },
]

export default function Collection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hoveredColor, setHoveredColor] = useState<number | null>(null)

  return (
    <section id="contact" style={{ background: 'var(--bg)', padding: '140px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px' }}>

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ marginBottom: '80px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '32px', height: '1px', background: 'var(--stroke)' }} />
            <span
              className="text-xs uppercase font-semibold"
              style={{ color: 'var(--muted)', letterSpacing: '5px' }}
            >
              Coleção 2025
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
            <h2
              className="font-condensed italic font-bold uppercase leading-none"
              style={{ fontSize: 'clamp(48px, 6vw, 80px)', letterSpacing: '3px', color: 'var(--text)' }}
            >
              RACESUITS<br />
              <span style={{ color: 'var(--orange)' }}>PREMIUM</span>
            </h2>
            <p className="font-light" style={{ color: 'var(--muted)', maxWidth: '360px', lineHeight: '1.8', fontSize: '14px' }}>
              Cada peça desenvolvida para eliminar resistência e maximizar potência. Do treino à linha de chegada.
            </p>
          </div>
        </motion.div>

        {/* Bento grid */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '16px',
            marginBottom: '80px',
          }}
        >
          {PRODUCTS.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.1 + 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="group relative overflow-hidden"
              style={{
                gridColumn: `span ${p.colSpan}`,
                aspectRatio: p.aspect,
                borderRadius: '24px',
                border: '1px solid var(--stroke)',
                cursor: 'pointer',
              }}
            >
              {/* Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${p.img})`, filter: 'brightness(0.6) saturate(0.8)' }}
              />

              {/* Halftone */}
              <div className="absolute inset-0 halftone opacity-20" />

              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{
                  background: 'rgba(10,10,10,0.65)',
                  backdropFilter: 'blur(12px)',
                }}
              />

              {/* Corner label */}
              <div
                className="absolute top-5 left-5 text-[10px] font-semibold uppercase"
                style={{ color: 'rgba(240,237,230,0.5)', letterSpacing: '3px' }}
              >
                ARC
              </div>

              {/* Hover label */}
              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <div
                  className="accent-border rounded-full"
                  style={{ padding: '12px 28px', background: 'rgba(17,17,17,0.9)', backdropFilter: 'blur(8px)' }}
                >
                  <span
                    className="font-condensed italic font-bold text-sm uppercase"
                    style={{ color: 'var(--text)', letterSpacing: '2px' }}
                  >
                    Ver — <em>{p.title}</em>
                  </span>
                </div>
              </div>

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div
                  className="font-condensed italic font-bold uppercase"
                  style={{ fontSize: '20px', letterSpacing: '2px', color: 'var(--text)' }}
                >
                  {p.title}
                </div>
                <div
                  className="text-xs font-light mt-1 uppercase"
                  style={{ color: 'var(--muted)', letterSpacing: '2px' }}
                >
                  {p.subtitle}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Colorway system */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <div style={{ width: '24px', height: '1px', background: 'var(--stroke)' }} />
            <span className="text-xs uppercase font-semibold" style={{ color: 'var(--muted)', letterSpacing: '5px' }}>
              Tag Color System
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px' }}>
            {COLORWAYS.map((c, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredColor(i)}
                onMouseLeave={() => setHoveredColor(null)}
                style={{
                  background: 'var(--surface)',
                  border: `1px solid ${hoveredColor === i ? 'var(--orange)' : 'var(--stroke)'}`,
                  borderRadius: '12px',
                  padding: '20px 16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  transform: hoveredColor === i ? 'translateY(-4px)' : 'translateY(0)',
                }}
              >
                {/* Color swatch */}
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '2/3',
                    borderRadius: '8px',
                    background: c.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '12px',
                  }}
                >
                  <span
                    className="font-condensed italic font-bold"
                    style={{ fontSize: '18px', color: c.text, letterSpacing: '2px' }}
                  >
                    ARC
                  </span>
                </div>
                <div
                  className="text-[10px] font-semibold uppercase text-center"
                  style={{ color: 'var(--muted)', letterSpacing: '1px', lineHeight: '1.5' }}
                >
                  {c.name}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
