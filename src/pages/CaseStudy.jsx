import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar   from '../components/Navbar'
import Footer   from '../components/Footer'
import CTAButton from '../components/CTAButton'

const ease = [0.22, 1, 0.36, 1]

/* ─── Project data ─── */
const PROJECTS = {
  'hotel-jng': {
    badge:       'FEATURED PROJECT',
    title:       'HOTEL JNG',
    subtitle:    'Premium Restaurant Website',
    description: 'A modern, elegant and booking-friendly website crafted for HOTEL JNG to elevate their online presence and customer experience.',
    location:    'India',
    completed:   'May 2025',
    delivery:    '7 Days',
    rating:      5.0,
    liveUrl:     '#',
    challenge: {
      description: 'HOTEL JNG had an outdated website that was not mobile friendly, had slow loading speed, poor user experience and no proper booking system. This was affecting their online visibility and customer engagement.',
      problems: [
        'Outdated design & user interface',
        'Not mobile responsive',
        'Slow loading speed',
        'No online reservation system',
        'Poor SEO and online visibility',
      ],
    },
    solution: {
      description: 'We designed and developed a modern, fast and responsive website with a focus on user experience, visual appeal and seamless booking functionality.',
      points: [
        'Modern & Elegant UI/UX Design',
        'Fully Responsive for all devices',
        'Fast Loading & Optimized Performance',
        'Online Table Reservation System',
        'SEO Optimized & Google Friendly',
        'Integrated Google Maps & WhatsApp',
      ],
    },
    results: [
      { value:'100%',  label:'Responsive'      },
      { value:'2.5x',  label:'Faster Loading'   },
      { value:'+80%',  label:'User Engagement'  },
      { value:'Top 10',label:'Google Ranking'   },
    ],
    techStack: [
      { name:'Next.js',      icon:'N',  color:'#fff',     bg:'#000'    },
      { name:'React',        icon:'⚛',  color:'#61DAFB',  bg:'#20232a' },
      { name:'Tailwind CSS', icon:'~',  color:'#38BDF8',  bg:'#0f172a' },
      { name:'Framer Motion',icon:'✦',  color:'#fff',     bg:'#6c47ff' },
      { name:'Firebase',     icon:'🔥', color:'#FFA000',  bg:'#1a1a2e' },
      { name:'Cloudflare',   icon:'☁',  color:'#F6821F',  bg:'#1a1a2e' },
    ],
    gallery: [
      { label:'Homepage',        bg:'linear-gradient(135deg,#1a0a00,#3d1a00)' },
      { label:'Menu Page',       bg:'linear-gradient(135deg,#0a0a1a,#1a1a3d)' },
      { label:'Reservation Page',bg:'linear-gradient(135deg,#0a1a0a,#1a3d1a)' },
      { label:'Mobile View',     bg:'linear-gradient(135deg,#1a0a1a,#3d1a3d)' },
    ],
    review: {
      text:   '"NOVAA Studios did an amazing job! They understood our requirements perfectly and delivered a website that exceeded our expectations. The design, speed and functionality are outstanding. Highly recommended!"',
      name:   'Mr. Jignesh Patel',
      role:   'Founder, HOTEL JNG',
      rating: 5,
    },
  },
  'fintech-dashboard': {
    badge:       'WEB DESIGN',
    title:       'Fintech Dashboard',
    subtitle:    'Premium Analytics Platform',
    description: 'A comprehensive real-time analytics dashboard for a leading fintech startup tracking financial data and market trends.',
    location:    'USA',
    completed:   'March 2025',
    delivery:    '8 Weeks',
    rating:      5.0,
    liveUrl:     '#',
    challenge: {
      description: 'The client needed to visualize complex financial data across multiple user segments without overwhelming their users. The existing solution was slow, outdated, and confusing.',
      problems: ['Outdated design','No real-time data','Poor performance','No mobile support','Complex UX'],
    },
    solution: {
      description: 'We redesigned the entire dashboard from scratch using a component-based system with real-time data visualization.',
      points: ['Real-time Data Visualization','Role-Based Access Control','Premium Dark UI','Mobile Responsive','Performance Optimized','Custom Chart Library'],
    },
    results: [
      { value:'340%', label:'User Engagement' },
      { value:'↓60%', label:'Support Tickets' },
      { value:'2.4s', label:'Faster Load Time' },
      { value:'98%',  label:'Satisfaction'     },
    ],
    techStack: [
      { name:'React',     icon:'⚛', color:'#61DAFB', bg:'#20232a' },
      { name:'TypeScript',icon:'TS',color:'#3178C6', bg:'#1a1a2e' },
      { name:'Node.js',   icon:'⬡', color:'#68A063', bg:'#0a1a0a' },
      { name:'AWS',       icon:'☁', color:'#FF9900', bg:'#1a1a2e' },
      { name:'Chart.js',  icon:'📊',color:'#FF6384', bg:'#1a0a0a' },
      { name:'Tailwind',  icon:'~', color:'#38BDF8', bg:'#0f172a' },
    ],
    gallery: [
      { label:'Dashboard',   bg:'linear-gradient(135deg,#0a0a2e,#1a1a5e)' },
      { label:'Analytics',   bg:'linear-gradient(135deg,#0a1a2e,#1a2e5e)' },
      { label:'Reports',     bg:'linear-gradient(135deg,#1a0a2e,#2e1a5e)' },
      { label:'Mobile View', bg:'linear-gradient(135deg,#0a2e1a,#1a5e2e)' },
    ],
    review: {
      text:   '"NOVAA completely transformed our product. The new dashboard reduced our churn by 40% in the first month alone. Absolutely premium work."',
      name:   'Alex Morgan',
      role:   'CEO, FinanceFlow Inc.',
      rating: 5,
    },
  },
}

