import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
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
import Reveal, { Rule } from './Reveal.jsx'

const EASE = [0.16, 1, 0.3, 1]

/* ------------------------------------------------------------------ */
/*  Partner paths: each is a three-step pipeline ending on a payoff.  */
/* ------------------------------------------------------------------ */

const PATHS = [
  {
    id: 'refer',
    ref: 'P-01',
    label: 'Refer',
    icon: Megaphone,
    tagline: 'Know someone drowning in admin?',
    pitch: 'One intro. We do the rest. You get a cut of every project we ship.',
    stages: ['Spot', 'Intro', 'Earn'],
    payoff: '15% on the first project · 10% on every project after · for 12 months',
    footerLeft: 'No targets, no lock-in, start with one intro',
    cta: 'Refer someone now',
    steps: [
      {
        icon: Radar,
        title: 'Spot the pain',
        copy: 'A client, a supplier, a mate whose team is buried in manual work. That\u2019s a referral.',
      },
      {
        icon: Handshake,
        title: 'Make the intro',
        copy: 'One email or a warm handover. We scope it, build it and keep you in the loop. No hard sell, and you\u2019ll know the day it closes.',
      },
      {
        icon: Coins,
        title: 'Collect your cut',
        copy: 'Earn 15% of your intro\u2019s first project, then 10% of every project after that for 12 months. Paid on invoice.',
      },
    ],
  },
  {
    id: 'build',
    ref: 'P-02',
    label: 'Build',
    icon: Wrench,
    tagline: 'You build automations too?',
    pitch: 'Join the delivery pod. Real clients, real workflows, paid per build.',
    stages: ['Show', 'Ship', 'Scale'],
    payoff: 'Paid per build · rates agreed up front',
    footerLeft: 'No targets, no lock-in, start with one paired build',
    cta: 'Send us your stack',
    steps: [
      {
        icon: Cpu,
        title: 'Show your stack',
        copy: 'n8n, Make, Python, LLM pipelines. Send us something you\u2019ve shipped and love.',
      },
      {
        icon: GitMerge,
        title: 'Ship with us',
        copy: 'Pair on a live client workflow with our playbooks, QA and human-in-the-loop standards.',
      },
      {
        icon: Rocket,
        title: 'Scale together',
        copy: 'Take the lead on a sector you know inside out and grow your book with ours.',
      },
    ],
  },
  {
    id: 'sell',
    ref: 'P-03',
    label: 'Sell',
    icon: Briefcase,
    tagline: 'Agency or consultant?',
    pitch: 'Put our engine behind your brand. You own the client, we own the build.',
    stages: ['Plug in', 'Deliver', 'Recur'],
    payoff: 'Margin on every retainer · month after month',
    footerLeft: 'No targets, no lock-in, start with one client',
    cta: 'Book a discovery call',
    steps: [
      {
        icon: Layers,
        title: 'Plug in the engine',
        copy: 'Add DATAI automations to your offer. White-label or co-branded, your call.',
      },
      {
        icon: Users,
        title: 'You sell, we deliver',
        copy: 'You keep the relationship and your brand stays on everything. We handle scoping, builds, support and the on-call, and we never contact your client directly.',
      },
      {
        icon: Repeat,
        title: 'Revenue on repeat',
        copy: 'Every automation retainer pays you margin monthly, compounding as clients add workflows.',
      },
    ],
  },
]

const STEP_MS = 2400

/* ------------------------------------------------------------ */
/*  Background: sparse gold constellation, kept from v1 but dim. */
/* ------------------------------------------------------------ */

