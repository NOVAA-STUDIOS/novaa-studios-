import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader() {
  const [show, setShow] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 2200)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          initial={{ opacity:1 }}
          exit={{ opacity:0 }}
          transition={{ duration:0.5 }}
          style={{
            position:'fixed', inset:0, zIndex:99999,
            background:'#04050F',
            display:'flex', flexDirection:'column',
            alignItems:'center', justifyContent:'center', gap:'2rem',
          }}
        >
          <motion.p
            initial={{ opacity:0, y:10 }}
            animate={{ opacity:1, y:0  }}
            transition={{ duration:0.6 }}
            style={{
              fontFamily:           'Moonwalk, Inter, sans-serif',
              fontSize:             '2.2rem',
              letterSpacing:        '10px',
              background:           'linear-gradient(135deg,#fff,rgba(255,255,255,0.4))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor:  'transparent',
            }}
          >
            NOVAA
          </motion.p>
          <div style={{
            width:'120px', height:'1px',
            background:'rgba(255,255,255,0.07)',
            overflow:'hidden', borderRadius:'1px',
          }}>
            <motion.div
              initial={{ width:'0%' }}
              animate={{ width:'100%' }}
              transition={{ duration:1.8, ease:[0.4,0,0.2,1] }}
              style={{ height:'100%', background:'rgba(255,255,255,0.55)' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}