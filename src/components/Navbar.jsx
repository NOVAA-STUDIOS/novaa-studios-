import { useState, useEffect }      from 'react'
import { motion, AnimatePresence }   from 'framer-motion'
import { useNavigate, useLocation }  from 'react-router-dom'
import { useProjectNavigation }      from '../hooks/useNavigation'

const LINKS = [
  { label:'Home',     href:'/',          icon:'🏠' },
  { label:'About',    href:'/#about',    icon:'👤' },
  { label:'Services', href:'/#services', icon:'💼' },
  { label:'Portfolio',href:'/work',      icon:'📂' },
  { label:'Contact',  href:'/contact',   icon:'✉️' },
]

const ease = [0.22, 1, 0.36, 1]

const glassPanel = {
  background:           'rgba(8,6,22,0.82)',
  backdropFilter:       'blur(48px) saturate(200%) brightness(1.12)',
  WebkitBackdropFilter: 'blur(48px) saturate(200%) brightness(1.12)',
  border:               '1px solid rgba(255,255,255,0.09)',
}

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [open,      setOpen]      = useState(false)
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
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const isActive = (href) => {
    if (href === '/') return pathname === '/'
    const base = href.split('#')[0]
    return base && pathname.startsWith(base) && base !== '/'
  }

  const go = (href) => {
    setOpen(false)
    if (href.includes('#')) {
      const [path, hash] = href.split('#')
      if (pathname !== (path || '/')) {
        navigate(path || '/')
        setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior:'smooth' }), 420)
      } else {
        document.getElementById(hash)?.scrollIntoView({ behavior:'smooth' })
      }
    } else {
      navigate(href)
      window.scrollTo({ top:0, behavior:'smooth' })
    }
  }

  /* ── Hamburger button — shared ── */
  const HamburgerBtn = ({ size = 48 }) => (
    <motion.button
      onClick={() => setOpen(p => !p)}
      whileHover={{ scale:1.08, boxShadow:'0 0 20px rgba(99,102,241,0.35)' }}
      whileTap={{ scale:0.92 }}
      aria-label="Toggle menu"
      style={{
        width:`${size}px`, height:`${size}px`,
        borderRadius:'12px',
        display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center', gap:'5px',
        background:open ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.07)',
        backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
        border:open ? '1px solid rgba(99,102,241,0.45)' : '1px solid rgba(255,255,255,0.12)',
        boxShadow:'inset 0 1px 0 rgba(255,255,255,0.12), 0 4px 16px rgba(0,0,0,0.3)',
        cursor:'pointer', flexShrink:0, transition:'background 0.3s ease, border 0.3s ease',
      }}
    >
      {[0,1,2].map(i => (
        <motion.span key={i}
          animate={{
            rotate:  open&&i===0?45:open&&i===2?-45:0,
            y:       open&&i===0?10:open&&i===2?-10:0,
            opacity: open&&i===1?0:1,
            width:   i===1?(open?'18px':'12px'):'18px',
          }}
          transition={{ duration:0.3, ease }}
          style={{ display:'block', height:'1.5px', borderRadius:'2px', background:'rgba(255,255,255,0.85)', originX:'50%', originY:'50%' }}
        />
      ))}
    </motion.button>
  )

  /* ── Dropdown panel — shared ── */
  function DropPanel({ open, setOpen, isActive, go, startProject, topOffset, width }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="bd"
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            transition={{ duration:0.18 }}
            onClick={() => setOpen(false)}
            style={{ position:'fixed', inset:0, zIndex:1001, cursor:'default' }}
          />

          <motion.div
            key="panel"
            role="menu"
            initial={{ opacity:0, y:-20, scale:0.95, filter:'blur(4px)' }}
            animate={{ opacity:1, y:0,   scale:1,    filter:'blur(0px)' }}
            exit={{   opacity:0, y:-16,  scale:0.95, filter:'blur(4px)' }}
            transition={{ duration:0.34, ease:[0.22,1,0.36,1] }}
            style={{
              position:             'fixed',        /* fixed instead of absolute */
              top:                  '90px',         /* below navbar */
              right:                '16px',         /* always 16px from right edge */
              width:                'min(290px, calc(100vw - 32px))',
              zIndex:               1002,
              background:           'rgba(6,4,16,0.94)',
              backdropFilter:       'blur(40px) saturate(200%) brightness(1.08)',
              WebkitBackdropFilter: 'blur(40px) saturate(200%) brightness(1.08)',
              border:               '1px solid rgba(255,255,255,0.1)',
              borderRadius:         '22px',
              overflow:             'hidden',
              boxShadow:            '0 0 0 0.5px rgba(255,255,255,0.04), 0 24px 70px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.12)',
            }}
          >
            {/* Accent line */}
            <div style={{ height:'1px', background:'linear-gradient(90deg,transparent 5%,rgba(99,102,241,0.8) 50%,transparent 95%)' }}/>

            {/* Items */}
            <nav style={{ padding:'8px' }}>
              {LINKS.map((link, i) => {
                const active = isActive(link.href)
                return (
                  <motion.button
                    key={link.label}
                    role="menuitem"
                    onClick={() => go(link.href)}
                    initial={{ opacity:0, x:-8 }}
                    animate={{ opacity:1, x:0  }}
                    transition={{ delay:i*0.04, duration:0.26, ease:[0.22,1,0.36,1] }}
                    whileHover={{ background:'rgba(255,255,255,0.07)', x:3 }}
                    whileTap={{ scale:0.98 }}
                    style={{
                      width:'100%', display:'flex', alignItems:'center', gap:'14px',
                      padding:'13px 14px', borderRadius:'13px',
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
                    <div style={{
                      width:'36px', height:'36px', borderRadius:'10px', flexShrink:0,
                      display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.05rem',
                      background: active ? 'rgba(99,102,241,0.24)' : 'rgba(255,255,255,0.07)',
                      border: active ? '1px solid rgba(99,102,241,0.42)' : '1px solid rgba(255,255,255,0.09)',
                      boxShadow: active ? '0 0 14px rgba(99,102,241,0.25)' : 'none',
                      transition:'all 0.2s ease',
                    }}>
                      {link.icon}
                    </div>
                    <span style={{ flex:1 }}>{link.label}</span>
                    {active && (
                      <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#6366f1', boxShadow:'0 0 10px rgba(99,102,241,0.9)', flexShrink:0 }}/>
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
                  boxShadow:'inset 0 1px 0 rgba(255,255,255,0.22)',
                  color:'#fff', fontFamily:'Inter,sans-serif',
                  fontWeight:700, fontSize:'0.95rem', cursor:'pointer',
                  transition:'all 0.25s ease', minHeight:'50px', outline:'none',
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

  return (
    <>
      {/* ══════════════════════════════════════
          DESKTOP ≥769px — full-width glass strip
      ══════════════════════════════════════ */}
      <motion.header
        initial={{ y:-80, opacity:0 }}
        animate={{ y:0, opacity:1 }}
        transition={{ duration:0.8, ease, delay:0.08 }}
        className="desktop-nav"
        style={{
          position:'fixed', top:0, left:0, right:0, zIndex:1000,
          padding:'0 clamp(16px,3vw,32px)',
          height:'clamp(64px,6vw,80px)',
          display:'flex', alignItems:'center', justifyContent:'space-between',
          ...glassPanel,
          borderLeft:'none', borderRight:'none', borderTop:'none',
          borderBottom:'1px solid rgba(255,255,255,0.08)',
          background: scrolled ? 'rgba(6,4,18,0.94)' : 'rgba(8,6,22,0.82)',
          boxShadow: scrolled
            ? 'inset 0 -1px 0 rgba(255,255,255,0.04), 0 8px 40px rgba(0,0,0,0.55)'
            : 'inset 0 -1px 0 rgba(255,255,255,0.03), 0 4px 24px rgba(0,0,0,0.35)',
          transition:'background 0.4s ease, box-shadow 0.4s ease',
        }}
      >
        {/* Inner shine */}
        <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg,transparent 5%,rgba(255,255,255,0.15) 30%,rgba(255,255,255,0.22) 50%,rgba(255,255,255,0.15) 70%,transparent 95%)', pointerEvents:'none' }} />

        {/* Logo */}
        <Logo navigate={navigate} />

        {/* Hamburger — desktop */}
        <div style={{ position:'relative' }}>
          <HamburgerBtn size={48} />
          <DropdownPanel topOffset="calc(100% + 12px)" rightOffset={0} />
        </div>
      </motion.header>

      {/* ══════════════════════════════════════
          MOBILE ≤768px — full-width strip
      ══════════════════════════════════════ */}
      <motion.header
        initial={{ y:-60, opacity:0 }}
        animate={{ y:0, opacity:1 }}
        transition={{ duration:0.7, ease }}
        className="mobile-nav"
        style={{
          position:'fixed', top:0, left:0, right:0, zIndex:1000,
          height:'60px', padding:'0 16px',
          display:'flex', alignItems:'center', justifyContent:'space-between',
          ...glassPanel,
          borderLeft:'none', borderRight:'none', borderTop:'none',
          borderBottom:'1px solid rgba(255,255,255,0.08)',
          background: scrolled ? 'rgba(6,4,18,0.94)' : 'rgba(8,6,22,0.82)',
          boxShadow:'0 4px 20px rgba(0,0,0,0.4)',
          transition:'background 0.4s ease',
        }}
      >
        <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)', pointerEvents:'none' }} />
        <Logo navigate={navigate} small />
        <div style={{ position:'relative' }}>
          <HamburgerBtn size={42} />
          <DropdownPanel topOffset="calc(100% + 8px)" rightOffset={0} />
        </div>
      </motion.header>
    </>
  )
}

/* ── Logo ── */
function Logo({ navigate, small=false }) {
  const fs = small ? '1.3rem' : 'clamp(1.4rem,3vw,1.8rem)'
  return (
    <motion.div onClick={() => navigate('/')} whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}
      style={{ display:'flex', flexDirection:'column', gap:'2px', cursor:'pointer', userSelect:'none', flexShrink:0 }}>
      <div style={{ display:'flex', alignItems:'baseline', lineHeight:1 }}>
        <span style={{ fontFamily:'"Syne",Inter,sans-serif', fontSize:fs, fontWeight:800, color:'#fff', letterSpacing:'-1px', lineHeight:1 }}>NOV</span>
        <span style={{ fontFamily:'"Syne",Inter,sans-serif', fontSize:fs, fontWeight:800, letterSpacing:'-1px', lineHeight:1, background:'linear-gradient(135deg,#818cf8,#a78bfa,#7c3aed)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>AA</span>
      </div>
      <span style={{ fontSize:'0.42rem', fontWeight:500, color:'rgba(255,255,255,0.28)', letterSpacing:'3px', textTransform:'uppercase', lineHeight:1 }}>
        DIGITAL SOLUTIONS
      </span>
    </motion.div>
  )
}