const SIMILAR = [
  { title:'Hungry Birds',    sub:'Restaurant Website', bg:'linear-gradient(135deg,#2d1000,#5a2000)' },
  { title:'Checkmate Cafe',  sub:'Cafe Website',       bg:'linear-gradient(135deg,#1a1000,#3d2500)' },
  { title:'Sandrosso',       sub:'Restaurant Website', bg:'linear-gradient(135deg,#0a1a00,#1a3d00)' },
  { title:'VR Atlantis Gym', sub:'Gym Website',        bg:'linear-gradient(135deg,#001a1a,#003d3d)' },
  { title:'The Urban Salon', sub:'Salon Website',      bg:'linear-gradient(135deg,#1a001a,#3d003d)' },
]

/* ─── Sub-components ─── */
const FadeIn = ({ children, delay=0, x=0, y=20 }) => (
  <motion.div
    initial={{ opacity:0, x, y }}
    whileInView={{ opacity:1, x:0, y:0 }}
    viewport={{ once:true, margin:'-60px' }}
    transition={{ duration:0.65, ease, delay }}
  >
    {children}
  </motion.div>
)

function StarRating({ count=5, size=18 }) {
  return (
    <div style={{ display:'flex', gap:'3px' }}>
      {Array.from({ length:count }).map((_,i) => (
        <span key={i} style={{ color:'#FBBF24', fontSize:`${size}px` }}>★</span>
      ))}
    </div>
  )
}

function InfoBadge({ icon, label, value }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
      <span style={{ fontSize:'1.2rem', opacity:0.7 }}>{icon}</span>
      <div>
        <p style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.4)', margin:0, letterSpacing:'0.5px' }}>{label}</p>
        <p style={{ fontSize:'0.88rem', fontWeight:600, color:'#fff', margin:0 }}>{value}</p>
      </div>
    </div>
  )
}

