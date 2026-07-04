import logo from '../assets/logo-gold.png'

const columns = [
  {
    title: 'Sectors',
    links: ['Construction', 'Recruitment', 'Insurance', 'Care sector', 'Property'],
    href: '#sectors',
  },
  {
    title: 'Automations',
    links: ['Data automations', 'Marketing', 'Sales', 'Finance', 'Admin'],
    href: '#automations',
  },
  {
    title: 'Company',
    links: ['Client stories', 'Book a call'],
    href: '#testimonials',
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink-soft">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <a href="#top" className="inline-block">
              <img
                src={logo}
                alt="DATAI — Automating The Complex"
                className="logo-lift h-12 w-auto select-none"
                draggable="false"
              />
            </a>
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
                  <li key={l}>
                    <a href={col.href} className="text-sm text-mist transition-colors hover:text-chalk">
                      {l}
                    </a>
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
