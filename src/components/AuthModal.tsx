import { useEffect, useRef, useState } from 'react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [tab, setTab] = useState<'signin' | 'register'>('signin')
  const [signIn, setSignIn] = useState({ email: '', password: '' })
  const [reg, setReg] = useState({ name: '', email: '', password: '', confirm: '' })
  const [success, setSuccess] = useState(false)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (isOpen) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  useEffect(() => { if (!isOpen) { setSuccess(false); setTab('signin') } }, [isOpen])

  if (!isOpen) return null

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#fff',
    fontFamily: 'Barlow, sans-serif',
    fontSize: '14px',
    padding: '13px 16px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'Barlow, sans-serif',
    fontSize: '9px',
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: '2.5px',
    textTransform: 'uppercase',
    marginBottom: '8px',
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(0,0,0,0.85)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        ref={innerRef}
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: '440px',
          maxHeight: '90vh', overflowY: 'auto',
          background: '#111',
          border: '1px solid rgba(255,255,255,0.1)',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '20px', right: '20px',
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.4)', fontSize: '22px', lineHeight: 1,
            padding: '4px', zIndex: 1,
          }}
        >
          ×
        </button>

        <div style={{ padding: '40px 40px 0' }}>
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '32px' }}>
            {(['signin', 'register'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: 'Barlow, sans-serif', fontWeight: 600, fontSize: '11px',
                  letterSpacing: '2px', textTransform: 'uppercase',
                  color: tab === t ? '#C8FF00' : 'rgba(255,255,255,0.4)',
                  padding: '0 0 14px',
                  marginRight: '28px',
                  borderBottom: tab === t ? '2px solid #C8FF00' : '2px solid transparent',
                  marginBottom: '-1px',
                  transition: 'color 0.15s',
                }}
              >
                {t === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>
        </div>

        <div style={{ padding: '0 40px 40px' }}>
          {success ? (
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontStyle: 'italic', fontSize: '28px', color: '#fff', marginBottom: '12px' }}>ACCOUNT CREATED</p>
              <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>Welcome to ARC Performance.</p>
              <button onClick={onClose} style={{ marginTop: '24px', background: '#C8FF00', color: '#000', border: 'none', cursor: 'pointer', fontFamily: 'Barlow, sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', padding: '13px 32px' }}>
                CONTINUE SHOPPING
              </button>
            </div>
          ) : tab === 'signin' ? (
            <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={labelStyle}>Email</label>
                <input
                  type="email" required autoFocus
                  placeholder="your@email.com"
                  value={signIn.email}
                  onChange={e => setSignIn(s => ({ ...s, email: e.target.value }))}
                  style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderColor = 'rgba(200,255,0,0.4)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                  <label style={{ ...labelStyle, marginBottom: 0 }}>Password</label>
                  <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Barlow, sans-serif', fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.5px' }}>
                    Forgot password?
                  </button>
                </div>
                <input
                  type="password" required
                  placeholder="••••••••"
                  value={signIn.password}
                  onChange={e => setSignIn(s => ({ ...s, password: e.target.value }))}
                  style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderColor = 'rgba(200,255,0,0.4)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                />
              </div>
              <button
                type="submit"
                style={{
                  background: '#C8FF00', color: '#000', border: 'none', cursor: 'pointer',
                  fontFamily: 'Barlow, sans-serif', fontWeight: 700, fontSize: '11px',
                  letterSpacing: '3px', textTransform: 'uppercase',
                  padding: '15px 32px', marginTop: '4px',
                  transition: 'opacity 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Sign In
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
                <span style={{ fontFamily: 'Barlow, sans-serif', fontSize: '10px', color: 'rgba(255,255,255,0.25)', letterSpacing: '1px' }}>or</span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
              </div>
              <button
                type="button"
                style={{
                  background: 'transparent', color: 'rgba(255,255,255,0.7)',
                  border: '1px solid rgba(255,255,255,0.12)', cursor: 'pointer',
                  fontFamily: 'Barlow, sans-serif', fontWeight: 400, fontSize: '13px',
                  letterSpacing: '0.5px', padding: '13px 32px',
                  transition: 'border-color 0.15s, color 0.15s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
                  e.currentTarget.style.color = '#fff'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
            </form>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSuccess(true) }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name' },
                { key: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
                { key: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
                { key: 'confirm', label: 'Confirm Password', type: 'password', placeholder: '••••••••' },
              ].map(f => (
                <div key={f.key}>
                  <label style={labelStyle}>{f.label}</label>
                  <input
                    type={f.type} required
                    placeholder={f.placeholder}
                    value={reg[f.key as keyof typeof reg]}
                    onChange={e => setReg(r => ({ ...r, [f.key]: e.target.value }))}
                    style={inputStyle}
                    onFocus={ev => (ev.currentTarget.style.borderColor = 'rgba(200,255,0,0.4)')}
                    onBlur={ev => (ev.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                  />
                </div>
              ))}
              <button
                type="submit"
                style={{
                  background: '#C8FF00', color: '#000', border: 'none', cursor: 'pointer',
                  fontFamily: 'Barlow, sans-serif', fontWeight: 700, fontSize: '11px',
                  letterSpacing: '3px', textTransform: 'uppercase',
                  padding: '15px 32px', marginTop: '4px',
                  transition: 'opacity 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Create Account
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
                <span style={{ fontFamily: 'Barlow, sans-serif', fontSize: '10px', color: 'rgba(255,255,255,0.25)', letterSpacing: '1px' }}>or</span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
              </div>
              <button
                type="button"
                style={{
                  background: 'transparent', color: 'rgba(255,255,255,0.7)',
                  border: '1px solid rgba(255,255,255,0.12)', cursor: 'pointer',
                  fontFamily: 'Barlow, sans-serif', fontWeight: 400, fontSize: '13px',
                  letterSpacing: '0.5px', padding: '13px 32px',
                  transition: 'border-color 0.15s, color 0.15s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
                  e.currentTarget.style.color = '#fff'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  )
}
