import { useState, useEffect } from "react";

export default function Intro({ onDone }) {
  const FULL = "Rekha Deenadayal";
  const [typed,   setTyped]  = useState("");
  const [lineW,   setLineW]  = useState(0);
  const [lifting, setLift]   = useState(false);
  const [gone,    setGone]   = useState(false);

  useEffect(() => {
    let idx = 0;
    // Phase 1: type the name
    const typeId = setInterval(() => {
      idx++;
      setTyped(FULL.slice(0, idx));
      if (idx >= FULL.length) {
        clearInterval(typeId);
        // Phase 2: gold line sweeps left → right
        const t0  = Date.now();
        const DUR = 520;
        const sweep = () => {
          const p = Math.min((Date.now() - t0) / DUR, 1);
          setLineW(p * 100);
          if (p < 1) { requestAnimationFrame(sweep); }
          else {
            // Phase 3: curtain lifts
            setTimeout(() => {
              setLift(true);
              setTimeout(() => { setGone(true); onDone(); }, 1050);
            }, 160);
          }
        };
        requestAnimationFrame(sweep);
      }
    }, 52);
    return () => clearInterval(typeId);
  }, [onDone]);

  if (gone) return null;

  return (
    <div style={{
      position:"fixed", inset:0, zIndex:8000,
      background:"#0C0B09",
      display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center", gap:20,
      transform: lifting ? "translateY(-100vh)" : "translateY(0)",
      transition: lifting ? "transform 1.05s cubic-bezier(.76,0,.24,1)" : "none",
      pointerEvents: lifting ? "none" : "auto",
    }}>

      {/* Typed name */}
      <div style={{
        fontFamily:"'Cormorant Garamond',serif",
        fontSize:"clamp(28px,4.5vw,58px)",
        fontWeight:300, fontStyle:"italic",
        color:"#EDE9E0", letterSpacing:"0.08em",
        minHeight:"1.2em", display:"flex", alignItems:"center",
      }}>
        {typed}
        {/* blinking cursor — hides once line starts */}
        <span style={{
          display:"inline-block", width:2, height:"0.75em",
          background:"#C49A3C", marginLeft:5, verticalAlign:"middle",
          opacity: lineW > 0 ? 0 : 1,
          transition:"opacity .15s",
          animation: lineW > 0 ? "none" : "rd-blink .75s step-end infinite",
        }}/>
      </div>

      {/* Gold sweep line */}
      <div style={{
        width:"clamp(220px,38vw,420px)", height:1,
        background:"rgba(237,233,224,0.08)",
        position:"relative", overflow:"hidden",
      }}>
        <div style={{
          position:"absolute", top:0, left:0, bottom:0,
          width:`${lineW}%`,
          background:"#C49A3C",
          boxShadow:"0 0 10px #C49A3C80",
        }}/>
      </div>

      {/* Role label */}
      <div style={{
        fontFamily:"'DM Sans',sans-serif", fontSize:9, fontWeight:400,
        letterSpacing:"0.22em", textTransform:"uppercase",
        color:"rgba(237,233,224,0.25)",
        opacity: lineW > 50 ? 1 : 0,
        transform: lineW > 50 ? "translateY(0)" : "translateY(6px)",
        transition:"opacity .4s ease, transform .4s ease",
      }}>Software Engineer · AI Systems</div>

    </div>
  );
}