/* ── Laptop + Phone mockup ── */
function DeviceMockup({ project }) {
  return (
    <div style={{ position:'relative', width:'100%', minHeight:'340px' }}>
      {/* Laptop */}
      <motion.div
        initial={{ opacity:0, x:40, y:20 }}
        animate={{ opacity:1, x:0, y:0 }}
        transition={{ duration:0.9, ease, delay:0.2 }}
        style={{
          position:'absolute', left:0, top:0,
          width:'82%', zIndex:1,
        }}
      >
        {/* Screen */}
        <div style={{
          borderRadius:'12px 12px 0 0',
          overflow:'hidden',
          border:'2px solid rgba(255,255,255,0.15)',
          background:'#0a0a0a',
          aspectRatio:'16/10',
          boxShadow:'0 0 40px rgba(0,0,0,0.8)',
        }}>
          {/* Hotel JNG mockup content */}
          <div style={{
            width:'100%', height:'100%',
            background:'linear-gradient(135deg,#1a0d00 0%,#0d0800 40%,#000 100%)',
            display:'flex', flexDirection:'column',
            padding:'8px',
          }}>
            {/* Mock navbar */}
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'4px 8px', borderBottom:'1px solid rgba(255,200,100,0.2)', marginBottom:'6px' }}>
              <span style={{ color:'#c8a96e', fontSize:'0.5rem', fontWeight:700 }}>HOTEL JNG</span>
              <div style={{ display:'flex', gap:'6px' }}>
                {['HOME','ABOUT','MENU','GALLERY','CONTACT'].map(l => (
                  <span key={l} style={{ color:'rgba(255,255,255,0.5)', fontSize:'0.35rem' }}>{l}</span>
                ))}
                <span style={{ background:'#c8a96e', color:'#000', fontSize:'0.35rem', padding:'1px 4px', borderRadius:'2px' }}>RESERVATION</span>
              </div>
            </div>
            {/* Hero content */}
            <div style={{ flex:1, display:'flex', alignItems:'center', padding:'8px', background:'rgba(0,0,0,0.3)' }}>
              <div>
                <p style={{ color:'rgba(200,169,110,0.6)', fontSize:'0.4rem', letterSpacing:'2px', margin:'0 0 4px' }}>THE FINEST DINING EXPERIENCE</p>
                <h3 style={{ color:'#fff', fontSize:'0.8rem', fontWeight:800, margin:'0 0 6px', lineHeight:1.2 }}>THE FINEST<br/>DINING EXPERIENCE</h3>
                <p style={{ color:'rgba(255,255,255,0.5)', fontSize:'0.35rem', margin:'0 0 8px' }}>Discover a fine dining experience with exceptional flavors, a cozy ambiance and unforgettable moments.</p>
                <div style={{ background:'#c8a96e', color:'#000', fontSize:'0.4rem', padding:'3px 8px', borderRadius:'3px', display:'inline-block', fontWeight:700 }}>BOOK A TABLE</div>
              </div>
            </div>
          </div>
        </div>
        {/* Laptop base */}
        <div style={{ height:'8px', background:'linear-gradient(180deg,#2a2a2a,#1a1a1a)', borderRadius:'0 0 4px 4px' }} />
        <div style={{ height:'4px', background:'#111', borderRadius:'0 0 8px 8px', width:'60%', margin:'0 auto', boxShadow:'0 4px 20px rgba(0,0,0,0.5)' }} />
      </motion.div>

      {/* Phone */}
      <motion.div
        initial={{ opacity:0, x:20, y:40 }}
        animate={{ opacity:1, x:0, y:0 }}
        transition={{ duration:0.9, ease, delay:0.4 }}
        style={{
          position:'absolute', right:0, top:'30px',
          width:'22%', zIndex:2,
        }}
      >
        <div style={{
          borderRadius:'12px',
          overflow:'hidden',
          border:'2px solid rgba(255,255,255,0.2)',
          background:'#0a0a0a',
          aspectRatio:'9/19',
          boxShadow:'0 8px 40px rgba(0,0,0,0.7)',
        }}>
          <div style={{ width:'100%', height:'100%', background:'linear-gradient(135deg,#1a0d00,#0d0800)', padding:'4px' }}>
            <div style={{ background:'rgba(200,169,110,0.15)', borderRadius:'4px', padding:'4px', height:'100%', display:'flex', flexDirection:'column', justifyContent:'center' }}>
              <p style={{ color:'#c8a96e', fontSize:'0.3rem', textAlign:'center', fontWeight:700, margin:'0 0 3px' }}>HOTEL JNG</p>
              <p style={{ color:'#fff', fontSize:'0.45rem', textAlign:'center', fontWeight:800, lineHeight:1.2, margin:'0 0 4px' }}>THE FINEST<br/>DINING<br/>EXPERIENCE</p>
              <div style={{ background:'#c8a96e', color:'#000', fontSize:'0.28rem', padding:'2px 6px', borderRadius:'2px', textAlign:'center', fontWeight:700 }}>BOOK A TABLE</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

