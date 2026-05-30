import { useEffect, useRef, useState } from 'react'

/* Arc: center (836,780) radius 650 in 1672×941 image space
   Exits bottom at x≈206 and x≈1466 */
const ARC_PATH = 'M 206 941 A 650 650 0 1 1 1466 941'

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pathRef    = useRef<SVGPathElement>(null)
  const [triggered, setTriggered] = useState(false)
  const [arcHovered, setArcHovered] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTriggered(true) },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!triggered || !pathRef.current) return
    const len = pathRef.current.getTotalLength()
    const p = pathRef.current
    p.style.strokeDasharray  = `${len}`
    p.style.strokeDashoffset = `${len}`
    p.getBoundingClientRect()
    p.style.transition       = 'stroke-dashoffset 2.8s cubic-bezier(0.4, 0, 0.2, 1)'
    p.style.strokeDashoffset = '0'
  }, [triggered])

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ position: 'relative', background: '#000', borderTop: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}
    >
      {/* Background — clean image without text */}
      <img
        src="/ARC.%20MAIN.png"
        alt=""
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />

      {/* ── SVG — arc animation + dot ── */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'hidden' }}
        viewBox="0 0 1672 941"
        preserveAspectRatio="none"
      >
        {/* Glow base */}
        <path d={ARC_PATH} stroke="rgba(255,255,255,0.05)" strokeWidth="10" fill="none" strokeLinecap="round" style={{ pointerEvents: 'none' }} />

        {/* Animated arc */}
        <path
          ref={pathRef}
          id="arc-main"
          d={ARC_PATH}
          stroke={arcHovered ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.85)'}
          strokeWidth={arcHovered ? '3' : '1.6'}
          fill="none"
          strokeLinecap="round"
          style={{
            filter: arcHovered ? 'drop-shadow(0 0 14px rgba(255,255,255,1))' : 'drop-shadow(0 0 4px rgba(255,255,255,0.5))',
            transition: 'stroke-width 0.3s, filter 0.3s',
            pointerEvents: 'none',
          }}
        />

        {/* Hover target */}
        <path d={ARC_PATH} stroke="transparent" strokeWidth="28" fill="none"
          style={{ cursor: 'crosshair', pointerEvents: 'stroke' }}
          onMouseEnter={() => setArcHovered(true)}
          onMouseLeave={() => setArcHovered(false)}
        />

        {/* Dot — animates along arc then pulses */}
        {triggered && (
          <g>
            <animateMotion dur="1.8s" fill="freeze" calcMode="spline" keyPoints="0;0.11" keyTimes="0;1" keySplines="0.4 0 0.2 1">
              <mpath href="#arc-main" />
            </animateMotion>
            <circle r="18" fill="none" stroke="rgba(232,90,48,0.4)" strokeWidth="1">
              <animate attributeName="r"       values="10;30" dur="1.6s" begin="1.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0"  dur="1.6s" begin="1.8s" repeatCount="indefinite" />
            </circle>
            <circle r="6" fill="#E85A30" style={{ filter: 'drop-shadow(0 0 8px rgba(232,90,48,0.9))' }} />
          </g>
        )}
      </svg>

      {/* ── TEXT OVERLAYS — replicate ABOUT image exactly ── */}

      {/* "ABOUT ARC" eyebrow — centered, ~43% from top */}
      <div style={{
        position: 'absolute', top: '43%', left: '50%', transform: 'translateX(-50%)',
        textAlign: 'center', pointerEvents: 'none', whiteSpace: 'nowrap',
      }}>
        <p style={{
          fontFamily: 'Barlow, sans-serif', fontWeight: 400,
          fontSize: 'clamp(8px, 0.7vw, 11px)',
          color: 'rgba(255,255,255,0.55)', letterSpacing: '6px', textTransform: 'uppercase',
        }}>
          ABOUT ARC
        </p>
      </div>

      {/* "PERFORMANCE IS AN ARC." — large heading, centered, ~49% from top */}
      <div style={{
        position: 'absolute', top: '47%', left: '8%', right: '8%',
        textAlign: 'center', pointerEvents: 'none',
      }}>
        <h2 style={{
          fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontStyle: 'italic',
          fontSize: 'clamp(28px, 6.5vw, 108px)',
          color: '#fff', lineHeight: 0.92, letterSpacing: '-1px',
          textTransform: 'uppercase',
        }}>
          PERFORMANCE IS AN ARC.
        </h2>
      </div>

      {/* Thin horizontal divider under heading */}
      <div style={{
        position: 'absolute', top: '63.5%', left: '13%', right: '13%',
        height: '1px', background: 'rgba(255,255,255,0.18)', pointerEvents: 'none',
      }} />

      {/* Three text columns — 67% from top */}
      <div style={{
        position: 'absolute', top: '67%', left: '10%', right: '10%',
        display: 'grid', gridTemplateColumns: '1fr 1px 1fr 1px 1fr',
        gap: '0', pointerEvents: 'none',
      }}>
        {/* Col 1 */}
        <div style={{ paddingRight: '6%' }}>
          <p style={{
            fontFamily: 'Barlow, sans-serif', fontWeight: 300,
            fontSize: 'clamp(10px, 1vw, 15px)',
            color: 'rgba(255,255,255,0.72)', lineHeight: 1.85,
            letterSpacing: '0.2px',
          }}>
            ARC comes from Arc of Life — the path between effort and evolution.
          </p>
        </div>

        {/* Divider 1 */}
        <div style={{ background: 'rgba(255,255,255,0.15)', margin: '0 0' }} />

        {/* Col 2 */}
        <div style={{ padding: '0 6%' }}>
          <p style={{
            fontFamily: 'Barlow, sans-serif', fontWeight: 300,
            fontSize: 'clamp(10px, 1vw, 15px)',
            color: 'rgba(255,255,255,0.72)', lineHeight: 1.85,
            letterSpacing: '0.2px',
          }}>
            Endurance is not linear. It is shaped by discipline, setbacks, repetition and progress.
          </p>
        </div>

        {/* Divider 2 */}
        <div style={{ background: 'rgba(255,255,255,0.15)' }} />

        {/* Col 3 */}
        <div style={{ paddingLeft: '6%' }}>
          <p style={{
            fontFamily: 'Barlow, sans-serif', fontWeight: 300,
            fontSize: 'clamp(10px, 1vw, 15px)',
            color: 'rgba(255,255,255,0.72)', lineHeight: 1.85,
            letterSpacing: '0.2px',
          }}>
            Our apparel is engineered to support that journey with precision, speed and purpose.
          </p>
        </div>
      </div>

      {/* "ARC OF LIFE" — vertical text, far left */}
      <div style={{
        position: 'absolute', top: '62%', left: '2.2%',
        writingMode: 'vertical-rl', transform: 'rotate(180deg)',
        pointerEvents: 'none',
      }}>
        <p style={{
          fontFamily: 'Barlow, sans-serif', fontWeight: 300,
          fontSize: 'clamp(7px, 0.65vw, 10px)',
          color: 'rgba(255,255,255,0.3)', letterSpacing: '4px', textTransform: 'uppercase',
        }}>
          ARC OF LIFE
        </p>
      </div>

      {/* Small vertical line above "ARC OF LIFE" */}
      <div style={{
        position: 'absolute', top: '55%', left: '2.7%',
        width: '1px', height: '6%',
        background: 'rgba(255,255,255,0.2)', pointerEvents: 'none',
      }} />

      {/* "DESIGNED TO PERFORM. BUILT TO WIN." — bottom centered */}
      <div style={{
        position: 'absolute', bottom: '4.8%', left: '50%',
        transform: 'translateX(-50%)', whiteSpace: 'nowrap', pointerEvents: 'none',
      }}>
        <p style={{
          fontFamily: 'Barlow, sans-serif', fontWeight: 500,
          fontSize: 'clamp(7px, 0.75vw, 12px)',
          color: '#fff', letterSpacing: '4px', textTransform: 'uppercase',
          textShadow: '0 0 14px rgba(255,255,255,0.5)',
        }}>
          DESIGNED TO PERFORM. BUILT TO WIN.
        </p>
      </div>
    </section>
  )
}
