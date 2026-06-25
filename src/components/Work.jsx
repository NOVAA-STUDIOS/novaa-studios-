import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard from './ProjectCard'

const ease = [0.22, 1, 0.36, 1]

const STATS = [
  { icon: '🚀', n: '50+',  l: 'Projects\nCompleted'    },
  { icon: '⭐', n: '98%',  l: 'Client\nSatisfaction'   },
  { icon: '🌐', n: '20+',  l: 'Industries\nServed'      },
  { icon: '⚡', n: '2x',   l: 'Faster\nDelivery'        },
]

const TABS = ['All Work', 'Web Design', 'Development', 'Branding', 'SEO']

const PROJECTS = [
  {
    category:      'Web Design',
    title:         'Fintech Dashboard',
    desc:          'Modern dashboard for a fintech platform with real-time analytics.',
    gradientFrom:  'rgba(60,20,160,0.9)',
    gradientTo:    'rgba(20,60,180,0.8)',
  },
  {
    category:      'Development',
    title:         'SaaS Platform',
    desc:          'Scalable SaaS platform built for teams to collaborate seamlessly.',
    gradientFrom:  'rgba(15,40,120,0.9)',
    gradientTo:    'rgba(0,100,140,0.8)',
  },
  {
    category:      'Branding',
    title:         'Brand Identity',
    desc:          'Complete brand identity design for a health & wellness brand.',
    gradientFrom:  'rgba(0,80,80,0.9)',
    gradientTo:    'rgba(0,140,110,0.8)',
  },
  {
    category:      'Web Design',
    title:         'E-commerce Store',
    desc:          'High-converting e-commerce store with clean UX/UI.',
    gradientFrom:  'rgba(80,20,140,0.9)',
    gradientTo:    'rgba(40,10,100,0.8)',
  },
  {
    category:      'Development',
    title:         'Mobile App',
    desc:          'Cross-platform mobile app for better user engagement.',
    gradientFrom:  'rgba(10,30,100,0.9)',
    gradientTo:    'rgba(60,0,120,0.8)',
  },
  {
    category:      'SEO',
    title:         'Growth Campaign',
    desc:          'SEO and performance marketing that drove 200% growth.',
    gradientFrom:  'rgba(0,60,60,0.9)',
    gradientTo:    'rgba(20,100,80,0.8)',
  },
]

const TAB_MAP = {
  'All Work':    null,
  'Web Design':  'Web Design',
  'Development': 'Development',
  'Branding':    'Branding',
  'SEO':         'SEO',
}

