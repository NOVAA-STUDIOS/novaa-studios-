import { motion } from 'framer-motion'

const STEPS = [
  { n:'01', t:'Discovery Call',    d:'We understand your business, goals, and vision in a focused 30-min call.'  },
  { n:'02', t:'Strategy & Design', d:'We craft your brand identity, wireframes, and full visual blueprint.'       },
  { n:'03', t:'Development',       d:'We build your cinematic website — pixel-perfect with premium animations.'   },
  { n:'04', t:'Launch & Scale',    d:'We deploy live, run QA, then stay on to grow your site with your business.' },
]

export default function Process() {
  return (
    <section id="process" style={{ padding:'8rem 2rem', maxWidth:'860px', margin:'0 auto' }}>
      <motion.div
        initial={{ opacity:1, y:28 }}
        whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }}
        transition={{ duration:0.7 }}
        style={{ textAlign:'center', marginBottom:'4.5rem' }}
      >
        <p style={{
          fontSize:'0.72rem', letterSpacing:'2.5px', textTransform:'uppercase',
          color:'rgba(10,132,255,0.85)', marginBottom:'1rem',
        }}>
          How We Work
        </p>
        <h2 style={{ fontSize:'clamp(2rem,5vw,3.2rem)', fontWeight:800, color:'#fff' }}>
          Our Process
        </h2>
      </motion.div>

      <div style={{ display:'flex', flexDirection:'column', gap:'1px', background:'rgba(255,255,255,0.06)', borderRadius:'20px', overflow:'hidden', border:'1px solid rgba(255,255,255,0.06)' }}>
        {STEPS.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity:1, x:-20 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }}
            transition={{ delay:i*0.1, duration:0.6 }}
            whileHover={{ background:'rgba(255,255,255,0.04)' }}
            style={{
              display:    'flex',
              gap:        '2rem',
              alignItems: 'flex-start',
              padding:    '1.75rem 2rem',
              background: 'rgba(255,255,255,0.015)',
              transition: 'background 0.25s ease',
            }}
          >
            <span style={{
              fontFamily:          'Syne,sans-serif',
              fontSize:            '0.78rem',
              fontWeight:          700,
              color:               'rgba(10,132,255,0.7)',
              letterSpacing:       '1px',
              marginTop:           '3px',
              minWidth:            '28px',
            }}>
              {s.n}
            </span>
            <div>
              <h3 style={{ fontSize:'1rem', fontWeight:700, marginBottom:'0.45rem', color:'#fff', letterSpacing:'-0.01em' }}>{s.t}</h3>
              <p style={{ color:'rgba(255,255,255,0.38)', lineHeight:1.7, fontSize:'0.88rem' }}>{s.d}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}