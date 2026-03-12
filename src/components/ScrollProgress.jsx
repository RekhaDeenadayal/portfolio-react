import { useState, useEffect } from "react";

export default function ScrollProgress({ T }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const h = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPct(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener("scroll", h, { passive:true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <div style={{
      position:"fixed", top:0, left:0, zIndex:9998,
      height:2, width:`${pct}%`,
      background:T.accent, pointerEvents:"none",
    }}/>
  );
}
