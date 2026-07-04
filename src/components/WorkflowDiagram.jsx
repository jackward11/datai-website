import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Table2,
  Mail,
  FileText,
  Globe,
  Smartphone,
  Cpu,
  UserCheck,
  Megaphone,
  Users,
  Share2,
  BarChart2,
  Send,
  TrendingUp,
  LineChart,
  MessageSquare,
  Phone,
  FileSpreadsheet,
  CalendarCheck,
  BadgeCheck,
  Receipt,
  CreditCard,
  Landmark,
  Calculator,
  Scale,
  PieChart,
  ShieldCheck,
  Calendar,
  FolderOpen,
  ClipboardList,
  Archive,
  Bell,
  Sparkles,
} from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1]

export const WORKFLOWS = {
  data: {
    id: 'data',
    headerEyebrow: 'How it flows',
    headerCopy: 'Every source lands in one engine. You approve. The work ships.',
    sourceLabel: 'Scattered in',
    outputLabel: 'Working out',
    stages: ['Connect', 'Extract', 'Act'],
    humanLine: 'You approve before anything goes out',
    footerLeft: 'One pipeline · every system',
    footerRight: 'Built for real businesses, not slide decks',
    engineIcon: Cpu,
    sources: [
      { label: 'Spreadsheets', icon: Table2 },
      { label: 'Inbox', icon: Mail },
      { label: 'PDFs & scans', icon: FileText },
      { label: 'Portals', icon: Globe },
      { label: 'Site apps', icon: Smartphone },
    ],
    outputs: [
      { label: 'Filed & synced', icon: Scale },
      { label: 'Drafts sent', icon: Send },
      { label: 'Reports out', icon: LineChart },
    ],
  },
  marketing: {
    id: 'marketing',
    headerEyebrow: 'Marketing flow',
    headerCopy: 'Every channel feeds one engine. You sign off. Campaigns ship on schedule.',
    sourceLabel: 'Channels in',
    outputLabel: 'Campaigns out',
    stages: ['Capture', 'Draft', 'Launch'],
    humanLine: 'You approve copy before anything goes live',
    footerLeft: 'Brand voice locked in · channels on autopilot',
    footerRight: 'Leads nurtured while you sleep',
    engineIcon: Sparkles,
    sources: [
      { label: 'Web forms', icon: Globe },
      { label: 'Email lists', icon: Mail },
      { label: 'Social feeds', icon: Share2 },
      { label: 'Ad platforms', icon: Megaphone },
      { label: 'CRM leads', icon: Users },
    ],
    outputs: [
      { label: 'Emails sent', icon: Send },
      { label: 'Social posted', icon: TrendingUp },
      { label: 'Performance tracked', icon: BarChart2 },
    ],
  },
  sales: {
    id: 'sales',
    headerEyebrow: 'Sales flow',
    headerCopy: 'Every enquiry answered instantly. You approve the quote. Deals land in the CRM.',
    sourceLabel: 'Enquiries in',
    outputLabel: 'Pipeline out',
    stages: ['Qualify', 'Quote', 'Close'],
    humanLine: 'You approve quotes before they reach the client',
    footerLeft: 'No lead left cold · 24/7 first response',
    footerRight: 'Your team closes — we chase',
    engineIcon: MessageSquare,
    sources: [
      { label: 'Web enquiries', icon: Globe },
      { label: 'Phone & SMS', icon: Phone },
      { label: 'Email inbox', icon: Mail },
      { label: 'Live chat', icon: MessageSquare },
      { label: 'Referrals', icon: Users },
    ],
    outputs: [
      { label: 'CRM updated', icon: BadgeCheck },
      { label: 'Quotes sent', icon: FileSpreadsheet },
      { label: 'Meetings booked', icon: CalendarCheck },
    ],
  },
  finance: {
    id: 'finance',
    headerEyebrow: 'Finance flow',
    headerCopy: 'Invoices, expenses and bank lines land in one place. You sign off. The books stay clean.',
    sourceLabel: 'Money in',
    outputLabel: 'Books out',
    stages: ['Ingest', 'Match', 'Report'],
    humanLine: 'You approve payments and exceptions only',
    footerLeft: 'Reconciliation on autopilot',
    footerRight: 'Month-end packs ready when you are',
    engineIcon: Calculator,
    sources: [
      { label: 'Invoices', icon: Receipt },
      { label: 'Receipts', icon: CreditCard },
      { label: 'Bank feeds', icon: Landmark },
      { label: 'Expense apps', icon: Smartphone },
      { label: 'Spreadsheets', icon: FileSpreadsheet },
    ],
    outputs: [
      { label: 'Books reconciled', icon: Scale },
      { label: 'Reports compiled', icon: PieChart },
      { label: 'Compliance filed', icon: ShieldCheck },
    ],
  },
  admin: {
    id: 'admin',
    headerEyebrow: 'Admin flow',
    headerCopy: 'Inboxes, diaries and documents handled in the background. You approve. The office runs itself.',
    sourceLabel: 'Requests in',
    outputLabel: 'Tasks done',
    stages: ['Triage', 'Draft', 'File'],
    humanLine: 'You approve replies before they send',
    footerLeft: 'Back office without the busywork',
    footerRight: 'Nothing slips through the cracks',
    engineIcon: ClipboardList,
    sources: [
      { label: 'Inbox', icon: Mail },
      { label: 'Calendar', icon: Calendar },
      { label: 'Shared drives', icon: FolderOpen },
      { label: 'Forms & PDFs', icon: FileText },
      { label: 'Team chat', icon: MessageSquare },
    ],
    outputs: [
      { label: 'Replied & sent', icon: Send },
      { label: 'Filed & archived', icon: Archive },
      { label: 'Reminders set', icon: Bell },
    ],
  },
}

