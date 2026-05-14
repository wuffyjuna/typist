/* global React */
/* JUNATHETYPE — One-page site, Soft Geometric direction (Variant B)
   Sections are exported on window. */

const SERIF   = "'Anuphan', sans-serif";
const SANS    = "'Anuphan', sans-serif";
const MONO    = "'JetBrains Mono', ui-monospace, monospace";
const PLAYPEN = "'Anuphan', sans-serif";
const HEAD    = "'Anuphan', sans-serif";   // heading — ใช้ fontWeight: 700

const BB = {
  cream:    "#1c1c1c",   // card background
  cream2:   "#0d0d0d",   // page background
  paper:    "#141414",   // section background
  ink:      "#ffffff",   // text หลัก
  ink2:     "#706c68",   // text รอง (เข้มขึ้น = สะอาดขึ้น)
  mute:     "#484440",   // text มืด
  line:     "#242424",   // border
  lav:      "#a78bfa",   // accent หลัก — soft purple
  pink:     "#f472b6",   // accent รอง — sparingly
  mint:     "#a78bfa",   // unified → lav
  blue:     "#a78bfa",   // unified → lav
  blueSoft: "#1a1630",   // dark lav bg
};

/* ─── Notion Config ─── */
const NOTION_CONFIG = {
  enabled:    true,
  proxy:      "/api/notion",
  startProp:  "วันที่เริ่ม",    // Date column (start)
  endProp:    "วันที่สิ้นสุด",  // Date column (end)
  statusProp: "สถานะ",          // Select: "เปิดรับ" | "จองแล้ว" | "กำลังทำ" | "เสร็จแล้ว"
};

/* Local date string helper — ป้องกัน timezone shift */
function localDateStr(d) {
  return d.getFullYear() + '-' +
    String(d.getMonth() + 1).padStart(2, '0') + '-' +
    String(d.getDate()).padStart(2, '0');
}

/* ─────────────────────────── Decorative atoms ─────────────────────────── */

/* 4-pointed sparkle star — ของตกแต่งหลัก */
function Sparkle({ size = 20, color = "currentColor", style: sx = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill={color}
         style={{ display: 'block', flexShrink: 0, ...sx }}>
      <path d="M10 0 L11.96 8.04 L20 10 L11.96 11.96 L10 20 L8.04 11.96 L0 10 L8.04 8.04 Z" />
    </svg>
  );
}

