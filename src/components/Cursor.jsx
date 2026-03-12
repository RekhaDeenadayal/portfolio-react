import { useState, useEffect, useRef } from "react";

export default function Cursor() {
  const el = useRef(null);
  const pos = useRef({ x:-200, y:-200 });
  const cur = useRef({ x:-200, y:-200 });
  const [big, setBig] = useState(false);

  useEffect(() => {
    const onMove = e => { pos.current = { x:e.clientX, y:e.clientY }; };
    const onOver  = e => setBig(!!(e.target.closest("a,button,[data-hover]")));
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    let raf;
    const tick = () => {
      cur.current.x += (pos.current.x - cur.current.x) * 0.1;
      cur.current.y += (pos.current.y - cur.current.y) * 0.1;
      if (el.current) {
        el.current.style.left = cur.current.x + "px";
        el.current.style.top  = cur.current.y + "px";
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseover", onOver); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div ref={el} style={{
      position:"fixed", pointerEvents:"none", zIndex:9999,
      width: big ? 72 : 18, height: big ? 72 : 18, borderRadius:"50%",
      background:"#EDE9E0", mixBlendMode:"difference",
      transform:"translate(-50%,-50%)",
      transition:"width .3s cubic-bezier(.4,0,.2,1), height .3s cubic-bezier(.4,0,.2,1)",
    }}/>
  );
}
