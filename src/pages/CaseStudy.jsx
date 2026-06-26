import { useParams, useNavigate } from 'react-router-dom'
import { motion }                  from 'framer-motion'
import Navbar                      from '../components/Navbar'
import Footer                      from '../components/Footer'
import BackButton                  from '../components/BackButton'
import CTAButton                   from '../components/CTAButton'

const ease = [0.22, 1, 0.36, 1]

const CASE_STUDIES = {
  'fintech-dashboard': {
    title:       'Fintech Dashboard',
    category:    'Web Design',
    client:      'FinanceFlow Inc.',
    year:        '2024',
    duration:    '8 weeks',
    color:       'rgba(120,60,220,0.6)',
    border:      'rgba(150,80,255,0.4)',
    overview:    'A comprehensive real-time analytics dashboard for a leading fintech startup. The platform tracks financial data, user transactions, and market trends in a clean, intuitive interface.',
    challenge:   'The client needed to visualize complex financial data across multiple user segments without overwhelming their users. The existing solution was slow, outdated, and confusing.',
    solution:    'We redesigned the entire dashboard from scratch using a component-based system with real-time data visualization, role-based access control, and a premium dark UI that feels fast and trustworthy.',
    tech:        ['React','TypeScript','Node.js','PostgreSQL','Chart.js','Tailwind CSS','AWS'],
    results:     [
      { n:'↑ 340%', l:'User Engagement'    },
      { n:'↓ 60%',  l:'Support Tickets'    },
      { n:'↑ 2.4s', l:'Faster Load Time'   },
      { n:'98%',    l:'Client Satisfaction' },
    ],
    process: [
      { step:'01', title:'Discovery',    desc:'Deep dive into user needs, pain points, and business goals through stakeholder interviews.' },
      { step:'02', title:'Wireframing',  desc:'Created low-fidelity wireframes for 20+ screens, validated with the product team.' },
      { step:'03', title:'UI Design',    desc:'Developed a premium dark design system with consistent components and micro-interactions.' },
      { step:'04', title:'Development',  desc:'Built with React + TypeScript, ensuring type safety, performance, and scalability.' },
      { step:'05', title:'Launch',       desc:'Deployed on AWS with zero-downtime, full QA, and client handover documentation.' },
    ],
    testimonial: {
      quote: '"NOVAA completely transformed our product. The new dashboard reduced our churn by 40% in the first month alone. Absolutely premium work."',
      name:  'Alex Morgan',
      role:  'CEO, FinanceFlow Inc.',
    },
  },
  'saas-platform': {
    title:    'SaaS Platform',
    category: 'Development',
    client:   'CollabSpace',
    year:     '2024',
    duration: '12 weeks',
    color:    'rgba(20,100,200,0.6)',
    border:   'rgba(50,130,255,0.4)',
    overview: 'A scalable team collaboration SaaS platform built for remote-first companies. Features real-time messaging, project management, and file sharing.',
    challenge:'The client needed a reliable, scalable architecture that could handle thousands of concurrent users without performance degradation.',
    solution: 'Built a microservices architecture with WebSocket real-time communication, Redis caching, and auto-scaling infrastructure on AWS.',
    tech:     ['React','Node.js','PostgreSQL','Redis','WebSockets','Docker','AWS','Tailwind CSS'],
    results:  [
      { n:'10K+', l:'Active Users'        },
      { n:'99.9%', l:'Uptime'             },
      { n:'↑ 280%', l:'Team Productivity' },
      { n:'↓ 70%', l:'Email Dependency'   },
    ],
    process: [
      { step:'01', title:'Architecture',  desc:'Designed a scalable microservices architecture with clear service boundaries.' },
      { step:'02', title:'Database',      desc:'Optimized PostgreSQL schema with Redis caching for real-time performance.' },
      { step:'03', title:'Backend',       desc:'Built REST + WebSocket APIs with Node.js for real-time collaboration.' },
      { step:'04', title:'Frontend',      desc:'Developed a pixel-perfect React UI with Framer Motion animations.' },
      { step:'05', title:'Deployment',    desc:'Dockerized microservices deployed on AWS ECS with auto-scaling.' },
    ],
    testimonial: {
      quote: '"Our team productivity jumped 280% after switching to the platform NOVAA built for us. The real-time features work flawlessly."',
      name:  'Sarah Chen',
      role:  'CTO, CollabSpace',
    },
  },
  'brand-identity': {
    title:    'Brand Identity',
    category: 'Branding',
    client:   'Nurvia Wellness',
    year:     '2024',
    duration: '6 weeks',
    color:    'rgba(0,140,120,0.6)',
    border:   'rgba(0,200,160,0.4)',
    overview: 'Complete brand identity system for a premium health & wellness brand entering the luxury market. Included logo, typography, color system, packaging, and brand guidelines.',
    challenge:'Nurvia needed to differentiate itself in a crowded wellness market and appeal to premium consumers aged 30-50 who value quality and aesthetics.',
    solution: 'Created a sophisticated brand identity using botanical illustration motifs, a refined gold+white color palette, and premium packaging design that stands out on shelves.',
    tech:     ['Figma','Adobe Illustrator','Adobe Photoshop','Brand Guidelines','Packaging Design'],
    results:  [
      { n:'↑ 180%', l:'Brand Recognition'  },
      { n:'3x',     l:'Premium Pricing'     },
      { n:'↑ 240%', l:'Social Engagement'  },
      { n:'15+',    l:'Retail Partners'     },
    ],
    process: [
      { step:'01', title:'Research',   desc:'Competitive landscape analysis and target audience persona development.' },
      { step:'02', title:'Strategy',   desc:'Defined brand positioning, voice, personality, and visual direction.' },
      { step:'03', title:'Identity',   desc:'Designed logo variations, color system, and typography hierarchy.' },
      { step:'04', title:'Packaging',  desc:'Created premium packaging designs across 8 product SKUs.' },
      { step:'05', title:'Guidelines', desc:'Delivered a 60-page brand book covering all brand touchpoints.' },
    ],
    testimonial: {
      quote: '"NOVAA gave us a brand that truly represents who we are. Our retail partners were immediately impressed, and our premium pricing was justified from day one."',
      name:  'Emma Laurent',
      role:  'Founder, Nurvia Wellness',
    },
  },
}

