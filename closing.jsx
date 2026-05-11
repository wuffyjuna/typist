/* global React */
/* Bookbind Studio — Why Us + Process sections */

(function () {
  const { BB, SERIF, SANS, MONO, SectionLabel } = window;
  const CONTACT_EMAIL = "hello@bookbind.studio";

  /* ─────────────────────────── WHY US (2x2) ─────────────────────────── */
  function WhyUs() {
    const reasons = [
      {
        icon: "✦",
        tone: BB.lav,
        bg: "#EBE5F5",
        title: "ละเอียด แม่นยำ",
        body: "จัดหน้าด้วย InDesign CC ตามมาตรฐานสำนักพิมพ์ ทั้ง bleed, margin, gutter และ widow/orphan control",
        meta: "InDesign CC · PDF/X-1a:2001",
      },
      {
        icon: "◷",
        tone: BB.pink,
        bg: "#FBE6EA",
        title: "ส่งตรงเวลา",
        body: "ส่งมอบภายใน 7–10 วันมาตรฐาน หรือด่วนพิเศษ 3 วัน พร้อมรายงานความคืบหน้าระหว่างทาง",
        meta: "Status update ทุก 2–3 วัน",
      },
      {
        icon: "✎",
        tone: BB.blue,
        bg: "#DDEAF3",
        title: "สื่อสารชัดเจน",
        body: "คุยกันได้ตลอด เปลี่ยนได้ระหว่างทาง และมีรอบแก้ฟรี 2 รอบหลังส่งมอบ ไม่ต้องเกรงใจ",
        meta: "Line · Email · DM ตามสะดวก",
      },
      {
        icon: "❦",
        tone: "#5fa37a",
        bg: "#DEEEE3",
        title: "เข้าใจวรรณกรรม",
        body: "เราอ่านงานคุณก่อนจัด เพื่อให้ typography กับจังหวะการอ่านส่งเสริมเรื่อง ไม่ใช่แค่จัดหน้าให้สวย",
        meta: "Read-first workflow",
      },
    ];

    return (
      <section id="why-us" style={{
        background: "#FAF6EC",
        padding: "100px 64px 96px",
        position: "relative",
        fontFamily: SANS,
        color: BB.ink,
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionLabel num="03" label="Why Bookbind" />

          <div style={{
            marginTop: 18,
            display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 60,
            alignItems: "end",
          }}>
            <h2 style={{
              fontFamily: SERIF, fontWeight: 400,
              fontSize: 64, lineHeight: 1.02, letterSpacing: "-0.025em",
              margin: 0, color: BB.ink,
            }}>
              ทำงานด้วยมาตรฐานสากล<br />
              ใส่ใจแบบ <em style={{ fontStyle: "italic", color: BB.lav }}>หน้าต่อหน้า</em>
            </h2>
            <p style={{
              margin: 0, maxWidth: 460, fontSize: 16.5, lineHeight: 1.7, color: BB.ink2,
            }}>
              สี่เหตุผลที่นักเขียนเลือกให้ Bookbind ดูแลต้นฉบับ —
              ไม่ใช่เพราะเราถูกที่สุด แต่เพราะเราใส่ใจกับสิ่งที่คุณใส่ใจ
            </p>
          </div>

          <div style={{
            marginTop: 56,
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24,
          }}>
            {reasons.map((r, i) => (
              <div key={i} style={{
                background: "#fff",
                borderRadius: 24,
                padding: "36px 36px 32px",
                boxShadow: "0 6px 24px -14px rgba(60,40,40,0.18)",
                border: "1px solid " + BB.line,
                position: "relative", overflow: "hidden",
                display: "flex", flexDirection: "column", gap: 20,
              }}>
                <div style={{
                  position: "absolute", top: -40, right: -40,
                  width: 160, height: 160, borderRadius: "50%",
                  background: r.bg, opacity: 0.6,
                }} />

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
                              position: "relative", zIndex: 1 }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: 16,
                    background: r.bg,
                    display: "grid", placeItems: "center",
                    fontFamily: SERIF, fontSize: 28, color: r.tone, lineHeight: 1,
                  }}>{r.icon}</div>
                  <div style={{
                    fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.2em",
                    textTransform: "uppercase", color: BB.mute,
                  }}>0{i + 1}</div>
                </div>

                <div style={{ position: "relative", zIndex: 1 }}>
                  <h3 style={{
                    fontFamily: "'Playpen Sans Thai', " + SANS,
                    fontWeight: 600, fontSize: 24, margin: 0, color: BB.ink,
                  }}>{r.title}</h3>
                  <p style={{
                    margin: "12px 0 0", fontSize: 15.5, lineHeight: 1.65, color: BB.ink2,
                  }}>{r.body}</p>
                </div>

                <div style={{
                  marginTop: "auto", paddingTop: 18,
                  borderTop: "1px dashed " + BB.line,
                  fontFamily: MONO, fontSize: 11, letterSpacing: "0.14em",
                  textTransform: "uppercase", color: BB.mute,
                }}>{r.meta}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ─────────────────────────── PROCESS (5 steps) ─────────────────────────── */
  function Process() {
    const steps = [
      { num: "01", title: "ส่งต้นฉบับ", body: "ส่ง .docx หรือ .pdf พร้อมโจทย์สั้นๆ", time: "Day 0" },
      { num: "02", title: "เสนอราคา & วางมัดจำ", body: "ยืนยันสเปก ขนาด ฟอนต์ จองคิว มัดจำ 50%", time: "Day 1–2" },
      { num: "03", title: "จัดรูปเล่ม", body: "เราลงมือจัดหน้า ส่งพรีวิวระหว่างทาง", time: "Day 3–9" },
      { num: "04", title: "ตรวจสอบ & แก้ไข", body: "คุณรีวิว แก้ได้ฟรี 2 รอบ", time: "Day 10–11" },
      { num: "05", title: "ชำระงวดสุดท้าย & รับงาน", body: "ปิดยอด 50% รับไฟล์ press-ready/ePub", time: "Day 12" },
    ];

    return (
      <section id="process" style={{
        background: "linear-gradient(180deg, #FAF6EC 0%, #F5EFE0 100%)",
        padding: "100px 64px 96px",
        position: "relative",
        fontFamily: SANS,
        color: BB.ink,
        overflow: "hidden",
      }}>
        {/* deco */}
        <div style={{
          position: "absolute", right: -120, top: 60,
          width: 280, height: 280, borderRadius: "50%",
          background: "radial-gradient(closest-side, " + BB.blueSoft + "aa, transparent)",
        }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
          <SectionLabel num="05" label="Process · 5 steps" />

          <div style={{
            marginTop: 18,
            display: "flex", alignItems: "end", justifyContent: "space-between", gap: 40,
          }}>
            <h2 style={{
              fontFamily: "'Playpen Sans Thai', " + SANS, fontWeight: 600,
              fontSize: 56, lineHeight: 1.05, letterSpacing: "-0.02em",
              margin: 0, color: BB.ink, maxWidth: 720,
            }}>
              จากต้นฉบับ <em style={{ fontStyle: "italic", color: BB.pink }}>ถึงเล่มจริง</em><br />
              ประมาณ 12 วัน
            </h2>
            <div style={{
              fontFamily: MONO, fontSize: 12, letterSpacing: "0.18em",
              textTransform: "uppercase", color: BB.mute, textAlign: "right",
            }}>
              Standard timeline<br />
              <span style={{ color: BB.ink, opacity: 0.6 }}>หรือด่วน 3 วัน</span>
            </div>
          </div>

          {/* Timeline */}
          <div style={{ position: "relative", marginTop: 72 }}>
            {/* Track */}
            <div style={{
              position: "absolute", left: "5%", right: "5%", top: 36,
              height: 2, background: BB.line, borderRadius: 2,
            }} />
            <div style={{
              position: "absolute", left: "5%", top: 36,
              width: "78%", height: 2,
              background: "linear-gradient(90deg," + BB.lav + "," + BB.pink + "," + BB.mint + ")",
              borderRadius: 2,
            }} />

            <div style={{
              display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16,
              position: "relative",
            }}>
              {steps.map((s, i) => {
                const dotColors = [BB.lav, BB.pink, BB.blue, "#cc8a6e", "#3f8a5a"];
                const c = dotColors[i];
                return (
                  <div key={i} style={{
                    display: "flex", flexDirection: "column", alignItems: "center",
                    textAlign: "center",
                  }}>
                    <div style={{
                      width: 72, height: 72, borderRadius: "50%",
                      background: "#fff",
                      border: "2px solid " + c,
                      display: "grid", placeItems: "center",
                      boxShadow: "0 8px 22px -10px " + c,
                      position: "relative", zIndex: 2,
                    }}>
                      <div style={{
                        fontFamily: "'Playpen Sans Thai', " + SANS,
                        fontWeight: 600, fontSize: 22, color: c, lineHeight: 1,
                      }}>{s.num}</div>
                    </div>

                    <div style={{
                      marginTop: 14,
                      fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.18em",
                      textTransform: "uppercase", color: c, opacity: 0.85,
                    }}>{s.time}</div>

                    <div style={{
                      marginTop: 10,
                      fontFamily: "'Playpen Sans Thai', " + SANS,
                      fontWeight: 600, fontSize: 18, color: BB.ink, lineHeight: 1.25,
                    }}>{s.title}</div>

                    <div style={{
                      marginTop: 8, fontSize: 13.5, lineHeight: 1.55,
                      color: BB.ink2, maxWidth: 180,
                    }}>{s.body}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ─────────────────────────── TERMS / WORKFLOW ─────────────────────────── */
  function Terms() {
    const rounds = [
      {
        tag: "Round 1",
        chip: "ดราฟอาร์ตเวิร์ค",
        chipBg: "#EBE5F5",
        chipFg: BB.lav,
        title: "ตรวจฟอนต์ + หน้าเปิดบท",
        body: "ก่อนเริ่มจัดทั้งเล่ม เราจะส่งดราฟอาร์ตเวิร์คให้คุณตรวจฟอนต์และหน้าเปิดหัวบทก่อน เมื่อคอนเฟิร์มแล้ว เราจะเริ่มจัดทั้งเล่ม",
      },
      {
        tag: "Round 2",
        chip: "ส่งทั้งเล่ม · มีลายน้ำ",
        chipBg: "#FBE6EA",
        chipFg: BB.pink,
        title: "ตรวจบรูฟทั้งเล่ม",
        body: "เราส่งงานทั้งเล่มแบบมีลายน้ำให้ตรวจ โดยเราตรวจสอบคำตัด·คำฉีกให้แล้วชั้นหนึ่ง คุณสามารถวงแก้ในไฟล์ PDF หรือพิมพ์บรูฟแล้วส่ง PDF กลับมาก็ได้ ดังนั้นไฟล์ต้นฉบับที่ส่งมาจัดควรเป็นไฟล์ที่สมบูรณ์ 100% และผ่านการบรูฟแล้ว เพื่อให้การทำงานราบรื่นที่สุด",
        note: "หากมีการแก้ไขเยอะ ทางร้านขอคิดค่าแก้ไขเพิ่มเติมตามดุลยพินิจ",
      },
      {
        tag: "Round 3",
        chip: "ตรวจครั้งสุดท้าย",
        chipBg: "#DEEEE3",
        chipFg: "#3f8a5a",
        title: "คอนเฟิร์ม · ปิดยอด · รับไฟล์",
        body: "เมื่อแก้ไขครบ เราส่งให้ตรวจรอบสุดท้าย เมื่อคอนเฟิร์มแล้วและชำระเงินส่วนที่เหลือ เราจะส่งไฟล์งานให้ทันที",
        note: "หลังคอนเฟิร์มรอบนี้ การแก้ไขทุกกรณีจะมีค่าใช้จ่ายเพิ่ม",
      },
    ];

    const freebies = [
      {
        icon: "❋",
        title: "คำนวณหน้าให้ลงยก",
        body: "คำนวณจำนวนหน้าให้พอดี 8 / 16 / 32 หน้าต่อยกพิมพ์ พร้อมส่งโรงพิมพ์ — ฟรี",
      },
      {
        icon: "❋",
        title: "ปรับสัน 1 ครั้ง",
        body: "เมื่อได้ขนาดสันที่แท้จริงจากโรงพิมพ์ เราปรับสันให้พอดีอีก 1 ครั้ง — ฟรี",
      },
    ];

    return (
      <section id="terms" style={{
        background: BB.paper,
        padding: "100px 64px 96px",
        fontFamily: SANS, color: BB.ink,
        position: "relative",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionLabel num="06" label="Workflow & Terms" />

          <div style={{
            marginTop: 18,
            display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 60, alignItems: "end",
          }}>
            <h2 style={{
              fontFamily: "'Playpen Sans Thai', " + SANS, fontWeight: 600,
              fontSize: 52, lineHeight: 1.05, letterSpacing: "-0.02em",
              margin: 0, color: BB.ink,
            }}>
              ข้อตกลง <em style={{ fontStyle: "italic", color: BB.blue }}>การส่งงานและการแก้ไข</em>
            </h2>
            <p style={{
              margin: 0, maxWidth: 460, fontSize: 16, lineHeight: 1.7, color: BB.ink2,
            }}>
              เพื่อให้งานเดินหน้าราบรื่นและทุกฝ่ายเข้าใจตรงกัน
              เราแบ่งการส่งงานเป็น 3 รอบ พร้อมบริการพิเศษอีก 2 รายการแถมฟรี
            </p>
          </div>

          {/* 3 rounds */}
          <div style={{
            marginTop: 56, display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)", gap: 24,
          }}>
            {rounds.map((r, i) => (
              <div key={i} style={{
                background: "#fff",
                borderRadius: 22, padding: "28px 28px 26px",
                border: "1px solid " + BB.line,
                boxShadow: "0 6px 24px -16px rgba(60,40,40,0.18)",
                display: "flex", flexDirection: "column", gap: 14,
                position: "relative",
              }}>
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                  <span style={{
                    background: r.chipBg, color: r.chipFg,
                    padding: "6px 12px", borderRadius: 999,
                    fontFamily: MONO, fontSize: 10.5,
                    letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 500,
                  }}>{r.chip}</span>
                  <span style={{
                    fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.2em",
                    color: BB.mute, textTransform: "uppercase",
                  }}>{r.tag}</span>
                </div>

                <h3 style={{
                  fontFamily: "'Playpen Sans Thai', " + SANS,
                  fontWeight: 600, fontSize: 22, margin: 0, color: BB.ink, lineHeight: 1.25,
                }}>{r.title}</h3>

                <p style={{
                  margin: 0, fontSize: 15, lineHeight: 1.7, color: BB.ink2,
                }}>{r.body}</p>

                {r.note && (
                  <div style={{
                    marginTop: "auto", paddingTop: 14, borderTop: "1px dashed " + BB.line,
                    display: "flex", gap: 10, alignItems: "flex-start",
                    fontSize: 13, lineHeight: 1.55, color: BB.mute,
                  }}>
                    <span style={{
                      color: r.chipFg, fontSize: 15, lineHeight: 1, marginTop: 1,
                    }}>※</span>
                    <span>{r.note}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Payment + Freebies */}
          <div style={{
            marginTop: 36, display: "grid",
            gridTemplateColumns: "1fr 1.4fr", gap: 24,
          }}>
            {/* Payment strip */}
            <div style={{
              background: BB.ink, color: BB.cream,
              borderRadius: 22, padding: "28px 30px",
              display: "flex", flexDirection: "column", gap: 18,
              position: "relative", overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", right: -60, top: -60,
                width: 200, height: 200, borderRadius: "50%",
                background: "radial-gradient(closest-side, " + BB.lav + "55, transparent 70%)",
              }} />
              <div style={{
                fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.22em",
                textTransform: "uppercase", opacity: 0.55, position: "relative",
              }}>Payment</div>
              <div style={{ display: "flex", gap: 20, position: "relative" }}>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: "'Playpen Sans Thai', " + SANS,
                    fontSize: 38, fontWeight: 600, lineHeight: 1,
                  }}>50<span style={{ fontSize: 22, opacity: 0.7 }}>%</span></div>
                  <div style={{ fontSize: 12.5, opacity: 0.7, marginTop: 8 }}>
                    มัดจำเมื่อยืนยันงาน
                  </div>
                </div>
                <div style={{ width: 1, background: BB.cream + "33" }} />
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: "'Playpen Sans Thai', " + SANS,
                    fontSize: 38, fontWeight: 600, lineHeight: 1,
                  }}>50<span style={{ fontSize: 22, opacity: 0.7 }}>%</span></div>
                  <div style={{ fontSize: 12.5, opacity: 0.7, marginTop: 8 }}>
                    ก่อนส่งไฟล์งานจริง
                  </div>
                </div>
              </div>
            </div>

            {/* Free services */}
            <div style={{
              background: "linear-gradient(135deg, " + BB.cream + " 0%, " + BB.cream2 + " 100%)",
              borderRadius: 22, padding: "28px 30px",
              border: "1px solid " + BB.line,
              display: "flex", flexDirection: "column", gap: 18,
            }}>
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <div style={{
                  fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.22em",
                  textTransform: "uppercase", color: BB.mute,
                }}>Free add-ons</div>
                <span style={{
                  fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.18em",
                  textTransform: "uppercase", color: "#3f8a5a", fontWeight: 600,
                }}>ฟรีทุกงาน</span>
              </div>
              <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24,
              }}>
                {freebies.map((f, i) => (
                  <div key={i} style={{
                    display: "flex", gap: 14, alignItems: "flex-start",
                  }}>
                    <div style={{
                      width: 38, height: 38, borderRadius: 12,
                      background: "#fff", border: "1px solid " + BB.line,
                      display: "grid", placeItems: "center",
                      fontFamily: SERIF, fontSize: 20, color: "#3f8a5a",
                      flexShrink: 0,
                    }}>{f.icon}</div>
                    <div>
                      <div style={{
                        fontFamily: "'Playpen Sans Thai', " + SANS,
                        fontWeight: 600, fontSize: 16.5, color: BB.ink, lineHeight: 1.3,
                      }}>{f.title}</div>
                      <div style={{
                        marginTop: 6, fontSize: 13.5, lineHeight: 1.6, color: BB.ink2,
                      }}>{f.body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ─────────────────────────── BLOG (teasers) ─────────────────────────── */
  function Blog() {
    const posts = [
      {
        tag: "Typography",
        title: "เลือกฟอนต์นิยายอย่างไรให้โรงพิมพ์ไม่บ่น",
        excerpt: "เช็กลิสต์สิทธิ์การใช้งาน การเว้นวรรค และขนาดบรรทัดที่อ่านสบายบนกระดาษ A5 / A6",
      },
      {
        tag: "e-Book",
        title: "ePub 3.0 กับ Kindle: สิ่งที่นักเขียนควรรู้ก่อนส่งไฟล์",
        excerpt: "Reflowable vs fixed layout และจุดที่มักทำให้สารบัญเพี้ยนบนเครื่องอ่านจริง",
      },
      {
        tag: "Workflow",
        title: "เตรียมต้นฉบับก่อนจัดรูปเล่มให้ครบในสองรอบแก้",
        excerpt: "ทำไมการบรูฟจากนักเขียนก่อนส่งงานถึงช่วยประหยัดเวลาและค่าแก้รอบหลัง",
      },
    ];

    return (
      <section id="blog" style={{
        background: "linear-gradient(180deg, " + BB.cream2 + " 0%, " + BB.paper + " 100%)",
        padding: "100px 64px 96px",
        fontFamily: SANS,
        color: BB.ink,
        position: "relative",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionLabel num="08" label="บล็อก · บทความ" color={BB.lav} />

          <div style={{
            marginTop: 18,
            display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 48, alignItems: "end",
          }}>
            <h2 style={{
              fontFamily: "'Playpen Sans Thai', " + SANS, fontWeight: 600,
              fontSize: 48, lineHeight: 1.1, letterSpacing: "-0.02em",
              margin: 0, color: BB.ink,
            }}>
              เคล็ดจัดเล่ม<br />
              <span style={{ color: BB.blue }}>สำหรับนักเขียน</span>
            </h2>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.65, color: BB.ink2, maxWidth: 420 }}>
              อัปเดตเป็นครั้งคราว — หากอยากให้เขียนหัวข้อไหนเป็นพิเศษ แจ้งเราได้ที่ช่องทางติดต่อ
            </p>
          </div>

          <div style={{
            marginTop: 48, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22,
          }}>
            {posts.map((p, i) => (
              <article key={i} style={{
                background: "#fff", borderRadius: 20, padding: "28px 26px 24px",
                border: "1px solid " + BB.line,
                boxShadow: "0 6px 22px -14px rgba(60,40,40,0.12)",
                display: "flex", flexDirection: "column", gap: 12, minHeight: 220,
              }}>
                <span style={{
                  fontFamily: MONO, fontSize: 10, letterSpacing: "0.18em",
                  textTransform: "uppercase", color: BB.mute,
                }}>{p.tag}</span>
                <h3 style={{
                  fontFamily: "'Playpen Sans Thai', " + SANS, fontWeight: 600,
                  fontSize: 18, lineHeight: 1.35, margin: 0, color: BB.ink,
                }}>{p.title}</h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: BB.ink2, flex: 1 }}>
                  {p.excerpt}
                </p>
                <a href="#contact" style={{
                  fontSize: 13.5, fontWeight: 500, color: BB.lav,
                  textDecoration: "none", marginTop: 4,
                  display: "inline-flex", alignItems: "center", gap: 6,
                }}>
                  ติดต่อ / ขอลิงก์บทความเต็ม <span>→</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ─────────────────────────── CONTACT ─────────────────────────── */
  function Contact() {
    function onSubmit(e) {
      e.preventDefault();
      const fd = new FormData(e.target);
      const name = String(fd.get("name") || "").trim();
      const email = String(fd.get("email") || "").trim();
      const message = String(fd.get("message") || "").trim();
      const subject = encodeURIComponent("[Bookbind Studio] สอบถามจาก " + (name || "เว็บไซต์"));
      const body = encodeURIComponent(
        (name ? "ชื่อ: " + name + "\n" : "") +
        (email ? "อีเมล: " + email + "\n\n" : "\n") +
        (message || "(ไม่มีข้อความ)")
      );
      window.location.href = "mailto:" + CONTACT_EMAIL + "?subject=" + subject + "&body=" + body;
    }

    return (
      <section id="contact" style={{
        background: BB.paper,
        padding: "100px 64px 96px",
        fontFamily: SANS,
        color: BB.ink,
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionLabel num="09" label="ติดต่อเรา" color={BB.pink} />

          <div style={{
            marginTop: 18,
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "start",
          }}>
            <div>
              <h2 style={{
                fontFamily: "'Playpen Sans Thai', " + SANS, fontWeight: 600,
                fontSize: 44, lineHeight: 1.12, letterSpacing: "-0.02em",
                margin: 0, color: BB.ink,
              }}>
                ส่งต้นฉบับหรือสอบถาม<br />
                <span style={{ color: BB.pink }}>เราตอบภายใน 24 ชม.</span>
              </h2>
              <p style={{ margin: "18px 0 0", fontSize: 15.5, lineHeight: 1.65, color: BB.ink2, maxWidth: 420 }}>
                กรอกแบบฟอร์มด้านขวาแล้วกดส่ง — จะเปิดโปรแกรมอีเมลของคุณพร้อมข้อความ
                หรือคัดลอกอีเมลด้านล่างไปใช้ได้เลย
              </p>
              <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 12 }}>
                <a href={"mailto:" + CONTACT_EMAIL} style={{
                  fontFamily: MONO, fontSize: 14, color: BB.ink, textDecoration: "none",
                  borderBottom: "1px solid " + BB.line, paddingBottom: 4, display: "inline-block", width: "fit-content",
                }}>{CONTACT_EMAIL}</a>
                <a href="https://line.me/ti/p/~@bookbindstudio" target="_blank" rel="noopener noreferrer" style={{
                  fontSize: 14.5, color: BB.ink2, textDecoration: "none",
                }}>
                  Line Official <span style={{ color: BB.lav }}>→</span> <span style={{ fontFamily: MONO, fontSize: 12, color: BB.mute }}>@bookbindstudio</span>
                </a>
                <span style={{ fontSize: 13, color: BB.mute }}>
                  แก้ ID Line ในไฟล์ closing.jsx ให้ตรงกับบัญชีจริงของคุณ
                </span>
              </div>
            </div>

            <form onSubmit={onSubmit} style={{
              background: "#fff", borderRadius: 22, padding: "32px 28px",
              border: "1px solid " + BB.line,
              boxShadow: "0 8px 28px -16px rgba(60,40,40,0.15)",
              display: "flex", flexDirection: "column", gap: 16,
            }}>
              <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: BB.ink2 }}>ชื่อ / นามปากกา</span>
                <input name="name" type="text" required placeholder="เช่น นามปากกา หรือชื่อจริง"
                       style={{
                         padding: "12px 14px", borderRadius: 12, border: "1px solid " + BB.line,
                         fontFamily: SANS, fontSize: 15, outline: "none",
                       }} />
              </label>
              <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: BB.ink2 }}>อีเมลติดต่อกลับ</span>
                <input name="email" type="email" required placeholder="you@example.com"
                       style={{
                         padding: "12px 14px", borderRadius: 12, border: "1px solid " + BB.line,
                         fontFamily: SANS, fontSize: 15, outline: "none",
                       }} />
              </label>
              <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: BB.ink2 }}>รายละเอียดงาน / คำถาม</span>
                <textarea name="message" rows={5} required placeholder="จำนวนหน้า ประเภทงาน กำหนดส่ง ฯลฯ"
                          style={{
                            padding: "12px 14px", borderRadius: 12, border: "1px solid " + BB.line,
                            fontFamily: SANS, fontSize: 15, outline: "none", resize: "vertical",
                          }} />
              </label>
              <button type="submit" style={{
                marginTop: 4, background: BB.ink, color: "#fff", border: "none",
                padding: "16px 22px", borderRadius: 14, fontFamily: SANS, fontSize: 15,
                fontWeight: 500, cursor: "pointer",
              }}>
                เปิดอีเมลเพื่อส่ง →
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  /* ─────────────────────────── CTA (standalone after Pricing) ─────────────────────────── */
  function CTA() {
    return (
      <section id="cta" style={{
        background: BB.paper,
        padding: "64px 64px 100px",
        fontFamily: SANS,
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{
            background: BB.ink,
            color: BB.cream,
            borderRadius: 28,
            padding: "44px 56px",
            display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 40,
            alignItems: "center",
            boxShadow: "0 30px 60px -30px rgba(40,30,40,0.4)",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", right: -120, top: -120,
              width: 360, height: 360, borderRadius: "50%",
              background: "radial-gradient(closest-side, " + BB.lav + "66, transparent 70%)",
            }} />
            <div style={{
              position: "absolute", left: -60, bottom: -120,
              width: 280, height: 280, borderRadius: "50%",
              background: "radial-gradient(closest-side, " + BB.pink + "55, transparent 70%)",
            }} />

            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{
                fontFamily: MONO, fontSize: 11, letterSpacing: "0.22em",
                textTransform: "uppercase", color: BB.cream, opacity: 0.55,
              }}>Ready when you are</div>
              <h3 style={{
                fontFamily: "'Playpen Sans Thai', " + SANS, fontWeight: 600,
                margin: "14px 0 0",
                fontSize: 44, lineHeight: 1.1, letterSpacing: "-0.02em",
                color: BB.cream,
              }}>
                พร้อมเริ่มเล่มต่อไป <em style={{ fontStyle: "italic", color: BB.pink }}>ของคุณ</em>?
              </h3>
              <p style={{
                margin: "16px 0 0", fontSize: 15.5, lineHeight: 1.65,
                color: BB.cream, opacity: 0.75, maxWidth: 460,
              }}>
                ส่งต้นฉบับมาดูก่อนได้ฟรี เราจะตอบกลับพร้อมประเมินราคาภายใน 24 ชั่วโมง
              </p>
            </div>

            <div style={{
              display: "flex", flexDirection: "column", gap: 12, alignItems: "stretch",
              position: "relative", zIndex: 1,
            }}>
              <a href="#contact" style={{
                background: BB.cream, color: BB.ink, border: "none",
                padding: "18px 28px", borderRadius: 14,
                fontFamily: SANS, fontSize: 15.5, fontWeight: 500, cursor: "pointer",
                display: "inline-flex", alignItems: "center", justifyContent: "space-between",
                textDecoration: "none",
              }}>
                <span>ส่งต้นฉบับ / สอบถาม</span>
                <span style={{ fontSize: 18 }}>→</span>
              </a>
              <a href="#pricing" style={{
                background: "transparent", color: BB.cream,
                border: "1.5px solid " + BB.cream + "55",
                padding: "18px 28px", borderRadius: 14,
                fontFamily: SANS, fontSize: 15.5, fontWeight: 500, cursor: "pointer",
                display: "inline-flex", alignItems: "center", justifyContent: "space-between",
                textDecoration: "none",
              }}>
                <span>คำนวณราคาก่อน</span>
                <span style={{ fontSize: 18, opacity: 0.7 }}>→</span>
              </a>
              <div style={{
                marginTop: 4,
                fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.16em",
                textTransform: "uppercase", color: BB.cream, opacity: 0.5,
                textAlign: "center",
              }}>Line · Email · ส่งไฟล์ได้เลย</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  Object.assign(window, { WhyUs, Process, Terms, Blog, Contact, CTA });
})();
