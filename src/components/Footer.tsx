import { Link } from 'react-router-dom'
import { useState } from 'react'

const COLS = [
  {
    title: 'Support',
    links: [
      { label: 'FAQ',                  to: '/faq' },
      { label: 'Contact Us',           to: '/contact' },
      { label: 'Returns & Exchanges',  to: '/returns' },
      { label: 'Size Chart',           to: '/size-chart' },
      { label: 'Shipping Info',        to: '/faq' },
    ],
  },
  {
    title: 'ARC Performance',
    links: [
      { label: 'About ARC',      to: '/#about' },
      { label: 'Our Method',     to: '/method' },
      { label: 'Athletes',       to: '/athletes' },
      { label: 'Sustainability', to: '/sustainability' },
      { label: 'Careers',        to: '/careers' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy',      to: '/privacy' },
      { label: 'Terms & Conditions',  to: '/terms' },
      { label: 'Cookie Policy',       to: '/cookies' },
      { label: 'Right of Withdrawal', to: '/returns' },
    ],
  },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  return (
    <footer id="contact" style={{ background: '#000', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '80px 48px 0' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1.4fr', gap: '48px', paddingBottom: '64px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>

          {COLS.map(col => (
            <div key={col.title}>
              <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '9px', fontWeight: 600, color: 'rgba(255,255,255,0.35)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '20px' }}>
                {col.title}
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '13px' }}>
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '13px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s', display: 'inline-block' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#C8FF00')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '9px', fontWeight: 600, color: 'rgba(255,255,255,0.35)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '20px' }}>
              Follow ARC
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '13px', marginBottom: '32px' }}>
              {[
                { label: 'Instagram ↗', href: 'https://instagram.com' },
                { label: 'Strava ↗',    href: 'https://strava.com' },
                { label: 'LinkedIn ↗',  href: 'https://linkedin.com' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '13px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#C8FF00')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                >
                  {s.label}
                </a>
              ))}
            </div>

            <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '12px', letterSpacing: '0.5px' }}>
              Updates, drops and training tips.
            </p>
            {subscribed ? (
              <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '12px', color: '#C8FF00', letterSpacing: '1px' }}>
                Subscribed
              </p>
            ) : (
              <div style={{ display: 'flex', gap: '0' }}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
                    borderRight: 'none', color: '#fff', fontFamily: 'Barlow, sans-serif', fontSize: '12px',
                    padding: '11px 14px', outline: 'none',
                  }}
                />
                <button
                  onClick={() => { if (email) setSubscribed(true) }}
                  style={{
                    background: '#C8FF00', color: '#000', border: 'none', cursor: 'pointer',
                    fontFamily: 'Barlow, sans-serif', fontSize: '10px', fontWeight: 700,
                    letterSpacing: '2px', textTransform: 'uppercase', padding: '11px 16px',
                    whiteSpace: 'nowrap', transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  OK
                </button>
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 0 32px', flexWrap: 'wrap', gap: '16px' }}>
          <span style={{ fontFamily: 'Bebas Neue, Barlow Condensed, sans-serif', fontWeight: 400, fontSize: '20px', color: '#fff', letterSpacing: '3px' }}>
            ARC
          </span>
          <div style={{ display: 'flex', gap: '24px' }}>
            {[
              { label: 'Privacy',  to: '/privacy' },
              { label: 'Terms',    to: '/terms' },
              { label: 'Cookies',  to: '/cookies' },
            ].map((l, i) => (
              <span key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                {i > 0 && <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '10px' }}>·</span>}
                <Link to={l.to} style={{ fontFamily: 'Barlow, sans-serif', fontSize: '10px', color: 'rgba(255,255,255,0.3)', textDecoration: 'none', letterSpacing: '1px', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#C8FF00')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
                >
                  {l.label}
                </Link>
              </span>
            ))}
          </div>
          <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '10px', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.5px' }}>
            © 2025 ARC Performance · arcperformance.com.br
          </p>
        </div>
      </div>
    </footer>
  )
}
