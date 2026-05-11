/* global React */
/* Bookbind Studio — One-page site, Soft Geometric direction (Variant B)
   Sections are exported on window. */

const SERIF = "'Fraunces', 'Cormorant Garamond', serif";
const SANS  = "'DM Sans', 'IBM Plex Sans Thai', system-ui, sans-serif";
const MONO  = "'JetBrains Mono', ui-monospace, monospace";

const BB = {
  cream:  "#F5F1E8",
  cream2: "#EFE7D8",
  paper:  "#FAF6EC",
  ink:    "#2d2a26",
  ink2:   "#4a463f",
  mute:   "#6B6B6B",
  line:   "#E8DFD0",
  lav:    "#9B8AC4",
  pink:   "#E89BA9",
  mint:   "#A8D5BA",
  blue:   "#7BA3C7",
  blueSoft: "#C7D8E9",
};

/* ─────────────────────────── Reusable atoms ─────────────────────────── */

function SectionLabel({ num, label, color = BB.ink }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 14,
      fontFamily: MONO, fontSize: 11.5,
      letterSpacing: "0.22em", textTransform: "uppercase",
      color,
    }}>
      <span style={{ fontVariantNumeric: "tabular-nums", opacity: 0.6 }}>{num}</span>
      <span style={{ width: 28, height: 1, background: color, opacity: 0.4 }} />
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
          }}>Bookbind Studio</div>
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
      padding: "20px 72px",
      background: "rgba(239, 231, 216, 0.92)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      borderBottom: "1px solid " + BB.line,
      boxSizing: "border-box",
    }}>
      <a href="#top" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "inherit" }}>
        <div style={{
          width: 38, height: 38, borderRadius: 11,
          background: BB.ink, color: "#fff",
          display: "grid", placeItems: "center",
          fontFamily: SERIF, fontSize: 22, fontStyle: "italic", lineHeight: 1,
        }}>B</div>
        <div style={{ fontFamily: SANS, fontSize: 19, color: BB.ink,
                      letterSpacing: "-0.01em", fontWeight: 500 }}>
          Bookbind <span style={{ opacity: 0.5, fontWeight: 400 }}>Studio</span>
        </div>
      </a>
      <ul style={{ display: "flex", gap: 32, listStyle: "none", margin: 0, padding: 0,
                   fontFamily: SANS, fontSize: 14.5, color: BB.ink2 }}>
        {NAV_LINKS.map((item) => (
          <li key={item.href}>
            <a href={item.href} style={linkSx}>{item.label}</a>
          </li>
        ))}
      </ul>
      <a href="#contact" style={{
        background: BB.ink, color: "#fff", border: "none",
        padding: "13px 22px", borderRadius: 12,
        fontFamily: SANS, fontSize: 14, fontWeight: 500, cursor: "pointer",
        textDecoration: "none", display: "inline-block",
      }}>ส่งต้นฉบับ →</a>
    </nav>
  );
}

/* ─────────────────────────── HERO (B) ─────────────────────────── */

