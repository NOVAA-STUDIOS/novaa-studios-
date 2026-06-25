import { motion } from 'framer-motion'
import { Link } from "react-router-dom";

const CATEGORY_COLORS = {
  'Web Design':   { bg: 'rgba(120,60,220,0.35)',  border: 'rgba(150,80,255,0.4)'  },
  'Development':  { bg: 'rgba(20,100,200,0.35)',  border: 'rgba(50,130,255,0.4)'  },
  'Branding':     { bg: 'rgba(0,140,120,0.35)',   border: 'rgba(0,200,160,0.4)'   },
  'SEO & Marketing': { bg: 'rgba(160,100,20,0.35)', border: 'rgba(220,160,30,0.4)' },
}

export default function ProjectCard({ category, title, desc, delay = 0, gradientFrom, gradientTo }) {
  const catColor = CATEGORY_COLORS[category] || CATEGORY_COLORS['Web Design']

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      style={{
        position:             'relative',
        borderRadius:         '18px',
        overflow:             'hidden',
        background:           'rgba(15,10,40,0.55)',
        backdropFilter:       'blur(24px) saturate(160%)',
        WebkitBackdropFilter: 'blur(24px) saturate(160%)',
        border:               '1px solid rgba(255,255,255,0.09)',
        boxShadow:            'inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 40px rgba(0,0,0,0.4)',
        cursor:               'pointer',
        transition:           'all 0.35s ease',
        display:              'flex',
        flexDirection:        'column',
      }}
    >
      {/* ── Image area ── */}
      <div style={{
        position:   'relative',
        height:     '180px',
        overflow:   'hidden',
        flexShrink: 0,
      }}>
        {/* Gradient mockup image */}
        <motion.div
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.5 }}
          style={{
            width:      '100%',
            height:     '100%',
            background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
            display:    'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding:    '1rem',
          }}
        >
          {/* Mock UI element inside card */}
          <div style={{
            width:        '55%',
            height:       '90%',
            borderRadius: '10px',
            background:   'rgba(255,255,255,0.08)',
            border:       '1px solid rgba(255,255,255,0.12)',
            backdropFilter: 'blur(8px)',
            display:      'flex',
            flexDirection:'column',
            padding:      '0.6rem',
            gap:          '0.3rem',
          }}>
            {/* Mock UI lines */}
            {[80, 60, 90, 45, 70].map((w, i) => (
              <div key={i} style={{
                height:       '6px',
                width:        `${w}%`,
                borderRadius: '3px',
                background:   i === 0
                  ? 'rgba(255,255,255,0.5)'
                  : 'rgba(255,255,255,0.15)',
              }} />
            ))}
            <div style={{ marginTop:'auto', display:'flex', gap:'4px' }}>
              {[1,2,3].map(i => (
                <div key={i} style={{
                  width:'24px', height:'24px',
                  borderRadius:'6px',
                  background:'rgba(255,255,255,0.1)',
                  border:'1px solid rgba(255,255,255,0.15)',
                }} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Hover overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            position:   'absolute', inset: 0,
            background: 'rgba(10,5,30,0.4)',
            backdropFilter: 'blur(2px)',
          }}
        />

        {/* Arrow button — top right */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          style={{
            position:   'absolute',
            bottom:     '12px', right: '12px',
            width:      '36px', height: '36px',
            borderRadius: '50%',
            background:   'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(10px)',
            border:       '1px solid rgba(255,255,255,0.2)',
            display:      'flex',
            alignItems:   'center',
            justifyContent: 'center',
            fontSize:     '0.85rem',
            color:        '#fff',
            boxShadow:    'inset 0 1px 0 rgba(255,255,255,0.2)',
          }}
        >
          ↗
        </motion.div>
      </div>

      {/* ── Content ── */}
      <div style={{ padding: '1.25rem 1.25rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>

        {/* Category tag */}
        <div style={{
          display:     'inline-flex',
          alignSelf:   'flex-start',
          padding:     '4px 12px',
          borderRadius:'50px',
          fontSize:    '0.72rem',
          fontWeight:  600,
          letterSpacing:'0.3px',
          background:  catColor.bg,
          border:      `1px solid ${catColor.border}`,
          color:       '#fff',
          backdropFilter: 'blur(8px)',
          marginBottom:'0.25rem',
        }}>
          {category}
        </div>

        {/* Title */}
        <h3 style={{
          fontSize:      '1.05rem',
          fontWeight:    700,
          color:         '#fff',
          letterSpacing: '-0.01em',
          lineHeight:    1.3,
        }}>
          {title}
        </h3>

        {/* Desc */}
        <p style={{
          fontSize:   '0.8rem',
          color:      'rgba(255,255,255,0.4)',
          lineHeight: 1.65,
          flex:       1,
        }}>
          {desc}
        </p>

        {/* View Project */}
        <Link
  to={`/work/${title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")}`}
  style={{ textDecoration: "none" }}
>
  <motion.div
    whileHover={{ x: 3 }}
    style={{
      display: "flex",
      alignItems: "center",
      gap: "6px",
      fontSize: "0.82rem",
      fontWeight: 600,
      color: "rgba(255,255,255,0.6)",
      marginTop: "0.5rem",
      cursor: "pointer",
    }}
  >
    View Case Study
    <span style={{ fontSize: "0.9rem" }}>→</span>
  </motion.div>
</Link>

      </div>
    </motion.div>
  )
}

