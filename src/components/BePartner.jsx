import { useEffect, useRef } from 'react'
import Reveal, { Rule } from './Reveal.jsx'

/*
 * "Join the network" canvas animation.
 *
 * A constellation of gold nodes drifts and links up. Every few seconds a
 * recruit node flies in from off-screen, docks with the nearest node and
 * becomes part of the network with a pulse ring — the visual metaphor for
 * joining us. The visitor's cursor is wired into the network as well, so
 * they are literally already connected.
 */

const GOLD = { r: 212, g: 175, b: 55 }
const GOLD_BRIGHT = { r: 245, g: 220, b: 138 }

function rgba({ r, g, b }, a) {
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

function createNode(w, h, joined = true) {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.16,
    vy: (Math.random() - 0.5) * 0.16,
    r: 1.2 + Math.random() * 1.8,
    bright: Math.random() < 0.25,
    phase: Math.random() * Math.PI * 2,
    joined,
    glow: joined ? 0 : 1,
  }
}

function spawnRecruit(w, h) {
  // Enter from a random edge, just outside the canvas.
  const side = Math.floor(Math.random() * 4)
  const n = createNode(w, h, false)
  if (side === 0) { n.x = -30; n.y = Math.random() * h }
  if (side === 1) { n.x = w + 30; n.y = Math.random() * h }
  if (side === 2) { n.x = Math.random() * w; n.y = -30 }
  if (side === 3) { n.x = Math.random() * w; n.y = h + 30 }
  n.tx = w * (0.25 + Math.random() * 0.5)
  n.ty = h * (0.25 + Math.random() * 0.5)
  n.r = 2.4
  n.bright = true
  return n
}

