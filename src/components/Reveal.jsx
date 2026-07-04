import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

/*
 * Content slides up from behind a hard mask edge — a straight-line reveal.
 * The visibility check runs on the (static) wrapper, not the translated child:
 * a fully-translated child is clipped by overflow-hidden and would never
 * intersect the viewport, so whileInView would never fire.
 */
export default function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '102%' }}
        animate={inView ? { y: 0 } : undefined}
        transition={{ duration: 0.8, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </div>
  )
}

/* A 1px rule that draws itself in from the left. */
export function Rule({ delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 1.1, delay, ease: EASE }}
      className={`h-px w-full origin-left bg-line ${className}`}
    />
  )
}

/* Number that counts up when scrolled into view. Accepts strings like "14", "3x", "80%". */
export function Counter({ value, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const match = String(value).match(/^([\d.]+)(.*)$/)
  const target = match ? parseFloat(match[1]) : 0
  const suffix = match ? match[2] : String(value)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1200
    const start = performance.now()
    let raf
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(target % 1 === 0 ? Math.round(eased * target) : (eased * target).toFixed(1))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target])

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  )
}
