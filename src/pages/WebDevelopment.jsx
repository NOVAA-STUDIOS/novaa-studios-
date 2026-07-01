import { motion } from 'framer-motion'
import { Link }   from 'react-router-dom'
import Navbar             from '../components/Navbar'
import Footer             from '../components/Footer'
import CodeEditorMockup   from '../components/CodeEditorMockup'
import BackButton from '../components/BackButton'
import CTAButton  from '../components/CTAButton'

const ease = [0.22, 1, 0.36, 1]

/* ── Process Step ── */
function DevProcess({ num, icon, title, desc, delay=0, isLast=false }) {
  return (
    <div style={{
      display:'flex', flexDirection:'column', alignItems:'center',
      flex:1, minWidth:'130px', position:'relative',
    }}>
      {!isLast && (
        <div style={{
          position:'absolute', top:'35px',
          left:'calc(50% + 35px)',
          width:'calc(100% - 70px)', height:'1px',
          borderTop:'2px dashed rgba(99,102,241,0.35)',
          zIndex:0,
        }} />
      )}
      <motion.div
        initial={{ opacity:1, y:20 }}
        whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }}
        transition={{ duration:0.6, delay, ease }}
        style={{
          display:'flex', flexDirection:'column',
          alignItems:'center', gap:'0.75rem',
          position:'relative', zIndex:1,
        }}
      >
        <div style={{
          width:'70px', height:'70px', borderRadius:'50%',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:'1.5rem',
          background: num <= 3
            ? 'radial-gradient(circle, rgba(140,60,255,0.5), rgba(80,20,200,0.3))'
            : 'radial-gradient(circle, rgba(0,200,160,0.5), rgba(0,120,100,0.3))',
          border: num <= 3
            ? '1px solid rgba(160,80,255,0.4)'
            : '1px solid rgba(0,220,170,0.35)',
          boxShadow: num <= 3
            ? '0 0 20px rgba(140,60,255,0.35)'
            : '0 0 20px rgba(0,200,160,0.3)',
        }}>
          {icon}
        </div>
        <span style={{
          fontSize:'0.75rem', fontWeight:700, letterSpacing:'0.5px',
          background:'linear-gradient(135deg,#c084fc,#06b6d4)',
          WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
        }}>
          0{num}
        </span>
        <h3 style={{
          fontSize:'0.88rem', fontWeight:700, color:'#fff',
          textAlign:'center', lineHeight:1.3,
        }}>
          {title}
        </h3>
        <p style={{
          fontSize:'0.75rem', color:'rgba(255,255,255,0.38)',
          lineHeight:1.65, textAlign:'center',
        }}>
          {desc}
        </p>
      </motion.div>
    </div>
  )
}

/* ── Bullet item ── */
function BulletItem({ text, delay=0 }) {
  return (
    <motion.div
      initial={{ opacity:1, x:-12 }}
      whileInView={{ opacity:1, x:0 }}
      viewport={{ once:true }}
      transition={{ duration:0.45, delay, ease }}
      style={{
        display:'flex', alignItems:'center', gap:'10px',
        padding:'8px 0',
        borderBottom:'1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div style={{
        width:'20px', height:'20px', borderRadius:'6px', flexShrink:0,
        display:'flex', alignItems:'center', justifyContent:'center',
        background:'rgba(100,40,200,0.35)',
        border:'1px solid rgba(140,70,255,0.3)',
        fontSize:'0.7rem',
      }}>✓</div>
      <span style={{ fontSize:'0.88rem', color:'rgba(255,255,255,0.7)', fontWeight:500 }}>
        {text}
      </span>
    </motion.div>
  )
}

/* ── Tech badge ── */
function TechBadge({ icon, name, delay=0 }) {
  return (
    <motion.div
      initial={{ opacity:1, y:12 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }}
      transition={{ duration:0.45, delay, ease }}
      whileHover={{ y:-3, background:'rgba(255,255,255,0.08)' }}
      style={{
        display:'flex', alignItems:'center', gap:'8px',
        padding:'10px 18px', borderRadius:'50px',
        background:'rgba(255,255,255,0.04)',
        border:'1px solid rgba(255,255,255,0.1)',
        boxShadow:'inset 0 1px 0 rgba(255,255,255,0.08)',
        transition:'all 0.25s ease', cursor:'default',
      }}
    >
      <span style={{ fontSize:'1.1rem' }}>{icon}</span>
      <span style={{ fontSize:'0.82rem', fontWeight:600, color:'rgba(255,255,255,0.7)' }}>
        {name}
      </span>
    </motion.div>
  )
}

