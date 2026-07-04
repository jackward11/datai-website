import Reveal, { Rule } from './Reveal.jsx'

export default function CallToAction() {
  return (
    <section id="contact" className="draft-grid relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reg-marks border border-line bg-ink/80 p-8 backdrop-blur-sm sm:p-14">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">03 / Next step</p>
          </Reveal>
          <Rule className="mt-4" />

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end">
            <div>
              <h2 className="text-3xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
                <Reveal>Where do your hours go?</Reveal>
                <Reveal delay={0.12}>
                  <span className="gilded">Let&rsquo;s get them back.</span>
                </Reveal>
              </h2>
              <Reveal delay={0.2}>
                <p className="mt-6 max-w-xl leading-relaxed text-mist sm:text-lg">
                  Book a free 30-minute workflow audit. We&rsquo;ll map your biggest time
                  drains, show you what automation would look like, and give you an honest
                  ROI estimate — no obligation.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.25}>
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:hello@datai.co.uk"
                  className="border border-gold bg-gold px-8 py-4 text-center font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink transition-colors hover:bg-transparent hover:text-gold"
                >
                  Book your free audit
                </a>
                <a
                  href="mailto:hello@datai.co.uk"
                  className="border border-line px-8 py-4 text-center font-mono text-xs font-medium uppercase tracking-[0.2em] text-chalk transition-colors hover:border-gold-deep"
                >
                  hello@datai.co.uk
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
