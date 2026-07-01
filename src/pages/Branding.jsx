import { motion } from 'framer-motion'
import { Link }   from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BackButton from '../components/BackButton'
import CTAButton  from '../components/CTAButton'

const ease = [0.22, 1, 0.36, 1]

/* ── Bullet item ── */
function BulletItem({ text, delay = 0 }) {
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
        background:'rgba(100,40,200,0.4)',
        border:'1px solid rgba(140,70,255,0.35)',
        fontSize:'0.65rem', color:'#c084fc', fontWeight:700,
      }}>✓</div>
      <span style={{ fontSize:'0.88rem', color:'rgba(255,255,255,0.7)', fontWeight:500 }}>
        {text}
      </span>
    </motion.div>
  )
}

/* ── Process Step ── */
function ProcessStep({ num, icon, title, desc, delay=0, isLast=false }) {
  return (
    <div style={{
      display:'flex', flexDirection:'column', alignItems:'center',
      flex:1, minWidth:'120px', position:'relative',
    }}>
      {!isLast && (
        <div style={{
          position:'absolute', top:'34px',
          left:'calc(50% + 34px)',
          width:'calc(100% - 68px)', height:'1px',
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
          alignItems:'center', gap:'0.7rem',
          position:'relative', zIndex:1,
        }}
      >
        {/* Circle icon */}
        <div style={{
          width:'68px', height:'68px', borderRadius:'50%',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:'1.4rem',
          background: num <= 2
            ? 'radial-gradient(circle, rgba(140,60,255,0.55), rgba(80,20,200,0.35))'
            : num === 3
            ? 'radial-gradient(circle, rgba(60,100,255,0.55), rgba(30,60,180,0.35))'
            : 'radial-gradient(circle, rgba(0,200,160,0.55), rgba(0,120,100,0.35))',
          border: num <= 2
            ? '1px solid rgba(160,80,255,0.4)'
            : num === 3
            ? '1px solid rgba(80,130,255,0.4)'
            : '1px solid rgba(0,220,170,0.4)',
          boxShadow: num <= 2
            ? '0 0 20px rgba(140,60,255,0.35)'
            : num === 3
            ? '0 0 20px rgba(60,100,255,0.3)'
            : '0 0 20px rgba(0,200,160,0.3)',
        }}>
          {icon}
        </div>

        {/* Number */}
        <span style={{
          fontSize:'0.75rem', fontWeight:700, letterSpacing:'0.5px',
          background:'linear-gradient(135deg,#c084fc,#06b6d4)',
          WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
        }}>0{num}</span>

        <h3 style={{ fontSize:'0.92rem', fontWeight:700, color:'#fff', textAlign:'center' }}>
          {title}
        </h3>
        <p style={{
          fontSize:'0.75rem', color:'rgba(255,255,255,0.38)',
          lineHeight:1.7, textAlign:'center',
        }}>
          {desc}
        </p>
      </motion.div>
    </div>
  )
}

/* ── Why Choose card ── */
function WhyCard({ icon, title, desc, color, delay=0 }) {
  return (
    <motion.div
      initial={{ opacity:1, y:16 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }}
      transition={{ duration:0.5, delay, ease }}
      whileHover={{ y:-3 }}
      style={{
        display:'flex', alignItems:'flex-start', gap:'1rem',
        flex:'1 1 180px',
        transition:'all 0.3s ease',
      }}
    >
      <div style={{
        width:'44px', height:'44px', borderRadius:'12px', flexShrink:0,
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:'1.1rem',
        background: color==='teal'
          ? 'rgba(0,160,130,0.3)' : color==='blue'
          ? 'rgba(30,80,200,0.3)' : 'rgba(100,40,200,0.3)',
        border: color==='teal'
          ? '1px solid rgba(0,200,160,0.3)' : color==='blue'
          ? '1px solid rgba(60,120,255,0.3)' : '1px solid rgba(140,70,255,0.3)',
        boxShadow: color==='teal'
          ? '0 0 14px rgba(0,180,150,0.2)' : color==='blue'
          ? '0 0 14px rgba(40,100,220,0.2)' : '0 0 14px rgba(120,60,220,0.2)',
      }}>
        {icon}
      </div>
      <div>
        <p style={{ fontSize:'0.93rem', fontWeight:700, color:'#fff', marginBottom:'4px' }}>{title}</p>
        <p style={{ fontSize:'0.78rem', color:'rgba(255,255,255,0.38)', lineHeight:1.65 }}>{desc}</p>
      </div>
    </motion.div>
  )
}

/* ── Brand logo pill ── */
function BrandLogo({ icon, name, delay=0 }) {
  return (
    <motion.div
      initial={{ opacity:1, y:10 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }}
      transition={{ duration:0.45, delay, ease }}
      whileHover={{ scale:1.05, background:'rgba(255,255,255,0.07)' }}
      style={{
        display:'flex', alignItems:'center', gap:'8px',
        padding:'10px 20px', borderRadius:'50px',
        background:'rgba(255,255,255,0.04)',
        border:'1px solid rgba(255,255,255,0.09)',
        boxShadow:'inset 0 1px 0 rgba(255,255,255,0.07)',
        transition:'all 0.25s ease', cursor:'default',
      }}
    >
      <span style={{ fontSize:'1rem' }}>{icon}</span>
      <span style={{
        fontSize:'0.9rem', fontWeight:700,
        color:'rgba(255,255,255,0.55)',
        letterSpacing:'0.5px',
      }}>
        {name}
      </span>
    </motion.div>
  )
}

/* ══════════════════════════
   MAIN PAGE
══════════════════════════ */
export default function Branding() {
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
            paddingTop:'90px',
            display:'flex', alignItems:'center', gap:'8px',
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
          <span style={{ color:'rgba(255,255,255,0.7)' }}>Branding</span>
        </motion.div>

        {/* ══════════
            HERO
        ══════════ */}
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
                boxShadow:'inset 0 1px 0 rgba(255,255,255,0.1)',
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
                fontSize:'clamp(2.4rem,5.5vw,4rem)',
                fontWeight:800, lineHeight:1.05,
                letterSpacing:'-0.03em', marginBottom:'1.25rem',
              }}
            >
              <span style={{
                background:'linear-gradient(160deg,#fff 0%,rgba(255,255,255,0.85) 100%)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
                display:'block',
              }}>
                Branding That Creates
              </span>
              <span style={{ display:'block' }}>
                <span style={{
                  background:'linear-gradient(135deg,#c084fc 0%,#06b6d4 100%)',
                  WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
                }}>
                  Identity &amp; Builds Trust.
                </span>
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
              We craft powerful brand identities that connect, inspire, and leave a lasting impression on your audience.
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
                  color:'#fff', fontWeight:600, fontSize:'0.93rem',
                  cursor:'pointer', transition:'all 0.3s ease',
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
                  boxShadow:'inset 0 1px 0 rgba(255,255,255,0.08)',
                  color:'rgba(255,255,255,0.75)', fontWeight:500,
                  fontSize:'0.93rem', cursor:'pointer', transition:'all 0.25s ease',
                }}
              >
                View Our Work
              </motion.button>
            </motion.div>
          </div>

          {/* RIGHT — Branding Mockup */}
          <motion.div
            initial={{ opacity:1, x:32 }}
            animate={{ opacity:1, x:0 }}
            transition={{ duration:0.9, ease, delay:0.25 }}
            style={{ position:'relative' }}
          >
            {/* Main image area */}
            <motion.div
              whileHover={{ scale:1.02 }}
              transition={{ duration:0.5 }}
              style={{
                borderRadius:'20px', overflow:'hidden',
                border:'1px solid rgba(255,255,255,0.1)',
                boxShadow:'0 24px 60px rgba(0,0,0,0.55)',
                aspectRatio:'4/3', position:'relative',
              }}
            >
              {/* Premium black+gold branding mockup */}
              <div style={{
                width:'100%', height:'100%',
                background:'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 40%, #0d0d0d 100%)',
                display:'flex', alignItems:'center', justifyContent:'center',
                position:'relative', overflow:'hidden',
                minHeight:'300px',
              }}>
                {/* Marble texture overlay */}
                <div style={{
                  position:'absolute', inset:0,
                  background:`
                    repeating-linear-gradient(
                      125deg,
                      rgba(255,255,255,0.01) 0px,
                      rgba(255,255,255,0.03) 1px,
                      transparent 1px,
                      transparent 40px
                    ),
                    repeating-linear-gradient(
                      55deg,
                      rgba(255,255,255,0.01) 0px,
                      rgba(255,255,255,0.02) 1px,
                      transparent 1px,
                      transparent 60px
                    )
                  `,
                  pointerEvents:'none',
                }} />

                {/* Green plant top right */}
                <div style={{
                  position:'absolute', top:0, right:0,
                  width:'120px', height:'100px',
                  background:'radial-gradient(ellipse at 80% 20%, rgba(34,85,34,0.6) 0%, transparent 70%)',
                  fontSize:'2.5rem', display:'flex', alignItems:'flex-start', justifyContent:'flex-end',
                  padding:'8px',
                }}>
                  🌿
                </div>

                {/* Main notebook */}
                <div style={{
                  position:'absolute',
                  left:'10%', top:'8%',
                  width:'42%', height:'78%',
                  background:'linear-gradient(145deg, #111 0%, #1a1a1a 50%, #0d0d0d 100%)',
                  borderRadius:'8px',
                  boxShadow:'4px 4px 20px rgba(0,0,0,0.8)',
                  display:'flex', flexDirection:'column',
                  alignItems:'center', justifyContent:'center',
                  border:'1px solid rgba(180,140,60,0.15)',
                }}>
                  {/* Gold logo on notebook */}
                  <div style={{
                    width:'50px', height:'50px',
                    borderRadius:'4px',
                    background:'linear-gradient(135deg,#C9A84C,#FFD700,#B8860B)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:'1.4rem', marginBottom:'0.75rem',
                    boxShadow:'0 0 20px rgba(200,168,76,0.4)',
                  }}>
                    ✦
                  </div>
                  <p style={{
                    fontSize:'0.7rem', fontWeight:800,
                    color:'rgba(200,168,76,0.9)',
                    letterSpacing:'4px', textTransform:'uppercase',
                    marginBottom:'2px',
                  }}>ELEVATE</p>
                  <p style={{
                    fontSize:'0.45rem', color:'rgba(200,168,76,0.5)',
                    letterSpacing:'3px', textTransform:'uppercase',
                  }}>CREATIVE STUDIO</p>
                  {/* Pen */}
                  <div style={{
                    position:'absolute', top:'5%', right:'-8%',
                    width:'6px', height:'80%',
                    background:'linear-gradient(180deg,#888,#555,#333)',
                    borderRadius:'3px 3px 0 0',
                    boxShadow:'1px 1px 4px rgba(0,0,0,0.6)',
                    transform:'rotate(-5deg)',
                  }}>
                    <div style={{
                      position:'absolute', top:0, left:'50%',
                      transform:'translateX(-50%)',
                      width:'8px', height:'8px', borderRadius:'50%',
                      background:'linear-gradient(135deg,#C9A84C,#FFD700)',
                    }} />
                  </div>
                </div>

                {/* Envelope */}
                <div style={{
                  position:'absolute', right:'6%', top:'12%',
                  width:'32%', height:'35%',
                  background:'linear-gradient(145deg,#0d0d0d,#1a1a1a)',
                  borderRadius:'6px',
                  border:'1px solid rgba(180,140,60,0.2)',
                  display:'flex', flexDirection:'column',
                  alignItems:'center', justifyContent:'center',
                  boxShadow:'2px 2px 12px rgba(0,0,0,0.6)',
                }}>
                  <div style={{
                    fontSize:'0.55rem', fontWeight:800,
                    color:'rgba(200,168,76,0.7)',
                    letterSpacing:'3px', textTransform:'uppercase',
                    marginBottom:'2px',
                  }}>ELEVATE</div>
                  <div style={{
                    fontSize:'0.38rem', color:'rgba(200,168,76,0.4)',
                    letterSpacing:'2px', textTransform:'uppercase',
                  }}>CREATIVE STUDIO</div>
                  {/* Envelope flap */}
                  <div style={{
                    position:'absolute', top:0, left:0, right:0,
                    height:'40%',
                    borderBottom:'1px solid rgba(180,140,60,0.15)',
                    background:'linear-gradient(180deg,rgba(200,168,76,0.04),transparent)',
                    borderRadius:'6px 6px 0 0',
                  }} />
                </div>

                {/* Business card */}
                <div style={{
                  position:'absolute', right:'8%', bottom:'10%',
                  width:'35%', height:'22%',
                  background:'linear-gradient(145deg,#fff,#f5f5f5)',
                  borderRadius:'6px',
                  boxShadow:'0 4px 20px rgba(0,0,0,0.5)',
                  display:'flex', flexDirection:'column',
                  justifyContent:'center', padding:'8px 10px',
                }}>
                  <p style={{ fontSize:'0.5rem', fontWeight:800, color:'#111', letterSpacing:'1px', marginBottom:'2px' }}>JAMES WALKER</p>
                  <p style={{ fontSize:'0.38rem', color:'#666', marginBottom:'4px' }}>Creative Director</p>
                  <div style={{ display:'flex', flexDirection:'column', gap:'1px' }}>
                    {['+1 234 567 890','hello@elevatestudio.com','www.elevatestudio.com'].map((t,i)=>(
                      <p key={i} style={{ fontSize:'0.32rem', color:'#888' }}>{t}</p>
                    ))}
                  </div>
                </div>

                {/* Round seal */}
                <div style={{
                  position:'absolute', bottom:'22%', left:'55%',
                  width:'48px', height:'48px', borderRadius:'50%',
                  background:'linear-gradient(135deg,#111,#222)',
                  border:'2px solid rgba(200,168,76,0.5)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:'1rem',
                  boxShadow:'0 0 16px rgba(200,168,76,0.2)',
                }}>✦</div>
              </div>
            </motion.div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity:1, scale:0.9 }}
              animate={{ opacity:1, scale:1 }}
              transition={{ duration:0.7, delay:0.6, ease }}
              style={{
                position:'absolute', bottom:'-5%', right:'-6%',
                padding:'1.5rem 1.75rem', borderRadius:'18px',
                background:'rgba(10,15,50,0.88)',
                backdropFilter:'blur(28px)', WebkitBackdropFilter:'blur(28px)',
                border:'1px solid rgba(255,255,255,0.12)',
                boxShadow:'inset 0 1px 0 rgba(255,255,255,0.15), 0 16px 48px rgba(0,0,0,0.55)',
                minWidth:'160px', zIndex:2,
              }}
            >
              <div style={{
                width:'40px', height:'40px', borderRadius:'12px', marginBottom:'0.75rem',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:'1.2rem',
                background:'rgba(100,40,200,0.4)',
                border:'1px solid rgba(140,70,255,0.35)',
                boxShadow:'0 0 16px rgba(120,60,220,0.3)',
              }}>💎</div>
              <p style={{
                fontSize:'2.4rem', fontWeight:800, color:'#fff',
                letterSpacing:'-0.03em', lineHeight:1,
              }}>150+</p>
              <p style={{ fontSize:'0.85rem', color:'rgba(255,255,255,0.45)', marginTop:'4px', lineHeight:1.4 }}>
                Brands<br/>Created
              </p>
              <div style={{
                marginTop:'0.75rem', height:'2px', borderRadius:'2px',
                background:'linear-gradient(90deg,#7c3aed,#06b6d4)', width:'55%',
              }} />
            </motion.div>
          </motion.div>
        </div>

        {/* ══════════════════════════════
            WHAT WE OFFER + PROCESS
        ══════════════════════════════ */}
        <motion.div
          initial={{ opacity:1, y:20 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.7, ease }}
          style={{
            display:'grid', gridTemplateColumns:'300px 1fr',
            gap:'1px',
            background:'rgba(255,255,255,0.06)',
            borderRadius:'20px', overflow:'hidden',
            border:'1px solid rgba(255,255,255,0.08)',
            marginBottom:'1.25rem',
          }}
          className="wd-offer-grid"
        >
          {/* LEFT — Offer */}
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
              }}>🚀</div>
              <h2 style={{ fontSize:'1.15rem', fontWeight:700, color:'#fff' }}>What We Offer</h2>
            </div>
            <p style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.38)', lineHeight:1.65, marginBottom:'1.25rem' }}>
              Comprehensive branding solutions that help your business stand out and grow.
            </p>
            <div>
              {[
                'Brand Strategy & Positioning',
                'Logo Design & Identity',
                'Brand Guidelines',
                'Packaging Design',
                'Typography & Color System',
                'Brand Collateral Design',
              ].map((t,i) => <BulletItem key={t} text={t} delay={i*0.06} />)}
            </div>
          </div>

          {/* RIGHT — Process */}
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
              }}>👥</div>
              <h2 style={{ fontSize:'1.15rem', fontWeight:700, color:'#fff' }}>Our Branding Process</h2>
            </div>
            <p style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.38)', lineHeight:1.65, marginBottom:'2rem' }}>
              A strategic approach to build brands that connect and convert.
            </p>
            <div style={{ display:'flex', gap:'0.25rem', justifyContent:'space-between' }} className="process-row">
              <ProcessStep num={1} icon="🔍" title="Discovery" delay={0.1} isLast={false}
                desc="We understand your business, audience, and competitors." />
              <ProcessStep num={2} icon="📋" title="Strategy"  delay={0.17} isLast={false}
                desc="We define your brand positioning, voice, and core message." />
              <ProcessStep num={3} icon="🚀" title="Design"    delay={0.24} isLast={false}
                desc="We create visual identities that reflect your brand essence." />
              <ProcessStep num={4} icon="✅" title="Refine"    delay={0.31} isLast={false}
                desc="We fine-tune every detail to ensure consistency." />
              <ProcessStep num={5} icon="⚡" title="Launch"    delay={0.38} isLast={true}
                desc="We deliver a complete brand that's ready to make an impact." />
            </div>
          </div>
        </motion.div>

        {/* ══════════════════
            WHY CHOOSE US
        ══════════════════ */}
        <motion.div
          initial={{ opacity:1, y:20 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.7, ease }}
          style={{
            display:'grid', gridTemplateColumns:'220px 1fr',
            gap:'1px',
            background:'rgba(255,255,255,0.05)',
            borderRadius:'20px', overflow:'hidden',
            border:'1px solid rgba(255,255,255,0.07)',
            marginBottom:'1.25rem',
          }}
          className="why-grid"
        >
          {/* Left label */}
          <div style={{
            padding:'2rem',
            background:'rgba(15,10,40,0.55)',
            backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
            display:'flex', flexDirection:'column', justifyContent:'center',
          }}>
            <h2 style={{ fontSize:'1.1rem', fontWeight:700, color:'#fff', marginBottom:'0.5rem' }}>
              Why Choose Us?
            </h2>
            <p style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.35)', lineHeight:1.65 }}>
              We don't just design brands, we build legacies.
            </p>
          </div>

          {/* Right — 4 cards */}
          <div style={{
            padding:'1.75rem 2rem',
            background:'rgba(10,15,40,0.45)',
            backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
            display:'flex', gap:'1.5rem', flexWrap:'wrap', alignItems:'center',
          }}>
            <WhyCard icon="🎯" title="Strategic Approach"  color="purple" delay={0.1}
              desc="Data-driven strategies that build strong brands." />
            <WhyCard icon="💎" title="Creative Excellence"  color="blue"   delay={0.15}
              desc="Unique designs that make you stand out." />
            <WhyCard icon="🔷" title="Consistent Identity" color="teal"   delay={0.2}
              desc="Consistent across all platforms and touchpoints." />
            <WhyCard icon="📈" title="Results Driven"      color="purple" delay={0.25}
              desc="Brands that connect, engage, and convert." />
          </div>
        </motion.div>

        {/* ════════════════════
            TRUSTED BRANDS
        ════════════════════ */}
        <motion.div
          initial={{ opacity:1, y:20 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.7, ease }}
          style={{
            display:'grid', gridTemplateColumns:'220px 1fr',
            gap:'1px',
            background:'rgba(255,255,255,0.05)',
            borderRadius:'20px', overflow:'hidden',
            border:'1px solid rgba(255,255,255,0.07)',
            marginBottom:'1.25rem',
          }}
          className="why-grid"
        >
          {/* Left label */}
          <div style={{
            padding:'2rem',
            background:'rgba(15,10,40,0.55)',
            backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
            display:'flex', flexDirection:'column', justifyContent:'center',
          }}>
            <h2 style={{ fontSize:'1.1rem', fontWeight:700, color:'#fff', marginBottom:'0.5rem' }}>
              Brands That Trust Us
            </h2>
            <p style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.35)', lineHeight:1.65 }}>
              We've had the privilege of building identities for amazing brands.
            </p>
          </div>

          {/* Right — logos */}
          <div style={{
            padding:'1.75rem 2rem',
            background:'rgba(10,15,40,0.45)',
            backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
            display:'flex', gap:'0.75rem',
            flexWrap:'wrap', alignItems:'center',
          }}>
            {[
              { icon:'〜', name:'PULSE'   },
              { icon:'N',  name:'NEXORA'  },
              { icon:'V',  name:'VISIONIX'},
              { icon:'☁',  name:'CloudLab'},
              { icon:'Z',  name:'ZENTRIC' },
              { icon:'F',  name:'FUSION'  },
            ].map((b,i) => <BrandLogo key={b.name} {...b} delay={i*0.07} />)}
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
              width:'64px', height:'64px', borderRadius:'18px', flexShrink:0,
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'1.8rem',
              background:'rgba(100,40,200,0.35)',
              border:'1px solid rgba(140,70,255,0.35)',
              boxShadow:'0 0 24px rgba(120,60,220,0.3)',
            }}>🚀</div>
            <div>
              <h2 style={{
                fontSize:'clamp(1.2rem,3vw,1.7rem)', fontWeight:800,
                color:'#fff', letterSpacing:'-0.02em', marginBottom:'0.4rem',
              }}>
                Ready to Build a Brand That Stands Out?
              </h2>
              <p style={{ fontSize:'0.85rem', color:'rgba(255,255,255,0.4)', lineHeight:1.65 }}>
                Let's create a powerful identity that connects with your audience and drives growth.
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