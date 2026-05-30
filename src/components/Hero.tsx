import { useIsMobile } from '../hooks/useIsMobile'

export default function Hero() {
  const isMobile = useIsMobile()
  return (
    <section style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <img
        src="/ARC.%20WEBSITE%20STARTPAGE.png"
        alt="ARC Performance"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: isMobile ? '70% center' : 'center',
          display: 'block',
        }}
      />
    </section>
  )
}
