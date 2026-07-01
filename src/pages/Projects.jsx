import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Navbar  from '../components/Navbar'
import Footer  from '../components/Footer'
import CTAButton from '../components/CTAButton'

const ease = [0.22, 1, 0.36, 1]

const STATS = [
  { icon:'⬡', value:'50+', label:'Projects Completed' },
  { icon:'☺', value:'30+', label:'Happy Clients'       },
  { icon:'✦', value:'4+',  label:'Years Experience'    },
  { icon:'↗', value:'98%', label:'Client Satisfaction' },
]

const CATS = ['All Projects','Web Design','Web Development','Branding','UI/UX Design']

const PROJECTS = [
  {
    id:1, cat:'Web Design',
    title:'Nexora Dashboard',
    desc:'A modern SaaS dashboard designed for analytics and user management.',
    slug:'fintech-dashboard',
    bg:'linear-gradient(135deg,#1a0a2e 0%,#2d1060 50%,#0a0a1a 100%)',
    tag:'Web Design', tagColor:'#7c3aed',
  },
  {
    id:2, cat:'Web Development',
    title:'Architex Website',
    desc:'A premium corporate website for an architecture studio.',
    slug:'saas-platform',
    bg:'linear-gradient(135deg,#0a1a2e 0%,#1a4a6e 50%,#0a2030 100%)',
    tag:'Web Development', tagColor:'#2563eb',
  },
  {
    id:3, cat:'Branding',
    title:'Élixir Brand Identity',
    desc:'Luxury branding and visual identity for a premium perfume brand.',
    slug:'brand-identity',
    bg:'linear-gradient(135deg,#1a1000 0%,#3d2800 50%,#1a0a00 100%)',
    tag:'Branding', tagColor:'#d97706',
  },
  {
    id:4, cat:'UI/UX Design',
    title:'Project 04',
    desc:'Premium UI/UX design system crafted for seamless user experience.',
    slug:'fintech-dashboard',
    bg:'linear-gradient(135deg,#0a1a0a 0%,#1a3d1a 50%,#0a150a 100%)',
    tag:'UI/UX Design', tagColor:'#16a34a',
  },
  {
    id:5, cat:'Web Design',
    title:'Project 05',
    desc:'Modern responsive website with premium glassmorphism aesthetics.',
    slug:'saas-platform',
    bg:'linear-gradient(135deg,#1a0a1a 0%,#3d0a3d 50%,#150a15 100%)',
    tag:'Web Design', tagColor:'#7c3aed',
  },
  {
    id:6, cat:'Web Development',
    title:'Project 06',
    desc:'Full-stack web application with real-time data and cloud integration.',
    slug:'brand-identity',
    bg:'linear-gradient(135deg,#001a2e 0%,#003d5e 50%,#001520 100%)',
    tag:'Web Development', tagColor:'#2563eb',
  },
]

