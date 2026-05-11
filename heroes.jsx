/* global React */
const { useState } = React;

/* ─────────────────────────── shared bits ────────────────────────── */

const NAV_ITEMS = ["หน้าแรก", "บริการ", "ผลงาน", "ราคา & คิว", "บล็อก", "ติดต่อ"];

function PlaceholderBookCover({ w, h, label, sub, tone, tilt = 0, z = 1, style = {} }) {
  // Subtly-striped placeholder cover with mono label
  const palette = {
    lavender:  { bg: "#C9BFE0", ink: "#3a3257" },
    pink:      { bg: "#EFC0CB", ink: "#5a2f3a" },
    mint:      { bg: "#B6D9C2", ink: "#274a36" },
    blue:      { bg: "#A8C4DB", ink: "#1f3e57" },
    cream:     { bg: "#E8DCC4", ink: "#3d3320" },
    sand:      { bg: "#D9C9A8", ink: "#3d3320" },
  };
  const c = palette[tone] || palette.lavender;
  return (
    <div style={{
      width: w, height: h, position: "relative",
      transform: `rotate(${tilt}deg)`,
      transformOrigin: "center bottom",
      zIndex: z,
      ...style,
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(135deg, ${c.bg} 0%, ${c.bg}cc 100%)`,
        backgroundImage: `repeating-linear-gradient(135deg, transparent 0 14px, rgba(255,255,255,0.18) 14px 15px)`,
        backgroundColor: c.bg,
        borderRadius: "3px 6px 6px 3px",
        boxShadow: "0 20px 40px -12px rgba(60,40,40,0.25), inset -2px 0 0 rgba(0,0,0,0.06), inset 2px 0 0 rgba(255,255,255,0.18)",
        overflow: "hidden",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        padding: "18px 16px",
      }}>
        {/* Spine line */}
        <div style={{ position: "absolute", left: 8, top: 0, bottom: 0, width: 1, background: "rgba(0,0,0,0.08)" }} />
        <div style={{
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase",
          color: c.ink, opacity: 0.55,
        }}>{sub}</div>
        <div>
          <div style={{
            fontFamily: "'Instrument Serif', 'Cormorant Garamond', serif",
            fontSize: w > 160 ? 26 : 18, lineHeight: 1.05, color: c.ink, fontWeight: 400,
            letterSpacing: "-0.01em",
          }}>{label}</div>
          <div style={{
            marginTop: 8, height: 1, background: c.ink, opacity: 0.35, width: "60%",
          }} />
          <div style={{
            marginTop: 8,
            fontFamily: "'JetBrains Mono', monospace", fontSize: 8.5, letterSpacing: "0.2em",
            color: c.ink, opacity: 0.5, textTransform: "uppercase",
          }}>Bookbind Studio</div>
        </div>
      </div>
    </div>
  );
}

function NavBar({ accent, serif }) {
  return (
    <nav style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "28px 64px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: accent, color: "#fff",
          display: "grid", placeItems: "center",
          fontFamily: serif, fontSize: 22, fontWeight: 500, lineHeight: 1,
        }}>B</div>
        <div style={{ fontFamily: serif, fontSize: 22, color: "#2d2a26", letterSpacing: "-0.01em" }}>
          Bookbind <span style={{ opacity: 0.5 }}>Studio</span>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
        <ul style={{ display: "flex", gap: 28, listStyle: "none", margin: 0, padding: 0,
                     fontFamily: "'IBM Plex Sans Thai', 'IBM Plex Sans', sans-serif",
                     fontSize: 15, color: "#3D3D3D" }}>
          {NAV_ITEMS.map((n, i) => (
            <li key={i} style={{ cursor: "pointer", opacity: i === 0 ? 1 : 0.7, fontWeight: i === 0 ? 500 : 400 }}>
              {n}
            </li>
          ))}
        </ul>
        <button style={{
          background: accent, color: "#fff", border: "none",
          padding: "12px 22px", borderRadius: 999,
          fontFamily: "'IBM Plex Sans Thai', sans-serif", fontSize: 14, fontWeight: 500,
          cursor: "pointer", boxShadow: "0 8px 20px -8px " + accent,
        }}>ส่งต้นฉบับ →</button>
      </div>
    </nav>
  );
}

/* ─────────────────────────── Variant A: Modern Editorial ─────────────────────────── */
function HeroA() {
  const serif = "'Instrument Serif', 'Cormorant Garamond', serif";
  const sans = "'IBM Plex Sans Thai', 'IBM Plex Sans', system-ui, sans-serif";
  const accent = "#8A7AB8";

  return (
    <div style={{
      width: 1440, height: 900,
      background: "#F5F1E8",
      color: "#3D3D3D",
      position: "relative", overflow: "hidden",
      fontFamily: sans,
    }}>
      {/* Soft pastel orbs */}
      <div style={{ position: "absolute", top: -120, right: -80, width: 420, height: 420,
                    borderRadius: "50%", background: "radial-gradient(closest-side, #E89BA955, transparent)" }} />
      <div style={{ position: "absolute", bottom: -160, left: -60, width: 480, height: 480,
                    borderRadius: "50%", background: "radial-gradient(closest-side, #9B8AC444, transparent)" }} />

      <NavBar accent={accent} serif={serif} />

      <div style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 60,
                    padding: "60px 64px 0", alignItems: "center" }}>
        {/* Left copy */}
        <div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "8px 14px", borderRadius: 999,
            background: "#fff", border: "1px solid #E8DFD0",
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5,
            letterSpacing: "0.16em", textTransform: "uppercase", color: "#6B6B6B",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#A8D5BA" }} />
            เปิดรับคิว มิ.ย. 2026
          </div>

          <h1 style={{
            fontFamily: serif, fontWeight: 400,
            fontSize: 92, lineHeight: 0.98, letterSpacing: "-0.025em",
            margin: "28px 0 0", color: "#2d2a26",
          }}>
            จัดรูปเล่มนิยาย<br />
            <em style={{ color: accent, fontStyle: "italic" }}>มืออาชีพ</em>
            <span style={{ fontFamily: sans, fontSize: 92, fontWeight: 300, color: "#2d2a26" }}> ​</span>
            <br />
            ระดับสำนักพิมพ์
          </h1>

          <p style={{
            margin: "32px 0 0", maxWidth: 480,
            fontSize: 17, lineHeight: 1.65, color: "#5a554f",
          }}>
            บริการจัดรูปเล่มสำหรับพิมพ์ + e-book และประกอบปก
            ด้วยมาตรฐาน InDesign สำหรับนักเขียนที่ใส่ใจทุกรายละเอียดของหน้ากระดาษ
          </p>

          <div style={{ display: "flex", gap: 14, marginTop: 40 }}>
            <button style={{
              background: "linear-gradient(135deg, #9B8AC4 0%, #E89BA9 100%)",
              color: "#fff", border: "none", padding: "16px 28px", borderRadius: 999,
              fontFamily: sans, fontSize: 15, fontWeight: 500, cursor: "pointer",
              boxShadow: "0 12px 28px -10px #9B8AC4",
            }}>คำนวณราคาเลย →</button>
            <button style={{
              background: "transparent", color: "#3D3D3D",
              border: "1.5px solid #c9bfae", padding: "16px 28px", borderRadius: 999,
              fontFamily: sans, fontSize: 15, fontWeight: 500, cursor: "pointer",
            }}>ดูผลงาน</button>
          </div>

          {/* Stats row */}
          <div style={{
            display: "flex", gap: 48, marginTop: 64, paddingTop: 28,
            borderTop: "1px solid #E8DFD0",
          }}>
            {[
              ["120+", "เล่มที่จัดให้นักเขียน"],
              ["7–10", "วันส่งมอบมาตรฐาน"],
              ["98%", "ลูกค้ากลับมาใช้บริการ"],
            ].map(([n, l], i) => (
              <div key={i}>
                <div style={{ fontFamily: serif, fontSize: 38, color: "#2d2a26", lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: 12.5, color: "#6B6B6B", marginTop: 6, letterSpacing: "0.02em" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: book stack */}
        <div style={{ position: "relative", height: 640, display: "grid", placeItems: "center" }}>
          <div style={{
            position: "absolute", width: 460, height: 460, borderRadius: "50%",
            background: "linear-gradient(135deg, #EFE6D4, #F5F1E8)",
            boxShadow: "inset 0 0 60px rgba(155,138,196,0.08)",
          }} />
          <div style={{ position: "absolute", left: 40, top: 80, transform: "rotate(-8deg)" }}>
            <PlaceholderBookCover w={170} h={240} tone="lavender" label="คืนเมษา" sub="Novel · 312p" />
          </div>
          <div style={{ position: "absolute", right: 30, top: 50, transform: "rotate(6deg)" }}>
            <PlaceholderBookCover w={180} h={250} tone="pink" label="ทะเลในขวด" sub="Novella · 184p" />
          </div>
          <div style={{ position: "absolute", left: 110, bottom: 60, transform: "rotate(2deg)", zIndex: 3 }}>
            <PlaceholderBookCover w={220} h={310} tone="cream" label="ใต้แสงเทียน" sub="Anthology · 248p" />
          </div>
          <div style={{ position: "absolute", right: 50, bottom: 30, transform: "rotate(-4deg)" }}>
            <PlaceholderBookCover w={150} h={210} tone="mint" label="ระยะใกล้" sub="Novel · 220p" />
          </div>

          {/* Floating annotation */}
          <div style={{
            position: "absolute", right: -10, top: 320, zIndex: 5,
            background: "#fff", borderRadius: 16, padding: "14px 16px",
            boxShadow: "0 12px 30px -8px rgba(60,40,40,0.18)",
            display: "flex", alignItems: "center", gap: 12, width: 220,
          }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#A8D5BA",
                          display: "grid", placeItems: "center", fontSize: 16 }}>✓</div>
            <div>
              <div style={{ fontFamily: serif, fontSize: 16, color: "#2d2a26" }}>Press-ready PDF</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#6B6B6B", letterSpacing: "0.1em" }}>PDF/X-1a:2001</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── Variant B: Soft Geometric ─────────────────────────── */
function HeroB() {
  const serif = "'Fraunces', 'Cormorant Garamond', serif"; // used sparingly
  const sans = "'DM Sans', 'IBM Plex Sans Thai', system-ui, sans-serif";
  const accent = "#7BA3C7";
  const bg = "#EFE7D8";

  return (
    <div style={{
      width: 1440, height: 900,
      background: bg, color: "#2d2a26",
      position: "relative", overflow: "hidden",
      fontFamily: sans,
    }}>
      {/* Geometric panels */}
      <div style={{ position: "absolute", left: 0, top: 0, width: "55%", height: "100%",
                    background: "linear-gradient(180deg, #F6F1E5 0%, #EFE7D8 100%)" }} />
      <div style={{ position: "absolute", right: 0, top: 0, width: "45%", height: "100%",
                    background: "linear-gradient(160deg, #D8E4EE 0%, #C7D8E9 100%)" }} />
      {/* Big circle */}
      <div style={{ position: "absolute", left: "52%", top: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 540, height: 540, borderRadius: "50%",
                    background: "linear-gradient(135deg, #E89BA9, #B6D9C2 70%, #C9BFE0)",
                    opacity: 0.65 }} />

      <NavBar accent={accent} serif={serif} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr",
                    padding: "20px 64px 0", position: "relative", zIndex: 2 }}>
        <div style={{ paddingTop: 30 }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
            letterSpacing: "0.22em", textTransform: "uppercase", color: "#6B6B6B", marginBottom: 22,
          }}>Typesetting · Cover Assembly · e-Book</div>

          <h1 style={{
            fontFamily: sans, fontWeight: 500,
            fontSize: 84, lineHeight: 1.0, letterSpacing: "-0.03em",
            margin: 0, color: "#2d2a26",
          }}>
            ทุกหน้ากระดาษ<br />
            ควรค่าแก่<br />
            <span style={{ fontFamily: serif, fontStyle: "italic", fontWeight: 400, color: "#5a4a8a" }}>การอ่าน</span>
          </h1>

          <p style={{
            margin: "36px 0 0", maxWidth: 460,
            fontSize: 17.5, lineHeight: 1.65, color: "#4a463f",
          }}>
            Bookbind Studio รับจัดรูปเล่มนิยายระดับสำนักพิมพ์ ตั้งแต่
            press-ready PDF, e-book ePub 3.0 ไปจนถึงประกอบปกครบสามส่วน
          </p>

          {/* Service chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 32 }}>
            {[
              ["📚", "จัดเล่มพิมพ์"],
              ["📱", "e-Book ePub"],
              ["📖", "ประกอบปก"],
              ["✦", "Footnotes & Tables"],
            ].map(([i, t], k) => (
              <div key={k} style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "#fff", padding: "10px 14px", borderRadius: 12,
                fontSize: 13.5, color: "#3D3D3D",
                boxShadow: "0 4px 14px -8px rgba(60,40,40,0.15)",
              }}>
                <span style={{ fontSize: 14 }}>{i}</span>{t}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 14, marginTop: 44, alignItems: "center" }}>
            <button style={{
              background: "#2d2a26", color: "#fff", border: "none",
              padding: "18px 32px", borderRadius: 14, fontSize: 15, fontWeight: 500,
              cursor: "pointer", fontFamily: sans,
              display: "inline-flex", alignItems: "center", gap: 10,
            }}>คำนวณราคา <span style={{ fontSize: 18 }}>→</span></button>
            <a style={{ fontSize: 14.5, color: "#3D3D3D", textDecoration: "underline",
                        textUnderlineOffset: 5, cursor: "pointer" }}>หรือดูคิวปัจจุบัน</a>
          </div>
        </div>

        {/* Right: stacked books composition */}
        <div style={{ position: "relative", height: 720 }}>
          {/* Open book mock */}
          <div style={{
            position: "absolute", left: 40, top: 60,
            width: 460, height: 320, borderRadius: 6,
            background: "#fff",
            boxShadow: "0 30px 60px -20px rgba(40,30,50,0.3)",
            display: "grid", gridTemplateColumns: "1fr 1fr",
            transform: "rotate(-3deg)",
          }}>
            <div style={{ borderRight: "1px solid #ECE6DA", padding: "32px 28px 28px",
                          background: "linear-gradient(90deg, transparent, #faf6ec 92%)" }}>
              <div style={{ fontFamily: serif, fontSize: 15, color: "#9b8aa4", fontStyle: "italic",
                            marginBottom: 14 }}>บทที่ 7</div>
              <div style={{ fontFamily: serif, fontSize: 22, lineHeight: 1.2, color: "#2d2a26",
                            marginBottom: 18 }}>คืนหนึ่งของเดือนเมษา</div>
              {[...Array(10)].map((_, i) => (
                <div key={i} style={{ height: 4, background: "#E8DFD0", borderRadius: 2,
                                       width: i === 9 ? "60%" : "100%", marginTop: 7 }} />
              ))}
            </div>
            <div style={{ padding: "32px 28px 28px",
                          background: "linear-gradient(270deg, transparent, #faf6ec 92%)" }}>
              {[...Array(13)].map((_, i) => (
                <div key={i} style={{ height: 4, background: "#E8DFD0", borderRadius: 2,
                                       width: i === 12 ? "40%" : "100%", marginTop: 7 }} />
              ))}
              <div style={{ marginTop: 30, fontFamily: "'JetBrains Mono', monospace",
                            fontSize: 9.5, color: "#9c9587", textAlign: "center", letterSpacing: "0.2em" }}>
                · 142 ·
              </div>
            </div>
          </div>

          {/* Stack of books bottom */}
          <div style={{ position: "absolute", left: 80, bottom: 80 }}>
            <PlaceholderBookCover w={300} h={70} tone="pink" label="" sub="Press · 2026" tilt={0} style={{ borderRadius: 4 }} />
          </div>
          <div style={{ position: "absolute", left: 60, bottom: 150 }}>
            <PlaceholderBookCover w={320} h={70} tone="lavender" label="" sub="ePub · 3.0" tilt={2} style={{ borderRadius: 4 }} />
          </div>
          <div style={{ position: "absolute", left: 100, bottom: 220 }}>
            <PlaceholderBookCover w={280} h={70} tone="mint" label="" sub="Cover · 3-part" tilt={-1} style={{ borderRadius: 4 }} />
          </div>

          {/* Annotation */}
          <div style={{
            position: "absolute", right: 20, top: 30,
            width: 200, padding: 16, borderRadius: 14,
            background: "#fff", boxShadow: "0 14px 30px -10px rgba(40,30,50,0.2)",
          }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                          letterSpacing: "0.18em", color: "#7BA3C7", textTransform: "uppercase" }}>
              Margins
            </div>
            <div style={{ fontFamily: serif, fontSize: 19, color: "#2d2a26", marginTop: 6, lineHeight: 1.2 }}>
              ขอบกระดาษ<br />ตามมาตรฐานสากล
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── Variant C: Literary Stack ─────────────────────────── */
function HeroC() {
  const serif = "'Newsreader', 'Cormorant Garamond', serif";
  const sans = "'Sarabun', 'IBM Plex Sans', sans-serif";
  const accent = "#9B8AC4";

  return (
    <div style={{
      width: 1440, height: 900,
      background: "#FAF6EC",
      color: "#2d2a26",
      position: "relative", overflow: "hidden",
      fontFamily: sans,
    }}>
      {/* Paper grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(#3d3d3d08 1px, transparent 1px)",
        backgroundSize: "100% 32px",
        maskImage: "linear-gradient(180deg, transparent 0%, black 30%, black 70%, transparent 100%)",
      }} />

      <NavBar accent={accent} serif={serif} />

      {/* Center hero */}
      <div style={{ textAlign: "center", paddingTop: 30, position: "relative", zIndex: 2 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5,
          letterSpacing: "0.22em", textTransform: "uppercase", color: "#9b8aa4",
        }}>
          <span style={{ width: 28, height: 1, background: "#9b8aa4" }} />
          Est. 2021 · Bangkok
          <span style={{ width: 28, height: 1, background: "#9b8aa4" }} />
        </div>

        <h1 style={{
          fontFamily: serif, fontWeight: 400,
          fontSize: 132, lineHeight: 0.95, letterSpacing: "-0.04em",
          margin: "24px auto 0", color: "#2d2a26", maxWidth: 1100,
        }}>
          เรื่องของคุณ <em style={{ color: "#c08293", fontStyle: "italic", fontWeight: 400 }}>สมควร</em><br />
          อยู่บนหน้ากระดาษ<br />
          ที่งดงาม
        </h1>

        <p style={{
          margin: "32px auto 0", maxWidth: 620,
          fontSize: 18, lineHeight: 1.65, color: "#5a554f", fontWeight: 300,
        }}>
          จัดรูปเล่มนิยายมืออาชีพ — สำหรับพิมพ์, e-book และประกอบปก
          ด้วยความเอาใจใส่แบบหน้าต่อหน้า
        </p>

        <div style={{ display: "inline-flex", gap: 14, marginTop: 36, alignItems: "center" }}>
          <button style={{
            background: accent, color: "#fff", border: "none",
            padding: "16px 30px", borderRadius: 999,
            fontSize: 15, fontWeight: 500, cursor: "pointer", fontFamily: sans,
            boxShadow: "0 12px 28px -10px " + accent,
          }}>ส่งต้นฉบับ →</button>
          <button style={{
            background: "transparent", color: "#2d2a26",
            border: "none", padding: "16px 22px",
            fontSize: 15, fontWeight: 500, cursor: "pointer", fontFamily: sans,
            display: "inline-flex", alignItems: "center", gap: 8,
          }}>
            <span style={{
              width: 32, height: 32, borderRadius: "50%", border: "1.5px solid #2d2a26",
              display: "inline-grid", placeItems: "center", fontSize: 11,
            }}>▶</span>
            ดูตัวอย่างผลงาน
          </button>
        </div>
      </div>

      {/* Book row at bottom */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        display: "flex", justifyContent: "center", alignItems: "flex-end",
        gap: 14, paddingBottom: 0,
      }}>
        {[
          { w: 120, h: 170, tone: "lavender", label: "ดอกไม้แห้ง", sub: "Novel" },
          { w: 130, h: 195, tone: "pink", label: "เมื่อฝนหาย", sub: "Novella" },
          { w: 140, h: 220, tone: "cream", label: "บทกวีกลางวัน", sub: "Poetry" },
          { w: 150, h: 250, tone: "blue", label: "ทางที่ไม่เคยเดิน", sub: "Novel" },
          { w: 160, h: 280, tone: "sand", label: "ในสายตาผู้อื่น", sub: "Anthology" },
          { w: 150, h: 250, tone: "mint", label: "ห้องสุดท้าย", sub: "Novel" },
          { w: 140, h: 220, tone: "lavender", label: "คืนใส", sub: "Novella" },
          { w: 130, h: 195, tone: "pink", label: "ระหว่างนั้น", sub: "Novel" },
          { w: 120, h: 170, tone: "cream", label: "เงาบาง", sub: "Short" },
        ].map((b, i) => (
          <PlaceholderBookCover key={i} {...b} />
        ))}
      </div>

      {/* Marquee strip */}
      <div style={{
        position: "absolute", bottom: 295, left: 0, right: 0,
        borderTop: "1px solid #E8DFD0", borderBottom: "1px solid #E8DFD0",
        padding: "10px 0", background: "#FAF6EC",
        fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5,
        color: "#6B6B6B", letterSpacing: "0.24em", textTransform: "uppercase",
        textAlign: "center",
      }}>
        Press-ready PDF · ePub 3.0 · Cover Assembly · InDesign CC · Claudia New 16pt · PDF/X-1a:2001
      </div>
    </div>
  );
}

Object.assign(window, { HeroA, HeroB, HeroC });
