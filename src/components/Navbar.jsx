import { useState, useEffect }      from 'react'
import { motion, AnimatePresence }   from 'framer-motion'
import { useNavigate, useLocation }  from 'react-router-dom'
import { useProjectNavigation }      from '../hooks/useNavigation'

const LINKS = [
  { label:'Home',     href:'/',          icon:'🏠' },
  { label:'About',    href:'/#about',    icon:'👤' },
  { label:'Services', href:'/#services', icon:'💼' },
  { label:'Work',     href:'/work',      icon:'📂' },
  { label:'Process',  href:'/#process',  icon:'⚙️' },
  { label:'Contact',  href:'/contact',   icon:'✉️' },
]

const ease = [0.22, 1, 0.36, 1]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [open,      setOpen]      = useState(false)
  const [hov,       setHov]       = useState(null)
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

  /* ── shared glass style ── */
  const glass = {
    background:           scrolled ? 'rgba(7,5,18,0.94)' : 'rgba(10,8,22,0.82)',
    backdropFilter:       'blur(48px) saturate(200%) brightness(1.1)',
    WebkitBackdropFilter: 'blur(48px) saturate(200%) brightness(1.1)',
    borderBottom:         '1px solid rgba(255,255,255,0.08)',
    boxShadow:            scrolled
      ? 'inset 0 -1px 0 rgba(255,255,255,0.04), 0 8px 32px rgba(0,0,0,0.5)'
      : 'inset 0 -1px 0 rgba(255,255,255,0.03), 0 4px 20px rgba(0,0,0,0.35)',
    transition:           'all 0.4s ease',
  }

  return (
    <>
      {/* ════════════════════════════════════
          DESKTOP — floating pill (≥769px)
      ════════════════════════════════════ */}
      <motion.div
        initial={{ y:-100, opacity:0 }}
        animate={{ y:0, opacity:1 }}
        transition={{ duration:1, ease, delay:0.08 }}
        className="desktop-nav"
        style={{
          position:'fixed', top:'20px', left:'50%',
          transform:'translateX(-50%)', zIndex:1000,
          width:'min(1180px,91vw)',
        }}
      >
        <div style={{
          height:'72px', borderRadius:'999px',
          display:'flex', alignItems:'center',
          padding:'0 14px 0 28px', justifyContent:'space-between',
          position:'relative', ...glass,
          borderBottom:'none',
          border:'1px solid rgba(255,255,255,0.09)',
          boxShadow: scrolled
            ? 'inset 0 1.5px 0 rgba(255,255,255,0.13),0 20px 60px rgba(0,0,0,0.65)'
            : 'inset 0 1.5px 0 rgba(255,255,255,0.12),0 12px 40px rgba(0,0,0,0.55)',
        }}>
          {/* Shine */}
          <div style={{ position:'absolute', top:'1px', left:'5%', right:'5%', height:'1px', background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)', pointerEvents:'none' }} />

          {/* Logo */}
          <Logo navigate={navigate} />

          {/* Center links */}
          <nav style={{ display:'flex', alignItems:'center', gap:'2px', position:'absolute', left:'50%', top:'50%', transform:'translate(-50%,-50%)' }}>
            {LINKS.map(link => {
              const active = isActive(link.href)
              return (
                <motion.button key={link.label} onClick={() => go(link.href)}
                  onHoverStart={() => setHov(link.label)} onHoverEnd={() => setHov(null)}
                  whileTap={{ scale:0.95 }}
                  style={{
                    position:'relative', padding:'8px 16px', background:'none',
                    border:'none', borderRadius:'999px', cursor:'pointer',
                    fontFamily:'Inter,sans-serif', fontSize:'0.875rem',
                    fontWeight:active?600:450,
                    color:active?'#818cf8':hov===link.label?'rgba(255,255,255,0.88)':'rgba(255,255,255,0.52)',
                    transition:'color 0.22s ease', whiteSpace:'nowrap',
                  }}>
                  <AnimatePresence>
                    {hov===link.label&&!active&&(
                      <motion.div initial={{ opacity:0,scale:0.88 }} animate={{ opacity:1,scale:1 }} exit={{ opacity:0,scale:0.88 }} transition={{ duration:0.18 }}
                        style={{ position:'absolute', inset:0, borderRadius:'999px', background:'rgba(255,255,255,0.06)', pointerEvents:'none' }} />
                    )}
                  </AnimatePresence>
                  {link.label}
                  {active && (
                    <motion.div layoutId="nav-dot"
                      style={{ position:'absolute', bottom:'5px', left:'50%', transform:'translateX(-50%)', width:'4px', height:'4px', borderRadius:'50%', background:'#818cf8', boxShadow:'0 0 8px rgba(129,140,248,0.9)' }}
                      transition={{ type:'spring', stiffness:520, damping:38 }} />
                  )}
                </motion.button>
              )
            })}
          </nav>

          {/* Let's Talk */}
          <motion.button onClick={startProject} whileHover={{ scale:1.05 }} whileTap={{ scale:0.96 }}
            style={{
              display:'inline-flex', alignItems:'center', gap:'8px', padding:'10px 22px',
              borderRadius:'999px', background:'linear-gradient(135deg,#6366f1,#7c3aed,#8b5cf6)',
              border:'1px solid rgba(160,130,255,0.35)',
              boxShadow:'inset 0 1.5px 0 rgba(255,255,255,0.22),0 0 28px rgba(99,102,241,0.35)',
              color:'#fff', fontFamily:'Inter,sans-serif', fontWeight:600,
              fontSize:'0.9rem', cursor:'pointer', whiteSpace:'nowrap', transition:'all 0.3s ease',
            }}>
            Let's Talk
            <motion.span animate={{ x:[0,4,0] }} transition={{ duration:1.6, repeat:Infinity, ease:'easeInOut' }}>→</motion.span>
          </motion.button>
        </div>
      </motion.div>

      {/* ════════════════════════════════════
          MOBILE — full-width strip (≤768px)
      ════════════════════════════════════ */}
      <motion.header
        initial={{ y:-60, opacity:0 }}
        animate={{ y:0, opacity:1 }}
        transition={{ duration:0.7, ease }}
        className="mobile-nav"
        style={{
          position:'fixed', top:0, left:0, right:0, zIndex:1000,
          height:'60px', paddingLeft:'env(safe-area-inset-left)',
          paddingRight:'env(safe-area-inset-right)',
          display:'flex', alignItems:'center',
          justifyContent:'space-between',
          padding:'0 16px',
          ...glass,
        }}
      >
        {/* Top shine */}
        <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)', pointerEvents:'none' }} />

        <Logo navigate={navigate} small />

        {/* Hamburger */}
        <motion.button
          onClick={() => setOpen(p=>!p)}
          whileTap={{ scale:0.9 }}
          aria-label="Toggle menu"
          style={{
            width:'42px', height:'42px', borderRadius:'10px',
            display:'flex', flexDirection:'column', alignItems:'center',
            justifyContent:'center', gap:'5px',
            background:open?'rgba(99,102,241,0.18)':'rgba(255,255,255,0.06)',
            border:open?'1px solid rgba(99,102,241,0.3)':'1px solid rgba(255,255,255,0.1)',
            cursor:'pointer', transition:'all 0.3s ease', flexShrink:0,
          }}>
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
      </motion.header>

      {/* ── Mobile Dropdown ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="bd"
              initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              transition={{ duration:0.25 }}
              onClick={() => setOpen(false)}
              style={{ position:'fixed', inset:0, zIndex:998, background:'rgba(0,0,0,0.4)', backdropFilter:'blur(4px)', WebkitBackdropFilter:'blur(4px)' }}
            />

            {/* Panel */}
            <motion.div
              key="panel"
              initial={{ opacity:0, y:-20 }}
              animate={{ opacity:1, y:0 }}
              exit={{   opacity:0, y:-16 }}
              transition={{ duration:0.38, ease }}
              style={{
                position:'fixed', top:'60px', left:0, right:0,
                zIndex:999, margin:'8px 12px 0',
                background:'rgba(8,6,20,0.96)',
                backdropFilter:'blur(48px) saturate(180%)',
                WebkitBackdropFilter:'blur(48px) saturate(180%)',
                border:'1px solid rgba(255,255,255,0.09)',
                borderRadius:'18px', overflow:'hidden',
                boxShadow:'0 24px 64px rgba(0,0,0,0.7),inset 0 1px 0 rgba(255,255,255,0.1)',
              }}
            >
              {/* Purple accent top */}
              <div style={{ height:'1px', background:'linear-gradient(90deg,transparent,rgba(99,102,241,0.7),transparent)' }} />

              <div style={{ padding:'8px' }}>
                {LINKS.map((link, i) => {
                  const active = isActive(link.href)
                  return (
                    <motion.button
                      key={link.label}
                      onClick={() => go(link.href)}
                      initial={{ opacity:0, y:-8 }}
                      animate={{ opacity:1, y:0 }}
                      transition={{ delay:i*0.04, duration:0.28, ease }}
                      whileHover={{ background:'rgba(255,255,255,0.07)' }}
                      whileTap={{ scale:0.98, background:'rgba(255,255,255,0.05)' }}
                      style={{
                        width:'100%', display:'flex', alignItems:'center', gap:'14px',
                        padding:'13px 14px', borderRadius:'12px',
                        background:active?'rgba(99,102,241,0.12)':'transparent',
                        border:'none',
                        borderLeft:active?'2.5px solid #6366f1':'2.5px solid transparent',
                        cursor:'pointer', textAlign:'left',
                        fontFamily:'Inter,sans-serif', fontSize:'1rem',
                        fontWeight:active?600:400,
                        color:active?'#818cf8':'rgba(255,255,255,0.72)',
                        transition:'all 0.2s ease', minHeight:'52px',
                      }}>
                      {/* Icon box */}
                      <div style={{
                        width:'36px', height:'36px', borderRadius:'10px', flexShrink:0,
                        display:'flex', alignItems:'center', justifyContent:'center',
                        fontSize:'1.05rem',
                        background:active?'rgba(99,102,241,0.22)':'rgba(255,255,255,0.07)',
                        border:active?'1px solid rgba(99,102,241,0.4)':'1px solid rgba(255,255,255,0.09)',
                      }}>
                        {link.icon}
                      </div>
                      {link.label}
                      {active && (
                        <motion.span initial={{ opacity:0 }} animate={{ opacity:1 }}
                          style={{ marginLeft:'auto', fontSize:'0.75rem', color:'#818cf8' }}>●</motion.span>
                      )}
                    </motion.button>
                  )
                })}
              </div>

              {/* Let's Talk CTA */}
              <div style={{ padding:'4px 16px 14px' }}>
                <motion.button onClick={() => { setOpen(false); startProject() }}
                  whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}
                  style={{
                    width:'100%', padding:'14px', borderRadius:'12px',
                    background:'linear-gradient(135deg,#6366f1,#7c3aed)',
                    border:'1px solid rgba(150,100,255,0.4)',
                    boxShadow:'inset 0 1px 0 rgba(255,255,255,0.18),0 4px 20px rgba(99,102,241,0.3)',
                    color:'#fff', fontFamily:'Inter,sans-serif',
                    fontWeight:700, fontSize:'1rem', cursor:'pointer',
                    transition:'all 0.25s ease', minHeight:'50px',
                    letterSpacing:'0.2px',
                  }}>
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

/* ── Reusable Logo ── */
function Logo({ navigate, small=false }) {
  const size = small ? '1.35rem' : '1.9rem'
  return (
    <motion.div onClick={() => navigate('/')} whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}
      style={{ display:'flex', flexDirection:'column', gap:'2px', cursor:'pointer', userSelect:'none', flexShrink:0 }}>
      <div style={{ display:'flex', alignItems:'baseline', lineHeight:1 }}>
        <span style={{ fontFamily:'"Syne",Inter,sans-serif', fontSize:size, fontWeight:800, color:'#fff', letterSpacing:'-1px', lineHeight:1 }}>NOV</span>
        <span style={{ fontFamily:'"Syne",Inter,sans-serif', fontSize:size, fontWeight:800, letterSpacing:'-1px', lineHeight:1, background:'linear-gradient(135deg,#818cf8,#a78bfa,#7c3aed)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>AA</span>
      </div>
      {!small && <span style={{ fontSize:'0.42rem', fontWeight:500, color:'rgba(255,255,255,0.28)', letterSpacing:'3px', textTransform:'uppercase' }}>DIGITAL SOLUTIONS</span>}
    </motion.div>
  )
}