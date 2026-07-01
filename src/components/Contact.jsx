import { useState } from 'react'
import { motion }   from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

const WHATSAPP_NUMBER = '919548861483'
const EMAIL_ADDRESS   = 'novaastudioss012@gmail.com'

/* ── Validation ── */
function validate(fields) {
  const errors = {}
  if (!fields.name.trim())    errors.name    = 'Name is required'
  if (!fields.email.trim())   errors.email   = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
                               errors.email   = 'Enter a valid email'
  if (!fields.message.trim()) errors.message = 'Message is required'
  if (!fields.service)        errors.service = 'Please select a service'
  return errors
}

/* ── WhatsApp sender ── */
function sendWhatsApp(fields) {
  const msg = `
-----------------------------------------
🚀 NEW PROJECT ENQUIRY - NOVAA STUDIOS
-----------------------------------------
👤 Name: ${fields.name}
📧 Email: ${fields.email}
📱 Phone: ${fields.phone || 'Not provided'}
🏢 Company: ${fields.company || 'Not provided'}
💼 Service: ${fields.service}
💰 Budget: ${fields.budget || 'Not specified'}
📝 Project Details:
${fields.message}
-----------------------------------------
`.trim()

  const encoded = encodeURIComponent(msg)
  const url     = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`
  window.open(url, '_blank', 'noopener,noreferrer')
}

/* ── Mailto opener ── */
function openEmail() {
  const subject = encodeURIComponent('New Project Inquiry')
  const body    = encodeURIComponent(
`Hello,

I would like to discuss a new project.

Project Details:
- Name: 
- Company: 
- Budget: 
- Timeline: 
- Requirements: 

Looking forward to hearing from you.

Thank you.`)

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL_ADDRESS}&su=${subject}&body=${body}`

  /* Try Gmail first, fallback to mailto */
  try {
    const win = window.open(gmailUrl, '_blank', 'noopener,noreferrer')
    if (!win || win.closed || typeof win.closed === 'undefined') {
      window.location.href = `mailto:${EMAIL_ADDRESS}?subject=${subject}&body=${body}`
    }
  } catch {
    window.location.href = `mailto:${EMAIL_ADDRESS}?subject=${subject}&body=${body}`
  }
}

/* ── Glass Input ── */
function GlassInput({ placeholder, type = 'text', value, onChange, name, error }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ width:'100%' }}>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width:                '100%',
          padding:              '12px 16px',
          borderRadius:         '10px',
          background:           'rgba(255,255,255,0.05)',
          backdropFilter:       'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border:               error
            ? '1px solid rgba(239,68,68,0.6)'
            : focused
            ? '1px solid rgba(120,60,220,0.6)'
            : '1px solid rgba(255,255,255,0.1)',
          color:                '#fff',
          fontSize:             '16px',
          outline:              'none',
          transition:           'all 0.25s ease',
          fontFamily:           'Inter, sans-serif',
          boxShadow:            focused
            ? '0 0 0 3px rgba(120,60,220,0.15), inset 0 1px 0 rgba(255,255,255,0.08)'
            : 'inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      />
      {error && (
        <p style={{
          fontSize:'0.72rem', color:'rgba(239,68,68,0.9)',
          marginTop:'4px', paddingLeft:'4px',
        }}>
          ⚠ {error}
        </p>
      )}
    </div>
  )
}

/* ── Glass Select ── */
function GlassSelect({ value, onChange, name, error }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ width:'100%' }}>
      <select
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width:                '100%',
          padding:              '12px 16px',
          borderRadius:         '10px',
          background:           'rgba(20,15,50,0.8)',
          backdropFilter:       'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border:               error
            ? '1px solid rgba(239,68,68,0.6)'
            : focused
            ? '1px solid rgba(120,60,220,0.6)'
            : '1px solid rgba(255,255,255,0.1)',
          color:                value ? '#fff' : 'rgba(255,255,255,0.28)',
          fontSize:             '16px',
          outline:              'none',
          transition:           'all 0.25s ease',
          fontFamily:           'Inter, sans-serif',
          cursor:               'pointer',
          appearance:           'none',
          WebkitAppearance:     'none',
          boxShadow:            'inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      >
        <option value="" disabled style={{ background:'#0d0a1e', color:'rgba(255,255,255,0.4)' }}>
          Select a Service
        </option>
        {[
          'Web Design',
          'Web Development',
          'Branding & Identity',
          'SEO & Marketing',
          'Full Package (Design + Dev)',
          'Other',
        ].map(s => (
          <option key={s} value={s} style={{ background:'#0d0a1e', color:'#fff' }}>
            {s}
          </option>
        ))}
      </select>
      {error && (
        <p style={{ fontSize:'0.72rem', color:'rgba(239,68,68,0.9)', marginTop:'4px', paddingLeft:'4px' }}>
          ⚠ {error}
        </p>
      )}
    </div>
  )
}

