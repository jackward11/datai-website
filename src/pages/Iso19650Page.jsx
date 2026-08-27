import PageMeta from '../components/PageMeta.jsx'
import PageCta from '../components/PageCta.jsx'
import LandingBullets from '../components/LandingBullets.jsx'
import Reveal, { Rule } from '../components/Reveal.jsx'

const bullets = [
  'ISO 19650 data validation workflows',
  'Information-container and CDE checks — naming and metadata',
  'Catch it before issue, not after the client has seen it',
  'Revit, Dynamo, documents and collaboration platforms',
  'Clash detection',
  'API development',
]

export default function Iso19650Page() {
  return (
    <>
      <PageMeta
        title="ISO 19650 data validation for AEC teams | DATAI"
        description="Automate naming, metadata and CDE checks so delivery teams catch it before issue. Free 30-minute workflow audit."
      />

      <section className="relative border-b border-line bg-ink-soft py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">Architecture, Engineering &amp; Construction</p>
          </Reveal>
          <Rule className="mt-4" />

          <div className="mt-10 max-w-3xl">
            <Reveal delay={0.05}>
              <h1 className="text-3xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
                ISO 19650 data validation for AEC teams
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 text-lg leading-relaxed text-mist">
                You&apos;re already proving ISO 19650 on live jobs. The bit that still breaks is the CDE: files named wrong, missing metadata, validation after the client has seen it.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-mist">
                We automate the check against the information standard so delivery teams catch it before issue.
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
                  Data automations for design and delivery teams — from ISO 19650 validation to custom tools that connect your models, documents and platforms.
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
