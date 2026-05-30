import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
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

export default function LoginPage() {
  const { signIn, resetPassword } = useAuth()
  const isMobile = useIsMobile()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/account'

  const [form, setForm] = useState({ email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showReset, setShowReset] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetSent, setResetSent] = useState(false)

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error: err } = await signIn(form.email, form.password)
    setLoading(false)
    if (err) setError('Invalid email or password.')
    else navigate(from, { replace: true })
  }

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error: err } = await resetPassword(resetEmail)
    if (!err) setResetSent(true)
    else setError(err)
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', minHeight: '100vh', background: 'var(--bg)' }}>

      {/* Left — image (hidden on mobile) */}
      {!isMobile && <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img src="/cycle.jpeg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.3)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px' }}>
          <img src="/ARC_logo_transparente_branco_4000px.png" alt="ARC" style={{ height: '48px', marginBottom: '32px' }} />
          <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontStyle: 'italic', fontSize: '28px', color: '#fff', textAlign: 'center', letterSpacing: '1px', textTransform: 'uppercase' }}>
            ENGINEERED FOR SPEED.<br />BUILT TO WIN.
          </p>
        </div>
      </div>}

      {/* Right — form */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: isMobile ? '48px 24px' : '64px 48px' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>

          <h1 style={{ fontFamily: 'Bebas Neue, Barlow Condensed, sans-serif', fontSize: '48px', color: 'var(--text)', marginBottom: '8px', letterSpacing: '3px' }}>
            WELCOME BACK
          </h1>
          <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '14px', color: 'var(--muted)', marginBottom: '36px' }}>
            Sign in to your ARC account.
          </p>

          {error && (
            <div style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)', padding: '12px 16px', marginBottom: '20px' }}>
              <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '13px', color: '#FCA5A5' }}>{error}</p>
            </div>
          )}

          {!showReset ? (
            <>
              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <label style={LABEL}>Email</label>
                  <input required type="email" placeholder="your@email.com" value={form.email} onChange={e => set('email', e.target.value)} style={INPUT}
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--orange)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'var(--stroke)')} />
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                    <label style={{ ...LABEL, marginBottom: 0 }}>Password</label>
                    <button type="button" onClick={() => setShowReset(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Barlow, sans-serif', fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.5px' }}>
                      Forgot password?
                    </button>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <input required type={showPw ? 'text' : 'password'} placeholder="••••••••" value={form.password} onChange={e => set('password', e.target.value)} style={{ ...INPUT, paddingRight: '48px' }}
                      onFocus={e => (e.currentTarget.style.borderColor = 'var(--orange)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'var(--stroke)')} />
                    <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: '16px' }}>
                      {showPw ? '🙈' : '👁'}
                    </button>
                  </div>
                </div>

                <button type="submit" disabled={loading} style={{
                  background: 'var(--orange)', color: '#fff', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                  fontFamily: 'Barlow, sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '3px',
                  textTransform: 'uppercase', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s', marginTop: '4px',
                }}>
                  {loading && <span style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />}
                  SIGN IN
                </button>
              </form>

              <div style={{ textAlign: 'center', marginTop: '24px' }}>
                <span style={{ fontFamily: 'Barlow, sans-serif', fontSize: '13px', color: 'var(--muted)' }}>
                  Don't have an account?{' '}
                  <Link to="/register" style={{ color: 'var(--text)', textDecoration: 'none', fontWeight: 600 }}>Create one →</Link>
                </span>
              </div>
            </>
          ) : (
            <div>
              <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontStyle: 'italic', fontSize: '28px', color: 'var(--text)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Reset Password
              </h2>
              {resetSent ? (
                <div>
                  <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '20px' }}>
                    Recovery link sent to <strong style={{ color: 'var(--text)' }}>{resetEmail}</strong>. Check your inbox.
                  </p>
                  <button onClick={() => { setShowReset(false); setResetSent(false) }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Barlow, sans-serif', fontSize: '13px', color: 'var(--orange)' }}>
                    ← Back to Sign In
                  </button>
                </div>
              ) : (
                <form onSubmit={handleReset} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7 }}>
                    Enter your email and we'll send a recovery link.
                  </p>
                  <div>
                    <label style={LABEL}>Email</label>
                    <input required type="email" placeholder="your@email.com" value={resetEmail} onChange={e => setResetEmail(e.target.value)} style={INPUT}
                      onFocus={e => (e.currentTarget.style.borderColor = 'var(--orange)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'var(--stroke)')} />
                  </div>
                  <button type="submit" style={{ background: 'var(--orange)', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Barlow, sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', height: '52px' }}>
                    SEND RECOVERY LINK
                  </button>
                  <button type="button" onClick={() => setShowReset(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Barlow, sans-serif', fontSize: '13px', color: 'var(--muted)' }}>
                    ← Back to Sign In
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