export default function Work() {
  const [active, setActive] = useState('All Work')

  const filtered = TAB_MAP[active]
    ? PROJECTS.filter(p => p.category === TAB_MAP[active] || p.category.includes(TAB_MAP[active]))
    : PROJECTS

  return (
    <section
      id="work"
      style={{
        minHeight:  '100vh',
        padding:    '120px 1.5rem 80px',
        position:   'relative',
        zIndex:     1,
        maxWidth:   '1220px',
        margin:     '0 auto',
      }}
    >

      {/* ══════════════════════════
          HERO — LEFT + RIGHT
      ══════════════════════════ */}
      <div style={{
        display:             'grid',
        gridTemplateColumns: '1fr 1fr',
        gap:                 '3rem',
        alignItems:          'flex-start',
        marginBottom:        '2.5rem',
      }}
        className="work-hero-grid"
      >

        {/* LEFT */}
        <div>
          {/* Badge */}
          <motion.div
            initial={{ opacity:0, y:14 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.6, ease }}
            style={{ marginBottom:'1.25rem' }}
          >
            <div style={{
              display:              'inline-flex',
              alignItems:           'center',
              gap:                  '9px',
              padding:              '7px 16px',
              borderRadius:         '50px',
              background:           'rgba(10,10,40,0.65)',
              backdropFilter:       'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border:               '1px solid rgba(255,255,255,0.13)',
              boxShadow:            'inset 0 1px 0 rgba(255,255,255,0.1)',
            }}>
              <span style={{
                width:'7px', height:'7px', borderRadius:'50%',
                background:'#6366f1',
                boxShadow:'0 0 10px #6366f1, 0 0 20px rgba(99,102,241,0.5)',
                flexShrink:0,
              }} />
              <span style={{
                fontSize:'0.72rem', fontWeight:600,
                letterSpacing:'2.5px', textTransform:'uppercase',
                color:'rgba(255,255,255,0.65)',
              }}>
                Our Work
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity:0, y:24 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.8, delay:0.1, ease }}
          >
            <h1 style={{
              fontSize:      'clamp(2.4rem, 5vw, 3.8rem)',
              fontWeight:    800,
              lineHeight:    1.08,
              letterSpacing: '-0.03em',
              marginBottom:  '1.25rem',
            }}>
              <span style={{
                background:           'linear-gradient(160deg,#fff 0%,rgba(255,255,255,0.85) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor:  'transparent',
                display:              'block',
              }}>
                Work That
              </span>
              <span style={{
                background:           'linear-gradient(135deg, #c084fc 0%, #06b6d4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor:  'transparent',
                display:              'block',
              }}>
                Speaks for Itself.
              </span>
            </h1>
          </motion.div>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity:0, y:14 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.7, delay:0.2, ease }}
            style={{
              fontSize:   '0.92rem',
              color:      'rgba(255,255,255,0.42)',
              lineHeight: 1.8,
              maxWidth:   '380px',
            }}
          >
            We partner with startups and brands to design and build digital experiences that are not only beautiful but also purposeful and results-driven.
          </motion.p>
        </div>

        {/* RIGHT — Stat cards (2x2 grid) */}
        <motion.div
          initial={{ opacity:0, x:24 }}
          whileInView={{ opacity:1, x:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.8, delay:0.15, ease }}
          style={{
            display:             'grid',
            gridTemplateColumns: '1fr 1fr',
            gap:                 '0.75rem',
          }}
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity:0, y:16 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ delay: 0.2 + i*0.08, duration:0.6, ease }}
              style={{
                padding:              '1.25rem',
                borderRadius:         '16px',
                background:           'rgba(15,10,40,0.55)',
                backdropFilter:       'blur(24px) saturate(150%)',
                WebkitBackdropFilter: 'blur(24px) saturate(150%)',
                border:               '1px solid rgba(255,255,255,0.09)',
                boxShadow:            'inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.35)',
                display:              'flex',
                flexDirection:        'column',
                alignItems:           'center',
                textAlign:            'center',
                gap:                  '0.6rem',
              }}
            >
              {/* Icon */}
              <div style={{
                width:          '44px', height: '44px',
                borderRadius:   '12px',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                fontSize:       '1.2rem',
                background:     i === 0 ? 'rgba(120,60,220,0.3)'
                              : i === 1 ? 'rgba(0,180,160,0.3)'
                              : i === 2 ? 'rgba(30,80,200,0.3)'
                              :           'rgba(160,60,220,0.3)',
                border:         i === 0 ? '1px solid rgba(150,80,255,0.3)'
                              : i === 1 ? '1px solid rgba(0,220,180,0.3)'
                              : i === 2 ? '1px solid rgba(60,120,255,0.3)'
                              :           '1px solid rgba(180,80,255,0.3)',
                boxShadow:      i === 0 ? '0 0 16px rgba(120,60,220,0.25)'
                              : i === 1 ? '0 0 16px rgba(0,200,160,0.25)'
                              : i === 2 ? '0 0 16px rgba(40,100,220,0.25)'
                              :           '0 0 16px rgba(160,60,220,0.25)',
              }}>
                {s.icon}
              </div>

              {/* Number */}
              <p style={{
                fontSize:      '1.8rem',
                fontWeight:    800,
                color:         '#fff',
                letterSpacing: '-0.03em',
                lineHeight:    1,
              }}>
                {s.n}
              </p>

              {/* Label */}
              <p style={{
                fontSize:   '0.75rem',
                color:      'rgba(255,255,255,0.38)',
                lineHeight: 1.4,
                whiteSpace: 'pre-line',
              }}>
                {s.l}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ══════════════════
          FILTER TABS
      ══════════════════ */}
      <motion.div
        initial={{ opacity:0, y:14 }}
        whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }}
        transition={{ duration:0.6, ease }}
        style={{
          display:        'flex',
          gap:            '6px',
          marginBottom:   '2rem',
          flexWrap:       'wrap',
          overflowX:      'auto',
          paddingBottom:  '4px',
        }}
      >
        {TABS.map(tab => (
          <motion.button
            key={tab}
            onClick={() => setActive(tab)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding:              '9px 20px',
              borderRadius:         '50px',
              border:               active === tab
                ? '1px solid rgba(150,80,255,0.5)'
                : '1px solid rgba(255,255,255,0.09)',
              background:           active === tab
                ? 'rgba(100,40,220,0.35)'
                : 'rgba(255,255,255,0.04)',
              backdropFilter:       'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              color:                active === tab ? '#fff' : 'rgba(255,255,255,0.5)',
              fontWeight:           active === tab ? 600 : 400,
              fontSize:             '0.875rem',
              cursor:               'pointer',
              transition:           'all 0.25s ease',
              boxShadow:            active === tab
                ? 'inset 0 1px 0 rgba(255,255,255,0.15), 0 0 20px rgba(120,60,220,0.25)'
                : 'inset 0 1px 0 rgba(255,255,255,0.06)',
              whiteSpace:           'nowrap',
            }}
          >
            {tab}
          </motion.button>
        ))}
      </motion.div>

      {/* ══════════════════
          PROJECT GRID
      ══════════════════ */}

