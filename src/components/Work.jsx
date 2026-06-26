import { useState }             from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link }                 from 'react-router-dom'
import { useProjectNavigation } from '../hooks/useNavigation'
import BackButton               from './BackButton'

const ease = [0.22, 1, 0.36, 1]

const STATS = [
  { icon:'🚀', n:'50+',  l:'Projects\nCompleted'   },
  { icon:'⭐', n:'98%',  l:'Client\nSatisfaction'  },
  { icon:'🌐', n:'20+',  l:'Industries\nServed'    },
  { icon:'⚡', n:'2x',   l:'Faster\nDelivery'      },
]

const TABS = ['All Work','Web Design','Development','Branding','SEO']

const PROJECTS = [
  { category:'Web Design',   title:'Fintech Dashboard', desc:'Modern dashboard for a fintech platform with real-time analytics.',     gradientFrom:'rgba(60,20,160,0.9)',  gradientTo:'rgba(20,60,180,0.8)'  },
  { category:'Development',  title:'SaaS Platform',     desc:'Scalable SaaS platform built for teams to collaborate seamlessly.',     gradientFrom:'rgba(15,40,120,0.9)',  gradientTo:'rgba(0,100,140,0.8)'  },
  { category:'Branding',     title:'Brand Identity',    desc:'Complete brand identity design for a health & wellness brand.',          gradientFrom:'rgba(0,80,80,0.9)',    gradientTo:'rgba(0,140,110,0.8)'  },
  { category:'Web Design',   title:'E-commerce Store',  desc:'High-converting e-commerce store with clean UX/UI.',                   gradientFrom:'rgba(80,20,140,0.9)',  gradientTo:'rgba(40,10,100,0.8)'  },
  { category:'Development',  title:'Mobile App',        desc:'Cross-platform mobile app for better user engagement.',                 gradientFrom:'rgba(10,30,100,0.9)',  gradientTo:'rgba(60,0,120,0.8)'   },
  { category:'SEO',          title:'Growth Campaign',   desc:'SEO and performance marketing that drove 200% growth.',                 gradientFrom:'rgba(0,60,60,0.9)',    gradientTo:'rgba(20,100,80,0.8)'  },
]

const SLUG_MAP = {
  'Fintech Dashboard': 'fintech-dashboard',
  'SaaS Platform':     'saas-platform',
  'Brand Identity':    'brand-identity',
  'E-commerce Store':  'ecommerce-store',
  'Mobile App':        'mobile-app',
  'Growth Campaign':   'growth-campaign',
}

const CAT_COLORS = {
  'Web Design':  { bg:'rgba(120,60,220,0.35)',  border:'rgba(150,80,255,0.4)'  },
  'Development': { bg:'rgba(20,100,200,0.35)',  border:'rgba(50,130,255,0.4)'  },
  'Branding':    { bg:'rgba(0,140,120,0.35)',   border:'rgba(0,200,160,0.4)'   },
  'SEO':         { bg:'rgba(160,100,20,0.35)',  border:'rgba(220,160,30,0.4)'  },
}

