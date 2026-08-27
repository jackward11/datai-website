import PageMeta from '../components/PageMeta.jsx'
import PageCta from '../components/PageCta.jsx'
import LandingBullets from '../components/LandingBullets.jsx'
import Reveal, { Rule } from '../components/Reveal.jsx'

const bullets = [
  'CV parsing and formatting',
  'Right-to-work and reference chasing',
  'ATS and job-board sync',
  'End-to-end compliance',
]

export default function RecruitmentPage() {
  return (
    <>
      <PageMeta
        title="UK agency CV and right-to-work automation | DATAI"
        description="Automate the chase and the audit trail so placements don't sit waiting on a share code. Built for UK agencies."
      />

      <section className="relative border-b border-line bg-ink-soft py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">Recruitment</p>
          </Reveal>
          <Rule className="mt-4" />

          <div className="mt-10 max-w-3xl">
            <Reveal delay={0.05}>
              <h1 className="text-3xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
                UK agency CV and right-to-work automation
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 text-lg leading-relaxed text-mist">
                CV chasing and right-to-work evidence gets heavier from 1 Oct, not lighter.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-mist">
                We automate the chase and the audit trail so placements don&apos;t sit waiting on a share code.
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
                  Candidates sourced, screened, formatted and compliance-checked before your consultants pick up the phone. Built for UK agencies — with the 1 Oct right-to-work tightening in mind.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <LandingBullets items={bullets} accent="#e8c258" />
            </Reveal>
          </div>
        </div>
      </section>

      <PageCta />
    </>
  )
}
