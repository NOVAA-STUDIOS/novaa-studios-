import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence }           from 'framer-motion'
import { useNavigate, useLocation }          from 'react-router-dom'
import { useProjectNavigation }              from '../hooks/useNavigation'

const LINKS = [
  { label:'Home',      href:'/',          icon:'🏠' },
  { label:'About',     href:'/#about',    icon:'👤' },
  { label:'Services',  href:'/#services', icon:'💼' },
  { label:'Portfolio', href:'/work',      icon:'📂' },
  { label:'Contact',   href:'/contact',   icon:'✉️' },
]

const spring = { duration:0.32, ease:[0.22,1,0.36,1] }

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)
  const navigate         = useNavigate()
  const { pathname }     = useLocation()
  const { startProject } = useProjectNavigation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive:true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  /* ESC to close */
  useEffect(() => {
    const fn = (e) => { if (e.key==='Escape') setOpen(false) }
    document.addEventListener('keydown', fn)
    return () => document.removeEventListener('keydown', fn)
  }, [])

  /* Body lock */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const isActive = useCallback((href) => {
    if (href === '/') return pathname === '/'
    const base = href.split('#')[0]
    return base && pathname.startsWith(base) && base !== '/'
  }, [pathname])

  const go = useCallback((href) => {
    setOpen(false)
    if (href.includes('#')) {
      const [path, hash] = href.split('#')
      if (pathname !== (path||'/')) {
        navigate(path||'/')
        setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior:'smooth' }), 400)
      } else {
        document.getElementById(hash)?.scrollIntoView({ behavior:'smooth' })
      }
    } else {
      navigate(href)
      window.scrollTo({ top:0, behavior:'smooth' })
    }
  }, [pathname, navigate])

  /* ─────────────────────────────
     SHARED DROPDOWN
  ───────────────────────────── */
  const Dropdown = () => (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="bd"
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            transition={{ duration:0.2 }}
            onClick={() => setOpen(false)}
            style={{
              position:'fixed', inset:0, zIndex:1001,
            }}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            key="dd"
            role="menu"
            initial={{ opacity:0, y:-16, scale:0.96 }}
            animate={{ opacity:1, y:0,   scale:1    }}
            exit={{   opacity:0, y:-12,  scale:0.96 }}
            transition={spring}
            style={{
              position:             'absolute',
              top:                  'calc(100% + 12px)',
              right:                0,
              width:                '300px',
              zIndex:               1002,
              background:           'rgba(8,6,20,0.92)',
              backdropFilter:       'blur(32px) saturate(200%)',
              WebkitBackdropFilter: 'blur(32px) saturate(200%)',
              border:               '1px solid rgba(255,255,255,0.1)',
              borderRadius:         '22px',
              overflow:             'hidden',
              boxShadow:            '0 32px 80px rgba(0,0,0,0.7), 0 0 0 0.5px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.12)',
            }}
          >
            {/* Top shimmer */}
            <div style={{ height:'1px', background:'linear-gradient(90deg,transparent,rgba(99,102,241,0.8),transparent)' }} />

            {/* Items */}
            <nav style={{ padding:'10px' }}>
              {LINKS.map((link, i) => {
                const active = isActive(link.href)
                return (
                  <motion.button
                    key={link.label}
                    role="menuitem"
                    onClick={() => go(link.href)}
                    initial={{ opacity:0, y:-8 }}
                    animate={{ opacity:1,  y:0  }}
                    transition={{ delay:i*0.04, ...spring }}
                    whileHover={{ background:'rgba(255,255,255,0.07)' }}
                    whileTap={{ scale:0.98 }}
                    style={{
                      width:         '100%',
                      display:       'flex',
                      alignItems:    'center',
                      gap:           '14px',
                      padding:       '13px 14px',
                      borderRadius:  '13px',
                      background:    active ? 'rgba(99,102,241,0.14)' : 'transparent',
                      border:        'none',
                      borderLeft:    active ? '2.5px solid #6366f1' : '2.5px solid transparent',
                      cursor:        'pointer',
                      textAlign:     'left',
                      fontFamily:    'Inter,sans-serif',
                      fontSize:      '0.95rem',
                      fontWeight:    active ? 600 : 400,
                      color:         active ? '#818cf8' : 'rgba(255,255,255,0.72)',
                      transition:    'all 0.2s ease',
                      minHeight:     '52px',
                    }}
                  >
                    {/* Icon pill */}
                    <div style={{
                      width:          '36px',
                      height:         '36px',
                      borderRadius:   '10px',
                      flexShrink:     0,
                      display:        'flex',
                      alignItems:     'center',
                      justifyContent: 'center',
                      fontSize:       '1.05rem',
                      background:     active ? 'rgba(99,102,241,0.22)' : 'rgba(255,255,255,0.07)',
                      border:         active ? '1px solid rgba(99,102,241,0.4)' : '1px solid rgba(255,255,255,0.08)',
                      boxShadow:      active ? '0 0 12px rgba(99,102,241,0.2)' : 'none',
                      transition:     'all 0.2s ease',
                    }}>
                      {link.icon}
                    </div>

                    {link.label}

                    {active && (
                      <span style={{ marginLeft:'auto', width:'6px', height:'6px', borderRadius:'50%', background:'#6366f1', boxShadow:'0 0 8px rgba(99,102,241,0.8)', flexShrink:0 }} />
                    )}
                  </motion.button>
                )
              })}
            </nav>

            {/* CTA */}
            <div style={{ padding:'2px 12px 14px' }}>
              <motion.button
                onClick={() => { setOpen(false); startProject() }}
                whileHover={{ scale:1.02, boxShadow:'0 0 28px rgba(99,102,241,0.45)' }}
                whileTap={{ scale:0.97 }}
                style={{
                  width:        '100%',
                  padding:      '14px',
                  borderRadius: '13px',
                  background:   'linear-gradient(135deg,#6366f1 0%,#7c3aed 100%)',
                  border:       '1px solid rgba(160,130,255,0.35)',
                  boxShadow:    'inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 20px rgba(99,102,241,0.3)',
                  color:        '#fff',
                  fontFamily:   'Inter,sans-serif',
                  fontWeight:   700,
                  fontSize:     '0.95rem',
                  cursor:       'pointer',
                  transition:   'all 0.25s ease',
                  minHeight:    '50px',
                  letterSpacing:'0.2px',
                }}
              >
                Let's Talk →
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )

  /* ─────────────────────────────
     HAMBURGER BUTTON
  ───────────────────────────── */
  const MenuBtn = ({ size=52 }) => (
    <motion.button
      onClick={() => setOpen(p=>!p)}
      whileHover={{ scale:1.05, boxShadow:'0 0 24px rgba(99,102,241,0.4)' }}
      whileTap={{ scale:0.93 }}
      aria-label={open?'Close menu':'Open menu'}
      aria-expanded={open}
      style={{
        width:                `${size}px`,
        height:               `${size}px`,
        borderRadius:         '16px',
        display:              'flex',
        flexDirection:        'column',
        alignItems:           'center',
        justifyContent:       'center',
        gap:                  '5px',
        flexShrink:           0,
        background:           open ? 'rgba(99,102,241,0.18)' : 'rgba(255,255,255,0.07)',
        backdropFilter:       'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border:               open ? '1px solid rgba(99,102,241,0.45)' : '1px solid rgba(255,255,255,0.12)',
        boxShadow:            'inset 0 1px 0 rgba(255,255,255,0.14), 0 4px 16px rgba(0,0,0,0.3)',
        cursor:               'pointer',
        transition:           'background 0.3s ease, border 0.3s ease',
        outline:              'none',
      }}
    >
      {[0,1,2].map(i => (
        <motion.span
          key={i}
          animate={{
            rotate:  open&&i===0?45 : open&&i===2?-45 : 0,
            y:       open&&i===0?10 : open&&i===2?-10 : 0,
            opacity: open&&i===1?0  : 1,
            width:   i===1 ? (open?'18px':'12px') : '18px',
          }}
          transition={{ duration:0.3, ease:[0.22,1,0.36,1] }}
          style={{ display:'block', height:'1.5px', borderRadius:'2px', background:'rgba(255,255,255,0.88)', originX:'50%', originY:'50%' }}
        />
      ))}
    </motion.button>
  )

  /* ─────────────────────────────
     LOGO
  ───────────────────────────── */
  const LogoMark = ({ small=false }) => {
    const fs = small ? '1.3rem' : 'clamp(1.4rem,2.5vw,1.75rem)'
    return (
      <motion.div
        onClick={() => navigate('/')}
        whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}
        style={{ display:'flex', flexDirection:'column', gap:'3px', cursor:'pointer', userSelect:'none', flexShrink:0 }}
      >
        <div style={{ display:'flex', alignItems:'baseline', lineHeight:1 }}>
          <span style={{ fontFamily:'"Syne",Inter,sans-serif', fontSize:fs, fontWeight:800, color:'#fff', letterSpacing:'-1px' }}>NOV</span>
          <span style={{ fontFamily:'"Syne",Inter,sans-serif', fontSize:fs, fontWeight:800, letterSpacing:'-1px', background:'linear-gradient(135deg,#818cf8,#a78bfa)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>AA</span>
        </div>
        <span style={{ fontSize:'clamp(0.38rem,0.8vw,0.44rem)', fontWeight:500, color:'rgba(255,255,255,0.3)', letterSpacing:'clamp(2px,0.6vw,3.5px)', textTransform:'uppercase', lineHeight:1 }}>
          DIGITAL SOLUTIONS
        </span>
      </motion.div>
    )
  }

  /* ─────────────────────────────
     RENDER
  ───────────────────────────── */
  return (
    <>
      {/* ══════════════════════════════
          DESKTOP ≥769px
      ══════════════════════════════ */}
      <motion.div
        initial={{ y:-90, opacity:0 }}
        animate={{ y:0,   opacity:1 }}
        transition={{ duration:0.9, ease:[0.22,1,0.36,1], delay:0.06 }}
        className="desktop-nav"
        style={{
          position:  'fixed',
          top:       '20px',
          left:      '50%',
          transform: 'translateX(-50%)',
          zIndex:    1000,
          width:     '96vw',
          maxWidth:  '1440px',
        }}
      >
        {/* Glass strip */}
        <div
          style={{
            height:               '74px',
            borderRadius:         '22px',
            display:              'flex',
            alignItems:           'center',
            justifyContent:       'space-between',
            padding:              '0 clamp(20px,2.5vw,32px)',
            background:           scrolled
              ? 'rgba(6,4,16,0.92)'
              : 'rgba(255,255,255,0.06)',
            backdropFilter:       'blur(28px) saturate(180%) brightness(1.1)',
            WebkitBackdropFilter: 'blur(28px) saturate(180%) brightness(1.1)',
            border:               '1px solid rgba(255,255,255,0.12)',
            boxShadow:            scrolled
              ? 'inset 0 1px 0 rgba(255,255,255,0.1), 0 24px 60px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(255,255,255,0.03)'
              : 'inset 0 1px 0 rgba(255,255,255,0.14), 0 12px 40px rgba(0,0,0,0.35), 0 0 0 0.5px rgba(255,255,255,0.04)',
            transition:           'background 0.4s ease, box-shadow 0.4s ease',
            position:             'relative',
          }}
        >
          {/* Inner top shine */}
          <div style={{ position:'absolute', top:'1px', left:'6%', right:'6%', height:'1px', background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)', pointerEvents:'none', borderRadius:'999px' }} />

          <LogoMark />

          {/* Menu btn + dropdown wrapper */}
          <div style={{ position:'relative' }}>
            <MenuBtn size={52} />
            <Dropdown />
          </div>
        </div>
      </motion.div>

      {/* ══════════════════════════════
          MOBILE ≤768px  (unchanged)
      ══════════════════════════════ */}
      <motion.header
        initial={{ y:-60, opacity:0 }}
        animate={{ y:0,   opacity:1 }}
        transition={{ duration:0.7, ease:[0.22,1,0.36,1] }}
        className="mobile-nav"
        style={{
          position:             'fixed',
          top:0, left:0, right:0,
          zIndex:               1000,
          height:               '60px',
          padding:              '0 16px',
          display:              'flex',
          alignItems:           'center',
          justifyContent:       'space-between',
          background:           scrolled ? 'rgba(6,4,18,0.94)' : 'rgba(8,6,22,0.82)',
          backdropFilter:       'blur(48px) saturate(200%)',
          WebkitBackdropFilter: 'blur(48px) saturate(200%)',
          borderBottom:         '1px solid rgba(255,255,255,0.08)',
          boxShadow:            '0 4px 20px rgba(0,0,0,0.4)',
          transition:           'background 0.4s ease',
        }}
      >
        <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)', pointerEvents:'none' }} />
        <LogoMark small />
        <div style={{ position:'relative' }}>
          <MenuBtn size={42} />
          <Dropdown />
        </div>
      </motion.header>
    </>
  )
}