/* ── Glass Budget Select ── */
function BudgetSelect({ value, onChange, name }) {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      style={{
        width:            '100%',
        padding:          '12px 16px',
        borderRadius:     '10px',
        background:       'rgba(20,15,50,0.8)',
        border:           '1px solid rgba(255,255,255,0.1)',
        color:            value ? '#fff' : 'rgba(255,255,255,0.28)',
        fontSize:         '16px',
        outline:          'none',
        fontFamily:       'Inter, sans-serif',
        cursor:           'pointer',
        appearance:       'none',
        WebkitAppearance: 'none',
        boxShadow:        'inset 0 1px 0 rgba(255,255,255,0.06)',
      }}
    >
      <option value="" disabled style={{ background:'#0d0a1e' }}>Budget Range</option>
      {[
        'Under ₹25,000',
        '₹25,000 – ₹50,000',
        '₹50,000 – ₹1,00,000',
        '₹1,00,000 – ₹2,50,000',
        '₹2,50,000+',
        'Let\'s Discuss',
      ].map(b => (
        <option key={b} value={b} style={{ background:'#0d0a1e', color:'#fff' }}>{b}</option>
      ))}
    </select>
  )
}

/* ── Glass Textarea ── */
function GlassTextarea({ placeholder, value, onChange, name, error }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ width:'100%' }}>
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={5}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width:                '100%',
          padding:              '12px 16px',
          borderRadius:         '10px',
          background:           'rgba(255,255,255,0.05)',
          backdropFilter:       'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border:               error
            ? '1px solid rgba(239,68,68,0.6)'
            : focused
            ? '1px solid rgba(120,60,220,0.6)'
            : '1px solid rgba(255,255,255,0.1)',
          color:                '#fff',
          fontSize:             '16px',
          outline:              'none',
          resize:               'vertical',
          minHeight:            '120px',
          transition:           'all 0.25s ease',
          fontFamily:           'Inter, sans-serif',
          boxShadow:            focused
            ? '0 0 0 3px rgba(120,60,220,0.15)'
            : 'inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      />
      {error && (
        <p style={{ fontSize:'0.72rem', color:'rgba(239,68,68,0.9)', marginTop:'4px', paddingLeft:'4px' }}>
          ⚠ {error}
        </p>
      )}
    </div>
  )
}

/* ── Info Row ── */
function InfoRow({ icon, label, lines, color }) {
  return (
    <div style={{
      display:'flex', alignItems:'flex-start', gap:'1rem',
      padding:'1rem 0',
      borderBottom:'1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{
        width:'42px', height:'42px', borderRadius:'12px',
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:'1.1rem', flexShrink:0,
        background:  color==='teal' ? 'rgba(0,160,130,0.3)' : 'rgba(100,40,200,0.3)',
        border:      color==='teal' ? '1px solid rgba(0,200,160,0.3)' : '1px solid rgba(140,70,255,0.3)',
        boxShadow:   color==='teal' ? '0 0 14px rgba(0,180,150,0.2)' : '0 0 14px rgba(120,60,220,0.2)',
      }}>
        {icon}
      </div>
      <div>
        <p style={{ fontSize:'0.82rem', fontWeight:700, color:'#fff', marginBottom:'3px' }}>{label}</p>
        {lines.map((l, i) => (
          <p key={i} style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.42)', lineHeight:1.6 }}>{l}</p>
        ))}
      </div>
    </div>
  )
}

