import { useIsMobile } from '../hooks/useIsMobile'

const FEATURES = [
  { icon: '◈', title: 'Aerodynamic Fit', body: 'Corte aerodinâmico testado em túnel de vento. Redução de arrasto para máxima velocidade.' },
  { icon: '◫', title: 'Rear Pocket System', body: 'Bolso traseiro de alta capacidade com fecho resistente. Acesso rápido em movimento.' },
  { icon: '◉', title: 'Premium Fabrics', body: 'Tecidos de compressão graduada de alta performance. Importados e certificados.' },
  { icon: '◌', title: 'Moisture Wicking', body: 'Gestão térmica avançada. Seco e confortável do início ao fim da prova.' },
  { icon: '◎', title: 'Compression Zones', body: 'Zonas de compressão estratégicas que melhoram o fluxo sanguíneo e reduzem fadiga.' },
  { icon: '◐', title: 'Reflective Details', body: 'Elementos refletivos para visibilidade em treinos noturnos e condições adversas.' },
]

export default function Technology() {
  const isMobile = useIsMobile()
  return (
    <section id="racesuits" style={{ background: '#000', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', minHeight: isMobile ? 'auto' : '70vh' }}>

        {/* Left — text + features */}
        <div style={{ padding: isMobile ? '48px 24px' : '80px 64px 80px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: '640px' }}>
          <p style={{
            fontFamily: 'Barlow, sans-serif', fontSize: '10px', color: 'rgba(255,255,255,0.4)',
            letterSpacing: '5px', textTransform: 'uppercase', marginBottom: '20px',
          }}>
            TECHNOLOGY
          </p>
          <h2 style={{
            fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontStyle: 'italic',
            fontSize: 'clamp(40px, 4.5vw, 72px)', color: '#fff', lineHeight: 0.92, letterSpacing: '-1px', marginBottom: '20px',
          }}>
            PERFORMANCE<br />ENGINEERING
          </h2>
          <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: '52px', maxWidth: '420px' }}>
            Cada peça ARC é engenhada para um propósito. Performance como filosofia — do design ao tecido, do corte ao detalhe, tudo é construído para vencer.
          </p>

          {/* Feature grid */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '28px 40px' }}>
            {FEATURES.map((f, i) => (
              <div key={i}>
                <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600, fontStyle: 'italic', fontSize: '13px', color: '#fff', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px' }}>
                  {f.title}
                </p>
                <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '12px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — photo */}
        {!isMobile && <div style={{ position: 'relative', overflow: 'hidden', minHeight: '500px' }}>
          <div style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background: 'linear-gradient(to right, #000 0%, rgba(0,0,0,0.3) 30%, transparent 60%)',
          }} />
          <img
            src="/cycle.jpeg"
            alt="ARC athlete"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.7) contrast(1.1)' }}
          />
        </div>}
      </div>
    </section>
  )
}
