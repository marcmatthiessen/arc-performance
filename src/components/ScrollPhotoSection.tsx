import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PHASES = [
  {
    img: '/ironman%20start.jpeg',
    phase: '01 · Natação',
    title: ['CORTE', 'A ÁGUA', 'SEM FREIO'],
    body: 'Tecido hidrodinâmico com compressão graduada. Menos arrasto, mais propulsão no open water.',
    align: 'left',
  },
  {
    img: '/cycle.jpeg',
    phase: '02 · Ciclismo',
    title: ['AERO', 'EM CADA', 'PEDALADA'],
    body: 'Painéis de silicone antiderrapante, costuras planas e corte anatômico TT para potência máxima.',
    align: 'right',
  },
  {
    img: '/pumar-1.jpeg',
    phase: '03 · Corrida',
    title: ['CHEGUE', 'MAIS', 'FORTE'],
    body: 'Compressão graduada que mantém o fluxo sanguíneo ativo. Menos fadiga, melhor transição.',
    align: 'left',
  },
]

export default function ScrollPhotoSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const framesRef = useRef<(HTMLDivElement | null)[]>([])
  const contentsRef = useRef<(HTMLDivElement | null)[]>([])
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.width = `${self.progress * 100}%`
            }
          },
        },
      })

      PHASES.forEach((_, i) => {
        const frame = framesRef.current[i]
        const content = contentsRef.current[i]
        if (!frame || !content) return

        if (i === 0) {
          // First frame: starts visible, zooms slightly
          gsap.set(frame, { opacity: 1, scale: 1 })
          gsap.set(content, { opacity: 1, y: 0 })
          // Fade out at 33%
          tl.to(frame, { opacity: 0, scale: 1.06, duration: 1 }, 1)
          tl.to(content, { opacity: 0, y: -20, duration: 0.5 }, 1)
        } else if (i === 1) {
          // Second frame: fades in at 33%
          gsap.set(frame, { opacity: 0, scale: 1.04 })
          gsap.set(content, { opacity: 0, y: 24 })
          tl.to(frame, { opacity: 1, scale: 1, duration: 1 }, 1)
          tl.to(content, { opacity: 1, y: 0, duration: 0.8 }, 1.2)
          tl.to(frame, { opacity: 0, scale: 1.06, duration: 1 }, 2)
          tl.to(content, { opacity: 0, y: -20, duration: 0.5 }, 2)
        } else {
          // Third frame: fades in at 66%
          gsap.set(frame, { opacity: 0, scale: 1.04 })
          gsap.set(content, { opacity: 0, y: 24 })
          tl.to(frame, { opacity: 1, scale: 1, duration: 1 }, 2)
          tl.to(content, { opacity: 1, y: 0, duration: 0.8 }, 2.2)
        }
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} id="collection" style={{ height: '300vh', position: 'relative', background: 'var(--bg)' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        {/* Frames */}
        {PHASES.map((phase, i) => (
          <div
            key={i}
            ref={el => { framesRef.current[i] = el }}
            className="absolute inset-0"
            style={{ willChange: 'transform, opacity' }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${phase.img})`, filter: 'brightness(0.42) saturate(0.7)' }}
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(180deg, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0.5) 100%)' }}
            />
          </div>
        ))}

        {/* Contents */}
        {PHASES.map((phase, i) => (
          <div
            key={i}
            ref={el => { contentsRef.current[i] = el }}
            className="absolute inset-0 flex flex-col justify-center z-10 px-[8%]"
            style={{
              alignItems: phase.align === 'right' ? 'flex-end' : 'flex-start',
              textAlign: phase.align === 'right' ? 'right' : 'left',
            }}
          >
            <p
              className="text-[10px] uppercase font-semibold mb-5"
              style={{ color: 'var(--orange)', letterSpacing: '5px' }}
            >
              {phase.phase}
            </p>
            <h2
              className="font-condensed italic font-bold uppercase leading-none"
              style={{ fontSize: 'clamp(56px, 9vw, 130px)', letterSpacing: '2px', color: 'var(--text)' }}
            >
              {phase.title.map((line, j) => (
                <span key={j} style={{ display: 'block' }}>{line}</span>
              ))}
            </h2>
            <p
              className="mt-6 font-light leading-relaxed max-w-md"
              style={{ fontSize: '14px', color: 'var(--muted)', letterSpacing: '0.5px' }}
            >
              {phase.body}
            </p>
          </div>
        ))}

        {/* Progress bar */}
        <div
          className="absolute bottom-0 left-0 right-0 z-20"
          style={{ height: '2px', background: 'rgba(255,255,255,0.08)' }}
        >
          <div
            ref={progressRef}
            className="h-full"
            style={{
              background: 'linear-gradient(90deg, #E8642A, #FF9A5C)',
              boxShadow: '0 0 8px rgba(232,100,42,0.5)',
              width: '0%',
            }}
          />
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-8 right-8 z-20 text-[10px] uppercase"
          style={{ color: 'var(--muted)', letterSpacing: '3px', writingMode: 'vertical-rl' }}
        >
          Continue scrolling
        </div>
      </div>
    </section>
  )
}
