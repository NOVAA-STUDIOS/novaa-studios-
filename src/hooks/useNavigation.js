import { useNavigate } from 'react-router-dom'

export function useProjectNavigation() {
  const navigate = useNavigate()

  const startProject = () => navigate('/contact')

  const viewWork = (currentPath = '') => {
    if (currentPath === '/work') {
      // Already on work page — smooth scroll to projects
      const el = document.getElementById('featured-projects')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      navigate('/work')
    }
  }

  return { startProject, viewWork }
}