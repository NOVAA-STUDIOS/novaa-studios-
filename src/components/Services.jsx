import { motion } from 'framer-motion'
import ServiceCard from './ServiceCard'

const SERVICES = [
  {
    icon:  '🖥️',
    title: 'Web Design',
    desc:  'Stunning, modern, and user-focused designs that reflect your brand and captivate your audience.',
    color: 'purple',
  },
  {
    icon:  '⌨️',
    title: 'Web Development',
    desc:  'Fast, responsive, and scalable websites built with clean code and modern technologies.',
    color: 'purple',
  },
  {
    icon:  '🚀',
    title: 'Branding',
    desc:  'Build a powerful brand identity that connects, inspires, and leaves a lasting impression.',
    color: 'teal',
  },
  {
    icon:  '📈',
    title: 'SEO & Marketing',
    desc:  'Data-driven SEO and marketing strategies to boost visibility and drive real results.',
    color: 'teal',
  },
]

export default function Services() {
  return (
    <section
      id="services"
      style={{
        minHeight:      '100vh',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        padding:        '140px 1.5rem 60px',
        position:       'relative',
        zIndex:         1,
      }}
    >
      <div style={{ maxWidth: '1220px', width: '100%' }}>

        {/* ── Badge ── */}
        <motion.div
          initial={{ opacity: 1, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
          style={{
            display:              'flex',
            justifyContent:       'center',
            marginBottom:         '1.75rem',
          }}
        >
          <div style={{
            display:              'inline-flex',
            alignItems:           'center',
            gap:                  '10px',
            padding:              '8px 20px',
            borderRadius:         '50px',
            background:           'rgba(10,10,40,0.65)',
            backdropFilter:       'blur(24px) saturate(160%)',
            WebkitBackdropFilter: 'blur(24px) saturate(160%)',
            border:               '1px solid rgba(255,255,255,0.13)',
            boxShadow:            'inset 0 1px 0 rgba(255,255,255,0.12)',
          }}>
            <span style={{
              width:        '7px', height: '7px',
              borderRadius: '50%',
              background:   '#6366f1',
              boxShadow:    '0 0 10px #6366f1, 0 0 20px rgba(99,102,241,0.5)',
              flexShrink:   0,
            }} />
            <span style={{
              fontSize:      '0.75rem',
              fontWeight:    600,
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              color:         'rgba(255,255,255,0.68)',
            }}>
              Premium Web Agency
            </span>
          </div>
        </motion.div>

        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 1, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22,1,0.36,1] }}
          style={{ textAlign: 'center', marginBottom: '1rem' }}
        >
          <h1 style={{
            fontSize:      'clamp(3rem, 9vw, 6.5rem)',
            fontWeight:    800,
            letterSpacing: '-0.03em',
            lineHeight:    1.0,
            background:    'linear-gradient(160deg, #ffffff 0%, rgba(255,255,255,0.75) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor:  'transparent',
            backgroundClip:       'text',
          }}>
            Our Services
          </h1>
        </motion.div>

        {/* ── Subtext ── */}
        <motion.p
          initial={{ opacity: 1, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            textAlign:    'center',
            fontSize:     '1.05rem',
            color:        'rgba(255,255,255,0.46)',
            maxWidth:     '520px',
            margin:       '0 auto 3.5rem',
            lineHeight:   1.78,
          }}
        >
          End-to-end digital solutions that help brands grow, engage, and lead in the digital era.
        </motion.p>

        {/* ── Cards Grid ── */}
        <div style={{
          display:               'grid',
          gridTemplateColumns:   'repeat(auto-fit, minmax(260px, 1fr))',
          gap:                   '1.25rem',
          marginBottom:          '3rem',
        }}>
          {SERVICES.map((s, i) => (
            <ServiceCard
              key={s.title}
              {...s}
              delay={i * 0.1}
            />
          ))}
        </div>

        {/* ── Stats Bar ── */}
        <StatsBar />
      </div>
    </section>
  )
}

/* ── Stats inline ── */
const STATS = [
  { icon: '🚀', n: '50+',  l: 'Projects Delivered'  },
  { icon: '⭐', n: '98%',  l: 'Client Satisfaction'  },
  { icon: '🌐', n: '20+',  l: 'Industries Served'    },
  { icon: '⏱️', n: '2x',   l: 'Faster Delivery'      },
]

function StatsBar() {
  return (
    <motion.div
      initial={{ opacity: 1, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.3 }}
      style={{
        display:              'flex',
        alignItems:           'center',
        justifyContent:       'space-around',
        padding:              '1.5rem 2.5rem',
        borderRadius:         '20px',
        background:           'rgba(10,10,30,0.6)',
        backdropFilter:       'blur(28px) saturate(150%)',
        WebkitBackdropFilter: 'blur(28px) saturate(150%)',
        border:               '1px solid rgba(255,255,255,0.08)',
        boxShadow:            'inset 0 1px 0 rgba(255,255,255,0.07), 0 8px 40px rgba(0,0,0,0.45)',
        flexWrap:             'wrap',
        gap:                  '1.5rem',
      }}
    >
      {STATS.map((s, i) => (
        <div
          key={s.l}
          style={{
            display:    'flex',
            alignItems: 'center',
            gap:        '14px',
            flex:       '1 1 140px',
            minWidth:   '130px',
          }}
        >
          <div style={{
            width:          '42px', height: '42px',
            borderRadius:   '12px',
            background:     'rgba(255,255,255,0.07)',
            border:         '1px solid rgba(255,255,255,0.1)',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            fontSize:       '1.1rem',
            flexShrink:     0,
          }}>
            {s.icon}
          </div>
          <div>
            <p style={{
              fontSize:      '1.5rem',
              fontWeight:    700,
              color:         '#fff',
              lineHeight:    1.1,
              letterSpacing: '-0.02em',
            }}>
              {s.n}
            </p>
            <p style={{
              fontSize:  '0.76rem',
              color:     'rgba(255,255,255,0.4)',
              marginTop: '2px',
            }}>
              {s.l}
            </p>
          </div>
          {i < STATS.length - 1 && (
            <div style={{
              width:      '1px', height: '36px',
              background: 'rgba(255,255,255,0.08)',
              marginLeft: 'auto', flexShrink: 0,
            }} />
          )}
        </div>
      ))}
    </motion.div>
  )
}