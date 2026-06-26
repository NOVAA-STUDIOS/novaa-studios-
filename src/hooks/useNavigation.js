import { useNavigate, useLocation } from 'react-router-dom'

/**
 * Central navigation hook
 * startProject  → /contact
 * viewWork      → /work (or smooth scroll if already there)
 * goTo(path)    → any route
 */
export function useProjectNavigation() {
  const navigate     = useNavigate()
  const { pathname } = useLocation()
  

  const startProject = () => {
    navigate('/contact')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const viewWork = () => {
    if (pathname === '/work') {
      document.getElementById('featured-projects')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      navigate('/work')
    }
  }

  const goTo = (path) => {
    navigate(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return { startProject, viewWork, goTo, pathname }
}