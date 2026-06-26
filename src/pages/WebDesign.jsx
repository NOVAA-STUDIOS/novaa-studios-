import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BackButton from '../components/BackButton'
import CTAButton from '../components/CTAButton'

const ease = [0.22, 1, 0.36, 1]

/* ── Process Step Card ── */
function ProcessCard({ num, icon, title, desc, delay = 0, isLast = false }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', flex:1, minWidth:'140px', position:'relative' }}>
      {/* Dotted connector */}
      {!isLast && (
        <div style={{
          position:   'absolute',
          top:        '36px', left:'calc(50% + 36px)',
          width:      'calc(100% - 72px)',
          height:     '1px',
          borderTop:  '2px dashed rgba(99,102,241,0.4)',
          zIndex:     0,
        }} />
      )}

      <motion.div
        initial={{ opacity:0, y:24 }}
        whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }}
        transition={{ duration:0.6, delay, ease }}
        style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'1rem', position:'relative', zIndex:1 }}
      >
        {/* Circle icon */}
        <div style={{
          width:'72px', height:'72px', borderRadius:'50%',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:'1.6rem',
          background:   num <= 2
            ? 'radial-gradient(circle, rgba(140,60,255,0.5), rgba(80,20,200,0.3))'
            : 'radial-gradient(circle, rgba(0,200,160,0.5), rgba(0,120,100,0.3))',
          border:       num <= 2
            ? '1px solid rgba(160,80,255,0.4)'
            : '1px solid rgba(0,220,170,0.35)',
          boxShadow:    num <= 2
            ? '0 0 24px rgba(140,60,255,0.4)'
            : '0 0 24px rgba(0,200,160,0.35)',
        }}>
          {icon}
        </div>

        {/* Number */}
        <span style={{
          fontSize:      '0.78rem', fontWeight:700,
          letterSpacing: '0.5px',
          background:    'linear-gradient(135deg,#c084fc,#06b6d4)',
          WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
        }}>
          0{num}
        </span>

        <h3 style={{ fontSize:'1rem', fontWeight:700, color:'#fff', textAlign:'center' }}>{title}</h3>
        <p style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.4)', lineHeight:1.7, textAlign:'center' }}>{desc}</p>
      </motion.div>
    </div>
  )
}

/* ── Feature row item ── */
function OfferItem({ icon, title, desc, color, delay=0 }) {
  return (
    <motion.div
      initial={{ opacity:0, x:-16 }}
      whileInView={{ opacity:1, x:0 }}
      viewport={{ once:true }}
      transition={{ duration:0.5, delay, ease }}
      style={{
        display:'flex', alignItems:'flex-start', gap:'1rem',
        padding:'1rem',
        borderRadius:'12px',
        background:'rgba(255,255,255,0.03)',
        border:'1px solid rgba(255,255,255,0.07)',
        transition:'all 0.25s ease',
      }}
    >
      <div style={{
        width:'40px', height:'40px', borderRadius:'10px',
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:'1rem', flexShrink:0,
        background: color === 'teal'
          ? 'rgba(0,160,130,0.3)' : 'rgba(100,40,200,0.3)',
        border: color === 'teal'
          ? '1px solid rgba(0,200,160,0.3)' : '1px solid rgba(140,70,255,0.3)',
        boxShadow: color === 'teal'
          ? '0 0 12px rgba(0,180,150,0.2)' : '0 0 12px rgba(120,60,220,0.2)',
      }}>
        {icon}
      </div>
      <div>
        <p style={{ fontSize:'0.93rem', fontWeight:700, color:'#fff', marginBottom:'4px' }}>{title}</p>
        <p style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.4)', lineHeight:1.65 }}>{desc}</p>
      </div>
    </motion.div>
  )
}

