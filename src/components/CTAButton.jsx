import { motion }               from 'framer-motion'
import { useProjectNavigation } from '../hooks/useNavigation'

/**
 * Universal CTA Button
 * All "Start Your Project", "Let's Work Together", etc.
 * Route: /contact
 */
export default function CTAButton({
  children  = 'Start Your Project →',
  variant   = 'primary',
  size      = 'md',
  style     = {},
  className = '',
}) {
  const { startProject } = useProjectNavigation()

  const sizes = {
    sm: { padding: '9px 20px',  fontSize: '0.84rem' },
    md: { padding: '13px 28px', fontSize: '0.93rem' },
    lg: { padding: '15px 34px', fontSize: '1rem'    },
  }

  const variants = {
    primary: {
      background: 'linear-gradient(135deg,#7c3aed,#4f46e5)',
      border:     '1px solid rgba(150,80,255,0.4)',
      boxShadow:  'inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 24px rgba(100,40,200,0.35)',
      color:      '#fff',
    },
    secondary: {
      background: 'rgba(255,255,255,0.05)',
      border:     '1px solid rgba(255,255,255,0.12)',
      boxShadow:  'inset 0 1px 0 rgba(255,255,255,0.08)',
      color:      'rgba(255,255,255,0.8)',
    },
    blue: {
      background: 'rgba(10,132,255,0.25)',
      border:     '1px solid rgba(10,132,255,0.5)',
      boxShadow:  '0 8px 32px rgba(10,132,255,0.2)',
      color:      '#fff',
    },
    green: {
      background: 'linear-gradient(135deg,#25D366,#128C7E)',
      border:     '1px solid rgba(37,211,102,0.4)',
      boxShadow:  '0 4px 24px rgba(37,211,102,0.25)',
      color:      '#fff',
    },
  }

  return (
    <motion.button
      onClick={startProject}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={className}
      style={{
        display:        'inline-flex',
        alignItems:     'center',
        justifyContent: 'center',
        gap:            '8px',
        borderRadius:   '50px',
        fontFamily:     'Inter, sans-serif',
        fontWeight:     600,
        letterSpacing:  '0.2px',
        cursor:         'pointer',
        transition:     'all 0.3s ease',
        whiteSpace:     'nowrap',
        minHeight:      '44px',
        ...(sizes[size]    || sizes.md),
        ...(variants[variant] || variants.primary),
        ...style,
      }}
    >
      {children}
    </motion.button>
  )
}