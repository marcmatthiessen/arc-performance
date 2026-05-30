import { useState } from 'react'
import PageLayout from '../components/PageLayout'

const SUBJECTS = ['Pedido', 'Dúvida sobre produto', 'Troca e devolução', 'Imprensa', 'Outro']

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  return (
    <PageLayout>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 48px 120px' }}>

        {/* Header */}
        <div style={{ marginBottom: '64px' }}>
          <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '10px', color: 'var(--orange)', letterSpacing: '5px', textTransform: 'uppercase', marginBottom: '16px' }}>
            FALE COM A GENTE
          </p>
          <h1 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontStyle: 'italic', fontSize: 'clamp(48px, 7vw, 88px)', color: 'var(--text)', lineHeight: 0.9, letterSpacing: '-1px', marginBottom: '16px' }}>
            ENTRE EM<br />CONTATO
          </h1>
          <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: '14px', color: 'var(--muted)', letterSpacing: '0.5px' }}>
            Resposta em até 24h nos dias úteis.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '80px', alignItems: 'start' }}>

          {/* Form */}
          {sent ? (
            <div style={{ padding: '48px', background: 'var(--surface)', border: '1px solid var(--stroke)', textAlign: 'center' }}>
              <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontStyle: 'italic', fontSize: '32px', color: 'var(--text)', marginBottom: '12px' }}>
                MENSAGEM ENVIADA ✓
              </p>
              <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '14px', color: 'var(--muted)' }}>
                Retornaremos em até 24h.
              </p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true) }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { key: 'name',  label: 'NOME',  type: 'text',  placeholder: 'Seu nome completo' },
                { key: 'email', label: 'EMAIL', type: 'email', placeholder: 'seu@email.com' },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ display: 'block', fontFamily: 'Barlow, sans-serif', fontSize: '9px', color: 'var(--muted)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px' }}>
                    {f.label}
                  </label>
                  <input
                    type={f.type} required placeholder={f.placeholder}
                    value={form[f.key as keyof typeof form]}
                    onChange={e => set(f.key, e.target.value)}
                    style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--stroke)', color: 'var(--text)', fontFamily: 'Barlow, sans-serif', fontSize: '14px', padding: '14px 16px', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'var(--stroke)')}
                  />
                </div>
              ))}

              <div>
                <label style={{ display: 'block', fontFamily: 'Barlow, sans-serif', fontSize: '9px', color: 'var(--muted)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px' }}>
                  ASSUNTO
                </label>
                <select
                  required value={form.subject} onChange={e => set('subject', e.target.value)}
                  style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--stroke)', color: form.subject ? 'var(--text)' : 'var(--muted)', fontFamily: 'Barlow, sans-serif', fontSize: '14px', padding: '14px 16px', outline: 'none', boxSizing: 'border-box', cursor: 'pointer' }}
                >
                  <option value="" disabled>Selecione um assunto</option>
                  {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'Barlow, sans-serif', fontSize: '9px', color: 'var(--muted)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px' }}>
                  MENSAGEM
                </label>
                <textarea
                  required rows={6} placeholder="Como podemos ajudar?"
                  value={form.message} onChange={e => set('message', e.target.value)}
                  style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--stroke)', color: 'var(--text)', fontFamily: 'Barlow, sans-serif', fontSize: '14px', padding: '14px 16px', outline: 'none', boxSizing: 'border-box', resize: 'vertical', transition: 'border-color 0.2s' }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'var(--stroke)')}
                />
              </div>

              <button
                type="submit"
                style={{ background: 'var(--orange)', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Barlow, sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', padding: '16px 32px', alignSelf: 'flex-start', transition: 'opacity 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                ENVIAR MENSAGEM
              </button>
            </form>
          )}

          {/* Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
            {[
              { label: 'EMAIL', value: 'contato@arcperformance.com.br', sub: 'Para dúvidas e suporte' },
              { label: 'INSTAGRAM', value: '@arcperformance', sub: 'DMs abertas' },
              { label: 'TEMPO DE RESPOSTA', value: 'Até 24h', sub: 'Segunda a sexta, 9h–18h' },
              { label: 'ATENDIMENTO', value: 'Seg–Sex', sub: '09:00 – 18:00 (BRT)' },
            ].map(item => (
              <div key={item.label} style={{ borderLeft: '2px solid var(--orange)', paddingLeft: '20px' }}>
                <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '9px', color: 'var(--muted)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>
                  {item.label}
                </p>
                <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600, fontStyle: 'italic', fontSize: '18px', color: 'var(--text)', textTransform: 'uppercase', marginBottom: '4px' }}>
                  {item.value}
                </p>
                <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '12px', color: 'var(--muted)' }}>
                  {item.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
