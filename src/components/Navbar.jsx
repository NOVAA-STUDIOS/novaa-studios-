import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINKS = ['Home','Services','About','Work','Contact']

export default function Navbar() {
  const [active, setActive] = useState('Home')
  const [open,   setOpen]   = useState(false)

  return (
    <>
      <motion.header
        initial={{ y:-70, opacity:0 }}
        animate={{ y:0,   opacity:1 }}
        transition={{ duration:0.9, ease:[0.22,1,0.36,1], delay:0.1 }}
        style={{
          position: 'fixed', top:0, left:0, right:0,
          zIndex: 50, padding: '14px 20px',
        }}
      >
        {/* ── Glass pill ── */}
        <div
          className="glass-nav"
          style={{
            maxWidth:       '1100px',
            margin:         '0 auto',
            height:         '56px',
            borderRadius:   '16px',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
            padding:        '0 18px',
            position:       'relative',
            overflow:       'hidden',
          }}
        >
          {/* Inner top shine */}
          <div style={{
            position:   'absolute', top:0, left:'8%', right:'8%',
            height:     '1px',
            background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.30),transparent)',
            pointerEvents:'none',
          }}/>

          {/* Logo */}
          <span style={{
            fontFamily:   'Moonwalk, Inter, sans-serif',
            fontSize:     '1.15rem',
            letterSpacing:'5px',
            color:        'rgba(255,255,255,0.90)',
            userSelect:   'none',
            flexShrink:   0,
          }}>
            NOVAA
          </span>

          {/* Links — desktop */}
          <nav style={{
            display:'flex', gap:'2px', alignItems:'center',
          }}
            className="hidden md:flex"
          >
            {LINKS.map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setActive(link)}
                className={active===link ? 'nav-active' : ''}
                style={{
                  padding:        '6px 16px',
                  borderRadius:   '10px',
                  fontSize:       '0.875rem',
                  fontWeight:     active===link ? 600 : 400,
                  color:          active===link
                    ? '#fff'
                    : 'rgba(255,255,255,0.50)',
                  textDecoration: 'none',
                  transition:     'all 0.22s ease',
                  border:         active===link
                    ? undefined
                    : '1px solid transparent',
                }}
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Hamburger pill */}
          <div
            className="glass-badge"
            onClick={() => setOpen(!open)}
            style={{
              width:'42px', height:'42px',
              borderRadius:'12px',
              display:'flex', flexDirection:'column',
              alignItems:'center', justifyContent:'center',
              gap:'5px', cursor:'pointer', flexShrink:0,
            }}
          >
            {[0,1].map(i=>(
              <motion.span key={i}
                animate={{
                  rotate: open&&i===0? 45 : open&&i===1? -45 : 0,
                  y:      open&&i===0?  4 : open&&i===1?  -4 : 0,
                }}
                style={{
                  display:'block', width:'16px', height:'1.5px',
                  background:'rgba(255,255,255,0.80)',
                  borderRadius:'2px',
                }}
              />
            ))}
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mob"
            initial={{ opacity:0, y:-8 }}
            animate={{ opacity:1, y:0  }}
            exit={{    opacity:0, y:-8 }}
            transition={{ duration:0.22 }}
            className="glass-nav fixed z-40 left-5 right-5 rounded-2xl p-4 md:hidden"
            style={{ top:'82px' }}
          >
            {LINKS.map((link,i)=>(
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                initial={{ opacity:0, x:-8 }}
                animate={{ opacity:1, x:0  }}
                transition={{ delay:i*0.05 }}
                onClick={()=>{setActive(link);setOpen(false)}}
                style={{
                  display:'block', padding:'0.75rem 1rem',
                  borderRadius:'10px',
                  color:'rgba(255,255,255,0.75)',
                  textDecoration:'none',
                  fontSize:'1rem', fontWeight:500,
                }}
              >
                {link}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}