<div id="featured-projects" style={{ scrollMarginTop:'80px' }}>

      <AnimatePresence mode="wait">
        
        <motion.div
          key={active}
          initial={{ opacity:0, y:12 }}
          animate={{ opacity:1, y:0 }}
          exit={{ opacity:0, y:-8 }}
          transition={{ duration:0.35, ease }}
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap:                 '1.1rem',
            marginBottom:        '3rem',
          }}
          className="projects-grid"
        >
          {filtered.map((p, i) => (
            <ProjectCard key={p.title} {...p} delay={i * 0.07} />
          ))}
        </motion.div>
      </AnimatePresence>
       </div>

      {/* ══════════════════
          SEE MORE BUTTON
      ══════════════════ */}
      <motion.div
        initial={{ opacity:0, y:16 }}
        whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }}
        transition={{ duration:0.6, ease }}
        style={{ display:'flex', justifyContent:'center' }}
      >
        <motion.button
          whileHover={{ scale:1.04, boxShadow:'inset 0 1px 0 rgba(255,255,255,0.18), 0 8px 32px rgba(100,40,220,0.3)' }}
          whileTap={{ scale:0.97 }}
          style={{
            display:              'flex',
            alignItems:           'center',
            gap:                  '10px',
            padding:              '14px 32px',
            borderRadius:         '50px',
            background:           'rgba(15,10,40,0.65)',
            backdropFilter:       'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border:               '1px solid rgba(150,80,255,0.3)',
            boxShadow:            'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 24px rgba(100,40,200,0.2)',
            color:                '#fff',
            fontWeight:           600,
            fontSize:             '0.93rem',
            cursor:               'pointer',
            transition:           'all 0.3s ease',
          }}
        >
          See More Projects
          <span style={{
            display:'flex', alignItems:'center', justifyContent:'center',
            width:'26px', height:'26px', borderRadius:'50%',
            background:'rgba(255,255,255,0.1)',
            fontSize:'0.9rem',
          }}>→</span>
        </motion.button>
      </motion.div>      
    </section>
  )
}