import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'

const MARQUEE_TEXT = 'BUILT TO WIN • RACE OPTIMIZED • ARC PERFORMANCE • PRECISION ENGINEERED • '

export default function Footer() {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: -50,
          duration: 35,
          ease: 'none',
          repeat: -1,
        })
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <footer
      style={{
        background: 'var(--bg)',
        borderTop: '1px solid var(--stroke)',
        overflow: 'hidden',
        paddingTop: '0',
      }}
    >
      {/* Big CTA section */}
      <div
        ref={ref}
        style={{
          padding: '120px 48px 80px',
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '300px',
            background: 'radial-gradient(ellipse, rgba(232,100,42,0.07) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-xs uppercase font-semibold mb-8"
          style={{ color: 'var(--orange)', letterSpacing: '6px', position: 'relative' }}
        >
          Designed to Perform · Built to Win
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1 }}
          className="font-condensed italic font-bold uppercase leading-none"
          style={{
            fontSize: 'clamp(56px, 10vw, 140px)',
            letterSpacing: '3px',
            color: 'var(--text)',
            position: 'relative',
          }}
        >
          PRONTO PARA<br />
          <span style={{ color: 'var(--orange)' }}>QUEBRAR</span><br />
          RECORDS?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="font-light mt-8 mx-auto"
          style={{
            fontSize: '14px',
            color: 'var(--muted)',
            maxWidth: '460px',
            lineHeight: '1.8',
            letterSpacing: '0.5px',
            position: 'relative',
          }}
        >
          Junte-se aos atletas que decidiram levar a performance a sério. Primeira semana completamente gratuita.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ marginTop: '48px', position: 'relative' }}
        >
          <div className="accent-border rounded-full inline-block">
            <button
              className="rounded-full font-bold text-sm uppercase transition-all duration-300 hover:scale-105"
              style={{
                background: 'var(--orange)',
                color: '#fff',
                padding: '20px 64px',
                fontFamily: 'Barlow, sans-serif',
                letterSpacing: '4px',
                boxShadow: '0 0 0 0 rgba(232,100,42,0)',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => {
                (e.target as HTMLElement).style.boxShadow = '0 24px 60px rgba(232,100,42,0.35)'
              }}
              onMouseLeave={e => {
                (e.target as HTMLElement).style.boxShadow = '0 0 0 0 rgba(232,100,42,0)'
              }}
            >
              Começar Gratuitamente
            </button>
          </div>
        </motion.div>
      </div>

      {/* Marquee */}
      <div
        style={{
          overflow: 'hidden',
          borderTop: '1px solid var(--stroke)',
          borderBottom: '1px solid var(--stroke)',
          padding: '20px 0',
          background: 'var(--surface)',
        }}
      >
        <div
          ref={marqueeRef}
          style={{ display: 'inline-flex', whiteSpace: 'nowrap', width: 'max-content' }}
        >
          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              className="font-condensed italic font-bold uppercase"
              style={{
                fontSize: '14px',
                letterSpacing: '5px',
                color: i % 2 === 0 ? 'var(--muted)' : 'var(--orange)',
                padding: '0 32px',
                flexShrink: 0,
              }}
            >
              {MARQUEE_TEXT}
            </span>
          ))}
        </div>
      </div>

      {/* Footer bar */}
      <div
        style={{
          padding: '32px 48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div
          className="font-condensed italic font-bold uppercase"
          style={{ fontSize: '22px', color: 'var(--text)', letterSpacing: '4px' }}
        >
          ARC
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            className="pulse-dot"
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#4ade80',
            }}
          />
          <span className="text-xs font-semibold uppercase" style={{ color: 'var(--muted)', letterSpacing: '2px' }}>
            Disponível para novos atletas
          </span>
        </div>

        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          {['Instagram', 'Strava', 'LinkedIn'].map(s => (
            <a
              key={s}
              href="#"
              className="text-xs font-semibold uppercase"
              style={{
                color: 'var(--muted)',
                letterSpacing: '2px',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
            >
              {s}
            </a>
          ))}
        </div>

        <p className="text-xs" style={{ color: 'var(--muted)', letterSpacing: '1px' }}>
          © 2025 ARC Performance · arcperformance.com.br
        </p>
      </div>
    </footer>
  )
}
