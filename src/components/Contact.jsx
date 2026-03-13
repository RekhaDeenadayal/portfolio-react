import { useState } from "react";
import Reveal from "./Reveal";

const CONTACT_LINKS = [
  { label: "Email",    sub: "hello@rekhadeenadayal.com",        href: "mailto:hello@rekhadeenadayal.com",                icon: "✉" },
  { label: "LinkedIn", sub: "Connect professionally",            href: "https://linkedin.com/in/rekhadeenadayal",          icon: "in" },
  { label: "GitHub",   sub: "View my projects",                  href: "https://github.com/RekhaDeenadayal",              icon: "⌥" },
  { label: "Resume",   sub: "Download PDF",                      href: "/resume.pdf",                                     icon: "↓" },
];

const ROLES = ["ML Engineer", "AI Research", "Data Scientist", "Generative AI"];

function LinkCard({ T, item }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={item.href} target={item.href.startsWith("mailto") || item.href.startsWith("/") ? undefined : "_blank"} rel="noreferrer"
      style={{ textDecoration: "none" }}>
      <div
        data-hover
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display: "flex", alignItems: "center", gap: 14,
          padding: "18px 20px",
          border: `1px solid ${hov ? T.accent : T.border}`,
          background: hov ? T.accentDim : T.bg1,
          transition: "border-color .2s, background .2s",
        }}>
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          border: `1px solid ${hov ? T.accent : T.border}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'DM Sans',sans-serif", fontSize: 11,
          color: hov ? T.accent : T.fgDim,
          transition: "border-color .2s, color .2s",
          flexShrink: 0,
        }}>{item.icon}</div>
        <div>
          <div style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 500,
            color: hov ? T.accent : T.fg, letterSpacing: "0.06em",
            transition: "color .2s", marginBottom: 2,
          }}>{item.label}</div>
          <div style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 300,
            color: T.fgDim, letterSpacing: "0.02em",
          }}>{item.sub}</div>
        </div>
      </div>
    </a>
  );
}

export default function Contact({ T }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = e => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:hello@rekhadeenadayal.com?subject=${subject}&body=${body}`;
  };

  const inputStyle = {
    width: "100%", boxSizing: "border-box",
    fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 300,
    color: T.fg, background: T.bg,
    border: `1px solid ${T.border}`,
    padding: "12px 16px",
    outline: "none",
    letterSpacing: "0.02em",
  };

  return (
    <section id="contact" style={{ padding: "140px 48px 100px" }}>

      {/* Heading */}
      <Reveal y={24}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "clamp(44px,7vw,96px)",
            fontWeight: 300, color: T.fg, margin: "0 0 20px",
            letterSpacing: "-0.025em", lineHeight: 0.95,
          }}>Let's <em>Connect</em></h2>
          <p style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 300,
            color: T.fgMid, maxWidth: 520, margin: "0 auto", lineHeight: 1.8,
          }}>
            Actively seeking opportunities in Data Science, ML Engineering,
            AI Research, and Generative AI. Let's discuss what we can build together.
          </p>
        </div>
      </Reveal>

      {/* Two-column: links left, form right */}
      <Reveal delay={0.08} y={20}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1.3fr",
          gap: "0 64px", alignItems: "start",
          marginBottom: 48,
        }}>

          {/* Left */}
          <div>
            <p style={{
              fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 300,
              color: T.fgMid, lineHeight: 1.85, marginBottom: 32,
            }}>
              Whether you're looking to collaborate on research, build
              production ML systems, or just want to talk AI — I'd love
              to hear from you.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {CONTACT_LINKS.map(item => (
                <LinkCard key={item.label} T={T} item={item} />
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div style={{
            background: T.bg1,
            border: `1px solid ${T.border}`,
            padding: "36px 32px",
          }}>
            <div style={{
              fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 500,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: T.accent, marginBottom: 28,
            }}>Send a Message</div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{
                  fontFamily: "'DM Sans',sans-serif", fontSize: 9,
                  letterSpacing: "0.16em", textTransform: "uppercase",
                  color: T.fgDim, display: "block", marginBottom: 8,
                }}>Your Name</label>
                <input
                  type="text" required placeholder="Enter your full name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = T.accent; }}
                  onBlur={e  => { e.target.style.borderColor = T.border; }}
                />
              </div>
              <div>
                <label style={{
                  fontFamily: "'DM Sans',sans-serif", fontSize: 9,
                  letterSpacing: "0.16em", textTransform: "uppercase",
                  color: T.fgDim, display: "block", marginBottom: 8,
                }}>Email Address</label>
                <input
                  type="email" required placeholder="Enter your email address"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = T.accent; }}
                  onBlur={e  => { e.target.style.borderColor = T.border; }}
                />
              </div>
              <div>
                <label style={{
                  fontFamily: "'DM Sans',sans-serif", fontSize: 9,
                  letterSpacing: "0.16em", textTransform: "uppercase",
                  color: T.fgDim, display: "block", marginBottom: 8,
                }}>Message</label>
                <textarea
                  required rows={5}
                  placeholder="Tell me about the opportunity or what you'd like to discuss..."
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={e => { e.target.style.borderColor = T.accent; }}
                  onBlur={e  => { e.target.style.borderColor = T.border; }}
                />
              </div>
              <button type="submit" data-hover style={{
                fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 500,
                letterSpacing: "0.16em", textTransform: "uppercase",
                color: T.bg, background: T.accent,
                border: "none", padding: "15px 24px",
                cursor: "pointer", transition: "opacity .2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = T.accentHover || "#2563EB"; }}
              onMouseLeave={e => { e.currentTarget.style.background = T.accent; }}
              >↗ Send Message</button>
            </form>
          </div>
        </div>
      </Reveal>

      {/* Status bar */}
      <Reveal delay={0.14} y={16}>
        <div style={{
          border: `1px solid ${T.border}`,
          background: T.bg1,
          padding: "28px 36px",
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "0 48px",
        }}>
          <div>
            <div style={{
              fontFamily: "'DM Sans',sans-serif", fontSize: 9, fontWeight: 500,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: T.accent, marginBottom: 16,
            }}>Current Status</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { dot: T.accent,  text: "Available for full-time opportunities" },
                { dot: T.fgDim,   text: "New York, NY · Open to relocation" },
                { dot: T.fgMid,   text: "MS at NYU Tandon — 2026" },
              ].map(({ dot, text }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: dot, flexShrink: 0 }} />
                  <span style={{
                    fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 300,
                    color: T.fgMid, letterSpacing: "0.02em",
                  }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{
              fontFamily: "'DM Sans',sans-serif", fontSize: 9, fontWeight: 500,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: T.accent, marginBottom: 16,
            }}>Interested In</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {ROLES.map(r => (
                <span key={r} style={{
                  fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 300,
                  color: T.fgMid, border: `1px solid ${T.borderMid}`,
                  padding: "5px 14px", letterSpacing: "0.03em",
                }}>{r}</span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
