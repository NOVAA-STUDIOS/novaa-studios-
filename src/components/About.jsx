import { motion } from 'framer-motion'
import FeatureCard from './FeatureCard'

const ease = [0.22, 1, 0.36, 1]

const STATS = [
  { icon: '🚀', n: '50+',  l: 'Projects Delivered'   },
  { icon: '⭐', n: '98%',  l: 'Client Satisfaction'   },
  { icon: '🌐', n: '20+',  l: 'Industries Served'     },
  { icon: '👥', n: '10+',  l: 'Years of Experience'   },
]

const FEATURES = [
  {
    icon:  '💡',
    title: 'Creative Minds',
    desc:  'We turn ideas into unique digital experiences that connect.',
    color: 'purple',
  },
  {
    icon:  '</>',
    title: 'Clean Code',
    desc:  'We build fast, secure, and scalable websites with best practices.',
    color: 'blue',
  },
  {
    icon:  '🎯',
    title: 'Result Focused',
    desc:  "Every project is built with a clear goal — your success.",
    color: 'teal',
  },
  {
    icon:  '🎧',
    title: 'Dedicated Support',
    desc:  "We're with you at every step, before and after launch.",
    color: 'indigo',
  },
]

export default function About() {
  return (
    <section
      id="about"
      style={{
        minHeight:     '100vh',
        padding:       '120px 1.5rem 80px',
        position:      'relative',
        zIndex:        1,
        maxWidth:      '1220px',
        margin:        '0 auto',
      }}
    >

      {/* ══════════════════════════
          HERO — LEFT + RIGHT SPLIT
      ══════════════════════════ */}
      <div style={{
        display:             'grid',
        gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
        gap:                 '3rem',
        alignItems:          'center',
        marginBottom:        '3rem',
      }}
        className="about-hero-grid"
      >

        {/* LEFT */}
        <div>
          {/* Badge */}
          <motion.div
            initial={{ opacity:0, y:14 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.6, ease }}
            style={{ marginBottom:'1.5rem' }}
          >
            <div style={{
              display:              'inline-flex',
              alignItems:           'center',
              gap:                  '9px',
              padding:              '7px 18px',
              borderRadius:         '50px',
              background:           'rgba(10,10,40,0.65)',
              backdropFilter:       'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border:               '1px solid rgba(255,255,255,0.13)',
              boxShadow:            'inset 0 1px 0 rgba(255,255,255,0.1)',
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
                Premium Web Agency
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity:0, y:24 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.8, delay:0.1, ease }}
            style={{
              fontSize:      'clamp(2.4rem, 5vw, 3.8rem)',
              fontWeight:    800,
              lineHeight:    1.08,
              letterSpacing: '-0.03em',
              marginBottom:  '1.5rem',
            }}
          >
            <span style={{
              background:           'linear-gradient(160deg,#fff 0%,rgba(255,255,255,0.82) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor:  'transparent',
            }}>
              We're More Than
            </span>
            <br />
            <span style={{
              background:           'linear-gradient(135deg, #c084fc 0%, #a855f7 50%, #9333ea 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor:  'transparent',
            }}>
              A Digital Agency.
            </span>
          </motion.h1>

          {/* Para */}
          <motion.p
            initial={{ opacity:0, y:16 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.7, delay:0.2, ease }}
            style={{
              fontSize:     '0.98rem',
              color:        'rgba(255,255,255,0.46)',
              lineHeight:   1.8,
              marginBottom: '2rem',
              maxWidth:     '440px',
            }}
          >
            NOVAA is a team of creatives, developers, and strategists passionate about building digital experiences that not only look stunning — but drive real results.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity:0, y:12 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.6, delay:0.3, ease }}
            whileHover={{ scale:1.04, y:-2 }}
            whileTap={{ scale:0.97 }}
            style={{
              display:              'inline-flex',
              alignItems:           'center',
              gap:                  '10px',
              padding:              '13px 26px',
              borderRadius:         '50px',
              background:           'rgba(20,15,50,0.65)',
              backdropFilter:       'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border:               '1px solid rgba(150,80,255,0.4)',
              boxShadow:            'inset 0 1px 0 rgba(255,255,255,0.12), 0 4px 24px rgba(120,60,220,0.2)',
              color:                '#fff',
              fontWeight:           600,
              fontSize:             '0.93rem',
              cursor:               'pointer',
              letterSpacing:        '0.2px',
              transition:           'all 0.3s ease',
            }}
          >
            Let's Work Together
            <span style={{
              display:'flex', alignItems:'center', justifyContent:'center',
              width:'24px', height:'24px', borderRadius:'50%',
              background:'rgba(255,255,255,0.1)',
              fontSize:'0.85rem',
            }}>→</span>
          </motion.button>
        </div>

        {/* RIGHT — Image + Floating card */}
        <motion.div
          initial={{ opacity:0, x:32 }}
          whileInView={{ opacity:1, x:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.9, delay:0.2, ease }}
          style={{ position:'relative' }}
        >
          {/* Image container */}
          <motion.div
            whileHover={{ scale:1.02 }}
            transition={{ duration:0.5 }}
            style={{
              borderRadius:         '20px',
              overflow:             'hidden',
              border:               '1px solid rgba(255,255,255,0.1)',
              boxShadow:            '0 24px 60px rgba(0,0,0,0.5)',
              background:           '#1a0d2e',
              aspectRatio:          '4/3',
            }}
          >
            {/* Placeholder team image — gradient + overlay */}
            <div style={{
              width:'100%', height:'100%',
              minHeight:'320px',
              background: `
                linear-gradient(135deg, rgba(80,20,160,0.8) 0%, rgba(10,30,80,0.6) 50%, rgba(0,80,60,0.5) 100%),
                url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80') center/cover no-repeat
              `,
              display:        'flex',
              alignItems:     'flex-end',
              justifyContent: 'flex-end',
              padding:        '1.5rem',
            }}>
              {/* Brand watermark inside image */}
              <div style={{
                padding:    '0.6rem 1rem',
                background: 'rgba(5,5,20,0.7)',
                borderRadius:'10px',
                backdropFilter:'blur(10px)',
                border:'1px solid rgba(255,255,255,0.1)',
              }}>
                <p style={{ fontSize:'0.65rem', color:'rgba(255,255,255,0.5)', letterSpacing:'1.5px', textTransform:'uppercase' }}>NOVAA</p>
                <p style={{ fontSize:'0.78rem', color:'rgba(200,150,255,0.9)', fontWeight:600 }}>Building websites<br/>that dominate.</p>
              </div>
            </div>
          </motion.div>

          {/* Floating glass card — "10+ Years" */}
          <motion.div
            initial={{ opacity:0, scale:0.9, y:10 }}
            whileInView={{ opacity:1, scale:1, y:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.7, delay:0.5, ease }}
            style={{
              position:             'absolute',
              top:                  '24px',
              left:                 '-24px',
              padding:              '1.25rem 1.5rem',
              borderRadius:         '16px',
              background:           'rgba(15,10,40,0.75)',
              backdropFilter:       'blur(28px) saturate(160%)',
              WebkitBackdropFilter: 'blur(28px) saturate(160%)',
              border:               '1px solid rgba(255,255,255,0.12)',
              boxShadow:            'inset 0 1px 0 rgba(255,255,255,0.15), 0 16px 48px rgba(0,0,0,0.5)',
              minWidth:             '170px',
            }}
          >
            <p style={{
              fontSize:      '2rem',
              fontWeight:    800,
              color:         '#fff',
              letterSpacing: '-0.03em',
              lineHeight:    1,
              marginBottom:  '0.35rem',
            }}>
              10+
            </p>
            <p style={{
              fontSize:   '0.8rem',
              color:      'rgba(255,255,255,0.45)',
              lineHeight: 1.4,
            }}>
              Years of Experience
            </p>
            {/* Bottom colored line */}
            <div style={{
              marginTop:    '0.75rem',
              height:       '2px',
              borderRadius: '2px',
              background:   'linear-gradient(90deg, #7c3aed, #06b6d4)',
              width:        '60%',
            }} />
          </motion.div>
        </motion.div>
      </div>

      {/* ══════════════════
          STATS BAR
      ══════════════════ */}
      <motion.div
        initial={{ opacity:0, y:20 }}
        whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }}
        transition={{ duration:0.7, delay:0.2, ease }}
        style={{
          display:              'flex',
          alignItems:           'center',
          justifyContent:       'space-around',
          padding:              '1.5rem 2.5rem',
          borderRadius:         '20px',
          background:           'rgba(10,10,30,0.55)',
          backdropFilter:       'blur(28px) saturate(150%)',
          WebkitBackdropFilter: 'blur(28px) saturate(150%)',
          border:               '1px solid rgba(255,255,255,0.08)',
          boxShadow:            'inset 0 1px 0 rgba(255,255,255,0.07), 0 8px 40px rgba(0,0,0,0.4)',
          flexWrap:             'wrap',
          gap:                  '1.5rem',
          marginBottom:         '5rem',
        }}
      >
        {STATS.map((s, i) => (
          <div
            key={s.l}
            style={{
              display:    'flex',
              alignItems: 'center',
              gap:        '14px',
              flex:       '1 1 140px',
            }}
          >
            <div style={{
              width:'46px', height:'46px',
              borderRadius:'12px',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'1.2rem', flexShrink:0,
              background: i === 0 ? 'rgba(120,60,220,0.3)'
                        : i === 1 ? 'rgba(180,140,20,0.3)'
                        : i === 2 ? 'rgba(0,160,130,0.3)'
                        :           'rgba(80,60,180,0.3)',
              border: i === 0 ? '1px solid rgba(150,80,255,0.3)'
                    : i === 1 ? '1px solid rgba(220,180,30,0.3)'
                    : i === 2 ? '1px solid rgba(0,200,160,0.3)'
                    :           '1px solid rgba(120,100,220,0.3)',
              boxShadow: i === 0 ? '0 0 16px rgba(120,60,220,0.25)'
                       : i === 1 ? '0 0 16px rgba(200,160,20,0.25)'
                       : i === 2 ? '0 0 16px rgba(0,200,160,0.25)'
                       :           '0 0 16px rgba(100,80,200,0.25)',
            }}>
              {s.icon}
            </div>
            <div>
              <p style={{
                fontSize:'1.6rem', fontWeight:700,
                color:'#fff', lineHeight:1.1,
                letterSpacing:'-0.02em',
              }}>{s.n}</p>
              <p style={{
                fontSize:'0.76rem',
                color:'rgba(255,255,255,0.38)',
                marginTop:'2px',
              }}>{s.l}</p>
            </div>
            {i < STATS.length-1 && (
              <div style={{
                width:'1px', height:'40px',
                background:'rgba(255,255,255,0.07)',
                marginLeft:'auto', flexShrink:0,
              }} />
            )}
          </div>
        ))}
      </motion.div>

      {/* ══════════════════
          WHO WE ARE
      ══════════════════ */}
      <motion.div
        initial={{ opacity:0, y:24 }}
        whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }}
        transition={{ duration:0.7, ease }}
        style={{ textAlign:'center', marginBottom:'3rem' }}
      >
        <p style={{
          fontSize:'0.72rem', fontWeight:600,
          letterSpacing:'3px', textTransform:'uppercase',
          color:'rgba(99,102,241,0.9)',
          marginBottom:'1rem',
        }}>
          WHO WE ARE
        </p>
        <h2 style={{
          fontSize:      'clamp(1.8rem, 4vw, 3rem)',
          fontWeight:    800,
          letterSpacing: '-0.03em',
          lineHeight:    1.15,
          marginBottom:  '1rem',
        }}>
          <span style={{ color:'#fff' }}>Driven by </span>
          <span style={{
            background:           'linear-gradient(135deg,#c084fc,#a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor:  'transparent',
          }}>Creativity. </span>
          <span style={{ color:'#fff' }}>Focused on </span>
          <span style={{
            background:           'linear-gradient(135deg,#06b6d4,#00c9a7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor:  'transparent',
          }}>Impact.</span>
        </h2>
        <p style={{
          fontSize:'0.98rem',
          color:'rgba(255,255,255,0.42)',
          maxWidth:'500px', margin:'0 auto',
          lineHeight:1.78,
        }}>
          We combine creativity, strategy, and technology to build digital experiences that help brands grow and stand out.
        </p>
      </motion.div>

      {/* ══════════════════
          FEATURE CARDS
      ══════════════════ */}
      <div style={{
        display:             'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap:                 '1rem',
      }}>
        {FEATURES.map((f, i) => (
          <FeatureCard key={f.title} {...f} delay={i * 0.08} />
        ))}
      </div>

    </section>
  )
}