function useConstellation(canvasRef, sectionRef) {
  useEffect(() => {
    const canvas = canvasRef.current
    const section = sectionRef.current
    if (!canvas || !section) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = canvas.getContext('2d')
    let w = 0
    let h = 0
    let raf = 0
    let running = false
    let nodes = []

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width
      h = rect.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const target = Math.max(18, Math.min(44, Math.round((w * h) / 26000)))
      nodes = Array.from({ length: target }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.14,
        vy: (Math.random() - 0.5) * 0.14,
        r: 1 + Math.random() * 1.6,
        phase: Math.random() * Math.PI * 2,
      }))
    }

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < 140) {
            ctx.strokeStyle = `rgba(212, 175, 55, ${(1 - d / 140) * 0.1})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
      for (const n of nodes) {
        const tw = 0.5 + 0.5 * Math.sin(t / 950 + n.phase)
        ctx.fillStyle = `rgba(212, 175, 55, ${0.32 * tw + 0.1})`
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const loop = (t) => {
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < -10) n.x = w + 10
        if (n.x > w + 10) n.x = -10
        if (n.y < -10) n.y = h + 10
        if (n.y > h + 10) n.y = -10
      }
      draw(t)
      raf = requestAnimationFrame(loop)
    }

    const start = () => {
      if (running || reduced) return
      running = true
      raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    resize()
    if (reduced) draw(0)

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0.05 },
    )
    io.observe(section)
    const ro = new ResizeObserver(() => {
      resize()
      if (reduced) draw(0)
    })
    ro.observe(canvas)

    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
    }
  }, [canvasRef, sectionRef])
}

/* --------------------------------------------------- */
/*  The three-step pipeline that plays itself forward.  */
/* --------------------------------------------------- */

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
      <p
        className={`text-sm leading-relaxed transition-colors duration-500 ${
          active ? 'text-mist' : 'text-mist/55'
        }`}
      >
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

  // Auto-play the pipeline: 0 → 1 → 2, hold on the payoff, loop.
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

  // step === 3 is the "hold" beat where all three glow before looping.
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
              <span
                className={`transition-colors duration-400 ${
                  stateFor(i) !== 'idle' ? 'text-gold/90' : 'text-mist/50'
                }`}
              >
                {s}
              </span>
              {i < path.stages.length - 1 && <span className="text-line">→</span>}
            </span>
          ))}
        </div>
      </div>

      <div className="relative px-5 py-8 sm:px-8 sm:py-10">
        {/* Desktop: three across with flowing connectors */}
        <div className="hidden items-stretch gap-0 md:grid md:grid-cols-[1fr_56px_1fr_56px_1fr]">
          <StepCard step={path.steps[0]} index={0} state={stateFor(0)} />
          <FlowConnector lit={step >= 1} />
          <StepCard step={path.steps[1]} index={1} state={stateFor(1)} />
          <FlowConnector lit={step >= 2} />
          <StepCard step={path.steps[2]} index={2} state={stateFor(2)} />
        </div>

        {/* Mobile: stacked with vertical connectors */}
        <div className="flex flex-col md:hidden">
          <StepCard step={path.steps[0]} index={0} state={stateFor(0)} />
          <FlowConnector lit={step >= 1} vertical />
          <StepCard step={path.steps[1]} index={1} state={stateFor(1)} />
          <FlowConnector lit={step >= 2} vertical />
          <StepCard step={path.steps[2]} index={2} state={stateFor(2)} />
        </div>

        {/* Progress rail */}
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
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist/60">
          {path.footerLeft}
        </span>
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

/* ------------------- */
/*  The full section.  */
/* ------------------- */

const socials = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com',
    path: 'M4.98 3.5a2.49 2.49 0 1 1-.02 4.98 2.49 2.49 0 0 1 .02-4.98zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.31-.03-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21H9z',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com',
    path: 'M12 2.2c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85C2.42 3.92 3.94 2.38 7.15 2.27 8.42 2.21 8.8 2.2 12 2.2zm0 3.7a6.1 6.1 0 1 0 0 12.2 6.1 6.1 0 0 0 0-12.2zm0 2.2a3.9 3.9 0 1 1 0 7.8 3.9 3.9 0 0 1 0-7.8zm6.35-3.8a1.43 1.43 0 1 0 0 2.86 1.43 1.43 0 0 0 0-2.86z',
  },
  {
    label: 'X',
    href: 'https://x.com',
    path: 'M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23zm-1.16 17.52h1.83L7.08 4.13H5.12z',
  },
]

export default function BePartner() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const [active, setActive] = useState(0)
  useConstellation(canvasRef, sectionRef)

  const path = PATHS[active]

  return (
    <section id="partner" ref={sectionRef} className="relative overflow-hidden py-24 sm:py-32">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-70" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/85 via-black/50 to-black/85"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex items-baseline justify-between gap-6">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">05 / Be a partner</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="hidden font-mono text-xs uppercase tracking-[0.3em] text-mist sm:block">DATAI</p>
          </Reveal>
        </div>
        <Rule className="mt-4" />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <h2 className="text-3xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
            <Reveal>Wanna have your part in</Reveal>
            <Reveal delay={0.1}>
              AI automations? <span className="gilded join-us-shimmer">Join us.</span>
            </Reveal>
          </h2>
          <Reveal delay={0.2} className="self-end">
            <p className="max-w-md leading-relaxed text-mist">
              Three ways in. Pick the track that fits and watch how it plays out. Every one
              starts with a single conversation.
            </p>
          </Reveal>
        </div>

        {/* Path selector */}
        <Reveal delay={0.25}>
          <div className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-3">
            {PATHS.map((p, i) => {
              const Icon = p.icon
              const selected = i === active
              return (
                <button
                  key={p.id}
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
                    <Icon
                      className={`h-5 w-5 ${selected ? 'text-gold-bright' : 'text-mist'}`}
                      strokeWidth={1.5}
                    />
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
        </Reveal>

        {/* Animated three-step pipeline for the selected path */}
        <div className="mt-6">
          <AnimatePresence mode="wait">
            <PartnerPipeline path={path} />
          </AnimatePresence>
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <Reveal>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="cta-shimmer relative overflow-hidden border border-gold bg-gold px-8 py-4 text-center font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink transition-transform duration-300 hover:-translate-y-0.5"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={path.id}
                    className="block"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: EASE }}
                  >
                    {path.cta}
                  </motion.span>
                </AnimatePresence>
              </a>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist/70">
                One call. We&rsquo;ll map step one together.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center border border-line text-mist transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:text-gold"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