/* ══════════════════════════════
   MAIN PAGE
══════════════════════════════ */
export default function WebDevelopment() {
  return (
    <div style={{ position:'relative', zIndex:1, minHeight:'100vh' }}>
      <Navbar />

      <div style={{ maxWidth:'1220px', margin:'0 auto', padding:'0 1.5rem' }}>

        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity:1 }}
          animate={{ opacity:1 }}
          transition={{ duration:0.6, delay:0.2 }}
          style={{
            paddingTop:'90px', display:'flex',
            alignItems:'center', gap:'8px',
            fontSize:'0.8rem', color:'rgba(255,255,255,0.35)',
            marginBottom:'2rem',
          }}
        >

          <div style={{ marginBottom:'1.5rem' }}>
  <BackButton />
</div>

          <Link to="/" style={{ color:'rgba(255,255,255,0.35)', textDecoration:'none' }}>Home</Link>
          <span>›</span>
          <Link to="/#services" style={{ color:'rgba(255,255,255,0.35)', textDecoration:'none' }}>Services</Link>
          <span>›</span>
          <span style={{ color:'rgba(255,255,255,0.7)' }}>Web Development</span>
        </motion.div>

        {/* ════════════
            HERO
        ════════════ */}
        <div style={{
          display:'grid', gridTemplateColumns:'1fr 1fr',
          gap:'3rem', alignItems:'center', marginBottom:'3rem',
        }}
          className="wd-hero-grid"
        >
          {/* LEFT */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity:1, y:14 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:0.6, ease, delay:0.1 }}
              style={{ marginBottom:'1.5rem' }}
            >
              <div style={{
                display:'inline-flex', alignItems:'center', gap:'9px',
                padding:'7px 16px', borderRadius:'50px',
                background:'rgba(10,10,40,0.65)',
                backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
                border:'1px solid rgba(255,255,255,0.13)',
              }}>
                <span style={{
                  width:'7px', height:'7px', borderRadius:'50%',
                  background:'#6366f1',
                  boxShadow:'0 0 10px #6366f1, 0 0 20px rgba(99,102,241,0.5)',
                  flexShrink:0,
                }} />
                <span style={{
                  fontSize:'0.72rem', fontWeight:600,
                  letterSpacing:'2.5px', textTransform:'uppercase',
                  color:'rgba(255,255,255,0.65)',
                }}>
                  Our Services
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity:1, y:28 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:0.9, ease, delay:0.2 }}
              style={{
                fontSize:'clamp(2.2rem, 5vw, 3.6rem)',
                fontWeight:800, lineHeight:1.06,
                letterSpacing:'-0.03em', marginBottom:'1.25rem',
              }}
            >
              <span style={{
                background:'linear-gradient(160deg,#fff 0%,rgba(255,255,255,0.85) 100%)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
                display:'block',
              }}>
                Web Development
              </span>
              <span style={{
                background:'linear-gradient(160deg,#fff 0%,rgba(255,255,255,0.85) 100%)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
                display:'block',
              }}>
                Built for{' '}
                <span style={{
                  background:'linear-gradient(135deg,#c084fc,#06b6d4)',
                  WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
                }}>
                  Performance
                </span>
              </span>
              <span style={{
                background:'linear-gradient(135deg,#c084fc 0%,#06b6d4 100%)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
                display:'block',
              }}>
                & Scalability.
              </span>
            </motion.h1>

            {/* Para */}
            <motion.p
              initial={{ opacity:1, y:16 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:0.7, ease, delay:0.32 }}
              style={{
                fontSize:'0.97rem', color:'rgba(255,255,255,0.44)',
                lineHeight:1.8, maxWidth:'400px', marginBottom:'2rem',
              }}
            >
              We build fast, secure, and scalable websites and web applications using clean code and modern technologies that drive real results.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity:1, y:14 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:0.6, ease, delay:0.42 }}
              style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}
            >
              <motion.button
                whileHover={{ scale:1.04, boxShadow:'0 0 32px rgba(120,60,220,0.5)' }}
                whileTap={{ scale:0.97 }}
                style={{
                  display:'inline-flex', alignItems:'center', gap:'10px',
                  padding:'13px 26px', borderRadius:'50px',
                  background:'linear-gradient(135deg,#7c3aed,#4f46e5)',
                  border:'1px solid rgba(150,80,255,0.4)',
                  boxShadow:'inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 24px rgba(100,40,200,0.35)',
                  color:'#fff', fontWeight:600, fontSize:'0.93rem', cursor:'pointer',
                  transition:'all 0.3s ease',
                }}
              >
                <CTAButton size="md">Start Your Project</CTAButton>
              </motion.button>

              <motion.button
                whileHover={{ scale:1.03, background:'rgba(255,255,255,0.08)' }}
                whileTap={{ scale:0.97 }}
                style={{
                  padding:'13px 26px', borderRadius:'50px',
                  background:'rgba(255,255,255,0.04)',
                  border:'1px solid rgba(255,255,255,0.12)',
                  color:'rgba(255,255,255,0.75)', fontWeight:500,
                  fontSize:'0.93rem', cursor:'pointer',
                  transition:'all 0.25s ease',
                }}
              >
                View Our Work
              </motion.button>
            </motion.div>
          </div>

          {/* RIGHT — Code editor + stat card */}
          <motion.div
            initial={{ opacity:1, x:32 }}
            animate={{ opacity:1, x:0 }}
            transition={{ duration:0.9, ease, delay:0.25 }}
            style={{ position:'relative' }}
          >
            {/* Icon badge above editor */}
            <div style={{
              position:'absolute', top:'-20px', left:'20px', zIndex:3,
              width:'52px', height:'52px', borderRadius:'14px',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'1.5rem',
              background:'linear-gradient(135deg,rgba(100,40,200,0.7),rgba(50,20,120,0.5))',
              border:'1px solid rgba(150,80,255,0.4)',
              boxShadow:'0 0 24px rgba(120,60,220,0.4)',
            }}>
              {'</>'}
            </div>

            <CodeEditorMockup />

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity:1, scale:0.9 }}
              animate={{ opacity:1, scale:1 }}
              transition={{ duration:0.7, delay:0.65, ease }}
              style={{
                position:'absolute', bottom:'-5%', right:'-6%',
                padding:'1.5rem', borderRadius:'18px',
                background:'rgba(15,10,40,0.88)',
                backdropFilter:'blur(28px)', WebkitBackdropFilter:'blur(28px)',
                border:'1px solid rgba(255,255,255,0.12)',
                boxShadow:'inset 0 1px 0 rgba(255,255,255,0.15), 0 16px 48px rgba(0,0,0,0.5)',
                minWidth:'160px', zIndex:2,
              }}
            >
              <div style={{ fontSize:'1.5rem', marginBottom:'0.5rem' }}>🚀</div>
              <p style={{
                fontSize:'2.2rem', fontWeight:800, color:'#fff',
                letterSpacing:'-0.03em', lineHeight:1,
              }}>
                200+
              </p>
              <p style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.42)', marginTop:'4px', lineHeight:1.4 }}>
                Projects<br/>Developed
              </p>
              <div style={{
                marginTop:'0.75rem', height:'2px', borderRadius:'2px',
                background:'linear-gradient(90deg,#7c3aed,#06b6d4)', width:'60%',
              }} />
            </motion.div>
          </motion.div>
        </div>

        {/* ════════════════════════════
            WHAT WE OFFER + PROCESS
        ════════════════════════════ */}
        <motion.div
          initial={{ opacity:1, y:20 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.7, ease }}
          style={{
            display:'grid', gridTemplateColumns:'320px 1fr',
            gap:'1px',
            background:'rgba(255,255,255,0.06)',
            borderRadius:'20px', overflow:'hidden',
            border:'1px solid rgba(255,255,255,0.08)',
            marginBottom:'1.25rem',
          }}
          className="wd-offer-grid"
        >
          {/* LEFT — What We Offer */}
          <div style={{
            padding:'2rem',
            background:'rgba(15,10,40,0.6)',
            backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
          }}>
            <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'0.5rem' }}>
              <div style={{
                width:'36px', height:'36px', borderRadius:'10px',
                display:'flex', alignItems:'center', justifyContent:'center',
                background:'rgba(100,40,200,0.3)',
                border:'1px solid rgba(140,70,255,0.3)', fontSize:'1rem',
              }}>🖥️</div>
              <h2 style={{ fontSize:'1.15rem', fontWeight:700, color:'#fff' }}>What We Offer</h2>
            </div>
            <p style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.38)', lineHeight:1.65, marginBottom:'1.25rem' }}>
              End-to-end web development solutions tailored to meet your business goals.
            </p>
            <div>
              {[
                'Custom Website Development',
                'Web Application Development',
                'E-commerce Solutions',
                'API Development & Integration',
                'Performance Optimization',
                'Ongoing Support & Maintenance',
              ].map((t, i) => <BulletItem key={t} text={t} delay={i*0.06} />)}
            </div>
          </div>

          {/* RIGHT — Dev Process */}
          <div style={{
            padding:'2rem',
            background:'rgba(10,15,40,0.5)',
            backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
          }}>
            <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'0.5rem' }}>
              <div style={{
                width:'36px', height:'36px', borderRadius:'10px',
                display:'flex', alignItems:'center', justifyContent:'center',
                background:'rgba(0,140,120,0.3)',
                border:'1px solid rgba(0,200,160,0.3)', fontSize:'1rem',
              }}>🗺️</div>
              <h2 style={{ fontSize:'1.15rem', fontWeight:700, color:'#fff' }}>Our Development Process</h2>
            </div>
            <p style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.38)', lineHeight:1.65, marginBottom:'2rem' }}>
              A transparent process that ensures quality at every step.
            </p>
            <div style={{ display:'flex', gap:'0.25rem', justifyContent:'space-between' }} className="process-row">
              <DevProcess num={1} icon="🔍" title="Requirement Analysis" delay={0.1}
                desc="We understand your business and define the right solution." />
              <DevProcess num={2} icon="📋" title="Planning & Strategy"  delay={0.17}
                desc="We plan the structure, tech stack, and development roadmap." />
              <DevProcess num={3} icon="⌨️" title="Development"          delay={0.24}
                desc="We build clean, efficient, and scalable code." isLast={false} />
              <DevProcess num={4} icon="✅" title="Testing & Quality Check" delay={0.31}
                desc="We test everything to ensure performance and security." />
              <DevProcess num={5} icon="🚀" title="Deployment & Launch"  delay={0.38} isLast
                desc="We deploy your project and provide ongoing support." />
            </div>
          </div>
        </motion.div>

        {/* ════════════════════════
            TECH STACK
        ════════════════════════ */}
        <motion.div
          initial={{ opacity:1, y:20 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.7, ease }}
          style={{
            padding:'1.75rem 2rem', borderRadius:'20px', marginBottom:'1.25rem',
            background:'rgba(10,15,40,0.5)',
            backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
            border:'1px solid rgba(255,255,255,0.07)',
            boxShadow:'inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:'2rem', flexWrap:'wrap' }}>
            <div style={{ maxWidth:'240px' }}>
              <h3 style={{ fontSize:'1rem', fontWeight:700, color:'#fff', marginBottom:'0.5rem' }}>
                Modern Technologies We Use
              </h3>
              <p style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.38)', lineHeight:1.65 }}>
                We use powerful technologies to build fast, secure, and future-ready solutions.
              </p>
            </div>
            <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', flex:1, justifyContent:'flex-end' }}>
              {[
                { icon:'⚛',  name:'React'       },
                { icon:'🅽',  name:'Next.js'     },
                { icon:'🟢',  name:'Node.js'     },
                { icon:'🍃',  name:'MongoDB'     },
                { icon:'🌊',  name:'Tailwind CSS'},
                { icon:'🔷',  name:'TypeScript'  },
                { icon:'☁️',  name:'AWS'         },
                { icon:'🐳',  name:'Docker'      },
              ].map((t, i) => <TechBadge key={t.name} {...t} delay={i*0.05} />)}
            </div>
          </div>
        </motion.div>

        {/* ════════════════
            FINAL CTA
        ════════════════ */}
        <motion.div
          initial={{ opacity:1, y:20 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.7, ease }}
          style={{
            padding:'2.5rem 3rem', borderRadius:'20px', marginBottom:'4rem',
            background:'rgba(15,10,40,0.55)',
            backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
            border:'1px solid rgba(255,255,255,0.08)',
            boxShadow:'inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 40px rgba(0,0,0,0.35)',
            display:'flex', alignItems:'center',
            justifyContent:'space-between', flexWrap:'wrap', gap:'2rem',
          }}
        >
          <div style={{ display:'flex', alignItems:'center', gap:'1.5rem' }}>
            <div style={{
              width:'64px', height:'64px', borderRadius:'18px',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'1.8rem', flexShrink:0,
              background:'rgba(100,40,200,0.35)',
              border:'1px solid rgba(140,70,255,0.35)',
              boxShadow:'0 0 24px rgba(120,60,220,0.3)',
            }}>🚀</div>
            <div>
              <h2 style={{
                fontSize:'clamp(1.2rem,3vw,1.7rem)', fontWeight:800,
                color:'#fff', letterSpacing:'-0.02em', marginBottom:'0.4rem',
              }}>
                Have an Idea? Let's Build It Together!
              </h2>
              <p style={{ fontSize:'0.85rem', color:'rgba(255,255,255,0.4)', lineHeight:1.65 }}>
                We turn ideas into powerful digital experiences that grow your business.
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale:1.04, boxShadow:'0 0 32px rgba(120,60,220,0.5)' }}
            whileTap={{ scale:0.97 }}
            style={{
              display:'inline-flex', alignItems:'center', gap:'10px',
              padding:'14px 28px', borderRadius:'50px',
              background:'linear-gradient(135deg,#7c3aed,#4f46e5)',
              border:'1px solid rgba(150,80,255,0.4)',
              boxShadow:'inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 24px rgba(100,40,200,0.35)',
              color:'#fff', fontWeight:600, fontSize:'0.95rem',
              cursor:'pointer', whiteSpace:'nowrap',
              transition:'all 0.3s ease',
            }}
          >
            <CTAButton size="lg">Start Your Project →</CTAButton>
          </motion.button>
        </motion.div>

      </div>
      <Footer />
    </div>
  )
}