import { Link } from 'react-router-dom'
import logo from '../assets/logo-gold.png'

const columns = [
  {
    title: 'Solutions',
    links: [
      { label: 'ISO 19650', to: '/iso-19650' },
      { label: 'Care', to: '/care' },
      { label: 'Recruitment', to: '/recruitment' },
      { label: 'Partners', to: '/partners' },
    ],
  },
  {
    title: 'Sectors',
    links: [
      { label: 'Construction', href: '/#sectors' },
      { label: 'Recruitment', to: '/recruitment' },
      { label: 'Insurance', href: '/#sectors' },
      { label: 'Care sector', to: '/care' },
      { label: 'Property', href: '/#sectors' },
    ],
  },
  {
    title: 'Automations',
    links: [
      { label: 'Data automations', href: '/#automations' },
      { label: 'Marketing', href: '/#automations' },
      { label: 'Sales', href: '/#automations' },
      { label: 'Finance', href: '/#automations' },
      { label: 'Admin', href: '/#automations' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Client stories', href: '/#testimonials' },
      { label: 'Book a call', href: '/#contact' },
    ],
  },
]

function FooterLink({ link }) {
  if (link.to) {
    return (
      <Link to={link.to} className="text-sm text-mist transition-colors hover:text-chalk">
        {link.label}
      </Link>
    )
  }
  return (
    <a href={link.href} className="text-sm text-mist transition-colors hover:text-chalk">
      {link.label}
    </a>
  )
}

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink-soft">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block">
              <img
                src={logo}
                alt="DATAI — Automating The Complex"
                className="logo-lift h-12 w-auto select-none"
                draggable="false"
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-mist">
              We connect every app, document and workflow, then let AI handle the repetitive
              work — with a human in the loop. Hours become minutes. Costs become savings.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-chalk">
                {col.title}
              </h4>
              <ul className="mt-5 flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <FooterLink link={l} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
            © {new Date().getFullYear()} DATAI Ltd
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
            Work smarter / Scale faster
          </p>
        </div>
      </div>
    </footer>
  )
}
