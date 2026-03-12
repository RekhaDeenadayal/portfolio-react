import { useState, useEffect, useRef } from "react";

export default function Reveal({ children, delay=0, y=28 }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold:.04 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div style={{ perspective:"1200px" }}>
      <div ref={ref} style={{
        opacity: vis ? 1 : 0,
        transform: vis
          ? "translateY(0) rotateX(0deg)"
          : `translateY(${y}px) rotateX(9deg)`,
        transformOrigin: "top center",
        transition: `opacity .8s ease ${delay}s, transform 1s cubic-bezier(.16,1,.3,1) ${delay}s`,
        willChange: "transform, opacity",
      }}>{children}</div>
    </div>
  );
}
