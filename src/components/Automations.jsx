import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import WorkflowDiagram, { WORKFLOWS } from './WorkflowDiagram.jsx'

const EASE = [0.16, 1, 0.3, 1]

const categories = [
  {
    label: 'Data automations',
    ref: 'A-01',
    workflowId: 'data',
    accent: '#c9a036',
    headline: 'One source of truth, assembled while you sleep',
    copy: 'We extract, clean, reconcile and sync data across every system you run — dashboards stay live and reports build themselves.',
    examples: [
      'Document and invoice data extraction into your systems',
      'Cross-platform sync between CRM, finance and ops tools',
      'Live KPI dashboards with anomaly alerts',
      'Scheduled board packs and client reports, auto-compiled',
    ],
  },
  {
    label: 'Marketing',
    ref: 'A-02',
    workflowId: 'marketing',
    accent: '#f5dc8a',
    headline: 'Campaigns that write, send and learn on their own',
    copy: 'Content pipelines, lead magnets and nurture sequences that run continuously — your brand voice, our automation engine.',
    examples: [
      'AI-drafted email & social campaigns with approval gates',
      'Lead scoring and enrichment from every inbound touchpoint',
      'Review and referral requests triggered at the perfect moment',
      'Monthly performance reports compiled and narrated automatically',
    ],
  },
  {
    label: 'Sales',
    ref: 'A-03',
    workflowId: 'sales',
    accent: '#e8c258',
    headline: 'A pipeline that follows up so your team can close',
    copy: 'Every enquiry answered, qualified and booked in — no lead left cold because someone was busy on site or in a meeting.',
    examples: [
      'Instant enquiry response and qualification, 24/7',
      'CRM records created and updated from calls and emails',
      'Quote and proposal generation from your pricing rules',
      'Automated follow-up sequences until a decision is made',
    ],
  },
  {
    label: 'Finance',
    ref: 'A-04',
    workflowId: 'finance',
    accent: '#d4af37',
    headline: 'Books that close themselves — with you in control',
    copy: 'Invoices, expenses and bank feeds reconciled automatically. Exceptions land on your desk; everything else just runs.',
    examples: [
      'Invoice and receipt extraction into Xero, QuickBooks or Sage',
      'Bank reconciliation with anomaly flagging',
      'Month-end packs assembled and narrated for review',
      'Supplier payment runs with approval gates',
    ],
  },
  {
    label: 'Admin',
    ref: 'A-05',
    workflowId: 'admin',
    accent: '#a89030',
    headline: 'The back office, minus the busywork',
    copy: 'Inboxes triaged, diaries managed, documents filed and compliance evidenced — the invisible work that keeps a business running.',
    examples: [
      'Inbox triage with drafted replies awaiting your approval',
      'Meeting notes, actions and follow-ups captured automatically',
      'Onboarding packs generated for every new client or hire',
      'Compliance registers kept current with expiry chasing',
    ],
  },
]

function WorkflowVisual({ category }) {
  const config = WORKFLOWS[category.workflowId]

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={category.ref}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <WorkflowDiagram config={config} />
      </motion.div>
    </AnimatePresence>
  )
}

function CategoryPanel({ category }) {
  return (
    <>
      <p className="font-mono text-[11px] uppercase tracking-[0.25em]" style={{ color: category.accent }}>
        {category.ref} / {category.label}
      </p>
      <h3 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">{category.headline}</h3>
      <p className="mt-3 max-w-2xl leading-relaxed text-mist">{category.copy}</p>

      <ul className="mt-7 grid content-start gap-px border border-line bg-line sm:grid-cols-2">
        {category.examples.map((e, i) => (
          <li key={e} className="flex items-start gap-4 bg-ink-soft p-5">
            <span className="font-mono text-xs" style={{ color: category.accent }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="text-sm leading-relaxed text-chalk/90">{e}</span>
          </li>
        ))}
      </ul>
    </>
  )
}

export default function Automations() {
  const [active, setActive] = useState(0)
  const current = categories[active]

  return (
    <section id="automations" className="relative border-y border-line bg-ink-soft py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="01"
          eyebrow="What we build"
          title="Automations for every corner of your business"
          copy="Pick a workflow type — the diagram updates to show how that automation runs."
        />

        <Reveal className="mt-12 sm:mt-14">
          <div className="grid gap-px border border-line bg-line lg:grid-cols-[280px_1fr]">
            <div className="flex flex-col divide-y divide-line bg-ink">
              {categories.map((c, i) => (
                <button
                  key={c.label}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`relative flex flex-1 items-center gap-4 px-5 py-4 text-left transition-colors ${
                    i === active ? 'bg-panel' : 'hover:bg-panel/50'
                  }`}
                >
                  <span
                    className="absolute left-0 top-0 h-full w-[2px] transition-opacity"
                    style={{ background: c.accent, opacity: i === active ? 1 : 0 }}
                  />
                  <span className="font-mono text-[11px] text-mist">{c.ref}</span>
                  <span className={`text-sm font-semibold ${i === active ? 'text-chalk' : 'text-mist'}`}>
                    {c.label}
                  </span>
                  <span className="ml-auto font-mono text-xs" style={{ color: i === active ? c.accent : 'transparent' }}>
                    →
                  </span>
                </button>
              ))}
            </div>

            <div className="flex flex-col bg-ink">
              <div className="border-b border-line p-4 sm:p-6">
                <WorkflowVisual category={current} />
              </div>

              <div className="relative min-h-[16rem]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="flex h-full flex-col p-8 sm:p-10"
                  >
                    <CategoryPanel category={current} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