/* ── Challenge card ── */
function ChallengeCard({ data }) {
  return (
    <div style={{
      background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)',
      borderRadius:'16px', padding:'1.5rem', flex:'1 1 280px',
      position:'relative', overflow:'hidden',
    }}>
      {/* BG icon */}
      <div style={{ position:'absolute', bottom:'-10px', right:'-10px', fontSize:'6rem', opacity:0.04, pointerEvents:'none' }}>🎯</div>
      <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'1rem' }}>
        <span style={{ fontSize:'1.4rem' }}>🚨</span>
        <h3 style={{ fontSize:'0.8rem', fontWeight:700, letterSpacing:'2px', color:'#fff', margin:0 }}>THE CHALLENGE</h3>
      </div>
      <p style={{ fontSize:'0.82rem', color:'rgba(255,255,255,0.5)', lineHeight:1.7, marginBottom:'1rem' }}>{data.description}</p>
      <div style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
        {data.problems.map((p,i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:'8px' }}>
            <span style={{ color:'#ef4444', fontSize:'0.85rem' }}>✗</span>
            <span style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.6)' }}>{p}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Solution card ── */
function SolutionCard({ data }) {
  return (
    <div style={{
      background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)',
      borderRadius:'16px', padding:'1.5rem', flex:'1 1 280px',
    }}>
      <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'1rem' }}>
        <span style={{ fontSize:'1.4rem' }}>✅</span>
        <h3 style={{ fontSize:'0.8rem', fontWeight:700, letterSpacing:'2px', color:'#fff', margin:0 }}>OUR SOLUTION</h3>
      </div>
      <p style={{ fontSize:'0.82rem', color:'rgba(255,255,255,0.5)', lineHeight:1.7, marginBottom:'1rem' }}>{data.description}</p>
      <div style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
        {data.points.map((p,i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:'8px' }}>
            <span style={{ color:'#22c55e', fontSize:'0.85rem' }}>✓</span>
            <span style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.6)' }}>{p}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Results card ── */
