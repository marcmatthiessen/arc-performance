import PageLayout from '../components/PageLayout'

const PILLARS = [
  {
    number: '01',
    title: 'Oeko-Tex Certified',
    description: 'Every ARC fabric is Oeko-Tex Standard 100 certified. This means every component — from the outer shell to the inner padding — has been independently tested and is free of harmful substances. What touches your skin matters.',
  },
  {
    number: '02',
    title: 'Responsible Production',
    description: 'We work exclusively with manufacturers who maintain fair labor practices and safe working conditions. Our supply chain is audited regularly, and we refuse to scale at the cost of the people who build our gear.',
  },
  {
    number: '03',
    title: 'Minimal Packaging',
    description: 'ARC products ship in recycled cardboard and plant-based tissue. No single-use plastic. No unnecessary inserts. The box is as considered as the kit inside it — functional, minimal, and compostable.',
  },
]

export default function SustainabilityPage() {
  return (
    <PageLayout>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px 120px' }}>

        <div style={{ marginBottom: '80px' }}>
          <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '10px', color: '#C8FF00', letterSpacing: '5px', textTransform: 'uppercase', marginBottom: '16px' }}>
            Our Commitment
          </p>
          <h1 style={{
            fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900,
            fontSize: 'clamp(56px, 9vw, 120px)', color: 'var(--text)',
            lineHeight: 0.88, letterSpacing: '-2px', textTransform: 'uppercase',
            marginBottom: '24px',
          }}>
            SUSTAINABILITY
          </h1>
          <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '16px', color: 'var(--muted)', maxWidth: '580px', lineHeight: 1.7 }}>
            Performance and responsibility are not opposites. We build gear that goes further, and we intend to be here for the long run.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {PILLARS.map((pillar, i) => (
            <div
              key={pillar.number}
              style={{
                display: 'grid', gridTemplateColumns: '80px 1fr',
                gap: '48px', alignItems: 'start',
                padding: '56px 0',
                borderBottom: i < PILLARS.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
              }}
            >
              <div>
                <span style={{
                  fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900,
                  fontSize: '48px', color: '#C8FF00', letterSpacing: '-1px',
                  lineHeight: 1, display: 'block',
                }}>
                  {pillar.number}
                </span>
              </div>
              <div>
                <h2 style={{
                  fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700,
                  fontSize: 'clamp(24px, 3vw, 36px)', color: 'var(--text)',
                  textTransform: 'uppercase', letterSpacing: '0.5px',
                  marginBottom: '20px',
                }}>
                  {pillar.title}
                </h2>
                <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '15px', color: 'var(--muted)', lineHeight: 1.8, maxWidth: '620px' }}>
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '80px',
          background: 'rgba(200,255,0,0.04)',
          border: '1px solid rgba(200,255,0,0.15)',
          padding: '48px',
        }}>
          <h3 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '24px', color: '#C8FF00', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
            Ongoing work
          </h3>
          <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '14px', color: 'var(--muted)', lineHeight: 1.8, maxWidth: '620px' }}>
            We are actively working toward recycled performance fabrics and carbon-neutral shipping by 2027. This page will be updated as those milestones are reached — not before.
          </p>
        </div>

      </div>
    </PageLayout>
  )
}
