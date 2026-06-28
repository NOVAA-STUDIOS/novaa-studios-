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

const SP = [0.22, 1, 0.36, 1]

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
        setTimeout(() =>
          document.getElementById(hash)?.scrollIntoView({ behavior:'smooth' }), 400)
      } else {
        document.getElementById(hash)?.scrollIntoView({ behavior:'smooth' })
      }
    } else {
      navigate(href)
      window.scrollTo({ top:0, behavior:'smooth' })
    }
  }, [pathname, navigate])

  const navBg = scrolled ? 'rgba(5,3,14,0.92)' : 'rgba(255,255,255,0.055)'
  const navShadow = scrolled
    ? 'inset 0 1px 0 rgba(255,255,255,0.09), 0 20px 60px rgba(0,0,0,0.55)'
    : 'inset 0 1px 0 rgba(255,255,255,0.14), 0 8px 32px rgba(0,0,0,0.25)'

  return (
    <>
      {/* ══════════════════════════════
          DESKTOP ≥ 769px
      ══════════════════════════════ */}
      <motion.div
        className="desktop-nav"
        initial={{ y:-90, opacity:0 }}
        animate={{ y:0,   opacity:1 }}
        transition={{ duration:0.85, ease:SP, delay:0.06 }}
        style={{
  position:'fixed',
  top:'18px',
  left:'0',
  right:'0',
  width:'100%',
  padding:'0 20px',
  boxSizing:'border-box',
  zIndex:1000,
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
}}
      >
        <div style={{
          width:                '100%',
          maxWidth:             '100%',
          height:               '76px',
          borderRadius:         '20px',
          borderRadius:         '16px',
          display:              'flex',
          alignItems:           'center',
          justifyContent:       'space-between',
          padding:              '0 clamp(20px,2.5vw,36px)',
          background:           navBg,
          backdropFilter:       'blur(28px) saturate(180%) brightness(1.08)',
          WebkitBackdropFilter: 'blur(28px) saturate(180%) brightness(1.08)',
          border:               '1px solid rgba(255,255,255,0.11)',
          boxShadow:            navShadow,
          transition:           'background 0.4s, box-shadow 0.4s',
          position:             'relative',
          overflow:             'visible',
          
        }}>
          {/* Shine */}
          <div style={{
            position:'absolute', top:0, left:'4%', right:'4%',
            height:'1px', pointerEvents:'none',
            background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.28) 40%,rgba(255,255,255,0.28) 60%,transparent)',
            borderRadius:'999px',
          }}/>

          <LogoMark navigate={navigate}/>

          <BurgerBtn open={open} setOpen={setOpen} size={52}/>
        </div>
      </motion.div>

      {/* ══════════════════════════════
          MOBILE ≤ 768px
      ══════════════════════════════ */}
      <motion.header
        className="mobile-nav"
        initial={{ y:-60, opacity:0 }}
        animate={{ y:0,   opacity:1 }}
        transition={{ duration:0.7, ease:SP }}
        style={{
          position:'fixed', top:0, left:0, right:0,
          zIndex:1000, height:'62px', padding:'0 16px',
          display:'flex', alignItems:'center', justifyContent:'space-between',
          background:           navBg,
          backdropFilter:       'blur(36px) saturate(180%)',
          WebkitBackdropFilter: 'blur(36px) saturate(180%)',
          borderBottom:         '1px solid rgba(255,255,255,0.09)',
          boxShadow:            '0 4px 24px rgba(0,0,0,0.4)',
          transition:           'background 0.4s',
        }}
      >
        <div style={{
          position:'absolute', top:0, left:0, right:0, height:'1px',
          pointerEvents:'none',
          background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)',
        }}/>
        <LogoMark navigate={navigate} small/>
        <BurgerBtn open={open} setOpen={setOpen} size={44}/>
      </motion.header>

      {/* ══════════════════════════════
          DROPDOWN — fixed position
          always inside viewport
      ══════════════════════════════ */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="bd"
              initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              transition={{ duration:0.18 }}
              onClick={() => setOpen(false)}
              style={{ position:'fixed', inset:0, zIndex:1001, cursor:'default' }}
            />

            {/* Panel */}
            <motion.div
              key="panel"
              role="menu"
              initial={{ opacity:0, y:-18, scale:0.95, filter:'blur(6px)' }}
              animate={{ opacity:1, y:0,   scale:1,    filter:'blur(0px)' }}
              exit={{   opacity:0, y:-14,  scale:0.95, filter:'blur(6px)' }}
              transition={{ duration:0.34, ease:SP }}
              style={{
                /* Fixed so it never overflows screen edges */
                position:             'fixed',
                top:                  'clamp(72px, 10vw, 100px)',
                right:                'clamp(12px, 2vw, 24px)',
                width:                'min(290px, calc(100vw - 24px))',
                zIndex:               1002,
                background:           'rgba(6,4,16,0.94)',
                backdropFilter:       'blur(40px) saturate(200%) brightness(1.1)',
                WebkitBackdropFilter: 'blur(40px) saturate(200%) brightness(1.1)',
                border:               '1px solid rgba(255,255,255,0.1)',
                borderRadius:         '22px',
                overflow:             'hidden',
                boxShadow: [
                  '0 0 0 0.5px rgba(255,255,255,0.04)',
                  '0 24px 70px rgba(0,0,0,0.7)',
                  '0 8px 24px rgba(0,0,0,0.4)',
                  'inset 0 1px 0 rgba(255,255,255,0.13)',
                ].join(','),
              }}
            >
              {/* Purple accent */}
              <div style={{
                height:'1px',
                background:'linear-gradient(90deg,transparent 5%,rgba(99,102,241,0.85) 50%,transparent 95%)',
              }}/>

              {/* Nav items */}
              <nav style={{ padding:'8px' }}>
                {LINKS.map((link, i) => {
                  const active = isActive(link.href)
                  return (
                    <motion.button
                      key={link.label}
                      role="menuitem"
                      onClick={() => go(link.href)}
                      initial={{ opacity:0, x:-10 }}
                      animate={{ opacity:1, x:0   }}
                      transition={{ delay:i*0.045, duration:0.26, ease:SP }}
                      whileHover={{ background:'rgba(255,255,255,0.08)', x:4 }}
                      whileTap={{ scale:0.98 }}
                      style={{
                        width:'100%', display:'flex', alignItems:'center',
                        gap:'14px', padding:'13px 13px',
                        borderRadius:'13px',
                        background: active ? 'rgba(99,102,241,0.14)' : 'transparent',
                        border:'none',
                        borderLeft: active ? '2.5px solid #6366f1' : '2.5px solid transparent',
                        cursor:'pointer', textAlign:'left',
                        fontFamily:'Inter,sans-serif', fontSize:'0.95rem',
                        fontWeight: active ? 600 : 400,
                        color: active ? '#818cf8' : 'rgba(255,255,255,0.72)',
                        transition:'background 0.2s, color 0.2s',
                        minHeight:'52px', outline:'none',
                      }}
                    >
                      {/* Icon */}
                      <div style={{
                        width:'36px', height:'36px', borderRadius:'10px',
                        flexShrink:0, display:'flex', alignItems:'center',
                        justifyContent:'center', fontSize:'1.05rem',
                        background: active ? 'rgba(99,102,241,0.24)' : 'rgba(255,255,255,0.07)',
                        border: active
                          ? '1px solid rgba(99,102,241,0.42)'
                          : '1px solid rgba(255,255,255,0.09)',
                        boxShadow: active ? '0 0 14px rgba(99,102,241,0.25)' : 'none',
                        transition:'all 0.2s ease',
                      }}>
                        {link.icon}
                      </div>

                      <span style={{ flex:1 }}>{link.label}</span>

                      {active && (
                        <span style={{
                          width:'6px', height:'6px', borderRadius:'50%',
                          background:'#6366f1',
                          boxShadow:'0 0 10px rgba(99,102,241,0.9)',
                          flexShrink:0,
                        }}/>
                      )}
                    </motion.button>
                  )
                })}
              </nav>

              {/* CTA */}
              <div style={{ padding:'2px 10px 12px' }}>
                <motion.button
                  onClick={() => { setOpen(false); startProject() }}
                  whileHover={{ scale:1.02, boxShadow:'0 0 30px rgba(99,102,241,0.5)' }}
                  whileTap={{ scale:0.97 }}
                  style={{
                    width:'100%', padding:'14px', borderRadius:'13px',
                    background:'linear-gradient(135deg,#6366f1,#7c3aed)',
                    border:'1px solid rgba(160,130,255,0.4)',
                    boxShadow:'inset 0 1px 0 rgba(255,255,255,0.22),0 4px 20px rgba(99,102,241,0.32)',
                    color:'#fff', fontFamily:'Inter,sans-serif',
                    fontWeight:700, fontSize:'0.95rem',
                    cursor:'pointer', transition:'all 0.25s ease',
                    minHeight:'50px', outline:'none', letterSpacing:'0.2px',
                  }}
                >
                  Let's Talk →
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

/* ── Logo ── */
function LogoMark({ navigate, small=false }) {
  const fs = small ? '1.22rem' : 'clamp(1.35rem,2vw,1.7rem)'
  return (
    <button
      onClick={() => { navigate('/'); window.scrollTo({ top:0, behavior:'smooth' }) }}
      style={{
        background:'none', border:'none', cursor:'pointer',
        padding:0, outline:'none', flexShrink:0,
        display:'flex', flexDirection:'column',
        alignItems:'flex-start', gap: small ? '2px' : '4px',
      }}
    >
      <div style={{ display:'flex', alignItems:'baseline', lineHeight:1 }}>
        <span style={{ fontFamily:'"Syne",Inter,sans-serif', fontSize:fs, fontWeight:800, color:'#ffffff', letterSpacing:'-1px', lineHeight:1 }}>NOV</span>
        <span style={{ fontFamily:'"Syne",Inter,sans-serif', fontSize:fs, fontWeight:800, letterSpacing:'-1px', lineHeight:1, background:'linear-gradient(130deg,#818cf8,#a78bfa)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>AA</span>
      </div>
      {!small && (
        <span style={{ fontFamily:'Inter,sans-serif', fontSize:'0.42rem', fontWeight:500, color:'rgba(255,255,255,0.3)', letterSpacing:'3.5px', textTransform:'uppercase', lineHeight:1, whiteSpace:'nowrap', display:'block' }}>
          DIGITAL SOLUTIONS
        </span>
      )}
    </button>
  )
}

/* ── Hamburger ── */
function BurgerBtn({ open, setOpen, size=52 }) {
  return (
    <motion.button
      onClick={() => setOpen(p => !p)}
      whileHover={{ scale:1.06, boxShadow:'0 0 24px rgba(99,102,241,0.45)' }}
      whileTap={{ scale:0.91 }}
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
      style={{
        width:`${size}px`, height:`${size}px`,
        borderRadius:'14px', display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center', gap:'5px',
        background: open ? 'rgba(99,102,241,0.18)' : 'rgba(255,255,255,0.07)',
        backdropFilter:'blur(16px)', WebkitBackdropFilter:'blur(16px)',
        border: open ? '1px solid rgba(99,102,241,0.5)' : '1px solid rgba(255,255,255,0.13)',
        boxShadow:'inset 0 1px 0 rgba(255,255,255,0.15),0 4px 16px rgba(0,0,0,0.28)',
        cursor:'pointer', outline:'none', padding:0, flexShrink:0,
        transition:'background 0.3s, border 0.3s',
      }}
    >
      <motion.span
        animate={ open ? { rotate:45,  y:10, width:'20px' } : { rotate:0, y:0, width:'20px' }}
        transition={{ duration:0.28, ease:[0.22,1,0.36,1] }}
        style={{ display:'block', height:'2px', borderRadius:'2px', background:'rgba(255,255,255,0.9)', flexShrink:0 }}
      />
      <motion.span
        animate={ open ? { opacity:0, scaleX:0.3 } : { opacity:1, scaleX:1 }}
        transition={{ duration:0.22 }}
        style={{ display:'block', width:'14px', height:'2px', borderRadius:'2px', background:'rgba(255,255,255,0.9)', flexShrink:0, alignSelf:'flex-start', marginLeft:`${(size-20)/2}px` }}
      />
      <motion.span
        animate={ open ? { rotate:-45, y:-10, width:'20px' } : { rotate:0, y:0, width:'20px' }}
        transition={{ duration:0.28, ease:[0.22,1,0.36,1] }}
        style={{ display:'block', height:'2px', borderRadius:'2px', background:'rgba(255,255,255,0.9)', flexShrink:0 }}
      />
    </motion.button>
  )
}