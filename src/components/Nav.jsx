import { useState, useEffect } from "react";

export default function Nav({ T, dark, setDark, active, onNavClick }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const LINKS = [["Work","work"],["Experience","experience"],["Skills","skills"],["Contact","contact"]];

  return (
    <nav style={{
      position:"fixed", top:0, left:0, right:0, zIndex:200,
      background: scrolled ? T.navBg : "transparent",
      borderBottom: scrolled ? `1px solid ${T.border}` : "none",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      transition:"all .35s",
    }}>
      <div style={{
        padding:"0 48px", display:"flex",
        alignItems:"center", justifyContent:"space-between", height:56,
      }}>
        <a href="#" style={{ textDecoration:"none" }}>
          <span style={{
            fontFamily:"'Cormorant Garamond',serif", fontSize:17, fontWeight:400,
            fontStyle:"italic", letterSpacing:"0.06em", color:T.fg,
          }}>RD</span>
        </a>
        <div style={{ display:"flex", alignItems:"center", gap:32 }}>
          {LINKS.map(([label, id]) => {
            const isActive = active === id;
            return (
              <a key={id}
                href={`#${id}`}
                data-hover
                onClick={e => { e.preventDefault(); onNavClick(id); }}
                style={{
                  fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:400,
                  letterSpacing:"0.08em", textTransform:"uppercase",
                  color: isActive ? T.accent : T.fgMid,
                  textDecoration:"none", transition:"color .3s",
                  position:"relative", paddingBottom:2,
                }}
              >
                {label}
                <span style={{
                  position:"absolute", bottom:0, left:0,
                  width: isActive ? "100%" : "0%",
                  height:1, background:T.accent, display:"block",
                  transition:"width .4s cubic-bezier(.4,0,.2,1)",
                }}/>
              </a>
            );
          })}
          <button onClick={() => setDark(d => !d)} data-hover style={{
            background:"none", border:`1px solid ${T.border}`,
            padding:"4px 12px", cursor:"pointer",
            color:T.fgDim, fontSize:10, fontFamily:"'DM Sans',sans-serif",
            letterSpacing:"0.1em", textTransform:"uppercase", transition:"all .2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor=T.accent; e.currentTarget.style.color=T.accent; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor=T.border; e.currentTarget.style.color=T.fgDim; }}
          >{dark?"Light":"Dark"}</button>
        </div>
      </div>
    </nav>
  );
}
