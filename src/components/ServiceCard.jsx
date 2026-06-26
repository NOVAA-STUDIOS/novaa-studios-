import { motion }     from 'framer-motion'
import { Link }       from 'react-router-dom'

const ROUTES = {
  'Web Design':      '/services/web-design',
  'Web Development': '/services/web-development',
  'Branding':        '/services/branding',
  'SEO & Marketing': '/services/seo-marketing',
}

const COLORS = {
  purple: {
    card:   'rgba(80,30,160,0.18)',
    border: 'rgba(150,80,255,0.25)',
    shadow: '0 8px 40px rgba(100,30,220,0.2)',
    icon:   'radial-gradient(circle at 35% 35%,rgba(160,80,255,0.5),rgba(100,30,200,0.3))',
    iBorder:'rgba(180,100,255,0.4)',
    iShadow:'0 0 24px rgba(140,60,255,0.4)',
    glow:   'rgba(140,60,255,0.35)',
    corner: 'rgba(140,60,255,0.35)',
  },
  teal: {
    card:   'rgba(0,130,110,0.15)',
    border: 'rgba(0,200,160,0.22)',
    shadow: '0 8px 40px rgba(0,180,140,0.15)',
    icon:   'radial-gradient(circle at 35% 35%,rgba(0,200,160,0.5),rgba(0,140,120,0.3))',
    iBorder:'rgba(0,220,170,0.35)',
    iShadow:'0 0 24px rgba(0,200,160,0.35)',
    glow:   'rgba(0,200,160,0.3)',
    corner: 'rgba(0,200,160,0.3)',
  },
}

export default function ServiceCard({ icon, title, desc, color = 'purple', delay = 0 }) {
  const route = ROUTES[title] || '/'
  const c     = COLORS[color] || COLORS.purple

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
        background:           c.card,
        backdropFilter:       'blur(28px) saturate(160%)',
        WebkitBackdropFilter: 'blur(28px) saturate(160%)',
        border:               `1px solid ${c.border}`,
        boxShadow:            `inset 0 1.5px 0 rgba(255,255,255,0.15), ${c.shadow}`,
      }}
    >
      {/* Corner glow */}
      <div style={{
        position:'absolute', top:'-40px', left:'50%',
        transform:'translateX(-50%)',
        width:'120px', height:'120px', borderRadius:'50%',
        background:`radial-gradient(circle,${c.corner} 0%,transparent 70%)`,
        pointerEvents:'none',
      }} />

      {/* Top shine */}
      <div style={{
        position:'absolute', top:0, left:'10%', right:'10%', height:'1px',
        background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)',
        pointerEvents:'none',
      }} />

      {/* Icon */}
      <div style={{
        width:'72px', height:'72px', borderRadius:'50%', flexShrink:0,
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:'1.8rem',
        background:  c.icon,
        border:      `1px solid ${c.iBorder}`,
        boxShadow:   `${c.iShadow}, inset 0 1px 0 rgba(255,255,255,0.2)`,
      }}>
        {icon}
      </div>

      <h3 style={{ fontSize:'1.15rem', fontWeight:700, color:'#fff', letterSpacing:'-0.01em', marginTop:'0.25rem' }}>
        {title}
      </h3>

      <p style={{ fontSize:'0.875rem', color:'rgba(255,255,255,0.48)', lineHeight:1.75, flexGrow:1 }}>
        {desc}
      </p>

      {/* Learn More → service page */}
      <Link
        to={route}
        onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}
        style={{ textDecoration:'none', width:'100%', display:'flex', justifyContent:'center' }}
      >
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