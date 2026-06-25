import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer style={{
      padding:      '2.5rem 2rem',
      borderTop:    '1px solid rgba(255,255,255,0.05)',
      maxWidth:     '1160px',
      margin:       '0 auto',
      display:      'flex',
      justifyContent:'space-between',
      alignItems:   'center',
      flexWrap:     'wrap',
      gap:          '1rem',
    }}>
      <span style={{
        fontFamily:          'Moonwalk, Syne, sans-serif',
        fontSize:            '1.15rem',
        letterSpacing:       '5px',
        background:          'linear-gradient(120deg,#fff,rgba(255,255,255,0.5))',
        WebkitBackgroundClip:'text',
        WebkitTextFillColor: 'transparent',
      }}>
        NOVAA
      </span>

      <p style={{ color:'rgba(255,255,255,0.2)', fontSize:'0.8rem' }}>
        © 2025 NOVAA. All rights reserved.
      </p>

      <div style={{ display:'flex', gap:'1.5rem' }}>
        {['Twitter','LinkedIn','Instagram'].map(s => (
          <motion.a
            key={s} href="#"
            whileHover={{ color:'rgba(255,255,255,0.8)' }}
            style={{
              color:'rgba(255,255,255,0.28)',
              fontSize:'0.82rem',
              textDecoration:'none',
              transition:'color 0.25s ease',
            }}
          >
            {s}
          </motion.a>
        ))}
      </div>
    </footer>
  )
}