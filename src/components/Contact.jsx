import { useState } from 'react'
import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

/* ── Reusable glass input style ── */
const inputStyle = {
  width:                '100%',
  padding:              '12px 16px',
  borderRadius:         '10px',
  background:           'rgba(255,255,255,0.05)',
  backdropFilter:       'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border:               '1px solid rgba(255,255,255,0.1)',
  color:                '#fff',
  fontSize:             '0.875rem',
  outline:              'none',
  transition:           'all 0.25s ease',
  fontFamily:           'Inter, sans-serif',
}

function GlassInput({ placeholder, type = 'text', style = {} }) {
  const [focused, setFocused] = useState(false)
  return (
    <input
      type={type}
      placeholder={placeholder}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputStyle,
        border: focused
          ? '1px solid rgba(120,60,220,0.6)'
          : '1px solid rgba(255,255,255,0.1)',
        boxShadow: focused
          ? '0 0 0 3px rgba(120,60,220,0.15), inset 0 1px 0 rgba(255,255,255,0.08)'
          : 'inset 0 1px 0 rgba(255,255,255,0.06)',
        ...style,
      }}
    />
  )
}

function GlassTextarea({ placeholder }) {
  const [focused, setFocused] = useState(false)
  return (
    <textarea
      placeholder={placeholder}
      rows={5}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputStyle,
        resize:     'vertical',
        minHeight:  '120px',
        border: focused
          ? '1px solid rgba(120,60,220,0.6)'
          : '1px solid rgba(255,255,255,0.1)',
        boxShadow: focused
          ? '0 0 0 3px rgba(120,60,220,0.15), inset 0 1px 0 rgba(255,255,255,0.08)'
          : 'inset 0 1px 0 rgba(255,255,255,0.06)',
      }}
    />
  )
}

/* ── Contact info row ── */
function InfoRow({ icon, label, lines, color }) {
  return (
    <div style={{
      display:       'flex',
      alignItems:    'flex-start',
      gap:           '1rem',
      padding:       '1rem 0',
      borderBottom:  '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{
        width:          '42px', height: '42px',
        borderRadius:   '12px',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        fontSize:       '1.1rem',
        flexShrink:     0,
        background:     color === 'teal'
          ? 'rgba(0,160,130,0.3)'
          : 'rgba(100,40,200,0.3)',
        border:         color === 'teal'
          ? '1px solid rgba(0,200,160,0.3)'
          : '1px solid rgba(140,70,255,0.3)',
        boxShadow:      color === 'teal'
          ? '0 0 14px rgba(0,180,150,0.2)'
          : '0 0 14px rgba(120,60,220,0.2)',
      }}>
        {icon}
      </div>
      <div>
        <p style={{
          fontSize:   '0.82rem',
          fontWeight: 700,
          color:      '#fff',
          marginBottom:'3px',
        }}>{label}</p>
        {lines.map((l, i) => (
          <p key={i} style={{
            fontSize:   '0.8rem',
            color:      'rgba(255,255,255,0.42)',
            lineHeight: 1.6,
          }}>{l}</p>
        ))}
      </div>
    </div>
  )
}

/* ── Bottom info card ── */
function BottomCard({ icon, title, desc, color, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity:0, y:20 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }}
      transition={{ duration:0.6, delay, ease }}
      whileHover={{ y:-3, boxShadow:'inset 0 1px 0 rgba(255,255,255,0.14), 0 16px 40px rgba(0,0,0,0.45)' }}
      style={{
        flex:                 '1 1 280px',
        padding:              '1.5rem',
        borderRadius:         '16px',
        background:           'rgba(15,10,40,0.55)',
        backdropFilter:       'blur(24px) saturate(150%)',
        WebkitBackdropFilter: 'blur(24px) saturate(150%)',
        border:               '1px solid rgba(255,255,255,0.09)',
        boxShadow:            'inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.35)',
        display:              'flex',
        alignItems:           'flex-start',
        gap:                  '1rem',
        transition:           'all 0.3s ease',
      }}
    >
      <div style={{
        width:          '48px', height: '48px',
        borderRadius:   '12px',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        fontSize:       '1.3rem',
        flexShrink:     0,
        background:     color === 'teal'
          ? 'rgba(0,160,130,0.3)'
          : color === 'blue'
          ? 'rgba(20,80,200,0.3)'
          : 'rgba(100,40,200,0.3)',
        border:         color === 'teal'
          ? '1px solid rgba(0,200,160,0.3)'
          : color === 'blue'
          ? '1px solid rgba(40,120,255,0.3)'
          : '1px solid rgba(140,70,255,0.3)',
        boxShadow:      color === 'teal'
          ? '0 0 14px rgba(0,180,150,0.2)'
          : color === 'blue'
          ? '0 0 14px rgba(30,100,220,0.2)'
          : '0 0 14px rgba(120,60,220,0.2)',
      }}>
        {icon}
      </div>
      <div style={{ flex:1 }}>
        <p style={{ fontSize:'0.95rem', fontWeight:700, color:'#fff', marginBottom:'0.3rem' }}>{title}</p>
        <p style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.4)', lineHeight:1.65, marginBottom: children ? '0.75rem' : 0 }}>{desc}</p>
        {children}
      </div>
    </motion.div>
  )
}

