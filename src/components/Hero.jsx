import { useEffect, useRef } from "react";
import FitText from "./FitText";
import Reveal from "./Reveal";

export default function Hero({ T }) {
  const photoRef = useRef(null);

  useEffect(() => {
    let raf;
    const tick = () => {
      const s = window.scrollY;
      if (photoRef.current) photoRef.current.style.transform = `translateY(${s * 0.08}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section style={{
      minHeight:"100vh", display:"flex", alignItems:"center",
      padding:"0 48px", position:"relative",
      gap:48,
    }}>

      {/* Left — text content */}
      <div style={{ flex:"1 1 0", minWidth:0, display:"flex", flexDirection:"column", justifyContent:"center" }}>

        {/* Vertical label */}
        <Reveal delay={0.1} y={0}>
          <div style={{
            fontFamily:"'DM Sans',sans-serif", fontSize:9, fontWeight:400,
            letterSpacing:"0.28em", textTransform:"uppercase",
            color:T.fgDim, marginBottom:32,
          }}>Data Scientist · AI Engineer · NYU Tandon</div>
        </Reveal>

        {/* Name */}
        <div style={{ marginBottom:40 }}>
          <FitText T={T} italic={false} delay={0.15}>Rekha</FitText>
          <FitText T={T} italic={true}  delay={0.25}>Deenadayal</FitText>
        </div>

        {/* Divider + bio + buttons */}
        <div style={{
          borderTop:`1px solid ${T.border}`, paddingTop:28,
          display:"flex", justifyContent:"space-between", alignItems:"flex-end",
          flexWrap:"wrap", gap:24,
        }}>
          <Reveal delay={0.5} y={12}>
            <p style={{
              fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:300,
              color:T.fgMid, lineHeight:1.9, margin:0, maxWidth:380,
            }}>
              Building production-ready ML systems — from multimodal AI
              and RAG workflows to computer vision and fine-tuned LLMs.
              MS candidate at NYU Tandon.
            </p>
          </Reveal>
          <Reveal delay={0.6} y={12}>
            <div style={{ display:"flex", gap:24, alignItems:"center" }}>
              <a href="#work" data-hover style={{
                fontFamily:"'DM Sans',sans-serif", fontSize:10, fontWeight:500,
                letterSpacing:"0.14em", textTransform:"uppercase",
                color:T.bg, background:T.fg,
                padding:"11px 26px", textDecoration:"none", transition:"opacity .2s",
              }}
              onMouseEnter={e => e.currentTarget.style.opacity=".7"}
              onMouseLeave={e => e.currentTarget.style.opacity="1"}
              >View Work</a>
              <a href="/resume.pdf" target="_blank" data-hover style={{
                fontFamily:"'DM Sans',sans-serif", fontSize:10, fontWeight:400,
                letterSpacing:"0.1em", textTransform:"uppercase",
                color:T.fgMid, textDecoration:"none",
                borderBottom:`1px solid ${T.borderMid}`, paddingBottom:2,
                transition:"color .2s, border-color .2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.color=T.accent; e.currentTarget.style.borderColor=T.accent; }}
              onMouseLeave={e => { e.currentTarget.style.color=T.fgMid; e.currentTarget.style.borderColor=T.borderMid; }}
              >Résumé ↗</a>
            </div>
          </Reveal>
        </div>

        {/* Stats */}
        <Reveal delay={0.75} y={8}>
          <div style={{ display:"flex", gap:40, marginTop:32 }}>
            {[["3+","Yrs industry"],["7","Projects"],["MS","NYU Tandon"]].map(([v,l]) => (
              <div key={l}>
                <div style={{
                  fontFamily:"'Cormorant Garamond',serif", fontSize:24,
                  fontWeight:300, color:T.fg, lineHeight:1, marginBottom:4,
                }}>{v}</div>
                <div style={{
                  fontFamily:"'DM Sans',sans-serif", fontSize:9,
                  letterSpacing:"0.16em", textTransform:"uppercase", color:T.fgDim,
                }}>{l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Right — profile photo */}
      <div ref={photoRef} style={{
        flexShrink:0, width:"clamp(220px,22vw,320px)",
        willChange:"transform",
        alignSelf:"center",
        marginTop:64,
      }}>
        <div style={{
          aspectRatio:"3/4", overflow:"hidden",
          border:`1px solid ${T.borderMid}`,
          position:"relative",
        }}>
          {/* swap with <img src="/profile.jpg" .../> when ready */}
          <div style={{
            position:"absolute", inset:0,
            background:`linear-gradient(160deg, ${T.bg1} 0%, ${T.bg} 100%)`,
            display:"flex", flexDirection:"column",
            alignItems:"center", justifyContent:"center", gap:12,
          }}>
            <div style={{
              width:64, height:64, borderRadius:"50%",
              border:`1px solid ${T.accent}`,
              display:"flex", alignItems:"center", justifyContent:"center",
            }}>
              <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:300, color:T.accent }}>RD</span>
            </div>
            <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:9, letterSpacing:"0.18em", textTransform:"uppercase", color:T.fgDim }}>Add Photo</span>
          </div>
          <div style={{
            position:"absolute", inset:0,
            background:`linear-gradient(to top, ${T.bg}BB 0%, transparent 55%)`,
          }}/>
        </div>
        <div style={{ width:"100%", height:1, background:T.accent, marginTop:12, opacity:0.4 }}/>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position:"absolute", right:48, bottom:48,
        display:"flex", flexDirection:"column", alignItems:"center", gap:8,
      }}>
        <div style={{ width:1, height:48, background:T.border }}/>
        <span style={{
          fontFamily:"'DM Sans',sans-serif", fontSize:8,
          letterSpacing:"0.2em", textTransform:"uppercase", color:T.fgDim,
          writingMode:"vertical-rl",
        }}>Scroll</span>
      </div>
    </section>
  );
}
