import { useEffect, useRef } from 'react'

/* ── Sparkline mini SVG ── */
function Sparkline({ color = '#22c55e', up = true }) {
  const pts = up
    ? '0,20 15,18 30,15 45,10 60,8 75,5 90,3'
    : '0,5  15,8  30,12 45,9  60,6 75,4 90,2'
  return (
    <svg width="90" height="24" viewBox="0 0 90 24" fill="none">
      <polyline points={pts} stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ── Organic Traffic Line Chart ── */
function LineChart() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = canvas.width
    const H = canvas.height

    // Data points
    const data = [8000, 12000, 9000, 15000, 18000, 14000, 22000, 19000, 25000, 21000, 28000, 24000, 30000]
    const labels = ['May 1','','May 8','','May 15','','May 22','','May 29','','','','']
    const yLabels = ['30K','20K','10K','0']

    const padL = 44, padR = 12, padT = 12, padB = 36
    const chartW = W - padL - padR
    const chartH = H - padT - padB
    const maxVal = 30000
    const minVal = 0

    ctx.clearRect(0, 0, W, H)

    // Y grid lines
    ctx.strokeStyle = 'rgba(255,255,255,0.06)'
    ctx.lineWidth = 1
    for (let i = 0; i <= 3; i++) {
      const y = padT + (chartH / 3) * i
      ctx.beginPath()
      ctx.moveTo(padL, y)
      ctx.lineTo(W - padR, y)
      ctx.stroke()
    }

    // Y labels
    ctx.fillStyle = 'rgba(255,255,255,0.28)'
    ctx.font = '9px Inter, sans-serif'
    ctx.textAlign = 'right'
    yLabels.forEach((l, i) => {
      const y = padT + (chartH / 3) * i + 3
      ctx.fillText(l, padL - 6, y)
    })

    // X labels
    ctx.textAlign = 'center'
    const xStep = chartW / (data.length - 1)
    labels.forEach((l, i) => {
      if (!l) return
      const x = padL + xStep * i
      ctx.fillText(l, x, H - 6)
    })

    // Points
    const pts = data.map((v, i) => ({
      x: padL + xStep * i,
      y: padT + chartH - ((v - minVal) / (maxVal - minVal)) * chartH,
    }))

    // Gradient fill
    const grad = ctx.createLinearGradient(0, padT, 0, padT + chartH)
    grad.addColorStop(0, 'rgba(139,92,246,0.35)')
    grad.addColorStop(0.5, 'rgba(59,130,246,0.15)')
    grad.addColorStop(1, 'rgba(6,182,212,0.01)')
    ctx.beginPath()
    ctx.moveTo(pts[0].x, pts[0].y)
    for (let i = 1; i < pts.length; i++) {
      const cpx = (pts[i-1].x + pts[i].x) / 2
      ctx.bezierCurveTo(cpx, pts[i-1].y, cpx, pts[i].y, pts[i].x, pts[i].y)
    }
    ctx.lineTo(pts[pts.length-1].x, padT + chartH)
    ctx.lineTo(pts[0].x, padT + chartH)
    ctx.closePath()
    ctx.fillStyle = grad
    ctx.fill()

    // Line stroke — purple to cyan gradient
    const lineGrad = ctx.createLinearGradient(padL, 0, W - padR, 0)
    lineGrad.addColorStop(0, '#8b5cf6')
    lineGrad.addColorStop(0.5, '#3b82f6')
    lineGrad.addColorStop(1, '#06b6d4')
    ctx.beginPath()
    ctx.moveTo(pts[0].x, pts[0].y)
    for (let i = 1; i < pts.length; i++) {
      const cpx = (pts[i-1].x + pts[i].x) / 2
      ctx.bezierCurveTo(cpx, pts[i-1].y, cpx, pts[i].y, pts[i].x, pts[i].y)
    }
    ctx.strokeStyle = lineGrad
    ctx.lineWidth = 2.5
    ctx.lineJoin = 'round'
    ctx.stroke()

    // Glow dot at end
    const last = pts[pts.length-1]
    const glowGrad = ctx.createRadialGradient(last.x, last.y, 0, last.x, last.y, 8)
    glowGrad.addColorStop(0, 'rgba(6,182,212,0.8)')
    glowGrad.addColorStop(1, 'rgba(6,182,212,0)')
    ctx.beginPath()
    ctx.arc(last.x, last.y, 8, 0, Math.PI * 2)
    ctx.fillStyle = glowGrad
    ctx.fill()
    ctx.beginPath()
    ctx.arc(last.x, last.y, 3, 0, Math.PI * 2)
    ctx.fillStyle = '#06b6d4'
    ctx.fill()

  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={420} height={140}
      style={{ width:'100%', height:'auto', display:'block' }}
    />
  )
}

/* ── Donut / Pie chart ── */
function DonutChart() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = canvas.width, H = canvas.height
    const cx = W / 2, cy = H / 2, r = 52, ir = 36

    ctx.clearRect(0, 0, W, H)

    const slices = [
      { pct: 0.62, color: '#f59e0b' },
      { pct: 0.18, color: '#6366f1' },
      { pct: 0.12, color: '#06b6d4' },
      { pct: 0.08, color: '#a855f7' },
    ]

    let start = -Math.PI / 2
    slices.forEach(s => {
      const end = start + s.pct * 2 * Math.PI
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.arc(cx, cy, r, start, end)
      ctx.closePath()
      ctx.fillStyle = s.color
      ctx.fill()
      start = end
    })

    // Inner hole
    ctx.beginPath()
    ctx.arc(cx, cy, ir, 0, Math.PI * 2)
    ctx.fillStyle = '#0f1628'
    ctx.fill()

    // Center text
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 13px Inter, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('24.8K', cx, cy - 2)
    ctx.fillStyle = 'rgba(255,255,255,0.4)'
    ctx.font = '8px Inter, sans-serif'
    ctx.fillText('Total', cx, cy + 10)

  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={120} height={120}
      style={{ width:'120px', height:'120px', display:'block' }}
    />
  )
}

