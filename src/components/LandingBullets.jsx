export default function LandingBullets({ items, accent = '#d4af37' }) {
  return (
    <ul className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2">
      {items.map((item, i) => (
        <li key={item} className="flex items-start gap-4 bg-ink-soft p-5">
          <span className="font-mono text-xs" style={{ color: accent }}>
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="text-sm leading-relaxed text-chalk/90">{item}</span>
        </li>
      ))}
    </ul>
  )
}
