import { useState, useEffect, useRef } from "react";
import { SKILLS } from "../constants/data";

// ── MAGNETIC CARD — skill tag with 3D tilt + cursor glow ─────────────────────
function MagneticCard({ T, skill }) {
  const ref = useRef(null);
  const [hov, setHov]   = useState(false);
  const [glow, setGlow] = useState({ x:50, y:50 });
  const [tilt, setTilt] = useState({ x:0, y:0 });

  const onMove = e => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top)  / r.height;
    setGlow({ x: px * 100, y: py * 100 });
    setTilt({ x: (py - 0.5) * -14, y: (px - 0.5) * 14 });
  };

  return (
    <div
      ref={ref}
      data-hover
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setTilt({ x:0, y:0 }); }}
      onMouseMove={onMove}
      style={{
        padding:"9px 18px",
        border:`1px solid ${hov ? T.accent : T.border}`,
        background: hov ? T.accentDim : "transparent",
        position:"relative", overflow:"hidden",
        cursor:"default",
        transform:`perspective(400px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition:"border-color .2s, background .2s, box-shadow .25s, transform .08s",
        boxShadow: hov ? `0 0 24px ${T.accent}28, inset 0 0 16px ${T.accent}0a` : "none",
        willChange:"transform",
      }}
    >
      {hov && (
        <div style={{
          position:"absolute", width:100, height:100,
          borderRadius:"50%",
          background:`radial-gradient(circle, ${T.accent}38 0%, transparent 70%)`,
          pointerEvents:"none",
          left:`calc(${glow.x}% - 50px)`,
          top:`calc(${glow.y}% - 50px)`,
        }}/>
      )}
      <span style={{
        fontFamily:"'DM Sans',sans-serif",
        fontSize:"clamp(9px,0.85vw,11px)", fontWeight:400,
        letterSpacing:"0.13em", textTransform:"uppercase",
        color: hov ? T.accent : T.fgMid,
        position:"relative", zIndex:1,
        transition:"color .2s",
      }}>{skill}</span>
    </div>
  );
}

// ── SKILLS — Sticky scroll + magnetic cards + glow ───────────────────────────
export default function Skills({ T }) {
  const sectionRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const cats = Object.keys(SKILLS);
  const N    = cats.length;

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect     = el.getBoundingClientRect();
      const progress = -rect.top / (rect.height - window.innerHeight);
      setActiveIdx(Math.max(0, Math.min(N - 1, Math.floor(progress * N))));
    };
    window.addEventListener("scroll", onScroll, { passive:true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [N]);

  const cat    = cats[activeIdx];
  const skills = SKILLS[cat];

  return (
    <section ref={sectionRef} id="skills" style={{ height:`${(N + 0.5) * 100}vh` }}>
      <style>{`@keyframes rd-skill-in { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }`}</style>

      <div style={{
        position:"sticky", top:0, height:"100vh",
        display:"grid", gridTemplateColumns:"1fr 1.7fr",
        overflow:"hidden", background:T.bg,
      }}>

        {/* ── LEFT PANEL ── */}
        <div style={{
          borderRight:`1px solid ${T.border}`,
          display:"flex", flexDirection:"column",
          justifyContent:"space-between",
          padding:"72px 48px",
        }}>
          <div>
            <div style={{
              fontFamily:"'DM Sans',sans-serif", fontSize:9,
              letterSpacing:"0.26em", textTransform:"uppercase",
              color:T.accent, marginBottom:24,
            }}>Technologies & Tools</div>
            <div style={{
              fontFamily:"'Cormorant Garamond',serif",
              fontSize:"clamp(52px,6vw,88px)",
              fontWeight:300, color:T.fg,
              letterSpacing:"-0.03em", lineHeight:0.9,
              userSelect:"none",
            }}>SKILLS</div>
          </div>

          {/* Category list with animated active indicator */}
          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
            {cats.map((c, i) => (
              <div key={c} style={{
                display:"flex", alignItems:"center", gap:14,
                opacity: i === activeIdx ? 1 : 0.28,
                transition:"opacity .4s",
              }}>
                <div style={{
                  width: i === activeIdx ? 28 : 8, height:1,
                  background:T.accent,
                  transition:"width .4s cubic-bezier(.16,1,.3,1)",
                  flexShrink:0,
                }}/>
                <span style={{
                  fontFamily:"'DM Sans',sans-serif", fontSize:10,
                  letterSpacing:"0.15em", textTransform:"uppercase",
                  color: i === activeIdx ? T.accent : T.fgDim,
                  transition:"color .4s",
                }}>{c}</span>
              </div>
            ))}
          </div>

          {/* Big index number */}
          <div style={{
            fontFamily:"'Cormorant Garamond',serif",
            fontSize:"clamp(64px,8vw,110px)",
            fontWeight:300, color:T.border,
            lineHeight:1, letterSpacing:"-0.04em",
            userSelect:"none",
          }}>0{activeIdx + 1}</div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div style={{
          padding:"72px 56px",
          display:"flex", flexDirection:"column", justifyContent:"center",
        }}>
          <div key={cat} style={{ animation:"rd-skill-in .5s cubic-bezier(.16,1,.3,1) both" }}>
            <h2 style={{
              fontFamily:"'Cormorant Garamond',serif",
              fontSize:"clamp(44px,5.5vw,80px)",
              fontWeight:300, fontStyle:"italic",
              color:T.fg, margin:"0 0 44px",
              letterSpacing:"-0.025em", lineHeight:1.0,
            }}>{cat}</h2>

            <div style={{ display:"flex", flexWrap:"wrap", gap:"12px 14px" }}>
              {skills.map((s, si) => (
                <div key={s} style={{ animation:`rd-skill-in .4s cubic-bezier(.16,1,.3,1) ${si * 0.04}s both` }}>
                  <MagneticCard T={T} skill={s} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
