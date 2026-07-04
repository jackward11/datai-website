# DATAI — Company Website

Marketing site for DATAI ("Automating The Complex") — AI automation for construction, recruitment, insurance, care and property.

## Stack

- Vite + React
- Tailwind CSS v4
- Framer Motion

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
```

## Where to customise

| Section | File | Notes |
| --- | --- | --- |
| Nav / logo | `src/components/Nav.jsx` | Logo image lives at `src/assets/logo-gold.png` |
| Hero | `src/components/Hero.jsx` | Swap the `<img>` inside `#hero-slot` for your own dynamic hero build |
| Method steps | `src/components/Strengths.jsx` | Six-step journey copy |
| Video testimonials | `src/components/Testimonials.jsx` | Paste embed URLs into the `videoUrl` fields |
| Sectors | `src/components/Sectors.jsx` | Sector cards and bullet points |
| Automation types | `src/components/Automations.jsx` | Tabbed categories and examples |
| CTA / Footer | `src/components/CallToAction.jsx`, `Footer.jsx` | Update `hello@datai.co.uk` to your real contact |

## Theme

Colours (warm black + dark gold) are defined as CSS variables in `src/index.css` under `@theme`. All testimonial names, quotes and stats are placeholders — replace before going live.
