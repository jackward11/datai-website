#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, '..', 'dist')
const indexPath = path.join(distDir, 'index.html')

const HOME = {
  title: 'DATAI — Automating The Complex',
  meta: 'DATAI — Automate the work slowing down your business to unlock real ROI. AI automation for construction, recruitment, insurance, care and property.',
}

const SALES = [
  {
    dir: 'iso-19650',
    title: 'ISO 19650 data validation for AEC teams | DATAI',
    meta: 'Automate naming, metadata and CDE checks so delivery teams catch it before issue. Free 30-minute workflow audit.',
  },
  {
    dir: 'care',
    title: 'CQC evidence packs and rota automation | DATAI',
    meta: "Keep CQC evidence and rotas in one live set so you're not hunting PDFs the night before inspection.",
  },
  {
    dir: 'recruitment',
    title: 'UK agency CV and right-to-work automation | DATAI',
    meta: "Automate the chase and the audit trail so placements don't sit waiting on a share code. Built for UK agencies.",
  },
  {
    dir: 'partners',
    title: 'Partner with DATAI | Refer, build or white-label',
    meta: 'Refer, get paid to build, or white-label DATAI automations. n8n, Make, and custom AI workflows.',
  },
]

function escapeAttr(value) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
}

function injectMeta(html, { title, meta }) {
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(title)}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${escapeAttr(meta)}" />`,
    )
}

if (!fs.existsSync(indexPath)) {
  console.error('dist/index.html not found. Run vite build first.')
  process.exit(1)
}

const baseHtml = fs.readFileSync(indexPath, 'utf8')

fs.writeFileSync(indexPath, injectMeta(baseHtml, HOME))

for (const route of SALES) {
  const dir = path.join(distDir, route.dir)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), injectMeta(baseHtml, route))
  console.log(`prerendered /${route.dir}`)
}

console.log('Sales route HTML files written.')