/* Rotating circular badge */
function RotatingBadge({ text = "JUNATHETYPE · TYPESET · PRESS · EBOOK ·", size = 100, color = BB.lav }) {
  const cx = size / 2, cy = size / 2, r = size * 0.38;
  return (
    <div style={{ width: size, height: size, animation: 'rotateBadge 20s linear infinite' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <path id="badgeCircle"
            d={`M ${cx},${cy} m -${r},0 a ${r},${r} 0 1,1 ${r*2},0 a ${r},${r} 0 1,1 -${r*2},0`} />
        </defs>
        <text fontSize="8" fill={color} fontFamily="'JetBrains Mono', monospace" letterSpacing="2.8">
          <textPath href="#badgeCircle" startOffset="0%">{text}</textPath>
        </text>
        <line x1={cx} y1={cy - 9} x2={cx} y2={cy + 9} stroke={color} strokeWidth="1.2" opacity="0.85" />
        <line x1={cx - 9} y1={cy} x2={cx + 9} y2={cy} stroke={color} strokeWidth="1.2" opacity="0.85" />
      </svg>
    </div>
  );
}

/* Demo data เมื่อยังไม่เชื่อม Notion */
function _getDemoCalData() {
  const today = new Date();
  const map = {};
  function setRange(offsetStart, offsetEnd, status) {
    for (let d = offsetStart; d <= offsetEnd; d++) {
      const dt = new Date(today.getFullYear(), today.getMonth(), today.getDate() + d);
      map[localDateStr(dt)] = status;
    }
  }
  setRange(-6, 6,   'inprogress');
  setRange(7,  20,  'booked');
  setRange(28, 41,  'open');
  setRange(49, 75,  'open');
  return map;
}

/* ─────────────────────────── BOOKING CALENDAR ─────────────────────────── */

function BookingCalendar() {
  const MONTHS_TH = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน',
                     'กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];
  const DAYS_TH   = ['อา','จ','อ','พ','พฤ','ศ','ส'];
  const STATUS_SX = {
    open:       { bg: '#162b1e', border: '#2a5c3e', dot: '#4ade80', label: 'เปิดรับ · คลิกเพื่อจอง' },
    booked:     { bg: '#221e18', border: '#3d3428', dot: null,      label: 'จองแล้ว' },
    inprogress: { bg: '#162233', border: '#2a4060', dot: null,      label: 'กำลังทำ' },
  };

  const today    = new Date();
  const todayStr = localDateStr(today);

  const [tab,     setTab]     = React.useState(0);   // 0 | 1 | 2
  const [calData, setCalData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const isDemo = !NOTION_CONFIG.enabled;

  React.useEffect(function() {
    if (isDemo) { setCalData(_getDemoCalData()); return; }
    setLoading(true);
    const startDate = localDateStr(new Date(today.getFullYear(), today.getMonth(), 1));
    fetch(NOTION_CONFIG.proxy, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filter: { property: NOTION_CONFIG.startProp, date: { on_or_after: startDate } },
      }),
    })
    .then(function(r) { return r.json(); })
    .then(function(data) {
      const map = {};
      (data.results || []).forEach(function(page) {
        const startP = page.properties[NOTION_CONFIG.startProp];
        const endP   = page.properties[NOTION_CONFIG.endProp];
        const sp     = page.properties[NOTION_CONFIG.statusProp];
        const raw    = sp && sp.select && sp.select.name;

        let status = 'booked';
        if (raw === 'เปิดรับ')   status = 'open';
        else if (raw === 'กำลังทำ') status = 'inprogress';
        else if (raw === 'เสร็จแล้ว') return; // ข้ามงานที่เสร็จแล้ว

        const startStr = startP && startP.date && startP.date.start;
        const endStr   = endP   && endP.date   && endP.date.start;
        if (!startStr && !endStr) return;

        const start = new Date((startStr || endStr) + 'T12:00:00');
        const end   = new Date((endStr   || startStr) + 'T12:00:00');
        for (var d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
          map[localDateStr(d)] = status;
        }
      });
      setCalData(map);
    })
    .catch(function() { setCalData(_getDemoCalData()); })
    .finally(function() { setLoading(false); });
  }, []);

  /* Compute month to display */
  const viewDate  = new Date(today.getFullYear(), today.getMonth() + tab, 1);
  const viewYear  = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();
  const firstDay  = viewDate.getDay();                                       // 0=Sun
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  function getStatus(day) {
    const dt  = new Date(viewYear, viewMonth, day);
    const key = localDateStr(dt);
    if (dt < new Date(today.getFullYear(), today.getMonth(), today.getDate())) return 'past';
    return (calData || {})[key] || null;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Calendar card */}
      <div style={{ background: '#1c1c1c', borderRadius: 24, padding: 28,
                    boxShadow: '0 6px 30px -14px rgba(60,40,40,0.14)' }}>

        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <h3 style={{ fontFamily: HEAD,
                       fontSize: 20, fontWeight: 600, color: BB.ink, margin: 0 }}>
            ปฏิทินจองคิว
          </h3>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7,
                         fontFamily: MONO, fontSize: 10.5, color: loading ? BB.mute : '#3f8a5d',
                         letterSpacing: '0.16em', textTransform: 'uppercase' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%',
                           background: loading ? BB.mute : '#3f8a5d',
                           animation: loading ? 'none' : 'pulse 2s infinite' }} />
            {loading ? 'Loading…' : isDemo ? 'Demo' : 'Live'}
          </span>
        </div>

        {/* Month tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {[0, 1, 2].map(function(i) {
            const d   = new Date(today.getFullYear(), today.getMonth() + i, 1);
            const lbl = MONTHS_TH[d.getMonth()].slice(0, 3) + '\u00a0' + String(d.getFullYear() + 543).slice(2);
            const act = tab === i;
            return (
              <button key={i} onClick={function() { setTab(i); }} style={{
                flex: 1, padding: '9px 6px', borderRadius: 10,
                background: act ? BB.ink : BB.paper,
                color: act ? '#fff' : BB.ink2,
                border: '1px solid ' + (act ? BB.ink : BB.line),
                fontFamily: MONO, fontSize: 11, cursor: 'pointer',
                letterSpacing: '0.06em', fontWeight: act ? 600 : 400,
                transition: 'all 0.15s',
              }}>{lbl}</button>
            );
          })}
        </div>

        {/* Month title */}
        <div style={{ textAlign: 'center', marginBottom: 14,
                      fontFamily: HEAD,
                      fontSize: 15, fontWeight: 600, color: BB.ink }}>
          {MONTHS_TH[viewMonth]}&nbsp;{viewYear + 543}
        </div>

        {/* Day-of-week headers */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 3, marginBottom: 3 }}>
          {DAYS_TH.map(function(d) {
            return (
              <div key={d} style={{ textAlign: 'center', fontFamily: MONO, fontSize: 10,
                                    color: BB.mute, paddingBottom: 4 }}>{d}</div>
            );
          })}
        </div>

        {/* Day grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 3 }}>
          {Array.from({ length: firstDay }).map(function(_, i) { return <div key={'e'+i} />; })}
          {Array.from({ length: daysInMonth }).map(function(_, i) {
            const day    = i + 1;
            const status = getStatus(day);
            const key    = localDateStr(new Date(viewYear, viewMonth, day));
            const isToday = key === todayStr;
            const sx     = status && STATUS_SX[status];
            const isOpen = status === 'open';
            return (
              <div key={day}
                title={sx ? sx.label : ''}
                onClick={isOpen ? function() {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                } : undefined}
                style={{
                  aspectRatio: '1', borderRadius: 8, position: 'relative',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  background: sx ? sx.bg : (status === 'past' ? 'transparent' : '#1c1c1c'),
                  border: '1px solid ' + (isToday ? BB.lav : (sx ? sx.border : BB.line)),
                  boxShadow: isToday ? '0 0 0 2.5px ' + BB.lav + '55' : 'none',
                  cursor: isOpen ? 'pointer' : 'default',
                  opacity: status === 'past' ? 0.3 : 1,
                  transition: 'transform 0.1s, box-shadow 0.1s',
                }}
                onMouseEnter={isOpen ? function(e) {
                  e.currentTarget.style.transform = 'scale(1.08)';
                  e.currentTarget.style.boxShadow = '0 4px 12px -4px #2a5c3e';
                } : undefined}
                onMouseLeave={isOpen ? function(e) {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = isToday ? '0 0 0 2.5px ' + BB.lav + '55' : 'none';
                } : undefined}
              >
                <span style={{ fontSize: 12, fontWeight: isToday ? 700 : 400,
                               color: sx ? (sx.dot || BB.ink2) : BB.mute, fontFamily: MONO }}>
                  {day}
                </span>
                {isOpen && (
                  <span style={{ width: 4, height: 4, borderRadius: '50%',
                                 background: '#4ade80', marginTop: 1 }} />
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid ' + BB.line,
                      display: 'flex', flexWrap: 'wrap', gap: '6px 16px', alignItems: 'center' }}>
          {Object.entries(STATUS_SX).map(function(entry) {
            const k = entry[0]; const s = entry[1];
            return (
              <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 5,
                                    fontSize: 11, color: BB.ink2 }}>
                <span style={{ width: 11, height: 11, borderRadius: 3, display: 'inline-block',
                               background: s.bg, border: '1px solid ' + s.border }} />
                {k === 'open' ? 'เปิดรับ' : k === 'booked' ? 'จองแล้ว' : 'กำลังทำ'}
              </div>
            );
          })}
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: BB.ink2 }}>
            <span style={{ width: 11, height: 11, borderRadius: 3, display: 'inline-block',
                           background: '#1c1c1c', border: '2px solid ' + BB.lav }} />
            วันนี้
          </div>
        </div>

        {/* Demo notice */}
        {isDemo && (
          <div style={{ marginTop: 12, padding: '10px 14px', borderRadius: 10,
                        background: BB.paper, border: '1px dashed ' + BB.line,
                        fontSize: 11.5, color: BB.mute, lineHeight: 1.55 }}>
            💡 ข้อมูลตัวอย่าง — เชื่อม Notion โดยกรอก <code style={{ fontFamily: MONO }}>NOTION_CONFIG</code> ใน sections.jsx
          </div>
        )}
      </div>

      {/* Stat mini-card */}
      <div style={{ background: 'linear-gradient(135deg,' + BB.blueSoft + ' 0%,#1a3025 100%)',
                    borderRadius: 20, padding: 26,
                    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {[['7–10','วัน·ส่งมอบ'],['50%','มัดจำ'],['24 ชม.','ตอบกลับ'],['2 รอบ','แก้ไขฟรี']].map(function(item, i) {
          return (
            <div key={i}>
              <div style={{ fontFamily: HEAD,
                            fontSize: 26, fontWeight: 600, color: BB.ink, lineHeight: 1 }}>{item[0]}</div>
              <div style={{ fontSize: 12.5, color: BB.ink2, marginTop: 6 }}>{item[1]}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────── Reusable atoms ─────────────────────────── */

function SectionLabel({ num, label, color = BB.ink2 }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 10,
      fontFamily: MONO, fontSize: 11,
      letterSpacing: "0.2em", textTransform: "uppercase",
      color,
    }}>
      <Sparkle size={10} color={color} style={{ opacity: 0.8 }} />
      <span style={{ fontVariantNumeric: "tabular-nums", opacity: 0.55 }}>{num}</span>
      <span style={{ width: 22, height: 1, background: color, opacity: 0.35 }} />
      {label}
    </div>
  );
}

function PlaceholderBookCover({ w, h, label, sub, tone = "lavender", tilt = 0, style = {} }) {
  const palette = {
    lavender:{ bg: "#C9BFE0", ink: "#3a3257" },
    pink:    { bg: "#EFC0CB", ink: "#5a2f3a" },
    mint:    { bg: "#B6D9C2", ink: "#274a36" },
    blue:    { bg: "#A8C4DB", ink: "#1f3e57" },
    cream:   { bg: "#E8DCC4", ink: "#3d3320" },
    sand:    { bg: "#D9C9A8", ink: "#3d3320" },
  };
  const c = palette[tone];
  return (
    <div style={{
      width: w, height: h, position: "relative",
      transform: `rotate(${tilt}deg)`, transformOrigin: "center bottom",
      ...style,
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `repeating-linear-gradient(135deg, transparent 0 14px, rgba(255,255,255,0.18) 14px 15px)`,
        backgroundColor: c.bg,
        borderRadius: "3px 6px 6px 3px",
        boxShadow: "0 18px 36px -14px rgba(60,40,40,0.25), inset -2px 0 0 rgba(0,0,0,0.06), inset 2px 0 0 rgba(255,255,255,0.18)",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        padding: "16px 14px", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", left: 7, top: 0, bottom: 0, width: 1, background: "rgba(0,0,0,0.08)" }} />
        <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: "0.18em",
                      textTransform: "uppercase", color: c.ink, opacity: 0.55 }}>{sub}</div>
        <div>
          <div style={{
            fontFamily: SERIF, fontSize: w > 160 ? 24 : 17, lineHeight: 1.05,
            color: c.ink, fontWeight: 400, letterSpacing: "-0.01em",
          }}>{label}</div>
          <div style={{ marginTop: 8, height: 1, background: c.ink, opacity: 0.35, width: "60%" }} />
          <div style={{
            marginTop: 8, fontFamily: MONO, fontSize: 8, letterSpacing: "0.2em",
            color: c.ink, opacity: 0.5, textTransform: "uppercase",
          }}>JUNATHETYPE</div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── NAV ─────────────────────────── */

const NAV_LINKS = [
  { href: "#services", label: "บริการ" },
  { href: "#portfolio", label: "ผลงาน" },
  { href: "#pricing", label: "ราคา & คิว" },
  { href: "#blog", label: "บล็อก" },
  { href: "#contact", label: "ติดต่อ" },
];

function Nav() {
  const linkSx = {
    color: "inherit", textDecoration: "none",
    borderBottom: "1px solid transparent", paddingBottom: 2,
  };
  return (
    <nav style={{
      position: "fixed", top: 0, left: "50%", transform: "translateX(-50%)",
      zIndex: 1000, width: 1440, maxWidth: "100%",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      flexWrap: "wrap", rowGap: 12, columnGap: 16,
      padding: "16px 24px",
      background: "rgba(13, 13, 13, 0.92)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      borderBottom: "1px solid " + BB.line,
      boxSizing: "border-box",
      pointerEvents: "auto",
    }}>
      <a href="#top" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "inherit" }}>
        <div style={{
          width: 38, height: 38, borderRadius: 11,
          background: BB.ink, color: "#0d0d0d",
          display: "grid", placeItems: "center",
          fontFamily: SERIF, fontSize: 22, fontStyle: "italic", lineHeight: 1,
        }}>J</div>
        <div style={{ fontFamily: SANS, fontSize: 17, color: BB.ink,
                      letterSpacing: "0.04em", fontWeight: 700 }}>
          JUNATHETYPE
        </div>
      </a>
      <ul style={{
        display: "flex", flexWrap: "wrap", gap: "10px 20px", listStyle: "none", margin: 0, padding: 0,
        fontFamily: SANS, fontSize: 14.5, color: BB.ink2,
        flex: "1 1 200px", justifyContent: "center", minWidth: 0,
      }}>
        {NAV_LINKS.map((item) => (
          <li key={item.href}>
            <a href={item.href} style={linkSx}>{item.label}</a>
          </li>
        ))}
      </ul>
      <a href="#contact" style={{
        background: BB.ink, color: "#0d0d0d", border: "none",
        padding: "13px 22px", borderRadius: 12,
        fontFamily: SANS, fontSize: 14, fontWeight: 500, cursor: "pointer",
        textDecoration: "none", display: "inline-block",
        flexShrink: 0, whiteSpace: "nowrap",
      }}>ส่งต้นฉบับ →</a>
    </nav>
  );
}

/* ─────────────────────────── HERO ─────────────────────────── */

function Hero() {
  return (
    <section id="top" style={{
      width: 1440, minHeight: 900, position: "relative", overflow: "hidden",
      background: BB.cream2, color: BB.ink, fontFamily: SANS,
      scrollMarginTop: 0,
    }}>
      {/* Global keyframes */}
      <style>{`
        @keyframes rotateBadge { to { transform: rotate(360deg); } }
      `}</style>

      {/* ── Scattered sparkle decorations ── */}
      <Sparkle size={36} color={BB.ink}  style={{ position:"absolute", top:198, left:268, opacity:0.85, pointerEvents:"none" }} />
      <Sparkle size={13} color={BB.lav}  style={{ position:"absolute", top:320, left:510, opacity:0.7, pointerEvents:"none" }} />
      <Sparkle size={54} color={BB.ink}  style={{ position:"absolute", bottom:140, left:148, opacity:0.05, pointerEvents:"none" }} />
      <Sparkle size={20} color={BB.pink} style={{ position:"absolute", top:152, right:210, opacity:0.55, pointerEvents:"none" }} />
      <Sparkle size={30} color={BB.ink}  style={{ position:"absolute", bottom:240, right:280, opacity:0.1, pointerEvents:"none" }} />
      <Sparkle size={10} color={BB.lav}  style={{ position:"absolute", bottom:360, left:660, opacity:0.45, pointerEvents:"none" }} />

      {/* ── Wavy arrow decoration ── */}
      <svg width="160" height="60" viewBox="0 0 160 60" fill="none"
           style={{ position:"absolute", top:456, left:370, opacity:0.16, pointerEvents:"none" }}>
        <path d="M5 38 C 28 5, 56 58, 82 32 S 128 8, 155 28"
              stroke={BB.ink} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M147 22 L155 28 L146 34" stroke={BB.ink} strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr",
                    padding:"148px 80px 80px", position:"relative", zIndex:2 }}>

        {/* ── LEFT ── */}
        <div>
          {/* Pill label */}
          <div style={{ display:"inline-flex", alignItems:"center", gap:8,
                        fontFamily:MONO, fontSize:10, letterSpacing:"0.22em", textTransform:"uppercase",
                        color:BB.lav, border:"1px solid "+BB.lav+"44",
                        padding:"7px 16px", borderRadius:999, marginBottom:30 }}>
            <Sparkle size={8} color={BB.lav} />
            Typesetting · Cover · e-Book
          </div>

          <h1 style={{ fontFamily:HEAD, fontWeight:700,
                       fontSize:82, lineHeight:1.0, letterSpacing:"-0.03em",
                       margin:0, color:BB.ink }}>
            ทุกหน้ากระดาษ<br/>
            ควรค่าแก่<br/>
            <span style={{ color:BB.ink }}>การอ่าน</span>
          </h1>

          <p style={{ margin:"28px 0 0", maxWidth:420,
                      fontSize:17, lineHeight:1.65, color:BB.ink2 }}>
            รับจัดรูปเล่มนิยายระดับสำนักพิมพ์ ตั้งแต่ press-ready PDF,
            e-Book ePub 3.0 ไปจนถึงประกอบปกครบสามส่วน
          </p>

          {/* Buttons */}
          <div style={{ display:"flex", gap:12, marginTop:36, flexWrap:"wrap" }}>
            <a href="#pricing" style={{
              background:BB.ink, color:"#0d0d0d", border:"none",
              padding:"16px 28px", borderRadius:10, fontSize:15, fontWeight:600,
              cursor:"pointer", fontFamily:SANS,
              display:"inline-flex", alignItems:"center", gap:10, textDecoration:"none",
            }}>คำนวณราคา <span style={{ fontSize:17 }}>→</span></a>
            <a href="#portfolio" style={{
              background:"transparent", color:BB.ink,
              border:"1px solid "+BB.line,
              padding:"16px 28px", borderRadius:10, fontSize:15, fontWeight:500,
              cursor:"pointer", fontFamily:SANS, textDecoration:"none",
            }}>ดูผลงาน</a>
          </div>

          {/* Stats strip */}
          <div style={{ display:"flex", gap:48, marginTop:56, paddingTop:26,
                        borderTop:"1px solid "+BB.line }}>
            {[["50+","งานเสร็จ"],["100%","ส่งตรงเวลา"],["24 ชม.","ตอบกลับ"]].map(([n,l],i) => (
              <div key={i}>
                <div style={{ fontFamily:HEAD, fontWeight:700, fontSize:30,
                              color:BB.ink, lineHeight:1 }}>{n}</div>
                <div style={{ fontFamily:MONO, fontSize:9.5, letterSpacing:"0.2em",
                              color:BB.ink2, marginTop:5, textTransform:"uppercase" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT — floating cards ── */}
        <div style={{ position:"relative", height:660 }}>

          {/* Rotating badge */}
          <div style={{ position:"absolute", left:20, top:60, zIndex:4, pointerEvents:"none" }}>
            <RotatingBadge />
          </div>

          {/* Main book spread card */}
          <div style={{
            position:"absolute", left:80, top:80,
            width:440, height:296, borderRadius:6,
            background:"#1a1714",
            boxShadow:"0 40px 80px -20px rgba(0,0,0,0.65)",
            display:"grid", gridTemplateColumns:"1fr 1fr",
            transform:"rotate(-2.5deg)", zIndex:2,
            border:"1px solid #2e2824",
          }}>
            <div style={{ borderRight:"1px solid #2e2824", padding:"28px 22px",
                          background:"linear-gradient(90deg,transparent,#1a1714 94%)" }}>
              <div style={{ textAlign:"center", marginBottom:14 }}>
                <div style={{ fontFamily:MONO, fontSize:11, color:BB.lav,
                              fontStyle:"italic", marginBottom:5 }}>บทที่ 7</div>
                <div style={{ fontFamily:HEAD, fontSize:14, fontWeight:500,
                              lineHeight:1.3, color:BB.ink }}>คืนหนึ่งของเดือนเมษา</div>
              </div>
              {[...Array(10)].map((_,i) => (
                <div key={i} style={{ height:3, background:"#2e2824", borderRadius:2,
                                       width:i===9?"60%":"100%", marginTop:7 }} />
              ))}
            </div>
            <div style={{ padding:"30px 26px", background:"linear-gradient(270deg,transparent,#1a1714 94%)" }}>
              {[...Array(13)].map((_,i) => (
                <div key={i} style={{ height:3, background:"#2e2824", borderRadius:2,
                                       width:i===12?"40%":"100%", marginTop:7 }} />
              ))}
              <div style={{ marginTop:24, fontFamily:MONO, fontSize:9.5,
                            color:BB.mute, textAlign:"center", letterSpacing:"0.2em" }}>· 142 ·</div>
            </div>
          </div>

          {/* Float info card */}
          <div style={{
            position:"absolute", right:20, top:26,
            width:206, padding:18, borderRadius:14,
            background:"#1c1c1c",
            boxShadow:"0 20px 40px -14px rgba(0,0,0,0.6)",
            transform:"rotate(2.5deg)", zIndex:3,
            border:"1px solid "+BB.line,
          }}>
            <div style={{ fontFamily:MONO, fontSize:9.5, letterSpacing:"0.18em",
                          color:BB.lav, textTransform:"uppercase" }}>Press-ready</div>
            <div style={{ fontFamily:HEAD, fontSize:14, fontWeight:600, color:BB.ink,
                          marginTop:8, lineHeight:1.4 }}>
              ขอบกระดาษ<br/>ตามมาตรฐานสากล
            </div>
            <div style={{ marginTop:14, display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ width:26, height:26, borderRadius:7, background:BB.lav+"22",
                            display:"grid", placeItems:"center" }}>
                <Sparkle size={11} color={BB.lav} />
              </div>
              <div style={{ fontFamily:MONO, fontSize:9, color:BB.ink2 }}>PDF/X-1a:2001</div>
            </div>
          </div>

          {/* Service pills */}
          <div style={{ position:"absolute", left:80, bottom:136,
                        display:"flex", gap:8, flexWrap:"wrap", zIndex:3 }}>
            {[["📚","จัดเล่มพิมพ์"],["📱","e-Book"],["📖","ปก"]].map(([ic,t],k) => (
              <div key={k} style={{
                display:"inline-flex", alignItems:"center", gap:6,
                background:"#1c1c1c", padding:"8px 12px", borderRadius:8,
                fontSize:12, color:BB.ink, border:"1px solid "+BB.line,
              }}><span>{ic}</span>{t}</div>
            ))}
          </div>

          {/* Sparkles around cards */}
          <Sparkle size={22} color={BB.lav}  style={{ position:"absolute", top:14, right:148, opacity:0.6, zIndex:5, pointerEvents:"none" }} />
          <Sparkle size={11} color={BB.ink}  style={{ position:"absolute", bottom:188, right:52, opacity:0.35, pointerEvents:"none" }} />
          <Sparkle size={16} color={BB.pink} style={{ position:"absolute", top:396, left:16, opacity:0.5, pointerEvents:"none" }} />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── SERVICES ─────────────────────────── */

function ServiceCard({ num, icon, title, sub, items, tag, tone, exampleHref = "#portfolio" }) {
  const accents = {
    lav:  { bg: "#2a2040", chip: BB.lav,   line: BB.lav },
    pink: { bg: "#3a1428", chip: BB.pink,  line: BB.pink },
    mint: { bg: "#1e183a", chip: "#c084fc", line: "#c084fc" },
  };
  const a = accents[tone];
  return (
    <div style={{
      background: "#1c1c1c", borderRadius: 20, padding: 36,
      boxShadow: "0 4px 24px -10px rgba(60,40,40,0.10)",
      position: "relative", overflow: "hidden",
      display: "flex", flexDirection: "column", gap: 20,
    }}>
      <div style={{
        position: "absolute", top: -40, right: -40, width: 140, height: 140,
        borderRadius: "50%", background: a.bg, opacity: 0.7,
        pointerEvents: "none",
      }} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
        <div style={{
          width: 60, height: 60, borderRadius: 16, background: a.bg,
          display: "grid", placeItems: "center", fontSize: 28,
        }}>{icon}</div>
        <span style={{
          fontFamily: MONO, fontSize: 11, letterSpacing: "0.2em",
          color: a.line, textTransform: "uppercase",
        }}>{num}</span>
      </div>

      <div>
        <h3 style={{ fontFamily: SANS, fontSize: 26, fontWeight: 500,
                     letterSpacing: "-0.02em", margin: 0, color: BB.ink }}>{title}</h3>
        <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 16,
                      color: a.line, marginTop: 6 }}>{sub}</div>
      </div>

      <ul style={{ listStyle: "none", padding: 0, margin: 0,
                   display: "flex", flexDirection: "column", gap: 11 }}>
        {items.map((it, i) => (
          <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10,
                               fontSize: 14.5, lineHeight: 1.5, color: BB.ink2 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%",
                           background: a.chip, marginTop: 9, flexShrink: 0 }} />
            {it}
          </li>
        ))}
      </ul>

      <div style={{
        marginTop: "auto", paddingTop: 18,
        borderTop: "1px solid " + BB.line,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontFamily: MONO, fontSize: 11, color: BB.mute,
                       letterSpacing: "0.1em", textTransform: "uppercase" }}>{tag}</span>
        <a href={exampleHref} style={{ fontSize: 14, color: BB.ink, cursor: "pointer",
                       display: "inline-flex", alignItems: "center", gap: 6,
                       textDecoration: "none" }}>
          ดูตัวอย่าง <span>→</span>
        </a>
      </div>
    </div>
  );
}

function Services() {
  return (
    <section id="services" style={{
      width: 1440, padding: "120px 72px", background: BB.paper,
      color: BB.ink, fontFamily: SANS, position: "relative",
    }}>
      {/* Sparkle decorations */}
      <Sparkle size={40} color={BB.ink} style={{ position:"absolute", top:80, right:80, opacity:0.06, pointerEvents:"none" }} />
      <Sparkle size={14} color={BB.lav} style={{ position:"absolute", top:108, right:160, opacity:0.5, pointerEvents:"none" }} />
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1.2fr",
        gap: 80, alignItems: "end", marginBottom: 64,
      }}>
        <div>
          <SectionLabel num="02" label="บริการของเรา" color={BB.lav} />
          <h2 style={{
            fontFamily: HEAD,
            fontWeight: 600, fontSize: 56,
            lineHeight: 1.15, letterSpacing: "-0.02em",
            margin: "20px 0 0", color: BB.ink,
          }}>
            สามบริการหลัก<br />
            <span style={{ fontWeight: 700, color: BB.ink }}>ครบจบในที่เดียว</span>
          </h2>
        </div>
        <p style={{ fontSize: 17, lineHeight: 1.7, color: BB.ink2, maxWidth: 540, margin: 0 }}>
          เลือกใช้แยกบริการ หรือมัดรวมเป็นแพ็คเกจประหยัด —
          ทุกงานจัดด้วย InDesign CC ตามมาตรฐาน PDF/X-1a:2001
          ส่งโรงพิมพ์ได้ทันที พร้อมแก้ไขจนพอใจ
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
        <ServiceCard
          num="S/01" icon="📚" tone="lav"
          title="จัดรูปเล่มสำหรับพิมพ์"
          sub="Press-ready PDF"
          items={[
            "ตั้งค่า Bleed · Margin · Gutter ตามมาตรฐาน",
            "จัดหน้าด้วย InDesign CC ระดับสำนักพิมพ์",
            "ฟอนต์ Claudia New 16pt บน A4",
            "ไฟล์ส่งมอบ PDF/X-1a:2001",
            "เหมาะกับ นิยาย นวนิยาย เรื่องสั้น",
          ]}
          tag="จาก 12 บาท/หน้า"
        />
        <ServiceCard
          num="S/02" icon="📱" tone="pink"
          title="จัดรูปเล่ม e-Book"
          sub="ePub 3.0 + Interactive PDF"
          items={[
            "ไฟล์ ePub 3.0 มาตรฐานสากล",
            "PDF Interactive พร้อม Table of Contents",
            "Reflowable layout ปรับตามหน้าจอ",
            "รองรับ Dark mode บนเครื่องอ่าน",
            "ทดสอบบน Kindle · iPad · Phone จริง",
          ]}
          tag="จาก 8 บาท/หน้า"
        />
        <ServiceCard
          num="S/03" icon="📖" tone="mint"
          title="ประกอบปก"
          sub="Cover Assembly · 3 ส่วน"
          items={[
            "รับไฟล์ปกหน้า + Typography จากคุณ",
            "คำนวณสันตามจำนวนหน้า + ชนิดกระดาษ",
            "จัดวางสัน + ปกหลังตามมาตรฐาน",
            "ส่งมอบไฟล์ปกครบ 3 ส่วน (หน้า·สัน·หลัง)",
            "พร้อมส่งโรงพิมพ์ทันที",
          ]}
          tag="800 บาท/เล่ม"
        />
      </div>
    </section>
  );
}

/* ─────────────────────────── PORTFOLIO ─────────────────────────── */

const PORTFOLIO = [
  { id: "p1", tone: "lavender", type: "นิยายรัก", note: "Press + Cover", src: "./Pic/1.png" },
  { id: "p2", tone: "pink",     type: "นวนิยาย",   note: "ePub 3.0 + Press" },
  { id: "p3", tone: "cream",    type: "เรื่องสั้น", note: "Anthology" },
  { id: "p4", tone: "mint",     type: "สืบสวน",     note: "Press-ready" },
  { id: "p5", tone: "blue",     type: "Novella",   note: "e-Book Bundle" },
  { id: "p6", tone: "sand",     type: "ผจญภัย",     note: "Press + Cover" },
];

const PORTFOLIO_FILTERS = ["ทั้งหมด", "นิยายรัก", "นวนิยาย", "เรื่องสั้น", "สืบสวน", "Novella", "ผจญภัย"];

function PortfolioCard({ item, idx }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{
        background: "#1c1c1c", borderRadius: 18,
        boxShadow: "0 4px 24px -10px rgba(60,40,40,0.10)",
        position: "relative", overflow: "hidden",
        ...(item.src ? {} : { aspectRatio: "3 / 4" }),
      }}>
        <div style={{
          position: "absolute", left: 12, top: 12, zIndex: 2,
          fontFamily: MONO, fontSize: 10, letterSpacing: "0.2em",
          color: "rgba(255,255,255,0.5)", textTransform: "uppercase",
          pointerEvents: "none",
          background: "rgba(0,0,0,0.4)", padding: "3px 7px", borderRadius: 5,
        }}>#{String(idx + 1).padStart(2, "0")}</div>

        {item.src ? (
          <img src={item.src} alt={item.type}
               style={{ width: "100%", display: "block", borderRadius: 18 }} />
        ) : (
          <div style={{ position: "absolute", inset: 0 }} dangerouslySetInnerHTML={{
            __html: `<image-slot id="portfolio-${item.id}" shape="rect" radius="0"
                                  style="width:100%;height:100%;display:block;"
                                  fit="contain"
                                  placeholder="วางรูปผลงานที่นี่"></image-slot>`
          }} />
        )}
      </div>

      <div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10,
                      justifyContent: "space-between" }}>
          <div style={{ fontSize: 13.5, color: BB.ink2 }}>
            <span style={{ color: BB.mute }}>{item.type}</span>
          </div>
          <span style={{ fontFamily: MONO, fontSize: 11, color: BB.mute,
                         letterSpacing: "0.1em" }}>{item.note}</span>
        </div>
      </div>
    </div>
  );
}

