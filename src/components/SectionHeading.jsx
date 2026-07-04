import Reveal, { Rule } from './Reveal.jsx'

export default function SectionHeading({ index, eyebrow, title, copy }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
            {index} / {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="hidden font-mono text-xs uppercase tracking-[0.3em] text-mist sm:block">
            DATAI
          </p>
        </Reveal>
      </div>
      <Rule className="mt-4" />
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <Reveal delay={0.05}>
          <h2 className="text-3xl font-bold leading-[1.1] tracking-tight sm:text-5xl">{title}</h2>
        </Reveal>
        {copy && (
          <Reveal delay={0.15} className="self-end">
            <p className="max-w-md leading-relaxed text-mist">{copy}</p>
          </Reveal>
        )}
      </div>
    </div>
  )
}
