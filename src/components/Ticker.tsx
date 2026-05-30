export default function Ticker() {
  const items = ['Race Optimized', '·', 'Premium Materials', '·', 'Precision Engineered', '·', 'Built to Win', '·', 'Designed to Perform', '·', 'ARC Performance', '·']
  const doubled = [...items, ...items]

  return (
    <div
      className="overflow-hidden py-4"
      style={{ background: 'var(--orange)', borderTop: '1px solid rgba(255,255,255,0.1)' }}
    >
      <div className="flex gap-0 whitespace-nowrap animate-ticker" style={{ width: 'max-content' }}>
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-condensed italic font-bold uppercase text-white px-8"
            style={{ fontSize: '13px', letterSpacing: '4px', flexShrink: 0 }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
