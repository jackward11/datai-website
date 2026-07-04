import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'

const sectorImageModules = import.meta.glob('../../assets/Sector images/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const sectors = [
  {
    name: 'Construction',
    ref: 'SEC-01',
    copy: 'Site diaries, RFIs, snagging lists and subcontractor packs that file themselves. From tender to handover without the paper chase.',
    points: ['Automated site-to-office reporting', 'Document control & drawing registers', 'Subcontractor onboarding & compliance'],
    accent: '#f5dc8a',
    imageMatch: ['revit', 'dynamo', 'construction'],
  },
  {
    name: 'Recruitment',
    ref: 'SEC-02',
    copy: 'Candidates sourced, screened, formatted and compliance-checked before your consultants pick up the phone.',
    points: ['CV parsing & formatting', 'Right-to-work & reference chasing', 'ATS and job-board sync'],
    accent: '#e8c258',
    imageMatch: ['recruitment'],
  },
  {
    name: 'Insurance',
    ref: 'SEC-03',
    copy: 'From first notification of loss to a triaged, documented claim file in minutes — with underwriting data always up to date.',
    points: ['Claims intake & triage', 'Policy document extraction', 'Renewals & broker comms'],
    accent: '#d4af37',
    imageMatch: ['insurance'],
  },
  {
    name: 'Care sector',
    ref: 'SEC-04',
    copy: 'Rotas, care notes, medication logs and CQC evidence handled quietly in the background, so carers stay with the people they care for.',
    points: ['Rota & shift-fill automation', 'Care note summarisation', 'CQC evidence packs on demand'],
    accent: '#c9a036',
    imageMatch: ['care home', 'care'],
  },
  {
    name: 'Property',
    ref: 'SEC-05',
    copy: 'Lettings, sales progression and block management workflows that keep tenants, landlords and solicitors in sync automatically.',
    points: ['Tenancy referencing & onboarding', 'Maintenance ticket routing', 'Sales progression chasers'],
    accent: '#a89030',
    imageMatch: ['property'],
  },
  {
    name: 'Your sector next',
    ref: 'SEC-06',
    copy: 'If your team lives in spreadsheets, inboxes and portals, the playbook transfers. Tell us where the hours go and we will map the automation.',
    points: ['Free workflow audit', 'ROI model before you commit', 'Live in weeks, not quarters'],
    accent: '#7a5a18',
    imageMatch: ['your sector', 'sector next'],
    cta: true,
  },
]

function resolveSectorImage(matchTerms) {
  if (!matchTerms.length) return null
  for (const [path, src] of Object.entries(sectorImageModules)) {
    const file = path.toLowerCase()
    if (matchTerms.some((term) => file.includes(term))) return src
  }
  return null
}

function SectorPlaceholder({ sector }) {
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-panel to-ink"
      style={{ boxShadow: `inset 0 0 0 1px ${sector.accent}22` }}
    >
      <span
        className="font-mono text-3xl font-light"
        style={{ color: sector.accent }}
        aria-hidden
      >
        {sector.cta ? '+' : sector.ref.replace('SEC-', '')}
      </span>
      {!sector.cta && (
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-mist/60">Image coming soon</span>
      )}
    </div>
  )
}

function SectorCell({ sector, i }) {
  const imageSrc = resolveSectorImage(sector.imageMatch)

  return (
    <Reveal delay={(i % 3) * 0.08} className="h-full bg-ink">
      <article className="sector-card group relative flex h-full flex-col overflow-hidden">
        <div className="relative aspect-[5/4] overflow-hidden">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={sector.name}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <SectorPlaceholder sector={sector} />
          )}

          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 transition duration-500 group-hover:from-black/95"
            aria-hidden
          />

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 sm:p-6">
            <h3 className="text-xl font-bold tracking-tight text-chalk sm:text-2xl">{sector.name}</h3>
            <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.22em] text-mist/80">{sector.ref}</p>
          </div>

          <span
            className="absolute left-0 top-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full group-focus-within:w-full"
            style={{ background: sector.accent }}
            aria-hidden
          />
        </div>

        <div className="sector-card-details border-t border-line/60 bg-ink">
          <div className="sector-card-details-inner px-5 py-5 sm:px-6 sm:py-6">
            <p className="leading-relaxed text-mist">{sector.copy}</p>
            <ul className="mt-4 space-y-2 border-t border-line/50 pt-4">
              {sector.points.map((p) => (
                <li key={p} className="flex items-baseline gap-3 text-sm text-chalk/85">
                  <span className="font-mono text-xs" style={{ color: sector.accent }}>—</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </Reveal>
  )
}

export default function Sectors() {
  return (
    <section id="sectors" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          eyebrow="Sectors"
          title="Deep experience where admin hurts the most"
          copy="We have shipped automations inside these industries — hover a sector to see how we help."
        />

        <div className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((s, i) => (
            <SectorCell key={s.name} sector={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
