import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const LINKS = ['Home', 'Collection', 'Method', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('Home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase())
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setActive(id)
  }

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div
        className="inline-flex items-center gap-1 rounded-full px-2 py-2 border"
        style={{
          borderColor: 'rgba(255,255,255,0.08)',
          background: scrolled ? 'rgba(10,10,10,0.88)' : 'rgba(17,17,17,0.6)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.4)' : 'none',
          transition: 'all 0.4s',
        }}
      >
        {/* Logo */}
        <div className="relative w-9 h-9 rounded-full cursor-pointer group" style={{ padding: '1.5px' }}>
          <div
            className="absolute inset-0 rounded-full opacity-100"
            style={{ background: 'linear-gradient(135deg, #E8642A, #FF9A5C)' }}
          />
          <div
            className="relative w-full h-full rounded-full flex items-center justify-center"
            style={{ background: 'var(--bg)' }}
          >
            <span className="font-condensed italic font-bold text-sm" style={{ color: 'var(--text)', letterSpacing: '1px' }}>
              ARC
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-5 mx-1 hidden sm:block" style={{ background: 'var(--stroke)' }} />

        {/* Links */}
        {LINKS.map(link => (
          <button
            key={link}
            onClick={() => scrollTo(link)}
            className="rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200"
            style={{
              color: active === link ? 'var(--text)' : 'var(--muted)',
              background: active === link ? 'rgba(255,255,255,0.06)' : 'transparent',
              letterSpacing: '0.5px',
              fontFamily: 'Barlow, sans-serif',
              fontWeight: 600,
            }}
            onMouseEnter={e => { if (active !== link) (e.target as HTMLElement).style.color = 'var(--text)' }}
            onMouseLeave={e => { if (active !== link) (e.target as HTMLElement).style.color = 'var(--muted)' }}
          >
            {link}
          </button>
        ))}

        {/* Divider */}
        <div className="w-px h-5 mx-1 hidden sm:block" style={{ background: 'var(--stroke)' }} />

        {/* CTA */}
        <div className="accent-border rounded-full">
          <button
            className="rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200"
            style={{
              background: 'var(--surface)',
              color: 'var(--text)',
              fontFamily: 'Barlow, sans-serif',
              letterSpacing: '0.5px',
            }}
          >
            Shop ↗
          </button>
        </div>
      </div>
    </motion.nav>
  )
}
