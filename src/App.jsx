import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import SalesPage from './pages/SalesPage.jsx'
import PartnersPage from './pages/PartnersPage.jsx'
import { getSalesPage, SALES_ROUTE_PATHS } from './data/salesPages.js'

function SalesRoute({ slug }) {
  const page = getSalesPage(slug)
  if (!page) return <Navigate to="/" replace />
  return <SalesPage page={page} />
}

export default function App() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {SALES_ROUTE_PATHS.map((slug) => (
          <Route key={slug} path={`/${slug}`} element={<SalesRoute slug={slug} />} />
        ))}
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
