import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useIsMobile } from '../hooks/useIsMobile'
import { useAuth } from '../contexts/AuthContext'

const INPUT: React.CSSProperties = {
  width: '100%', background: 'var(--surface)', border: '1px solid var(--stroke)',
  color: 'var(--text)', fontFamily: 'Barlow, sans-serif', fontSize: '14px',
  padding: '14px 16px', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
}
const LABEL: React.CSSProperties = {
  display: 'block', fontFamily: 'Barlow, sans-serif', fontSize: '11px',
  color: 'var(--muted)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px',
}

export default function RegisterPage() {
  const { signUp } = useAuth()
  const isMobile = useIsMobile()

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [showPw, setShowPw] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return }
    if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return }
    if (!agreed) { setError('Please accept the terms to continue.'); return }
    setLoading(true)
    const { error: err } = await signUp(form.email, form.password, form.name)
    setLoading(false)
    if (err) {
      if (err.includes('already registered')) setError('This email already has an account.')
      else setError(err)
    } else {
      setSuccess(true)
    }
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', minHeight: '100vh', background: 'var(--bg)' }}>

      {/* Left — image (hidden on mobile) */}
      {!isMobile && (
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <img src="/pumar-1.jpeg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.35)' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px' }}>
            <img src="/ARC_logo_transparente_branco_4000px.png" alt="ARC" style={{ height: '48px', marginBottom: '32px' }} />
            <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontStyle: 'italic', fontSize: '28px', color: '#fff', textAlign: 'center', letterSpacing: '1px', textTransform: 'uppercase' }}>
              PERFORMANCE STARTS<br />WITH ONE STEP.
            </p>
          </div>
        </div>
      )}

      {/* Right — form */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: isMobile ? '48px 24px' : '64px 48px' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>

          {success ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(232,100,42,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '28px' }}>
                ✉
              </div>
              <h1 style={{ fontFamily: 'Bebas Neue, Barlow Condensed, sans-serif', fontSize: '36px', color: 'var(--text)', marginBottom: '12px', letterSpacing: '2px' }}>
                CHECK YOUR EMAIL
              </h1>
              <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '32px' }}>
                We sent a confirmation link to<br />
                <strong style={{ color: 'var(--text)' }}>{form.email}</strong>
              </p>
              <button
                onClick={() => signUp(form.email, form.password, form.name)}
                style={{ background: 'none', border: '1px solid var(--stroke)', color: 'var(--muted)', fontFamily: 'Barlow, sans-serif', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', padding: '12px 24px', cursor: 'pointer' }}
              >
                Resend Email
              </button>
            </div>
          ) : (
            <>
              <h1 style={{ fontFamily: 'Bebas Neue, Barlow Condensed, sans-serif', fontSize: '48px', color: 'var(--text)', marginBottom: '8px', letterSpacing: '3px' }}>
                CREATE ACCOUNT
              </h1>
              <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '14px', color: 'var(--muted)', marginBottom: '36px' }}>
                Join the ARC community.
              </p>

              {error && (
                <div style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)', padding: '12px 16px', marginBottom: '20px' }}>
                  <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '13px', color: '#FCA5A5' }}>{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <label style={LABEL}>Full Name</label>
                  <input required type="text" placeholder="Your name" value={form.name} onChange={e => set('name', e.target.value)} style={INPUT}
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--orange)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'var(--stroke)')} />
                </div>
                <div>
                  <label style={LABEL}>Email</label>
                  <input required type="email" placeholder="your@email.com" value={form.email} onChange={e => set('email', e.target.value)} style={INPUT}
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--orange)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'var(--stroke)')} />
                </div>
                <div>
                  <label style={LABEL}>Password</label>
                  <div style={{ position: 'relative' }}>
                    <input required type={showPw ? 'text' : 'password'} placeholder="Min. 8 characters" value={form.password} onChange={e => set('password', e.target.value)} style={{ ...INPUT, paddingRight: '48px' }}
                      onFocus={e => (e.currentTarget.style.borderColor = 'var(--orange)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'var(--stroke)')} />
                    <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: '16px' }}>
                      {showPw ? '🙈' : '👁'}
                    </button>
                  </div>
                </div>
                <div>
                  <label style={LABEL}>Confirm Password</label>
                  <input required type="password" placeholder="••••••••" value={form.confirm} onChange={e => set('confirm', e.target.value)} style={INPUT}
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--orange)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'var(--stroke)')} />
                </div>

                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} style={{ marginTop: '3px', accentColor: 'var(--orange)' }} />
                  <span style={{ fontFamily: 'Barlow, sans-serif', fontSize: '12px', color: 'var(--muted)', lineHeight: 1.6 }}>
                    I accept the <Link to="/terms" style={{ color: 'var(--orange)', textDecoration: 'none' }}>Terms of Use</Link> and <Link to="/privacy" style={{ color: 'var(--orange)', textDecoration: 'none' }}>Privacy Policy</Link>
                  </span>
                </label>

                <button type="submit" disabled={loading} style={{
                  background: 'var(--orange)', color: '#fff', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                  fontFamily: 'Barlow, sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '3px',
                  textTransform: 'uppercase', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s',
                }}>
                  {loading && <span style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />}
                  CREATE ACCOUNT
                </button>
              </form>

              <div style={{ textAlign: 'center', marginTop: '24px' }}>
                <span style={{ fontFamily: 'Barlow, sans-serif', fontSize: '13px', color: 'var(--muted)' }}>
                  Already have an account?{' '}
                  <Link to="/login" style={{ color: 'var(--text)', textDecoration: 'none', fontWeight: 600 }}>Sign in →</Link>
                </span>
              </div>
            </>
          )}
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