/* ── Project Card ── */
function ProjectCard({ category, title, desc, gradientFrom, gradientTo, delay=0 }) {
  const slug    = SLUG_MAP[title] || title.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'')
  const catCol  = CAT_COLORS[category] || CAT_COLORS['Web Design']

  return (
    <motion.div
      initial={{ opacity:0, y:28 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }}
      transition={{ duration:0.65, delay, ease }}
      whileHover={{ y:-4 }}
      style={{
        position:'relative', borderRadius:'18px', overflow:'hidden',
        background:'rgba(15,10,40,0.55)',
        backdropFilter:'blur(24px) saturate(160%)',
        WebkitBackdropFilter:'blur(24px) saturate(160%)',
        border:'1px solid rgba(255,255,255,0.09)',
        boxShadow:'inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 40px rgba(0,0,0,0.4)',
        cursor:'pointer', transition:'all 0.35s ease',
        display:'flex', flexDirection:'column',
      }}
    >
      {/* Image area */}
      <div style={{ position:'relative', height:'180px', overflow:'hidden', flexShrink:0 }}>
        <motion.div
          whileHover={{ scale:1.06 }}
          transition={{ duration:0.5 }}
          style={{
            width:'100%', height:'100%',
            background:`linear-gradient(135deg,${gradientFrom} 0%,${gradientTo} 100%)`,
            display:'flex', alignItems:'center', justifyContent:'flex-end', padding:'1rem',
          }}
        >
          <div style={{
            width:'55%', height:'90%', borderRadius:'10px',
            background:'rgba(255,255,255,0.08)',
            border:'1px solid rgba(255,255,255,0.12)',
            backdropFilter:'blur(8px)',
            display:'flex', flexDirection:'column', padding:'0.6rem', gap:'0.3rem',
          }}>
            {[80,60,90,45,70].map((w,i) => (
              <div key={i} style={{ height:'6px', width:`${w}%`, borderRadius:'3px', background:i===0?'rgba(255,255,255,0.5)':'rgba(255,255,255,0.15)' }} />
            ))}
            <div style={{ marginTop:'auto', display:'flex', gap:'4px' }}>
              {[1,2,3].map(i => (
                <div key={i} style={{ width:'24px', height:'24px', borderRadius:'6px', background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.15)' }} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Arrow button */}
        <Link
          to={`/work/${slug}`}
          onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}
          style={{ textDecoration:'none', position:'absolute', bottom:'12px', right:'12px' }}
        >
          <motion.div
            whileHover={{ scale:1.1, background:'rgba(255,255,255,0.2)' }}
            style={{
              width:'36px', height:'36px', borderRadius:'50%',
              background:'rgba(255,255,255,0.12)',
              backdropFilter:'blur(10px)',
              border:'1px solid rgba(255,255,255,0.2)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'0.85rem', color:'#fff',
              boxShadow:'inset 0 1px 0 rgba(255,255,255,0.2)',
            }}
          >
            ↗
          </motion.div>
        </Link>
      </div>

      {/* Content */}
      <div style={{ padding:'1.25rem 1.25rem 1.5rem', flex:1, display:'flex', flexDirection:'column', gap:'0.5rem' }}>
        <div style={{
          display:'inline-flex', alignSelf:'flex-start',
          padding:'4px 12px', borderRadius:'50px',
          fontSize:'0.72rem', fontWeight:600,
          background:catCol.bg, border:`1px solid ${catCol.border}`,
          color:'#fff', backdropFilter:'blur(8px)', marginBottom:'0.25rem',
        }}>
          {category}
        </div>

        <h3 style={{ fontSize:'1.05rem', fontWeight:700, color:'#fff', letterSpacing:'-0.01em', lineHeight:1.3 }}>
          {title}
        </h3>

        <p style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.4)', lineHeight:1.65, flex:1 }}>
          {desc}
        </p>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'0.5rem' }}>
          <motion.div whileHover={{ x:3 }} style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'0.82rem', fontWeight:600, color:'rgba(255,255,255,0.6)', cursor:'pointer' }}>
            View Project <span>→</span>
          </motion.div>
          <Link
            to={`/work/${slug}`}
            onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}
            style={{ textDecoration:'none' }}
          >
            <motion.div whileHover={{ x:3 }} style={{ display:'flex', alignItems:'center', gap:'4px', fontSize:'0.75rem', fontWeight:600, color:'rgba(99,102,241,0.85)', cursor:'pointer' }}>
              Case Study →
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

