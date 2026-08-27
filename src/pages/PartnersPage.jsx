import { Link } from 'react-router-dom'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'
import DocumentHead from '../components/DocumentHead.jsx'
import PartnerTracks from '../components/PartnerTracks.jsx'
import Reveal, { Rule } from '../components/Reveal.jsx'
import { getSalesPage } from '../data/salesPages.js'
import { SalesCta } from './SalesPage.jsx'

const page = getSalesPage('partners')

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-ink text-chalk">
      <DocumentHead title={page.title} description={page.meta} />
      <Nav />
      <main>
        <section className="relative overflow-hidden border-b border-line bg-ink-soft pt-24 pb-16 sm:pt-32 sm:pb-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(212,175,55,0.06),transparent_70%)]" aria-hidden />
          <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">Sales / partners</p>
            </Reveal>
            <Rule className="mt-4" />

            <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
              <div>
                <Reveal delay={0.05}>
                  <h1 className="text-3xl font-bold leading-[1.08] tracking-tight sm:text-5xl">{page.h1}</h1>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="mt-4 text-xl font-medium tracking-tight text-gold-bright sm:text-2xl">{page.sub}</p>
                </Reveal>
                <Reveal delay={0.15}>
                  <p className="mt-8 max-w-xl text-lg leading-relaxed text-mist">{page.body}</p>
                </Reveal>
              </div>
              <Reveal delay={0.2}>
                <p className="text-sm leading-relaxed text-mist lg:text-right">
                  Refer, get paid to build, or white-label DATAI automations. n8n, Make, and custom AI workflows.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="relative py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-gold">The offer</p>
              <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">Pick your track</h2>
              <p className="mt-3 max-w-xl text-mist">Refer, Build or Sell. Each track is a three-step pipeline with a clear payoff.</p>
            </Reveal>
            <Reveal delay={0.1} className="mt-10">
              <PartnerTracks />
            </Reveal>
          </div>
        </section>

        <SalesCta page={page} />

        <section className="border-t border-line py-10">
          <div className="mx-auto max-w-7xl px-5 text-center sm:px-8">
            <Link
              to="/"
              className="font-mono text-xs uppercase tracking-[0.2em] text-mist transition-colors hover:text-gold-bright"
            >
              ← Back to DATAI home
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