/* ── Why Choose card ── */
function WhyCard({ icon, title, desc, color, delay=0 }) {
  return (
    <motion.div
      initial={{ opacity:0, y:16 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }}
      transition={{ duration:0.5, delay, ease }}
      style={{
        display:'flex', flexDirection:'column', alignItems:'center',
        textAlign:'center', gap:'0.75rem',
        padding:'1.25rem 1rem',
        flex:'1 1 150px',
      }}
    >
      <div style={{
        width:'52px', height:'52px', borderRadius:'14px',
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:'1.3rem',
        background: color === 'teal'
          ? 'rgba(0,160,130,0.3)' : 'rgba(100,40,200,0.3)',
        border: color === 'teal'
          ? '1px solid rgba(0,200,160,0.3)' : '1px solid rgba(140,70,255,0.3)',
        boxShadow: color === 'teal'
          ? '0 0 16px rgba(0,180,150,0.25)' : '0 0 16px rgba(120,60,220,0.25)',
      }}>
        {icon}
      </div>
      <p style={{ fontSize:'0.9rem', fontWeight:700, color:'#fff' }}>{title}</p>
      <p style={{ fontSize:'0.78rem', color:'rgba(255,255,255,0.38)', lineHeight:1.65 }}>{desc}</p>
    </motion.div>
  )
}

