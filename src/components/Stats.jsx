import { motion } from 'framer-motion'

const DATA = [
  { n:'150+', l:'Projects Delivered'  },
  { n:'98%',  l:'Client Satisfaction' },
  { n:'3×',   l:'Avg Revenue Growth'  },
  { n:'24hr', l:'Support Response'    },
]

export default function Stats() {
  return (
    <section style={{
      padding:      '5rem 2rem',
      borderTop:    '1px solid rgba(255,255,255,0.05)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
    }}>
      <div style={{
        maxWidth:'900px', margin:'0 auto',
        display:'grid',
        gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',
        gap:'2rem', textAlign:'center',
      }}>
        {DATA.map((s, i) => (
          <motion.div
            key={s.l}
            initial={{ opacity:1, y:16 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ delay:i*0.1, duration:0.6 }}
          >
            <p style={{
              fontFamily:          'Syne, sans-serif',
              fontSize:            'clamp(2.4rem,5vw,3.2rem)',
              fontWeight:          800,
              letterSpacing:       '-0.03em',
              background:          'linear-gradient(135deg,#fff 30%,rgba(255,255,255,0.5) 100%)',
              WebkitBackgroundClip:'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip:      'text',
            }}>
              {s.n}
            </p>
            <p style={{ color:'rgba(255,255,255,0.35)', fontSize:'0.82rem', marginTop:'0.5rem', letterSpacing:'0.3px' }}>
              {s.l}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}