/* ── Fallback for unknown slugs ── */
const DEFAULT_STUDY = {
  title:      'Case Study',
  category:   'Project',
  client:     'NOVAA Client',
  year:       '2024',
  duration:   '8 weeks',
  color:      'rgba(100,40,200,0.6)',
  border:     'rgba(140,70,255,0.4)',
  overview:   'A premium digital project delivered with precision, creativity, and measurable results.',
  challenge:  'The client needed a complete digital transformation to stay competitive in their market.',
  solution:   'We delivered a full-stack solution combining premium design with scalable development.',
  tech:       ['React','Node.js','Tailwind CSS','AWS'],
  results:    [
    { n:'↑ 200%', l:'Performance'        },
    { n:'98%',    l:'Client Satisfaction' },
    { n:'↓ 50%',  l:'Load Time'          },
    { n:'3x',     l:'Conversions'         },
  ],
  process: [
    { step:'01', title:'Discovery',   desc:'Understanding goals, audience, and requirements.' },
    { step:'02', title:'Strategy',    desc:'Crafting the perfect plan and approach.'          },
    { step:'03', title:'Design',      desc:'Building premium visuals and interactions.'       },
    { step:'04', title:'Development', desc:'Bringing the design to life with clean code.'    },
    { step:'05', title:'Launch',      desc:'Deploying and optimizing for real-world use.'    },
  ],
  testimonial: {
    quote: '"Working with NOVAA was an exceptional experience. They delivered beyond our expectations."',
    name:  'Client Name',
    role:  'CEO, Company',
  },
}

