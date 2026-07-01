import { motion } from 'framer-motion'

const BRANDS = ['Startup A','TechCorp','LaunchPad','GrowthCo','ScaleUp','InnovateLab']

export default function Trust() {
  return (
    <section style={{
      padding:      '2.5rem 2rem',
      borderTop:    '1px solid rgba(255,255,255,0.05)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      textAlign:    'center',
    }}>
      <p style={{
        fontSize:'0.72rem', letterSpacing:'2.5px',
        textTransform:'uppercase',
        color:'rgba(255,255,255,0.22)',
        marginBottom:'1.75rem',
      }}>
        Trusted by Growing Startups
      </p>
      <div style={{ display:'flex', justifyContent:'center', gap:'2.5rem', flexWrap:'wrap' }}>
        {BRANDS.map((b, i) => (
          <motion.span
            key={b}
            initial={{ opacity:1 }}
            whileInView={{ opacity:1 }}
            viewport={{ once:true }}
            transition={{ delay:i*0.07 }}
            style={{
              fontFamily:  'Syne, sans-serif',
              fontWeight:  700,
              fontSize:    '0.9rem',
              letterSpacing:'0.5px',
              color:       'rgba(255,255,255,0.2)',
            }}
          >
            {b}
          </motion.span>
        ))}
      </div>
    </section>
  )
}