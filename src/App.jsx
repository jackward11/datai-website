import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import HomePage from './pages/HomePage.jsx'
import Iso19650Page from './pages/Iso19650Page.jsx'
import CarePage from './pages/CarePage.jsx'
import RecruitmentPage from './pages/RecruitmentPage.jsx'
import PartnersPage from './pages/PartnersPage.jsx'

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <ScrollToTop />
      <div className="min-h-screen bg-ink text-chalk">
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/iso-19650" element={<Iso19650Page />} />
            <Route path="/care" element={<CarePage />} />
            <Route path="/recruitment" element={<RecruitmentPage />} />
            <Route path="/partners" element={<PartnersPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
