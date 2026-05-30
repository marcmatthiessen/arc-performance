import PageLayout from '../components/PageLayout'

const TYPES = [
  {
    type: 'Cookies Essenciais',
    desc: 'Necessários para o funcionamento básico do site. Permitem que você navegue e use recursos fundamentais como carrinho de compras e acesso à conta. Sem estes cookies, o site não funciona corretamente.',
    examples: 'Sessão de login, carrinho de compras, preferências de idioma.',
    required: true,
  },
  {
    type: 'Cookies de Analytics',
    desc: 'Nos ajudam a entender como os visitantes interagem com o site, coletando informações de forma anônima. Utilizamos Google Analytics com IP anonimizado para análise de tráfego e comportamento de navegação.',
    examples: 'Google Analytics (_ga, _gid), hotjar.',
    required: false,
  },
  {
    type: 'Cookies de Marketing',
    desc: 'Utilizados para exibir anúncios relevantes com base em seus interesses e comportamento de navegação. Permitem medir a eficácia de nossas campanhas publicitárias.',
    examples: 'Meta Pixel (Facebook), Google Ads, TikTok Pixel.',
    required: false,
  },
]

export default function CookiesPage() {
  return (
    <PageLayout>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 48px 120px' }}>
        <div style={{ marginBottom: '64px' }}>
          <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '10px', color: 'var(--orange)', letterSpacing: '5px', textTransform: 'uppercase', marginBottom: '16px' }}>LEGAL</p>
          <h1 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontStyle: 'italic', fontSize: 'clamp(48px, 7vw, 88px)', color: 'var(--text)', lineHeight: 0.9, letterSpacing: '-1px', marginBottom: '20px' }}>
            POLÍTICA DE<br />COOKIES
          </h1>
          <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '14px', color: 'var(--muted)', lineHeight: 1.8, maxWidth: '680px' }}>
            Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você visita um site. Utilizamos cookies para melhorar sua experiência, analisar o tráfego e personalizar conteúdo.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '64px' }}>
          {TYPES.map(t => (
            <div key={t.type} style={{ background: 'var(--surface)', border: '1px solid var(--stroke)', padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600, fontSize: '20px', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {t.type}
                </h2>
                <span style={{
                  fontFamily: 'Barlow, sans-serif', fontSize: '9px', fontWeight: 600,
                  letterSpacing: '2px', textTransform: 'uppercase', padding: '5px 12px',
                  background: t.required ? 'rgba(232,100,42,0.15)' : 'rgba(255,255,255,0.05)',
                  color: t.required ? 'var(--orange)' : 'var(--muted)',
                  border: `1px solid ${t.required ? 'var(--orange)' : 'var(--stroke)'}`,
                  flexShrink: 0,
                }}>
                  {t.required ? 'Obrigatório' : 'Opcional'}
                </span>
              </div>
              <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '14px', color: 'var(--muted)', lineHeight: 1.8, marginBottom: '12px' }}>
                {t.desc}
              </p>
              <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.3px' }}>
                <strong style={{ color: 'rgba(255,255,255,0.45)' }}>Exemplos:</strong> {t.examples}
              </p>
            </div>
          ))}
        </div>

        <div style={{ borderLeft: '2px solid var(--orange)', paddingLeft: '28px' }}>
          <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600, fontSize: '20px', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px' }}>
            Como Gerenciar Cookies
          </h2>
          <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '14px', color: 'var(--muted)', lineHeight: 1.9 }}>
            Você pode controlar e/ou excluir cookies como desejar através das configurações do seu navegador (Chrome, Firefox, Safari, Edge). Ao desativar cookies não essenciais, algumas funcionalidades do site podem ser afetadas. Para excluir cookies já armazenados e limpar o seu consentimento, você pode usar a opção "Limpar dados de navegação" no seu navegador. Para dúvidas sobre nossa política de cookies, entre em contato: privacidade@arcperformance.com.br
          </p>
        </div>
      </div>
    </PageLayout>
  )
}