function rowY(index, count, center = 210, gap = 68) {
  if (count <= 1) return center
  return center - ((count - 1) * gap) / 2 + index * gap
}

function FlowCard({ icon: Icon, label, delay, inView, side = 'left' }) {
  const x = side === 'left' ? -24 : 24
  return (
    <motion.div
      initial={{ opacity: 0, x }}
      animate={inView ? { opacity: 1, x: 0 } : undefined}
      transition={{ duration: 0.55, delay, ease: EASE }}
      className={`pipeline-card group flex items-center gap-3 px-4 py-3.5 sm:px-5 ${side === 'right' ? 'pipeline-card-right' : ''}`}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-gold/35 bg-gold/[0.06] transition-colors group-hover:border-gold/60 group-hover:bg-gold/10">
        <Icon className="h-[18px] w-[18px] text-gold-bright" strokeWidth={1.5} />
      </div>
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-chalk/90 sm:text-xs">{label}</span>
    </motion.div>
  )
}

function Connector({ d, delay, inView, gradId }) {
  return (
    <g>
      <motion.path
        d={d}
        fill="none"
        stroke="rgba(212,175,55,0.12)"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : undefined}
        transition={{ duration: 1, delay, ease: EASE }}
      />
      <motion.path
        d={d}
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth="2"
        strokeLinecap="round"
        className="pipeline-flow"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : undefined}
        transition={{ duration: 1, delay: delay + 0.15, ease: EASE }}
      />
    </g>
  )
}

