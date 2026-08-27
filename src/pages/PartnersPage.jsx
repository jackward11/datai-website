import PageMeta from '../components/PageMeta.jsx'
import PageCta from '../components/PageCta.jsx'
import Reveal, { Rule } from '../components/Reveal.jsx'

const tracks = [
  {
    ref: 'P-01',
    label: 'Refer',
    headline: 'Know someone drowning in admin?',
    pitch: 'One intro. We do the rest. You get a cut of every project we ship.',
    steps: [
      {
        title: 'Spot the pain',
        copy: 'A client, a supplier, a mate whose team is buried in manual work.',
      },
      {
        title: 'Make the intro',
        copy: 'One email or a warm handover. No hard sell.',
      },
      {
        title: 'Collect your cut',
        copy: '15% of the first project, then 10% of every project after for 12 months. Paid on invoice.',
      },
    ],
    footer: 'No targets, no lock-in, start with one intro.',
  },
  {
    ref: 'P-02',
    label: 'Build',
    headline: 'You build automations too?',
    pitch: 'We find the clients. You build. Paid per job. Rates agreed up front.',
    steps: [
      {
        title: 'Show your stack',
        copy: 'n8n, Make, and custom AI workflows — whatever you ship with.',
      },
      {
        title: 'Ship with us',
        copy: 'Your first build is on a real client. Our QA has your back before anything reaches them.',
      },
      {
        title: 'Scale',
        copy: 'You never chase clients. Do good work and the builds keep coming.',
      },
    ],
    footer: 'Paid per job · rates agreed up front.',
  },
  {
    ref: 'P-03',
    label: 'Sell',
    headline: 'Already got clients?',
    pitch: 'White-label DATAI automations. You keep the client, we own the build.',
    steps: [
      {
        title: 'Plug in',
        copy: 'White-label or co-branded. You choose how DATAI appears — or does not.',
      },
      {
        title: 'You sell, we deliver',
        copy: 'We never contact your client directly. You keep the relationship.',
      },
      {
        title: 'Recur',
        copy: 'Margin on every retainer, month after month, as clients add workflows.',
      },
    ],
    footer: 'Margin on every retainer · month after month.',
  },
]

function TrackCard({ track, index }) {
  return (
    <Reveal delay={index * 0.08} className="h-full">
      <article className="flex h-full flex-col border border-line bg-ink-soft">
        <div className="border-b border-line p-6 sm:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">
            {track.ref} / {track.label}
          </p>
          <h2 className="mt-4 text-xl font-bold tracking-tight sm:text-2xl">{track.headline}</h2>
          <p className="mt-3 leading-relaxed text-mist">{track.pitch}</p>
        </div>

        <ol className="flex flex-1 flex-col divide-y divide-line">
          {track.steps.map((step, i) => (
            <li key={step.title} className="flex gap-4 p-5 sm:p-6">
              <span className="font-mono text-xs text-gold">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <p className="font-semibold text-chalk">{step.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-mist">{step.copy}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className="border-t border-line px-5 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-mist sm:px-6">
          {track.footer}
        </p>
      </article>
    </Reveal>
  )
}

export default function PartnersPage() {
  return (
    <>
      <PageMeta
        title="Partner with DATAI | Refer, build or white-label"
        description="Refer, get paid to build, or white-label DATAI automations. n8n, Make, and custom AI workflows."
      />

      <section className="relative border-b border-line bg-ink-soft py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">Partners</p>
          </Reveal>
          <Rule className="mt-4" />

          <div className="mt-10 max-w-3xl">
            <Reveal delay={0.05}>
              <h1 className="text-3xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
                Partner with DATAI
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 text-lg leading-relaxed text-mist">
                Refer, get paid to build, or white-label. Three tracks with real numbers: Refer — 15% on the first project, then 10% for 12 months; Build — paid per job, we find the clients; Sell — white-label, you keep the client.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-mist">
                n8n, Make, and custom AI workflows. No targets, no lock-in.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-px border border-line bg-line lg:grid-cols-3">
            {tracks.map((track, i) => (
              <TrackCard key={track.ref} track={track} index={i} />
            ))}
          </div>
        </div>
      </section>

      <PageCta variant="partner" />
    </>
  )
}
