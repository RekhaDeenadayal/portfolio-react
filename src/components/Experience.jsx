import { useState } from "react";
import { EXPERIENCE } from "../constants/data";
import Reveal from "./Reveal";

export default function Experience({ T }) {
  const [active, setActive] = useState(0);
  const [key, setKey] = useState(0);
  const e = EXPERIENCE[active];

  function switchTo(i) {
    if (i === active) return;
    setActive(i); setKey(k => k+1);
  }

  return (
    <section id="experience" style={{ padding:"140px 48px" }}>
      <style>{`@keyframes exp-up{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>

      {/* Section header */}
      <Reveal>
        <div style={{ display:"flex", alignItems:"center", gap:20, marginBottom:80 }}>
          <div style={{ flex:1, height:1, background:T.border }}/>
          <span style={{
            fontFamily:"'DM Sans',sans-serif", fontSize:10, fontWeight:400,
            letterSpacing:"0.22em", textTransform:"uppercase", color:T.accent,
          }}>Experience</span>
          <div style={{ flex:1, height:1, background:T.border }}/>
        </div>
      </Reveal>

      <div style={{ display:"grid", gridTemplateColumns:"200px 1fr", gap:0 }}>

        {/* Left */}
        <div style={{ position:"relative", paddingRight:40 }}>
          <div style={{ position:"absolute", right:0, top:0, bottom:0, width:1, background:T.border }}/>
          <div style={{
            position:"absolute", right:0,
            top: active * 88, height:64, width:2,
            background:T.accent,
            transition:"top .35s cubic-bezier(.4,0,.2,1)",
          }}/>
          {EXPERIENCE.map((ex,i) => (
            <div key={i} data-hover onClick={() => switchTo(i)} style={{
              height:88, display:"flex", flexDirection:"column", justifyContent:"center",
              cursor:"pointer", paddingRight:24,
              opacity: active === i ? 1 : 0.35, transition:"opacity .25s",
            }}>
              <div style={{
                fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:500,
                color: active === i ? T.fg : T.fgMid,
                marginBottom:4, transition:"color .2s",
              }}>{ex.company}</div>
              <div style={{
                fontFamily:"'DM Sans',sans-serif", fontSize:10, fontWeight:300,
                letterSpacing:"0.04em", color:T.fgDim,
              }}>{ex.years}</div>
            </div>
          ))}
        </div>

        {/* Right */}
        <div key={key} style={{ paddingLeft:56, animation:"exp-up .4s ease both" }}>
          <div style={{
            fontFamily:"'Cormorant Garamond',serif",
            fontSize:"clamp(28px,3.5vw,48px)",
            fontWeight:300, color:T.fg,
            letterSpacing:"-0.02em", lineHeight:1.1, marginBottom:8,
          }}>{e.role}</div>

          <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:44, flexWrap:"wrap" }}>
            <span style={{
              fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:500,
              letterSpacing:"0.1em", textTransform:"uppercase", color:T.accent,
            }}>{e.company}</span>
            <span style={{ width:3, height:3, borderRadius:"50%", background:T.fgDim, flexShrink:0 }}/>
            <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:300, color:T.fgDim }}>{e.period}</span>
            <span style={{ width:3, height:3, borderRadius:"50%", background:T.fgDim, flexShrink:0 }}/>
            <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:300, color:T.fgDim }}>{e.location}</span>
          </div>

          {e.points.map((pt,j) => (
            <div key={j} style={{
              display:"grid", gridTemplateColumns:"28px 1fr",
              gap:"0 16px", marginBottom:22, alignItems:"start",
            }}>
              <div style={{
                fontFamily:"'Cormorant Garamond',serif", fontSize:12,
                color:T.accent, letterSpacing:"0.08em", paddingTop:2,
              }}>{String(j+1).padStart(2,"0")}</div>
              <div style={{
                fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:300,
                color:T.fgMid, lineHeight:1.85,
              }}>{pt}</div>
            </div>
          ))}

          <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginTop:32 }}>
            {e.tech.map(t => (
              <span key={t} style={{
                fontFamily:"'DM Sans',sans-serif", fontSize:10,
                color:T.fgDim, border:`1px solid ${T.border}`,
                padding:"4px 12px", letterSpacing:"0.04em",
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
