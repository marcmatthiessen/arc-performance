import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const WORDS = ['SPEED.', 'POWER.', 'PRECISION.', 'WIN.']

interface Props { onComplete: () => void }

export default function LoadingScreen({ onComplete }: Props) {
  const [count, setCount] = useState(0)
  const [wordIdx, setWordIdx] = useState(0)
  const startRef = useRef<number | null>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const duration = 2800
    const step = (ts: number) => {
      if (!startRef.current) startRef.current = ts
      const elapsed = ts - startRef.current
      const pct = Math.min(Math.floor((elapsed / duration) * 100), 100)
      setCount(pct)
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(step)
      } else {
        setTimeout(onComplete, 400)
      }
    }
    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [onComplete])

  useEffect(() => {
    const t = setInterval(() => setWordIdx(i => (i + 1) % WORDS.length), 700)
    return () => clearInterval(t)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col"
      style={{ background: 'var(--bg)' }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
    >
      {/* Top left */}
      <motion.div
        className="absolute top-8 left-10 text-xs uppercase tracking-[0.35em]"
        style={{ color: 'var(--muted)' }}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        ARC · PERFORMANCE
      </motion.div>

      {/* Top right */}
      <motion.div
        className="absolute top-8 right-10 text-xs uppercase tracking-[0.35em]"
        style={{ color: 'var(--muted)' }}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        RACESUIT COLLECTION '25
      </motion.div>

      {/* Center word */}
      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIdx}
            className="font-condensed italic font-bold select-none"
            style={{
              fontSize: 'clamp(64px, 12vw, 140px)',
              color: 'var(--text)',
              letterSpacing: '4px',
              opacity: 0.85,
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 0.85, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {WORDS[wordIdx]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Bottom */}
      <div className="p-10 flex items-end justify-between">
        {/* Counter */}
        <div
          className="font-condensed italic font-bold tabular-nums leading-none"
          style={{
            fontSize: 'clamp(72px, 10vw, 120px)',
            color: 'var(--text)',
            opacity: 0.15,
            letterSpacing: '2px',
          }}
        >
          {String(count).padStart(3, '0')}
        </div>

        {/* Label */}
        <div className="text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--muted)' }}>
          Loading experience
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: 'var(--stroke)' }}>
        <motion.div
          className="h-full origin-left"
          style={{
            background: 'linear-gradient(90deg, #E8642A, #FF9A5C)',
            boxShadow: '0 0 10px rgba(232,100,42,0.5)',
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: count / 100 }}
          transition={{ ease: 'linear', duration: 0.05 }}
        />
      </div>
    </motion.div>
  )
}
