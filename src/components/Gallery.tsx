import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const GALLERY_ITEMS = [
  { img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80', label: 'Swim Start · Floripa', rot: -2 },
  { img: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&q=80', label: 'T1 · Rio 70.3', rot: 1.5 },
  { img: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?w=600&q=80', label: 'Bike Leg · Pernambuco', rot: -1 },
  { img: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&q=80', label: 'Open Water · Santos', rot: 2 },
  { img: 'https://images.unsplash.com/photo-1565992441121-4367ef2f9f18?w=600&q=80', label: 'Run · Finish Line', rot: -1.5 },
  { img: 'https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a?w=600&q=80', label: 'Podium · Fortaleza', rot: 1 },
]

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const col1Ref = useRef<HTMLDivElement>(null)
  const col2Ref = useRef<HTMLDivElement>(null)
  const inViewRef = useRef<HTMLDivElement>(null)
  const inView = useInView(inViewRef, { once: true })

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin center content
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: pinRef.current,
        pinSpacing: false,
      })

      // Column parallax
      if (col1Ref.current) {
        gsap.to(col1Ref.current, {
          y: -180,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        })
      }
      if (col2Ref.current) {
        gsap.to(col2Ref.current, {
          y: 120,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        })
      }
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const left = GALLERY_ITEMS.filter((_, i) => i % 2 === 0)
  const right = GALLERY_ITEMS.filter((_, i) => i % 2 !== 0)

  return (
    <section
      ref={containerRef}
      style={{ minHeight: '280vh', position: 'relative', background: 'var(--surface)', overflow: 'hidden' }}
    >
      {/* Pinned center text */}
      <div
        ref={pinRef}
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          position: 'relative',
          zIndex: 10,
          padding: '0 24px',
        }}
      >
        <div ref={inViewRef}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-xs uppercase font-semibold mb-5"
            style={{ color: 'var(--orange)', letterSpacing: '6px' }}
          >
            Athletes in Action
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-condensed italic font-bold uppercase leading-none"
            style={{ fontSize: 'clamp(56px, 8vw, 110px)', letterSpacing: '3px', color: 'var(--text)' }}
          >
            VISUAL<br />
            <span style={{ color: 'var(--orange)' }}>PLAYGROUND</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="font-light mt-6 max-w-sm mx-auto"
            style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: '1.8', letterSpacing: '0.5px' }}
          >
            De Florianópolis a Fortaleza — atletas ARC performance em ação nas principais provas do país.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{ marginTop: '32px' }}
          >
            <div className="accent-border rounded-full inline-block">
              <button
                className="rounded-full px-6 py-3 font-semibold text-xs uppercase"
                style={{
                  background: 'var(--bg)',
                  color: 'var(--text)',
                  border: '1px solid var(--stroke)',
                  fontFamily: 'Barlow, sans-serif',
                  letterSpacing: '3px',
                }}
              >
                Ver galeria completa ↗
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Parallax columns */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          padding: '80px 5%',
          maxWidth: '1100px',
          margin: '0 auto',
          left: 0,
          right: 0,
          pointerEvents: 'none',
          zIndex: 20,
        }}
      >
        <div ref={col1Ref} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {left.map((item, i) => (
            <GalleryCard key={i} item={item} />
          ))}
        </div>
        <div ref={col2Ref} style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '120px' }}>
          {right.map((item, i) => (
            <GalleryCard key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

function GalleryCard({ item }: { item: typeof GALLERY_ITEMS[0] }) {
  return (
    <div
      className="group relative overflow-hidden"
      style={{
        aspectRatio: '1',
        maxWidth: '320px',
        borderRadius: '16px',
        border: '1px solid var(--stroke)',
        transform: `rotate(${item.rot}deg)`,
        pointerEvents: 'all',
        cursor: 'pointer',
        transition: 'transform 0.4s ease, border-color 0.3s',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget
        el.style.transform = `rotate(0deg) scale(1.02)`
        el.style.borderColor = 'var(--orange)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.transform = `rotate(${item.rot}deg) scale(1)`
        el.style.borderColor = 'var(--stroke)'
      }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${item.img})`, filter: 'brightness(0.7) saturate(0.8)' }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.9), transparent)' }}
      >
        <span className="text-xs font-semibold uppercase" style={{ color: 'var(--text)', letterSpacing: '2px' }}>
          {item.label}
        </span>
      </div>
    </div>
  )
}
