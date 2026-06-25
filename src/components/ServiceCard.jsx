import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const ROUTES = {
  'Web Design':      '/services/web-design',
  'Web Development': '/services/web-development',
  'Branding':        '/services/branding',
  'SEO & Marketing': '/services/seo-marketing',
}

const CATEGORY_COLORS = {
  'Web Design':      { bg: 'rgba(120,60,220,0.35)',  border: 'rgba(150,80,255,0.4)'  },
  'Web Development': { bg: 'rgba(20,100,200,0.35)',  border: 'rgba(50,130,255,0.4)'  },
  'Branding':        { bg: 'rgba(0,140,120,0.35)',   border: 'rgba(0,200,160,0.4)'   },
  'SEO & Marketing': { bg: 'rgba(160,100,20,0.35)',  border: 'rgba(220,160,30,0.4)'  },
}

export default function ServiceCard({ icon, title, desc, color, delay = 0 }) {
  const catColor = CATEGORY_COLORS[title] || CATEGORY_COLORS['Web Design']
  const route    = ROUTES[title] || '#'

  return (
    <motion.div
      initial={{ opacity:0, y:32 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }}
      transition={{ duration:0.7, delay, ease:[0.22,1,0.36,1] }}
      whileHover={{ y:-6, scale:1.02 }}
      style={{
        position:             'relative',
        borderRadius:         '20px',
        padding:              '2.25rem 1.75rem',
        display:              'flex',
        flexDirection:        'column',
        alignItems:           'center',
        textAlign:            'center',
        gap:                  '1rem',
        overflow:             'hidden',
        transition:           'all 0.35s ease',
        background:           color === 'purple'
          ? 'rgba(80,30,160,0.18)'
          : 'rgba(0,130,110,0.15)',
        backdropFilter:       'blur(28px) saturate(160%)',
        WebkitBackdropFilter: 'blur(28px) saturate(160%)',
        border:               color === 'purple'
          ? '1px solid rgba(150,80,255,0.25)'
          : '1px solid rgba(0,200,160,0.22)',
        boxShadow:            color === 'purple'
          ? 'inset 0 1.5px 0 rgba(255,255,255,0.15), 0 8px 40px rgba(100,30,220,0.2)'
          : 'inset 0 1.5px 0 rgba(255,255,255,0.12), 0 8px 40px rgba(0,180,140,0.15)',
      }}
    >
      {/* Top shine */}
      <div style={{
        position:'absolute', top:0, left:'10%', right:'10%',
        height:'1px',
        background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)',
        pointerEvents:'none',
      }} />

      {/* Corner glow */}
      <div style={{
        position:'absolute', top:'-40px', left:'50%',
        transform:'translateX(-50%)',
        width:'120px', height:'120px', borderRadius:'50%',
        background: color === 'purple'
          ? 'radial-gradient(circle, rgba(140,60,255,0.35) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(0,200,160,0.3) 0%, transparent 70%)',
        pointerEvents:'none',
      }} />

      {/* Icon */}
      <div style={{
        width:'72px', height:'72px', borderRadius:'50%',
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:'1.8rem', flexShrink:0,
        background: color === 'purple'
          ? 'radial-gradient(circle at 35% 35%, rgba(160,80,255,0.5), rgba(100,30,200,0.3))'
          : 'radial-gradient(circle at 35% 35%, rgba(0,200,160,0.5), rgba(0,140,120,0.3))',
        border: color === 'purple'
          ? '1px solid rgba(180,100,255,0.4)'
          : '1px solid rgba(0,220,170,0.35)',
        boxShadow: color === 'purple'
          ? '0 0 24px rgba(140,60,255,0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
          : '0 0 24px rgba(0,200,160,0.35), inset 0 1px 0 rgba(255,255,255,0.15)',
      }}>
        {icon}
      </div>

      <h3 style={{ fontSize:'1.15rem', fontWeight:700, color:'#fff', letterSpacing:'-0.01em', marginTop:'0.25rem' }}>
        {title}
      </h3>

      <p style={{ fontSize:'0.875rem', color:'rgba(255,255,255,0.48)', lineHeight:1.75, flexGrow:1 }}>
        {desc}
      </p>

      {/* Learn More button → Link */}
      <Link to={route} style={{ textDecoration:'none', width:'100%', display:'flex', justifyContent:'center' }}>
        <motion.div
          whileHover={{ scale:1.04, background:'rgba(255,255,255,0.1)' }}
          whileTap={{ scale:0.97 }}
          style={{
            marginTop:            '0.75rem',
            display:              'inline-flex',
            alignItems:           'center',
            gap:                  '10px',
            padding:              '10px 22px',
            borderRadius:         '50px',
            background:           'rgba(255,255,255,0.06)',
            backdropFilter:       'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border:               '1px solid rgba(255,255,255,0.14)',
            color:                'rgba(255,255,255,0.85)',
            fontWeight:           500,
            fontSize:             '0.875rem',
            cursor:               'pointer',
            transition:           'all 0.25s ease',
            boxShadow:            'inset 0 1px 0 rgba(255,255,255,0.1)',
          }}
        >
          Learn More
          <span style={{
            display:'flex', alignItems:'center', justifyContent:'center',
            width:'22px', height:'22px', borderRadius:'50%',
            background:'rgba(255,255,255,0.1)', fontSize:'0.8rem',
          }}>→</span>
        </motion.div>
      </Link>
    </motion.div>
  )
}