export default function CaseStudy() {
  const { slug }   = useParams()
  const navigate   = useNavigate()
  const study      = CASE_STUDIES[slug] || { ...DEFAULT_STUDY, title: slug?.replace(/-/g,' ').replace(/\b\w/g, c => c.toUpperCase()) || 'Case Study' }

  return (
    <div style={{ position:'relative', zIndex:1, minHeight:'100vh' }}>
      <Navbar />

      <div style={{ maxWidth:'1000px', margin:'0 auto', padding:'0 1.5rem' }}>

        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          transition={{ duration:0.5 }}
          style={{
            paddingTop:'90px',
            display:'flex', alignItems:'center', gap:'8px',
            fontSize:'0.8rem', color:'rgba(255,255,255,0.35)',
            marginBottom:'3rem',
          }}
        >

          <div style={{ marginBottom:'1.5rem' }}>
  <BackButton label="Back to Work" />
</div>

          <span onClick={() => navigate('/')}
            style={{ cursor:'pointer', color:'rgba(255,255,255,0.35)' }}>Home</span>
          <span>›</span>
          <span onClick={() => navigate('/work')}
            style={{ cursor:'pointer', color:'rgba(255,255,255,0.35)' }}>Work</span>
          <span>›</span>
          <span style={{ color:'rgba(255,255,255,0.7)' }}>{study.title}</span>
        </motion.div>

        {/* ── HERO ── */}
        <motion.div
          initial={{ opacity:0, y:28 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.8, ease }}
          style={{ marginBottom:'4rem' }}
        >
          {/* Category tag */}
          <div style={{
            display:'inline-flex', alignItems:'center', gap:'8px',
            padding:'5px 14px', borderRadius:'50px', marginBottom:'1.5rem',
            background: study.color,
            border: `1px solid ${study.border}`,
            fontSize:'0.72rem', fontWeight:600, color:'#fff',
            letterSpacing:'1px',
          }}>
            {study.category}
          </div>

          <h1 style={{
            fontSize:'clamp(2.5rem,6vw,4.5rem)',
            fontWeight:800, color:'#fff',
            letterSpacing:'-0.03em', lineHeight:1.05,
            marginBottom:'1.5rem',
          }}>
            {study.title}
          </h1>

          {/* Meta info */}
          <div style={{ display:'flex', gap:'2rem', flexWrap:'wrap', marginBottom:'2rem' }}>
            {[
              { l:'Client',   v: study.client   },
              { l:'Year',     v: study.year     },
              { l:'Duration', v: study.duration },
              { l:'Category', v: study.category },
            ].map(m => (
              <div key={m.l}>
                <p style={{ fontSize:'0.7rem', color:'rgba(255,255,255,0.3)', letterSpacing:'1.5px', textTransform:'uppercase', marginBottom:'3px' }}>{m.l}</p>
                <p style={{ fontSize:'0.92rem', color:'#fff', fontWeight:600 }}>{m.v}</p>
              </div>
            ))}
          </div>

          {/* Hero visual */}
          <div style={{
            width:'100%', height:'360px', borderRadius:'20px', overflow:'hidden',
            background:`linear-gradient(135deg, ${study.color} 0%, rgba(10,15,50,0.8) 100%)`,
            border:'1px solid rgba(255,255,255,0.1)',
            boxShadow:'0 24px 60px rgba(0,0,0,0.5)',
            display:'flex', alignItems:'center', justifyContent:'center',
            position:'relative',
          }}>
            <div style={{ textAlign:'center' }}>
              <p style={{ fontSize:'4rem', marginBottom:'1rem' }}>
                {study.category === 'Web Design' ? '🖥️'
                  : study.category === 'Development' ? '⌨️'
                  : study.category === 'Branding' ? '💎'
                  : '📈'}
              </p>
              <p style={{ fontSize:'1.2rem', fontWeight:700, color:'rgba(255,255,255,0.6)' }}>
                {study.title}
              </p>
            </div>
            {/* Decorative corners */}
            {['top-left','top-right','bottom-left','bottom-right'].map(pos => (
              <div key={pos} style={{
                position:'absolute',
                top:    pos.includes('top')    ? '16px' : 'auto',
                bottom: pos.includes('bottom') ? '16px' : 'auto',
                left:   pos.includes('left')   ? '16px' : 'auto',
                right:  pos.includes('right')  ? '16px' : 'auto',
                width:'20px', height:'20px',
                borderTop:    pos.includes('top')    ? '2px solid rgba(255,255,255,0.2)' : 'none',
                borderBottom: pos.includes('bottom') ? '2px solid rgba(255,255,255,0.2)' : 'none',
                borderLeft:   pos.includes('left')   ? '2px solid rgba(255,255,255,0.2)' : 'none',
                borderRight:  pos.includes('right')  ? '2px solid rgba(255,255,255,0.2)' : 'none',
              }} />
            ))}
          </div>
        </motion.div>

        {/* ── OVERVIEW ── */}
        <GlassSection title="Project Overview" icon="📋" delay={0.1}>
          <p style={{ fontSize:'1.05rem', color:'rgba(255,255,255,0.6)', lineHeight:1.85 }}>
            {study.overview}
          </p>
        </GlassSection>

        {/* ── CHALLENGE + SOLUTION ── */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem', marginBottom:'1.25rem' }}
          className="cs-two-col">
          <GlassSection title="The Challenge" icon="⚡" delay={0.15} noMargin>
            <p style={{ fontSize:'0.92rem', color:'rgba(255,255,255,0.5)', lineHeight:1.8 }}>
              {study.challenge}
            </p>
          </GlassSection>
          <GlassSection title="Our Solution" icon="✅" delay={0.2} noMargin>
            <p style={{ fontSize:'0.92rem', color:'rgba(255,255,255,0.5)', lineHeight:1.8 }}>
              {study.solution}
            </p>
          </GlassSection>
        </div>

        {/* ── PROCESS ── */}
        <GlassSection title="Design & Development Process" icon="🗺️" delay={0.25}>
          <div style={{ display:'flex', flexDirection:'column', gap:'1rem', marginTop:'0.5rem' }}>
            {study.process.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity:0, x:-16 }}
                whileInView={{ opacity:1, x:0 }}
                viewport={{ once:true }}
                transition={{ delay: i*0.08, duration:0.5, ease }}
                style={{
                  display:'flex', gap:'1.25rem', alignItems:'flex-start',
                  padding:'1rem',
                  borderRadius:'12px',
                  background:'rgba(255,255,255,0.03)',
                  border:'1px solid rgba(255,255,255,0.07)',
                }}
              >
                <span style={{
                  fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.5px',
                  background:'linear-gradient(135deg,#c084fc,#06b6d4)',
                  WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
                  minWidth:'24px', marginTop:'2px',
                }}>{p.step}</span>
                <div>
                  <p style={{ fontSize:'0.95rem', fontWeight:700, color:'#fff', marginBottom:'3px' }}>{p.title}</p>
                  <p style={{ fontSize:'0.82rem', color:'rgba(255,255,255,0.42)', lineHeight:1.65 }}>{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassSection>

        {/* ── TECH STACK ── */}
        <GlassSection title="Technologies Used" icon="⚙️" delay={0.3}>
          <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', marginTop:'0.5rem' }}>
            {study.tech.map((t, i) => (
              <motion.div
                key={t}
                initial={{ opacity:0, scale:0.9 }}
                whileInView={{ opacity:1, scale:1 }}
                viewport={{ once:true }}
                transition={{ delay: i*0.05, duration:0.4 }}
                style={{
                  padding:'7px 16px', borderRadius:'50px',
                  background:'rgba(255,255,255,0.05)',
                  border:'1px solid rgba(255,255,255,0.1)',
                  fontSize:'0.8rem', fontWeight:600,
                  color:'rgba(255,255,255,0.65)',
                }}
              >
                {t}
              </motion.div>
            ))}
          </div>
        </GlassSection>

        {/* ── RESULTS ── */}
        <GlassSection title="Results Achieved" icon="📈" delay={0.35}>
          <div style={{
            display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',
            gap:'1rem', marginTop:'0.75rem',
          }}>
            {study.results.map((r, i) => (
              <motion.div
                key={r.l}
                initial={{ opacity:0, y:16 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }}
                transition={{ delay: i*0.1, duration:0.5 }}
                style={{
                  padding:'1.25rem', borderRadius:'14px', textAlign:'center',
                  background:'rgba(255,255,255,0.04)',
                  border:'1px solid rgba(255,255,255,0.08)',
                }}
              >
                <p style={{
                  fontSize:'2rem', fontWeight:800, letterSpacing:'-0.02em',
                  background:'linear-gradient(135deg,#c084fc,#06b6d4)',
                  WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
                  marginBottom:'4px',
                }}>{r.n}</p>
                <p style={{ fontSize:'0.78rem', color:'rgba(255,255,255,0.4)' }}>{r.l}</p>
              </motion.div>
            ))}
          </div>
        </GlassSection>

        {/* ── TESTIMONIAL ── */}
        <motion.div
          initial={{ opacity:0, y:24 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.7, delay:0.4, ease }}
          style={{
            padding:'2.5rem', borderRadius:'20px', marginBottom:'1.25rem',
            background:'rgba(100,40,200,0.1)',
            backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
            border:'1px solid rgba(150,80,255,0.2)',
            boxShadow:'inset 0 1px 0 rgba(255,255,255,0.08)',
            textAlign:'center',
          }}
        >
          <div style={{ fontSize:'2.5rem', marginBottom:'1.25rem', opacity:0.6 }}>"</div>
          <p style={{
            fontSize:'1.05rem', color:'rgba(255,255,255,0.7)',
            lineHeight:1.85, fontStyle:'italic',
            maxWidth:'620px', margin:'0 auto 1.5rem',
          }}>
            {study.testimonial.quote}
          </p>
          <p style={{ fontSize:'0.92rem', fontWeight:700, color:'#fff' }}>{study.testimonial.name}</p>
          <p style={{ fontSize:'0.78rem', color:'rgba(255,255,255,0.38)', marginTop:'3px' }}>{study.testimonial.role}</p>
        </motion.div>

        {/* ── FINAL CTA ── */}
        <motion.div
          initial={{ opacity:0, y:24 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.7, ease }}
          style={{
            padding:'2.5rem 3rem', borderRadius:'20px', marginBottom:'4rem',
            background:'rgba(15,10,40,0.55)',
            backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
            border:'1px solid rgba(255,255,255,0.08)',
            display:'flex', alignItems:'center', justifyContent:'space-between',
            flexWrap:'wrap', gap:'2rem',
          }}
        >
          <div>
            <h2 style={{
              fontSize:'clamp(1.3rem,3vw,2rem)', fontWeight:800,
              color:'#fff', letterSpacing:'-0.02em', marginBottom:'0.4rem',
            }}>
              Ready to Build Something Like This?
            </h2>
            <p style={{ fontSize:'0.85rem', color:'rgba(255,255,255,0.4)', lineHeight:1.65 }}>
              Let's create something extraordinary for your business.
            </p>
          </div>
          <div style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}>
            <motion.button
              onClick={() => navigate('/contact')}
              whileHover={{ scale:1.04, boxShadow:'0 0 32px rgba(120,60,220,0.5)' }}
              whileTap={{ scale:0.97 }}
              style={{
                display:'inline-flex', alignItems:'center', gap:'10px',
                padding:'13px 26px', borderRadius:'50px',
                background:'linear-gradient(135deg,#7c3aed,#4f46e5)',
                border:'1px solid rgba(150,80,255,0.4)',
                boxShadow:'inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 24px rgba(100,40,200,0.35)',
                color:'#fff', fontWeight:600, fontSize:'0.93rem', cursor:'pointer',
              }}
            >
              <CTAButton size="lg">Start Your Project →</CTAButton>
            </motion.button>
            <motion.button
              onClick={() => navigate('/work')}
              whileHover={{ scale:1.03 }}
              whileTap={{ scale:0.97 }}
              style={{
                padding:'13px 26px', borderRadius:'50px',
                background:'rgba(255,255,255,0.04)',
                border:'1px solid rgba(255,255,255,0.12)',
                color:'rgba(255,255,255,0.7)', fontWeight:500,
                fontSize:'0.93rem', cursor:'pointer',
              }}
            >
              <CTAButton size="lg">View Our Work →</CTAButton> 
            </motion.button>
          </div>
        </motion.div>

      </div>
      <Footer />
    </div>
  )
}

/* ── Reusable glass section ── */
function GlassSection({ title, icon, children, delay=0, noMargin=false }) {
  return (
    <motion.div
      initial={{ opacity:0, y:20 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }}
      transition={{ duration:0.6, delay, ease:[0.22,1,0.36,1] }}
      style={{
        padding:'2rem', borderRadius:'20px',
        marginBottom: noMargin ? 0 : '1.25rem',
        background:'rgba(15,10,40,0.55)',
        backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
        border:'1px solid rgba(255,255,255,0.08)',
        boxShadow:'inset 0 1px 0 rgba(255,255,255,0.07)',
        height: noMargin ? '100%' : 'auto',
      }}
    >
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1.25rem' }}>
        <div style={{
          width:'36px', height:'36px', borderRadius:'10px', flexShrink:0,
          display:'flex', alignItems:'center', justifyContent:'center',
          background:'rgba(100,40,200,0.3)',
          border:'1px solid rgba(140,70,255,0.3)', fontSize:'1rem',
        }}>{icon}</div>
        <h2 style={{ fontSize:'1.1rem', fontWeight:700, color:'#fff' }}>{title}</h2>
      </div>
      {children}
    </motion.div>
  )
}