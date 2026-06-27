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

const SP = { duration:0.32, ease:[0.22,1,0.36,1] }

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

  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', fn)
    return () => document.removeEventListener('keydown', fn)
  }, [])

  const isActive = useCallback((href) => {
    if (href === '/') return pathname === '/'
    const base = href.split('#')[0]
    return base && pathname.startsWith(base) && base !== '/'
  }, [pathname])

  const go = useCallback((href) => {
    setOpen(false)
    if (href.includes('#')) {
      const [path, hash] = href.split('#')
      if (pathname !== (path || '/')) {
        navigate(path || '/')
        setTimeout(() => document.getElementById(hash)
          ?.scrollIntoView({ behavior:'smooth' }), 400)
      } else {
        document.getElementById(hash)?.scrollIntoView({ behavior:'smooth' })
      }
    } else {
      navigate(href)
      window.scrollTo({ top:0, behavior:'smooth' })
    }
  }, [pathname, navigate])

  return (
    <>
      {/* =============================================
          DESKTOP  ≥ 769 px
      ============================================= */}
      <motion.div
        className="desktop-nav"
        initial={{ y:-90, opacity:0 }}
        animate={{ y:0,   opacity:1 }}
        transition={{ duration:0.9, ease:[0.22,1,0.36,1], delay:0.06 }}
        style={{
          position:  'fixed',
          top:       '20px',
          left:      '50%',
          transform: 'translateX(-50%)',
          zIndex:    1000,
          width:     'min(96vw, 1440px)',
        }}
      >
        {/* Glass strip */}
        <div style={{
          height:               '74px',
          borderRadius:         '20px',
          display:              'flex',
          alignItems:           'center',
          justifyContent:       'space-between',
          padding:              '0 28px',
          background:           scrolled
            ? 'rgba(6,4,16,0.88)'
            : 'rgba(255,255,255,0.055)',
          backdropFilter:       'blur(28px) saturate(180%)',
          WebkitBackdropFilter: 'blur(28px) saturate(180%)',
          border:               '1px solid rgba(255,255,255,0.11)',
          boxShadow:            scrolled
            ? 'inset 0 1px 0 rgba(255,255,255,0.09), 0 24px 56px rgba(0,0,0,0.55)'
            : 'inset 0 1px 0 rgba(255,255,255,0.13), 0 12px 36px rgba(0,0,0,0.28)',
          transition:           'background 0.4s, box-shadow 0.4s',
          position:             'relative',
          overflow:             'visible',
        }}>
          {/* Shine line */}
          <div style={{
            position:'absolute', top:'1px', left:'5%', right:'5%',
            height:'1px', pointerEvents:'none', borderRadius:'999px',
            background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)',
          }}/>

          <Logo navigate={navigate}/>

          {/* Menu button + dropdown */}
          <div style={{ position:'relative', flexShrink:0 }}>
            <BurgerBtn open={open} setOpen={setOpen} size={52}/>
            <Dropdown
              open={open} setOpen={setOpen}
              links={LINKS} isActive={isActive}
              go={go} startProject={startProject}
              topOffset="calc(100% + 12px)"
            />
          </div>
        </div>
      </motion.div>

      {/* =============================================
          MOBILE  ≤ 768 px
      ============================================= */}
      <motion.header
        className="mobile-nav"
        initial={{ y:-60, opacity:0 }}
        animate={{ y:0,   opacity:1 }}
        transition={{ duration:0.7, ease:[0.22,1,0.36,1] }}
        style={{
          position:             'fixed',
          top:0, left:0, right:0,
          zIndex:               1000,
          height:               '60px',
          padding:              '0 16px',
          display:              'flex',
          alignItems:           'center',
          justifyContent:       'space-between',
          background:           scrolled ? 'rgba(6,4,18,0.93)' : 'rgba(8,6,22,0.80)',
          backdropFilter:       'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          borderBottom:         '1px solid rgba(255,255,255,0.08)',
          boxShadow:            '0 4px 24px rgba(0,0,0,0.4)',
          transition:           'background 0.4s',
        }}
      >
        <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', pointerEvents:'none', background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)' }}/>
        <Logo navigate={navigate} small/>
        <div style={{ position:'relative', flexShrink:0 }}>
          <BurgerBtn open={open} setOpen={setOpen} size={42}/>
          <Dropdown
            open={open} setOpen={setOpen}
            links={LINKS} isActive={isActive}
            go={go} startProject={startProject}
            topOffset="calc(100% + 8px)"
            mobileWidth
          />
        </div>
      </motion.header>
    </>
  )
}

