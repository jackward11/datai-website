import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal, { Counter, Rule } from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'

// Swap videoUrl for each client's hosted testimonial (YouTube/Vimeo embed or MP4).
const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Operations Director',
    company: 'Regional construction firm',
    sector: 'Construction',
    quote: 'Our site-to-office paperwork used to take two people most of the week. Now it flows through automatically and we just review the exceptions.',
    stat: '14',
    statUnit: 'hrs',
    statLabel: 'saved per week',
    gauge: { metric: 'Hours on paperwork / week', before: 16, after: 2, unit: 'hrs' },
    accent: '#f5dc8a',
    videoUrl: null,
  },
  {
    name: 'James O\u2019Connor',
    role: 'Managing Director',
    company: 'Recruitment agency',
    sector: 'Recruitment',
    quote: 'Candidate registration, CV formatting and compliance chasing all happen while my consultants are on the phone actually placing people.',
    stat: '3x',
    statUnit: '',
    statLabel: 'more placements per consultant',
    gauge: { metric: 'Placements / consultant / month', before: 3, after: 9, unit: '' },
    accent: '#e8c258',
    videoUrl: null,
  },
  {
    name: 'Priya Sharma',
    role: 'Claims Manager',
    company: 'Insurance brokerage',
    sector: 'Insurance',
    quote: 'First notification of loss to a fully triaged claim file in minutes, not days. Our clients noticed the difference immediately.',
    stat: '80%',
    statUnit: '',
    statLabel: 'faster claims triage',
    gauge: { metric: 'Claim triage time', before: 48, after: 10, unit: 'hrs' },
    accent: '#d4af37',
    videoUrl: null,
  },
  {
    name: 'David Ellis',
    role: 'Registered Manager',
    company: 'Care provider',
    sector: 'Care',
    quote: 'Rotas, care notes and CQC evidence used to eat my evenings. The automations handle the admin so my team can focus on residents.',
    stat: '2',
    statUnit: 'days',
    statLabel: 'of admin removed monthly',
    gauge: { metric: 'Admin days / month', before: 2.5, after: 0.5, unit: 'days' },
    accent: '#c9a036',
    videoUrl: null,
  },
]

function BeforeAfterBars({ gauge, accent }) {
  const max = Math.max(gauge.before, gauge.after)
  const rows = [
    { label: 'Before', value: gauge.before, color: 'var(--color-mist)' },
    { label: 'Now', value: gauge.after, color: accent },
  ]
  return (
    <div className="w-full max-w-md">
      <p className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.25em] text-mist">{gauge.metric}</p>
      <div className="flex flex-col gap-2">
        {rows.map((r) => (
          <div key={r.label} className="grid grid-cols-[52px_1fr_56px] items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist">{r.label}</span>
            <span className="h-2.5 w-full bg-line-soft">
              <motion.span
                className="block h-full origin-left"
                style={{ background: r.color }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: r.value / max }}
                transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              />
            </span>
            <span className="text-right font-mono text-xs text-chalk">
              {r.value} {gauge.unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)
  const current = testimonials[active]

  const select = (i) => {
    setActive(i)
    setPlaying(false)
  }

  return (
    <section id="testimonials" className="relative border-y border-line bg-ink-soft py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="03"
          eyebrow="Client stories"
          title="Hear it from the people who run on DATAI"
          copy="Real operators, real workflows, real hours back. Press play on any story below."
        />

        <div className="mt-14 grid gap-px border border-line bg-line lg:grid-cols-[1.7fr_1fr]">
          {/* Video player */}
          <div className="relative bg-ink">
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-mist">
                Rec. {String(active + 1).padStart(2, '0')} — {current.sector}
              </p>
              <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-mist">
                <span className="h-2 w-2 animate-pulse" style={{ background: current.accent }} />
                {current.videoUrl ? 'Ready' : 'Coming soon'}
              </span>
            </div>

            <div className="group relative aspect-video">
              {playing && current.videoUrl ? (
                <iframe
                  src={current.videoUrl}
                  title={`${current.name} testimonial`}
                  className="h-full w-full"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              ) : (
                <button
                  onClick={() => current.videoUrl && setPlaying(true)}
                  className="draft-grid absolute inset-0 flex w-full flex-col items-center justify-center gap-7 px-8"
                  aria-label={`Play testimonial from ${current.name}`}
                >
                  <span
                    className="flex h-14 w-14 items-center justify-center border transition-transform group-hover:scale-110"
                    style={{ borderColor: current.accent, color: current.accent }}
                  >
                    <svg viewBox="0 0 24 24" className="ml-0.5 h-6 w-6" fill="currentColor">
                      <path d="M8 5.5v13l11-6.5-11-6.5z" />
                    </svg>
                  </span>

                  <AnimatePresence mode="wait">
                    <motion.blockquote
                      key={active}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="max-w-xl text-center"
                    >
                      <p className="text-lg font-medium leading-relaxed text-chalk sm:text-xl">
                        &ldquo;{current.quote}&rdquo;
                      </p>
                      <footer className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-mist">
                        {current.name} — {current.role}, {current.company}
                      </footer>
                      <div className="mt-6 flex justify-center">
                        <BeforeAfterBars gauge={current.gauge} accent={current.accent} />
                      </div>
                    </motion.blockquote>
                  </AnimatePresence>
                </button>
              )}
            </div>
          </div>

          {/* Selector list */}
          <div className="flex flex-col divide-y divide-line bg-ink">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                onClick={() => select(i)}
                className={`relative flex flex-1 items-center gap-5 px-5 py-5 text-left transition-colors ${
                  i === active ? 'bg-panel' : 'hover:bg-panel/50'
                }`}
              >
                <span
                  className="absolute left-0 top-0 h-full w-[2px] transition-opacity"
                  style={{ background: t.accent, opacity: i === active ? 1 : 0 }}
                />
                <span className="font-mono text-xs text-mist">{String(i + 1).padStart(2, '0')}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold">{t.name}</span>
                  <span className="block truncate text-sm text-mist">
                    {t.role} — {t.company}
                  </span>
                </span>
                <span className="shrink-0 text-right">
                  <span className="block font-display text-xl font-bold" style={{ color: t.accent }}>
                    {/^\d/.test(t.stat) ? <Counter value={t.stat} /> : t.stat}
                    {t.statUnit && <span className="text-sm"> {t.statUnit}</span>}
                  </span>
                  <span className="block max-w-28 font-mono text-[10px] uppercase leading-tight tracking-wide text-mist">
                    {t.statLabel}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <Rule className="mt-6" />
      </div>
    </section>
  )
}