export default function WorkflowDiagram({ config }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const gradId = `pipelineGold-${config.id}`
  const glowId = `pipelineGlow-${config.id}`
  const EngineIcon = config.engineIcon || Cpu

  const sourceYs = config.sources.map((_, i) => rowY(i, config.sources.length))
  const outputYs = config.outputs.map((_, i) => rowY(i, config.outputs.length, 210, 118))

  return (
    <div ref={ref} className="pipeline-shell relative overflow-hidden">
      <div className="pipeline-atmosphere pointer-events-none absolute inset-0" aria-hidden />
      <div className="pipeline-grid pointer-events-none absolute inset-0 opacity-[0.35]" aria-hidden />

      <div className="relative border-b border-line/50 px-5 py-4 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold">{config.headerEyebrow}</p>
            <p className="mt-1 max-w-md text-sm text-mist">{config.headerCopy}</p>
          </div>
          <div className="hidden items-center gap-6 font-mono text-[10px] uppercase tracking-[0.22em] text-mist/70 sm:flex">
            {config.stages.map((s, i) => (
              <span key={s} className="flex items-center gap-6">
                <span className={inView ? 'text-gold/90' : ''}>{s}</span>
                {i < config.stages.length - 1 && <span className="text-line">→</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative px-4 py-10 sm:px-6 sm:py-14 lg:px-10">
        <svg
          className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
          viewBox="0 0 1200 420"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7a5a18" />
              <stop offset="35%" stopColor="#f5dc8a" />
              <stop offset="65%" stopColor="#d4af37" />
              <stop offset="100%" stopColor="#7a5a18" />
            </linearGradient>
            <filter id={glowId}>
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {sourceYs.map((y, i) => (
            <Connector
              key={`s-${i}`}
              gradId={gradId}
              d={`M 248 ${y} C 320 ${y}, 360 210, 430 210`}
              delay={0.15 + i * 0.08}
              inView={inView}
            />
          ))}

          <Connector gradId={gradId} d="M 570 210 H 620" delay={0.75} inView={inView} />
          <Connector gradId={gradId} d="M 720 210 H 770" delay={0.9} inView={inView} />

          {outputYs.map((y, i) => (
            <Connector
              key={`o-${i}`}
              gradId={gradId}
              d={`M 770 210 C 820 210, 860 ${y}, 930 ${y}`}
              delay={1 + i * 0.1}
              inView={inView}
            />
          ))}

          {inView && (
            <circle r="4" fill="#f5dc8a" filter={`url(#${glowId})`}>
              <animateMotion
                dur="2.8s"
                repeatCount="indefinite"
                path="M 248 210 C 320 210, 360 210, 430 210 L 570 210 L 720 210 L 770 210 C 820 210, 860 210, 930 210"
              />
            </circle>
          )}
        </svg>

        <div className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-6">
          <div className="space-y-2.5">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.26em] text-mist/60 lg:pl-1">
              {config.sourceLabel}
            </p>
            {config.sources.map((s, i) => (
              <FlowCard key={s.label} {...s} delay={0.1 + i * 0.07} inView={inView} side="left" />
            ))}
          </div>

          <div className="relative flex flex-col items-center gap-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : undefined}
              transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
              className="pipeline-engine relative w-full max-w-sm px-6 py-8 text-center sm:px-8 sm:py-10"
            >
              <div className="absolute -inset-px rounded-sm bg-gradient-to-br from-gold-bright/40 via-gold/20 to-gold-deep/30 opacity-80" aria-hidden />
              <div className="relative bg-ink">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(245,220,138,0.12),transparent_70%)]" aria-hidden />
                <div className="relative">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center border border-gold/40 bg-gold/10">
                    <EngineIcon className="h-6 w-6 text-gold-bright" strokeWidth={1.5} />
                  </div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold/80">Core system</p>
                  <h3 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                    <span className="gilded">DATAI Engine</span>
                  </h3>
                  <div className="mt-5 flex flex-wrap justify-center gap-2">
                    {config.stages.map((stage) => (
                      <span
                        key={stage}
                        className="border border-gold/25 bg-gold/[0.06] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-gold-bright/90"
                      >
                        {stage}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
              animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
              transition={{ duration: 0.55, delay: 0.85, ease: EASE }}
              className="pipeline-human flex items-center gap-3 px-5 py-3.5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-gold-bright/50 bg-gold-bright/10">
                <UserCheck className="h-[18px] w-[18px] text-gold-bright" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold-bright">Human check</p>
                <p className="mt-0.5 text-sm text-chalk/80">{config.humanLine}</p>
              </div>
            </motion.div>
          </div>

          <div className="space-y-2.5">
            <p className="mb-4 text-right font-mono text-[10px] uppercase tracking-[0.26em] text-mist/60 lg:pr-1">
              {config.outputLabel}
            </p>
            {config.outputs.map((o, i) => (
              <FlowCard key={o.label} {...o} delay={1 + i * 0.08} inView={inView} side="right" />
            ))}
          </div>
        </div>
      </div>

      <div className="relative border-t border-line/50 px-5 py-4 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.2em]">
          <span className="text-mist/60">{config.footerLeft}</span>
          <span className="text-gold/70">{config.footerRight}</span>
        </div>
      </div>
    </div>
  )
}
