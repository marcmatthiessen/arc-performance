import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function CookieBanner() {
  const [visible, setVisible] = useState(() => !localStorage.getItem('arc_cookies_accepted'))

  if (!visible) return null

  const accept = () => {
    localStorage.setItem('arc_cookies_accepted', '1')
    setVisible(false)
  }

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 999,
      background: 'rgba(10,10,10,0.97)', borderTop: '1px solid rgba(255,255,255,0.1)',
      backdropFilter: 'blur(20px)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexWrap: 'wrap', gap: '16px',
      padding: '20px 48px',
    }}>
      <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, maxWidth: '680px' }}>
        Usamos cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa{' '}
        <Link to="/cookies" style={{ color: 'var(--orange)', textDecoration: 'none' }}>Política de Cookies</Link>.
      </p>
      <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
        <Link
          to="/cookies"
          onClick={() => setVisible(false)}
          style={{
            fontFamily: 'Barlow, sans-serif', fontSize: '10px', fontWeight: 500,
            letterSpacing: '2px', textTransform: 'uppercase', padding: '11px 22px',
            background: 'transparent', color: 'rgba(255,255,255,0.55)',
            border: '1px solid rgba(255,255,255,0.2)', textDecoration: 'none',
            transition: 'all 0.2s', display: 'inline-block',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
        >
          Gerenciar
        </Link>
        <button
          onClick={accept}
          style={{
            fontFamily: 'Barlow, sans-serif', fontSize: '10px', fontWeight: 600,
            letterSpacing: '2px', textTransform: 'uppercase', padding: '11px 28px',
            background: 'var(--orange)', color: '#fff', border: 'none', cursor: 'pointer',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          Aceitar Todos
        </button>
      </div>
    </div>
  )
}
