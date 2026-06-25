const LINES = [
  { n:1,  tokens:[{ t:"keyword",v:"import " },{ t:"normal",v:"React " },{ t:"keyword",v:"from " },{ t:"string",v:"'react'" }]},
  { n:2,  tokens:[{ t:"keyword",v:"import " },{ t:"punctuation",v:"{ " },{ t:"class",v:"BrowserRouter " },{ t:"keyword",v:"as " },{ t:"class",v:"Router" },{ t:"punctuation",v:", " },{ t:"class",v:"Routes" },{ t:"punctuation",v:", " },{ t:"class",v:"Route" },{ t:"punctuation",v:" } " },{ t:"keyword",v:"from " },{ t:"string",v:"'react-router-dom'" }]},
  { n:3,  tokens:[]},
  { n:4,  tokens:[{ t:"keyword",v:"import " },{ t:"class",v:"Home " },{ t:"keyword",v:"from " },{ t:"string",v:"'../pages/Home'" }]},
  { n:5,  tokens:[{ t:"keyword",v:"import " },{ t:"class",v:"About " },{ t:"keyword",v:"from " },{ t:"string",v:"'../pages/About'" }]},
  { n:6,  tokens:[{ t:"keyword",v:"import " },{ t:"class",v:"Services " },{ t:"keyword",v:"from " },{ t:"string",v:"'../pages/Services'" }]},
  { n:7,  tokens:[{ t:"keyword",v:"import " },{ t:"class",v:"Contact " },{ t:"keyword",v:"from " },{ t:"string",v:"'../pages/Contact'" }]},
  { n:8,  tokens:[]},
  { n:9,  tokens:[{ t:"keyword",v:"function " },{ t:"fn",v:"App" },{ t:"punctuation",v:"() {" }]},
  { n:10, tokens:[{ t:"keyword",v:"  return " },{ t:"punctuation",v:"(" }]},
  { n:11, tokens:[{ t:"tag",v:"    <Router>" }]},
  { n:12, tokens:[{ t:"tag",v:"      <Routes>" }]},
  { n:13, tokens:[{ t:"tag",v:"        <Route " },{ t:"attr",v:"path" },{ t:"punctuation",v:"=" },{ t:"string",v:'"/home"' },{ t:"attr",v:" element" },{ t:"punctuation",v:"=" },{ t:"punctuation",v:"{" },{ t:"tag",v:"<Home />" },{ t:"punctuation",v:"}" },{ t:"tag",v:" />" }]},
  { n:14, tokens:[{ t:"tag",v:"        <Route " },{ t:"attr",v:"path" },{ t:"punctuation",v:"=" },{ t:"string",v:'"/about"' },{ t:"attr",v:" element" },{ t:"punctuation",v:"=" },{ t:"punctuation",v:"{" },{ t:"tag",v:"<About />" },{ t:"punctuation",v:"}" },{ t:"tag",v:" />" }]},
  { n:15, tokens:[{ t:"tag",v:"        <Route " },{ t:"attr",v:"path" },{ t:"punctuation",v:"=" },{ t:"string",v:'"/services"' },{ t:"attr",v:" element" },{ t:"punctuation",v:"=" },{ t:"punctuation",v:"{" },{ t:"tag",v:"<Services />" },{ t:"punctuation",v:"}" },{ t:"tag",v:" />" }]},
  { n:16, tokens:[{ t:"tag",v:"        <Route " },{ t:"attr",v:"path" },{ t:"punctuation",v:"=" },{ t:"string",v:'"/contact"' },{ t:"attr",v:" element" },{ t:"punctuation",v:"=" },{ t:"punctuation",v:"{" },{ t:"tag",v:"<Contact />" },{ t:"punctuation",v:"}" },{ t:"tag",v:" />" }]},
  { n:17, tokens:[{ t:"tag",v:"      </Routes>" }]},
  { n:18, tokens:[{ t:"tag",v:"    </Router>" }]},
  { n:19, tokens:[{ t:"punctuation",v:"  )" }]},
  { n:20, tokens:[{ t:"punctuation",v:"}" }]},
  { n:21, tokens:[]},
  { n:22, tokens:[{ t:"keyword",v:"export " },{ t:"keyword",v:"default " },{ t:"class",v:"App" }]},
]

const COLOR = {
  keyword:     '#c084fc',
  string:      '#86efac',
  class:       '#67e8f9',
  fn:          '#fde68a',
  tag:         '#93c5fd',
  attr:        '#c084fc',
  punctuation: '#e2e8f0',
  normal:      '#e2e8f0',
}

const FILES = [
  { name:'src',        type:'folder', indent:0 },
  { name:'assets',     type:'folder', indent:1 },
  { name:'components', type:'folder', indent:1 },
  { name:'pages',      type:'folder', indent:1 },
  { name:'Home.jsx',   type:'file',   indent:2, active:false },
  { name:'About.jsx',  type:'file',   indent:2, active:false },
  { name:'Services.jsx',type:'file',  indent:2, active:false },
  { name:'Contact.jsx',type:'file',   indent:2, active:false },
  { name:'App.jsx',    type:'file',   indent:1, active:true  },
  { name:'index.jsx',  type:'file',   indent:1, active:false },
  { name:'styles.css', type:'file',   indent:1, active:false },
]