/* ── Bottom Card ── */
function BottomCard({ icon, title, desc, color, children, delay=0 }) {
  return (
    <motion.div
      initial={{ opacity:1, y:20 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }}
      transition={{ duration:0.6, delay, ease }}
      whileHover={{ y:-3 }}
      style={{
        flex:'1 1 280px', padding:'1.5rem', borderRadius:'16px',
        background:'rgba(15,10,40,0.55)',
        backdropFilter:'blur(24px) saturate(150%)',
        WebkitBackdropFilter:'blur(24px) saturate(150%)',
        border:'1px solid rgba(255,255,255,0.09)',
        boxShadow:'inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.35)',
        display:'flex', alignItems:'flex-start', gap:'1rem',
        transition:'all 0.3s ease', position:'relative', overflow:'hidden',
      }}
    >
      <div style={{
        width:'48px', height:'48px', borderRadius:'12px',
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:'1.3rem', flexShrink:0,
        background:  color==='teal'   ? 'rgba(0,160,130,0.3)'
                   : color==='blue'   ? 'rgba(20,80,200,0.3)'
                   :                    'rgba(100,40,200,0.3)',
        border:      color==='teal'   ? '1px solid rgba(0,200,160,0.3)'
                   : color==='blue'   ? '1px solid rgba(40,120,255,0.3)'
                   :                    '1px solid rgba(140,70,255,0.3)',
        boxShadow:   color==='teal'   ? '0 0 14px rgba(0,180,150,0.2)'
                   : color==='blue'   ? '0 0 14px rgba(30,100,220,0.2)'
                   :                    '0 0 14px rgba(120,60,220,0.2)',
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

/* ══════════════════════════════════════
   MAIN CONTACT COMPONENT
══════════════════════════════════════ */
export default function Contact() {

  /* ── Form state ── */
  const [fields, setFields] = useState({
    name:    '',
    email:   '',
    phone:   '',
    company: '',
    service: '',
    budget:  '',
    message: '',
  })
  const [errors,   setErrors]   = useState({})
  const [sending,  setSending]  = useState(false)
  const [sent,     setSent]     = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFields(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  /* ── Submit → WhatsApp ── */
  const handleSubmit = () => {
    const errs = validate(fields)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      /* Scroll to first error */
      const firstErr = document.querySelector('[data-field="name"], [data-field="email"], [data-field="service"]')
      firstErr?.scrollIntoView({ behavior:'smooth', block:'center' })
      return
    }
    setSending(true)
    setTimeout(() => {
      sendWhatsApp(fields)
      setSending(false)
      setSent(true)
      /* Reset after 4s */
      setTimeout(() => {
        setSent(false)
        setFields({ name:'', email:'', phone:'', company:'', service:'', budget:'', message:'' })
      }, 4000)
    }, 600)
  }

  return (
    <section
      id="contact"
      style={{
        minHeight:'100vh', padding:'120px 1.5rem 80px',
        position:'relative', zIndex:1,
        maxWidth:'1220px', margin:'0 auto',
      }}
    >

      {/* ══ HERO ══ */}
      <motion.div
        initial={{ opacity:1, y:20 }}
        whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }}
        transition={{ duration:0.7, ease }}
        style={{ marginBottom:'2.5rem' }}
      >
        {/* Badge */}
        <div style={{
          display:'inline-flex', alignItems:'center', gap:'9px',
          padding:'7px 16px', borderRadius:'50px',
          background:'rgba(10,10,40,0.65)',
          backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
          border:'1px solid rgba(255,255,255,0.13)',
          boxShadow:'inset 0 1px 0 rgba(255,255,255,0.1)',
          marginBottom:'1.25rem',
        }}>
          <span style={{
            width:'7px', height:'7px', borderRadius:'50%',
            background:'#6366f1',
            boxShadow:'0 0 10px #6366f1, 0 0 20px rgba(99,102,241,0.5)',
            flexShrink:0,
          }} />
          <span style={{ fontSize:'0.72rem', fontWeight:600, letterSpacing:'2.5px', textTransform:'uppercase', color:'rgba(255,255,255,0.65)' }}>
            Let's Connect
          </span>
        </div>

        <h1 style={{ fontSize:'clamp(2.4rem,5vw,3.8rem)', fontWeight:800, lineHeight:1.08, letterSpacing:'-0.03em', marginBottom:'1rem' }}>
          <span style={{ background:'linear-gradient(160deg,#fff 0%,rgba(255,255,255,0.85) 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', display:'block' }}>
            Let's Build Something
          </span>
          <span style={{ background:'linear-gradient(135deg,#c084fc 0%,#06b6d4 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', display:'block' }}>
            Amazing Together.
          </span>
        </h1>

        <p style={{ fontSize:'0.95rem', color:'rgba(255,255,255,0.42)', lineHeight:1.8, maxWidth:'440px' }}>
          Have a project in mind? Fill the form and we'll reply on WhatsApp instantly.
        </p>
      </motion.div>

      {/* ══ MAIN 2-COL ══ */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.25rem', marginBottom:'1.25rem' }}
        className="contact-main-grid"
      >

        {/* ── LEFT — FORM ── */}
        <motion.div
          initial={{ opacity:1, x:-24 }}
          whileInView={{ opacity:1, x:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.8, ease }}
          style={{
            padding:'2rem', borderRadius:'20px',
            background:'rgba(15,10,45,0.6)',
            backdropFilter:'blur(28px) saturate(160%)',
            WebkitBackdropFilter:'blur(28px) saturate(160%)',
            border:'1px solid rgba(255,255,255,0.09)',
            boxShadow:'inset 0 1px 0 rgba(255,255,255,0.1), 0 12px 48px rgba(0,0,0,0.4)',
            display:'flex', flexDirection:'column', gap:'1rem',
          }}
        >
          {/* Form header */}
          <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
            <div style={{
              width:'48px', height:'48px', borderRadius:'14px',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'1.3rem',
              background:'rgba(100,40,200,0.35)', border:'1px solid rgba(140,70,255,0.35)',
              boxShadow:'0 0 16px rgba(120,60,220,0.25)',
            }}>✉️</div>
            <div>
              <p style={{ fontSize:'1.05rem', fontWeight:700, color:'#fff' }}>Send Us a Message</p>
              <p style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.38)', marginTop:'2px' }}>
                We'll reply on WhatsApp instantly
              </p>
            </div>
          </div>

          {/* ── Fields ── */}
          <div style={{ display:'flex', gap:'0.75rem' }} className="form-row">
            <GlassInput placeholder="Your Name *"  name="name"  value={fields.name}  onChange={handleChange} error={errors.name} />
            <GlassInput placeholder="Your Email *" name="email" value={fields.email} onChange={handleChange} type="email" error={errors.email} />
          </div>

          <div style={{ display:'flex', gap:'0.75rem' }} className="form-row">
            <GlassInput placeholder="Phone Number" name="phone"   value={fields.phone}   onChange={handleChange} type="tel" />
            <GlassInput placeholder="Company Name" name="company" value={fields.company} onChange={handleChange} />
          </div>

          <div style={{ display:'flex', gap:'0.75rem' }} className="form-row">
            <GlassSelect name="service" value={fields.service} onChange={handleChange} error={errors.service} />
            <BudgetSelect name="budget" value={fields.budget} onChange={handleChange} />
          </div>

          <GlassTextarea
            placeholder="Tell us about your project... *"
            name="message" value={fields.message}
            onChange={handleChange} error={errors.message}
          />

          {/* WhatsApp note */}
          <div style={{
            display:'flex', alignItems:'center', gap:'8px',
            padding:'10px 14px', borderRadius:'10px',
            background:'rgba(37,211,102,0.08)',
            border:'1px solid rgba(37,211,102,0.2)',
          }}>
            <span style={{ fontSize:'1rem' }}>💬</span>
            <p style={{ fontSize:'0.75rem', color:'rgba(37,211,102,0.85)', lineHeight:1.5 }}>
              Clicking "Send Message" will open WhatsApp with your details pre-filled.
            </p>
          </div>

          {/* Submit Button */}
          <motion.button
            onClick={handleSubmit}
            whileHover={!sending && !sent ? { scale:1.03, boxShadow:'0 0 32px rgba(37,211,102,0.35)' } : {}}
            whileTap={!sending && !sent ? { scale:0.97 } : {}}
            disabled={sending || sent}
            style={{
              display:'flex', alignItems:'center', justifyContent:'center', gap:'10px',
              padding:'14px 28px', borderRadius:'12px',
              background: sent
                ? 'linear-gradient(135deg,#22c55e,#16a34a)'
                : sending
                ? 'rgba(100,40,200,0.5)'
                : 'linear-gradient(135deg,#25D366,#128C7E)',
              border:'1px solid rgba(37,211,102,0.4)',
              boxShadow:'inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 24px rgba(37,211,102,0.25)',
              color:'#fff', fontWeight:700, fontSize:'0.95rem',
              cursor: sending || sent ? 'not-allowed' : 'pointer',
              width:'fit-content', transition:'all 0.3s ease',
              minHeight:'44px',
            }}
          >
            {sent ? (
              <>✅ Opening WhatsApp...</>
            ) : sending ? (
              <>
                <motion.span
                  animate={{ rotate:360 }}
                  transition={{ duration:1, repeat:Infinity, ease:'linear' }}
                  style={{ display:'inline-block' }}
                >⟳</motion.span>
                Preparing...
              </>
            ) : (
              <>
                <span style={{ fontSize:'1.1rem' }}>💬</span>
                Send on WhatsApp
                <span style={{
                  display:'flex', alignItems:'center', justifyContent:'center',
                  width:'24px', height:'24px', borderRadius:'6px',
                  background:'rgba(255,255,255,0.15)', fontSize:'0.85rem',
                }}>→</span>
              </>
            )}
          </motion.button>
        </motion.div>

        {/* ── RIGHT — CONTACT INFO ── */}
        <motion.div
          initial={{ opacity:1, x:24 }}
          whileInView={{ opacity:1, x:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.8, delay:0.1, ease }}
          style={{
            padding:'2rem', borderRadius:'20px',
            background:'rgba(10,25,40,0.55)',
            backdropFilter:'blur(28px) saturate(160%)',
            WebkitBackdropFilter:'blur(28px) saturate(160%)',
            border:'1px solid rgba(255,255,255,0.09)',
            boxShadow:'inset 0 1px 0 rgba(255,255,255,0.08), 0 12px 48px rgba(0,0,0,0.4)',
            position:'relative', overflow:'hidden',
          }}
        >
          {/* World map bg dots */}
          <div style={{
            position:'absolute', top:'20%', right:'-5%',
            width:'65%', height:'55%', opacity:0.1,
            fontSize:'8rem', lineHeight:1, userSelect:'none',
            pointerEvents:'none', overflow:'hidden',
            color:'#06b6d4', letterSpacing:'-2px',
            wordBreak:'break-all', fontFamily:'monospace',
          }}>
            {'· '.repeat(200)}
          </div>

          {/* Location pin glow */}
          <div style={{
            position:'absolute', top:'38%', right:'28%',
            width:'20px', height:'20px', borderRadius:'50%',
            background:'#c084fc',
            boxShadow:'0 0 20px rgba(192,132,252,0.8), 0 0 40px rgba(192,132,252,0.4)',
            pointerEvents:'none', zIndex:2,
          }} />

          {/* Info header */}
          <div style={{
            display:'flex', alignItems:'center', gap:'1rem',
            marginBottom:'0.5rem', position:'relative', zIndex:3,
          }}>
            <div style={{
              width:'48px', height:'48px', borderRadius:'14px',
              display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.3rem',
              background:'rgba(0,140,120,0.3)', border:'1px solid rgba(0,200,160,0.3)',
              boxShadow:'0 0 16px rgba(0,180,150,0.2)',
            }}>💬</div>
            <div>
              <p style={{ fontSize:'1.05rem', fontWeight:700, color:'#fff' }}>Get in Touch</p>
              <p style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.38)', marginTop:'2px' }}>
                We're here to help with your project.
              </p>
            </div>
          </div>

          {/* Info rows */}
          <div style={{ position:'relative', zIndex:3 }}>
            <InfoRow icon="📱" label="WhatsApp" color="teal"
              lines={['+91 9548861483', 'Tap to chat instantly']} />
            <InfoRow icon="✉️" label="Email" color="purple"
              lines={['novaastudioss01@gmail.com']} />
            <InfoRow icon="📍" label="Location" color="teal"
              lines={['India', 'Available Worldwide']} />
            <InfoRow icon="🕐" label="Business Hours" color="purple"
              lines={['Mon - Sat: 9:00 AM - 7:00 PM', 'Sunday: By Appointment']} />
          </div>

          {/* ── Start Your Project — mailto ── */}
          <motion.div
            whileHover={{ scale:1.02 }}
            onClick={openEmail}
            style={{
              marginTop:'1.25rem', padding:'1.25rem', borderRadius:'14px',
              background:'rgba(80,30,160,0.25)',
              backdropFilter:'blur(16px)', WebkitBackdropFilter:'blur(16px)',
              border:'1px solid rgba(150,80,255,0.25)',
              boxShadow:'inset 0 1px 0 rgba(255,255,255,0.1)',
              display:'flex', alignItems:'center', gap:'1rem',
              cursor:'pointer', transition:'all 0.3s ease', position:'relative', zIndex:3,
            }}
          >
            <div style={{
              width:'44px', height:'44px', borderRadius:'12px', flexShrink:0,
              display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem',
              background:'rgba(100,40,200,0.4)', border:'1px solid rgba(140,70,255,0.35)',
            }}>🚀</div>
            <div>
              <p style={{ fontSize:'0.95rem', fontWeight:700, color:'#fff', marginBottom:'3px' }}>
                Start Your Project
              </p>
              <p style={{ fontSize:'0.78rem', color:'rgba(255,255,255,0.4)', lineHeight:1.5 }}>
                Click to email us directly — opens your mail app.
              </p>
            </div>
            <span style={{
              marginLeft:'auto', fontSize:'1rem',
              color:'rgba(255,255,255,0.3)', flexShrink:0,
            }}>↗</span>
          </motion.div>
        </motion.div>
      </div>

      {/* ══ BOTTOM 3 CARDS ══ */}
      <div style={{ display:'flex', gap:'1.1rem', flexWrap:'wrap' }}>

        {/* Quick Reply */}
        <BottomCard icon="⚡" title="Quick Reply" color="purple" delay={0}
          desc="We respond to all WhatsApp messages within 2 hours." />

        {/* Follow Us */}
        <BottomCard icon="👥" title="Follow Us" color="teal" delay={0.1}
          desc="Stay connected for the latest updates and work.">
          <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
            {[
              { icon:'in', label:'LinkedIn',  url:'https://linkedin.com' },
              { icon:'𝕏',  label:'Twitter',   url:'https://twitter.com'  },
              { icon:'▣',  label:'Instagram', url:'https://instagram.com'},
              { icon:'⬡',  label:'Dribbble',  url:'https://dribbble.com' },
            ].map(s => (
              <motion.a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale:1.1, background:'rgba(255,255,255,0.15)' }}
                style={{
                  width:'36px', height:'36px', borderRadius:'10px',
                  background:'rgba(255,255,255,0.08)',
                  border:'1px solid rgba(255,255,255,0.12)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:'0.9rem', color:'rgba(255,255,255,0.7)',
                  cursor:'pointer', transition:'all 0.2s ease',
                  fontWeight:700, textDecoration:'none',
                }}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </BottomCard>

        {/* FAQ */}
        <BottomCard icon="❓" title="Have a Question?" color="purple" delay={0.2}
          desc="Chat with us on WhatsApp for instant answers.">
          <motion.button
            onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi NOVAA Studios! I have a question about your services.')}`, '_blank', 'noopener,noreferrer')}
            whileHover={{ scale:1.04 }}
            whileTap={{ scale:0.97 }}
            style={{
              padding:'8px 18px', borderRadius:'8px',
              background:'rgba(37,211,102,0.2)',
              border:'1px solid rgba(37,211,102,0.3)',
              color:'rgba(37,211,102,0.9)', fontWeight:600,
              fontSize:'0.82rem', cursor:'pointer',
              transition:'all 0.25s ease',
              boxShadow:'inset 0 1px 0 rgba(255,255,255,0.1)',
              minHeight:'44px',
            }}
          >
            💬 Chat on WhatsApp
          </motion.button>
        </BottomCard>

      </div>
    </section>
  )
}