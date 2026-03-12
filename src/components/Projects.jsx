import { useState, useEffect, useRef } from "react";
import { PROJECTS } from "../constants/data";

export default function Projects({ T }) {
  const wrapRef  = useRef(null);
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const N = PROJECTS.length;

  useEffect(() => {
    const onScroll = () => {
      const wrap  = wrapRef.current;
      const track = trackRef.current;
      if (!wrap || !track) return;
      const { top } = wrap.getBoundingClientRect();
      const scrolled = -top;
      const range    = wrap.offsetHeight - window.innerHeight;
      if (range <= 0) return;
      const t        = Math.max(0, Math.min(1, scrolled / range));
      const rawIdx   = t * (N - 1);
      // Direct DOM manipulation — no React re-render lag
      track.style.transform = `translateX(-${rawIdx * (100 / N)}%)`;
      setActive(Math.round(rawIdx));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [N]);

  return (
    <section id="work">
      {/* Sticky carousel */}
      <div ref={wrapRef} style={{ height:`${(N + 1.5) * 100}vh` }}>
        <div style={{ position:"sticky", top:0, height:"100vh", overflow:"hidden" }}>

          {/* Section label — top left */}
          <div style={{
            position:"absolute", top:40, left:48, zIndex:10,
            fontFamily:"'DM Sans',sans-serif", fontSize:9, fontWeight:400,
            letterSpacing:"0.22em", textTransform:"uppercase", color:T.accent,
          }}>Selected Work</div>

          {/* Counter — top right */}
          <div style={{
            position:"absolute", top:38, right:48, zIndex:10,
            fontFamily:"'Cormorant Garamond',serif", fontSize:14,
            fontStyle:"italic", color:T.fgDim,
          }}>
            {String(active + 1).padStart(2,"0")} / {String(N).padStart(2,"0")}
          </div>

          {/* Progress dots — bottom center */}
          <div style={{
            position:"absolute", bottom:40, left:"50%",
            transform:"translateX(-50%)", display:"flex", gap:8, zIndex:10,
          }}>
            {PROJECTS.map((_, i) => (
              <div key={i} style={{
                width: i === active ? 28 : 8, height:2,
                background: i === active ? T.accent : T.borderMid,
                transition:"width .4s cubic-bezier(.4,0,.2,1), background .3s",
              }}/>
            ))}
          </div>

          {/* Horizontal track */}
          <div ref={trackRef} style={{
            display:"flex", width:`${N * 100}%`, height:"100%",
            willChange:"transform",
          }}>
            {PROJECTS.map((proj, i) => (
              <div key={i} style={{
                width:`${100 / N}%`, height:"100%",
                display:"grid", gridTemplateColumns:"1fr 1fr",
                alignItems:"center", gap:"6vw",
                padding:"0 8vw", boxSizing:"border-box",
              }}>
                {/* Left — number + name */}
                <div>
                  <div style={{
                    fontFamily:"'Cormorant Garamond',serif",
                    fontSize:"clamp(80px,13vw,180px)",
                    fontWeight:300, color:T.border, lineHeight:0.85,
                    letterSpacing:"-0.05em", userSelect:"none",
                  }}>{proj.num}</div>
                  <h2 style={{
                    fontFamily:"'Cormorant Garamond',serif",
                    fontSize:"clamp(32px,4.5vw,64px)",
                    fontWeight:300, color:T.fg,
                    margin:"0 0 10px", letterSpacing:"-0.02em", lineHeight:1.0,
                  }}>{proj.name}</h2>
                  <div style={{
                    fontFamily:"'DM Sans',sans-serif", fontSize:12,
                    fontWeight:300, color:T.fgMid, marginBottom:16,
                  }}>{proj.sub}</div>
                  <div style={{ display:"flex", gap:16, alignItems:"center" }}>
                    <span style={{
                      fontFamily:"'DM Sans',sans-serif", fontSize:9,
                      color:T.accent, letterSpacing:"0.16em", textTransform:"uppercase",
                    }}>{proj.type}</span>
                    <span style={{ width:20, height:1, background:T.borderMid, display:"block" }}/>
                    <span style={{
                      fontFamily:"'DM Sans',sans-serif", fontSize:9,
                      color:T.fgDim, letterSpacing:"0.1em",
                    }}>{proj.year}</span>
                  </div>
                </div>

                {/* Right — description + tech + link */}
                <div>
                  <p style={{
                    fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:300,
                    color:T.fgMid, lineHeight:1.85, margin:"0 0 28px", maxWidth:500,
                  }}>{proj.desc}</p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:36 }}>
                    {proj.tech.map(t => (
                      <span key={t} style={{
                        fontFamily:"'DM Sans',sans-serif", fontSize:9,
                        letterSpacing:"0.12em", textTransform:"uppercase",
                        color:T.accent, border:`1px solid ${T.accent}`,
                        padding:"4px 10px", opacity:0.7,
                      }}>{t}</span>
                    ))}
                  </div>
                  <a href={proj.href} target="_blank" rel="noreferrer" data-hover style={{
                    display:"inline-flex", alignItems:"center", gap:10,
                    fontFamily:"'DM Sans',sans-serif", fontSize:11,
                    letterSpacing:"0.14em", textTransform:"uppercase",
                    color:T.fgMid, textDecoration:"none",
                    borderBottom:`1px solid ${T.borderMid}`, paddingBottom:4,
                    transition:"color .2s, border-color .2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color=T.accent; e.currentTarget.style.borderColor=T.accent; }}
                  onMouseLeave={e => { e.currentTarget.style.color=T.fgMid; e.currentTarget.style.borderColor=T.borderMid; }}
                  >View on GitHub ↗</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
