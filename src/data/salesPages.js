export const SALES_PAGES = {
  'iso-19650': {
    path: '/iso-19650',
    title: 'ISO 19650 data validation for AEC teams | DATAI',
    meta: 'Automate naming, metadata and CDE checks so delivery teams catch it before issue. Free 30-minute workflow audit.',
    h1: 'ISO 19650 data validation for AEC teams',
    sub: null,
    body: "You're already proving ISO 19650 on live jobs. The bit that still breaks is the CDE: files named wrong, missing metadata, validation after the client has seen it. We automate the check against the information standard so delivery teams catch it before issue.",
    offerTitle: 'What we automate for design and delivery teams',
    offer: [
      'Naming and metadata checks against your information standard before issue',
      'CDE validation across models, documents and delivery platforms',
      'Drawing registers and revision control that stay current',
      'Revit, Dynamo and API hooks into clash detection and coordination tools',
      'Document control from tender to handover without the paper chase',
    ],
    ctaPrimary: 'Book your free audit',
    ctaSecondary: 'hello@datai.co.uk',
    mailSubject: 'Free 30-minute workflow audit (ISO 19650)',
    mailBody:
      "Hi DATAI,\n\nI'd like to book a free 30-minute workflow audit for ISO 19650 data validation.\n\nAutomate naming, metadata and CDE checks so delivery teams catch it before issue.",
    ctaCopy:
      'Book a free 30-minute workflow audit. We will map your CDE checks, show you what automation would look like, and give you an honest ROI estimate. No obligation.',
  },
  care: {
    path: '/care',
    title: 'CQC evidence packs and rota automation | DATAI',
    meta: "Keep CQC evidence and rotas in one live set so you're not hunting PDFs the night before inspection.",
    h1: 'CQC evidence packs and rota automation',
    sub: null,
    body: "CQC packs and rotas still get rebuilt by hand every cycle, then go stale the week after. We keep the evidence and the rota in one live set so you're not hunting PDFs the night before inspection.",
    offerTitle: 'What we automate for UK care providers',
    offer: [
      'Rota and shift-fill automation when sick calls land',
      'Care note summarisation from handwritten notes, voice memos and portal entries',
      'CQC evidence packs compiled on demand from policies, training and incident logs',
      'Medication logs and compliance registers kept current with expiry chasing',
      'Quiet background processing so carers stay with the people they care for',
    ],
    ctaPrimary: 'Book a discovery call',
    ctaSecondary: 'hello@datai.co.uk',
    mailSubject: 'CQC evidence and rota automation',
    mailBody:
      "Hi DATAI,\n\nI'd like to book a discovery call about CQC evidence packs and rota automation.\n\nKeep CQC evidence and rotas in one live set so we're not hunting PDFs the night before inspection.",
    ctaCopy:
      'Book a discovery call. We will map your evidence and rota workflows, show you what automation would look like, and give you an honest ROI estimate. No obligation.',
  },
  recruitment: {
    path: '/recruitment',
    title: 'UK agency CV and right-to-work automation | DATAI',
    meta: "Automate the chase and the audit trail so placements don't sit waiting on a share code. Built for UK agencies.",
    h1: 'UK agency CV and right-to-work automation',
    sub: null,
    body: "CV chasing and right-to-work evidence gets heavier from 1 Oct, not lighter. We automate the chase and the audit trail so placements don't sit waiting on a share code.",
    offerTitle: 'What we automate for UK recruitment agencies',
    offer: [
      'CV parsing and formatting into your branded template',
      'Right-to-work and reference chasing with a full audit trail',
      'ATS and job-board sync so replies land in one candidate view',
      'Candidates screened and compliance-checked before consultants pick up the phone',
      'Duplicate records merged and pipeline updated automatically',
    ],
    ctaPrimary: 'Book a discovery call',
    ctaSecondary: 'hello@datai.co.uk',
    mailSubject: 'UK agency CV and right-to-work automation',
    mailBody:
      "Hi DATAI,\n\nI'd like to book a discovery call about CV and right-to-work automation.\n\nAutomate the chase and the audit trail so placements don't sit waiting on a share code.",
    ctaCopy:
      'Book a discovery call. We will map your CV and compliance workflows, show you what automation would look like, and give you an honest ROI estimate. No obligation.',
  },
  partners: {
    path: '/partners',
    title: 'Partner with DATAI | Refer, build or white-label',
    meta: 'Refer, get paid to build, or white-label DATAI automations. n8n, Make, and custom AI workflows.',
    h1: 'Partner with DATAI',
    sub: 'Refer, build or white-label.',
    body: 'Three ways in. Pick the track that fits and watch how it plays out. Every one starts with a single conversation.',
    offerTitle: null,
    offer: null,
    ctaPrimary: 'Book a discovery call',
    ctaSecondary: 'hello@datai.co.uk',
    mailSubject: 'Partner with DATAI',
    mailBody:
      'Hi DATAI,\n\nI would like to book a discovery call about partnering with DATAI.\n\nRefer, get paid to build, or white-label DATAI automations. n8n, Make, and custom AI workflows.',
    ctaCopy:
      'Book a discovery call. Tell us whether you want to refer, build or white-label, and we will take it from there.',
  },
}

export const SALES_ROUTE_PATHS = Object.keys(SALES_PAGES).filter((slug) => slug !== 'partners')

export function getSalesPage(slug) {
  return SALES_PAGES[slug] ?? null
}

export function mailtoHref(page) {
  const subject = encodeURIComponent(page.mailSubject)
  const body = encodeURIComponent(page.mailBody)
  return `mailto:hello@datai.co.uk?subject=${subject}&body=${body}`
}