export default function CodeEditorMockup() {
  return (
    <div style={{
      position:    'relative',
      borderRadius:'16px',
      overflow:    'hidden',
      border:      '1px solid rgba(255,255,255,0.1)',
      boxShadow:   '0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)',
      background:  '#0d1117',
      fontFamily:  '"Fira Code", "Cascadia Code", "JetBrains Mono", monospace',
    }}>

      {/* ── Title bar ── */}
      <div style={{
        padding:        '10px 16px',
        background:     '#161b22',
        borderBottom:   '1px solid rgba(255,255,255,0.08)',
        display:        'flex',
        alignItems:     'center',
        gap:            '8px',
      }}>
        {/* Traffic lights */}
        {['#ff5f57','#febc2e','#28c840'].map((c,i)=>(
          <div key={i} style={{ width:'11px',height:'11px',borderRadius:'50%',background:c,flexShrink:0 }} />
        ))}
        <span style={{
          flex:1, textAlign:'center',
          fontSize:'0.72rem', color:'rgba(255,255,255,0.4)',
          letterSpacing:'0.5px',
        }}>
          App.jsx — NOVAA
        </span>
      </div>

      {/* ── Tab bar ── */}
      <div style={{
        display:'flex',
        background:'#161b22',
        borderBottom:'1px solid rgba(255,255,255,0.07)',
        fontSize:'0.72rem',
      }}>
        {['App.jsx','Services.jsx','Navbar.jsx'].map((tab,i)=>(
          <div key={tab} style={{
            padding:'7px 16px',
            color: i===0 ? '#e2e8f0' : 'rgba(255,255,255,0.3)',
            borderRight:'1px solid rgba(255,255,255,0.06)',
            borderBottom: i===0 ? '1px solid #c084fc' : '1px solid transparent',
            background: i===0 ? '#0d1117' : 'transparent',
            cursor:'pointer', whiteSpace:'nowrap',
            fontSize:'0.7rem',
          }}>
            {tab}
          </div>
        ))}
      </div>

      {/* ── Main editor area ── */}
      <div style={{ display:'flex', height:'260px' }}>

        {/* Code area */}
        <div style={{
          flex:1, overflowY:'auto', overflowX:'hidden',
          padding:'12px 0',
          scrollbarWidth:'none',
        }}>
          {LINES.map(line => (
            <div key={line.n} style={{
              display:         'flex',
              alignItems:      'center',
              minHeight:       '20px',
              padding:         '0',
              background:      line.n===9 ? 'rgba(192,132,252,0.07)' : 'transparent',
              borderLeft:      line.n===9 ? '2px solid rgba(192,132,252,0.6)' : '2px solid transparent',
            }}>
              {/* Line number */}
              <span style={{
                width:       '36px', flexShrink:0,
                textAlign:   'right', paddingRight:'12px',
                fontSize:    '0.65rem',
                color:       line.n===9 ? 'rgba(192,132,252,0.7)' : 'rgba(255,255,255,0.18)',
                userSelect:  'none',
              }}>
                {line.n}
              </span>

              {/* Tokens */}
              <span style={{ fontSize:'0.68rem', lineHeight:'20px', whiteSpace:'pre' }}>
                {line.tokens.map((tok, ti) => (
                  <span key={ti} style={{ color: COLOR[tok.t] || '#e2e8f0' }}>
                    {tok.v}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </div>

        {/* File tree panel */}
        <div style={{
          width:        '155px', flexShrink:0,
          borderLeft:   '1px solid rgba(255,255,255,0.07)',
          background:   '#0d1117',
          padding:      '10px 0',
          overflowY:    'auto',
          scrollbarWidth:'none',
        }}>
          <p style={{
            fontSize:'0.6rem', fontWeight:600,
            letterSpacing:'1.5px', textTransform:'uppercase',
            color:'rgba(255,255,255,0.3)',
            padding:'0 12px 8px',
          }}>
            Explorer
          </p>
          {FILES.map((f, i) => (
            <div key={i} style={{
              display:     'flex',
              alignItems:  'center',
              gap:         '5px',
              padding:     `3px 12px 3px ${12 + f.indent*12}px`,
              fontSize:    '0.65rem',
              color:       f.active
                ? '#c084fc'
                : f.type==='folder'
                ? 'rgba(255,255,255,0.55)'
                : 'rgba(255,255,255,0.38)',
              background:  f.active ? 'rgba(192,132,252,0.1)' : 'transparent',
              borderLeft:  f.active ? '1px solid rgba(192,132,252,0.5)' : '1px solid transparent',
              cursor:      'pointer',
              whiteSpace:  'nowrap',
            }}>
              <span style={{ fontSize:'0.6rem', flexShrink:0 }}>
                {f.type==='folder' ? '📁' : f.name.endsWith('.jsx') ? '⚛' : f.name.endsWith('.css') ? '🎨' : '📄'}
              </span>
              {f.name}
            </div>
          ))}
        </div>
      </div>

      {/* ── Status bar ── */}
      <div style={{
        padding:        '4px 12px',
        background:     '#7c3aed',
        display:        'flex',
        alignItems:     'center',
        gap:            '12px',
        fontSize:       '0.6rem',
        color:          'rgba(255,255,255,0.85)',
      }}>
        <span>⎇ main</span>
        <span>JavaScript JSX</span>
        <span style={{ marginLeft:'auto' }}>Ln 9, Col 1</span>
        <span>UTF-8</span>
      </div>
    </div>
  )
}