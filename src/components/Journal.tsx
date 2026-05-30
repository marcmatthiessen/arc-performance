import { useIsMobile } from '../hooks/useIsMobile'

const ARTICLES = [
  {
    img: '/ironman%20start.jpeg',
    tag: 'RACE REPORT',
    title: 'Built for Relentless Pursuit',
    excerpt: 'A experiência de competir no Ironman com o racesuit ARC — do open water ao finisher tape.',
    date: 'MAI 2025',
  },
  {
    img: '/pumar-2.jpeg',
    tag: 'PERFORMANCE',
    title: 'O Ciclismo como Arte',
    excerpt: 'Detalhes que fazem a diferença na bike leg. Como o design reduz segundos.',
    date: 'ABR 2025',
  },
  {
    img: '/pumar-1.jpeg',
    tag: 'ATHLETES',
    title: 'Silhuetas que vencem',
    excerpt: 'Histórias de atletas ARC que usam a performance como filosofia de vida.',
    date: 'MAR 2025',
  },
]

export default function Journal() {
  const isMobile = useIsMobile()
  return (
    <section id="journal" style={{ background: '#000', borderTop: '1px solid rgba(255,255,255,0.06)', padding: isMobile ? '60px 0' : '100px 0' }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: `0 ${isMobile ? '16px' : '48px'}` }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '56px' }}>
          <div>
            <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '5px', textTransform: 'uppercase', marginBottom: '12px' }}>
              ATHLETES · RACES · DESIGN
            </p>
            <h2 style={{
              fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontStyle: 'italic',
              fontSize: 'clamp(48px, 6vw, 80px)', color: '#fff', lineHeight: 0.9, letterSpacing: '-1px',
            }}>
              MEDIA
            </h2>
          </div>
          <button style={{
            fontFamily: 'Barlow, sans-serif', fontSize: '10px', color: 'rgba(255,255,255,0.55)',
            letterSpacing: '3px', textTransform: 'uppercase', background: 'none', border: '1px solid rgba(255,255,255,0.15)',
            padding: '12px 24px', cursor: 'pointer', transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}
          >
            Ver Todos →
          </button>
        </div>

        {/* Articles grid */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr 1fr', gap: '2px' }}>
          {ARTICLES.map((a, i) => (
            <div
              key={i}
              style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', aspectRatio: i === 0 ? '3/2' : '4/5' }}
              onMouseEnter={e => {
                const img = e.currentTarget.querySelector('img') as HTMLElement
                if (img) img.style.transform = 'scale(1.04)'
              }}
              onMouseLeave={e => {
                const img = e.currentTarget.querySelector('img') as HTMLElement
                if (img) img.style.transform = 'scale(1)'
              }}
            >
              <img
                src={a.img}
                alt={a.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.55) contrast(1.1)', transition: 'transform 0.5s ease', display: 'block' }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)',
              }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: i === 0 ? '32px 36px' : '24px 24px' }}>
                <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '9px', color: 'rgba(255,255,255,0.5)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '10px' }}>
                  {a.tag} · {a.date}
                </p>
                <h3 style={{
                  fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontStyle: 'italic',
                  fontSize: i === 0 ? '28px' : '18px', color: '#fff', lineHeight: 1.1, letterSpacing: '0.5px',
                }}>
                  {a.title}
                </h3>
                {i === 0 && (
                  <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginTop: '10px', lineHeight: 1.7 }}>
                    {a.excerpt}
                  </p>
                )}
                <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '16px' }}>
                  Read Story →
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
