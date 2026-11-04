import { Route, Routes } from 'react-router-dom'
import { SiteLayout } from '@/layouts/SiteLayout'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Services from '@/pages/Services'
import ServiceDetail from '@/pages/ServiceDetail'
import Products from '@/pages/Products'
import Research from '@/pages/Research'
import Industries from '@/pages/Industries'
import Careers from '@/pages/Careers'
import Contact from '@/pages/Contact'
import Legal from '@/pages/Legal'
import NotFound from '@/pages/NotFound'
import { legalPages } from '@/data/legal'

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="services/:slug" element={<ServiceDetail />} />
        <Route path="products" element={<Products />} />
        <Route path="research" element={<Research />} />
        <Route path="industries" element={<Industries />} />
        <Route path="careers" element={<Careers />} />
        <Route path="contact" element={<Contact />} />
        {legalPages.map((p) => <Route key={p.path} path={p.path.slice(1)} element={<Legal />} />)}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
