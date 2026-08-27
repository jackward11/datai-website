import { useEffect } from 'react'

export default function PageMeta({ title, description }) {
  useEffect(() => {
    document.title = title

    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', description)

    return () => {
      document.title = 'DATAI — Automating The Complex'
      meta.setAttribute(
        'content',
        'DATAI — Automate the work slowing down your business to unlock real ROI. AI automation for construction, recruitment, insurance, care and property.',
      )
    }
  }, [title, description])

  return null
}
