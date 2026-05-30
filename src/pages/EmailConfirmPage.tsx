import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function EmailConfirmPage() {
  const navigate = useNavigate()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')

  useEffect(() => {
    const handleConfirm = async () => {
      // Supabase can send either hash params or query params depending on flow type

      // 1. Try query param flow (PKCE / token_hash)
      const params = new URLSearchParams(window.location.search)
      const tokenHash = params.get('token_hash')
      const type = params.get('type') as 'signup' | 'recovery' | null

      if (tokenHash && type) {
        const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type })
        if (!error) { setStatus('success'); return }
        setStatus('error')
        return
      }

      // 2. Try hash fragment flow (implicit)
      const hash = window.location.hash
      if (hash) {
        const hashParams = new URLSearchParams(hash.replace('#', ''))
        const accessToken  = hashParams.get('access_token')
        const refreshToken = hashParams.get('refresh_token')
        if (accessToken && refreshToken) {
          const { error } = await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken })
          if (!error) { setStatus('success'); return }
        }
        setStatus('error')
        return
      }

      // 3. Already logged in (session exists)
      const { data } = await supabase.auth.getSession()
      if (data.session) { setStatus('success'); return }

      setStatus('error')
    }

    handleConfirm()
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px' }}>
      <div style={{ textAlign: 'center', maxWidth: '400px' }}>
        <img src="/ARC_logo_transparente_branco_4000px.png" alt="ARC" style={{ height: '36px', marginBottom: '48px' }} />

        {status === 'loading' && (
          <>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid var(--stroke)', borderTopColor: 'var(--orange)', animation: 'spin 0.8s linear infinite', margin: '0 auto 24px' }} />
            <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '16px', color: 'var(--muted)' }}>Confirming your email...</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(232,100,42,0.12)', border: '2px solid var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '28px', color: 'var(--orange)' }}>
              ✓
            </div>
            <h1 style={{ fontFamily: 'Bebas Neue, Barlow Condensed, sans-serif', fontSize: '40px', color: 'var(--text)', marginBottom: '12px', letterSpacing: '3px' }}>
              EMAIL CONFIRMED
            </h1>
            <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '14px', color: 'var(--muted)', marginBottom: '32px', lineHeight: 1.7 }}>
              Your account is active. Welcome to ARC Performance.
            </p>
            <button
              onClick={() => navigate('/account')}
              style={{ background: 'var(--orange)', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Barlow, sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', padding: '16px 40px' }}
            >
              ACCESS MY ACCOUNT →
            </button>
          </>
        )}

        {status === 'error' && (
          <>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(220,38,38,0.1)', border: '2px solid rgba(220,38,38,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '28px', color: '#F87171' }}>
              ✕
            </div>
            <h1 style={{ fontFamily: 'Bebas Neue, Barlow Condensed, sans-serif', fontSize: '40px', color: 'var(--text)', marginBottom: '12px', letterSpacing: '3px' }}>
              INVALID LINK
            </h1>
            <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '14px', color: 'var(--muted)', marginBottom: '32px', lineHeight: 1.7 }}>
              This link has expired or is invalid.<br />Request a new confirmation email.
            </p>
            <button
              onClick={() => navigate('/register')}
              style={{ background: 'var(--orange)', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Barlow, sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', padding: '16px 40px' }}
            >
              TRY AGAIN
            </button>
          </>
        )}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
