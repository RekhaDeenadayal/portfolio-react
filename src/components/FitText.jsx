import { useState, useEffect, useRef } from "react";

export default function FitText({ children, T, italic=false, delay=0 }) {
  const outer = useRef(null);
  const inner = useRef(null);
  const clip  = useRef(null);
  const [vis, setVis] = useState(false);

  // Fit to width
  useEffect(() => {
    const fit = () => {
      if (!outer.current || !inner.current) return;
      inner.current.style.fontSize = "100px";
      const ratio = outer.current.clientWidth / inner.current.scrollWidth;
      inner.current.style.fontSize = (100 * ratio * 0.998) + "px";
    };
    fit();
    const ro = new ResizeObserver(fit);
    if (outer.current) ro.observe(outer.current);
    return () => ro.disconnect();
  }, [children]);

  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold:0.05 });
    if (clip.current) obs.observe(clip.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={outer} style={{ width:"100%", overflow:"hidden" }}>
      <div ref={clip} style={{ overflow:"hidden" }}>
        <div ref={inner} style={{
          fontFamily:"'Cormorant Garamond',serif",
          fontWeight:300, fontStyle: italic ? "italic" : "normal",
          letterSpacing:"-0.03em", lineHeight:0.86,
          color:T.fg, whiteSpace:"nowrap",
          transform: vis ? "translateY(0)" : "translateY(105%)",
          opacity: vis ? 1 : 0,
          transition:`transform .95s cubic-bezier(.16,1,.3,1) ${delay}s, opacity .6s ease ${delay}s`,
        }}>{children}</div>
      </div>
    </div>
  );
}
