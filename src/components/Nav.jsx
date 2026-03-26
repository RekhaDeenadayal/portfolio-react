import { useState, useEffect } from "react";
import { useIsMobile } from "../hooks/useIsMobile";

export default function Nav({ T, active, onNavClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const LINKS = [["Work","work"],["Experience","experience"],["Skills","skills"],["Contact","contact"]];

  const handleClick = (id) => {
    setMenuOpen(false);
    onNavClick(id);
  };

  return (
    <nav style={{
      position:"fixed", top:0, left:0, right:0, zIndex:200,
      background: scrolled || menuOpen ? T.navBg : "transparent",
      borderBottom: scrolled ? `1px solid ${T.border}` : "none",
      backdropFilter: scrolled || menuOpen ? "blur(20px)" : "none",
      transition:"all .35s",
    }}>
      <div style={{
        padding: isMobile ? "0 24px" : "0 48px",
        display:"flex", alignItems:"center", justifyContent:"space-between", height:56,
      }}>
        <a href="#" style={{ textDecoration:"none" }}>
          <span style={{
            fontFamily:"'Cormorant Garamond',serif", fontSize:17, fontWeight:400,
            fontStyle:"italic", letterSpacing:"0.06em", color:T.fg,
          }}>RD</span>
        </a>

        {isMobile ? (
          <button
            onClick={() => setMenuOpen(o => !o)}
            style={{
              background:"none", border:"none", padding:8,
              cursor:"pointer", display:"flex", flexDirection:"column",
              gap:5, alignItems:"flex-end",
            }}
          >
            <span style={{ display:"block", height:1, background:T.fg, width:20 }}/>
            <span style={{ display:"block", height:1, background:T.fg, width:14 }}/>
            <span style={{ display:"block", height:1, background:T.fg, width:18 }}/>
          </button>
        ) : (
          <div style={{ display:"flex", alignItems:"center", gap:32 }}>
            {LINKS.map(([label, id]) => {
              const isActive = active === id;
              return (
                <a key={id} href={`#${id}`} data-hover
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
          </div>
        )}
      </div>

      {/* Mobile dropdown */}
      {isMobile && (
        <div style={{
          maxHeight: menuOpen ? 300 : 0,
          overflow:"hidden",
          transition:"max-height .35s cubic-bezier(.4,0,.2,1)",
          background: T.navBg,
          borderTop: menuOpen ? `1px solid ${T.border}` : "none",
        }}>
          {LINKS.map(([label, id]) => (
            <a key={id} href={`#${id}`}
              onClick={e => { e.preventDefault(); handleClick(id); }}
              style={{
                display:"block", padding:"16px 24px",
                fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:400,
                letterSpacing:"0.08em", textTransform:"uppercase",
                color: active === id ? T.accent : T.fgMid,
                textDecoration:"none", borderBottom:`1px solid ${T.border}`,
              }}
            >{label}</a>
          ))}
        </div>
      )}
    </nav>
  );
}