function Portfolio() {
  const [filter, setFilter] = React.useState("ทั้งหมด");
  const filtered = filter === "ทั้งหมด"
    ? PORTFOLIO
    : PORTFOLIO.filter((p) => p.type === filter);

  return (
    <section id="portfolio" style={{
      width: 1440, padding: "120px 72px",
      background: "linear-gradient(180deg, #141414 0%, #0d0d0d 100%)",
      color: BB.ink, fontFamily: SANS, position: "relative", overflow: "hidden",
    }}>
      {/* Sparkle decorations */}
      <Sparkle size={48} color={BB.ink}  style={{ position:"absolute", top:72, left:72, opacity:0.06, pointerEvents:"none" }} />
      <Sparkle size={16} color={BB.pink} style={{ position:"absolute", top:100, left:140, opacity:0.45, pointerEvents:"none" }} />
      <Sparkle size={11} color={BB.lav}  style={{ position:"absolute", bottom:120, right:100, opacity:0.4, pointerEvents:"none" }} />

      <div style={{
        display: "grid", gridTemplateColumns: "1fr auto",
        alignItems: "end", marginBottom: 56, gap: 60, position: "relative",
      }}>
        <div>
          <SectionLabel num="03" label="ตัวอย่างผลงาน" color={BB.pink} />
          <h2 style={{
            fontFamily: HEAD,
            fontWeight: 600, fontSize: 56,
            lineHeight: 1.15, letterSpacing: "-0.02em",
            margin: "20px 0 12px", color: BB.ink,
          }}>
            ตัวอย่าง<br />
            <span style={{ fontWeight: 700, color: BB.ink }}>การจัดรูปเล่ม</span>
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: BB.ink2, maxWidth: 540, margin: 0 }}>
            นิยายหลากแนวที่เราดูแลจัดวาง ตั้งแต่นวนิยายโรแมนติก
            เรื่องสั้นวรรณกรรม ไปจนถึงนิยายสืบสวน
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-end" }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap",
                        justifyContent: "flex-end", maxWidth: 460 }}>
            {PORTFOLIO_FILTERS.map((t) => {
              const active = filter === t;
              return (
                <button key={t} type="button" onClick={() => setFilter(t)} style={{
                  padding: "9px 16px", borderRadius: 999,
                  background: active ? BB.ink : "#1c1c1c",
                  color: active ? "#0d0d0d" : BB.ink2,
                  fontSize: 13, fontFamily: SANS,
                  border: active ? "none" : "1px solid " + BB.line,
                  cursor: "pointer",
                }}>{t}</button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
        gap: 32, position: "relative",
      }}>
        {filtered.length === 0 ? (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "48px 24px", color: BB.mute }}>
            ยังไม่มีตัวอย่างในหมวดนี้
            <button type="button" onClick={() => setFilter("ทั้งหมด")} style={{
              marginLeft: 12, background: "none", border: "none", color: BB.lav,
              textDecoration: "underline", cursor: "pointer", fontFamily: SANS, fontSize: 15,
            }}>แสดงทั้งหมด</button>
          </div>
        ) : (
          filtered.map((item, i) => (
            <PortfolioCard key={item.id} item={item} idx={i} />
          ))
        )}
      </div>
    </section>
  );
}

