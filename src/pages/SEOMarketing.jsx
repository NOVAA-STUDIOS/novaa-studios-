import { motion }    from 'framer-motion'
import { Link }      from 'react-router-dom'
import Navbar        from '../components/Navbar'
import Footer        from '../components/Footer'
import SEODashboard  from '../components/SEODashboard'

const ease = [0.22, 1, 0.36, 1]

/* ── Bullet item ── */
function BulletItem({ text, delay=0 }) {
  return (
    <motion.div
      initial={{ opacity:0, x:-12 }}
      whileInView={{ opacity:1, x:0 }}
      viewport={{ once:true }}
      transition={{ duration:0.45, delay, ease }}
      style={{
        display:'flex', alignItems:'center', gap:'10px',
        padding:'7px 0',
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
      <span style={{ fontSize:'0.87rem', color:'rgba(255,255,255,0.7)', fontWeight:500 }}>
        {text}
      </span>
    </motion.div>
  )
}

/* ── SEO Process Step ── */
function ProcessStep({ num, icon, title, desc, delay=0, isLast=false }) {
  return (
    <div style={{
      display:'flex', flexDirection:'column', alignItems:'center',
      flex:1, minWidth:'110px', position:'relative',
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
        initial={{ opacity:0, y:20 }}
        whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }}
        transition={{ duration:0.6, delay, ease }}
        style={{
          display:'flex', flexDirection:'column',
          alignItems:'center', gap:'0.65rem',
          position:'relative', zIndex:1,
        }}
      >
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
        <span style={{
          fontSize:'0.75rem', fontWeight:700, letterSpacing:'0.5px',
          background:'linear-gradient(135deg,#c084fc,#06b6d4)',
          WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
        }}>
          0{num}
        </span>
        <h3 style={{ fontSize:'0.88rem', fontWeight:700, color:'#fff', textAlign:'center', lineHeight:1.3 }}>
          {title}
        </h3>
        <p style={{ fontSize:'0.73rem', color:'rgba(255,255,255,0.38)', lineHeight:1.65, textAlign:'center' }}>
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
      initial={{ opacity:0, y:12 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }}
      transition={{ duration:0.5, delay, ease }}
      style={{ display:'flex', alignItems:'flex-start', gap:'1rem', flex:'1 1 180px' }}
    >
      <div style={{
        width:'44px', height:'44px', borderRadius:'12px', flexShrink:0,
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:'1.1rem',
        background: color==='teal' ? 'rgba(0,160,130,0.3)'
          : color==='blue' ? 'rgba(30,80,200,0.3)' : 'rgba(100,40,200,0.3)',
        border: color==='teal' ? '1px solid rgba(0,200,160,0.3)'
          : color==='blue' ? '1px solid rgba(60,120,255,0.3)' : '1px solid rgba(140,70,255,0.3)',
        boxShadow: color==='teal' ? '0 0 14px rgba(0,180,150,0.2)'
          : color==='blue' ? '0 0 14px rgba(40,100,220,0.2)' : '0 0 14px rgba(120,60,220,0.2)',
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

/* ── Tool badge ── */
function ToolBadge({ icon, name, delay=0 }) {
  return (
    <motion.div
      initial={{ opacity:0, y:10 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }}
      transition={{ duration:0.4, delay, ease }}
      whileHover={{ scale:1.06, background:'rgba(255,255,255,0.08)' }}
      style={{
        display:'flex', flexDirection:'column', alignItems:'center', gap:'6px',
        padding:'12px 16px', borderRadius:'12px',
        background:'rgba(255,255,255,0.04)',
        border:'1px solid rgba(255,255,255,0.09)',
        boxShadow:'inset 0 1px 0 rgba(255,255,255,0.06)',
        transition:'all 0.25s ease', cursor:'default',
        minWidth:'80px',
      }}
    >
      <span style={{ fontSize:'1.4rem' }}>{icon}</span>
      <span style={{ fontSize:'0.65rem', fontWeight:600, color:'rgba(255,255,255,0.5)', textAlign:'center', lineHeight:1.3 }}>
        {name}
      </span>
    </motion.div>
  )
}

/* ══════════════════════
   MAIN PAGE
══════════════════════ */
export default function SEOMarketing() {
  return (
    <div style={{ position:'relative', zIndex:1, minHeight:'100vh' }}>
      <Navbar />

      <div style={{ maxWidth:'1220px', margin:'0 auto', padding:'0 1.5rem' }}>

        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          transition={{ duration:0.6, delay:0.2 }}
          style={{
            paddingTop:'90px',
            display:'flex', alignItems:'center', gap:'8px',
            fontSize:'0.8rem', color:'rgba(255,255,255,0.35)',
            marginBottom:'2rem',
          }}
        >
          <Link to="/" style={{ color:'rgba(255,255,255,0.35)', textDecoration:'none' }}>Home</Link>
          <span>›</span>
          <Link to="/#services" style={{ color:'rgba(255,255,255,0.35)', textDecoration:'none' }}>Services</Link>
          <span>›</span>
          <span style={{ color:'rgba(255,255,255,0.7)' }}>SEO & Marketing</span>
        </motion.div>

        {/* ══════════
            HERO
        ══════════ */}
        <div style={{
          display:'grid', gridTemplateColumns:'1fr 1.3fr',
          gap:'2.5rem', alignItems:'center', marginBottom:'3rem',
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
                fontSize:'clamp(2.2rem,5vw,3.5rem)',
                fontWeight:800, lineHeight:1.05,
                letterSpacing:'-0.03em', marginBottom:'1.25rem',
              }}
            >
              <span style={{
                background:'linear-gradient(160deg,#fff 0%,rgba(255,255,255,0.85) 100%)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
                display:'block',
              }}>SEO & Marketing That</span>
              <span style={{
                background:'linear-gradient(135deg,#c084fc 0%,#06b6d4 60%)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
                display:'block',
              }}>Drives Traffic &</span>
              <span style={{
                background:'linear-gradient(135deg,#c084fc 0%,#06b6d4 100%)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
                display:'block',
              }}>Boosts Growth.</span>
            </motion.h1>

            {/* Para */}
            <motion.p
              initial={{ opacity:0, y:16 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:0.7, ease, delay:0.32 }}
              style={{
                fontSize:'0.95rem', color:'rgba(255,255,255,0.44)',
                lineHeight:1.8, maxWidth:'380px', marginBottom:'2rem',
              }}
            >
              We use data-driven SEO strategies and marketing campaigns that rank you higher, attract the right audience, and maximize your business growth.
            </motion.p>

            {/* Buttons */}
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
                  color:'#fff', fontWeight:600, fontSize:'0.93rem',
                  cursor:'pointer', transition:'all 0.3s ease',
                }}
              >
                Start Your Project
                <span style={{
                  display:'flex', alignItems:'center', justifyContent:'center',
                  width:'24px', height:'24px', borderRadius:'6px',
                  background:'rgba(255,255,255,0.15)', fontSize:'0.85rem',
                }}>→</span>
              </motion.button>
              <motion.button
                whileHover={{ scale:1.03, background:'rgba(255,255,255,0.08)' }}
                whileTap={{ scale:0.97 }}
                style={{
                  padding:'13px 26px', borderRadius:'50px',
                  background:'rgba(255,255,255,0.04)',
                  border:'1px solid rgba(255,255,255,0.12)',
                  color:'rgba(255,255,255,0.75)', fontWeight:500,
                  fontSize:'0.93rem', cursor:'pointer', transition:'all 0.25s ease',
                }}
              >
                View Our Work
              </motion.button>
            </motion.div>
          </div>

          {/* RIGHT — SEO Dashboard + stat card */}
          <motion.div
            initial={{ opacity:0, x:32 }}
            animate={{ opacity:1, x:0 }}
            transition={{ duration:0.9, ease, delay:0.25 }}
            style={{ position:'relative' }}
          >
            <SEODashboard />

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity:0, scale:0.9 }}
              animate={{ opacity:1, scale:1 }}
              transition={{ duration:0.7, delay:0.65, ease }}
              style={{
                position:'absolute', bottom:'-5%', right:'-6%',
                padding:'1.5rem 1.75rem', borderRadius:'18px',
                background:'rgba(10,15,50,0.9)',
                backdropFilter:'blur(28px)', WebkitBackdropFilter:'blur(28px)',
                border:'1px solid rgba(255,255,255,0.12)',
                boxShadow:'inset 0 1px 0 rgba(255,255,255,0.15), 0 16px 48px rgba(0,0,0,0.55)',
                minWidth:'155px', zIndex:2,
              }}
            >
              <div style={{
                width:'40px', height:'40px', borderRadius:'12px', marginBottom:'0.75rem',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:'1.1rem',
                background:'rgba(100,40,200,0.4)',
                border:'1px solid rgba(140,70,255,0.35)',
                boxShadow:'0 0 16px rgba(120,60,220,0.3)',
              }}>🚀</div>
              <p style={{
                fontSize:'2.4rem', fontWeight:800, color:'#fff',
                letterSpacing:'-0.03em', lineHeight:1,
              }}>300+</p>
              <p style={{ fontSize:'0.82rem', color:'rgba(255,255,255,0.42)', marginTop:'4px', lineHeight:1.4 }}>
                Campaigns<br/>Executed
              </p>
              <div style={{
                marginTop:'0.75rem', height:'2px', borderRadius:'2px',
                background:'linear-gradient(90deg,#7c3aed,#06b6d4)', width:'55%',
              }} />
            </motion.div>
          </motion.div>
        </div>

        {/* ════════════════════════
            OFFER + PROCESS
        ════════════════════════ */}
        <motion.div
          initial={{ opacity:0, y:20 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.7, ease }}
          style={{
            display:'grid', gridTemplateColumns:'290px 1fr',
            gap:'1px',
            background:'rgba(255,255,255,0.06)',
            borderRadius:'20px', overflow:'hidden',
            border:'1px solid rgba(255,255,255,0.08)',
            marginBottom:'1.25rem',
          }}
          className="wd-offer-grid"
        >
          {/* LEFT */}
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
              <h2 style={{ fontSize:'1.1rem', fontWeight:700, color:'#fff' }}>What We Offer</h2>
            </div>
            <p style={{ fontSize:'0.78rem', color:'rgba(255,255,255,0.38)', lineHeight:1.65, marginBottom:'1.25rem' }}>
              Comprehensive SEO & marketing solutions to grow your online presence and business.
            </p>
            <div>
              {[
                'Search Engine Optimization (SEO)',
                'On-Page & Technical SEO',
                'Keyword Research & Analysis',
                'Content Marketing',
                'Social Media Marketing',
                'PPC Advertising (Google Ads)',
                'Analytics & Performance Tracking',
              ].map((t,i) => <BulletItem key={t} text={t} delay={i*0.06} />)}
            </div>
          </div>

          {/* RIGHT */}
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
              <h2 style={{ fontSize:'1.1rem', fontWeight:700, color:'#fff' }}>Our SEO & Marketing Process</h2>
            </div>
            <p style={{ fontSize:'0.78rem', color:'rgba(255,255,255,0.38)', lineHeight:1.65, marginBottom:'2rem' }}>
              A strategic process that ensures measurable results and sustainable growth.
            </p>
            <div style={{ display:'flex', gap:'0.25rem', justifyContent:'space-between' }} className="process-row">
              <ProcessStep num={1} icon="🔍" title="Research & Analysis"    delay={0.1}
                desc="We analyze your market, competitors, and audience to find the best opportunities." />
              <ProcessStep num={2} icon="📋" title="Strategy & Planning"    delay={0.17}
                desc="We create a customized SEO & marketing strategy aligned with your goals." />
              <ProcessStep num={3} icon="🚀" title="Implementation"         delay={0.24}
                desc="We execute SEO, content, and marketing campaigns to drive results." />
              <ProcessStep num={4} icon="📊" title="Monitoring & Tracking"  delay={0.31}
                desc="We track performance using advanced tools and analytics." />
              <ProcessStep num={5} icon="🎯" title="Optimize & Grow"        delay={0.38} isLast
                desc="We optimize campaigns continuously to maximize ROI and growth." />
            </div>
          </div>
        </motion.div>

        {/* ══════════════════
            WHY CHOOSE US
        ══════════════════ */}
        <motion.div
          initial={{ opacity:0, y:20 }}
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
          <div style={{
            padding:'2rem',
            background:'rgba(15,10,40,0.55)',
            backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
            display:'flex', flexDirection:'column', justifyContent:'center',
          }}>
            <h2 style={{ fontSize:'1.1rem', fontWeight:700, color:'#fff', marginBottom:'0.5rem' }}>
              Why Choose Us?
            </h2>
            <p style={{ fontSize:'0.78rem', color:'rgba(255,255,255,0.35)', lineHeight:1.65 }}>
              Results-driven strategies that deliver long-term success.
            </p>
          </div>
          <div style={{
            padding:'1.75rem 2rem',
            background:'rgba(10,15,40,0.45)',
            backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
            display:'flex', gap:'1.5rem', flexWrap:'wrap', alignItems:'center',
          }}>
            <WhyCard icon="📊" title="Data-Driven Approach"   color="purple" delay={0.1}
              desc="We make decisions based on data, not guesses." />
            <WhyCard icon="🛡️" title="White-Hat Strategies"   color="blue"   delay={0.15}
              desc="100% ethical SEO techniques for sustainable growth." />
            <WhyCard icon="📋" title="Transparent Reporting"  color="teal"   delay={0.2}
              desc="Clear reports and insights to keep you informed." />
            <WhyCard icon="💰" title="ROI Focused"            color="purple" delay={0.25}
              desc="We focus on strategies that bring the highest ROI." />
          </div>
        </motion.div>

        {/* ════════════════════
            TOOLS WE USE
        ════════════════════ */}
        <motion.div
          initial={{ opacity:0, y:20 }}
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
          <div style={{
            padding:'2rem',
            background:'rgba(15,10,40,0.55)',
            backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
            display:'flex', flexDirection:'column', justifyContent:'center',
          }}>
            <h2 style={{ fontSize:'1.1rem', fontWeight:700, color:'#fff', marginBottom:'0.5rem' }}>
              Tools & Technologies We Use
            </h2>
            <p style={{ fontSize:'0.78rem', color:'rgba(255,255,255,0.35)', lineHeight:1.65 }}>
              Industry-leading tools to analyze, optimize, and grow your business.
            </p>
          </div>
          <div style={{
            padding:'1.5rem 2rem',
            background:'rgba(10,15,40,0.45)',
            backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
            display:'flex', gap:'8px', flexWrap:'wrap', alignItems:'center',
          }}>
            {[
              { icon:'📊', name:'Google\nAnalytics'        },
              { icon:'🔍', name:'Google Search\nConsole'   },
              { icon:'🔶', name:'SEMRUSH'                  },
              { icon:'📈', name:'ahrefs'                   },
              { icon:'🎯', name:'Google Ads'               },
              { icon:'⭕', name:'MOZ'                      },
              { icon:'📘', name:'Meta Business\nSuite'     },
              { icon:'🐸', name:'Screaming\nFrog'          },
            ].map((t,i) => <ToolBadge key={t.name} {...t} delay={i*0.05} />)}
          </div>
        </motion.div>

        {/* ════════════════
            FINAL CTA
        ════════════════ */}
        <motion.div
          initial={{ opacity:0, y:20 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.7, ease }}
          style={{
            padding:'2.5rem 3rem', borderRadius:'20px', marginBottom:'4rem',
            background:'rgba(15,10,40,0.55)',
            backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
            border:'1px solid rgba(255,255,255,0.08)',
            boxShadow:'inset 0 1px 0 rgba(255,255,255,0.1)',
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
                Ready to Rank Higher & Grow Your Business?
              </h2>
              <p style={{ fontSize:'0.85rem', color:'rgba(255,255,255,0.4)', lineHeight:1.65 }}>
                Let's create a powerful SEO & marketing strategy that drives real results.
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
              cursor:'pointer', whiteSpace:'nowrap', transition:'all 0.3s ease',
            }}
          >
            Start Your Project
            <span style={{
              display:'flex', alignItems:'center', justifyContent:'center',
              width:'26px', height:'26px', borderRadius:'8px',
              background:'rgba(255,255,255,0.15)', fontSize:'0.9rem',
            }}>→</span>
          </motion.button>
        </motion.div>
      </div>
      <Footer />
    </div>
  )
}