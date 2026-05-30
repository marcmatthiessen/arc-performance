import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'

interface NavbarProps {
  onCategorySelect?: (cat: string | null) => void
  onSearchOpen?: () => void
  onAuthOpen?: () => void
}

const SUB_ITEMS = ['Triathlon Suits', 'Cycling Jerseys', 'Bibs', 'Running', 'Training']

export default function Navbar({ onCategorySelect, onSearchOpen }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null)
  const { lang, setLang } = useLanguage()
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
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

  const handleCategoryClick = (cat: string | null) => {
    setCollDropOpen(false)
    setMenSubOpen(false)
    setWomenSubOpen(false)
    onCategorySelect?.(cat)
  }

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

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

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '22px 44px', opacity: 0,
      }}
    >
      <img
        src="/ARC_logo_transparente_branco_4000px.png"
        alt="ARC"
        onClick={() => window.location.pathname !== '/' ? (window.location.href = '/') : scrollTo('hero')}
        style={{
          height: '20px', width: 'auto', cursor: 'pointer',
          userSelect: 'none',
          marginTop: '3px',
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>

        <div
          style={{ position: 'relative' }}
          onMouseEnter={openColl}
          onMouseLeave={closeColl}
        >
          <button
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
                onClick={() => handleCategoryClick(null)}
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
          { label: 'TECHNOLOGY', id: 'technology' },
          { label: 'ACCESSORIES', id: 'collection' },
          { label: 'JOURNAL', id: 'journal' },
          { label: 'ABOUT', id: 'about' },
          { label: 'CONTACT', id: 'contact' },
        ].map(({ label, id }) => (
          <button
            key={label}
            onClick={() => scrollTo(id)}
            style={linkStyle()}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
          >
            {label}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
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

        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="rgba(255,255,255,0.65)" strokeWidth="1.5" strokeLinecap="round"
          style={{ cursor: 'pointer', transition: 'stroke 0.15s' }}
          onMouseEnter={e => (e.currentTarget.style.stroke = 'rgba(255,255,255,0.9)')}
          onMouseLeave={e => (e.currentTarget.style.stroke = 'rgba(255,255,255,0.65)')}
        >
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      </div>
    </nav>
  )
}