/* ─────────────────────────── PRICING & QUEUE ─────────────────────────── */

function PricingQueue() {
  const [pages, setPages] = React.useState(250);
  const [svc, setSvc] = React.useState("print");
  const [combo, setCombo] = React.useState(false);
  const [foot, setFoot] = React.useState(0);     // เชิงอรรถ (ฟรี 10 อันแรก · เกิน 2฿/อัน)
  const [tables, setTables] = React.useState(0); // ตาราง (ฟรี 2 · เกิน 20฿/ตาราง)
  const [maps, setMaps] = React.useState(0);     // แผนที่ · แผนผัง (50฿/ชิ้น)
  const [imgs, setImgs] = React.useState(0);     // ภาพในเนื้อหา (5฿/รูป)
  const [rush, setRush] = React.useState(false);

  const rates = { print: 12, ebook: 8, cover: 0 };
  const coverAddon = svc === "ebook" ? 400 : 800;
  let base = svc === "cover" ? 800 : pages * rates[svc];
  if (combo && svc !== "cover") base = pages * rates[svc] + coverAddon;
  const footExtra  = Math.max(0, foot - 10) * 2;
  const tableExtra = Math.max(0, tables - 2) * 20;
  const mapExtra   = maps * 50;
  const imgExtra   = imgs * 5;
  const extra = footExtra + tableExtra + mapExtra + imgExtra;
  let total = base + extra;
  if (combo && svc !== "cover") total = Math.round(total * 0.9); // 10% combo discount
  if (rush) total = total * 2;
  const deposit = Math.round(total * 0.5);

  return (
    <section id="pricing" style={{
      width: 1440, padding: "120px 72px",
      background: BB.cream2, color: BB.ink, fontFamily: SANS,
      position: "relative", overflow: "hidden",
    }}>
      {/* Sparkle decorations */}
      <Sparkle size={44} color={BB.ink} style={{ position:"absolute", right:80, top:80, opacity:0.05, pointerEvents:"none" }} />
      <Sparkle size={14} color={BB.lav} style={{ position:"absolute", right:148, top:112, opacity:0.45, pointerEvents:"none" }} />
      <Sparkle size={10} color={BB.pink} style={{ position:"absolute", left:80, bottom:80, opacity:0.3, pointerEvents:"none" }} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr",
                    gap: 60, alignItems: "end", marginBottom: 56, position: "relative" }}>
        <div>
          <SectionLabel num="06" label="ราคา & คิว" color={BB.blue} />
          <h2 style={{
            fontFamily: HEAD,
            fontWeight: 600, fontSize: 56,
            lineHeight: 1.15, letterSpacing: "-0.02em",
            margin: "20px 0 0", color: BB.ink,
          }}>
            ราคาตรงไปตรงมา<br />
            <span style={{ fontWeight: 700, color: BB.ink }}>คำนวณได้ทันที</span>
          </h2>
        </div>
        <p style={{ fontSize: 17, lineHeight: 1.7, color: BB.ink2,
                    maxWidth: 540, margin: 0 }}>
          เลือกประเภทงาน + จำนวนหน้า แล้วระบบจะคำนวณราคาให้ทันที
          มัดจำ 50% เมื่อยืนยัน · ที่เหลือชำระเมื่อส่งมอบงาน
        </p>
      </div>

      {/* Calculator + Queue side-by-side */}
      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr",
                    gap: 28, position: "relative" }}>
        {/* Calculator */}
        <div style={{
          background: "#1c1c1c", borderRadius: 24, padding: 40,
          boxShadow: "0 6px 30px -14px rgba(60,40,40,0.14)",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h3 style={{
              fontFamily: HEAD,
              fontSize: 26, fontWeight: 600, color: BB.ink, margin: 0,
            }}>เครื่องคำนวณราคา</h3>
            <span style={{ fontFamily: MONO, fontSize: 11, color: BB.mute,
                           letterSpacing: "0.18em", textTransform: "uppercase" }}>
              Real-time
            </span>
          </div>

          {/* Pages slider */}
          <div style={{ marginTop: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between",
                          alignItems: "baseline", marginBottom: 12 }}>
              <label style={{ fontSize: 14, fontWeight: 500, color: BB.ink2 }}>
                จำนวนหน้า · A4 · Claudia New 16pt
              </label>
              <div style={{ fontFamily: SERIF, fontSize: 32, color: BB.ink,
                            lineHeight: 1, fontWeight: 500 }}>
                {pages} <span style={{ fontSize: 14, color: BB.mute, fontFamily: SANS }}>หน้า</span>
              </div>
            </div>
            <input type="range" min={50} max={600} step={10} value={pages}
                   onChange={e => setPages(+e.target.value)}
                   style={{
                     width: "100%", appearance: "none", height: 4,
                     background: "linear-gradient(to right, " + BB.lav + " " + ((pages - 50) / 550 * 100) + "%, " + BB.line + " " + ((pages - 50) / 550 * 100) + "%)",
                     borderRadius: 2, outline: "none",
                   }} />
            <div style={{ display: "flex", justifyContent: "space-between",
                          marginTop: 6, fontFamily: MONO, fontSize: 10.5,
                          color: BB.mute, letterSpacing: "0.1em" }}>
              <span>50</span><span>250</span><span>600</span>
            </div>
          </div>

          {/* Service type radios */}
          <div style={{ marginTop: 28 }}>
            <label style={{ fontSize: 14, fontWeight: 500, color: BB.ink2,
                            display: "block", marginBottom: 12 }}>
              ประเภทงาน
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              {[
                ["print", "📚", "จัดเล่มพิมพ์", "12฿/หน้า"],
                ["ebook", "📱", "e-Book / ePub", "8฿/หน้า"],
                ["cover", "📖", "ประกอบปก",    "800฿/เล่ม"],
              ].map(([v, ic, label, rate]) => {
                const active = svc === v;
                return (
                  <button key={v} onClick={() => setSvc(v)} style={{
                    background: active ? BB.ink : "#1c1c1c",
                    color: active ? "#0d0d0d" : BB.ink,
                    border: "1px solid " + (active ? BB.ink : BB.line),
                    padding: "16px 14px", borderRadius: 14,
                    fontFamily: SANS, fontSize: 14, fontWeight: 500,
                    cursor: "pointer", textAlign: "left",
                    display: "flex", flexDirection: "column", gap: 6,
                  }}>
                    <span style={{ fontSize: 22 }}>{ic}</span>
                    <span>{label}</span>
                    <span style={{ fontFamily: MONO, fontSize: 11,
                                   color: active ? "rgba(255,255,255,0.6)" : BB.mute,
                                   letterSpacing: "0.05em" }}>{rate}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Combo toggle */}
          {svc !== "cover" && (
            <label style={{
              marginTop: 16, padding: "14px 18px", borderRadius: 12,
              background: combo ? "#2a2040" : BB.paper,
              border: "1px solid " + (combo ? BB.lav : BB.line),
              display: "flex", alignItems: "center", justifyContent: "space-between",
              cursor: "pointer",
            }}>
              <span style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: BB.ink }}>
                <input type="checkbox" checked={combo} onChange={e => setCombo(e.target.checked)}
                       style={{ accentColor: BB.lav, width: 16, height: 16 }} />
                {svc === "ebook" ? "เพิ่มประกอบปก อีบุ๊ค (Combo) +400฿" : "เพิ่มประกอบปก (Combo) +800฿"}
              </span>
              <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.1em",
                             color: BB.lav, textTransform: "uppercase" }}>
                ลด 10%
              </span>
            </label>
          )}

          {/* Addons — counts with free quotas */}
          <div style={{ marginTop: 22 }}>
            <label style={{ fontSize: 14, fontWeight: 500, color: BB.ink2,
                            display: "block", marginBottom: 12 }}>
              บริการเสริม <span style={{ color: BB.mute, fontWeight: 400 }}>(ระบุจำนวน · มีโควต้าฟรี)</span>
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10 }}>
              {[
                { k: "foot",  label: "เชิงอรรถ",
                  hint: "ฟรี 10 อันแรก · เกินอันละ 2฿",
                  value: foot, setValue: setFoot, max: 200,
                  free: 10, unit: "อัน",
                  extra: footExtra },
                { k: "table", label: "ตาราง",
                  hint: "ฟรี 2 ตาราง · เกินตารางละ 20฿",
                  value: tables, setValue: setTables, max: 30,
                  free: 2, unit: "ตาราง",
                  extra: tableExtra },
                { k: "map",   label: "แผนที่ · แผนผัง",
                  hint: "ครอบคลุมตารางความสัมพันธ์ · แผนที่แฟนตาซี · 50฿/ชิ้น",
                  value: maps, setValue: setMaps, max: 30,
                  free: 0, unit: "ชิ้น",
                  extra: mapExtra },
                { k: "img",   label: "ภาพในเนื้อหา",
                  hint: "หน้าเปิดบท / รูปตัวละครฟรี · ในเนื้อหารูปละ 5฿",
                  value: imgs, setValue: setImgs, max: 100,
                  free: 0, unit: "รูป",
                  extra: imgExtra },
              ].map((a) => {
                const exceeded = a.value > a.free;
                return (
                  <div key={a.k} style={{
                    padding: "14px 14px 12px", borderRadius: 12,
                    background: exceeded ? "#272727" : BB.paper,
                    border: "1px solid " + (exceeded ? BB.lav + "88" : BB.line),
                  }}>
                    <div style={{ fontSize: 13.5, fontWeight: 500, color: BB.ink }}>
                      {a.label}
                    </div>
                    <div style={{ marginTop: 4, fontSize: 11.5, color: BB.mute, lineHeight: 1.4 }}>
                      {a.hint}
                    </div>

                    <div style={{ marginTop: 12, display: "flex",
                                  alignItems: "center", gap: 8 }}>
                      <button onClick={() => a.setValue(Math.max(0, a.value - 1))}
                              style={{
                        width: 28, height: 28, borderRadius: 8,
                        border: "1px solid " + BB.line, background: "#1c1c1c",
                        cursor: "pointer", fontSize: 16, lineHeight: 1, color: BB.ink2,
                      }}>−</button>
                      <input type="number" value={a.value} min={0} max={a.max}
                             onChange={e => a.setValue(Math.max(0, Math.min(a.max, +e.target.value || 0)))}
                             style={{
                        flex: 1, minWidth: 0, padding: "6px 4px", textAlign: "center",
                        fontFamily: MONO, fontSize: 14, fontWeight: 500, color: BB.ink,
                        border: "1px solid " + BB.line, borderRadius: 8,
                        background: "#1c1c1c", outline: "none",
                      }} />
                      <button onClick={() => a.setValue(Math.min(a.max, a.value + 1))}
                              style={{
                        width: 28, height: 28, borderRadius: 8,
                        border: "1px solid " + BB.line, background: "#1c1c1c",
                        cursor: "pointer", fontSize: 16, lineHeight: 1, color: BB.ink2,
                      }}>+</button>
                    </div>

                    <div style={{ marginTop: 10, fontFamily: MONO, fontSize: 10.5,
                                  letterSpacing: "0.05em",
                                  color: exceeded ? BB.ink : BB.mute,
                                  display: "flex", justifyContent: "space-between" }}>
                      <span>{a.unit}</span>
                      <span>{a.extra > 0 ? "+" + a.extra + "฿" : "ฟรี"}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Rush */}
          <label style={{
            marginTop: 16, padding: "14px 18px", borderRadius: 12,
            background: rush ? "#3a1428" : BB.paper,
            border: "1px solid " + (rush ? BB.pink : BB.line),
            display: "flex", alignItems: "center", justifyContent: "space-between",
            cursor: "pointer",
          }}>
            <span style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: BB.ink }}>
              <input type="checkbox" checked={rush} onChange={e => setRush(e.target.checked)}
                     style={{ accentColor: BB.pink, width: 16, height: 16 }} />
              <span>ด่วนพิเศษ <span style={{ color: BB.mute }}>(3 วัน)</span></span>
            </span>
            <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.1em",
                           color: BB.pink, textTransform: "uppercase" }}>
              ×2 ราคา
            </span>
          </label>

          {/* Disclaimer */}
          <div style={{
            marginTop: 16, padding: "12px 16px", borderRadius: 10,
            background: BB.paper, border: "1px dashed " + BB.line,
            fontSize: 12.5, color: BB.mute, lineHeight: 1.55,
            display: "flex", alignItems: "flex-start", gap: 10,
          }}>
            <span style={{ fontSize: 14 }}>💡</span>
            <span>ราคานี้เป็นการคำนวณแบบคร่าวๆ — จะคิดราคาจริงอีกครั้งเมื่อจัดรูปเล่มเสร็จสิ้น
                  ตามจำนวนเชิงอรรถ ตาราง และภาพในเนื้อหาที่ปรากฏจริง</span>
          </div>

          {/* Total */}
          <div style={{
            marginTop: 16, padding: 24, borderRadius: 16,
            background: "linear-gradient(135deg, #2a1e40 0%, #1c1c1c 100%)",
            color: BB.ink, position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", right: -40, top: -40, width: 140, height: 140,
                          borderRadius: "50%",
                          background: "linear-gradient(135deg, " + BB.lav + "55, " + BB.pink + "55)",
                          pointerEvents: "none" }} />
            <div style={{ position: "relative" }}>
              <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.2em",
                            color: "rgba(255,255,255,0.55)", textTransform: "uppercase" }}>
                รวมทั้งหมด {rush && "(ด่วน ×2)"}
              </div>
              <div style={{
                fontFamily: HEAD,
                fontSize: 56, fontWeight: 700, lineHeight: 1.1,
                marginTop: 6, fontVariantNumeric: "tabular-nums",
              }}>
                {total.toLocaleString("th-TH")}
                <span style={{ fontSize: 22, fontWeight: 500, opacity: 0.7, marginLeft: 6 }}>บาท</span>
              </div>
              <div style={{ marginTop: 16, paddingTop: 14,
                            borderTop: "1px solid rgba(255,255,255,0.15)",
                            display: "flex", justifyContent: "space-between",
                            alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.6)" }}>มัดจำ 50%</div>
                  <div style={{ fontSize: 20, fontWeight: 500, marginTop: 2,
                                fontVariantNumeric: "tabular-nums" }}>
                    {deposit.toLocaleString("th-TH")} บาท
                  </div>
                </div>
                <a href="#contact" style={{
                  background: "#1c1c1c", color: BB.ink, border: "none",
                  padding: "14px 22px", borderRadius: 12,
                  fontFamily: SANS, fontSize: 14, fontWeight: 500, cursor: "pointer",
                  display: "inline-flex", alignItems: "center", gap: 8,
                  textDecoration: "none",
                }}>จองคิวเลย <span>→</span></a>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar panel */}
        <div id="queue" style={{ scrollMarginTop: 88 }}>
          <BookingCalendar />
        </div>
      </div>

      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.35}}
        @keyframes rotateBadge{to{transform:rotate(360deg)}}
      `}</style>
    </section>
  );
}

Object.assign(window, { Hero, Services, Portfolio, PricingQueue, BB, SERIF, SANS, MONO, HEAD, SectionLabel, Sparkle, RotatingBadge, Nav });
