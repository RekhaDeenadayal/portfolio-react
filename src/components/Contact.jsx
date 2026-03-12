import { useState } from "react";
import Reveal from "./Reveal";

function ContactRow({ T, lk, last }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={lk.href} target={lk.href.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer"
      style={{ textDecoration:"none", display:"block" }}>
      <div data-hover
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display:"flex", justifyContent:"space-between", alignItems:"center",
          padding:"22px 0",
          borderBottom: last ? "none" : `1px solid ${T.border}`,
        }}>
        <span style={{
          fontFamily:"'DM Sans',sans-serif", fontSize:10, fontWeight:400,
          letterSpacing:"0.18em", textTransform:"uppercase",
          color: hov ? T.accent : T.fgDim, transition:"color .25s",
        }}>{lk.label}</span>
        <span style={{
          fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:300,
          color: hov ? T.fg : T.fgMid, transition:"color .25s",
          display:"flex", alignItems:"center", gap:10,
        }}>
          {lk.val}
          <span style={{
            display:"inline-block",
            transform: hov ? "translate(4px,-4px)" : "translate(0,0)",
            color: hov ? T.accent : T.fgDim,
            transition:"transform .25s, color .25s",
          }}>↗</span>
        </span>
      </div>
    </a>
  );
}

export default function Contact({ T }) {
  const links = [
    { label:"Email",    val:"hello@rekhadeenadayal.com",       href:"mailto:hello@rekhadeenadayal.com" },
    { label:"LinkedIn", val:"linkedin.com/in/rekhadeenadayal", href:"https://linkedin.com/in/rekhadeenadayal" },
    { label:"GitHub",   val:"github.com/RekhaDeenadayal",     href:"https://github.com/RekhaDeenadayal" },
  ];
  return (
    <section id="contact" style={{ padding:"140px 48px 80px" }}>
      {/* Heading */}
      <div style={{ marginBottom:80 }}>
        <div style={{ overflow:"hidden" }}>
          <Reveal y={40}>
            <h2 style={{
              fontFamily:"'Cormorant Garamond',serif",
              fontSize:"clamp(44px,7vw,96px)",
              fontWeight:300, color:T.fg, margin:0,
              letterSpacing:"-0.025em", lineHeight:0.9,
            }}>Let's build</h2>
          </Reveal>
        </div>
        <div style={{ overflow:"hidden" }}>
          <Reveal delay={0.1} y={40}>
            <h2 style={{
              fontFamily:"'Cormorant Garamond',serif",
              fontSize:"clamp(44px,7vw,96px)",
              fontWeight:300, fontStyle:"italic",
              color:T.fg, margin:0,
              letterSpacing:"-0.025em", lineHeight:0.9,
            }}>something together.</h2>
          </Reveal>
        </div>
      </div>

      <div style={{ borderTop:`1px solid ${T.border}` }}>
        {links.map((lk,i) => (
          <Reveal key={lk.label} delay={i * 0.07}>
            <ContactRow T={T} lk={lk} last={i === links.length-1} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
