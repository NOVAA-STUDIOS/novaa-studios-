import { useState, useEffect }     from 'react'
import { motion, AnimatePresence }  from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { useProjectNavigation }     from '../hooks/useNavigation'

const LINKS = [
  { label:'Home',     href:'/',          icon:'🏠' },
  { label:'About',    href:'/#about',    icon:'👤' },
  { label:'Services', href:'/#services', icon:'💼' },
  { label:'Work',     href:'/work',      icon:'📂' },
  { label:'Process',  href:'/#process',  icon:'⚙️' },
  { label:'Contact',  href:'/contact',   icon:'✉️' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)
  const [hov,      setHov]      = useState(null)
  const navigate       = useNavigate()
  const { pathname }   = useLocation()
  const { startProject } = useProjectNavigation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', fn, { passive:true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  /* Lock body scroll when menu open */
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

  return (
    <>
      {/* ── NAVBAR PILL ── */}
      <motion.div
        initial={{ y:-110, opacity:0 }}
        animate={{ y:0, opacity:1 }}
        transition={{ duration:1, ease:[0.22,1,0.36,1], delay:0.08 }}
        style={{
          position:'fixed', top:'clamp(10px,2vw,20px)',
          left:'50%', transform:'translateX(-50%)',
          zIndex:1000,
          width:'min(1180px,calc(100vw - 24px))',
        }}
      >
        <div style={{
          height:               'clamp(58px,8vw,72px)',
          borderRadius:         '999px',
          display:              'flex',
          alignItems:           'center',
          padding:              '0 clamp(10px,2vw,14px) 0 clamp(16px,3vw,28px)',
          justifyContent:       'space-between',
          background:           scrolled ? 'rgba(7,5,18,0.94)' : 'rgba(12,9,24,0.82)',
          backdropFilter:       'blur(48px) saturate(200%) brightness(1.12)',
          WebkitBackdropFilter: 'blur(48px) saturate(200%) brightness(1.12)',
          border:               '1px solid rgba(255,255,255,0.09)',
          boxShadow:            scrolled
            ? 'inset 0 1.5px 0 rgba(255,255,255,0.13),0 20px 60px rgba(0,0,0,0.65),0 0 0 0.5px rgba(255,255,255,0.04)'
            : 'inset 0 1.5px 0 rgba(255,255,255,0.12),0 12px 40px rgba(0,0,0,0.55)',
          transition:           'all 0.4s ease',
          position:             'relative',
        }}>
          {/* Shine */}
          <div style={{ position:'absolute', top:'1px', left:'5%', right:'5%', height:'1px', background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)', borderRadius:'999px', pointerEvents:'none' }} />

          {/* LOGO */}
          <motion.div onClick={() => navigate('/')} whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}
            style={{ display:'flex', flexDirection:'column', gap:'2px', cursor:'pointer', userSelect:'none', flexShrink:0 }}>
            <div style={{ display:'flex', alignItems:'baseline', lineHeight:1 }}>
              <span style={{ fontFamily:'"Syne",Inter,sans-serif', fontSize:'clamp(1.3rem,4vw,1.9rem)', fontWeight:800, color:'#fff', letterSpacing:'-1.5px', lineHeight:1 }}>NOV</span>
              <span style={{ fontFamily:'"Syne",Inter,sans-serif', fontSize:'clamp(1.3rem,4vw,1.9rem)', fontWeight:800, letterSpacing:'-1.5px', lineHeight:1, background:'linear-gradient(135deg,#818cf8,#a78bfa,#7c3aed)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>AA</span>
            </div>
            <span style={{ fontSize:'clamp(0.38rem,1vw,0.47rem)', fontWeight:500, color:'rgba(255,255,255,0.28)', letterSpacing:'clamp(2px,0.8vw,4px)', textTransform:'uppercase' }}>
              DIGITAL SOLUTIONS
            </span>
          </motion.div>

          {/* DESKTOP LINKS */}
          <nav style={{ display:'flex', alignItems:'center', gap:'2px', position:'absolute', left:'50%', top:'50%', transform:'translate(-50%,-50%)' }}
            className="desktop-nav">
            {LINKS.map(link => {
              const active = isActive(link.href)
              return (
                <motion.button key={link.label} onClick={() => go(link.href)}
                  onHoverStart={() => setHov(link.label)} onHoverEnd={() => setHov(null)}
                  whileTap={{ scale:0.95 }}
                  style={{
                    position:'relative', padding:'8px 16px', background:'none', border:'none',
                    borderRadius:'999px', cursor:'pointer', fontFamily:'Inter,sans-serif',
                    fontSize:'0.875rem', fontWeight:active?600:450, letterSpacing:'0.1px',
                    color:active?'#818cf8':hov===link.label?'rgba(255,255,255,0.88)':'rgba(255,255,255,0.52)',
                    transition:'color 0.22s ease', whiteSpace:'nowrap',
                  }}>
                  <AnimatePresence>
                    {hov===link.label&&!active&&(
                      <motion.div initial={{ opacity:0, scale:0.88 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.88 }} transition={{ duration:0.18 }}
                        style={{ position:'absolute', inset:0, borderRadius:'999px', background:'rgba(255,255,255,0.06)', pointerEvents:'none' }} />
                    )}
                  </AnimatePresence>
                  {link.label}
                  {active && (
                    <motion.div layoutId="nav-dot" style={{ position:'absolute', bottom:'5px', left:'50%', transform:'translateX(-50%)', width:'4px', height:'4px', borderRadius:'50%', background:'#818cf8', boxShadow:'0 0 8px rgba(129,140,248,0.9)' }}
                      transition={{ type:'spring', stiffness:520, damping:38 }} />
                  )}
                </motion.button>
              )
            })}
          </nav>

          {/* RIGHT — CTA + Burger */}
          <div style={{ display:'flex', alignItems:'center', gap:'8px', flexShrink:0 }}>
            {/* Let's Talk — desktop only */}
            <motion.button onClick={startProject} whileHover={{ scale:1.05 }} whileTap={{ scale:0.96 }}
              className="desktop-nav"
              style={{
                display:'inline-flex', alignItems:'center', gap:'8px', padding:'10px 22px',
                borderRadius:'999px', background:'linear-gradient(135deg,#6366f1,#7c3aed,#8b5cf6)',
                border:'1px solid rgba(160,130,255,0.35)',
                boxShadow:'inset 0 1.5px 0 rgba(255,255,255,0.22),0 0 28px rgba(99,102,241,0.35)',
                color:'#fff', fontFamily:'Inter,sans-serif', fontWeight:600,
                fontSize:'clamp(0.8rem,1.5vw,0.9rem)', cursor:'pointer', whiteSpace:'nowrap',
                transition:'all 0.3s ease',
              }}>
              Let's Talk
              <motion.span animate={{ x:[0,4,0] }} transition={{ duration:1.6, repeat:Infinity, ease:'easeInOut' }}
                style={{ display:'inline-block' }}>→</motion.span>
            </motion.button>

            {/* HAMBURGER */}
            <motion.button onClick={() => setOpen(p=>!p)}
              whileHover={{ scale:1.08 }} whileTap={{ scale:0.92 }}
              aria-label="Toggle menu"
              style={{
                width:'clamp(42px,7vw,52px)', height:'clamp(42px,7vw,52px)',
                borderRadius:'50%', display:'flex', flexDirection:'column',
                alignItems:'center', justifyContent:'center', gap:'5px',
                background:open?'rgba(99,102,241,0.2)':'rgba(255,255,255,0.07)',
                backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
                border:open?'1px solid rgba(99,102,241,0.35)':'1px solid rgba(255,255,255,0.11)',
                boxShadow:'inset 0 1.5px 0 rgba(255,255,255,0.12),0 4px 20px rgba(0,0,0,0.35)',
                cursor:'pointer', flexShrink:0, transition:'all 0.3s ease', position:'relative', overflow:'hidden',
              }}>
              {[0,1,2].map(i => (
                <motion.span key={i}
                  animate={{
                    rotate:  open&&i===0?45:open&&i===2?-45:0,
                    y:       open&&i===0?10:open&&i===2?-10:0,
                    opacity: open&&i===1?0:1,
                    width:   i===1?(open?'18px':'13px'):'18px',
                  }}
                  transition={{ duration:0.32, ease:[0.22,1,0.36,1] }}
                  style={{ display:'block', height:'1.5px', borderRadius:'999px', background:'rgba(255,255,255,0.8)', originX:'50%', originY:'50%' }}
                />
              ))}
            </motion.button>
          </div>
        </div>

        {/* ── DROPDOWN ── */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="menu"
              initial={{ opacity:0, scale:0.95, y:-12, filter:'blur(8px)' }}
              animate={{ opacity:1, scale:1,    y:0,   filter:'blur(0px)' }}
              exit={{   opacity:0, scale:0.96,  y:-8,  filter:'blur(6px)' }}
              transition={{ duration:0.35, ease:[0.22,1,0.36,1] }}
              style={{
                position:'absolute', top:'calc(100% + 10px)', right:0,
                width:'min(260px,calc(100vw - 24px))',
                background:'rgba(8,6,20,0.97)',
                backdropFilter:'blur(48px) saturate(200%)',
                WebkitBackdropFilter:'blur(48px) saturate(200%)',
                border:'1px solid rgba(255,255,255,0.09)',
                borderRadius:'20px', overflow:'hidden', padding:'8px',
                boxShadow:'inset 0 1px 0 rgba(255,255,255,0.1),0 32px 80px rgba(0,0,0,0.75),0 0 0 0.5px rgba(255,255,255,0.03)',
              }}>
              {/* Purple accent */}
              <div style={{ position:'absolute', top:0, left:'8%', right:'8%', height:'1px', background:'linear-gradient(90deg,transparent,rgba(99,102,241,0.6),transparent)', pointerEvents:'none' }} />

              {LINKS.map((link, i) => {
                const active = isActive(link.href)
                return (
                  <motion.button key={link.label} onClick={() => go(link.href)}
                    initial={{ opacity:0, x:-12 }}
                    animate={{ opacity:1, x:0 }}
                    transition={{ delay:i*0.04, duration:0.28, ease:[0.22,1,0.36,1] }}
                    whileHover={{ background:'rgba(255,255,255,0.07)' }}
                    whileTap={{ scale:0.98 }}
                    style={{
                      width:'100%', display:'flex', alignItems:'center', gap:'12px',
                      padding:'11px 12px', borderRadius:'12px',
                      background:active?'rgba(99,102,241,0.12)':'transparent',
                      border:'none',
                      borderLeft:active?'2.5px solid #6366f1':'2.5px solid transparent',
                      cursor:'pointer', textAlign:'left', fontFamily:'Inter,sans-serif',
                      fontSize:'0.9rem', fontWeight:active?600:400,
                      color:active?'#818cf8':'rgba(255,255,255,0.6)',
                      transition:'all 0.2s ease',
                    }}>
                    <div style={{
                      width:'32px', height:'32px', borderRadius:'9px', flexShrink:0,
                      display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.95rem',
                      background:active?'rgba(99,102,241,0.22)':'rgba(255,255,255,0.07)',
                      border:active?'1px solid rgba(99,102,241,0.4)':'1px solid rgba(255,255,255,0.09)',
                      boxShadow:active?'0 0 12px rgba(99,102,241,0.25)':'none',
                      transition:'all 0.2s ease',
                    }}>
                      {link.icon}
                    </div>
                    {link.label}
                  </motion.button>
                )
              })}

              {/* Let's Talk inside menu */}
              <div style={{ padding:'8px 4px 2px' }}>
                <motion.button onClick={startProject}
                  whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}
                  style={{
                    width:'100%', padding:'12px 16px', borderRadius:'12px',
                    background:'linear-gradient(135deg,#6366f1,#7c3aed)',
                    border:'1px solid rgba(150,100,255,0.4)',
                    boxShadow:'inset 0 1px 0 rgba(255,255,255,0.15)',
                    color:'#fff', fontFamily:'Inter,sans-serif', fontWeight:600,
                    fontSize:'0.9rem', cursor:'pointer', transition:'all 0.25s ease',
                    minHeight:'44px',
                  }}>
                  Let's Talk →
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div key="backdrop" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            onClick={() => setOpen(false)}
            style={{ position:'fixed', inset:0, zIndex:999, background:'rgba(0,0,0,0.3)', backdropFilter:'blur(2px)', WebkitBackdropFilter:'blur(2px)' }}
          />
        )}
      </AnimatePresence>
    </>
  )
}