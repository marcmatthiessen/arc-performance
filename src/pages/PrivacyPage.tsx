import PageLayout from '../components/PageLayout'

const SECTIONS = [
  {
    title: 'Dados que Coletamos',
    body: `Coletamos as seguintes categorias de dados pessoais: informações de identificação (nome completo, CPF), dados de contato (email, telefone, endereço de entrega), dados de pagamento (processados de forma segura por parceiros certificados PCI-DSS), e dados de navegação (cookies, endereço IP, páginas visitadas).`,
  },
  {
    title: 'Finalidade e Base Legal',
    body: `Utilizamos seus dados para: processamento e entrega de pedidos (base legal: execução de contrato — Art. 7º, V da LGPD); comunicações sobre seu pedido (base legal: execução de contrato); envio de newsletter e ofertas, quando consentido (base legal: consentimento — Art. 7º, I da LGPD); melhoria dos serviços e análise de navegação (base legal: interesse legítimo — Art. 7º, IX da LGPD).`,
  },
  {
    title: 'Compartilhamento de Dados',
    body: `Compartilhamos seus dados somente com: (i) transportadoras e operadores logísticos para entrega do produto; (ii) processadores de pagamento (ex: Stripe, PagSeguro) para cobrança; (iii) prestadores de serviço de TI que atuam em nosso nome sob contrato de confidencialidade. Não vendemos, alugamos ou comercializamos seus dados pessoais com terceiros para fins comerciais próprios.`,
  },
  {
    title: 'Retenção dos Dados',
    body: `Dados fiscais e de transação são retidos por 5 anos conforme legislação tributária brasileira. Dados de conta e histórico de compras são mantidos enquanto a relação comercial estiver ativa ou pelo prazo de 2 anos após o último pedido. Dados de marketing são excluídos mediante solicitação ou após 2 anos de inatividade.`,
  },
  {
    title: 'Seus Direitos (LGPD — Lei 13.709/2018)',
    body: `Nos termos da Lei Geral de Proteção de Dados, você tem direito a: confirmação da existência de tratamento; acesso aos seus dados; correção de dados incompletos ou desatualizados; anonimização, bloqueio ou eliminação de dados desnecessários; portabilidade dos dados; revogação do consentimento a qualquer momento; revisão de decisões automatizadas. Para exercer qualquer um desses direitos, entre em contato pelo email abaixo.`,
  },
  {
    title: 'Segurança',
    body: `Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados contra acesso não autorizado, perda, destruição ou divulgação indevida, incluindo criptografia TLS em todas as comunicações, controle de acesso baseado em funções e monitoramento contínuo de incidentes.`,
  },
  {
    title: 'Contato com o DPO',
    body: `Para dúvidas, solicitações ou reclamações relacionadas ao tratamento de dados pessoais, entre em contato com nosso Encarregado de Proteção de Dados (DPO): privacidade@arcperformance.com.br. Prazo de resposta: até 15 dias úteis.`,
  },
]

export default function PrivacyPage() {
  return (
    <PageLayout>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 48px 120px' }}>
        <div style={{ marginBottom: '64px' }}>
          <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '10px', color: 'var(--orange)', letterSpacing: '5px', textTransform: 'uppercase', marginBottom: '16px' }}>LEGAL</p>
          <h1 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontStyle: 'italic', fontSize: 'clamp(48px, 7vw, 88px)', color: 'var(--text)', lineHeight: 0.9, letterSpacing: '-1px', marginBottom: '20px' }}>
            POLÍTICA DE<br />PRIVACIDADE
          </h1>
          <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '13px', color: 'var(--muted)' }}>
            Última atualização: janeiro de 2025 · Em conformidade com a LGPD (Lei 13.709/2018)
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {SECTIONS.map(s => (
            <div key={s.title} style={{ borderLeft: '2px solid var(--orange)', paddingLeft: '28px' }}>
              <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600, fontSize: '20px', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px' }}>
                {s.title}
              </h2>
              <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '14px', color: 'var(--muted)', lineHeight: 1.9 }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
