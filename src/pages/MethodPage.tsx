import PageLayout from '../components/PageLayout'

const STEPS = [
  {
    number: '01',
    title: 'Research in the field',
    description: 'Every ARC product begins with athletes, not a mood board. We embed with triathletes, cyclists and runners during real training blocks to identify exactly where standard gear fails — chafing, overheating, structural collapse at hour four. The problems are specific. The solutions have to match.',
  },
  {
    number: '02',
    title: 'Engineering-led design',
    description: 'We do not design aesthetics and then find a fabric. We reverse it. Material properties — stretch modulus, compression gradient, breathability under load — are defined first. The visual language follows the function. Every panel seam is placed to eliminate friction, not to look technical.',
  },
  {
    number: '03',
    title: 'Athlete prototype cycles',
    description: 'Prototypes go directly to training athletes within days of pattern completion. No internal focus groups, no agency feedback sessions. The feedback loop is athlete to pattern cutter, directly. We run a minimum of three full prototype cycles before locking any design for production.',
  },
  {
    number: '04',
    title: 'Production without compromise',
    description: 'ARC operates a restricted supplier list. Every manufacturer is audited for precision, consistency and ethics before a single unit is cut. We accept higher unit costs in exchange for zero tolerance on quality deviation. The ARC athlete should not be able to tell whether they received piece one or piece one thousand.',
  },
]

export default function MethodPage() {
  return (
    <PageLayout>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px 120px' }}>

        <div style={{ marginBottom: '96px' }}>
          <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '10px', color: '#C8FF00', letterSpacing: '5px', textTransform: 'uppercase', marginBottom: '16px' }}>
            How we build
          </p>
          <h1 style={{
            fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900,
            fontSize: 'clamp(56px, 9vw, 120px)', color: 'var(--text)',
            lineHeight: 0.88, letterSpacing: '-2px', textTransform: 'uppercase',
            marginBottom: '24px',
          }}>
            OUR METHOD
          </h1>
          <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '16px', color: 'var(--muted)', maxWidth: '580px', lineHeight: 1.7 }}>
            Premium performance gear is not made by accident. Every ARC piece follows a four-stage process that starts with real-world problems and ends with zero-compromise production.
          </p>
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute', left: '39px', top: 0, bottom: 0,
            width: '1px', background: 'rgba(255,255,255,0.07)',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {STEPS.map((step, i) => (
              <div
                key={step.number}
                style={{
                  display: 'grid', gridTemplateColumns: '80px 1fr',
                  gap: '48px', alignItems: 'start',
                  paddingBottom: i < STEPS.length - 1 ? '72px' : '0',
                  position: 'relative',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '4px' }}>
                  <div style={{
                    width: '40px', height: '40px',
                    background: '#C8FF00',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, zIndex: 1, position: 'relative',
                  }}>
                    <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: '13px', color: '#000', letterSpacing: '1px' }}>
                      {step.number}
                    </span>
                  </div>
                </div>
                <div style={{ paddingTop: '8px' }}>
                  <h2 style={{
                    fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700,
                    fontSize: 'clamp(24px, 3vw, 38px)', color: 'var(--text)',
                    textTransform: 'uppercase', letterSpacing: '0.5px',
                    marginBottom: '20px',
                  }}>
                    {step.title}
                  </h2>
                  <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '15px', color: 'var(--muted)', lineHeight: 1.85, maxWidth: '680px' }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          marginTop: '96px',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          paddingTop: '64px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2px',
        }}>
          {[
            { value: '3+', label: 'Prototype cycles per product' },
            { value: '100%', label: 'Athlete-tested before launch' },
            { value: '0', label: 'Compromises on quality' },
          ].map(stat => (
            <div key={stat.label} style={{ padding: '40px 32px', background: 'rgba(255,255,255,0.02)' }}>
              <p style={{
                fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900,
                fontSize: '56px', color: '#C8FF00', lineHeight: 1,
                letterSpacing: '-1px', marginBottom: '12px',
              }}>
                {stat.value}
              </p>
              <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '13px', color: 'var(--muted)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </PageLayout>
  )
}
