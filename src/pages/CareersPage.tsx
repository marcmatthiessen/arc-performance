import PageLayout from '../components/PageLayout'

export default function CareersPage() {
  return (
    <PageLayout>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 48px 120px' }}>

        <div style={{ marginBottom: '80px' }}>
          <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '10px', color: '#C8FF00', letterSpacing: '5px', textTransform: 'uppercase', marginBottom: '16px' }}>
            Work with us
          </p>
          <h1 style={{
            fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900,
            fontSize: 'clamp(56px, 9vw, 120px)', color: 'var(--text)',
            lineHeight: 0.88, letterSpacing: '-2px', textTransform: 'uppercase',
            marginBottom: '24px',
          }}>
            CAREERS
          </h1>
          <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '16px', color: 'var(--muted)', maxWidth: '540px', lineHeight: 1.7 }}>
            We are a small team with high standards. Every role at ARC involves real responsibility and direct impact on the product.
          </p>
        </div>

        <div style={{
          border: '1px solid rgba(255,255,255,0.08)',
          padding: '64px 56px',
          textAlign: 'center',
          marginBottom: '80px',
        }}>
          <div style={{
            width: '56px', height: '56px', margin: '0 auto 28px',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5">
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
            </svg>
          </div>
          <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '28px', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
            No open positions right now
          </h2>
          <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7, maxWidth: '420px', margin: '0 auto 32px' }}>
            We do not post roles until we are ready to hire. When we are, this page will be the first place they appear.
          </p>
          <a
            href="mailto:careers@arcperformance.com.br?subject=Spontaneous Application — ARC Performance"
            style={{
              background: '#C8FF00', color: '#000', textDecoration: 'none',
              fontFamily: 'Barlow, sans-serif', fontWeight: 700, fontSize: '11px',
              letterSpacing: '3px', textTransform: 'uppercase',
              padding: '15px 36px', display: 'inline-block',
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Send Your CV
          </a>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '56px' }}>
          <h3 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '22px', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '24px' }}>
            What we value
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            {[
              { title: 'Craft over speed', desc: 'We would rather ship one perfect thing than three average ones.' },
              { title: 'Athletes first', desc: 'Every decision is filtered through the lens of the person wearing the gear.' },
              { title: 'Ownership', desc: 'Small team means full ownership. No middle layers, no committee decisions.' },
              { title: 'Long-term thinking', desc: 'We build ARC to last. That applies to the products and the team.' },
            ].map(item => (
              <div key={item.title} style={{ borderLeft: '2px solid rgba(200,255,0,0.3)', paddingLeft: '20px' }}>
                <h4 style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 600, fontSize: '13px', color: 'var(--text)', letterSpacing: '0.5px', marginBottom: '8px', textTransform: 'uppercase' }}>
                  {item.title}
                </h4>
                <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '13px', color: 'var(--muted)', lineHeight: 1.7 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </PageLayout>
  )
}
