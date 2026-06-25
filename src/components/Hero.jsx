import { motion }               from 'framer-motion'
import { useProjectNavigation } from '../hooks/useNavigation'
import CTAButton                from './CTAButton'

const ease = [0.22, 1, 0.36, 1]

const liquidGlass = {
  background:           'rgba(255,255,255,0.10)',
  backdropFilter:       'blur(32px) saturate(180%) brightness(1.15)',
  WebkitBackdropFilter: 'blur(32px) saturate(180%) brightness(1.15)',
  border:               '1px solid rgba(255,255,255,0.18)',
  boxShadow:            'inset 0 1px 0 rgba(255,255,255,0.25), 0 8px 32px rgba(0,0,0,0.28)',
}

export default function Hero() {
  const { viewWork } = useProjectNavigation()

  return (
    <section id="home" style={{
      position:'relative', minHeight:'100vh',
      display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center',
      padding:'100px 1.5rem 0', overflow:'hidden',
    }}>
      {/* Ambient glows */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:'30%', left:'50%', transform:'translate(-50%,-50%)', width:'800px', height:'600px', background:'radial-gradient(ellipse, rgba(10,132,255,0.20) 0%, transparent 65%)', filter:'blur(2px)' }} />
        <div style={{ position:'absolute', bottom:'-5%', right:'-5%', width:'500px', height:'400px', background:'radial-gradient(ellipse, rgba(255,214,192,0.07) 0%, transparent 65%)' }} />
        <div style={{ position:'absolute', top:'-5%', left:'-5%', width:'400px', height:'350px', background:'radial-gradient(ellipse, rgba(10,132,255,0.08) 0%, transparent 65%)' }} />
      </div>

      <div style={{ position:'relative', zIndex:1, textAlign:'center', maxWidth:'820px', width:'100%' }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity:0, y:20, scale:0.96 }}
          animate={{ opacity:1, y:0,  scale:1 }}
          transition={{ duration:0.7, ease, delay:0.15 }}
          style={{ display:'inline-flex', alignItems:'center', gap:'10px', padding:'8px 22px', borderRadius:'50px', marginBottom:'2.5rem', ...liquidGlass }}
        >
          <span style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#0A84FF', boxShadow:'0 0 12px rgba(10,132,255,1)', display:'inline-block', flexShrink:0 }} />
          <span style={{ fontSize:'0.76rem', fontWeight:600, letterSpacing:'2.5px', textTransform:'uppercase', color:'rgba(255,255,255,0.75)' }}>
            Premium Web Agency
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity:0, y:32 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.9, ease, delay:0.28 }}
          style={{ fontSize:'clamp(3.2rem,8.5vw,6.5rem)', fontWeight:800, lineHeight:1.02, marginBottom:'1.6rem', letterSpacing:'-0.03em', color:'#fff' }}
        >
          We Build Websites 
          That Dominate.
          <span style={{ background:'linear-gradient(135deg,#FFD6C0 20%,#FFBFA0 80%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity:0, y:20 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.8, ease, delay:0.42 }}
          style={{ fontSize:'1.12rem', color:'rgba(255,255,255,0.44)', maxWidth:'490px', margin:'0 auto 3rem', lineHeight:1.78 }}
        >
          NOVAA transforms startups into premium digital brands — cinematic websites that convert.
        </motion.p>

        {/* ── CTAs ── */}
        <motion.div
          initial={{ opacity:0, y:16 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.7, ease, delay:0.55 }}
          style={{ display:'flex', gap:'14px', justifyContent:'center', flexWrap:'wrap' }}
        >
          {/* PRIMARY — goes to /contact */}
          <CTAButton variant="blue" size="md">
            Start Your Project →
          </CTAButton>

          {/* SECONDARY — goes to /work */}
          <motion.button
            onClick={viewWork}
            whileHover={{ scale:1.04 }}
            whileTap={{ scale:0.97 }}
            style={{
              padding:'13px 30px', borderRadius:'50px',
              ...liquidGlass,
              color:'rgba(255,255,255,0.82)', fontWeight:500,
              fontSize:'0.95rem', cursor:'pointer', border:'1px solid rgba(255,255,255,0.18)',
            }}
          >
            View Our Work
          </motion.button>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:1 }}
          transition={{ delay:1.3, duration:1 }}
          style={{ marginTop:'5rem', display:'flex', flexDirection:'column', alignItems:'center', gap:'8px' }}
        >
          <span style={{ fontSize:'0.7rem', letterSpacing:'2.5px', textTransform:'uppercase', color:'rgba(255,255,255,0.2)' }}>Scroll</span>
          <motion.div
            animate={{ y:[0,6,0] }}
            transition={{ duration:1.8, repeat:Infinity, ease:'easeInOut' }}
            style={{ width:'1px', height:'36px', background:'linear-gradient(to bottom,rgba(255,255,255,0.3),transparent)' }}
          />
        </motion.div>
      </div>
    </section>
  )
}