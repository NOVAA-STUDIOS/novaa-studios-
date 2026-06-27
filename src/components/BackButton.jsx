import { motion }               from 'framer-motion'
import { useProjectNavigation } from '../hooks/useNavigation'

export default function BackButton({ label='Back', style={} }) {
  const { goBack } = useProjectNavigation()
  return (
    <motion.button onClick={goBack}
      whileHover={{ scale:1.04, x:-3 }} whileTap={{ scale:0.97 }}
      style={{
        display:'inline-flex', alignItems:'center', gap:'8px',
        padding:'10px 20px', borderRadius:'50px',
        background:'rgba(255,255,255,0.06)',
        backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
        border:'1px solid rgba(255,255,255,0.1)',
        boxShadow:'inset 0 1px 0 rgba(255,255,255,0.1)',
        color:'rgba(255,255,255,0.65)', fontFamily:'Inter,sans-serif',
        fontWeight:500, fontSize:'0.875rem', cursor:'pointer',
        transition:'all 0.25s ease', minHeight:'44px', ...style,
      }}>
      <span>←</span>{label}
    </motion.button>
  )
}