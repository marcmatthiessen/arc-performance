import PageLayout from '../components/PageLayout'

const SECTIONS = [
  {
    title: 'Uso do Site',
    body: `O site arcperformance.com.br é operado pela ARC Performance. Ao acessar e utilizar este site, você concorda com os presentes Termos e Condições. O conteúdo é disponibilizado apenas para fins informativos e comerciais legítimos. É vedado o uso do site para fins ilícitos, a reprodução de conteúdo sem autorização expressa ou o uso de mecanismos automatizados de acesso (scrapers, bots).`,
  },
  {
    title: 'Cadastro e Conta',
    body: `Para realizar compras, você poderá criar uma conta fornecendo informações verdadeiras, completas e atualizadas. Você é responsável por manter a confidencialidade de suas credenciais de acesso e por todas as atividades realizadas em sua conta. A ARC Performance reserva-se o direito de suspender contas com informações falsas ou utilizadas de forma abusiva.`,
  },
  {
    title: 'Condições de Compra',
    body: `Todos os preços estão expressos em Reais (BRL) e incluem impostos aplicáveis, salvo indicação em contrário. A ARC Performance reserva-se o direito de alterar preços a qualquer momento. O contrato de compra e venda é firmado no momento da confirmação do pedido por email. Em caso de indisponibilidade de estoque após a confirmação, o cliente será notificado e reembolsado integralmente em até 5 dias úteis.`,
  },
  {
    title: 'Pagamento',
    body: `Aceitamos cartão de crédito (até 6 parcelas sem juros), PIX (5% de desconto) e boleto bancário. As transações são processadas por parceiros certificados PCI-DSS. A ARC Performance não armazena dados de cartão de crédito em seus servidores. Em caso de pagamento não confirmado, o pedido será automaticamente cancelado após 3 dias úteis.`,
  },
  {
    title: 'Entrega',
    body: `Os prazos de entrega são estimados e podem variar em função da região, período de alta demanda e situações de força maior. A ARC Performance não se responsabiliza por atrasos causados pelos Correios ou transportadoras. O risco de perda ou dano passa ao comprador no momento da entrega. Em caso de extravio confirmado, a ARC Performance providenciará reenvio ou reembolso.`,
  },
  {
    title: 'Propriedade Intelectual',
    body: `Todos os textos, imagens, logotipos, design e demais elementos do site são de propriedade exclusiva da ARC Performance e protegidos pela legislação de propriedade intelectual brasileira. É proibida qualquer reprodução, modificação, distribuição ou uso comercial sem autorização prévia e por escrito.`,
  },
  {
    title: 'Limitação de Responsabilidade',
    body: `A ARC Performance não se responsabiliza por danos indiretos, incidentais ou consequentes decorrentes do uso ou incapacidade de uso do site ou dos produtos. Nossa responsabilidade total perante o cliente em qualquer circunstância é limitada ao valor total pago pelo produto em questão.`,
  },
  {
    title: 'Foro',
    body: `Estes Termos são regidos pelas leis brasileiras. Para dirimir quaisquer controvérsias oriundas deste instrumento, as partes elegem o foro da Comarca de São Paulo, Estado de São Paulo, com renúncia expressa a qualquer outro, por mais privilegiado que seja.`,
  },
]

export default function TermsPage() {
  return (
    <PageLayout>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 48px 120px' }}>
        <div style={{ marginBottom: '64px' }}>
          <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '10px', color: 'var(--orange)', letterSpacing: '5px', textTransform: 'uppercase', marginBottom: '16px' }}>LEGAL</p>
          <h1 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontStyle: 'italic', fontSize: 'clamp(48px, 7vw, 88px)', color: 'var(--text)', lineHeight: 0.9, letterSpacing: '-1px', marginBottom: '20px' }}>
            TERMOS &<br />CONDIÇÕES
          </h1>
          <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '13px', color: 'var(--muted)' }}>
            Última atualização: janeiro de 2025
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
