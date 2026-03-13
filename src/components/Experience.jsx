import { useEffect, useRef } from "react";
import { EXPERIENCE } from "../constants/data";

// ── Card content ──────────────────────────────────────────────────────────────
function ExperienceCard({ T, ex }) {
  return (
    <div style={{
      background: T.bg1,
      border: `1px solid ${T.border}`,
      padding: "52px 56px",
      boxShadow: `0 12px 48px ${T.bg}99`,
      willChange: "transform",
    }}>
      {/* Role */}
      <div style={{
        fontFamily: "'Cormorant Garamond',serif",
        fontSize: "clamp(28px,3.5vw,52px)",
        fontWeight: 300, color: T.fg,
        letterSpacing: "-0.02em", lineHeight: 1.0,
        marginBottom: 10,
      }}>{ex.role}</div>

      {/* Meta */}
      <div style={{
        display: "flex", alignItems: "center",
        gap: 14, marginBottom: 44, flexWrap: "wrap",
      }}>
        <span style={{
          fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 500,
          letterSpacing: "0.1em", textTransform: "uppercase", color: T.accent,
        }}>{ex.company}</span>
        <span style={{ width: 3, height: 3, borderRadius: "50%", background: T.fgDim, flexShrink: 0 }} />
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 300, color: T.fgDim }}>{ex.period}</span>
        <span style={{ width: 3, height: 3, borderRadius: "50%", background: T.fgDim, flexShrink: 0 }} />
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 300, color: T.fgDim }}>{ex.location}</span>
      </div>

      {/* Bullet points */}
      {ex.points.map((pt, j) => (
        <div key={j} style={{
          display: "grid", gridTemplateColumns: "28px 1fr",
          gap: "0 16px", marginBottom: 22, alignItems: "start",
        }}>
          <div style={{
            fontFamily: "'Cormorant Garamond',serif", fontSize: 12,
            color: T.accent, letterSpacing: "0.08em", paddingTop: 2,
          }}>{String(j + 1).padStart(2, "0")}</div>
          <div style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 300,
            color: T.fgMid, lineHeight: 1.85,
          }}>{pt}</div>
        </div>
      ))}

      {/* Tech tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 28 }}>
        {ex.tech.map(t => (
          <span key={t} style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: 10,
            color: T.fgDim, border: `1px solid ${T.border}`,
            padding: "4px 12px", letterSpacing: "0.04em",
          }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

// ── Stacked-cards Experience section ─────────────────────────────────────────
export default function Experience({ T }) {
  const sectionRef = useRef(null);
  const cardRefs   = useRef([]);
  const dotRefs    = useRef([]);
  const N = EXPERIENCE.length;

  useEffect(() => {
    const section = sectionRef.current;
    let raf, dirty = true;

    const onScroll = () => { dirty = true; };
    window.addEventListener("scroll", onScroll, { passive: true });

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!dirty) return;
      dirty = false;

      const rect  = section.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scroll = total > 0 ? Math.max(0, Math.min(1, -rect.top / total)) : 0;

      // pos = where this card sits in the virtual stack
      // pos=0  → fully visible (current)
      // pos<0  → sliding/slid off the top
      // pos>0  → waiting in the stack below
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const pos = scroll * (N - 1) - i;

        let ty, sc, op, zi;

        if (pos <= -1) {
          // Completely gone
          ty = "-115%"; sc = 0.96; op = 0; zi = 0;
        } else if (pos < 0) {
          // Sliding out upward
          ty = `${pos * 115}%`;       // 0% → -115%
          sc = 1 + pos * 0.04;        // 1   → 0.96
          op = 1 + pos * 0.6;         // 1   → 0.4
          zi = 10;
        } else {
          // Stacked below — each level slightly smaller, shifted down, dimmer
          ty = `${pos * 22}px`;
          sc = Math.max(0.82, 1 - pos * 0.06);
          op = Math.max(0,    1 - pos * 0.22);
          zi = Math.max(0, 9 - Math.floor(pos));
        }

        el.style.transform = `translateY(${ty}) scale(${sc})`;
        el.style.opacity   = String(op);
        el.style.zIndex    = String(zi);
      });

      // Progress dots
      const activeIdx = Math.min(Math.round(scroll * (N - 1)), N - 1);
      dotRefs.current.forEach((el, i) => {
        if (!el) return;
        const active = i === activeIdx;
        el.style.width      = active ? "24px" : "6px";
        el.style.background = active ? T.accent : T.border;
      });
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [N, T]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      style={{ height: `${(N + 1) * 100}vh` }}
    >
      <div style={{
        position: "sticky", top: 0, height: "100vh",
        display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "0 48px",
        overflow: "hidden",
      }}>

        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", gap: 20,
          marginBottom: 52, flexShrink: 0,
        }}>
          <div style={{ flex: 1, height: 1, background: T.border }} />
          <span style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 400,
            letterSpacing: "0.22em", textTransform: "uppercase", color: T.accent,
          }}>Experience</span>
          <div style={{ flex: 1, height: 1, background: T.border }} />
        </div>

        {/* Scroll hint */}
        <div style={{
          position: "absolute", right: 56, top: "50%",
          transform: "translateY(-50%) rotate(90deg)",
          fontFamily: "'DM Sans',sans-serif", fontSize: 9,
          letterSpacing: "0.22em", textTransform: "uppercase",
          color: T.fgDim, opacity: 0.5,
          transformOrigin: "center",
          userSelect: "none",
        }}>scroll</div>

        {/* Card stack */}
        <div style={{
          position: "relative",
          height: "clamp(380px, 52vh, 540px)",
          perspective: "1400px",
          perspectiveOrigin: "50% 60%",
          flexShrink: 0,
        }}>
          {EXPERIENCE.map((ex, i) => (
            <div
              key={i}
              ref={el => { cardRefs.current[i] = el; }}
              style={{
                position: "absolute", width: "100%",
                transformOrigin: "top center",
                transition: "none",       // scroll-driven, no CSS transition
                willChange: "transform, opacity",
                // initial paint state (pos = -i when scroll=0 isn't right — pos = 0-i)
                // card 0: pos=0 → fully visible
                // card 1: pos=1 → stacked below
                transform: i === 0 ? "translateY(0) scale(1)" : `translateY(${i * 22}px) scale(${Math.max(0.82, 1 - i * 0.06)})`,
                opacity: i === 0 ? "1" : String(Math.max(0, 1 - i * 0.22)),
                zIndex: String(Math.max(0, 9 - i)),
              }}
            >
              <ExperienceCard T={T} ex={ex} />
            </div>
          ))}
        </div>

        {/* Progress dots */}
        <div style={{
          display: "flex", justifyContent: "center",
          gap: 8, marginTop: 28, flexShrink: 0,
        }}>
          {EXPERIENCE.map((_, i) => (
            <div
              key={i}
              ref={el => { dotRefs.current[i] = el; }}
              style={{
                height: 2, borderRadius: 1,
                width: i === 0 ? "24px" : "6px",
                background: i === 0 ? T.accent : T.border,
                transition: "width .4s cubic-bezier(.16,1,.3,1), background .3s",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
