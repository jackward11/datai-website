import PageMeta from '../components/PageMeta.jsx'
import PageCta from '../components/PageCta.jsx'
import LandingBullets from '../components/LandingBullets.jsx'
import Reveal, { Rule } from '../components/Reveal.jsx'

const bullets = [
  'Rota and shift-fill automation',
  'Care note summarisation',
  'CQC evidence packs on demand',
  'Carers stay with the people they care for — admin happens in the background',
]

export default function CarePage() {
  return (
    <>
      <PageMeta
        title="CQC evidence packs and rota automation | DATAI"
        description="Keep CQC evidence and rotas in one live set so you're not hunting PDFs the night before inspection."
      />

      <section className="relative border-b border-line bg-ink-soft py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">Care sector</p>
          </Reveal>
          <Rule className="mt-4" />

          <div className="mt-10 max-w-3xl">
            <Reveal delay={0.05}>
              <h1 className="text-3xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
                CQC evidence packs and rota automation
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 text-lg leading-relaxed text-mist">
                CQC packs and rotas still get rebuilt by hand every cycle, then go stale the week after.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-mist">
                We keep the evidence and the rota in one live set so you&apos;re not hunting PDFs the night before inspection.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <div>
              <Reveal>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">What we do</p>
              </Reveal>
              <Rule className="mt-4" />
              <Reveal delay={0.08}>
                <p className="mt-6 leading-relaxed text-mist">
                  Rotas, care notes, medication logs and CQC evidence handled quietly in the background, so carers stay with the people they care for.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <LandingBullets items={bullets} accent="#c9a036" />
            </Reveal>
          </div>
        </div>
      </section>

      <PageCta />
    </>
  )
}