function Hero() {
  return (
    <section id="top" style={{
      width: 1440, height: 900, position: "relative", overflow: "hidden",
      background: BB.cream2, color: BB.ink, fontFamily: SANS,
      scrollMarginTop: 0,
    }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: "55%", height: "100%",
                    background: "linear-gradient(180deg, #F6F1E5 0%, #EFE7D8 100%)" }} />
      <div style={{ position: "absolute", right: 0, top: 0, width: "45%", height: "100%",
                    background: "linear-gradient(160deg, #D8E4EE 0%, #C7D8E9 100%)" }} />
      <div style={{ position: "absolute", left: "52%", top: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 540, height: 540, borderRadius: "50%",
                    background: "linear-gradient(135deg, #E89BA9, #B6D9C2 70%, #C9BFE0)",
                    opacity: 0.65 }} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr",
                    padding: "128px 72px 0", position: "relative", zIndex: 2 }}>
        <div style={{ paddingTop: 24 }}>
          <SectionLabel num="01" label="Typesetting · Cover · e-Book" />

          <h1 style={{
            fontFamily: "'Playpen Sans Thai', 'Playpen Sans', " + SANS,
            fontWeight: 600,
            fontSize: 76, lineHeight: 1.1, letterSpacing: "-0.02em",
            margin: "22px 0 0", color: BB.ink,
          }}>
            ทุกหน้ากระดาษ<br />
            ควรค่าแก่<br />
            <span style={{ fontWeight: 700, color: "#5a4a8a" }}>การอ่าน</span>
          </h1>

          <p style={{ margin: "32px 0 0", maxWidth: 460,
                      fontSize: 17.5, lineHeight: 1.65, color: BB.ink2 }}>
            Bookbind Studio รับจัดรูปเล่มนิยายระดับสำนักพิมพ์ ตั้งแต่
            press-ready PDF, e-book ePub 3.0 ไปจนถึงประกอบปกครบสามส่วน
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 28 }}>
            {[["📚","จัดเล่มพิมพ์"],["📱","e-Book ePub"],
              ["📖","ประกอบปก"],["✦","Footnotes & Tables"]].map(([i, t], k) => (
              <div key={k} style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "#fff", padding: "10px 14px", borderRadius: 12,
                fontSize: 13.5, color: BB.ink,
                boxShadow: "0 4px 14px -8px rgba(60,40,40,0.15)",
              }}>
                <span style={{ fontSize: 14 }}>{i}</span>{t}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 14, marginTop: 40, alignItems: "center" }}>
            <a href="#pricing" style={{
              background: BB.ink, color: "#fff", border: "none",
              padding: "18px 30px", borderRadius: 14, fontSize: 15, fontWeight: 500,
              cursor: "pointer", fontFamily: SANS,
              display: "inline-flex", alignItems: "center", gap: 10,
              textDecoration: "none",
            }}>คำนวณราคา <span style={{ fontSize: 18 }}>→</span></a>
            <a href="#queue" style={{ fontSize: 14.5, color: BB.ink, textDecoration: "underline",
                        textUnderlineOffset: 5, cursor: "pointer" }}>หรือดูคิวปัจจุบัน</a>
          </div>
        </div>

        <div style={{ position: "relative", height: 700 }}>
          <div style={{
            position: "absolute", left: 40, top: 40,
            width: 460, height: 320, borderRadius: 6, background: "#fff",
            boxShadow: "0 30px 60px -20px rgba(40,30,50,0.3)",
            display: "grid", gridTemplateColumns: "1fr 1fr",
            transform: "rotate(-3deg)",
          }}>
            <div style={{ borderRight: "1px solid #ECE6DA", padding: "32px 28px",
                          background: "linear-gradient(90deg, transparent, #faf6ec 92%)" }}>
              <div style={{ fontFamily: SERIF, fontSize: 15, color: "#9b8aa4",
                            fontStyle: "italic", marginBottom: 14 }}>บทที่ 7</div>
              <div style={{ fontFamily: SERIF, fontSize: 22, lineHeight: 1.2,
                            color: BB.ink, marginBottom: 18 }}>คืนหนึ่งของเดือนเมษา</div>
              {[...Array(10)].map((_, i) => (
                <div key={i} style={{ height: 4, background: BB.line, borderRadius: 2,
                                       width: i === 9 ? "60%" : "100%", marginTop: 7 }} />
              ))}
            </div>
            <div style={{ padding: "32px 28px",
                          background: "linear-gradient(270deg, transparent, #faf6ec 92%)" }}>
              {[...Array(13)].map((_, i) => (
                <div key={i} style={{ height: 4, background: BB.line, borderRadius: 2,
                                       width: i === 12 ? "40%" : "100%", marginTop: 7 }} />
              ))}
              <div style={{ marginTop: 30, fontFamily: MONO, fontSize: 9.5,
                            color: "#9c9587", textAlign: "center",
                            letterSpacing: "0.2em" }}>· 142 ·</div>
            </div>
          </div>

          <div style={{ position: "absolute", left: 80, bottom: 90 }}>
            <PlaceholderBookCover w={300} h={70} tone="pink" label="" sub="Press · 2026" />
          </div>
          <div style={{ position: "absolute", left: 60, bottom: 160 }}>
            <PlaceholderBookCover w={320} h={70} tone="lavender" label="" sub="ePub · 3.0" tilt={2} />
          </div>
          <div style={{ position: "absolute", left: 100, bottom: 230 }}>
            <PlaceholderBookCover w={280} h={70} tone="mint" label="" sub="Cover · 3-part" tilt={-1} />
          </div>

          <div style={{
            position: "absolute", right: 30, top: 20,
            width: 200, padding: 16, borderRadius: 14, background: "#fff",
            boxShadow: "0 14px 30px -10px rgba(40,30,50,0.2)",
          }}>
            <div style={{ fontFamily: MONO, fontSize: 10,
                          letterSpacing: "0.18em", color: BB.blue, textTransform: "uppercase" }}>
              Margins
            </div>
            <div style={{ fontFamily: SERIF, fontSize: 19, color: BB.ink,
                          marginTop: 6, lineHeight: 1.2 }}>
              ขอบกระดาษ<br />ตามมาตรฐานสากล
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── SERVICES ─────────────────────────── */

