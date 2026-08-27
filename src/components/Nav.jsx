import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo-gold.png'

const base = import.meta.env.BASE_URL

const links = [
  { label: 'Builds', href: `${base}#automations`, index: '01' },
  { label: 'Sectors', href: `${base}#sectors`, index: '02' },
  { label: 'Try it', href: `${base}#try-it`, index: '03' },
  { label: 'Stories', href: `${base}#testimonials`, index: '05' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/30 bg-black/60 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="DATAI — Automating The Complex" className="logo-lift h-10 w-auto select-none" draggable="false" />
        </Link>

        <div className="hidden items-center md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group px-5 py-2 font-mono text-xs uppercase tracking-[0.18em] text-mist transition-colors hover:text-chalk"
            >
              <span className="mr-1.5 text-gold-deep/80 transition-colors group-hover:text-gold">{l.index}</span>
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-4 border border-gold bg-gold px-5 py-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:bg-transparent hover:text-gold"
          >
            Book a call
          </a>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center border border-line/60 text-chalk md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-line/40 bg-black px-5 pb-6 pt-2 md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-3 border-b border-line-soft py-3.5 font-mono text-sm uppercase tracking-[0.18em] text-mist hover:text-chalk"
            >
              <span className="text-xs text-gold">{l.index}</span>
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-5 block border border-gold bg-gold px-5 py-3 text-center font-mono text-xs font-medium uppercase tracking-[0.18em] text-ink"
          >
            Book a call
          </a>
        </div>
      )}
    </header>
  )
}
