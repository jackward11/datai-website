import Reveal, { Rule } from './Reveal.jsx'
import { contact, whatsappUrl } from '../config/contact.js'

export default function PageCta({ variant = 'discovery' }) {
  const isPartner = variant === 'partner'
  const whatsappMessage = isPartner
    ? contact.whatsappPartnerMessage
    : contact.whatsappDiscoveryMessage

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
              <h2 className="text-3xl font-bold leading-[1.05] tracking-tight sm:text-4xl">
                <Reveal>
                  {isPartner ? 'Every track starts with one conversation.' : 'Where do your hours go?'}
                </Reveal>
                <Reveal delay={0.12}>
                  <span className="gilded">
                    {isPartner ? 'Let\u2019s talk.' : 'Let\u2019s get them back.'}
                  </span>
                </Reveal>
              </h2>
              <Reveal delay={0.2}>
                <p className="mt-6 max-w-xl leading-relaxed text-mist sm:text-lg">
                  {isPartner
                    ? 'Book a discovery call and we\u2019ll walk through the track that fits — refer, build or sell. No hard sell, no lock-in.'
                    : 'Book a free 30-minute workflow audit. We\u2019ll map your biggest time drains, show you what automation would look like, and give you an honest ROI estimate — no obligation.'}
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.25}>
              <div className="flex flex-col gap-3">
                <a
                  href={`mailto:${contact.email}?subject=${encodeURIComponent(isPartner ? 'Partnership enquiry' : 'Workflow audit request')}`}
                  className="border border-gold bg-gold px-8 py-4 text-center font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink transition-colors hover:bg-transparent hover:text-gold"
                >
                  {isPartner ? 'Book a discovery call' : 'Book your free audit'}
                </a>
                {contact.whatsappContacts.map((person, i) => (
                  <a
                    key={person.number}
                    href={whatsappUrl(whatsappMessage, person.number)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`border border-line px-8 py-4 text-center font-mono text-xs font-medium uppercase tracking-[0.2em] text-chalk transition-colors hover:border-gold-deep${i === contact.whatsappContacts.length - 1 ? '' : ''}`}
                  >
                    WhatsApp · {person.name}
                  </a>
                ))}
                <a
                  href={`mailto:${contact.email}`}
                  className="border border-line/60 px-8 py-3 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-mist transition-colors hover:border-gold-deep hover:text-chalk"
                >
                  {contact.email}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
