import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Automations from './components/Automations.jsx'
import Sectors from './components/Sectors.jsx'
import CallToAction from './components/CallToAction.jsx'
import Testimonials from './components/Testimonials.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-ink text-chalk">
      <Nav />
      <main>
        <Hero />
        <Automations />
        <Sectors />
        <CallToAction />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}
