import { motion } from 'framer-motion'

export default function FeatureCard({ icon, title, desc, color, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.02 }}
      style={{
        position:             'relative',
        borderRadius:         '16px',
        padding:              '1.5rem',
        display:              'flex',
        alignItems:           'flex-start',
        gap:                  '1rem',
        overflow:             'hidden',
        transition:           'all 0.3s ease',
        background:           color === 'purple'
          ? 'rgba(80,30,160,0.2)'
          : color === 'blue'
          ? 'rgba(20,60,160,0.2)'
          : color === 'teal'
          ? 'rgba(0,120,100,0.2)'
          : 'rgba(60,20,120,0.2)',
        backdropFilter:       'blur(28px) saturate(160%)',
        WebkitBackdropFilter: 'blur(28px) saturate(160%)',
        border:               color === 'teal'
          ? '1px solid rgba(0,200,160,0.2)'
          : '1px solid rgba(150,80,255,0.2)',
        boxShadow:            'inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.3)',
      }}
    >
      {/* Top shine */}
      <div style={{
        position:   'absolute',
        top: 0, left: '5%', right: '5%',
        height:     '1px',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
        pointerEvents: 'none',
      }} />

      {/* Icon box */}
      <div style={{
        width:          '48px', height: '48px',
        borderRadius:   '12px',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        fontSize:       '1.3rem',
        flexShrink:     0,
        background:     color === 'purple'
          ? 'radial-gradient(circle, rgba(160,80,255,0.5), rgba(100,30,200,0.3))'
          : color === 'blue'
          ? 'radial-gradient(circle, rgba(50,100,255,0.5), rgba(20,60,200,0.3))'
          : color === 'teal'
          ? 'radial-gradient(circle, rgba(0,200,160,0.5), rgba(0,140,120,0.3))'
          : 'radial-gradient(circle, rgba(120,60,220,0.5), rgba(80,20,180,0.3))',
        border:         color === 'teal'
          ? '1px solid rgba(0,220,170,0.35)'
          : '1px solid rgba(180,100,255,0.35)',
        boxShadow:      color === 'teal'
          ? '0 0 16px rgba(0,200,160,0.3)'
          : '0 0 16px rgba(140,60,255,0.3)',
      }}>
        {icon}
      </div>

      {/* Text */}
      <div style={{ flex: 1 }}>
        <h3 style={{
          fontSize:      '1rem',
          fontWeight:    700,
          color:         '#fff',
          marginBottom:  '0.4rem',
          letterSpacing: '-0.01em',
        }}>
          {title}
        </h3>
        <p style={{
          fontSize:   '0.82rem',
          color:      'rgba(255,255,255,0.42)',
          lineHeight: 1.7,
        }}>
          {desc}
        </p>
      </div>
    </motion.div>
  )
}