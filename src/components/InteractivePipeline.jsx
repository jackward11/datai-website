import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Cpu, Play, RotateCcw, UserCheck } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import { PIPELINE_STAGES, SECTOR_PIPELINES } from '../data/sectorPipelines.js'

const EASE = [0.16, 1, 0.3, 1]
const STAGE_MS = 1800

function usePrefersReducedMotion() {
  const reduced = useReducedMotion()
  return reduced ?? false
}

function StageIndicator({ stage, index, activeIndex }) {
  const lit = index <= activeIndex
  const current = index === activeIndex

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div
        className={`flex h-10 w-10 items-center justify-center border font-mono text-xs transition-colors duration-500 sm:h-11 sm:w-11 ${
          lit
            ? 'border-gold/50 bg-gold/10 text-gold-bright'
            : 'border-line/60 bg-ink-soft text-mist/50'
        } ${current ? 'ring-1 ring-gold/30' : ''}`}
      >
        {String(index + 1).padStart(2, '0')}
      </div>
      <div>
        <p className={`font-mono text-[10px] uppercase tracking-[0.2em] ${lit ? 'text-gold' : 'text-mist/50'}`}>
          {stage.label}
        </p>
        <p className={`mt-1 hidden max-w-[9rem] text-[11px] leading-snug sm:block ${lit ? 'text-mist' : 'text-mist/40'}`}>
          {stage.copy}
        </p>
      </div>
    </div>
  )
}

function FlowChip({ icon: Icon, label, side, visible, delay = 0 }) {
  const x = side === 'left' ? -16 : 16
  return (
    <motion.div
      initial={{ opacity: 0, x }}
      animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: x * 0.5 }}
      transition={{ duration: 0.45, delay, ease: EASE }}
      className={`pipeline-card flex items-center gap-2.5 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3 ${side === 'right' ? 'pipeline-card-right' : ''}`}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-gold/35 bg-gold/[0.06] sm:h-9 sm:w-9">
        <Icon className="h-4 w-4 text-gold-bright" strokeWidth={1.5} />
      </div>
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-chalk/90 sm:text-[11px]">{label}</span>
    </motion.div>
  )
}