/* ══════════════════════════════
   MAIN DASHBOARD COMPONENT
══════════════════════════════ */
export default function SEODashboard() {
  const METRICS = [
    { label:'TOTAL VISITORS',    value:'24.8K', pct:'+28.6%', color:'#22c55e' },
    { label:'ORGANIC TRAFFIC',   value:'18.6K', pct:'+35.4%', color:'#22c55e' },
    { label:'KEYWORD RANKINGS',  value:'342',   pct:'+42.7%', color:'#22c55e' },
    { label:'BACKLINKS',         value:'1.2K',  pct:'+31.8%', color:'#22c55e' },
  ]

  const SOURCES = [
    { color:'#f59e0b', label:'Organic Search', pct:'62%' },
    { color:'#6366f1', label:'Direct',          pct:'18%' },
    { color:'#06b6d4', label:'Social Media',    pct:'12%' },
    { color:'#a855f7', label:'Referral',        pct:'8%'  },
  ]

  return (
    <div style={{
      borderRadius:         '16px',
      overflow:             'hidden',
      background:           'rgba(8,10,30,0.92)',
      backdropFilter:       'blur(28px) saturate(150%)',
      WebkitBackdropFilter: 'blur(28px) saturate(150%)',
      border:               '1px solid rgba(255,255,255,0.1)',
      boxShadow:            'inset 0 1px 0 rgba(255,255,255,0.08), 0 24px 60px rgba(0,0,0,0.6)',
      padding:              '1.25rem',
      fontFamily:           'Inter, sans-serif',
    }}>

      {/* ── Header ── */}
      <div style={{
        display:'flex', alignItems:'center',
        justifyContent:'space-between', marginBottom:'1rem',
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
          <span style={{
            width:'8px', height:'8px', borderRadius:'50%',
            background:'#22c55e', boxShadow:'0 0 8px #22c55e',
            display:'inline-block',
          }} />
          <span style={{ fontSize:'0.82rem', fontWeight:600, color:'rgba(255,255,255,0.85)' }}>
            SEO Overview
          </span>
        </div>
        <div style={{
          display:'flex', alignItems:'center', gap:'5px',
          padding:'4px 10px', borderRadius:'6px',
          background:'rgba(255,255,255,0.05)',
          border:'1px solid rgba(255,255,255,0.09)',
          fontSize:'0.68rem', color:'rgba(255,255,255,0.45)',
        }}>
          May 1 – March 31, 2024 ▾q
        </div>
      </div>

      {/* ── Metric Cards ── */}
      <div style={{
        display:'grid', gridTemplateColumns:'repeat(4,1fr)',
        gap:'8px', marginBottom:'1rem',
      }}>
        {METRICS.map(m => (
          <div key={m.label} style={{
            padding:'10px',
            borderRadius:'10px',
            background:'rgba(255,255,255,0.04)',
            border:'1px solid rgba(255,255,255,0.07)',
            boxShadow:'inset 0 1px 0 rgba(255,255,255,0.06)',
          }}>
            <p style={{ fontSize:'0.62rem', color:'rgba(255,255,255,0.38)', marginBottom:'4px' }}>
              {m.label}
            </p>
            <p style={{ fontSize:'1.05rem', fontWeight:700, color:'#fff', lineHeight:1, marginBottom:'2px' }}>
              {m.value}
            </p>
            <p style={{ fontSize:'0.6rem', color:m.color, fontWeight:600 }}>
              ↑ {m.pct}
            </p>
          </div>
        ))}
      </div>

      {/* ── Charts Row ── */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr auto', gap:'12px', alignItems:'start' }}>

        {/* Line chart */}
        <div style={{
          padding:'10px',
          borderRadius:'10px',
          background:'rgba(255,255,255,0.025)',
          border:'1px solid rgba(255,255,255,0.06)',
        }}>
          <p style={{ fontSize:'0.65rem', color:'rgba(255,255,255,0.45)', marginBottom:'8px', fontWeight:500 }}>
            Organic Traffic Growth
          </p>
          <LineChart />
        </div>

        {/* Traffic sources */}
        <div style={{
          padding:'10px',
          borderRadius:'10px',
          background:'rgba(255,255,255,0.025)',
          border:'1px solid rgba(255,255,255,0.06)',
          minWidth:'180px',
        }}>
          <p style={{ fontSize:'0.65rem', color:'rgba(255,255,255,0.45)', marginBottom:'8px', fontWeight:500 }}>
            Traffic Sources
          </p>
          <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
            <DonutChart />
            <div style={{ display:'flex', flexDirection:'column', gap:'5px' }}>
              {SOURCES.map(s => (
                <div key={s.label} style={{ display:'flex', alignItems:'center', gap:'5px' }}>
                  <div style={{
                    width:'6px', height:'6px', borderRadius:'50%',
                    background:s.color, flexShrink:0,
                    boxShadow:`0 0 6px ${s.color}`,
                  }} />
                  <span style={{ fontSize:'0.6rem', color:'rgba(255,255,255,0.5)', flex:1, whiteSpace:'nowrap' }}>
                    {s.label}
                  </span>
                  <span style={{ fontSize:'0.6rem', color:'rgba(255,255,255,0.7)', fontWeight:600 }}>
                    {s.pct}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}