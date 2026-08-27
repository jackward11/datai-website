import { useEffect } from 'react'

export default function DocumentHead({ title, description }) {
  useEffect(() => {
    if (title) document.title = title

    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    if (description) meta.setAttribute('content', description)
  }, [title, description])

  return null
}
