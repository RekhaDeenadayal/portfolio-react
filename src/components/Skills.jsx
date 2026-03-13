import { useRef } from "react";
import { SKILLS } from "../constants/data";
import Reveal from "./Reveal";

export default function Skills({ T }) {
  const cats = Object.keys(SKILLS);

  return (
    <section id="skills" style={{ padding: "140px 48px 100px" }}>
      <style>{`
        @keyframes rd-tag-in {
          from { opacity:0; transform:translateY(10px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .rd-skill-tag:hover {
          border-color: var(--accent) !important;
          color: var(--accent) !important;
          background: var(--accentDim) !important;
        }
      `}</style>

      {/* Section label */}
      <Reveal y={16}>
        <div style={{
          display: "flex", alignItems: "center", gap: 20, marginBottom: 80,
        }}>
          <div style={{ flex: 1, height: 1, background: T.border }} />
          <span style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 400,
            letterSpacing: "0.22em", textTransform: "uppercase", color: T.accent,
          }}>Technical Skills</span>
          <div style={{ flex: 1, height: 1, background: T.border }} />
        </div>
      </Reveal>

      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {cats.map((cat, ci) => (
          <Reveal key={cat} delay={ci * 0.06} y={20}>
            <div style={{
              borderTop: `1px solid ${T.border}`,
              paddingTop: 36,
              paddingBottom: 48,
              display: "grid",
              gridTemplateColumns: "260px 1fr",
              gap: "0 56px",
              alignItems: "start",
            }}>
              {/* Category name */}
              <div style={{ paddingTop: 4 }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "clamp(26px,2.8vw,40px)",
                  fontWeight: 300, fontStyle: "italic",
                  color: T.fg, lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  marginBottom: 8,
                }}>{cat}</div>
                <div style={{
                  fontFamily: "'DM Sans',sans-serif", fontSize: 9,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  color: T.accent,
                }}>{SKILLS[cat].length} tools</div>
              </div>

              {/* Skills tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 10px" }}>
                {SKILLS[cat].map((skill, si) => (
                  <span
                    key={skill}
                    className="rd-skill-tag"
                    style={{
                      "--accent": T.accent,
                      "--accentDim": T.accentDim,
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: 11, fontWeight: 300,
                      letterSpacing: "0.04em",
                      color: T.fgMid,
                      border: `1px solid ${T.border}`,
                      padding: "6px 16px",
                      transition: "border-color .2s, color .2s, background .2s",
                      animation: `rd-tag-in .4s cubic-bezier(.16,1,.3,1) ${si * 0.03}s both`,
                      cursor: "default",
                    }}
                  >{skill}</span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
