import { lazy, Suspense, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import IntegrationsTicker from './IntegrationsTicker.jsx'

const IsometricScene = lazy(() => import('./hero-scene/IsometricScene'))

const EASE = [0.16, 1, 0.3, 1]

function MaskLine({ children, delay = 0, className = '' }) {
  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block"
        initial={{ y: '105%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  )
}

function HeroOverlay() {
  const [opacity, setOpacity] = useState(1)
  const [sceneDim, setSceneDim] = useState(1)

  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight
      const animEnd = (300 / 100) * vh
      const y = window.scrollY

      // Fade headline during the animation; hide once the last block has popped.
      const fadeStart = vh * 0.12
      const fadeEnd = vh * 0.5
      const introFade = 1 - Math.min(1, Math.max(0, (y - fadeStart) / (fadeEnd - fadeStart)))
      const animDone = y >= animEnd * 0.92
      setOpacity(animDone ? 0 : introFade)

      // Extra dim on the scene (right side) before scroll begins.
      setSceneDim(Math.max(0, 1 - y / (vh * 0.22)))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="relative flex h-full w-full flex-col justify-center pt-16"
      style={{ opacity, transition: 'opacity 0.12s ease-out' }}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-black/35"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-[6] w-[58%] bg-gradient-to-l from-black/70 via-black/40 to-transparent sm:w-[52%]"
        style={{ opacity: 0.15 + sceneDim * 0.45 }}
        aria-hidden
      />

      <div className="pointer-events-auto relative mx-auto w-full max-w-5xl px-5 pb-20 sm:px-8 sm:pb-24">
        <MaskLine delay={0.08}>
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-gold/90">
            Automating the complex
          </p>
        </MaskLine>

        <h1 className="mt-8 max-w-4xl text-[2.35rem] font-bold leading-[1.06] tracking-tight sm:text-6xl lg:text-[4.25rem] lg:leading-[1.04]">
          <MaskLine delay={0.18}>
            Automate the work slowing down your business
          </MaskLine>
          <MaskLine delay={0.32} className="mt-1 sm:mt-2">
            <span className="gilded">to unlock real ROI.</span>
          </MaskLine>
        </h1>

        <MaskLine delay={0.46} className="mt-8 max-w-lg">
          <p className="text-base leading-relaxed text-mist sm:text-lg">
            We connect your apps, documents and workflows — then let AI handle
            the repetitive work, with a human in the loop where it matters.
          </p>
        </MaskLine>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.58, ease: EASE }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <a
            href="#contact"
            className="border border-gold bg-gold px-8 py-3.5 font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink transition-colors hover:bg-transparent hover:text-gold"
          >
            Book a discovery call
          </a>
          <a
            href="#automations"
            className="border border-line/80 px-8 py-3.5 font-mono text-xs font-medium uppercase tracking-[0.2em] text-chalk/90 transition-colors hover:border-gold/50 hover:text-gold-bright"
          >
            See how it works
          </a>
        </motion.div>
      </div>

      <p className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-mist/50">
        <span className="scroll-hint">Scroll to explore</span>
        <svg width="12" height="18" viewBox="0 0 12 18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M6 1v12M6 13l-4-4M6 13l4-4" />
        </svg>
      </p>
    </div>
  )
}

function SceneFallback() {
  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold/50">Loading scene…</p>
    </div>
  )
}

export default function Hero() {
  return (
    <>
      <div id="top">
        <Suspense fallback={<SceneFallback />}>
          <IsometricScene>
            <HeroOverlay />
          </IsometricScene>
        </Suspense>
      </div>

      <div className="relative z-10 border-b border-line/60 bg-black">
        <IntegrationsTicker />
      </div>
    </>
  )
}
