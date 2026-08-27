import { Link } from 'react-router-dom'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'
import DocumentHead from '../components/DocumentHead.jsx'
import Reveal, { Rule } from '../components/Reveal.jsx'
import { mailtoHref } from '../data/salesPages.js'

function SalesCta({ page }) {
  const mailto = mailtoHref(page)

  return (
    <section id="contact" className="draft-grid relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reg-marks border border-line bg-ink/80 p-8 backdrop-blur-sm sm:p-14">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">Next step</p>
          </Reveal>
          <Rule className="mt-4" />

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end">
            <div>
              <Reveal delay={0.08}>
                <h2 className="text-2xl font-bold leading-[1.08] tracking-tight sm:text-4xl">
                  <span className="gilded">{page.h1}</span>
                </h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-6 max-w-xl leading-relaxed text-mist sm:text-lg">{page.ctaCopy}</p>
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <div className="flex flex-col gap-3">
                <a
                  href={mailto}
                  className="border border-gold bg-gold px-8 py-4 text-center font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink transition-colors hover:bg-transparent hover:text-gold"
                >
                  {page.ctaPrimary}
                </a>
                <a
                  href={mailto}
                  className="border border-line px-8 py-4 text-center font-mono text-xs font-medium uppercase tracking-[0.2em] text-chalk transition-colors hover:border-gold-deep"
                >
                  {page.ctaSecondary}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function SalesPage({ page }) {
  return (
    <div className="min-h-screen bg-ink text-chalk">
      <DocumentHead title={page.title} description={page.meta} />
      <Nav />
      <main>
        <section className="relative border-b border-line bg-ink-soft pt-24 pb-16 sm:pt-32 sm:pb-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">Sales / {page.path.replace('/', '')}</p>
            </Reveal>
            <Rule className="mt-4" />

            <div className="mt-10 max-w-3xl">
              <Reveal delay={0.05}>
                <h1 className="text-3xl font-bold leading-[1.08] tracking-tight sm:text-5xl">{page.h1}</h1>
              </Reveal>
              {page.sub && (
                <Reveal delay={0.1}>
                  <p className="mt-4 text-xl font-medium tracking-tight text-gold-bright sm:text-2xl">{page.sub}</p>
                </Reveal>
              )}
              <Reveal delay={0.15}>
                <p className="mt-8 text-lg leading-relaxed text-mist sm:text-xl">{page.body}</p>
              </Reveal>
            </div>
          </div>
        </section>

        {page.offer?.length > 0 && (
          <section className="relative py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              <Reveal>
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-gold">The offer</p>
                <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">{page.offerTitle}</h2>
              </Reveal>
              <ul className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2">
                {page.offer.map((item, i) => (
                  <Reveal key={item} delay={i * 0.06} className="bg-ink">
                    <li className="flex h-full items-start gap-4 p-5 sm:p-6">
                      <span className="font-mono text-xs text-gold">{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-sm leading-relaxed text-chalk/90 sm:text-base">{item}</span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </section>
        )}

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

export { SalesCta }
