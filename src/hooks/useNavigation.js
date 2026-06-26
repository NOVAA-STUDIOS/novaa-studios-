import { useNavigate, useLocation } from 'react-router-dom'

/**
 * NOVAA — Central Navigation Hook
 * Single source of truth for ALL navigation logic
 * No duplicates, no conflicts
 */
export function useProjectNavigation() {
  const navigate     = useNavigate()
  const { pathname } = useLocation()

  /** Navigate to /contact + scroll top */
  const startProject = () => {
    navigate('/contact')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  /** Navigate to /work OR smooth scroll if already there */
  const viewWork = () => {
    if (pathname === '/work') {
      document.getElementById('featured-projects')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      navigate('/work')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  /** See more projects → /work */
  const seeMoreProjects = () => {
    navigate('/work')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  /** Generic navigate + scroll top */
  const goTo = (path) => {
    navigate(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  /** Back — uses browser history, falls back to home */
  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  return {
    startProject,
    viewWork,
    seeMoreProjects,
    goTo,
    goBack,
    pathname,
  }
}