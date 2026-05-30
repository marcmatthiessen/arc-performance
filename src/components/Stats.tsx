import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { num: '12K+', label: 'Atletas Ativos', desc: 'em toda a América Latina' },
  { num: '97%', label: 'Melhoram PR', desc: 'na primeira temporada' },
  { num: '340+', label: 'Provas Completadas', desc: 'Ironman, 70.3 e Marathons' },
  { num: '8×', label: 'Retorno', desc: 'vs custo de equipamento genérico' },
]

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="method"
      ref={ref}
      style={{ background: 'var(--surface)', borderTop: '1px solid rgba(232,100,42,0.15)' }}
    >
      <div
        className="grid"
        style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'var(--stroke)' }}
      >
        {STATS.map((s, i) => (
          <motion.div
            key={i}
            className="flex flex-col p-12"
            style={{ background: 'var(--bg)', borderTop: '3px solid transparent', transition: 'border-color 0.5s' }}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={{ borderTopColor: 'var(--orange)' } as any}
          >
            <div
              className="font-condensed italic font-bold leading-none"
              style={{ fontSize: 'clamp(56px, 6vw, 80px)', color: 'var(--orange)', letterSpacing: '2px' }}
            >
              {s.num}
            </div>
            <div
              className="mt-3 text-xs font-semibold uppercase"
              style={{ color: 'var(--text)', letterSpacing: '3px' }}
            >
              {s.label}
            </div>
            <div
              className="mt-2 text-xs font-light"
              style={{ color: 'var(--muted)', letterSpacing: '0.5px' }}
            >
              {s.desc}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
