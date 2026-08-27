import Nav from '../components/Nav.jsx'
import Hero from '../components/Hero.jsx'
import Automations from '../components/Automations.jsx'
import Sectors from '../components/Sectors.jsx'
import InteractivePipeline from '../components/InteractivePipeline.jsx'
import CallToAction from '../components/CallToAction.jsx'
import Testimonials from '../components/Testimonials.jsx'
import Footer from '../components/Footer.jsx'
import DocumentHead from '../components/DocumentHead.jsx'

const HOME_TITLE = 'DATAI — Automating The Complex'
const HOME_META =
  'DATAI — Automate the work slowing down your business to unlock real ROI. AI automation for construction, recruitment, insurance, care and property.'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-ink text-chalk">
      <DocumentHead title={HOME_TITLE} description={HOME_META} />
      <Nav />
      <main>
        <Hero />
        <Automations />
        <Sectors />
        <InteractivePipeline />
        <CallToAction />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}
