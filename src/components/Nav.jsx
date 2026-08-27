import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo-gold.png'

const homeLinks = [
  { label: 'Builds', href: '/#automations', index: '01' },
  { label: 'Sectors', href: '/#sectors', index: '02' },
  { label: 'Stories', href: '/#testimonials', index: '03' },
]

const pageLinks = [
  { label: 'ISO 19650', to: '/iso-19650' },
  { label: 'Care', to: '/care' },
  { label: 'Recruitment', to: '/recruitment' },
  { label: 'Partners', to: '/partners' },
]

function contactHref(pathname) {
  return pathname === '/' ? '#contact' : `${pathname}#contact`
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const bookHref = contactHref(pathname)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/30 bg-black/60 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="flex shrink-0 items-center" onClick={() => setOpen(false)}>
          <img src={logo} alt="DATAI — Automating The Complex" className="logo-lift h-10 w-auto select-none" draggable="false" />
        </Link>

        <div className="hidden items-center xl:flex">
          {homeLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group px-3 py-2 font-mono text-xs uppercase tracking-[0.18em] text-mist transition-colors hover:text-chalk"
            >
              <span className="mr-1.5 text-gold-deep/80 transition-colors group-hover:text-gold">{l.index}</span>
              {l.label}
            </a>
          ))}
          <span className="mx-1 h-4 w-px bg-line" aria-hidden />
          {pageLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-3 py-2 font-mono text-xs uppercase tracking-[0.18em] transition-colors ${
                pathname === l.to ? 'text-gold' : 'text-mist hover:text-chalk'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={bookHref}
            className="ml-3 border border-gold bg-gold px-4 py-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:bg-transparent hover:text-gold"
          >
            Book a call
          </a>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center border border-line/60 text-chalk xl:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-line/40 bg-black px-5 pb-6 pt-2 xl:hidden">
          {homeLinks.map((l) => (
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
          {pageLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`flex items-baseline gap-3 border-b border-line-soft py-3.5 font-mono text-sm uppercase tracking-[0.18em] ${
                pathname === l.to ? 'text-gold' : 'text-mist hover:text-chalk'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={bookHref}
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