function ServiceCard({ num, icon, title, sub, items, tag, tone, exampleHref = "#portfolio" }) {
  const accents = {
    lav:  { bg: "#EBE5F5", chip: BB.lav,  line: BB.lav },
    pink: { bg: "#F8E4E8", chip: BB.pink, line: BB.pink },
    mint: { bg: "#DFF0E5", chip: "#5fa37a", line: "#5fa37a" },
  };
  const a = accents[tone];
  return (
    <div style={{
      background: "#fff", borderRadius: 20, padding: 36,
      boxShadow: "0 4px 24px -10px rgba(60,40,40,0.10)",
      position: "relative", overflow: "hidden",
      display: "flex", flexDirection: "column", gap: 20,
    }}>
      <div style={{
        position: "absolute", top: -40, right: -40, width: 140, height: 140,
        borderRadius: "50%", background: a.bg, opacity: 0.7,
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
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1.2fr",
        gap: 80, alignItems: "end", marginBottom: 64,
      }}>
        <div>
          <SectionLabel num="02" label="บริการของเรา" color={BB.lav} />
          <h2 style={{
            fontFamily: "'Playpen Sans Thai', 'Playpen Sans', " + SANS,
            fontWeight: 600, fontSize: 56,
            lineHeight: 1.15, letterSpacing: "-0.02em",
            margin: "20px 0 0", color: BB.ink,
          }}>
            สามบริการหลัก<br />
            <span style={{ fontWeight: 700, color: BB.lav }}>ครบจบในที่เดียว</span>
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
  { id: "p1", tone: "lavender", type: "นิยายรัก", note: "Press + Cover" },
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
        background: "#fff", borderRadius: 18, padding: 24,
        boxShadow: "0 4px 24px -10px rgba(60,40,40,0.10)",
        position: "relative", overflow: "hidden",
        aspectRatio: "3 / 4",
        display: "grid", placeItems: "center",
      }}>
        <div style={{
          position: "absolute", left: 14, top: 14,
          fontFamily: MONO, fontSize: 10, letterSpacing: "0.2em",
          color: BB.mute, textTransform: "uppercase",
        }}>#{String(idx + 1).padStart(2, "0")}</div>

        <div dangerouslySetInnerHTML={{
          __html: `<image-slot id="portfolio-${item.id}" shape="rounded" radius="6"
                                style="width:175px;height:255px;display:block;"
                                placeholder="ตัวอย่างผลงาน"></image-slot>`
        }} />
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
      background: "linear-gradient(180deg, #FAF6EC 0%, #F5F1E8 100%)",
      color: BB.ink, fontFamily: SANS, position: "relative", overflow: "hidden",
    }}>
      {/* Soft decorative orb */}
      <div style={{
        position: "absolute", right: -160, top: 80, width: 380, height: 380,
        borderRadius: "50%",
        background: "radial-gradient(closest-side, #E89BA933, transparent)",
      }} />
      <div style={{
        position: "absolute", left: -120, bottom: 100, width: 320, height: 320,
        borderRadius: "50%",
        background: "radial-gradient(closest-side, #C9BFE044, transparent)",
      }} />

      <div style={{
        display: "grid", gridTemplateColumns: "1fr auto",
        alignItems: "end", marginBottom: 56, gap: 60, position: "relative",
      }}>
        <div>
          <SectionLabel num="04" label="ตัวอย่างผลงาน" color={BB.pink} />
          <h2 style={{
            fontFamily: "'Playpen Sans Thai', " + SANS,
            fontWeight: 600, fontSize: 56,
            lineHeight: 1.15, letterSpacing: "-0.02em",
            margin: "20px 0 12px", color: BB.ink,
          }}>
            ตัวอย่าง<br />
            <span style={{ fontWeight: 700, color: BB.pink }}>การจัดรูปเล่ม</span>
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
                  background: active ? BB.ink : "#fff",
                  color: active ? "#fff" : BB.ink2,
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

      {/* Bottom CTA strip */}
      <div style={{
        marginTop: 56, padding: "40px 48px", borderRadius: 24,
        background: "#fff",
        boxShadow: "0 4px 24px -10px rgba(60,40,40,0.10)",
        display: "grid", gridTemplateColumns: "1.4fr 1fr",
        gap: 60, alignItems: "center", position: "relative",
      }}>
        <div>
          <div style={{
            fontFamily: "'Playpen Sans Thai', " + SANS,
            fontSize: 30, fontWeight: 600, color: BB.ink,
            lineHeight: 1.25,
          }}>
            อยากให้นิยายของคุณ<br />
            <span style={{ color: BB.lav }}>ดูสวยแบบนี้?</span>
          </div>
          <p style={{ marginTop: 12, fontSize: 15.5, lineHeight: 1.65,
                      color: BB.ink2, maxWidth: 480 }}>
            ส่งต้นฉบับมาให้เราดู เริ่มต้นจัดรูปเล่มได้ทันที
            พร้อมตอบกลับภายใน 24 ชั่วโมง
          </p>
        </div>

        <div style={{ textAlign: "right" }}>
          <a href="#contact" style={{
            background: BB.ink, color: "#fff", border: "none",
            padding: "16px 26px", borderRadius: 12,
            fontFamily: SANS, fontSize: 14.5, fontWeight: 500, cursor: "pointer",
            display: "inline-flex", alignItems: "center", gap: 10,
            textDecoration: "none",
          }}>
            ส่งต้นฉบับ <span>→</span>
          </a>
        </div>
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
  let base = svc === "cover" ? 800 : pages * rates[svc];
  if (combo && svc !== "cover") base = pages * rates[svc] + 800;
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
      <div style={{ position: "absolute", left: -140, top: 60, width: 360, height: 360,
                    borderRadius: "50%",
                    background: "radial-gradient(closest-side, #C7D8E955, transparent)" }} />
      <div style={{ position: "absolute", right: -100, bottom: 100, width: 320, height: 320,
                    borderRadius: "50%",
                    background: "radial-gradient(closest-side, #B6D9C266, transparent)" }} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr",
                    gap: 60, alignItems: "end", marginBottom: 56, position: "relative" }}>
        <div>
          <SectionLabel num="07" label="ราคา & คิว" color={BB.blue} />
          <h2 style={{
            fontFamily: "'Playpen Sans Thai', " + SANS,
            fontWeight: 600, fontSize: 56,
            lineHeight: 1.15, letterSpacing: "-0.02em",
            margin: "20px 0 0", color: BB.ink,
          }}>
            ราคาตรงไปตรงมา<br />
            <span style={{ fontWeight: 700, color: BB.blue }}>คำนวณได้ทันที</span>
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
          background: "#fff", borderRadius: 24, padding: 40,
          boxShadow: "0 6px 30px -14px rgba(60,40,40,0.14)",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h3 style={{
              fontFamily: "'Playpen Sans Thai', " + SANS,
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
                ["ebook", "📱", "e-Book",      "8฿/หน้า"],
                ["cover", "📖", "ประกอบปก",    "800฿/เล่ม"],
              ].map(([v, ic, label, rate]) => {
                const active = svc === v;
                return (
                  <button key={v} onClick={() => setSvc(v)} style={{
                    background: active ? BB.ink : "#fff",
                    color: active ? "#fff" : BB.ink,
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
              background: combo ? "#EBE5F5" : BB.paper,
              border: "1px solid " + (combo ? BB.lav : BB.line),
              display: "flex", alignItems: "center", justifyContent: "space-between",
              cursor: "pointer",
            }}>
              <span style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: BB.ink }}>
                <input type="checkbox" checked={combo} onChange={e => setCombo(e.target.checked)}
                       style={{ accentColor: BB.lav, width: 16, height: 16 }} />
                เพิ่มประกอบปก (Combo)
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
                    background: exceeded ? BB.cream : "#fff",
                    border: "1px solid " + (exceeded ? "#c9bf9d" : BB.line),
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
                        border: "1px solid " + BB.line, background: "#fff",
                        cursor: "pointer", fontSize: 16, lineHeight: 1, color: BB.ink2,
                      }}>−</button>
                      <input type="number" value={a.value} min={0} max={a.max}
                             onChange={e => a.setValue(Math.max(0, Math.min(a.max, +e.target.value || 0)))}
                             style={{
                        flex: 1, minWidth: 0, padding: "6px 4px", textAlign: "center",
                        fontFamily: MONO, fontSize: 14, fontWeight: 500, color: BB.ink,
                        border: "1px solid " + BB.line, borderRadius: 8,
                        background: "#fff", outline: "none",
                      }} />
                      <button onClick={() => a.setValue(Math.min(a.max, a.value + 1))}
                              style={{
                        width: 28, height: 28, borderRadius: 8,
                        border: "1px solid " + BB.line, background: "#fff",
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
            background: rush ? "#F8E4E8" : BB.paper,
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
            background: "linear-gradient(135deg, " + BB.ink + " 0%, #3a342d 100%)",
            color: "#fff", position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", right: -40, top: -40, width: 140, height: 140,
                          borderRadius: "50%",
                          background: "linear-gradient(135deg, " + BB.lav + "55, " + BB.pink + "55)" }} />
            <div style={{ position: "relative" }}>
              <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.2em",
                            color: "rgba(255,255,255,0.55)", textTransform: "uppercase" }}>
                รวมทั้งหมด {rush && "(ด่วน ×2)"}
              </div>
              <div style={{
                fontFamily: "'Playpen Sans Thai', " + SANS,
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
                  background: "#fff", color: BB.ink, border: "none",
                  padding: "14px 22px", borderRadius: 12,
                  fontFamily: SANS, fontSize: 14, fontWeight: 500, cursor: "pointer",
                  display: "inline-flex", alignItems: "center", gap: 8,
                  textDecoration: "none",
                }}>จองคิวเลย <span>→</span></a>
              </div>
            </div>
          </div>
        </div>

        {/* Queue panel */}
        <div id="queue" style={{ display: "flex", flexDirection: "column", gap: 16, scrollMarginTop: 88 }}>
          <div style={{
            background: "#fff", borderRadius: 24, padding: 32,
            boxShadow: "0 6px 30px -14px rgba(60,40,40,0.14)",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h3 style={{
                fontFamily: "'Playpen Sans Thai', " + SANS,
                fontSize: 22, fontWeight: 600, color: BB.ink, margin: 0,
              }}>คิวปัจจุบัน</h3>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontFamily: MONO, fontSize: 11, color: "#3f8a5d",
                letterSpacing: "0.16em", textTransform: "uppercase",
              }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%",
                               background: "#3f8a5d", animation: "pulse 2s infinite" }} />
                Open
              </span>
            </div>

            {/* Active slot */}
            <div style={{
              marginTop: 22, padding: 18, borderRadius: 14,
              background: BB.cream, border: "1px solid " + BB.line,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between",
                            alignItems: "baseline" }}>
                <div style={{ fontSize: 13, color: BB.mute }}>กำลังทำอยู่</div>
                <div style={{ fontFamily: MONO, fontSize: 11, color: BB.ink,
                              letterSpacing: "0.1em" }}>60%</div>
              </div>
              <div style={{ marginTop: 6, fontFamily: SERIF, fontSize: 18,
                            color: BB.ink, fontStyle: "italic" }}>
                โปรเจค #124
              </div>
              <div style={{ marginTop: 4, fontSize: 13, color: BB.ink2 }}>
                15 – 22 พฤษภาคม 2026
              </div>
              <div style={{
                marginTop: 12, height: 6, background: "#fff", borderRadius: 3, overflow: "hidden",
              }}>
                <div style={{
                  width: "60%", height: "100%",
                  background: "linear-gradient(90deg, " + BB.lav + ", " + BB.pink + ")",
                  borderRadius: 3,
                }} />
              </div>
            </div>

            {/* Booked + open slots */}
            <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { date: "23 – 30 พ.ค.", id: "#125", status: "booked" },
                { date: "31 พ.ค. – 7 มิ.ย.", id: "#126", status: "booked" },
                { date: "8 – 15 มิ.ย.", id: "เปิดรับ", status: "open" },
                { date: "16 – 23 มิ.ย.", id: "เปิดรับ", status: "open" },
              ].map((s, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "13px 16px", borderRadius: 12,
                  background: s.status === "open" ? "#DFF0E5" : BB.paper,
                  border: "1px solid " + (s.status === "open" ? "#A8D5BA" : BB.line),
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{
                      width: 8, height: 8, borderRadius: "50%",
                      background: s.status === "open" ? "#3f8a5d" : "#c9bfae",
                    }} />
                    <span style={{ fontSize: 14, color: BB.ink }}>{s.date}</span>
                  </div>
                  {s.status === "open" ? (
                    <a href="#contact" style={{
                      background: BB.ink, color: "#fff", border: "none",
                      padding: "6px 14px", borderRadius: 999,
                      fontFamily: SANS, fontSize: 12.5, cursor: "pointer",
                      textDecoration: "none", display: "inline-block",
                    }}>จองช่วงนี้ →</a>
                  ) : (
                    <span style={{ fontFamily: MONO, fontSize: 11, color: BB.mute,
                                   letterSpacing: "0.1em" }}>{s.id}</span>
                  )}
                </div>
              ))}
            </div>

            <div style={{
              marginTop: 18, padding: "12px 14px", borderRadius: 10,
              background: BB.paper, border: "1px dashed " + BB.line,
              fontSize: 12.5, color: BB.mute, lineHeight: 1.5,
            }}>
              💡 คิวหลัง 1 เดือนเปิดจองทันทีเมื่อคิวด้านบนเริ่มทำงาน
            </div>
          </div>

          {/* Mini stat card */}
          <div style={{
            background: "linear-gradient(135deg, " + BB.blueSoft + " 0%, #B6D9C2 100%)",
            borderRadius: 20, padding: 26,
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20,
          }}>
            {[
              ["7–10", "วัน·ส่งมอบ"],
              ["50%", "มัดจำ"],
              ["24 ชม.", "ตอบกลับ"],
              ["2 รอบ", "แก้ไขฟรี"],
            ].map(([n, l], i) => (
              <div key={i}>
                <div style={{
                  fontFamily: "'Playpen Sans Thai', " + SANS,
                  fontSize: 26, fontWeight: 600, color: BB.ink, lineHeight: 1,
                }}>{n}</div>
                <div style={{ fontSize: 12.5, color: BB.ink2, marginTop: 6 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.35}}`}</style>
    </section>
  );
}

Object.assign(window, { Hero, Services, Portfolio, PricingQueue, BB, SERIF, SANS, MONO, SectionLabel, PlaceholderBookCover, Nav });
