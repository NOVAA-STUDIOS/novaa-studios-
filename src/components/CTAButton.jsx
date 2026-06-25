import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

/**
 * CTAButton — Universal project inquiry button
 * Every "Start Your Project", "Let's Talk", "Get Started" etc
 * routes to /contact via React Router (no page reload)
 */
export default function CTAButton({
  children      = 'Start Your Project →',
  variant       = 'primary',   // 'primary' | 'secondary' | 'ghost'
  size          = 'md',        // 'sm' | 'md' | 'lg'
  style         = {},
  className     = '',
  onClick       = null,
}) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (onClick) onClick()
    navigate('/contact')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  /* ── Size tokens ── */
  const sizes = {
    sm: { padding: '9px 20px',  fontSize: '0.84rem' },
    md: { padding: '13px 28px', fontSize: '0.93rem' },
    lg: { padding: '15px 34px', fontSize: '1rem'    },
  }

  /* ── Variant styles ── */
  const variants = {
    primary: {
      background:           'linear-gradient(135deg, #7c3aed, #4f46e5)',
      border:               '1px solid rgba(150,80,255,0.4)',
      boxShadow:            'inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 24px rgba(100,40,200,0.35)',
      color:                '#fff',
    },
    secondary: {
      background:           'rgba(255,255,255,0.05)',
      border:               '1px solid rgba(255,255,255,0.12)',
      boxShadow:            'inset 0 1px 0 rgba(255,255,255,0.08)',
      color:                'rgba(255,255,255,0.8)',
    },
    ghost: {
      background:           'transparent',
      border:               '1px solid rgba(255,255,255,0.15)',
      boxShadow:            'none',
      color:                'rgba(255,255,255,0.75)',
    },
    blue: {
      background:           'rgba(10,132,255,0.25)',
      border:               '1px solid rgba(10,132,255,0.5)',
      boxShadow:            '0 0 0 0.5px rgba(10,132,255,0.3) inset, 0 8px 32px rgba(10,132,255,0.2)',
      color:                '#fff',
    },
  }

  const vs = variants[variant] || variants.primary
  const sz = sizes[size]       || sizes.md

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{
        scale:     1.04,
        boxShadow: variant === 'primary'
          ? 'inset 0 1px 0 rgba(255,255,255,0.18), 0 0 36px rgba(120,60,220,0.5)'
          : variant === 'blue'
          ? '0 0 36px rgba(10,132,255,0.5)'
          : 'inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 20px rgba(0,0,0,0.3)',
      }}
      whileTap={{ scale: 0.97 }}
      className={className}
      style={{
        display:       'inline-flex',
        alignItems:    'center',
        justifyContent:'center',
        gap:           '8px',
        borderRadius:  '50px',
        fontFamily:    'Inter, sans-serif',
        fontWeight:    600,
        letterSpacing: '0.2px',
        cursor:        'pointer',
        transition:    'all 0.3s ease',
        whiteSpace:    'nowrap',
        minHeight:     '44px',
        ...sz,
        ...vs,
        ...style,
      }}
    >
      {children}
    </motion.button>
  )
}