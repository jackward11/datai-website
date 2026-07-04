const logoModules = import.meta.glob('../../assets/logos/*.svg', {
  eager: true,
  query: '?raw',
  import: 'default',
})

const LOGO_NAMES = {
  quickbooks: 'QuickBooks',
  xero: 'Xero',
  sap: 'SAP',
  salesforce: 'Salesforce',
  notion: 'Notion',
  hubspot: 'HubSpot',
  microsoftoutlook: 'Microsoft Outlook',
  microsoftexcel: 'Microsoft Excel',
  microsoftteams: 'Microsoft Teams',
  slack: 'Slack',
  googledocs: 'Google Docs',
  googlesheets: 'Google Sheets',
}

const integrations = Object.entries(logoModules)
  .map(([path, svg]) => {
    const slug = path.split('/').pop().replace('.svg', '')
    const markup = svg.replace(/currentColor/g, '#d4af37')
    return { name: LOGO_NAMES[slug] ?? slug, markup }
  })
  .sort((a, b) => a.name.localeCompare(b.name))

function LogoMark({ name, markup }) {
  return (
    <span
      className="integration-logo flex h-8 w-8 shrink-0 items-center justify-center sm:h-9 sm:w-9"
      title={name}
      aria-label={name}
      role="img"
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  )
}

export default function IntegrationsTicker() {
  const row = [...integrations, ...integrations]

  if (integrations.length === 0) {
    return null
  }

  return (
    <div className="relative border-t border-line/60 bg-black">
      <div className="flex min-h-[4.75rem] items-stretch">
        <p className="flex shrink-0 items-center border-r border-line/40 bg-black py-4 pl-5 pr-5 font-mono text-[11px] uppercase tracking-[0.25em] text-gold sm:pl-8 sm:pr-8">
          Plugs into
        </p>

        <div className="relative min-w-0 flex-1 overflow-hidden">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-black to-transparent sm:w-16"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-black to-transparent sm:w-16"
            aria-hidden
          />

          <div className="ticker-track flex w-max items-center gap-10 py-4 sm:gap-14 sm:py-5">
            {row.map((item, i) => (
              <LogoMark key={`${item.name}-${i}`} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