function LivingPipeline({ process, sector, running, stageIndex, onComplete }) {
  const reduced = usePrefersReducedMotion()
  const showInputs = stageIndex >= 0
  const showEngine = stageIndex >= 1
  const showHuman = stageIndex >= 2
  const showOutputs = stageIndex >= 3
  const complete = stageIndex >= PIPELINE_STAGES.length - 1

  useEffect(() => {
    if (complete && onComplete) onComplete()
  }, [complete, onComplete])

  return (
    <div className="pipeline-shell relative overflow-hidden">
      <div className="pipeline-atmosphere pointer-events-none absolute inset-0" aria-hidden />
      <div className="pipeline-grid pointer-events-none absolute inset-0 opacity-[0.35]" aria-hidden />

      <div className="relative border-b border-line/50 px-4 py-4 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-gold sm:text-[11px]">
              {sector.ref} / {process.label}
            </p>
            <p className="mt-1 max-w-lg text-sm text-mist">
              {running ? PIPELINE_STAGES[Math.min(stageIndex, PIPELINE_STAGES.length - 1)]?.copy : process.messy}
            </p>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist/60">
            {running ? `Stage ${Math.min(stageIndex + 1, PIPELINE_STAGES.length)} of ${PIPELINE_STAGES.length}` : 'Ready to run'}
          </p>
        </div>
      </div>

      <div className="relative px-3 py-8 sm:px-5 sm:py-10 lg:px-8">
        <div className="mb-8 flex justify-between gap-2 overflow-x-auto pb-2 sm:gap-4 lg:mb-10">
          {PIPELINE_STAGES.map((stage, i) => (
            <StageIndicator
              key={stage.id}
              stage={stage}
              index={i}
              activeIndex={running ? stageIndex : -1}
            />
          ))}
        </div>

        <div className="relative grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-5">
          <div className="space-y-2">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.24em] text-mist/60">Messy in</p>
            {process.sources.map((s, i) => (
              <FlowChip
                key={s.label}
                {...s}
                side="left"
                visible={showInputs && (reduced || running)}
                delay={i * 0.06}
              />
            ))}
          </div>

          <div className="relative flex flex-col items-center gap-4">
            <motion.div
              initial={{ opacity: 0.6, scale: 0.96 }}
              animate={
                showEngine
                  ? { opacity: 1, scale: 1, boxShadow: '0 0 40px rgba(212,175,55,0.12)' }
                  : { opacity: 0.7, scale: 0.96 }
              }
              transition={{ duration: 0.55, ease: EASE }}
              className="pipeline-engine relative w-full max-w-xs px-5 py-7 text-center sm:max-w-sm sm:px-7 sm:py-8"
            >
              <div className="absolute -inset-px rounded-sm bg-gradient-to-br from-gold-bright/40 via-gold/20 to-gold-deep/30 opacity-80" aria-hidden />
              <div className="relative bg-ink">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(245,220,138,0.12),transparent_70%)]" aria-hidden />
                <div className="relative">
                  <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center border border-gold/40 bg-gold/10">
                    <Cpu className="h-5 w-5 text-gold-bright" strokeWidth={1.5} />
                  </div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold/80">DATAI Engine</p>
                  <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                    {['Extract', 'Decide'].map((stage) => (
                      <span
                        key={stage}
                        className={`border px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] sm:text-[10px] ${
                          showEngine
                            ? 'border-gold/30 bg-gold/[0.08] text-gold-bright/90'
                            : 'border-line/40 text-mist/40'
                        }`}
                      >
                        {stage}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <AnimatePresence>
              {showHuman && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="pipeline-human flex w-full max-w-xs items-center gap-3 px-4 py-3 sm:max-w-sm"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-gold-bright/50 bg-gold-bright/10">
                    <UserCheck className="h-4 w-4 text-gold-bright" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-bright">Human check</p>
                    <p className="mt-0.5 text-xs leading-snug text-chalk/80 sm:text-sm">{process.humanLine}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-2">
            <p className="mb-3 text-right font-mono text-[10px] uppercase tracking-[0.24em] text-mist/60">Working out</p>
            {process.outputs.map((o, i) => (
              <FlowChip
                key={o.label}
                {...o}
                side="right"
                visible={showOutputs && (reduced || running)}
                delay={i * 0.08}
              />
            ))}
            {!showOutputs && (
              <div className="flex h-full min-h-[8rem] items-center justify-center border border-dashed border-line/40 px-4 py-6 text-center">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist/40">Outputs appear at ship</p>
              </div>
            )}
          </div>
        </div>

        {running && stageIndex >= 0 && (
          <motion.div
            className="pointer-events-none absolute left-0 top-[52%] hidden h-0.5 w-full origin-left bg-gradient-to-r from-transparent via-gold/40 to-transparent lg:block"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: Math.min((stageIndex + 1) / PIPELINE_STAGES.length, 1) }}
            transition={{ duration: reduced ? 0 : STAGE_MS / 1000, ease: EASE }}
            aria-hidden
          />
        )}
      </div>

      <div className="relative border-t border-line/50 px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.18em]">
          <span className="text-mist/60">{sector.name} workflow</span>
          <span className={complete ? 'text-gold-bright' : 'text-gold/70'}>
            {complete ? 'Pipeline live' : running ? 'Building pipeline…' : 'Waiting to run'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function InteractivePipeline() {
  const reduced = usePrefersReducedMotion()
  const [sectorIndex, setSectorIndex] = useState(0)
  const [processIndex, setProcessIndex] = useState(0)
  const [running, setRunning] = useState(false)
  const [stageIndex, setStageIndex] = useState(-1)
  const [complete, setComplete] = useState(false)
  const timerRef = useRef(null)

  const sector = SECTOR_PIPELINES[sectorIndex]
  const process = sector.processes[processIndex]

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const resetRun = useCallback(() => {
    clearTimer()
    setRunning(false)
    setStageIndex(-1)
    setComplete(false)
  }, [clearTimer])

  const startRun = useCallback(() => {
    clearTimer()
    setComplete(false)
    setRunning(true)

    if (reduced) {
      setStageIndex(PIPELINE_STAGES.length - 1)
      setComplete(true)
      return
    }

    setStageIndex(0)
    let step = 0
    timerRef.current = setInterval(() => {
      step += 1
      if (step >= PIPELINE_STAGES.length) {
        clearTimer()
        setStageIndex(PIPELINE_STAGES.length - 1)
        setComplete(true)
      } else {
        setStageIndex(step)
      }
    }, STAGE_MS)
  }, [clearTimer, reduced])

  useEffect(() => {
    resetRun()
  }, [sectorIndex, processIndex, resetRun])

  useEffect(() => () => clearTimer(), [clearTimer])

  const handleSectorChange = (i) => {
    setSectorIndex(i)
    setProcessIndex(0)
  }

  return (
    <section id="try-it" className="relative border-y border-line bg-ink-soft py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="03"
          eyebrow="Try it"
          title="Pick your mess. Watch it become a pipeline."
          copy="Choose your sector and a process you recognise. We will show you how DATAI turns the chaos into extract, decide, human check, ship."
        />

        <Reveal className="mt-12 sm:mt-14">
          <div className="grid gap-px border border-line bg-line lg:grid-cols-[minmax(0,320px)_1fr]">
            <div className="flex flex-col bg-ink">
              <div className="border-b border-line p-4 sm:p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-mist/70">1 · Pick a sector</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {SECTOR_PIPELINES.map((s, i) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => handleSectorChange(i)}
                      className={`border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors sm:text-[11px] ${
                        i === sectorIndex
                          ? 'border-gold/50 bg-gold/10 text-gold-bright'
                          : 'border-line/60 text-mist hover:border-gold/30 hover:text-chalk'
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-mist/70">2 · Pick a process</p>
                <div className="mt-3 space-y-1.5">
                  {sector.processes.map((p, i) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setProcessIndex(i)}
                      className={`relative flex w-full items-start gap-3 border px-3 py-3 text-left transition-colors sm:px-4 ${
                        i === processIndex
                          ? 'border-gold/40 bg-panel'
                          : 'border-line/50 bg-ink-soft hover:border-gold/25'
                      }`}
                    >
                      <span className="font-mono text-[10px]" style={{ color: sector.accent }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm leading-snug text-chalk/90">{p.label}</span>
                      {i === processIndex && (
                        <span className="ml-auto font-mono text-xs" style={{ color: sector.accent }}>
                          →
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                <div className="mt-auto border-t border-line/50 pt-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-mist/70">3 · Run it</p>
                  <div className="mt-3 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={startRun}
                      disabled={running && !complete}
                      className="flex items-center justify-center gap-2 border border-gold bg-gold px-4 py-3 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:bg-transparent hover:text-gold disabled:cursor-not-allowed disabled:opacity-50 sm:text-xs"
                    >
                      <Play className="h-3.5 w-3.5" strokeWidth={2} />
                      {running && !complete ? 'Running…' : complete ? 'Run again' : 'Run pipeline'}
                    </button>
                    {(running || complete) && (
                      <button
                        type="button"
                        onClick={resetRun}
                        className="flex items-center justify-center gap-2 border border-line/70 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-mist transition-colors hover:border-gold/40 hover:text-chalk sm:text-[11px]"
                      >
                        <RotateCcw className="h-3 w-3" strokeWidth={1.5} />
                        Reset
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col bg-ink p-4 sm:p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${sector.id}-${process.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <LivingPipeline
                    process={process}
                    sector={sector}
                    running={running}
                    stageIndex={stageIndex}
                    onComplete={() => setComplete(true)}
                  />
                </motion.div>
              </AnimatePresence>

              <AnimatePresence>
                {complete && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="mt-6 border border-gold/25 bg-gold/[0.04] p-5 sm:p-6"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold">Your process, automated</p>
                    <p className="mt-2 text-sm leading-relaxed text-mist sm:text-base">
                      That is the shape of a DATAI build for {sector.name.toLowerCase()}. Want us to map your real
                      systems and show you what it would look like live?
                    </p>
                    <a
                      href="#contact"
                      className="mt-4 inline-flex items-center gap-2 border border-gold bg-gold px-6 py-3 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:bg-transparent hover:text-gold sm:text-xs"
                    >
                      Book a discovery call
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