/* ══════════════════════════
   MAIN WORK COMPONENT
══════════════════════════ */
export default function Work({ standalone = false }) {
  const [active, setActive] = useState('All Work')
  const { seeMoreProjects }  = useProjectNavigation()

  const TAB_MAP = {
    'All Work':    null,
    'Web Design':  'Web Design',
    'Development': 'Development',
    'Branding':    'Branding',
    'SEO':         'SEO',
  }

  const filtered = TAB_MAP[active]
    ? PROJECTS.filter(p => p.category === TAB_MAP[active])
    : PROJECTS

  return (
    <section
      id="work"
      style={{
        minHeight: standalone ? '100vh' : 'auto',
        padding:   standalone ? '120px 1.5rem 80px' : '8rem 1.5rem',
        position:  'relative', zIndex:1,
        maxWidth:  '1220px', margin:'0 auto',
      }}
    >
      {/* Back button — standalone only */}
      {standalone && (
        <div style={{ marginBottom:'1.5rem' }}>
          <BackButton label="Back to Home" />
        </div>
      )}

      {/* ── Hero: Left + Right stats ── */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'3rem', alignItems:'flex-start', marginBottom:'2.5rem' }}
        className="work-hero-grid"
      >
        {/* Left */}
        <div>
          <motion.div initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6, ease }} style={{ marginBottom:'1.25rem' }}>
            <div style={{
              display:'inline-flex', alignItems:'center', gap:'9px', padding:'7px 16px', borderRadius:'50px',
              background:'rgba(10,10,40,0.65)', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
              border:'1px solid rgba(255,255,255,0.13)', boxShadow:'inset 0 1px 0 rgba(255,255,255,0.1)',
            }}>
              <span style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#6366f1', boxShadow:'0 0 10px #6366f1, 0 0 20px rgba(99,102,241,0.5)', flexShrink:0 }} />
              <span style={{ fontSize:'0.72rem', fontWeight:600, letterSpacing:'2.5px', textTransform:'uppercase', color:'rgba(255,255,255,0.65)' }}>
                Our Work
              </span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.8, delay:0.1, ease }}>
            <h1 style={{ fontSize:'clamp(2.4rem,5vw,3.8rem)', fontWeight:800, lineHeight:1.08, letterSpacing:'-0.03em', marginBottom:'1.25rem' }}>
              <span style={{ background:'linear-gradient(160deg,#fff 0%,rgba(255,255,255,0.85) 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', display:'block' }}>Work That</span>
              <span style={{ background:'linear-gradient(135deg,#c084fc 0%,#06b6d4 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', display:'block' }}>Speaks for Itself.</span>
            </h1>
          </motion.div>

          <motion.p initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7, delay:0.2, ease }}
            style={{ fontSize:'0.92rem', color:'rgba(255,255,255,0.42)', lineHeight:1.8, maxWidth:'380px' }}>
            We partner with startups and brands to design and build digital experiences that are not only beautiful but also purposeful and results-driven.
          </motion.p>
        </div>

        {/* Right: 2×2 stat cards */}
        <motion.div initial={{ opacity:0, x:24 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.8, delay:0.15, ease }}
          style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem' }}>
          {STATS.map((s, i) => (
            <motion.div key={s.l} initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.2+i*0.08, duration:0.6, ease }}
              style={{
                padding:'1.25rem', borderRadius:'16px',
                background:'rgba(15,10,40,0.55)',
                backdropFilter:'blur(24px) saturate(150%)', WebkitBackdropFilter:'blur(24px) saturate(150%)',
                border:'1px solid rgba(255,255,255,0.09)',
                boxShadow:'inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.35)',
                display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', gap:'0.6rem',
              }}>
              <div style={{
                width:'44px', height:'44px', borderRadius:'12px',
                display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem',
                background:   i===0?'rgba(120,60,220,0.3)':i===1?'rgba(0,180,160,0.3)':i===2?'rgba(30,80,200,0.3)':'rgba(160,60,220,0.3)',
                border:       i===0?'1px solid rgba(150,80,255,0.3)':i===1?'1px solid rgba(0,220,180,0.3)':i===2?'1px solid rgba(60,120,255,0.3)':'1px solid rgba(180,80,255,0.3)',
              }}>{s.icon}</div>
              <p style={{ fontSize:'1.8rem', fontWeight:800, color:'#fff', letterSpacing:'-0.03em', lineHeight:1 }}>{s.n}</p>
              <p style={{ fontSize:'0.75rem', color:'rgba(255,255,255,0.38)', lineHeight:1.4, whiteSpace:'pre-line' }}>{s.l}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Filter tabs ── */}
      <motion.div initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6, ease }}
        style={{ display:'flex', gap:'6px', marginBottom:'2rem', flexWrap:'wrap', overflowX:'auto', paddingBottom:'4px' }}>
        {TABS.map(tab => (
          <motion.button key={tab} onClick={() => setActive(tab)}
            whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
            style={{
              padding:'9px 20px', borderRadius:'50px',
              border:      active===tab ? '1px solid rgba(150,80,255,0.5)' : '1px solid rgba(255,255,255,0.09)',
              background:  active===tab ? 'rgba(100,40,220,0.35)' : 'rgba(255,255,255,0.04)',
              backdropFilter:'blur(12px)', WebkitBackdropFilter:'blur(12px)',
              color:       active===tab ? '#fff' : 'rgba(255,255,255,0.5)',
              fontWeight:  active===tab ? 600 : 400,
              fontSize:    '0.875rem', cursor:'pointer', transition:'all 0.25s ease',
              boxShadow:   active===tab ? 'inset 0 1px 0 rgba(255,255,255,0.15), 0 0 20px rgba(120,60,220,0.25)' : 'inset 0 1px 0 rgba(255,255,255,0.06)',
              whiteSpace:  'nowrap', minHeight:'44px',
            }}>
            {tab}
          </motion.button>
        ))}
      </motion.div>

      {/* ── Projects grid ── */}
      <div id="featured-projects" style={{ scrollMarginTop:'80px' }}>
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }} transition={{ duration:0.35, ease }}
            className="projects-grid"
            style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(300px,100%),1fr))', gap:'1.1rem', marginBottom:'3rem' }}>
            {filtered.map((p, i) => (
              <ProjectCard key={p.title} {...p} delay={i*0.07} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── See More Projects — only on homepage section ── */}
      {!standalone && (
        <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6, ease }}
          style={{ display:'flex', justifyContent:'center' }}>
          <motion.button
            onClick={seeMoreProjects}
            whileHover={{ scale:1.04, boxShadow:'inset 0 1px 0 rgba(255,255,255,0.18), 0 8px 32px rgba(100,40,220,0.3)' }}
            whileTap={{ scale:0.97 }}
            style={{
              display:'flex', alignItems:'center', gap:'10px',
              padding:'14px 32px', borderRadius:'50px',
              background:'rgba(15,10,40,0.65)',
              backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
              border:'1px solid rgba(150,80,255,0.3)',
              boxShadow:'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 24px rgba(100,40,200,0.2)',
              color:'#fff', fontWeight:600, fontSize:'0.93rem',
              cursor:'pointer', transition:'all 0.3s ease', minHeight:'44px',
            }}>
            See More Projects
            <span style={{ display:'flex', alignItems:'center', justifyContent:'center', width:'26px', height:'26px', borderRadius:'50%', background:'rgba(255,255,255,0.1)', fontSize:'0.9rem' }}>→</span>
          </motion.button>
        </motion.div>
      )}
    </section>
  )
}