import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'
import { useCartStore } from '../stores/cartStore'
import { useIsMobile } from '../hooks/useIsMobile'
import CartDrawer from './CartDrawer'

interface NavbarProps {
  onCategorySelect?: (cat: string | null) => void
  onSearchOpen?: () => void
  onAuthOpen?: () => void
}

const SUB_ITEMS = ['Triathlon Suits', 'Cycling Jerseys', 'Bibs', 'Running', 'Training']

export default function Navbar({ onSearchOpen }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null)
  const { lang, setLang } = useLanguage()
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const { totalItems, openCart } = useCartStore()
  const isMobile = useIsMobile()
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setUserMenuOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const initials = user?.user_metadata?.full_name
    ? user.user_metadata.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : user?.email?.slice(0, 2).toUpperCase() ?? 'A'

  const [collDropOpen, setCollDropOpen] = useState(false)
  const [menSubOpen, setMenSubOpen] = useState(false)
  const [womenSubOpen, setWomenSubOpen] = useState(false)

  const collTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const menTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const womenTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.9, delay: 0.4, ease: 'power2.out' }
    )
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    if (!isMobile) setMenuOpen(false)
  }, [isMobile])

  const openColl = () => {
    if (collTimer.current) clearTimeout(collTimer.current)
    setCollDropOpen(true)
  }
  const closeColl = () => {
    collTimer.current = setTimeout(() => {
      setCollDropOpen(false)
      setMenSubOpen(false)
      setWomenSubOpen(false)
    }, 140)
  }

  const openMen = () => {
    if (menTimer.current) clearTimeout(menTimer.current)
    setMenSubOpen(true)
    setWomenSubOpen(false)
  }
  const closeMen = () => {
    menTimer.current = setTimeout(() => setMenSubOpen(false), 140)
  }

  const openWomen = () => {
    if (womenTimer.current) clearTimeout(womenTimer.current)
    setWomenSubOpen(true)
    setMenSubOpen(false)
  }
  const closeWomen = () => {
    womenTimer.current = setTimeout(() => setWomenSubOpen(false), 140)
  }

  const goHome = () => { navigate('/'); setMenuOpen(false) }

  const goToSection = (id: string) => {
    setMenuOpen(false)
    if (window.location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 300)
    }
  }

  const handleCategoryClick = (cat: string) => {
    setCollDropOpen(false)
    setMenSubOpen(false)
    setWomenSubOpen(false)
    setMenuOpen(false)
    navigate(`/collections/${cat.toLowerCase().replace(/\s+/g, '-')}`)
  }

  const handleCollectionClick = () => {
    setCollDropOpen(false)
    setMenuOpen(false)
    if (window.location.pathname === '/') {
      document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      setTimeout(() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' }), 300)
    }
  }

  const linkStyle = (hovered?: boolean): React.CSSProperties => ({
    fontFamily: 'Barlow, sans-serif', fontWeight: 400, fontSize: '10px',
    color: hovered ? '#fff' : 'rgba(255,255,255,0.65)',
    letterSpacing: '2.5px', textTransform: 'uppercase',
    background: 'none', border: 'none', cursor: 'pointer',
    transition: 'color 0.15s', padding: 0,
  })

  const dropItemStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    width: '100%', textAlign: 'left',
    fontFamily: 'Barlow, sans-serif', fontSize: '10px', fontWeight: 400,
    color: 'rgba(255,255,255,0.55)',
    letterSpacing: '2px', textTransform: 'uppercase',
    background: 'none', border: 'none', cursor: 'default',
    padding: '10px 20px',
    transition: 'color 0.15s, background 0.15s',
  }

  const flags = [
    { code: 'pt' as const, emoji: '🇧🇷' },
    { code: 'en' as const, emoji: '🇺🇸' },
    { code: 'de' as const, emoji: '🇩🇪' },
  ]

  const mobileNavLinks = [
    { label: 'COLLECTION',  action: handleCollectionClick },
    { label: 'TECHNOLOGY',  action: () => goToSection('racesuits') },
    { label: 'ACCESSORIES', action: () => { navigate('/collections/accessories'); setMenuOpen(false) } },
    { label: 'MEDIA',       action: () => goToSection('journal') },
    { label: 'ABOUT',       action: () => goToSection('about') },
    { label: 'CONTACT',     action: () => { navigate('/contact'); setMenuOpen(false) } },
  ]

  return (
    <>
    <nav
      ref={navRef}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: isMobile ? '18px 20px' : '22px 44px', opacity: 0,
      }}
    >
      <img
        src="/ARC_logo_transparente_branco_4000px.png"
        alt="ARC"
        onClick={goHome}
        style={{
          height: '20px', width: 'auto', cursor: 'pointer',
          userSelect: 'none',
          marginTop: '3px',
        }}
      />

      {/* Desktop center links */}
      {!isMobile && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>

          <div
            style={{ position: 'relative' }}
            onMouseEnter={openColl}
            onMouseLeave={closeColl}
          >
            <button
              onClick={handleCollectionClick}
              style={{
                ...linkStyle(),
                color: collDropOpen ? '#fff' : 'rgba(255,255,255,0.65)',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = collDropOpen ? '#fff' : 'rgba(255,255,255,0.65)')}
            >
              COLLECTION
            </button>

            {collDropOpen && (
              <div
                style={{
                  position: 'absolute', top: 'calc(100% + 16px)', left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'rgba(8,8,8,0.97)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(20px)',
                  minWidth: '180px',
                  padding: '8px 0',
                }}
              >
                <button
                  onClick={handleCollectionClick}
                  style={{
                    ...dropItemStyle,
                    color: '#fff', fontWeight: 600,
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#fff'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = '#fff'
                    e.currentTarget.style.background = 'none'
                  }}
                >
                  Show All
                </button>

                <div
                  style={{ position: 'relative' }}
                  onMouseEnter={openMen}
                  onMouseLeave={closeMen}
                >
                  <div
                    style={{ ...dropItemStyle, cursor: 'default' }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = '#fff'
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = 'rgba(255,255,255,0.55)'
                      e.currentTarget.style.background = 'none'
                    }}
                  >
                    <span>Men</span>
                    <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.35)' }}>▸</span>
                  </div>

                  {menSubOpen && (
                    <div
                      style={{
                        position: 'absolute', top: 0, left: '100%',
                        background: 'rgba(8,8,8,0.97)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(20px)',
                        minWidth: '180px',
                        padding: '8px 0',
                      }}
                      onMouseEnter={() => { if (menTimer.current) clearTimeout(menTimer.current) }}
                      onMouseLeave={closeMen}
                    >
                      {SUB_ITEMS.map(item => (
                        <button
                          key={item}
                          onClick={() => handleCategoryClick(item)}
                          style={{ ...dropItemStyle, cursor: 'pointer' }}
                          onMouseEnter={e => {
                            e.currentTarget.style.color = '#fff'
                            e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.color = 'rgba(255,255,255,0.55)'
                            e.currentTarget.style.background = 'none'
                          }}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div
                  style={{ position: 'relative' }}
                  onMouseEnter={openWomen}
                  onMouseLeave={closeWomen}
                >
                  <div
                    style={{ ...dropItemStyle, cursor: 'default' }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = '#fff'
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = 'rgba(255,255,255,0.55)'
                      e.currentTarget.style.background = 'none'
                    }}
                  >
                    <span>Women</span>
                    <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.35)' }}>▸</span>
                  </div>

                  {womenSubOpen && (
                    <div
                      style={{
                        position: 'absolute', top: 0, left: '100%',
                        background: 'rgba(8,8,8,0.97)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(20px)',
                        minWidth: '180px',
                        padding: '8px 0',
                      }}
                      onMouseEnter={() => { if (womenTimer.current) clearTimeout(womenTimer.current) }}
                      onMouseLeave={closeWomen}
                    >
                      {SUB_ITEMS.map(item => (
                        <button
                          key={item}
                          onClick={() => handleCategoryClick(item)}
                          style={{ ...dropItemStyle, cursor: 'pointer' }}
                          onMouseEnter={e => {
                            e.currentTarget.style.color = '#fff'
                            e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.color = 'rgba(255,255,255,0.55)'
                            e.currentTarget.style.background = 'none'
                          }}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {[
            { label: 'TECHNOLOGY',  action: () => goToSection('racesuits') },
            { label: 'ACCESSORIES', action: () => navigate('/collections/accessories') },
            { label: 'MEDIA',       action: () => goToSection('journal') },
            { label: 'ABOUT',       action: () => goToSection('about') },
            { label: 'CONTACT',     action: () => navigate('/contact') },
          ].map(({ label, action }) => (
            <button
              key={label}
              onClick={action}
              style={linkStyle()}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Right side icons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '16px' : '20px' }}>
        {/* Flags — desktop only */}
        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {flags.map(f => (
              <button
                key={f.code}
                onClick={() => setLang(f.code)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer', padding: '2px',
                  fontSize: '14px', lineHeight: 1,
                  color: lang === f.code ? '#C8FF00' : 'rgba(255,255,255,0.4)',
                  opacity: lang === f.code ? 1 : 0.6,
                  transition: 'opacity 0.15s',
                  filter: lang === f.code ? 'none' : 'grayscale(0.4)',
                }}
                title={f.code.toUpperCase()}
              >
                {f.emoji}
              </button>
            ))}
          </div>
        )}

        {/* Search — desktop only */}
        {!isMobile && (
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="rgba(255,255,255,0.65)" strokeWidth="1.5" strokeLinecap="round"
            style={{ cursor: 'pointer', transition: 'stroke 0.15s' }}
            onClick={() => onSearchOpen?.()}
            onMouseEnter={e => (e.currentTarget.style.stroke = 'rgba(255,255,255,0.9)')}
            onMouseLeave={e => (e.currentTarget.style.stroke = 'rgba(255,255,255,0.65)')}
          >
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
        )}

        {/* User — avatar if logged in, icon if not */}
        <div ref={userMenuRef} style={{ position: 'relative' }}>
          {user ? (
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              style={{
                width: '30px', height: '30px', borderRadius: '50%',
                background: 'var(--orange)', border: 'none', cursor: 'pointer',
                fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '12px',
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                letterSpacing: '0.5px',
              }}
            >
              {initials}
            </button>
          ) : (
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="rgba(255,255,255,0.65)" strokeWidth="1.5" strokeLinecap="round"
              style={{ cursor: 'pointer', transition: 'stroke 0.15s' }}
              onClick={() => navigate('/login')}
              onMouseEnter={e => (e.currentTarget.style.stroke = 'rgba(255,255,255,0.9)')}
              onMouseLeave={e => (e.currentTarget.style.stroke = 'rgba(255,255,255,0.65)')}
            >
              <circle cx="12" cy="8" r="4" /><path d="M20 21a8 8 0 1 0-16 0" />
            </svg>
          )}

          {/* User dropdown */}
          {userMenuOpen && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 12px)', right: 0,
              background: 'rgba(8,8,8,0.97)', border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(20px)', minWidth: '180px', padding: '8px 0', zIndex: 10,
            }}>
              {[
                { label: 'My Account', action: () => { navigate('/account'); setUserMenuOpen(false) } },
                { label: 'Orders',     action: () => { navigate('/account/orders'); setUserMenuOpen(false) } },
                { label: 'Addresses',  action: () => { navigate('/account/addresses'); setUserMenuOpen(false) } },
              ].map(item => (
                <button key={item.label} onClick={item.action} style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  fontFamily: 'Barlow, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.65)',
                  letterSpacing: '2px', textTransform: 'uppercase',
                  background: 'none', border: 'none', cursor: 'pointer', padding: '11px 20px',
                  transition: 'color 0.15s, background 0.15s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; e.currentTarget.style.background = 'none' }}
                >
                  {item.label}
                </button>
              ))}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', margin: '4px 0' }} />
              <button onClick={async () => { await signOut(); navigate('/'); setUserMenuOpen(false) }} style={{
                display: 'block', width: '100%', textAlign: 'left',
                fontFamily: 'Barlow, sans-serif', fontSize: '11px', color: 'rgba(248,113,113,0.7)',
                letterSpacing: '2px', textTransform: 'uppercase',
                background: 'none', border: 'none', cursor: 'pointer', padding: '11px 20px',
              }}
                onMouseEnter={e => { e.currentTarget.style.color = '#F87171'; e.currentTarget.style.background = 'rgba(248,113,113,0.05)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(248,113,113,0.7)'; e.currentTarget.style.background = 'none' }}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>

        {/* Cart icon */}
        <div style={{ position: 'relative', cursor: 'pointer' }} onClick={openCart}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="1.5" strokeLinecap="round" style={{ display: 'block' }}>
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          {totalItems > 0 && (
            <div style={{
              position: 'absolute', top: '-8px', right: '-8px',
              width: '16px', height: '16px', borderRadius: '50%',
              background: 'var(--orange)', color: '#000',
              fontFamily: 'Barlow, sans-serif', fontWeight: 700, fontSize: '9px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              lineHeight: 1,
            }}>
              {totalItems > 9 ? '9+' : totalItems}
            </div>
          )}
        </div>

        {/* Hamburger — mobile only */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(true)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', gap: '5px',
              padding: '4px', minHeight: '44px', alignItems: 'center', justifyContent: 'center',
            }}
            aria-label="Open menu"
          >
            <span style={{ display: 'block', width: '24px', height: '1.5px', background: '#fff' }} />
            <span style={{ display: 'block', width: '24px', height: '1.5px', background: '#fff' }} />
            <span style={{ display: 'block', width: '24px', height: '1.5px', background: '#fff' }} />
          </button>
        )}
      </div>

      <CartDrawer />
    </nav>

    {/* Mobile menu — outside <nav> to avoid GSAP transform stacking context */}
    {isMobile && menuOpen && (
      <div style={{
        position: 'fixed', inset: 0, background: '#000',
        zIndex: 9999, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '24px 32px 48px',
      }}>
          {/* Top row: logo + close */}
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <img
              src="/ARC_logo_transparente_branco_4000px.png"
              alt="ARC"
              onClick={goHome}
              style={{ height: '20px', width: 'auto', cursor: 'pointer' }}
            />
            <button
              onClick={() => setMenuOpen(false)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#fff', fontSize: '28px', lineHeight: 1,
                minWidth: '44px', minHeight: '44px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
              aria-label="Close menu"
            >
              ×
            </button>
          </div>

          {/* Nav links */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: 1, justifyContent: 'center' }}>
            {mobileNavLinks.map(({ label, action }) => (
              <button
                key={label}
                onClick={action}
                style={{
                  fontFamily: 'Bebas Neue, Barlow Condensed, sans-serif',
                  fontSize: '40px', color: '#fff', background: 'none', border: 'none',
                  cursor: 'pointer', letterSpacing: '3px', lineHeight: 1.2,
                  minHeight: '52px', transition: 'color 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                onMouseLeave={e => (e.currentTarget.style.color = '#fff')}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Language flags at bottom */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {flags.map(f => (
              <button
                key={f.code}
                onClick={() => setLang(f.code)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer', padding: '8px',
                  fontSize: '24px', lineHeight: 1,
                  opacity: lang === f.code ? 1 : 0.4,
                  filter: lang === f.code ? 'none' : 'grayscale(0.6)',
                  transition: 'opacity 0.15s',
                  minWidth: '44px', minHeight: '44px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
                title={f.code.toUpperCase()}
              >
                {f.emoji}
              </button>
            ))}
          </div>
      </div>
    )}
    </>
  )
}
