import PageLayout from '../components/PageLayout'

const STEPS = [
  { n: '01', title: 'Entre em contato', desc: 'Envie um email para contato@arcperformance.com.br com seu número de pedido e motivo.' },
  { n: '02', title: 'Aguarde aprovação', desc: 'Nossa equipe responde em até 48h com as instruções de envio.' },
  { n: '03', title: 'Envie o produto', desc: 'Embale o produto na embalagem original e envie para o endereço indicado.' },
  { n: '04', title: 'Reembolso', desc: 'Após recebermos e conferirmos o produto, o reembolso é processado em até 5 dias úteis.' },
]

export default function ReturnsPage() {
  return (
    <PageLayout>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 48px 120px' }}>

        {/* Header */}
        <div style={{ marginBottom: '64px' }}>
          <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '10px', color: 'var(--orange)', letterSpacing: '5px', textTransform: 'uppercase', marginBottom: '16px' }}>
            POLÍTICA
          </p>
          <h1 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontStyle: 'italic', fontSize: 'clamp(48px, 7vw, 88px)', color: 'var(--text)', lineHeight: 0.9, letterSpacing: '-1px' }}>
            TROCAS &<br />DEVOLUÇÕES
          </h1>
        </div>

        {/* 3 highlights */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', marginBottom: '80px' }}>
          {[
            { num: '30', label: 'Dias', desc: 'Prazo para solicitar troca ou devolução a partir do recebimento.' },
            { num: 'R$0', label: 'Custo', desc: 'Sem custo para devoluções por defeito de fabricação.' },
            { num: '5d', label: 'Reembolso', desc: 'Dias úteis para processar o reembolso após recebimento.' },
          ].map(h => (
            <div key={h.num} style={{ background: 'var(--surface)', padding: '36px 28px', border: '1px solid var(--stroke)' }}>
              <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontStyle: 'italic', fontSize: '52px', color: 'var(--orange)', lineHeight: 0.9, letterSpacing: '-1px', marginBottom: '4px' }}>
                {h.num}
              </p>
              <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600, fontSize: '16px', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>
                {h.label}
              </p>
              <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '13px', color: 'var(--muted)', lineHeight: 1.7 }}>
                {h.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Steps */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontStyle: 'italic', fontSize: '36px', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '-0.5px', marginBottom: '36px' }}>
            PASSO A PASSO
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {STEPS.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: '28px', padding: '28px 0', borderBottom: i < STEPS.length - 1 ? '1px solid var(--stroke)' : 'none' }}>
                <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontStyle: 'italic', fontSize: '28px', color: 'var(--orange)', flexShrink: 0, width: '40px' }}>
                  {s.n}
                </span>
                <div>
                  <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600, fontSize: '18px', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
                    {s.title}
                  </p>
                  <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7 }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conditions */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--stroke)', padding: '36px', marginBottom: '48px' }}>
          <h3 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600, fontSize: '18px', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>
            CONDIÇÕES
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              'Produto sem uso, com etiquetas originais',
              'Embalagem original preservada',
              'Solicitação dentro do prazo de 30 dias',
              'Nota fiscal ou comprovante de compra',
            ].map(c => (
              <li key={c} style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '14px', color: 'var(--muted)', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ color: 'var(--orange)', fontWeight: 600, flexShrink: 0 }}>—</span>
                {c}
              </li>
            ))}
          </ul>
        </div>

        <a
          href="mailto:contato@arcperformance.com.br?subject=Devolução"
          style={{ display: 'inline-block', background: 'var(--orange)', color: '#fff', fontFamily: 'Barlow, sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', padding: '16px 32px', textDecoration: 'none', transition: 'opacity 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          INICIAR DEVOLUÇÃO
        </a>
      </div>
    </PageLayout>
  )
}