export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        minHeight:  '100vh',
        padding:    '120px 1.5rem 80px',
        position:   'relative',
        zIndex:     1,
        maxWidth:   '1220px',
        margin:     '0 auto',
      }}
    >

      {/* ══════════════
          HERO
      ══════════════ */}
      <motion.div
        initial={{ opacity:0, y:20 }}
        whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }}
        transition={{ duration:0.7, ease }}
        style={{ marginBottom:'2.5rem' }}
      >
        {/* Badge */}
        <div style={{
          display:              'inline-flex',
          alignItems:           'center',
          gap:                  '9px',
          padding:              '7px 16px',
          borderRadius:         '50px',
          background:           'rgba(10,10,40,0.65)',
          backdropFilter:       'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border:               '1px solid rgba(255,255,255,0.13)',
          boxShadow:            'inset 0 1px 0 rgba(255,255,255,0.1)',
          marginBottom:         '1.25rem',
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
            Let's Connect
          </span>
        </div>

        <h1 style={{
          fontSize:      'clamp(2.4rem, 5vw, 3.8rem)',
          fontWeight:    800,
          lineHeight:    1.08,
          letterSpacing: '-0.03em',
          marginBottom:  '1rem',
        }}>
          <span style={{
            background:           'linear-gradient(160deg,#fff 0%,rgba(255,255,255,0.85) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor:  'transparent',
            display:              'block',
          }}>
            Let's Build Something
          </span>
          <span style={{
            background:           'linear-gradient(135deg, #c084fc 0%, #06b6d4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor:  'transparent',
            display:              'block',
          }}>
            Amazing Together.
          </span>
        </h1>

        <p style={{
          fontSize:'0.95rem',
          color:'rgba(255,255,255,0.42)',
          lineHeight:1.8, maxWidth:'440px',
        }}>
          Have a project in mind or want to know more about what we do? We'd love to hear from you. Drop us a message and we'll get back to you as soon as possible.
        </p>
      </motion.div>

      {/* ══════════════════════════
          MAIN 2-COLUMN SECTION
      ══════════════════════════ */}
      <div style={{
        display:             'grid',
        gridTemplateColumns: '1fr 1fr',
        gap:                 '1.25rem',
        marginBottom:        '1.25rem',
      }}
        className="contact-main-grid"
      >

        {/* ── LEFT — FORM ── */}
        <motion.div
          initial={{ opacity:0, x:-24 }}
          whileInView={{ opacity:1, x:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.8, ease }}
          style={{
            padding:              '2rem',
            borderRadius:         '20px',
            background:           'rgba(15,10,45,0.6)',
            backdropFilter:       'blur(28px) saturate(160%)',
            WebkitBackdropFilter: 'blur(28px) saturate(160%)',
            border:               '1px solid rgba(255,255,255,0.09)',
            boxShadow:            'inset 0 1px 0 rgba(255,255,255,0.1), 0 12px 48px rgba(0,0,0,0.4)',
            display:              'flex',
            flexDirection:        'column',
            gap:                  '1.5rem',
          }}
        >
          {/* Form header */}
          <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
            <div style={{
              width:'48px', height:'48px', borderRadius:'14px',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'1.3rem',
              background:'rgba(100,40,200,0.35)',
              border:'1px solid rgba(140,70,255,0.35)',
              boxShadow:'0 0 16px rgba(120,60,220,0.25)',
            }}>✉️</div>
            <div>
              <p style={{ fontSize:'1.05rem', fontWeight:700, color:'#fff' }}>Send Us a Message</p>
              <p style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.38)', marginTop:'2px' }}>
                Fill out the form below and we'll get back to you.
              </p>
            </div>
          </div>

          {/* Fields */}
          <div style={{ display:'flex', gap:'0.75rem' }} className="form-row">
            <GlassInput placeholder="Your Name" />
            <GlassInput placeholder="Your Email" type="email" />
          </div>
          <GlassInput placeholder="Subject" />
          <GlassTextarea placeholder="Your Message" />

          {/* Submit */}
          <motion.button
            whileHover={{ scale:1.03, boxShadow:'0 0 32px rgba(120,60,220,0.45)' }}
            whileTap={{ scale:0.97 }}
            style={{
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              gap:            '10px',
              padding:        '13px 28px',
              borderRadius:   '12px',
              background:     'linear-gradient(135deg, #7c3aed, #4f46e5)',
              border:         '1px solid rgba(150,80,255,0.4)',
              boxShadow:      'inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 24px rgba(100,40,200,0.35)',
              color:          '#fff',
              fontWeight:     600,
              fontSize:       '0.93rem',
              cursor:         'pointer',
              width:          'fit-content',
              transition:     'all 0.3s ease',
            }}
          >
            Send Message
            <span style={{
              display:'flex', alignItems:'center', justifyContent:'center',
              width:'24px', height:'24px', borderRadius:'6px',
              background:'rgba(255,255,255,0.15)',
              fontSize:'0.85rem',
            }}>→</span>
          </motion.button>
        </motion.div>

        {/* ── RIGHT — CONTACT INFO ── */}
        <motion.div
          initial={{ opacity:0, x:24 }}
          whileInView={{ opacity:1, x:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.8, delay:0.1, ease }}
          style={{
            padding:              '2rem',
            borderRadius:         '20px',
            background:           'rgba(10,25,40,0.55)',
            backdropFilter:       'blur(28px) saturate(160%)',
            WebkitBackdropFilter: 'blur(28px) saturate(160%)',
            border:               '1px solid rgba(255,255,255,0.09)',
            boxShadow:            'inset 0 1px 0 rgba(255,255,255,0.08), 0 12px 48px rgba(0,0,0,0.4)',
            position:             'relative',
            overflow:             'hidden',
          }}
        >
          {/* World map bg */}
          <div style={{
            position:   'absolute',
            top:        '20%', right:'-5%',
            width:      '65%', height:'55%',
            opacity:    0.12,
            fontSize:   '8rem',
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents:'none',
            overflow:   'hidden',
            color:      '#06b6d4',
            letterSpacing:'-2px',
            wordBreak:  'break-all',
            fontFamily: 'monospace',
            filter:     'blur(0.5px)',
          }}>
            {/* Dot-matrix world map effect */}
            {'· · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · '}
          </div>

          {/* Location pin glow */}
          <div style={{
            position:     'absolute',
            top:          '38%', right:'28%',
            width:        '20px', height:'20px',
            borderRadius: '50%',
            background:   '#c084fc',
            boxShadow:    '0 0 20px rgba(192,132,252,0.8), 0 0 40px rgba(192,132,252,0.4)',
            pointerEvents:'none',
            zIndex:       2,
          }} />

          {/* Info header */}
          <div style={{
            display:'flex', alignItems:'center',
            gap:'1rem', marginBottom:'0.5rem',
            position:'relative', zIndex:3,
          }}>
            <div style={{
              width:'48px', height:'48px', borderRadius:'14px',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'1.3rem',
              background:'rgba(0,140,120,0.3)',
              border:'1px solid rgba(0,200,160,0.3)',
              boxShadow:'0 0 16px rgba(0,180,150,0.2)',
            }}>💬</div>
            <div>
              <p style={{ fontSize:'1.05rem', fontWeight:700, color:'#fff' }}>Get in Touch</p>
              <p style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.38)', marginTop:'2px' }}>
                We're here to help and answer any question you may have.
              </p>
            </div>
          </div>

          {/* Info rows */}
          <div style={{ position:'relative', zIndex:3 }}>
            <InfoRow
              icon="📞" label="Phone" color="teal"
              lines={['+91 7037647377']}
            />
            <InfoRow
              icon="✉️" label="Email" color="purple"
              lines={['novaastudioss01@gmail.com']}
            />
            <InfoRow
              icon="📍" label="Location" color="teal"
              lines={['INDIA, Uttrakhand, Roorkee, Salempur']}
            />
            <InfoRow
              icon="🕐" label="Business Hours" color="purple"
              lines={['Mon - Fri: 9:00 AM - 6:00 PM', 'Saturday - Sunday: Closed']}
            />
          </div>

          {/* Start Your Project CTA card */}
          <motion.div
            whileHover={{ scale:1.02 }}
            style={{
              marginTop:            '1.25rem',
              padding:              '1.25rem',
              borderRadius:         '14px',
              background:           'rgba(80,30,160,0.25)',
              backdropFilter:       'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border:               '1px solid rgba(150,80,255,0.25)',
              boxShadow:            'inset 0 1px 0 rgba(255,255,255,0.1)',
              display:              'flex',
              alignItems:           'center',
              gap:                  '1rem',
              cursor:               'pointer',
              transition:           'all 0.3s ease',
              position:             'relative', zIndex:3,
            }}
          >
            <div style={{
              width:'44px', height:'44px', borderRadius:'12px',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'1.2rem',
              background:'rgba(100,40,200,0.4)',
              border:'1px solid rgba(140,70,255,0.35)',
              flexShrink:0,
            }}>🚀</div>
            <div>
              <p style={{ fontSize:'0.95rem', fontWeight:700, color:'#fff', marginBottom:'3px' }}>Start Your Project</p>
              <p style={{ fontSize:'0.78rem', color:'rgba(255,255,255,0.4)', lineHeight:1.5 }}>
                Ready to bring your ideas to life?<br/>Let's create something extraordinary.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ══════════════════════════
          BOTTOM 3 CARDS
      ══════════════════════════ */}
      <div style={{
        display:  'flex',
        gap:      '1.1rem',
        flexWrap: 'wrap',
      }}>

        {/* Quick Reply */}
        <BottomCard
          icon="⚡" title="Quick Reply" color="purple" delay={0}
          desc="We aim to respond to all inquiries within 24 hours."
        />

        {/* Follow Us */}
        <BottomCard
          icon="👥" title="Follow Us" color="teal" delay={0.1}
          desc="Stay connected and follow our journey for the latest updates."
        >
          <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
            {[
              { icon:'in', label:'LinkedIn' },
              { icon:'𝕏',  label:'Twitter'  },
              { icon:'▣',  label:'Instagram' },
              { icon:'⬡',  label:'Dribbble'  },
            ].map(s => (
              <motion.div
                key={s.label}
                whileHover={{ scale:1.1, background:'rgba(255,255,255,0.15)' }}
                style={{
                  width:'36px', height:'36px',
                  borderRadius:'10px',
                  background:'rgba(255,255,255,0.08)',
                  border:'1px solid rgba(255,255,255,0.12)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:'0.9rem', color:'rgba(255,255,255,0.7)',
                  cursor:'pointer', transition:'all 0.2s ease',
                  fontWeight:700,
                }}
              >
                {s.icon}
              </motion.div>
            ))}
          </div>
        </BottomCard>

        {/* FAQ */}
        <BottomCard
          icon="❓" title="Have a Question?" color="purple" delay={0.2}
          desc="Check out our FAQ or write to us directly anytime."
        >
          <motion.button
            whileHover={{ scale:1.04, boxShadow:'inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 16px rgba(100,40,200,0.3)' }}
            whileTap={{ scale:0.97 }}
            style={{
              padding:        '8px 18px',
              borderRadius:   '8px',
              background:     'rgba(100,40,200,0.3)',
              border:         '1px solid rgba(140,70,255,0.3)',
              color:          '#fff',
              fontWeight:     600,
              fontSize:       '0.82rem',
              cursor:         'pointer',
              transition:     'all 0.25s ease',
              boxShadow:      'inset 0 1px 0 rgba(255,255,255,0.12)',
            }}
          >
            View FAQ
          </motion.button>
        </BottomCard>

      </div>
    </section>
  )
}