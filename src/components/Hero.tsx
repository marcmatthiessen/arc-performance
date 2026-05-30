import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useIsMobile } from '../hooks/useIsMobile'

export default function Hero() {
  const isMobile = useIsMobile()
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isMobile || !textRef.current) return
    gsap.fromTo(textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.2, delay: 0.5, ease: 'power3.out' }
    )
  }, [isMobile])

  /* ── Desktop: use the approved full image ── */
  if (!isMobile) {
    return (
      <section style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        <img
          src="/ARC.%20WEBSITE%20STARTPAGE.png"
          alt="ARC Performance"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
        />
      </section>
    )
  }

  /* ── Mobile: coded hero with photo + text overlay ── */
  return (
    <section style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: '#000' }}>

      {/* Background photo */}
      <img
        src="/pumar-1.jpeg"
        alt="ARC Performance"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center top',
          filter: 'brightness(0.4)',
          display: 'block',
        }}
      />

      {/* Gradient overlay — bottom fade */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.7) 80%, #000 100%)',
      }} />

      {/* Text content */}
      <div
        ref={textRef}
        style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '0 28px 72px',
          opacity: 0,
        }}
      >
        <p style={{
          fontFamily: 'Barlow, sans-serif', fontWeight: 400,
          fontSize: '10px', color: 'rgba(255,255,255,0.45)',
          letterSpacing: '5px', textTransform: 'uppercase', marginBottom: '16px',
        }}>
          RACESUIT COLLECTION '26
        </p>

        <h1 style={{
          fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontStyle: 'italic',
          fontSize: 'clamp(72px, 22vw, 120px)',
          color: '#fff', lineHeight: 0.88, letterSpacing: '-2px',
          marginBottom: '16px',
        }}>
          ARC
        </h1>

        <p style={{
          fontFamily: 'Barlow, sans-serif', fontWeight: 300,
          fontSize: '11px', color: '#fff',
          letterSpacing: '8px', textTransform: 'uppercase', marginBottom: '8px',
        }}>
          HUMAN PERFORMANCE
        </p>

        <p style={{
          fontFamily: 'Barlow, sans-serif', fontWeight: 300,
          fontSize: '9px', color: 'rgba(255,255,255,0.4)',
          letterSpacing: '2px', textTransform: 'uppercase',
        }}>
          ENGINEERED FOR SPEED. TAILORED FOR PERFORMANCE. BUILT TO WIN.
        </p>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '28px', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
      }}>
        <span style={{ fontFamily: 'Barlow, sans-serif', fontSize: '8px', color: 'rgba(255,255,255,0.3)', letterSpacing: '3px', textTransform: 'uppercase' }}>
          SCROLL
        </span>
        <div style={{ width: '1px', height: '32px', background: 'rgba(255,255,255,0.2)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(to bottom, rgba(255,255,255,0.8), transparent)', animation: 'scrollDown 1.6s ease-in-out infinite' }} />
        </div>
      </div>

      <style>{`@keyframes scrollDown { 0%{transform:translateY(-100%)} 100%{transform:translateY(300%)} }`}</style>
    </section>
  )
}