/* ─────────────────────────────────────────
   LOGO
───────────────────────────────────────── */
function Logo({ navigate, small=false }) {
  const fs = small ? '1.25rem' : 'clamp(1.4rem, 2.2vw, 1.75rem)'
  return (
    <motion.button
      onClick={() => { navigate('/'); window.scrollTo({ top:0, behavior:'smooth' }) }}
      whileHover={{ scale:1.02 }}
      whileTap={{ scale:0.97 }}
      style={{
        background:'none', border:'none', cursor:'pointer',
        padding:0, display:'flex', flexDirection:'column',
        alignItems:'flex-start', gap:'3px', flexShrink:0,
        outline:'none',
      }}
    >
      {/* Wordmark row */}
      <div style={{ display:'flex', alignItems:'center', lineHeight:1 }}>
        <span style={{
          fontFamily: '"Syne", Inter, sans-serif',
          fontSize:   fs,
          fontWeight: 800,
          color:      '#ffffff',
          letterSpacing: '-1px',
          lineHeight: 1,
        }}>
          NOV
        </span>
        <span style={{
          fontFamily:           '"Syne", Inter, sans-serif',
          fontSize:             fs,
          fontWeight:           800,
          letterSpacing:        '-1px',
          lineHeight:           1,
          background:           'linear-gradient(135deg,#818cf8 0%,#a78bfa 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor:  'transparent',
          backgroundClip:       'text',
        }}>
          AA
        </span>
      </div>

      {/* Subtitle */}
      {!small && (
        <span style={{
          fontFamily:    'Inter, sans-serif',
          fontSize:      '0.44rem',
          fontWeight:    500,
          color:         'rgba(255,255,255,0.32)',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          lineHeight:    1,
          display:       'block',
          whiteSpace:    'nowrap',
        }}>
          DIGITAL SOLUTIONS
        </span>
      )}
    </motion.button>
  )
}

/* ─────────────────────────────────────────
   HAMBURGER BUTTON
───────────────────────────────────────── */
function BurgerBtn({ open, setOpen, size=52 }) {
  return (
    <motion.button
      onClick={() => setOpen(p => !p)}
      whileHover={{ scale:1.06, boxShadow:'0 0 22px rgba(99,102,241,0.4)' }}
      whileTap={{ scale:0.92 }}
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
      style={{
        width:                `${size}px`,
        height:               `${size}px`,
        borderRadius:         '14px',
        display:              'flex',
        flexDirection:        'column',
        alignItems:           'center',
        justifyContent:       'center',
        gap:                  '6px',          /* space between 3 lines */
        background:           open ? 'rgba(99,102,241,0.18)' : 'rgba(255,255,255,0.07)',
        backdropFilter:       'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border:               open
          ? '1px solid rgba(99,102,241,0.45)'
          : '1px solid rgba(255,255,255,0.12)',
        boxShadow:            'inset 0 1px 0 rgba(255,255,255,0.14), 0 4px 16px rgba(0,0,0,0.28)',
        cursor:               'pointer',
        outline:              'none',
        transition:           'background 0.3s, border 0.3s',
        padding:              0,
      }}
    >
      {/* Line 0 */}
      <motion.span
        animate={{
          rotate: open ? 45  : 0,
          y:      open ? 12  : 0,
        }}
        transition={{ duration:0.3, ease:[0.22,1,0.36,1] }}
        style={{ display:'block', width:'18px', height:'2px', borderRadius:'2px', background:'rgba(255,255,255,0.88)', flexShrink:0 }}
      />
      {/* Line 1 */}
      <motion.span
        animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }}
        transition={{ duration:0.25 }}
        style={{ display:'block', width:'13px', height:'2px', borderRadius:'2px', background:'rgba(255,255,255,0.88)', flexShrink:0, alignSelf:'flex-start', marginLeft:`${size/2 - 9 - 1}px` }}
      />
      {/* Line 2 */}
      <motion.span
        animate={{
          rotate: open ? -45 : 0,
          y:      open ? -12 : 0,
        }}
        transition={{ duration:0.3, ease:[0.22,1,0.36,1] }}
        style={{ display:'block', width:'18px', height:'2px', borderRadius:'2px', background:'rgba(255,255,255,0.88)', flexShrink:0 }}
      />
    </motion.button>
  )
}

