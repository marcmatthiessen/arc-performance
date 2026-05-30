import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import Hls from 'hls.js'

const HLS_SRC = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8'
const FALLBACK_IMG = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1800&q=80'

const ROLES = ['TRIATLETAS', 'CICLISTAS', 'CORREDORES', 'VENCEDORES']

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const [roleIdx, setRoleIdx] = useState(0)

  // HLS video
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (Hls.isSupported()) {
      const hls = new Hls({ maxBufferLength: 30 })
      hls.loadSource(HLS_SRC)
      hls.attachMedia(video)
      return () => hls.destroy()
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = HLS_SRC
    }
  }, [])

  // GSAP entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.3, ease: 'power3.out', delay: 0.1 }
      )
      gsap.fromTo([eyebrowRef.current, subtitleRef.current, ctaRef.current],
        { opacity: 0, y: 24, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.35 }
      )
    })
    return () => ctx.revert()
  }, [])

  // Role cycling
  useEffect(() => {
    const t = setInterval(() => setRoleIdx(i => (i + 1) % ROLES.length), 2200)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="home" className="relative h-screen overflow-hidden flex flex-col">
      {/* BG Video */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay muted loop playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover"
          style={{ transform: 'translate(-50%,-50%)' }}
          poster={FALLBACK_IMG}
        />
        {/* Fallback gradient bg */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #0A0A0A 0%, #111111 40%, #0A0A0A 100%)',
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.55)' }} />
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)',
          }}
        />
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-64"
          style={{ background: 'linear-gradient(to top, var(--bg), transparent)' }}
        />
        {/* Orange tint */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 50% 70%, rgba(232,100,42,0.08) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6">
        {/* Eyebrow */}
        <p
          ref={eyebrowRef}
          className="text-xs uppercase mb-8"
          style={{ color: 'var(--orange)', letterSpacing: '6px', opacity: 0 }}
        >
          RACESUIT COLLECTION '25 · ARCPERFORMANCE.COM.BR
        </p>

        {/* Main title */}
        <h1
          ref={titleRef}
          className="font-condensed italic font-bold uppercase leading-none"
          style={{
            fontSize: 'clamp(72px, 13vw, 200px)',
            letterSpacing: '3px',
            color: 'var(--text)',
            opacity: 0,
          }}
        >
          BUILT<br />
          <span style={{ color: 'var(--orange)' }}>TO</span><br />
          WIN
        </h1>

        {/* Role line */}
        <div
          ref={subtitleRef}
          className="mt-6 flex items-center gap-3 text-sm font-medium"
          style={{ color: 'var(--muted)', letterSpacing: '3px', opacity: 0 }}
        >
          <span className="uppercase">Para</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIdx}
              className="font-condensed italic font-bold uppercase"
              style={{ color: 'var(--text)', fontSize: '18px', letterSpacing: '3px' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {ROLES[roleIdx]}
            </motion.span>
          </AnimatePresence>
          <span className="uppercase">que não aceitam menos.</span>
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="mt-12 flex gap-4 flex-wrap justify-center" style={{ opacity: 0 }}>
          <div className="accent-border rounded-full">
            <button
              className="rounded-full px-8 py-4 font-semibold text-sm uppercase transition-all duration-200 hover:scale-105"
              style={{
                background: 'var(--orange)',
                color: '#fff',
                letterSpacing: '3px',
                fontFamily: 'Barlow, sans-serif',
              }}
            >
              Ver Coleção
            </button>
          </div>
          <div className="accent-border rounded-full">
            <button
              className="rounded-full px-8 py-4 font-semibold text-sm uppercase transition-all duration-200 hover:scale-105"
              style={{
                background: 'rgba(17,17,17,0.8)',
                color: 'var(--text)',
                border: '1px solid rgba(240,237,230,0.15)',
                letterSpacing: '3px',
                fontFamily: 'Barlow, sans-serif',
                backdropFilter: 'blur(8px)',
              }}
            >
              Nosso Método →
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 pb-10 flex flex-col items-center gap-3">
        <span className="text-[10px] uppercase" style={{ color: 'var(--muted)', letterSpacing: '4px' }}>
          Scroll
        </span>
        <div className="w-px h-10 overflow-hidden" style={{ background: 'var(--stroke)' }}>
          <div
            className="w-full h-1/2 animate-scroll-down"
            style={{ background: 'linear-gradient(to bottom, var(--orange), transparent)' }}
          />
        </div>
      </div>
    </section>
  )
}
