import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect }    from 'react'
import ScrollProgress   from './components/ScrollProgress'
import Loader           from './components/Loader'
import Navbar           from './components/Navbar'
import Hero             from './components/Hero'
import Services         from './components/Services'
import About            from './components/About'
import Work             from './components/Work'
import Contact          from './components/Contact'
import Footer           from './components/Footer'
import WebDesign        from './pages/WebDesign'
import WebDevelopment   from './pages/WebDevelopment'
import Branding         from './pages/Branding'
import SEOMarketing     from './pages/SEOMarketing'
import CaseStudy        from './pages/CaseStudy'

/* ── Scroll to top on route change ── */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])
  return null
}

/* ── Fixed aurora background ── */
const Aurora = () => (
  <div style={{
    position:'fixed', inset:0, zIndex:0,
    background:'#060818', pointerEvents:'none',
  }}>
    <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 70% 60% at 8% 60%, rgba(120,40,200,0.55) 0%, transparent 60%)' }} />
    <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 60% 55% at 90% 35%, rgba(0,200,155,0.45) 0%, transparent 60%)' }} />
    <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 50% 45% at 50% 5%, rgba(50,80,220,0.3) 0%, transparent 55%)' }} />
    <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 40% 35% at 78% 85%, rgba(160,50,230,0.2) 0%, transparent 55%)' }} />
  </div>
)

/* ── Home page ── */
function HomePage() {
  return (
    <>
      <Loader />
      <main style={{ position:'relative', zIndex:1 }}>
        <Navbar />
        <Hero />
        <Services />
        <About />
        <Work />
        <Contact />
        <Footer />
      </main>
    </>
  )
}

/* ── Full Work page ── */
function WorkPage() {
  return (
    <main style={{ position:'relative', zIndex:1 }}>
      <Navbar />
      <Work />
      <Footer />
    </main>
  )
}

/* ── Full Contact page ── */
function ContactPage() {
  return (
    <main style={{ position:'relative', zIndex:1 }}>
      <Navbar />
      <Contact />
      <Footer />
    </main>
  )
}

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Aurora />
      <ScrollToTop />
      <Routes>
        {/* ── Main ── */}
        <Route path="/"                        element={<HomePage />}      />
        <Route path="/work"                    element={<WorkPage />}      />
        <Route path="/contact"                 element={<ContactPage />}   />

        {/* ── Service detail pages ── */}
        <Route path="/services/web-design"     element={<WebDesign />}     />
        <Route path="/services/web-development" element={<WebDevelopment />} />
        <Route path="/services/branding"       element={<Branding />}      />
        <Route path="/services/seo-marketing"  element={<SEOMarketing />}  />

        {/* ── Case study pages ── */}
        <Route path="/work/:slug"              element={<CaseStudy />}     />
      </Routes>
    </>
  )
}