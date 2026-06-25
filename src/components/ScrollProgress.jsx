import { useScroll, motion } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      style={{
        position:        'fixed',
        top:             0, left: 0, right: 0,
        height:          '2px',
        background:      'linear-gradient(90deg,#0A84FF,#FFD6C0)',
        scaleX:          scrollYProgress,
        transformOrigin: '0%',
        zIndex:          9998,
      }}
    />
  )
}