function ResultsCard({ results }) {
  const colors = ['#a855f7','#3b82f6','#22c55e','#f59e0b']
  const icons  = ['🖥️','⚡','📈','🔍']
  return (
    <div style={{
      background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)',
      borderRadius:'16px', padding:'1.5rem', flex:'1 1 200px',
    }}>
      <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'1.25rem' }}>
        <span style={{ fontSize:'1.4rem' }}>📊</span>
        <h3 style={{ fontSize:'0.8rem', fontWeight:700, letterSpacing:'2px', color:'#fff', margin:0 }}>THE RESULTS</h3>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem' }}>
        {results.map((r,i) => (
          <div key={i} style={{
            background:'rgba(255,255,255,0.04)', borderRadius:'10px',
            padding:'0.75rem', textAlign:'center',
            border:`1px solid ${colors[i%4]}22`,
          }}>
            <div style={{ fontSize:'0.6rem', marginBottom:'3px' }}>{icons[i%4]}</div>
            <p style={{ fontSize:'1.2rem', fontWeight:800, color:colors[i%4], margin:'0 0 2px', letterSpacing:'-0.5px' }}>{r.value}</p>
            <p style={{ fontSize:'0.65rem', color:'rgba(255,255,255,0.45)', margin:0 }}>{r.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Tech stack card ── */
function TechCard({ techStack }) {
  return (
    <div style={{
      background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)',
      borderRadius:'16px', padding:'1.5rem', flex:'1 1 200px',
    }}>
      <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'1.25rem' }}>
        <span style={{ fontSize:'1.4rem' }}>⌨️</span>
        <h3 style={{ fontSize:'0.8rem', fontWeight:700, letterSpacing:'2px', color:'#fff', margin:0 }}>TECH STACK</h3>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'0.75rem' }}>
        {techStack.map((t,i) => (
          <motion.div key={i} whileHover={{ scale:1.08, y:-2 }}
            style={{
              background:'rgba(255,255,255,0.05)', borderRadius:'10px',
              padding:'0.75rem 0.5rem', textAlign:'center',
              border:'1px solid rgba(255,255,255,0.08)', cursor:'default',
            }}>
            <div style={{ fontSize:'1.4rem', marginBottom:'4px' }}>
              {t.icon.length <= 2
                ? <span style={{ fontFamily:'monospace', fontSize:'1rem', color:t.color, fontWeight:700 }}>{t.icon}</span>
                : t.icon}
            </div>
            <p style={{ fontSize:'0.6rem', color:'rgba(255,255,255,0.5)', margin:0, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{t.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ── Gallery ── */
function Gallery({ gallery }) {
  const [active, setActive] = useState(0)
  return (
    <div style={{
      background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)',
      borderRadius:'16px', padding:'1.5rem',
    }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1.25rem' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
          <span style={{ fontSize:'1.2rem' }}>🖼️</span>
          <h3 style={{ fontSize:'0.8rem', fontWeight:700, letterSpacing:'2px', color:'#fff', margin:0 }}>PROJECT GALLERY</h3>
        </div>
        <motion.button whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
          style={{
            padding:'7px 14px', borderRadius:'8px', fontSize:'0.75rem', fontWeight:500,
            background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)',
            color:'rgba(255,255,255,0.7)', cursor:'pointer',
          }}>
          View Full Screenshots
        </motion.button>
      </div>

      <div style={{ display:'flex', gap:'0.75rem', alignItems:'center' }}>
        {/* Prev */}
        <button onClick={() => setActive(p => (p-1+gallery.length)%gallery.length)}
          style={{ background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'50%', width:'32px', height:'32px', cursor:'pointer', color:'#fff', flexShrink:0 }}>‹</button>

        {/* Images */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'0.5rem', flex:1 }}>
          {gallery.map((g,i) => (
            <motion.div key={i}
              onClick={() => setActive(i)}
              whileHover={{ scale:1.03 }}
              style={{
                borderRadius:'8px', overflow:'hidden', cursor:'pointer',
                border: i===active ? '2px solid #6366f1' : '2px solid transparent',
                transition:'border 0.2s',
              }}>
              <div style={{ background:g.bg, aspectRatio:'4/3', display:'flex', alignItems:'center', justifyContent:'center', position:'relative' }}>
                <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.3)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <p style={{ color:'rgba(255,255,255,0.7)', fontSize:'0.5rem', textAlign:'center', padding:'4px' }}>{g.label}</p>
                </div>
              </div>
              <p style={{ fontSize:'0.6rem', color:'rgba(255,255,255,0.5)', textAlign:'center', margin:'4px 0 0', padding:'0 4px' }}>{g.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Next */}
        <button onClick={() => setActive(p => (p+1)%gallery.length)}
          style={{ background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'50%', width:'32px', height:'32px', cursor:'pointer', color:'#fff', flexShrink:0 }}>›</button>
      </div>
    </div>
  )
}

/* ── Client review ── */
function ClientReview({ review }) {
  return (
    <div style={{
      background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)',
      borderRadius:'16px', padding:'1.75rem',
    }}>
      <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'1rem' }}>
        <span style={{ fontSize:'1.5rem', color:'#6366f1' }}>❝</span>
        <h3 style={{ fontSize:'0.8rem', fontWeight:700, letterSpacing:'2px', color:'#fff', margin:0 }}>CLIENT REVIEW</h3>
      </div>
      <StarRating count={review.rating} size={20} />
      <p style={{ fontSize:'0.88rem', color:'rgba(255,255,255,0.65)', lineHeight:1.75, margin:'1rem 0 1.25rem', fontStyle:'italic' }}>
        {review.text}
      </p>
      <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
        <div style={{
          width:'46px', height:'46px', borderRadius:'50%',
          background:'linear-gradient(135deg,#c8a96e,#8b5e3c)',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:'1.2rem', flexShrink:0,
          border:'2px solid rgba(200,169,110,0.4)',
        }}>🏨</div>
        <div>
          <p style={{ fontWeight:700, fontSize:'0.92rem', color:'#fff', margin:0 }}>{review.name}</p>
          <p style={{ fontSize:'0.78rem', color:'rgba(255,255,255,0.4)', margin:0 }}>{review.role}</p>
        </div>
      </div>
    </div>
  )
}

/* ── CTA bottom bar ── */
function CTABar() {
  return (
    <div style={{
      background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)',
      borderRadius:'20px', padding:'2rem 2.5rem',
      display:'flex', alignItems:'center', flexWrap:'wrap', gap:'2rem',
    }}>
      <div style={{ flex:'1 1 280px' }}>
        <h2 style={{ fontSize:'1.35rem', fontWeight:800, color:'#fff', margin:'0 0 4px' }}>
          Let's build something amazing together
        </h2>
        <p style={{ fontSize:'0.85rem', color:'rgba(255,255,255,0.45)', margin:0 }}>
          Have a project in mind? We are here to bring your ideas to life.
        </p>
      </div>
      <CTAButton size="md" style={{ flexShrink:0 }}>
        Start Your Project →
      </CTAButton>
      <div style={{ display:'flex', gap:'2.5rem', flexWrap:'wrap' }}>
        {[
          { icon:'🗂️', value:'15+',  label:'Completed Projects' },
          { icon:'⭐', value:'98%',  label:'Client Satisfaction' },
          { icon:'🕐', value:'24/7', label:'Support'             },
          { icon:'⚡', value:'7 Days',label:'Average Delivery'   },
        ].map((s,i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:'10px' }}>
            <span style={{ fontSize:'1.4rem' }}>{s.icon}</span>
            <div>
              <p style={{ fontSize:'1rem', fontWeight:800, color:'#fff', margin:0 }}>{s.value}</p>
              <p style={{ fontSize:'0.65rem', color:'rgba(255,255,255,0.4)', margin:0 }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════ */
export default function CaseStudy() {
  const { slug }   = useParams()
  const navigate   = useNavigate()
  const project    = PROJECTS[slug] || PROJECTS['hotel-jng']

  useEffect(() => { window.scrollTo({ top:0 }) }, [slug])

  return (
    <div style={{ background:'#0a0a0f', minHeight:'100vh', color:'#fff', fontFamily:'Inter,sans-serif' }}>
      <Navbar/>

      <main style={{
        maxWidth:'1260px', margin:'0 auto',
        padding:'clamp(80px,10vw,110px) clamp(1rem,3vw,2rem) 4rem',
      }}>

        {/* ── Breadcrumb ── */}
        <FadeIn delay={0}>
          <nav style={{ display:'flex', alignItems:'center', gap:'8px', fontSize:'0.82rem', color:'rgba(255,255,255,0.4)', marginBottom:'1.75rem' }}>
            <span onClick={() => navigate('/')} style={{ cursor:'pointer' }}>Home</span>
            <span>›</span>
            <span onClick={() => navigate('/work')} style={{ cursor:'pointer' }}>Projects</span>
            <span>›</span>
            <span style={{ color:'#fff', fontWeight:500 }}>{project.title}</span>
          </nav>
        </FadeIn>

        {/* ── Hero: Left text + Right mockup ── */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1.15fr', gap:'3rem', alignItems:'center', marginBottom:'3rem' }}
          className="cs-hero-grid">

          {/* Left */}
          <div>
            <FadeIn delay={0.05}>
              <div style={{
                display:'inline-flex', alignItems:'center', gap:'6px',
                padding:'5px 12px', borderRadius:'20px', marginBottom:'1.25rem',
                background:'rgba(99,102,241,0.15)', border:'1px solid rgba(99,102,241,0.35)',
              }}>
                <span style={{ fontSize:'0.75rem' }}>⭐</span>
                <span style={{ fontSize:'0.72rem', fontWeight:600, letterSpacing:'1.5px', color:'#a5b4fc' }}>{project.badge}</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 style={{ fontSize:'clamp(2.4rem,5vw,3.8rem)', fontWeight:900, margin:'0 0 0.5rem', letterSpacing:'-1px', lineHeight:1.05 }}>
                {project.title}
              </h1>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p style={{
                fontSize:'1.05rem', fontWeight:600, margin:'0 0 1rem',
                background:'linear-gradient(135deg,#818cf8,#6366f1)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
              }}>
                {project.subtitle}
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p style={{ fontSize:'0.88rem', color:'rgba(255,255,255,0.5)', lineHeight:1.75, marginBottom:'1.5rem', maxWidth:'420px' }}>
                {project.description}
              </p>
            </FadeIn>

            {/* Info row */}
            <FadeIn delay={0.25}>
              <div style={{ display:'flex', gap:'1.5rem', flexWrap:'wrap', marginBottom:'1.75rem', paddingBottom:'1.5rem', borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
                <InfoBadge icon="📍" label="Location"    value={project.location}  />
                <InfoBadge icon="📅" label="Completed On" value={project.completed}  />
                <InfoBadge icon="⏱️" label="Delivery Time" value={project.delivery}  />
                <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                  <span style={{ fontSize:'1.2rem', opacity:0.7 }}>⭐</span>
                  <div>
                    <p style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.4)', margin:0 }}>Client Rating</p>
                    <div style={{ display:'flex', alignItems:'center', gap:'4px' }}>
                      <StarRating count={5} size={13} />
                      <span style={{ fontSize:'0.82rem', fontWeight:600 }}>{project.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Buttons */}
            <FadeIn delay={0.3}>
              <div style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}>
                <motion.a
                  href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale:1.04, boxShadow:'0 0 28px rgba(99,102,241,0.45)' }}
                  whileTap={{ scale:0.97 }}
                  style={{
                    display:'inline-flex', alignItems:'center', gap:'8px',
                    padding:'12px 24px', borderRadius:'50px', textDecoration:'none',
                    background:'linear-gradient(135deg,#6366f1,#7c3aed)',
                    color:'#fff', fontWeight:600, fontSize:'0.9rem',
                    border:'1px solid rgba(150,100,255,0.4)',
                    boxShadow:'inset 0 1px 0 rgba(255,255,255,0.2)',
                    minHeight:'44px',
                  }}
                >
                  Visit Live Website <span style={{ background:'rgba(255,255,255,0.2)', borderRadius:'50%', width:'20px', height:'20px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.75rem' }}>↗</span>
                </motion.a>
                <motion.button
                  onClick={() => navigate('/contact')}
                  whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
                  style={{
                    display:'inline-flex', alignItems:'center', gap:'8px',
                    padding:'12px 24px', borderRadius:'50px',
                    background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.12)',
                    color:'rgba(255,255,255,0.8)', fontWeight:500, fontSize:'0.9rem',
                    cursor:'pointer', minHeight:'44px',
                  }}
                >
                  💬 Request Similar Project
                </motion.button>
              </div>
            </FadeIn>
          </div>

          {/* Right — Device mockup */}
          <FadeIn delay={0.2} x={40} y={0}>
            <DeviceMockup project={project} />
          </FadeIn>
        </div>

        {/* ── 4 cards row: Challenge / Solution / Results / Tech ── */}
        <FadeIn delay={0.1}>
          <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap', marginBottom:'1.5rem' }}>
            <ChallengeCard data={project.challenge} />
            <SolutionCard  data={project.solution}  />
            <ResultsCard   results={project.results} />
            <TechCard      techStack={project.techStack} />
          </div>
        </FadeIn>

        {/* ── Gallery + Review ── */}
        <FadeIn delay={0.1}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 0.55fr', gap:'1rem', marginBottom:'1.5rem' }}
            className="cs-gallery-grid">
            <Gallery      gallery={project.gallery} />
            <ClientReview review={project.review}   />
          </div>
        </FadeIn>

        {/* ── Similar Projects ── */}
        <FadeIn delay={0.1}>
          <div style={{
            background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)',
            borderRadius:'16px', padding:'1.5rem', marginBottom:'1.5rem',
          }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1.25rem' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                <span style={{ fontSize:'1.2rem' }}>🔀</span>
                <h3 style={{ fontSize:'0.8rem', fontWeight:700, letterSpacing:'2px', color:'#fff', margin:0 }}>SIMILAR PROJECTS</h3>
              </div>
              <motion.button
                onClick={() => navigate('/work')}
                whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
                style={{
                  padding:'7px 14px', borderRadius:'8px', fontSize:'0.75rem', fontWeight:500,
                  background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)',
                  color:'rgba(255,255,255,0.7)', cursor:'pointer',
                }}>
                View All Projects
              </motion.button>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:'0.75rem' }}>
              {SIMILAR.map((s,i) => (
                <motion.div key={i}
                  whileHover={{ scale:1.02, y:-3 }}
                  onClick={() => navigate('/work')}
                  style={{
                    borderRadius:'12px', overflow:'hidden', cursor:'pointer',
                    border:'1px solid rgba(255,255,255,0.08)', position:'relative',
                  }}>
                  <div style={{ background:s.bg, height:'80px', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <span style={{ fontSize:'1.5rem' }}>🏪</span>
                  </div>
                  <div style={{ padding:'10px 12px', background:'rgba(255,255,255,0.03)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <div>
                      <p style={{ fontSize:'0.82rem', fontWeight:600, color:'#fff', margin:0 }}>{s.title}</p>
                      <p style={{ fontSize:'0.65rem', color:'rgba(255,255,255,0.4)', margin:0 }}>{s.sub}</p>
                    </div>
                    <span style={{ color:'rgba(255,255,255,0.4)', fontSize:'1rem' }}>→</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* ── CTA Bar ── */}
        <FadeIn delay={0.1}>
          <CTABar />
        </FadeIn>
      </main>

      <Footer/>
    </div>
  )
}