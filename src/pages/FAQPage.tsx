import { useState } from 'react'
import PageLayout from '../components/PageLayout'

const FAQS = [
  {
    category: 'PEDIDOS & ENVIO',
    items: [
      { q: 'Qual o prazo de entrega?', a: '3 a 7 dias úteis para capitais, 5 a 12 dias úteis para demais regiões.' },
      { q: 'Vocês enviam para todo o Brasil?', a: 'Sim, entregamos para todo o território nacional via Correios e transportadoras parceiras.' },
      { q: 'Como rastrear meu pedido?', a: 'Após confirmação do pagamento, você receberá um email com o código de rastreamento em até 2 dias úteis.' },
      { q: 'Frete grátis a partir de quanto?', a: 'Frete grátis para pedidos acima de R$ 350.' },
    ],
  },
  {
    category: 'PRODUTOS & TAMANHOS',
    items: [
      { q: 'Como escolho o tamanho certo?', a: 'Consulte nossa tabela de medidas na página Size Chart. Em caso de dúvida entre dois tamanhos, recomendamos o maior para maior conforto.' },
      { q: 'Os racesuits têm forro (chamois)?', a: 'Nossos trisuits possuem pad de triathlon de 6mm, otimizado para as três modalidades.' },
      { q: 'Qual o cuidado na lavagem?', a: 'Lavar à mão ou na máquina em ciclo delicado, água fria, sem amaciante. Não usar secadora.' },
      { q: 'Os tecidos são brasileiros?', a: 'Utilizamos tecidos nacionais de alta performance certificados Oeko-Tex.' },
    ],
  },
  {
    category: 'TROCAS & DEVOLUÇÕES',
    items: [
      { q: 'Qual o prazo para troca ou devolução?', a: '30 dias a partir do recebimento do produto.' },
      { q: 'Como iniciar uma devolução?', a: 'Entre em contato via contato@arcperformance.com.br com seu número de pedido e o motivo da devolução.' },
      { q: 'O produto com defeito tem cobertura?', a: 'Sim, cobrimos defeitos de fabricação por 90 dias a partir da data de compra.' },
    ],
  },
  {
    category: 'PAGAMENTO',
    items: [
      { q: 'Quais formas de pagamento?', a: 'Cartão de crédito (até 6x sem juros), PIX (5% de desconto) e boleto bancário.' },
      { q: 'PIX tem desconto?', a: 'Sim, 5% de desconto para pagamentos via PIX. O desconto é aplicado automaticamente no checkout.' },
    ],
  },
]

function Accordion({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid var(--stroke)' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: 'none', border: 'none', cursor: 'pointer', padding: '20px 0', textAlign: 'left',
        }}
      >
        <span style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 400, fontSize: '15px', color: open ? 'var(--text)' : 'rgba(255,255,255,0.75)', transition: 'color 0.2s' }}>
          {q}
        </span>
        <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '20px', color: 'var(--orange)', marginLeft: '24px', transform: open ? 'rotate(45deg)' : 'none', transition: 'transform 0.25s', flexShrink: 0 }}>
          +
        </span>
      </button>
      {open && (
        <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '14px', color: 'var(--muted)', lineHeight: 1.8, paddingBottom: '20px', maxWidth: '680px' }}>
          {a}
        </p>
      )}
    </div>
  )
}

export default function FAQPage() {
  return (
    <PageLayout>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 48px 120px' }}>

        <div style={{ marginBottom: '64px' }}>
          <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '10px', color: 'var(--orange)', letterSpacing: '5px', textTransform: 'uppercase', marginBottom: '16px' }}>
            CENTRAL DE AJUDA
          </p>
          <h1 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontStyle: 'italic', fontSize: 'clamp(48px, 7vw, 88px)', color: 'var(--text)', lineHeight: 0.9, letterSpacing: '-1px' }}>
            PERGUNTAS<br />FREQUENTES
          </h1>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>
          {FAQS.map(cat => (
            <div key={cat.category}>
              <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '9px', fontWeight: 600, color: 'var(--orange)', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '8px' }}>
                {cat.category}
              </p>
              <div style={{ borderTop: '1px solid var(--stroke)' }}>
                {cat.items.map(item => <Accordion key={item.q} q={item.q} a={item.a} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