/* ─────────────────────────────────────────
   DROPDOWN PANEL
───────────────────────────────────────── */
function Dropdown({ open, setOpen, links, isActive, go, startProject, topOffset='calc(100% + 12px)', mobileWidth=false }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="bd"
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            transition={{ duration:0.2 }}
            onClick={() => setOpen(false)}
            style={{ position:'fixed', inset:0, zIndex:1001 }}
          />

          {/* Panel */}
          <motion.div
            key="dd"
            role="menu"
            initial={{ opacity:0, y:-18, scale:0.96 }}
            animate={{ opacity:1, y:0,   scale:1    }}
            exit={{   opacity:0, y:-14,  scale:0.96 }}
            transition={SP}
            style={{
              position:             'absolute',
              top:                  topOffset,
              right:                0,
              width:                mobileWidth ? 'calc(100vw - 32px)' : '290px',
              zIndex:               1002,
              background:           'rgba(7,5,18,0.93)',
              backdropFilter:       'blur(36px) saturate(200%)',
              WebkitBackdropFilter: 'blur(36px) saturate(200%)',
              border:               '1px solid rgba(255,255,255,0.1)',
              borderRadius:         '20px',
              overflow:             'hidden',
              boxShadow:            '0 28px 72px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.11)',
            }}
          >
            {/* Purple shimmer */}
            <div style={{ height:'1px', background:'linear-gradient(90deg,transparent,rgba(99,102,241,0.75),transparent)' }}/>

            {/* Nav items */}
            <nav style={{ padding:'8px' }}>
              {links.map((link, i) => {
                const active = isActive(link.href)
                return (
                  <motion.button
                    key={link.label}
                    role="menuitem"
                    onClick={() => go(link.href)}
                    initial={{ opacity:0, y:-6 }}
                    animate={{ opacity:1,  y:0  }}
                    transition={{ delay:i*0.04, ...SP }}
                    whileHover={{ background:'rgba(255,255,255,0.07)' }}
                    whileTap={{ scale:0.98 }}
                    style={{
                      width:        '100%',
                      display:      'flex',
                      alignItems:   'center',
                      gap:          '13px',
                      padding:      '12px 13px',
                      borderRadius: '12px',
                      background:   active ? 'rgba(99,102,241,0.13)' : 'transparent',
                      border:       'none',
                      borderLeft:   active ? '2.5px solid #6366f1' : '2.5px solid transparent',
                      cursor:       'pointer',
                      textAlign:    'left',
                      fontFamily:   'Inter,sans-serif',
                      fontSize:     '0.95rem',
                      fontWeight:   active ? 600 : 400,
                      color:        active ? '#818cf8' : 'rgba(255,255,255,0.72)',
                      transition:   'all 0.2s ease',
                      minHeight:    '50px',
                      outline:      'none',
                    }}
                  >
                    <div style={{
                      width:          '34px',
                      height:         '34px',
                      borderRadius:   '9px',
                      flexShrink:     0,
                      display:        'flex',
                      alignItems:     'center',
                      justifyContent: 'center',
                      fontSize:       '1rem',
                      background:     active ? 'rgba(99,102,241,0.22)' : 'rgba(255,255,255,0.07)',
                      border:         active ? '1px solid rgba(99,102,241,0.38)' : '1px solid rgba(255,255,255,0.08)',
                      transition:     'all 0.2s ease',
                    }}>
                      {link.icon}
                    </div>

                    <span style={{ flex:1 }}>{link.label}</span>

                    {active && (
                      <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#6366f1', boxShadow:'0 0 8px rgba(99,102,241,0.8)', flexShrink:0 }}/>
                    )}
                  </motion.button>
                )
              })}
            </nav>

            {/* CTA */}
            <div style={{ padding:'2px 10px 12px' }}>
              <motion.button
                onClick={() => { setOpen(false); startProject() }}
                whileHover={{ scale:1.02, boxShadow:'0 0 26px rgba(99,102,241,0.45)' }}
                whileTap={{ scale:0.97 }}
                style={{
                  width:        '100%',
                  padding:      '13px',
                  borderRadius: '12px',
                  background:   'linear-gradient(135deg,#6366f1,#7c3aed)',
                  border:       '1px solid rgba(160,130,255,0.35)',
                  boxShadow:    'inset 0 1px 0 rgba(255,255,255,0.2)',
                  color:        '#fff',
                  fontFamily:   'Inter,sans-serif',
                  fontWeight:   700,
                  fontSize:     '0.95rem',
                  cursor:       'pointer',
                  transition:   'all 0.25s ease',
                  minHeight:    '48px',
                  outline:      'none',
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
}