function useJoinNetwork(canvasRef, sectionRef) {
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
    let pulses = []
    let recruit = null
    let nextRecruitAt = 0
    const pointer = { x: -9999, y: -9999, active: false }
    const LINK_DIST = 130
    const POINTER_DIST = 170

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width
      h = rect.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const target = Math.max(26, Math.min(64, Math.round((w * h) / 16000)))
      if (nodes.length === 0) {
        nodes = Array.from({ length: target }, () => createNode(w, h))
      } else if (nodes.length < target) {
        nodes.push(...Array.from({ length: target - nodes.length }, () => createNode(w, h)))
      } else {
        nodes.length = target
      }
    }

    const drawFrame = (t) => {
      ctx.clearRect(0, 0, w, h)

      // Links between nodes.
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.hypot(dx, dy)
          if (d < LINK_DIST) {
            const alpha = (1 - d / LINK_DIST) * 0.16
            ctx.strokeStyle = rgba(GOLD, alpha)
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // Cursor is part of the network: brighter links to nearby nodes.
      if (pointer.active) {
        for (const n of nodes) {
          const d = Math.hypot(n.x - pointer.x, n.y - pointer.y)
          if (d < POINTER_DIST) {
            const alpha = (1 - d / POINTER_DIST) * 0.42
            ctx.strokeStyle = rgba(GOLD_BRIGHT, alpha)
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(n.x, n.y)
            ctx.lineTo(pointer.x, pointer.y)
            ctx.stroke()
          }
        }
        ctx.fillStyle = rgba(GOLD_BRIGHT, 0.9)
        ctx.beginPath()
        ctx.arc(pointer.x, pointer.y, 2.6, 0, Math.PI * 2)
        ctx.fill()
      }

      // Recruit trajectory line while flying in.
      if (recruit) {
        ctx.strokeStyle = rgba(GOLD_BRIGHT, 0.35)
        ctx.setLineDash([3, 7])
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(recruit.x, recruit.y)
        ctx.lineTo(recruit.tx, recruit.ty)
        ctx.stroke()
        ctx.setLineDash([])
      }

      // Nodes.
      for (const n of nodes) {
        const twinkle = 0.55 + 0.45 * Math.sin(t / 900 + n.phase)
        const base = n.bright ? GOLD_BRIGHT : GOLD
        const alpha = (n.bright ? 0.85 : 0.55) * twinkle + n.glow * 0.4
        if (n.glow > 0.01) {
          ctx.fillStyle = rgba(GOLD_BRIGHT, n.glow * 0.18)
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.r * 6, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.fillStyle = rgba(base, Math.min(1, alpha))
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fill()
      }

      if (recruit) {
        ctx.fillStyle = rgba(GOLD_BRIGHT, 0.95)
        ctx.beginPath()
        ctx.arc(recruit.x, recruit.y, recruit.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // Expanding welcome pulses.
      pulses = pulses.filter((p) => p.a > 0.02)
      for (const p of pulses) {
        ctx.strokeStyle = rgba(GOLD_BRIGHT, p.a)
        ctx.lineWidth = 1.4
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.stroke()
      }
    }

    const step = (t) => {
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < -10) n.x = w + 10
        if (n.x > w + 10) n.x = -10
        if (n.y < -10) n.y = h + 10
        if (n.y > h + 10) n.y = -10
        n.glow *= 0.985
      }

      if (!recruit && t > nextRecruitAt) recruit = spawnRecruit(w, h)
      if (recruit) {
        const dx = recruit.tx - recruit.x
        const dy = recruit.ty - recruit.y
        const d = Math.hypot(dx, dy)
        if (d < 4) {
          recruit.joined = true
          recruit.glow = 1
          recruit.vx = (Math.random() - 0.5) * 0.16
          recruit.vy = (Math.random() - 0.5) * 0.16
          pulses.push({ x: recruit.x, y: recruit.y, r: 4, a: 0.6 })
          nodes.push(recruit)
          if (nodes.length > 72) nodes.shift()
          recruit = null
          nextRecruitAt = t + 2600 + Math.random() * 2200
        } else {
          recruit.x += (dx / d) * Math.min(3.2, d)
          recruit.y += (dy / d) * Math.min(3.2, d)
        }
      }

      for (const p of pulses) {
        p.r += 1.5
        p.a *= 0.96
      }
    }

    const loop = (t) => {
      step(t)
      drawFrame(t)
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
    if (reduced) {
      drawFrame(0)
    }

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0.05 },
    )
    io.observe(section)

    const ro = new ResizeObserver(() => {
      resize()
      if (reduced) drawFrame(0)
    })
    ro.observe(canvas)

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      pointer.active =
        pointer.x >= 0 && pointer.x <= rect.width && pointer.y >= 0 && pointer.y <= rect.height
    }
    const onLeave = () => {
      pointer.active = false
      pointer.x = -9999
      pointer.y = -9999
    }
    section.addEventListener('pointermove', onMove)
    section.addEventListener('pointerleave', onLeave)

    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
      section.removeEventListener('pointermove', onMove)
      section.removeEventListener('pointerleave', onLeave)
    }
  }, [canvasRef, sectionRef])
}

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
  useJoinNetwork(canvasRef, sectionRef)

  return (
    <section id="partner" ref={sectionRef} className="relative overflow-hidden py-24 sm:py-32">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
      {/* Legibility gradient over the canvas, heavier on the text side. */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-black/10"
        aria-hidden
      />

      <div className="pointer-events-none relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reg-marks pointer-events-auto max-w-2xl border border-line bg-ink/70 p-8 backdrop-blur-sm sm:p-14">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">05 / Be a partner</p>
          </Reveal>
          <Rule className="mt-4" />

          <h2 className="mt-10 text-3xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
            <Reveal>Wanna have your part</Reveal>
            <Reveal delay={0.1}>in AI automations?</Reveal>
            <Reveal delay={0.2}>
              <span className="gilded join-us-shimmer">Join us.</span>
            </Reveal>
          </h2>

          <Reveal delay={0.28}>
            <p className="mt-6 max-w-xl leading-relaxed text-mist sm:text-lg">
              Partner with us, refer a workflow, or bring your skills to the team. Book a
              discovery call to get started, or connect on social.
            </p>
          </Reveal>

          <Reveal delay={0.36}>
            <div className="mt-10 flex flex-col gap-5">
              <a
                href="#contact"
                className="cta-shimmer relative overflow-hidden border border-gold bg-gold px-8 py-4 text-center font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink transition-transform duration-300 hover:-translate-y-0.5"
              >
                Book a discovery call
              </a>

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
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
