import { motion }  from 'framer-motion'
import CTAButton   from './CTAButton'

export default function CTA() {
  return (
    <section style={{ padding:'6rem 2rem', textAlign:'center' }}>
      <motion.div
        initial={{ opacity:0, y:40 }}
        whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }}
        transition={{ duration:0.7, ease:[0.22,1,0.36,1] }}
        style={{
          maxWidth:'680px', margin:'0 auto', padding:'4rem 2.5rem',
          background:'rgba(10,132,255,0.07)',
          border:'1px solid rgba(10,132,255,0.18)',
          borderRadius:'28px', backdropFilter:'blur(20px)',
          position:'relative', overflow:'hidden',
        }}
      >
        <div style={{
          position:'absolute', top:'-60%', left:'50%', transform:'translateX(-50%)',
          width:'400px', height:'300px',
          background:'radial-gradient(ellipse,rgba(10,132,255,0.15) 0%,transparent 70%)',
          pointerEvents:'none',
        }} />

        <h2 style={{ fontSize:'clamp(1.8rem,4.5vw,2.8rem)', fontWeight:800, marginBottom:'1rem', color:'#fff', lineHeight:1.2, position:'relative', zIndex:1 }}>
          Ready to Build Something{' '}
          <span style={{ background:'linear-gradient(135deg,#FFD6C0,#FFBFA0)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
            Legendary?
          </span>
        </h2>

        <p style={{ color:'rgba(255,255,255,0.4)', marginBottom:'2.5rem', fontSize:'1rem', lineHeight:1.75, position:'relative', zIndex:1 }}>
          Join 150+ startups who trusted NOVAA to build their digital presence.
        </p>

        {/* ✅ CTAButton — routes to /contact */}
        <CTAButton size="lg" style={{ position:'relative', zIndex:1 }}>
          Start Free Consultation →
        </CTAButton>
      </motion.div>
    </section>
  )
}