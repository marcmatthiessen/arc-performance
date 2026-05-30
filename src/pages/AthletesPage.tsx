import PageLayout from '../components/PageLayout'

const ATHLETES = [
  {
    name: 'Lucas Ferreira',
    role: 'Pro Triathlete · 70.3 Specialist',
    description: 'Three-time national podium finisher. Lucas pushes ARC gear to its limits across long-course racing in South America and Europe.',
    img: '/ma.png',
  },
  {
    name: 'Marina Souza',
    role: 'Elite Cyclist · Endurance',
    description: 'National road cycling champion. Marina partners with ARC to develop aero kits that perform in the highest echelons of the sport.',
    img: '/pumar-1.jpeg',
  },
  {
    name: 'Rafael Duarte',
    role: 'Ironman Finisher · Coach',
    description: 'Ironman World Championship qualifier and endurance coach. Rafael tests and refines every ARC piece before it reaches the public.',
    img: '/ma.png',
  },
]

export default function AthletesPage() {
  return (
    <PageLayout>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px 120px' }}>

        <div style={{ marginBottom: '72px' }}>
          <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '10px', color: '#C8FF00', letterSpacing: '5px', textTransform: 'uppercase', marginBottom: '16px' }}>
            Powered by ARC
          </p>
          <h1 style={{
            fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900,
            fontSize: 'clamp(56px, 9vw, 120px)', color: 'var(--text)',
            lineHeight: 0.88, letterSpacing: '-2px', textTransform: 'uppercase',
            marginBottom: '24px',
          }}>
            ATHLETES
          </h1>
          <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '16px', color: 'var(--muted)', maxWidth: '540px', lineHeight: 1.7 }}>
            The people who wear ARC every day are the reason we build gear the way we do. No compromises.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', marginBottom: '80px' }}>
          {ATHLETES.map(athlete => (
            <div key={athlete.name} style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
              <div style={{ aspectRatio: '3/4', overflow: 'hidden' }}>
                <img
                  src={athlete.img}
                  alt={athlete.name}
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    filter: 'grayscale(0.2)',
                    transition: 'transform 0.5s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </div>
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0) 100%)',
                padding: '40px 28px 28px',
              }}>
                <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '9px', color: '#C8FF00', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '8px' }}>
                  {athlete.role}
                </p>
                <h3 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '26px', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
                  {athlete.name}
                </h3>
                <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '12px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.65 }}>
                  {athlete.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '-0.5px', marginBottom: '8px' }}>
              WANT TO WEAR ARC?
            </h2>
            <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '14px', color: 'var(--muted)' }}>
              We partner with serious athletes of all levels. Tell us your story.
            </p>
          </div>
          <a
            href="mailto:athletes@arcperformance.com.br"
            style={{
              background: '#C8FF00', color: '#000', textDecoration: 'none',
              fontFamily: 'Barlow, sans-serif', fontWeight: 700, fontSize: '11px',
              letterSpacing: '3px', textTransform: 'uppercase',
              padding: '16px 36px', display: 'inline-block',
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Join Our Team
          </a>
        </div>

      </div>
    </PageLayout>
  )
}
