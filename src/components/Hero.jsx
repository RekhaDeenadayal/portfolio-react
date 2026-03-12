import { useEffect, useRef } from "react";
import FitText from "./FitText";
import Reveal from "./Reveal";

export default function Hero({ T }) {
  const sy = useRef(0);
  const nameRef  = useRef(null);
  const metaRef  = useRef(null);
  const ghostRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    let raf;
    const tick = () => {
      const s = window.scrollY;
      sy.current = s;
      if (nameRef.current)  nameRef.current.style.transform  = `translateY(${s * 0.14}px)`;
      if (metaRef.current)  metaRef.current.style.transform  = `translateY(${s * 0.05}px)`;
      if (ghostRef.current) ghostRef.current.style.transform = `translateY(${s * 0.24}px)`;
      if (labelRef.current) labelRef.current.style.transform =
        `translateY(calc(-50% + ${s * 0.03}px)) rotate(-90deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section style={{
      minHeight:"100vh", display:"flex", flexDirection:"column",
      justifyContent:"flex-end", padding:"0 48px 52px",
      position:"relative", overflow:"hidden",
    }}>

      {/* Depth 3 — ghost year, moves fastest */}
      <div ref={ghostRef} style={{
        position:"absolute", right:"-3vw", top:"10%",
        fontFamily:"'Cormorant Garamond',serif",
        fontSize:"clamp(100px,18vw,260px)",
        fontWeight:300, color:T.border,
        lineHeight:1, letterSpacing:"-0.05em",
        userSelect:"none", pointerEvents:"none",
        willChange:"transform", zIndex:1,
      }}>2025</div>

      {/* Depth 1 — vertical label, barely moves */}
      <div ref={labelRef} style={{
        position:"absolute", left:48, top:"50%",
        transformOrigin:"center center",
        fontFamily:"'DM Sans',sans-serif", fontSize:9, fontWeight:400,
        letterSpacing:"0.28em", textTransform:"uppercase",
        color:T.fgDim, whiteSpace:"nowrap",
        pointerEvents:"none", willChange:"transform", zIndex:2,
      }}>Software Engineer · AI Systems · NYU Tandon</div>

      {/* Scroll indicator — right edge */}
      <div style={{
        position:"absolute", right:48, bottom:100,
        display:"flex", flexDirection:"column", alignItems:"center", gap:8, zIndex:2,
      }}>
        <div style={{ width:1, height:60, background:T.border }}/>
        <span style={{
          fontFamily:"'DM Sans',sans-serif", fontSize:8,
          letterSpacing:"0.2em", textTransform:"uppercase", color:T.fgDim,
          writingMode:"vertical-rl",
        }}>Scroll</span>
      </div>

      {/* Depth 2 — name, primary parallax layer */}
      <div ref={nameRef} style={{
        marginBottom:40, willChange:"transform",
        position:"relative", zIndex:2,
      }}>
        <FitText T={T} italic={false} delay={0.1}>Rekha</FitText>
        <FitText T={T} italic={true}  delay={0.22}>Deenadayal</FitText>
      </div>

      {/* Depth 1 — bottom meta, barely moves */}
      <div ref={metaRef} style={{
        display:"flex", justifyContent:"space-between", alignItems:"flex-end",
        flexWrap:"wrap", gap:24,
        borderTop:`1px solid ${T.border}`, paddingTop:28,
        position:"relative", zIndex:2, willChange:"transform",
      }}>
        <Reveal delay={0.6} y={12}>
          <p style={{
            fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:300,
            color:T.fgMid, lineHeight:1.9, margin:0, maxWidth:380,
          }}>
            Building at the intersection of AI and full-stack engineering —
            from multimodal pipelines to hardware simulators.
            MS candidate at NYU Tandon.
          </p>
        </Reveal>
        <Reveal delay={0.7} y={12}>
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
      <Reveal delay={0.8} y={8}>
        <div style={{ display:"flex", gap:40, marginTop:32, position:"relative", zIndex:2 }}>
          {[["3+","Yrs industry"],["5","Projects"],["MS","NYU Tandon"]].map(([v,l]) => (
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
    </section>
  );
}