function ProjectCard({ p, navigate }) {
  return (
    <motion.div
      initial={{ opacity:0, y:28 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:'-40px' }}
      transition={{ duration:0.65, ease }}
      whileHover={{ y:-6 }}
      style={{
        borderRadius:'16px', overflow:'hidden',
        background:'rgba(255,255,255,0.03)',
        border:'1px solid rgba(255,255,255,0.08)',
        cursor:'pointer', position:'relative',
        transition:'border-color 0.3s ease',
      }}
      onClick={() => navigate(`/work/${p.slug}`)}
    >
      {/* Image area */}
      <div style={{ position:'relative', height:'220px', background:p.bg, overflow:'hidden' }}>
        {/* Mock UI inside card */}
        <div style={{ position:'absolute', inset:'16px', borderRadius:'8px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(4px)' }}>
          <div style={{ textAlign:'center', padding:'1rem' }}>
            <div style={{ fontSize:'2.5rem', marginBottom:'0.5rem' }}>
              {p.id===1?'📊':p.id===2?'🏗️':p.id===3?'💎':p.id===4?'🎨':p.id===5?'🌐':'⚡'}
            </div>
            <p style={{ fontSize:'0.75rem', color:'rgba(255,255,255,0.4)', margin:0 }}>{p.title}</p>
          </div>
        </div>

        {/* External link icon */}
        <div style={{
          position:'absolute', top:'12px', right:'12px',
          width:'32px', height:'32px', borderRadius:'8px',
          background:'rgba(255,255,255,0.1)', backdropFilter:'blur(10px)',
          border:'1px solid rgba(255,255,255,0.15)',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:'0.8rem', color:'rgba(255,255,255,0.7)',
        }}>↗</div>

        {/* Category tag */}
        <div style={{
          position:'absolute', bottom:'12px', left:'12px',
          padding:'4px 10px', borderRadius:'20px', fontSize:'0.7rem', fontWeight:600,
          background:`${p.tagColor}22`, border:`1px solid ${p.tagColor}55`,
          color:p.tagColor, backdropFilter:'blur(8px)',
        }}>
          {p.tag}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding:'1.25rem' }}>
        <h3 style={{ fontSize:'1.1rem', fontWeight:700, color:'#fff', margin:'0 0 0.5rem', letterSpacing:'-0.3px' }}>
          {p.title}
        </h3>
        <p style={{ fontSize:'0.84rem', color:'rgba(255,255,255,0.45)', lineHeight:1.65, margin:'0 0 1.25rem' }}>
          {p.desc}
        </p>
        <motion.div
          whileHover={{ gap:'14px' }}
          style={{ display:'flex', alignItems:'center', gap:'8px', transition:'gap 0.25s ease' }}
        >
          <span style={{ fontSize:'0.88rem', fontWeight:600, color:'#fff' }}>View Project</span>
          <div style={{
            width:'28px', height:'28px', borderRadius:'50%',
            background:'linear-gradient(135deg,#6366f1,#7c3aed)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:'0.75rem', color:'#fff',
            boxShadow:'0 0 12px rgba(99,102,241,0.4)',
          }}>→</div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [active, setActive] = useState('All Projects')
  const navigate = useNavigate()

  const filtered = active === 'All Projects'
    ? PROJECTS
    : PROJECTS.filter(p => p.cat === active)

  return (
    <div style={{ background:'#06060f', minHeight:'100vh', color:'#fff', fontFamily:'Inter,sans-serif' }}>
      <Navbar />

      {/* Aurora bg */}
      <div style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 60% 50% at 20% 40%, rgba(120,40,200,0.18) 0%, transparent 65%)' }} />
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 50% 45% at 80% 60%, rgba(0,100,200,0.12) 0%, transparent 65%)' }} />
      </div>

      <main style={{
        position:'relative', zIndex:1,
        maxWidth:'1260px', margin:'0 auto',
        padding:'clamp(90px,10vw,120px) clamp(1rem,3vw,2rem) 4rem',
      }}>

        {/* Back button */}
        <motion.button
          onClick={() => navigate('/')}
          initial={{ opacity:0, x:-16 }}
          animate={{ opacity:1, x:0 }}
          transition={{ duration:0.5, ease }}
          whileHover={{ scale:1.04, x:-3 }}
          whileTap={{ scale:0.97 }}
          style={{
            display:'inline-flex', alignItems:'center', gap:'8px',
            padding:'9px 18px', borderRadius:'50px', marginBottom:'2.5rem',
            background:'rgba(255,255,255,0.05)',
            backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
            border:'1px solid rgba(255,255,255,0.1)',
            boxShadow:'inset 0 1px 0 rgba(255,255,255,0.08)',
            color:'rgba(255,255,255,0.65)', fontFamily:'Inter,sans-serif',
            fontWeight:500, fontSize:'0.875rem', cursor:'pointer', outline:'none',
          }}
        >
          <span>←</span> Back to Home
        </motion.button>

        {/* ── Hero: Left + Right stats ── */}
        <div style={{
          display:'grid', gridTemplateColumns:'1fr 1fr',
          gap:'3rem', alignItems:'center', marginBottom:'2.5rem',
        }} className="proj-hero-grid">

          {/* Left */}
          <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, ease }}>
            <div style={{
              display:'inline-flex', alignItems:'center', gap:'8px',
              padding:'5px 14px', borderRadius:'20px', marginBottom:'1.25rem',
              background:'rgba(99,102,241,0.12)', border:'1px solid rgba(99,102,241,0.3)',
            }}>
              <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#6366f1', boxShadow:'0 0 8px rgba(99,102,241,0.8)', display:'inline-block' }} />
              <span style={{ fontSize:'0.72rem', fontWeight:600, letterSpacing:'2px', color:'#a5b4fc' }}>OUR WORK</span>
            </div>

            <h1 style={{ fontSize:'clamp(2.2rem,5vw,3.5rem)', fontWeight:800, lineHeight:1.1, letterSpacing:'-1px', margin:'0 0 1rem' }}>
              <span style={{ color:'#fff', display:'block' }}>Projects That</span>
              <span style={{
                display:'block',
                background:'linear-gradient(135deg,#818cf8 0%,#c084fc 100%)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
              }}>Make an Impact</span>
            </h1>

            <p style={{ fontSize:'0.97rem', color:'rgba(255,255,255,0.5)', lineHeight:1.75, maxWidth:'440px', margin:0 }}>
              We combine creativity, strategy, and technology to deliver digital experiences that drive real results.
            </p>
          </motion.div>

          {/* Right — stats 2×2 */}
          <motion.div
            initial={{ opacity:0, x:24 }} animate={{ opacity:1, x:0 }}
            transition={{ duration:0.7, ease, delay:0.15 }}
            style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}
          >
            {STATS.map((s,i) => (
              <motion.div key={i}
                initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
                transition={{ delay:0.2+i*0.08, duration:0.5, ease }}
                style={{
                  padding:'1.5rem',
                  borderRadius:'16px',
                  background:'rgba(255,255,255,0.04)',
                  border:'1px solid rgba(255,255,255,0.08)',
                  backdropFilter:'blur(16px)',
                  display:'flex', alignItems:'center', gap:'1rem',
                }}
              >
                <span style={{
                  fontSize:'1.4rem', color:'#818cf8',
                  width:'42px', height:'42px', borderRadius:'10px',
                  background:'rgba(99,102,241,0.12)',
                  border:'1px solid rgba(99,102,241,0.2)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  flexShrink:0,
                }}>{s.icon}</span>
                <div>
                  <p style={{ fontSize:'1.6rem', fontWeight:800, color:'#fff', margin:0, letterSpacing:'-1px' }}>{s.value}</p>
                  <p style={{ fontSize:'0.75rem', color:'rgba(255,255,255,0.4)', margin:0 }}>{s.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Filter tabs ── */}
        <motion.div
          initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.5, ease, delay:0.3 }}
          style={{ display:'flex', gap:'8px', flexWrap:'wrap', marginBottom:'2rem', overflowX:'auto', paddingBottom:'4px' }}
        >
          {CATS.map(cat => (
            <motion.button key={cat}
              onClick={() => setActive(cat)}
              whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
              style={{
                display:'inline-flex', alignItems:'center', gap:'8px',
                padding:'10px 20px', borderRadius:'10px',
                background: active===cat ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.04)',
                border: active===cat ? '1px solid rgba(99,102,241,0.5)' : '1px solid rgba(255,255,255,0.08)',
                color: active===cat ? '#fff' : 'rgba(255,255,255,0.55)',
                fontWeight: active===cat ? 600 : 400,
                fontSize:'0.875rem', cursor:'pointer', whiteSpace:'nowrap',
                boxShadow: active===cat ? '0 0 20px rgba(99,102,241,0.2)' : 'none',
                transition:'all 0.25s ease', minHeight:'44px', outline:'none',
              }}
            >
              {cat==='All Projects' && <span style={{ fontSize:'0.9rem' }}>⊞</span>}
              {cat==='Web Design' && <span style={{ fontSize:'0.9rem' }}>⊕</span>}
              {cat==='Web Development' && <span style={{ fontSize:'0.9rem' }}>&lt;/&gt;</span>}
              {cat==='Branding' && <span style={{ fontSize:'0.9rem' }}>✏</span>}
              {cat==='UI/UX Design' && <span style={{ fontSize:'0.9rem' }}>⬜</span>}
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* ── Projects Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity:0, y:12 }}
            animate={{ opacity:1, y:0 }}
            exit={{ opacity:0, y:-8 }}
            transition={{ duration:0.3, ease }}
            style={{
              display:'grid',
              gridTemplateColumns:'repeat(auto-fill,minmax(min(340px,100%),1fr))',
              gap:'1.25rem',
              marginBottom:'3rem',
            }}
          >
            {filtered.map(p => (
              <ProjectCard key={p.id} p={p} navigate={navigate} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── CTA Section ── */}
        <motion.div
          initial={{ opacity:0, y:24 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.7, ease }}
          style={{
            borderRadius:'20px', padding:'2.5rem',
            background:'rgba(99,102,241,0.08)',
            border:'1px solid rgba(99,102,241,0.18)',
            backdropFilter:'blur(20px)',
            display:'flex', alignItems:'center',
            justifyContent:'space-between', flexWrap:'wrap', gap:'2rem',
          }}
        >
          <div style={{ display:'flex', alignItems:'center', gap:'1.25rem' }}>
            <div style={{
              width:'56px', height:'56px', borderRadius:'14px', flexShrink:0,
              background:'linear-gradient(135deg,#6366f1,#7c3aed)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'1.6rem',
              boxShadow:'0 0 24px rgba(99,102,241,0.4)',
            }}>✦</div>
            <div>
              <h2 style={{ fontSize:'clamp(1.1rem,2.5vw,1.4rem)', fontWeight:800, color:'#fff', margin:'0 0 4px', letterSpacing:'-0.3px' }}>
                Have a project in mind?
              </h2>
              <p style={{ fontSize:'0.875rem', color:'rgba(255,255,255,0.45)', margin:0 }}>
                Let's create something amazing together.
              </p>
            </div>
          </div>
          <CTAButton size="md">
            Start Your Project →
          </CTAButton>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}