/* ══════════════════════════
   MAIN PAGE
══════════════════════════ */
export default function WebDesign() {
  return (
    <div style={{ position:'relative', zIndex:1, minHeight:'100vh' }}>
      <Navbar />

      <div style={{ maxWidth:'1220px', margin:'0 auto', padding:'0 1.5rem' }}>

        {/* ── Breadcrumb ── */}
        <motion.div
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          transition={{ duration:0.6, delay:0.2 }}
          style={{
            paddingTop:     '90px',
            display:        'flex',
            alignItems:     'center',
            gap:            '8px',
            fontSize:       '0.8rem',
            color:          'rgba(255,255,255,0.35)',
            marginBottom:   '2rem',
          }}
        >

          <div style={{ marginBottom:'1.5rem' }}>
  <BackButton />
</div>


          <Link to="/" style={{ color:'rgba(255,255,255,0.35)', textDecoration:'none' }}>Home</Link>
          <span>›</span>
          <Link to="/#services" style={{ color:'rgba(255,255,255,0.35)', textDecoration:'none' }}>Services</Link>
          <span>›</span>
          <span style={{ color:'rgba(255,255,255,0.7)' }}>Web Design</span>
        </motion.div>

        {/* ════════════════
            HERO SECTION
        ════════════════ */}
        <div style={{
          display:'grid',
          gridTemplateColumns:'1fr 1fr',
          gap:'3rem', alignItems:'center',
          marginBottom:'4rem',
        }}
          className="wd-hero-grid"
        >
          {/* LEFT */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity:0, y:14 }}
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
              initial={{ opacity:0, y:28 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:0.9, ease, delay:0.2 }}
              style={{
                fontSize:'clamp(2.4rem, 5.5vw, 4rem)',
                fontWeight:800, lineHeight:1.05,
                letterSpacing:'-0.03em', marginBottom:'1.25rem',
              }}
            >
              <span style={{
                background:'linear-gradient(160deg,#fff 0%,rgba(255,255,255,0.85) 100%)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
                display:'block',
              }}>
                Web Design That
              </span>
              <span style={{
                background:'linear-gradient(135deg, #c084fc 0%, #06b6d4 100%)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
                display:'block',
              }}>
                Converts & Dominates.
              </span>
            </motion.h1>

            {/* Para */}
            <motion.p
              initial={{ opacity:0, y:16 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:0.7, ease, delay:0.32 }}
              style={{
                fontSize:'0.97rem', color:'rgba(255,255,255,0.44)',
                lineHeight:1.8, maxWidth:'420px', marginBottom:'2rem',
              }}
            >
              We create visually stunning, user-focused websites that not only look incredible but also drive engagement, build trust, and deliver real results.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity:0, y:14 }}
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

          {/* RIGHT — Mockup */}
          <motion.div
            initial={{ opacity:0, x:32 }}
            animate={{ opacity:1, x:0 }}
            transition={{ duration:0.9, ease, delay:0.25 }}
            style={{ position:'relative' }}
          >
            {/* Main mockup */}
            <div style={{
              borderRadius:'20px', overflow:'hidden',
              border:'1px solid rgba(255,255,255,0.1)',
              boxShadow:'0 24px 60px rgba(0,0,0,0.5)',
              background:'linear-gradient(135deg, rgba(80,20,160,0.8) 0%, rgba(10,30,80,0.7) 50%, rgba(0,80,60,0.5) 100%)',
              aspectRatio:'4/3',
              display:'flex', alignItems:'center', justifyContent:'center',
              position:'relative', padding:'1.5rem',
            }}>
              {/* Mock browser UI */}
              <div style={{
                width:'85%', borderRadius:'12px',
                background:'rgba(5,5,25,0.8)',
                border:'1px solid rgba(255,255,255,0.12)',
                overflow:'hidden',
              }}>
                {/* Browser bar */}
                <div style={{
                  padding:'8px 12px',
                  background:'rgba(255,255,255,0.05)',
                  borderBottom:'1px solid rgba(255,255,255,0.08)',
                  display:'flex', alignItems:'center', gap:'6px',
                }}>
                  {['rgba(255,80,80,0.7)','rgba(255,200,0,0.7)','rgba(0,200,80,0.7)'].map((c,i)=>(
                    <div key={i} style={{ width:'8px',height:'8px',borderRadius:'50%',background:c }} />
                  ))}
                  <div style={{
                    flex:1, height:'16px', borderRadius:'4px',
                    background:'rgba(255,255,255,0.06)',
                    marginLeft:'8px',
                  }} />
                </div>
                {/* Mock content */}
                <div style={{ padding:'1.5rem' }}>
                  <div style={{ marginBottom:'1rem' }}>
                    <div style={{ height:'8px',width:'40%',background:'rgba(255,255,255,0.5)',borderRadius:'4px',marginBottom:'8px' }} />
                    <div style={{ height:'6px',width:'70%',background:'rgba(255,255,255,0.2)',borderRadius:'3px',marginBottom:'6px' }} />
                    <div style={{ height:'6px',width:'55%',background:'rgba(255,255,255,0.15)',borderRadius:'3px' }} />
                  </div>
                  <div style={{ display:'flex',gap:'8px',marginTop:'1rem' }}>
                    <div style={{ padding:'6px 14px',borderRadius:'6px',background:'rgba(120,60,220,0.5)',border:'1px solid rgba(150,80,255,0.4)' }}>
                      <div style={{ height:'5px',width:'50px',background:'rgba(255,255,255,0.7)',borderRadius:'2px' }} />
                    </div>
                    <div style={{ padding:'6px 14px',borderRadius:'6px',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)' }}>
                      <div style={{ height:'5px',width:'40px',background:'rgba(255,255,255,0.3)',borderRadius:'2px' }} />
                    </div>
                  </div>
                  {/* Mountain illustration */}
                  <div style={{
                    marginTop:'1rem', height:'80px', borderRadius:'8px',
                    background:'linear-gradient(135deg,rgba(80,20,160,0.6),rgba(0,80,120,0.4))',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:'2rem',
                  }}>
                    🏔️
                  </div>
                </div>
              </div>

              {/* Floating small card */}
              <div style={{
                position:'absolute', bottom:'12%', right:'-8%',
                padding:'0.75rem 1rem', borderRadius:'12px',
                background:'rgba(5,5,25,0.85)',
                backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
                border:'1px solid rgba(255,255,255,0.12)',
                boxShadow:'inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 24px rgba(0,0,0,0.4)',
                minWidth:'130px',
              }}>
                <p style={{ fontSize:'0.65rem',color:'rgba(255,255,255,0.4)',letterSpacing:'1px',textTransform:'uppercase',marginBottom:'2px' }}>
                  Innovative Designs.
                </p>
                <p style={{ fontSize:'0.72rem',color:'rgba(200,150,255,0.9)',fontWeight:600 }}>Real Results.</p>
                <motion.button
                  whileHover={{ scale:1.05 }}
                  style={{
                    marginTop:'6px', padding:'4px 10px',
                    borderRadius:'6px', fontSize:'0.65rem',
                    background:'rgba(120,60,220,0.4)', border:'1px solid rgba(150,80,255,0.3)',
                    color:'#fff', fontWeight:600, cursor:'pointer',
                  }}
                >
                  Get Started
                </motion.button>
              </div>
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity:0, scale:0.9 }}
              animate={{ opacity:1, scale:1 }}
              transition={{ duration:0.7, delay:0.6, ease }}
              style={{
                position:'absolute', bottom:'-5%', left:'-8%',
                padding:'1.5rem', borderRadius:'18px',
                background:'rgba(15,10,40,0.82)',
                backdropFilter:'blur(28px)', WebkitBackdropFilter:'blur(28px)',
                border:'1px solid rgba(255,255,255,0.12)',
                boxShadow:'inset 0 1px 0 rgba(255,255,255,0.15), 0 16px 48px rgba(0,0,0,0.5)',
                minWidth:'170px',
              }}
            >
              <div style={{ fontSize:'1.5rem', marginBottom:'0.5rem' }}>🖥️</div>
              <p style={{
                fontSize:'2.2rem', fontWeight:800, color:'#fff',
                letterSpacing:'-0.03em', lineHeight:1,
              }}>250+</p>
              <p style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.42)', marginTop:'4px' }}>
                Websites Designed
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
        <div style={{
          display:'grid', gridTemplateColumns:'1fr 1fr',
          gap:'1.25rem', marginBottom:'1.25rem',
        }}
          className="wd-two-col"
        >

          {/* LEFT — What We Offer */}
          <motion.div
            initial={{ opacity:0, y:24 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.7, ease }}
            style={{
              padding:'2rem', borderRadius:'20px',
              background:'rgba(15,10,40,0.55)',
              backdropFilter:'blur(24px) saturate(150%)',
              WebkitBackdropFilter:'blur(24px) saturate(150%)',
              border:'1px solid rgba(255,255,255,0.08)',
              boxShadow:'inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.35)',
            }}
          >
            <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'0.5rem' }}>
              <div style={{
                width:'36px', height:'36px', borderRadius:'10px',
                display:'flex', alignItems:'center', justifyContent:'center',
                background:'rgba(100,40,200,0.3)', border:'1px solid rgba(140,70,255,0.3)',
                fontSize:'1rem',
              }}>🖥️</div>
              <h2 style={{ fontSize:'1.2rem', fontWeight:700, color:'#fff' }}>What We Offer</h2>
            </div>
            <p style={{ fontSize:'0.82rem', color:'rgba(255,255,255,0.38)', marginBottom:'1.5rem', lineHeight:1.65 }}>
              High-performance websites tailored to your brand and audience.
            </p>
            <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
              <OfferItem icon="🚀" title="Modern UI/UX Design"     desc="Beautiful, intuitive designs that create lasting impressions."       color="purple" delay={0.1} />
              <OfferItem icon="📱" title="Mobile-First Approach"   desc="Fully responsive websites that look perfect on all devices."         color="purple" delay={0.15} />
              <OfferItem icon="🎯" title="Conversion Focused"      desc="Strategic design that turns visitors into customers."                 color="teal"   delay={0.2} />
              <OfferItem icon="⚡" title="Fast & Scalable"         desc="Optimized for speed, performance, and future growth."                color="teal"   delay={0.25} />
            </div>
          </motion.div>

          {/* RIGHT — Design Process */}
          <motion.div
            initial={{ opacity:0, y:24 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.7, delay:0.1, ease }}
            style={{
              padding:'2rem', borderRadius:'20px',
              background:'rgba(10,20,40,0.5)',
              backdropFilter:'blur(24px) saturate(150%)',
              WebkitBackdropFilter:'blur(24px) saturate(150%)',
              border:'1px solid rgba(255,255,255,0.08)',
              boxShadow:'inset 0 1px 0 rgba(255,255,255,0.07), 0 8px 32px rgba(0,0,0,0.35)',
            }}
          >
            <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'0.5rem' }}>
              <div style={{
                width:'36px', height:'36px', borderRadius:'10px',
                display:'flex', alignItems:'center', justifyContent:'center',
                background:'rgba(0,140,120,0.3)', border:'1px solid rgba(0,200,160,0.3)',
                fontSize:'1rem',
              }}>🗺️</div>
              <h2 style={{ fontSize:'1.2rem', fontWeight:700, color:'#fff' }}>Our Design Process</h2>
            </div>
            <p style={{ fontSize:'0.82rem', color:'rgba(255,255,255,0.38)', marginBottom:'2rem', lineHeight:1.65 }}>
              A streamlined process that ensures a smooth journey from idea to launch.
            </p>
            <div style={{ display:'flex', gap:'0.5rem', justifyContent:'space-between' }} className="process-row">
              <ProcessCard num={1} icon="🔍" title="Research"  delay={0.1}
                desc="We learn about your business, audience, and competitors." />
              <ProcessCard num={2} icon="📋" title="Strategy"  delay={0.2}
                desc="We create detailed wireframes aligned with your goals." />
              <ProcessCard num={3} icon="🎨" title="Design"    delay={0.3}
                desc="We design user-friendly interfaces for your brand." />
              <ProcessCard num={4} icon="🚀" title="Launch"    delay={0.4} isLast
                desc="We develop, test, and launch with precision." />
            </div>
          </motion.div>
        </div>

        {/* ════════════════════════════
            WHY CHOOSE US
        ════════════════════════════ */}
        <motion.div
          initial={{ opacity:0, y:20 }}
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
          <div style={{ marginBottom:'1.5rem' }}>
            <p style={{ fontSize:'0.82rem', color:'rgba(255,255,255,0.42)', lineHeight:1.7, maxWidth:'680px' }}>
              <span style={{ fontWeight:700, color:'#fff', fontSize:'1rem' }}>
                Built for Performance. Designed for Results.
              </span>
              <br />
              We combine creativity with technology to build websites that are fast, SEO-friendly, and built to convert.
            </p>
          </div>
          <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap' }}>
            <WhyCard icon="⚡" title="High Performance"  desc="Lightning-fast websites for better user experience." color="purple" delay={0.1} />
            <WhyCard icon="📈" title="SEO Optimized"     desc="Built with best SEO practices in mind."             color="teal"   delay={0.15} />
            <WhyCard icon="🛡️" title="Secure & Reliable" desc="Safe, secure, and reliable websites."               color="teal"   delay={0.2} />
            <WhyCard icon="⚙️" title="Easy to Manage"   desc="User-friendly and easy to update anytime."          color="purple" delay={0.25} />
          </div>
        </motion.div>

        {/* ════════════════════════════
            FINAL CTA
        ════════════════════════════ */}
        <motion.div
          initial={{ opacity:0, y:24 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.7, ease }}
          style={{
            padding:'2.5rem 3rem', borderRadius:'20px',
            marginBottom:'4rem',
            background:'rgba(15,10,40,0.55)',
            backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
            border:'1px solid rgba(255,255,255,0.08)',
            boxShadow:'inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 40px rgba(0,0,0,0.35)',
            display:'flex', alignItems:'center', justifyContent:'space-between',
            flexWrap:'wrap', gap:'2rem',
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
                fontSize:'clamp(1.3rem,3vw,1.8rem)', fontWeight:800,
                color:'#fff', letterSpacing:'-0.02em', marginBottom:'0.4rem',
              }}>
                Ready to Build Your Dream Website?
              </h2>
              <p style={{ fontSize:'0.85rem', color:'rgba(255,255,255,0.4)', lineHeight:1.65 }}>
                Let's create a website that not only looks amazing but also brings real results.
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