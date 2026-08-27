import {
  Radar,
  Handshake,
  Coins,
  Wrench,
  GitMerge,
  Rocket,
  Briefcase,
  Cpu,
  Repeat,
  Users,
  Megaphone,
  Layers,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PARTNER_PATHS } from '../data/partnerPaths.js'

const EASE = [0.16, 1, 0.3, 1]
const STEP_MS = 2400

const ICONS = {
  Radar,
  Handshake,
  Coins,
  Wrench,
  GitMerge,
  Rocket,
  Briefcase,
  Cpu,
  Repeat,
  Users,
  Megaphone,
  Layers,
}

export const PARTNER_TRACKS = PARTNER_PATHS.map((path) => ({
  ...path,
  icon: ICONS[path.icon],
  steps: path.steps.map((step) => ({ ...step, icon: ICONS[step.icon] })),
}))

function StepCard({ step, index, state }) {
  const Icon = step.icon
  const active = state === 'active'
  const done = state === 'done'

  return (
    <div
      className={`partner-step relative flex flex-col gap-3 border p-5 transition-all duration-500 sm:p-6 ${
        active
          ? 'partner-step-active border-gold/60 bg-gold/[0.05]'
          : done
            ? 'border-gold/25 bg-ink/60'
            : 'border-line bg-ink/60'
      }`}
    >
      <div className="flex items-center justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center border transition-colors duration-500 ${
            active || done ? 'border-gold/50 bg-gold/10' : 'border-line bg-transparent'
          }`}
        >
          <Icon
            className={`h-5 w-5 transition-colors duration-500 ${
              active ? 'text-gold-bright' : done ? 'text-gold' : 'text-mist'
            }`}
            strokeWidth={1.5}
          />
        </div>
        <span
          className={`font-mono text-[11px] tracking-[0.2em] transition-colors duration-500 ${
            active ? 'text-gold-bright' : done ? 'text-gold/70' : 'text-mist/50'
          }`}
        >
          {done ? '✓' : `0${index + 1}`}
        </span>
      </div>
      <h4
        className={`font-display text-lg font-bold tracking-tight transition-colors duration-500 sm:text-xl ${
          active || done ? 'text-chalk' : 'text-chalk/60'
        }`}
      >
        {step.title}
      </h4>
      <p className={`text-sm leading-relaxed transition-colors duration-500 ${active ? 'text-mist' : 'text-mist/55'}`}>
        {step.copy}
      </p>
    </div>
  )
}

function FlowConnector({ lit, vertical = false }) {
  return (
    <div
      className={`pointer-events-none flex items-center justify-center ${
        vertical ? 'h-8 w-full' : 'h-full w-full'
      }`}
      aria-hidden
    >
      <svg
        className={vertical ? 'h-full w-4' : 'h-4 w-full'}
        viewBox={vertical ? '0 0 8 32' : '0 0 64 8'}
        preserveAspectRatio="none"
      >
        <line
          x1={vertical ? 4 : 0}
          y1={vertical ? 0 : 4}
          x2={vertical ? 4 : 64}
          y2={vertical ? 32 : 4}
          stroke="rgba(212,175,55,0.15)"
          strokeWidth="2"
        />
        <line
          x1={vertical ? 4 : 0}
          y1={vertical ? 0 : 4}
          x2={vertical ? 4 : 64}
          y2={vertical ? 32 : 4}
          stroke={lit ? '#d4af37' : 'transparent'}
          strokeWidth="2"
          strokeLinecap="round"
          className="pipeline-flow"
          style={{ transition: 'stroke 0.4s ease' }}
        />
      </svg>
    </div>
  )
}

function PartnerPipeline({ path }) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    setStep(0)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStep(2)
      return
    }
    const id = setInterval(() => {
      setStep((s) => (s + 1) % (path.steps.length + 1))
    }, STEP_MS)
    return () => clearInterval(id)
  }, [path])

  const stateFor = (i) => {
    if (step >= path.steps.length) return 'done'
    if (i === step) return 'active'
    if (i < step) return 'done'
    return 'idle'
  }

  return (
    <motion.div
      key={path.id}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="pipeline-shell relative overflow-hidden"
    >
      <div className="pipeline-atmosphere pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative flex flex-wrap items-end justify-between gap-3 border-b border-line/50 px-5 py-4 sm:px-8">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold">
            {path.ref} / {path.label} track
          </p>
          <p className="mt-1 max-w-md text-sm text-mist">{path.pitch}</p>
        </div>
        <div className="hidden items-center gap-5 font-mono text-[10px] uppercase tracking-[0.22em] sm:flex">
          {path.stages.map((s, i) => (
            <span key={s} className="flex items-center gap-5">
              <span className={`transition-colors duration-400 ${stateFor(i) !== 'idle' ? 'text-gold/90' : 'text-mist/50'}`}>
                {s}
              </span>
              {i < path.stages.length - 1 && <span className="text-line">→</span>}
            </span>
          ))}
        </div>
      </div>

      <div className="relative px-5 py-8 sm:px-8 sm:py-10">
        <div className="hidden items-stretch gap-0 md:grid md:grid-cols-[1fr_56px_1fr_56px_1fr]">
          <StepCard step={path.steps[0]} index={0} state={stateFor(0)} />
          <FlowConnector lit={step >= 1} />
          <StepCard step={path.steps[1]} index={1} state={stateFor(1)} />
          <FlowConnector lit={step >= 2} />
          <StepCard step={path.steps[2]} index={2} state={stateFor(2)} />
        </div>

        <div className="flex flex-col md:hidden">
          <StepCard step={path.steps[0]} index={0} state={stateFor(0)} />
          <FlowConnector lit={step >= 1} vertical />
          <StepCard step={path.steps[1]} index={1} state={stateFor(1)} />
          <FlowConnector lit={step >= 2} vertical />
          <StepCard step={path.steps[2]} index={2} state={stateFor(2)} />
        </div>

        <div className="mt-7 h-px w-full bg-line-soft">
          <div
            className="h-full bg-gradient-to-r from-gold-deep via-gold to-gold-bright"
            style={{
              width: `${Math.min(1, (step + 1) / (path.steps.length + 1)) * 100}%`,
              transition: `width ${STEP_MS}ms linear`,
            }}
          />
        </div>
      </div>

      <div className="relative flex flex-wrap items-center justify-between gap-3 border-t border-line/50 px-5 py-4 sm:px-8">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist/60">{path.footerLeft}</span>
        <span
          className={`font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-500 ${
            step >= path.steps.length - 1 ? 'text-gold' : 'text-gold/40'
          }`}
        >
          {path.payoff}
        </span>
      </div>
    </motion.div>
  )
}

export default function PartnerTracks() {
  const [active, setActive] = useState(0)
  const path = PARTNER_TRACKS[active]

  return (
    <div>
      <div className="grid gap-px border border-line bg-line sm:grid-cols-3">
        {PARTNER_TRACKS.map((p, i) => {
          const Icon = p.icon
          const selected = i === active
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setActive(i)}
              className={`relative flex items-center gap-4 px-5 py-4 text-left transition-colors sm:px-6 sm:py-5 ${
                selected ? 'bg-panel' : 'bg-ink hover:bg-panel/60'
              }`}
            >
              <span
                className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-gold-deep via-gold to-gold-bright transition-opacity duration-300"
                style={{ opacity: selected ? 1 : 0 }}
                aria-hidden
              />
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center border transition-colors ${
                  selected ? 'border-gold/50 bg-gold/10' : 'border-line'
                }`}
              >
                <Icon className={`h-5 w-5 ${selected ? 'text-gold-bright' : 'text-mist'}`} strokeWidth={1.5} />
              </span>
              <span className="min-w-0">
                <span className="flex items-baseline gap-2">
                  <span className={`font-mono text-[10px] tracking-[0.2em] ${selected ? 'text-gold' : 'text-mist/60'}`}>
                    {p.ref}
                  </span>
                  <span className={`font-display text-lg font-bold ${selected ? 'text-chalk' : 'text-chalk/70'}`}>
                    {p.label}
                  </span>
                </span>
                <span className="block truncate text-sm text-mist">{p.tagline}</span>
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-6">
        <AnimatePresence mode="wait">
          <PartnerPipeline path={path} />
        </AnimatePresence>
      </div>
    </div>
  )
}
