import Reveal from "./Reveal";
import { useIsMobile } from "../hooks/useIsMobile";

const PILLARS = [
  { label: "Education",    body: "MS candidate at NYU Tandon School of Engineering. B.E. in Computer Science — consistently top of class." },
  { label: "Expertise",   body: "AI/ML, NLP, Computer Vision, and Generative AI with production-scale deployment experience." },
  { label: "Focus",       body: "Building scalable AI solutions — from fine-tuned LLMs and RAG pipelines to real-time CV systems." },
  { label: "Collaboration", body: "Cross-functional delivery across enterprise and startup environments — design, backend, and MLOps." },
];

const INTERESTS = [
  "Large Language Models","Retrieval-Augmented Generation",
  "Computer Vision","NLP","Multimodal AI","Prompt Engineering",
];

export default function About({ T }) {
  const isMobile = useIsMobile();

  return (
    <section id="about" style={{ padding: isMobile ? "80px 24px 60px" : "140px 48px 100px", position:"relative" }}>
      <Reveal y={16}>
        <div style={{ display:"flex", alignItems:"center", gap:20, marginBottom: isMobile ? 48 : 80 }}>
          <div style={{ flex:1, height:1, background:T.border }}/>
          <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:10, fontWeight:400, letterSpacing:"0.22em", textTransform:"uppercase", color:T.accent }}>About</span>
          <div style={{ flex:1, height:1, background:T.border }}/>
        </div>
      </Reveal>

      <div style={{
        display:"grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gap: isMobile ? "48px 0" : "64px 80px",
        alignItems:"start",
      }}>
        {/* Bio */}
        <div>
          <Reveal y={24}>
            <h2 style={{
              fontFamily:"'Cormorant Garamond',serif",
              fontSize:"clamp(34px,4.5vw,64px)",
              fontWeight:300, color:T.fg,
              letterSpacing:"-0.025em", lineHeight:1.05,
              margin:"0 0 36px",
            }}>Building the<br/><em>Future with AI</em></h2>
          </Reveal>

          <Reveal delay={0.08} y={16}>
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:300, color:T.fgMid, lineHeight:1.9, margin:"0 0 22px" }}>
              I'm a Data Scientist and AI Engineer pursuing my Master's at NYU Tandon School of Engineering.
              My journey spans developing multimodal AI systems to deploying production-ready ML solutions that drive real-world impact.
            </p>
          </Reveal>
          <Reveal delay={0.13} y={16}>
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:300, color:T.fgMid, lineHeight:1.9, margin:"0 0 22px" }}>
              At Accenture, I engineered enterprise-grade React dashboards integrated with SAP APIs serving large-scale production systems.
              My ML work spans RAG workflows, fine-tuned LLMs, computer vision pipelines, and ensemble models.
            </p>
          </Reveal>
          <Reveal delay={0.18} y={16}>
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:300, color:T.fgMid, lineHeight:1.9, margin:"0 0 36px" }}>
              I'm particularly drawn to roles in ML Engineering, AI Research, NLP, and Generative AI — where I can contribute
              to meaningful technological advancement while solving complex real-world problems.
            </p>
          </Reveal>

          <Reveal delay={0.22} y={12}>
            <div style={{ border:`1px solid ${T.border}`, padding:"28px 32px" }}>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:9, fontWeight:500, letterSpacing:"0.2em", textTransform:"uppercase", color:T.accent, marginBottom:18 }}>Current Interests</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {INTERESTS.map(tag => (
                  <span key={tag} style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:300, color:T.fgMid, border:`1px solid ${T.borderMid}`, padding:"5px 14px", letterSpacing:"0.03em" }}>{tag}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Pillar cards */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, alignSelf:"start" }}>
          {PILLARS.map((p, i) => (
            <Reveal key={p.label} delay={0.1 + i * 0.07} y={20}>
              <div style={{ background:T.bg1, border:`1px solid ${T.border}`, padding: isMobile ? "24px 20px" : "32px 28px", height:"100%" }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:11, color:T.accent, letterSpacing:"0.1em", marginBottom:20 }}>{String(i+1).padStart(2,"0")}</div>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:10, fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase", color:T.fg, marginBottom:14 }}>{p.label}</div>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, fontWeight:300, color:T.fgMid, lineHeight:1.75 }}>{p.body}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
