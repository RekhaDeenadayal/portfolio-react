import { useState, useEffect, useRef, useCallback } from "react";

// ── FONTS ─────────────────────────────────────────────────────────────────────
if (!document.getElementById("rd-fonts")) {
  const l = document.createElement("link");
  l.id = "rd-fonts"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400;500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap";
  document.head.appendChild(l);
}

// ── THEMES ────────────────────────────────────────────────────────────────────
const DARK = {
  bg:"#0c091a", bg1:"#120f24", bg2:"#1a1635",
  fg:"#f2eeff", fgMid:"rgba(242,238,255,.65)", fgDim:"rgba(242,238,255,.32)",
  border:"rgba(196,168,255,.14)",
  lav:"#c4a8ff", rose:"#ffadc7", mint:"#9de8c4", peach:"#ffd4a8",
  glass:"rgba(255,255,255,.04)", glassHov:"rgba(196,168,255,.10)",
  navBg:"rgba(12,9,26,.96)", spotlight:"rgba(196,168,255,.06)",
  cardBorder:"rgba(196,168,255,.18)",
};
const LIGHT = {
  bg:"#fdf9ff", bg1:"#f4effe", bg2:"#ede4f8",
  fg:"#1a1030", fgMid:"rgba(26,16,48,.65)", fgDim:"rgba(26,16,48,.4)",
  border:"rgba(130,80,200,.14)",
  lav:"#7c40cc", rose:"#cc3d78", mint:"#1e9060", peach:"#c06820",
  glass:"rgba(130,80,200,.06)", glassHov:"rgba(130,80,200,.12)",
  navBg:"rgba(253,249,255,.97)", spotlight:"rgba(130,80,200,.04)",
  cardBorder:"rgba(130,80,200,.2)",
};

// ── DATA ──────────────────────────────────────────────────────────────────────
const PROJECTS = [
  { num:"01", year:"2024", type:"AI / Full-Stack", name:"Aether", subtitle:"AI Video Support Companion",
    impact:"60% faster support response",
    desc:"The premise was simple: what if an AI could watch the same video as a user and actually understand what they're stuck on? Built the multimodal pipeline with OpenVINO, YOLO, and LangChain — so it sees what you see, not just reads what you type.",
    tech:["React","Node.js","OpenVINO","LangChain","YOLO","Express"], color:"#c4a8ff",
    href:"https://github.com/RekhaDeenadayal" },
  { num:"02", year:"2024", type:"Safety / AI", name:"Self Embrace", subtitle:"Mental Health & Safety Platform",
    impact:"500+ active users · 99.9% uptime",
    desc:"Mental health tooling is often either clinical or condescending. This tries to be neither — an SOS system and AI companion that responds like it knows the stakes. The 99.9% uptime wasn't accidental; some things can't go down.",
    tech:["FastAPI","Next.js","MongoDB","Amazon Bedrock","AWS","CI/CD"], color:"#ffadc7",
    href:"https://github.com/RekhaDeenadayal" },
  { num:"03", year:"2023", type:"Finance / Web", name:"Stock Search", subtitle:"Real-Time Market Dashboard",
    impact:"10K+ daily API calls processed",
    desc:"A market dashboard built to handle real volume without complaining about it — live autocomplete, watchlists, news feeds, interactive charts. The caching layer was the interesting part; most of the obvious approaches were wrong.",
    tech:["React","Node.js","AWS Elastic Beanstalk","Highcharts","REST APIs"], color:"#9de8c4",
    href:"https://github.com/RekhaDeenadayal" },
  { num:"04", year:"2024", type:"Hardware / Architecture", name:"RISC-V CPU Simulator", subtitle:"Cycle-Accurate 32-bit Processor",
    impact:"Full pipeline + hazard detection",
    desc:"Built a 32-bit RISC-V processor simulator from scratch — not because someone asked, but because I wanted to know what a hazard actually is at the hardware level. Turns out pipeline stalls are more interesting than the textbook suggests.",
    tech:["RISC-V","Verilog","Computer Architecture","HDL Simulation"], color:"#ffd4a8",
    href:"https://github.com/RekhaDeenadayal" },
  { num:"05", year:"2024", type:"ML / AI Security", name:"Adversarial Pixel Attacks", subtitle:"Robustness Study on ResNet-34",
    impact:"FGSM · PGD · Patch-PGD evaluated",
    desc:"Spent a semester making ResNet-34 and DenseNet-121 confidently wrong. FGSM, PGD, Patch-PGD — each attack breaks the model differently, and the failure modes transfer between architectures in ways that should probably concern more people.",
    tech:["PyTorch","Deep Learning","Adversarial ML","DenseNet-121","ResNet-34"], color:"#c4a8ff",
    href:"https://github.com/RekhaDeenadayal" },
];

const RESEARCH = [
  { title:"Neural Network Techniques for Cloud Resource Scalability", venue:"ISCComm-2023",
    desc:"The question was whether neural networks could handle cloud auto-scaling better than threshold rules. They can — but only if you're honest about what the model is actually learning. Built the framework, ran the benchmarks, presented at ISCComm.",
    tags:["Neural Networks","Cloud Computing","Auto-Scaling","Multi-Cloud"], color:"#c4a8ff",
    href:"https://linkedin.com/in/rekhadeenadayal" },
  { title:"Streamlining Software Migration with Model-Driven Engineering", venue:"ISCComm-2023",
    desc:"Legacy systems don't migrate cleanly. This paper explores using model-driven engineering to make the messy parts systematic — not magic, just structured. Less manual rework, fewer surprises when the old system finally shuts down.",
    tags:["MDE","Legacy Migration","Cloud","Software Engineering"], color:"#ffadc7",
    href:"https://linkedin.com/in/rekhadeenadayal" },
];

const EXPERIENCE = [
  { role:"Software Engineer", company:"Accenture", period:"Mar 2022 – Aug 2024",
    summary:"Built enterprise-grade React UIs integrated with SAP backend APIs for large-scale clients.",
    points:[
      "Engineered React front-end components tightly integrated with SAP backend APIs, bridging front-end and platform teams.",
      "Improved data connectivity flows and UX consistency, reducing friction for end users.",
      "Worked on SAP-powered production environments with deep exposure to enterprise data pipelines.",
    ] },
  { role:"Software Engineering Intern", company:"Kaar Technologies", period:"Mar 2021 – Feb 2022",
    summary:"Full-stack feature development using JavaScript and SAP frameworks in agile sprints.",
    points:[
      "Delivered full-stack features using JavaScript and SAP-adjacent frameworks in agile sprint cycles.",
      "Wrote UI polish code and backend validation scripts, improving product quality.",
      "Collaborated across planning, standups, and retrospectives — building strong delivery habits.",
    ] },
];

const TEACHING = [
  { role:"Recitation Leader — Advanced PDE", org:"NYU Courant", period:"Sep 2025 – Present",
    points:[
      "Lead weekly recitations for graduate students on PDEs, Fourier series, and integral transforms.",
      "Design problem sets and rubrics aligned with lecture objectives.",
      "Host targeted exam review sessions and 1:1 office hours.",
    ] },
  { role:"Recitation Leader — Advanced Complex Variables", org:"NYU Courant", period:"Jan–May 2025",
    points:[
      "Taught analytic functions, contour integration, and complex transformations to graduate students.",
      "Developed quiz materials and worked through advanced proofs accessibly.",
      "Managed Piazza/Gradescope with consistent 48-hour feedback turnaround.",
    ] },
  { role:"Graduate Assistant — Advanced Control Systems", org:"NYU Tandon", period:"Jan–May 2025",
    points:[
      "Assisted in lab setup, assignment design, and grading for graduate-level control systems.",
      "Guided 40+ students through MATLAB/Simulink simulations and stability modeling.",
      "Held weekly office hours on state-space modeling, transfer functions, and feedback design.",
    ] },
];

const SKILLS = {
  "Languages":      ["JavaScript","TypeScript","C","SQL","HTML/CSS","ABAP","Verilog","Python"],
  "Frameworks":     ["React","Next.js","Node.js","Express","Redux","Tailwind CSS","FastAPI"],
  "Databases":      ["MongoDB","MySQL"],
  "Cloud & DevOps": ["AWS","CI/CD","Git","Docker"],
  "ML & AI":        ["PyTorch","LangChain","OpenVINO","Amazon Bedrock","YOLO"],
  "Other Tools":    ["JIRA","Agile/Scrum","MATLAB/Simulink","Gradescope"],
};

const SKILL_COLORS = ["#c4a8ff","#ffadc7","#9de8c4","#ffd4a8","#c4a8ff","#ffadc7"];

const CONTACT_ROWS = [
  { label:"Email",    handle:"hello@rekhadeenadayal.com",       href:"mailto:hello@rekhadeenadayal.com" },
  { label:"LinkedIn", handle:"linkedin.com/in/rekhadeenadayal", href:"https://linkedin.com/in/rekhadeenadayal" },
  { label:"GitHub",   handle:"github.com/RekhaDeenadayal",      href:"https://github.com/RekhaDeenadayal" },
];

// ── HOOKS ─────────────────────────────────────────────────────────────────────
function useScramble(text, active) {
  const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ✦✧⋆∘";
  const [disp, setDisp] = useState(text);
  const rafRef = useRef(null);
  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    if (!active) { setDisp(text); return; }
    let frame = 0; const total = 18;
    const run = () => {
      setDisp(text.split("").map((ch, i) => {
        if (ch === " ") return " ";
        return frame / total > i / text.length ? ch : CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join(""));
      frame++;
      if (frame <= total) rafRef.current = requestAnimationFrame(run);
      else setDisp(text);
    };
    rafRef.current = requestAnimationFrame(run);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, text]);
  return disp;
}

function useMagnetic(str = 0.35) {
  const ref = useRef(null);
  const [off, setOff] = useState({ x:0, y:0 });
  const onMove = useCallback((e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setOff({ x:(e.clientX-r.left-r.width/2)*str, y:(e.clientY-r.top-r.height/2)*str });
  }, [str]);
  const onLeave = useCallback(() => setOff({ x:0, y:0 }), []);
  return { ref, off, onMove, onLeave };
}

function useTypewriter(texts, speed=75, pause=2200) {
  const [display, setDisplay] = useState("");
  const [idx, setIdx]         = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = texts[idx];
    let t;
    if (!deleting && charIdx < current.length)
      t = setTimeout(() => setCharIdx(c => c+1), speed);
    else if (!deleting && charIdx === current.length)
      t = setTimeout(() => setDeleting(true), pause);
    else if (deleting && charIdx > 0)
      t = setTimeout(() => setCharIdx(c => c-1), speed/2);
    else { setDeleting(false); setIdx(i => (i+1)%texts.length); }
    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(t);
  }, [charIdx, deleting, idx, texts, speed, pause]);
  return display;
}

// ── REVEAL ────────────────────────────────────────────────────────────────────
function Reveal({ children, delay=0, from="bottom" }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold:.06 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const initT = from==="left"?"translateX(-40px) scale(.97)":from==="right"?"translateX(40px) scale(.97)":"translateY(36px) scale(.97)";
  return (
    <div ref={ref} style={{
      opacity:vis?1:0,
      transform:vis?"translateY(0) scale(1)":initT,
      transition:`opacity .8s ${delay}s cubic-bezier(.22,1,.36,1), transform .8s ${delay}s cubic-bezier(.22,1,.36,1)`,
    }}>
      {children}
    </div>
  );
}

// ── SCROLL PROGRESS ───────────────────────────────────────────────────────────
function ScrollProgress({ T }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      setPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", onScroll, { passive:true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div style={{ position:"fixed", top:0, left:0, right:0, zIndex:200, height:2, background:"transparent", pointerEvents:"none" }}>
      <div style={{
        height:"100%", width:`${pct}%`,
        background:`linear-gradient(90deg, ${T.lav}, ${T.rose}, ${T.peach})`,
        boxShadow:`0 0 10px ${T.lav}cc, 0 0 20px ${T.rose}88`,
        transition:"width .1s linear",
        borderRadius:"0 2px 2px 0",
      }}/>
    </div>
  );
}

// ── SECTION DIVIDER ───────────────────────────────────────────────────────────
function Divider({ fromBg, toBg, T }) {
  return (
    <div style={{ height:120, background:`linear-gradient(to bottom, ${fromBg}, ${toBg})`,
      position:"relative", overflow:"hidden", pointerEvents:"none" }}>
      <div style={{ position:"absolute", inset:0,
        background:`radial-gradient(ellipse 60% 100% at 50% 100%, ${T.lav}12, transparent)` }}/>
    </div>
  );
}

// ── SPOTLIGHT ─────────────────────────────────────────────────────────────────
function Spotlight({ children, bg, T }) {
  const ref = useRef(null);
  const [m, setM] = useState({ x:-999, y:-999 });
  return (
    <div ref={ref}
      onMouseMove={e => { const r=ref.current.getBoundingClientRect(); setM({ x:e.clientX-r.left, y:e.clientY-r.top }); }}
      onMouseLeave={() => setM({ x:-999, y:-999 })}
      style={{ background:bg, position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:1,
        background:`radial-gradient(500px circle at ${m.x}px ${m.y}px, ${T.spotlight}, transparent 70%)`,
        transition:"background .1s" }}/>
      <div style={{ position:"relative", zIndex:2 }}>{children}</div>
    </div>
  );
}

// ── FLOATING ORBS ─────────────────────────────────────────────────────────────
function FloatingOrbs({ T }) {
  const orbs = [
    { w:500, h:500, x:"-8%",  y:"-5%",  color:T.lav,   blur:130, op:.18, anim:"orbA" },
    { w:380, h:380, x:"68%",  y:"2%",   color:T.rose,  blur:110, op:.14, anim:"orbB" },
    { w:300, h:300, x:"82%",  y:"55%",  color:T.mint,  blur:100, op:.12, anim:"orbC" },
    { w:420, h:420, x:"-5%",  y:"65%",  color:T.peach, blur:120, op:.12, anim:"orbD" },
    { w:250, h:250, x:"45%",  y:"75%",  color:T.lav,   blur:90,  op:.1,  anim:"orbE" },
  ];
  return (
    <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none" }}>
      {orbs.map((o,i) => (
        <div key={i} style={{
          position:"absolute", width:o.w, height:o.h,
          left:o.x, top:o.y,
          background:o.color, borderRadius:"50%",
          filter:`blur(${o.blur}px)`, opacity:o.op,
          animation:`${o.anim} ${10+i*3}s ease-in-out infinite`,
        }}/>
      ))}
    </div>
  );
}

// ── SPARKLE PARTICLES (hero bg) ───────────────────────────────────────────────
const SPARKLE_POS = [
  { t:"8%",  l:"6%",  s:14, d:0,    dur:3.5, color:"#c4a8ff" },
  { t:"18%", l:"88%", s:10, d:1.3,  dur:2.8, color:"#ffadc7" },
  { t:"52%", l:"3%",  s:16, d:.8,   dur:4.2, color:"#9de8c4" },
  { t:"70%", l:"85%", s:11, d:2.1,  dur:3,   color:"#ffd4a8" },
  { t:"36%", l:"93%", s:8,  d:.4,   dur:2.5, color:"#c4a8ff" },
  { t:"80%", l:"13%", s:13, d:1.7,  dur:3.8, color:"#ffadc7" },
  { t:"6%",  l:"46%", s:7,  d:1,    dur:2.3, color:"#9de8c4" },
  { t:"60%", l:"68%", s:15, d:2.4,  dur:4,   color:"#c4a8ff" },
  { t:"26%", l:"26%", s:9,  d:.6,   dur:2.9, color:"#ffd4a8" },
  { t:"86%", l:"56%", s:11, d:1.9,  dur:3.3, color:"#ffadc7" },
  { t:"44%", l:"50%", s:7,  d:3,    dur:2.7, color:"#c4a8ff" },
  { t:"16%", l:"60%", s:10, d:.2,   dur:3.6, color:"#9de8c4" },
  { t:"92%", l:"32%", s:12, d:2.8,  dur:3.1, color:"#ffd4a8" },
  { t:"33%", l:"72%", s:6,  d:1.5,  dur:4.4, color:"#ffadc7" },
  { t:"74%", l:"42%", s:14, d:.9,   dur:2.6, color:"#c4a8ff" },
  { t:"50%", l:"18%", s:8,  d:3.5,  dur:3.9, color:"#9de8c4" },
];

function SparkleField() {
  return (
    <div style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:1 }}>
      {SPARKLE_POS.map((sp, i) => (
        <div key={i} style={{
          position:"absolute", top:sp.t, left:sp.l,
          width:sp.s, height:sp.s,
          animation:`heroSparkle ${sp.dur}s ${sp.d}s ease-in-out infinite`,
          filter:`drop-shadow(0 0 4px ${sp.color})`,
        }}>
          <svg viewBox="0 0 20 20" width={sp.s} height={sp.s}>
            <path d="M10 0 L11.8 8.2 L20 10 L11.8 11.8 L10 20 L8.2 11.8 L0 10 L8.2 8.2 Z"
              fill={sp.color} opacity=".9"/>
          </svg>
        </div>
      ))}
    </div>
  );
}

// ── CURSOR SPARKLE TRAIL ──────────────────────────────────────────────────────
function SparkleTrail({ T }) {
  const [sparks, setSparks] = useState([]);
  const counter = useRef(0);

  useEffect(() => {
    const COLORS = [T.lav, T.rose, T.mint, T.peach, "#ffffff", "#e8d5ff"];
    let last = 0;

    const onMove = e => {
      const now = Date.now();
      if (now - last < 45) return;
      last = now;

      const count = Math.floor(Math.random() * 2) + 1;
      const newSparks = Array.from({ length: count }, () => {
        const id = counter.current++;
        return {
          id,
          x: e.clientX + (Math.random() - .5) * 16,
          y: e.clientY + (Math.random() - .5) * 16,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          size: Math.random() * 9 + 5,
          dx: (Math.random() - .5) * 60,
          dy: -(Math.random() * 50 + 20),
          dur: Math.random() * 400 + 600,
        };
      });

      setSparks(p => [...p.slice(-30), ...newSparks]);
      newSparks.forEach(s => {
        setTimeout(() => setSparks(p => p.filter(x => x.id !== s.id)), s.dur);
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [T]);

  return (
    <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:9990, overflow:"hidden" }}>
      {sparks.map(s => (
        <div key={s.id} style={{
          position:"fixed", left:s.x, top:s.y,
          pointerEvents:"none",
          animation:`trailSpark ${s.dur}ms ease-out forwards`,
          "--dx": `${s.dx}px`,
          "--dy": `${s.dy}px`,
        }}>
          <svg viewBox="0 0 20 20" width={s.size} height={s.size}
            style={{ filter:`drop-shadow(0 0 3px ${s.color})` }}>
            <path d="M10 0L11.8 8.2L20 10L11.8 11.8L10 20L8.2 11.8L0 10L8.2 8.2Z" fill={s.color}/>
          </svg>
        </div>
      ))}
    </div>
  );
}

// ── PROJECT CARD ─────────────────────────────────────────────────────────────
function ProjectCard({ p, T }) {
  const [open, setOpen] = useState(false);
  const [tilt, setTilt] = useState({ x:0, y:0 });
  const ref = useRef(null);
  const onMove = e => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setTilt({ x:((e.clientY-r.top)/r.height-.5)*8, y:((e.clientX-r.left)/r.width-.5)*8 });
  };
  return (
    <div ref={ref}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => { setOpen(false); setTilt({ x:0, y:0 }); }}
      onMouseMove={onMove}
      style={{
        background: open ? T.glassHov : T.glass,
        backdropFilter:"blur(18px)",
        WebkitBackdropFilter:"blur(18px)",
        border:`1px solid ${open ? p.color+"60" : T.border}`,
        borderRadius:16,
        padding:"2rem",
        position:"relative", overflow:"hidden",
        transform:`perspective(900px) rotateX(${open?-tilt.x*.25:0}deg) rotateY(${open?tilt.y*.25:0}deg) translateZ(${open?8:0}px)`,
        boxShadow: open ? `0 20px 60px ${p.color}28, 0 0 0 1px ${p.color}30, inset 0 1px 0 ${p.color}20` : `0 4px 20px rgba(0,0,0,.3)`,
        transition:"transform .22s ease, background .3s, border-color .3s, box-shadow .35s",
        willChange:"transform", cursor:"default",
      }}>

      {/* top glow bar */}
      <div style={{ position:"absolute", top:0, left:0, right:0, height:1,
        background:`linear-gradient(90deg, transparent, ${p.color}, transparent)`,
        opacity:open?1:0, transition:"opacity .4s" }}/>

      {/* impact badge */}
      <div style={{ position:"absolute", top:"1.1rem", right:"1.1rem",
        background:open?p.color+"22":"transparent",
        border:`1px solid ${open?p.color+"55":"transparent"}`,
        padding:".22rem .65rem", borderRadius:20,
        fontFamily:"'JetBrains Mono',monospace", fontSize:".56rem",
        letterSpacing:".08em", textTransform:"uppercase",
        color:open?p.color:"transparent", transition:"all .3s" }}>
        {p.impact}
      </div>

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"1rem" }}>
        <span style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700,
          fontSize:"3.8rem", lineHeight:1,
          color:open?p.color:"rgba(196,168,255,.07)",
          transition:"color .3s" }}>{p.num}</span>
        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".57rem",
          color:T.fgDim, letterSpacing:".1em" }}>{p.year}</span>
      </div>

      <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".6rem",
        letterSpacing:".14em", textTransform:"uppercase",
        color:p.color, marginBottom:".35rem",
        opacity:open?1:.6, transition:"opacity .3s" }}>{p.type}</p>

      <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700,
        fontSize:"1.75rem", letterSpacing:"-.01em",
        marginBottom:".15rem", color:T.fg }}>{p.name}</h3>
      <p style={{ fontSize:".78rem", color:T.fgDim, fontStyle:"italic",
        fontFamily:"'Cormorant Garamond',serif", marginBottom:"1rem" }}>{p.subtitle}</p>

      <div style={{ maxHeight:open?260:0, overflow:"hidden",
        transition:"max-height .45s cubic-bezier(.4,0,.2,1)", opacity:open?1:0 }}>
        <p style={{ fontSize:".87rem", lineHeight:1.8, color:T.fgMid, fontWeight:300, marginBottom:"1.1rem" }}>{p.desc}</p>
      </div>

      <div style={{ display:"flex", flexWrap:"wrap", gap:".38rem",
        marginBottom:open?"1.2rem":0, transition:"margin .3s" }}>
        {p.tech.map(t => (
          <span key={t} style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".55rem",
            letterSpacing:".05em", padding:".25rem .6rem", borderRadius:20,
            background:open?p.color+"1a":"transparent",
            border:`1px solid ${open?p.color+"50":T.border}`,
            color:open?p.color:T.fgDim, transition:"all .3s" }}>{t}</span>
        ))}
      </div>

      <a href={p.href} target="_blank" rel="noopener noreferrer"
        style={{ display:"flex", alignItems:"center", gap:".5rem",
          opacity:open?1:0, transform:open?"translateX(0)":"translateX(-8px)",
          transition:"opacity .25s .1s, transform .25s .1s",
          textDecoration:"none" }}>
        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".6rem",
          letterSpacing:".1em", textTransform:"uppercase", color:p.color }}>View on GitHub</span>
        <span style={{ color:p.color }}>→</span>
      </a>

      {/* corner glow */}
      <div style={{ position:"absolute", bottom:-40, right:-40, width:120, height:120,
        borderRadius:"50%", background:p.color,
        filter:"blur(40px)", opacity:open?.25:0, transition:"opacity .4s", pointerEvents:"none" }}/>
    </div>
  );
}

// ── RESEARCH CARD ─────────────────────────────────────────────────────────────
function ResearchCard({ r, T }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background:hov?T.glassHov:T.glass,
        backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)",
        border:`1px solid ${hov?r.color+"55":T.border}`,
        borderRadius:16, padding:"2rem",
        boxShadow:hov?`0 16px 48px ${r.color}20, inset 0 1px 0 ${r.color}20`:"0 4px 20px rgba(0,0,0,.25)",
        transition:"all .3s", cursor:"default",
        borderTop:`2px solid ${hov?r.color:T.border}` }}>
      <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".58rem",
        letterSpacing:".12em", textTransform:"uppercase", color:r.color,
        background:r.color+"1a", padding:".22rem .7rem", borderRadius:20,
        display:"inline-block", marginBottom:"1.2rem" }}>{r.venue}</span>
      <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700,
        fontSize:"1.2rem", lineHeight:1.4, marginBottom:"1rem", color:T.fg }}>{r.title}</h3>
      <p style={{ fontSize:".87rem", lineHeight:1.78, color:T.fgMid, fontWeight:300, marginBottom:"1.4rem" }}>{r.desc}</p>
      <div style={{ display:"flex", flexWrap:"wrap", gap:".38rem", marginBottom:"1.4rem" }}>
        {r.tags.map(t => (
          <span key={t} style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".55rem",
            letterSpacing:".05em", padding:".25rem .6rem", borderRadius:20,
            background:hov?r.color+"1a":"transparent",
            border:`1px solid ${hov?r.color+"50":T.border}`,
            color:hov?r.color:T.fgDim, transition:"all .3s" }}>{t}</span>
        ))}
      </div>
      <a href={r.href} target="_blank" rel="noopener noreferrer"
        style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".62rem",
          letterSpacing:".1em", textTransform:"uppercase", color:r.color, textDecoration:"none",
          border:`1px solid ${r.color+"55"}`, padding:".4rem 1rem", borderRadius:20,
          display:"inline-flex", alignItems:"center", gap:6,
          background:hov?r.color+"18":"transparent", transition:"background .25s" }}>
        View Paper →
      </a>
    </div>
  );
}

// ── EXP CARD ─────────────────────────────────────────────────────────────────
function ExpCard({ item, isTeach, T }) {
  const [open, setOpen] = useState(false);
  return (
    <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}
      style={{ background:open?T.glassHov:T.glass,
        backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)",
        border:`1px solid ${open?T.lav+"50":T.border}`,
        borderRadius:12,
        borderLeft:`3px solid ${open?T.lav:"transparent"}`,
        padding:"1.8rem 2rem",
        boxShadow:open?`0 12px 40px ${T.lav}18`:"none",
        transition:"all .3s", cursor:"default" }}>
      <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700,
        fontSize:"1.2rem", letterSpacing:"-.01em",
        color:open?T.fg:T.fgMid, transition:"color .25s", marginBottom:".3rem" }}>{item.role}</h3>
      <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".64rem",
        color:open?T.lav:T.fgDim, letterSpacing:".1em", marginBottom:".8rem", transition:"color .25s" }}>
        {isTeach ? `${item.org} · ${item.period}` : `${item.company} · ${item.period}`}
      </p>
      {item.points.slice(0, open ? item.points.length : 1).map((pt, j) => (
        <div key={j} style={{ display:"flex", gap:".6rem", alignItems:"flex-start",
          marginBottom:".5rem", fontSize:".87rem",
          color: j === 0 ? T.fgMid : T.fgDim, lineHeight:1.7,
          opacity: j === 0 ? 1 : open ? 1 : 0,
          transition:"opacity .3s" }}>
          <span style={{ width:5, height:5, background:T.lav, borderRadius:"50%",
            marginTop:8, flexShrink:0, boxShadow:`0 0 6px ${T.lav}` }}/>
          {pt}
        </div>
      ))}
      {!open && item.points.length > 1 && (
        <div style={{ display:"flex", gap:".6rem", alignItems:"flex-start",
          marginBottom:".5rem", fontSize:".87rem", color:T.fgDim, lineHeight:1.7 }}>
          <span style={{ width:5, height:5, background:T.lav, borderRadius:"50%",
            marginTop:8, flexShrink:0, boxShadow:`0 0 6px ${T.lav}` }}/>
          {item.points[1]}
        </div>
      )}
      <div style={{ maxHeight:open?280:0, overflow:"hidden",
        transition:"max-height .42s cubic-bezier(.4,0,.2,1)", opacity:open?1:0 }}>
        {item.points.slice(2).map((pt, j) => (
          <div key={j} style={{ display:"flex", gap:".6rem", alignItems:"flex-start",
            marginBottom:".6rem", fontSize:".87rem", color:T.fgMid, lineHeight:1.7 }}>
            <span style={{ width:5, height:5, background:T.lav, borderRadius:"50%",
              marginTop:8, flexShrink:0, boxShadow:`0 0 6px ${T.lav}` }}/>
            {pt}
          </div>
        ))}
      </div>
      {!open && (
        <div style={{ display:"flex", alignItems:"center", gap:".4rem", marginTop:".6rem",
          opacity:.4, transition:"opacity .2s" }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 4L5 7L8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".5rem",
            letterSpacing:".12em", textTransform:"uppercase", color:T.fgDim }}>details</span>
        </div>
      )}
    </div>
  );
}

// ── SKILL TAG ────────────────────────────────────────────────────────────────
function SkillTag({ text, color, T }) {
  const [hov, setHov] = useState(false);
  const { ref, off, onMove, onLeave } = useMagnetic(.45);
  return (
    <span ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); onLeave(); }}
      onMouseMove={onMove}
      style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".6rem",
        letterSpacing:".07em", padding:".38rem .85rem", borderRadius:20,
        textTransform:"uppercase",
        background:hov?color+"28":T.glass,
        border:`1px solid ${hov?color+"80":T.border}`,
        color:hov?color:T.fgMid,
        boxShadow:hov?`0 0 16px ${color}40`:"none",
        transform:`translate(${off.x}px,${off.y}px)`,
        transition:"background .2s,border-color .2s,color .2s,box-shadow .2s,transform .35s cubic-bezier(.23,1,.32,1)",
        display:"inline-block", cursor:"default", willChange:"transform" }}>
      {text}
    </span>
  );
}

// ── MAG BUTTON ────────────────────────────────────────────────────────────────
function MagBtn({ children, href, primary, T }) {
  const { ref, off, onMove, onLeave } = useMagnetic(.4);
  return (
    <a href={href} ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ display:"inline-flex", alignItems:"center", gap:8,
        background:primary?`linear-gradient(135deg,${T.lav},${T.rose})`:"transparent",
        color:primary?"#fff":T.fg,
        border:primary?"none":`1px solid ${T.border}`,
        borderRadius:50,
        fontFamily:"'JetBrains Mono',monospace", fontSize:".72rem",
        fontWeight:500, letterSpacing:".1em", textTransform:"uppercase",
        textDecoration:"none", padding:primary?"1rem 2.2rem":".95rem 2rem",
        transform:`translate(${off.x}px,${off.y}px)`,
        transition:"transform .4s cubic-bezier(.23,1,.32,1), box-shadow .3s",
        boxShadow:primary?`0 8px 32px ${T.lav}50, 0 0 0 1px ${T.lav}30`:`inset 0 0 0 1px ${T.border}`,
        willChange:"transform" }}>
      {children}
    </a>
  );
}

// ── CONTACT ROW ──────────────────────────────────────────────────────────────
function ContactRow({ row, T }) {
  const [hov, setHov] = useState(false);
  const scrambled = useScramble(row.label.toUpperCase(), hov);
  return (
    <a href={row.href} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"1.5rem 2.5rem",
        background:hov?T.glassHov:T.glass,
        backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)",
        borderRadius:hov?12:8,
        border:`1px solid ${hov?T.lav+"55":T.border}`,
        textDecoration:"none", color:T.fg,
        boxShadow:hov?`0 12px 40px ${T.lav}18`:"none",
        marginBottom:8,
        transition:"all .3s cubic-bezier(.23,1,.32,1)" }}>
      <span style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700,
        fontSize:"1.7rem", letterSpacing:"-.01em",
        background:hov?`linear-gradient(135deg,${T.lav},${T.rose})`:"none",
        WebkitBackgroundClip:hov?"text":"unset",
        WebkitTextFillColor:hov?"transparent":"unset",
        backgroundClip:hov?"text":"unset",
        transition:"all .25s" }}>{scrambled}</span>
      <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".64rem",
        color:T.fgDim, letterSpacing:".05em" }}>{row.handle}</span>
      <span style={{ color:T.lav, fontSize:"1.2rem",
        opacity:hov?1:0, transform:hov?"translate(0,0)":"translate(-8px,4px)",
        transition:"opacity .2s, transform .25s" }}>↗</span>
    </a>
  );
}

// ── SECTION HEADER ───────────────────────────────────────────────────────────
function SectionHeader({ label, title, T, delay=0 }) {
  const [hov, setHov] = useState(false);
  const scrambled = useScramble(label, hov);
  return (
    <>
      <Reveal delay={delay}>
        <div style={{ display:"flex", alignItems:"center", gap:".6rem", marginBottom:".8rem" }}>
          <span style={{ color:T.lav, fontSize:".7rem" }}>✦</span>
          <p onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".64rem",
              letterSpacing:".22em", textTransform:"uppercase",
              color:T.lav, cursor:"default" }}>
            {scrambled}
          </p>
          <span style={{ color:T.lav, fontSize:".7rem" }}>✦</span>
        </div>
      </Reveal>
      <Reveal delay={delay+.08}>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700,
          fontSize:"clamp(2.8rem,5vw,4.5rem)", lineHeight:.92,
          letterSpacing:"-.02em", marginBottom:"3rem", color:T.fg }}
          dangerouslySetInnerHTML={{ __html:title }}/>
      </Reveal>
    </>
  );
}

// ── HEADER ────────────────────────────────────────────────────────────────────
function Header({ T, dark, setDark, activeNav, NAV, hOn, hOff }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 860);
  useEffect(() => {
    const onR = () => setIsMobile(window.innerWidth <= 860);
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
  }, []);
  const close = () => setMenuOpen(false);
  const SOCIALS = [
    { label:"GH", href:"https://github.com/RekhaDeenadayal" },
    { label:"in", href:"https://linkedin.com/in/rekhadeenadayal" },
    { label:"@",  href:"mailto:hello@rekhadeenadayal.com" },
  ];
  return (
    <header style={{ position:"fixed", top:0, left:0, right:0, zIndex:100,
      background:T.navBg, backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)",
      borderBottom:`1px solid ${T.border}`, transition:"background .4s, border-color .4s" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
        padding:isMobile?".9rem 1.5rem":"1rem 4rem",
        borderBottom:`1px solid ${T.border}` }}>

        {/* Identity */}
        <div style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
          <div style={{ width:38, height:38, borderRadius:"50%", flexShrink:0,
            background:`linear-gradient(135deg,${T.lav},${T.rose})`,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontFamily:"'Cormorant Garamond',serif", fontWeight:700,
            fontSize:"1rem", color:"#fff",
            boxShadow:`0 0 16px ${T.lav}50` }}>BR</div>
          <div>
            <a href="#hero" onClick={close}
              style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700,
                fontSize:isMobile?"1.05rem":"1.15rem",
                color:T.fg, textDecoration:"none", letterSpacing:"-.01em",
                display:"block", lineHeight:1.15 }}>
              Bhagya Rekha Deenadayal
            </a>
            {!isMobile && (
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".55rem",
                letterSpacing:".1em", textTransform:"uppercase", color:T.fgDim }}>
                Engineer · Researcher · Educator
              </span>
            )}
          </div>
          {!isMobile && (
            <div style={{ display:"flex", alignItems:"center", gap:6,
              background:T.lav+"18", border:`1px solid ${T.lav}44`,
              padding:".22rem .65rem", borderRadius:20, marginLeft:".3rem" }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#7dffa8",
                boxShadow:"0 0 8px #7dffa8cc", display:"inline-block" }}/>
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".54rem",
                letterSpacing:".1em", textTransform:"uppercase", color:T.lav }}>
                Open to Roles
              </span>
            </div>
          )}
        </div>

        {/* Right */}
        <div style={{ display:"flex", alignItems:"center", gap:".7rem" }}>
          {!isMobile && SOCIALS.map(s => (
            <a key={s.label} href={s.href} onMouseEnter={hOn} onMouseLeave={hOff}
              style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".65rem",
                fontWeight:600, width:30, height:30, borderRadius:"50%",
                display:"flex", alignItems:"center", justifyContent:"center",
                border:`1px solid ${T.border}`, color:T.fgDim,
                textDecoration:"none", transition:"border-color .2s, color .2s, box-shadow .2s" }}>
              {s.label}
            </a>
          ))}
          {!isMobile && <div style={{ width:1, height:18, background:T.border }}/>}
          <button onClick={() => setDark(d => !d)}
            style={{ background:T.lav+"18", border:`1px solid ${T.lav}44`,
              color:T.lav, fontFamily:"'JetBrains Mono',monospace",
              fontSize:".56rem", letterSpacing:".1em", textTransform:"uppercase",
              padding:".33rem .75rem", borderRadius:20,
              transition:"background .2s, box-shadow .2s", cursor:"default",
              whiteSpace:"nowrap" }}>
            {dark ? "☀ Light" : "☾ Dark"}
          </button>
          {isMobile && (
            <button onClick={() => setMenuOpen(o => !o)}
              style={{ background:"transparent", border:`1px solid ${T.border}`,
                color:T.fg, width:34, height:34, borderRadius:8,
                display:"flex", flexDirection:"column", alignItems:"center",
                justifyContent:"center", gap:5, padding:"0 8px", cursor:"default" }}>
              {[0,1,2].map(i => (
                <span key={i} style={{ width:"100%", height:1.5,
                  background:i===1?(menuOpen?"transparent":T.fg):(menuOpen?T.lav:T.fg),
                  display:"block", transition:"transform .25s, background .2s, opacity .2s",
                  transform: menuOpen && i===0 ? "translateY(6.5px) rotate(45deg)"
                    : menuOpen && i===2 ? "translateY(-6.5px) rotate(-45deg)" : "none",
                  opacity: menuOpen && i===1 ? 0 : 1 }}/>
              ))}
            </button>
          )}
        </div>
      </div>

      {/* Desktop nav row */}
      {!isMobile && (
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
          padding:".55rem 4rem" }}>
          <ul style={{ display:"flex", gap:"2.2rem", listStyle:"none", alignItems:"center" }}>
            {NAV.map(n => (
              <li key={n}>
                <a href={`#${n.toLowerCase()}`} onMouseEnter={hOn} onMouseLeave={hOff}
                  style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".59rem",
                    letterSpacing:".14em", textTransform:"uppercase", textDecoration:"none",
                    color:activeNav===n.toLowerCase()?T.lav:T.fgDim,
                    transition:"color .2s",
                    textShadow:activeNav===n.toLowerCase()?`0 0 12px ${T.lav}80`:"none" }}>
                  {n}
                </a>
              </li>
            ))}
          </ul>
          <div style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".56rem",
              letterSpacing:".1em", textTransform:"uppercase", color:T.fgDim }}>📍 New York, NY</span>
            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".56rem",
              letterSpacing:".1em", textTransform:"uppercase",
              color:T.lav, border:`1px solid ${T.lav}44`, borderRadius:20,
              padding:".16rem .55rem", background:T.lav+"15" }}>NYU M.S. 2026</span>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {isMobile && (
        <div style={{ maxHeight:menuOpen?"420px":"0px", overflow:"hidden",
          transition:"max-height .4s cubic-bezier(.4,0,.2,1)",
          background:T.navBg, borderTop:menuOpen?`1px solid ${T.border}`:"none" }}>
          <ul style={{ listStyle:"none", padding:"1rem 1.5rem .5rem" }}>
            {NAV.map(n => (
              <li key={n}>
                <a href={`#${n.toLowerCase()}`} onClick={close}
                  style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
                    fontFamily:"'JetBrains Mono',monospace", fontSize:".72rem",
                    letterSpacing:".14em", textTransform:"uppercase", textDecoration:"none",
                    color:activeNav===n.toLowerCase()?T.lav:T.fg,
                    padding:".85rem 0", borderBottom:`1px solid ${T.border}`,
                    transition:"color .2s" }}>
                  <span>{n}</span>
                  {activeNav===n.toLowerCase() && (
                    <span style={{ width:6, height:6, borderRadius:"50%", background:T.lav,
                      boxShadow:`0 0 8px ${T.lav}` }}/>
                  )}
                </a>
              </li>
            ))}
          </ul>
          <div style={{ padding:".75rem 1.5rem 1.2rem",
            display:"flex", justifyContent:"space-between", alignItems:"center",
            borderTop:`1px solid ${T.border}` }}>
            <div style={{ display:"flex", gap:".6rem" }}>
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href}
                  style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".65rem",
                    fontWeight:600, width:32, height:32, borderRadius:"50%",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    border:`1px solid ${T.border}`, color:T.fgDim, textDecoration:"none" }}>
                  {s.label}
                </a>
              ))}
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:6,
              background:T.lav+"18", border:`1px solid ${T.lav}44`,
              padding:".22rem .65rem", borderRadius:20 }}>
              <span style={{ width:5, height:5, borderRadius:"50%", background:"#7dffa8",
                boxShadow:"0 0 6px #7dffa8cc", display:"inline-block" }}/>
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".53rem",
                letterSpacing:".1em", textTransform:"uppercase", color:T.lav }}>
                Open to Roles
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [dark, setDark]           = useState(true);
  const [cursor, setCursor]       = useState({ x:-100, y:-100 });
  const [ring, setRing]           = useState({ x:-100, y:-100 });
  const [blend, setBlend]         = useState(false);
  const [activeNav, setActiveNav] = useState("hero");
  const ringTarget = useRef({ x:-100, y:-100 });
  const raf = useRef(null);
  const T = dark ? DARK : LIGHT;

  const roles = useTypewriter([
    "Software Engineer",
    "Graduate Recitation Leader",
    "Published Researcher",
    "Occasional Hardware Nerd",
    "NYU M.S. 2026",
  ]);

  useEffect(() => {
    const move = e => { setCursor({ x:e.clientX, y:e.clientY }); ringTarget.current = { x:e.clientX, y:e.clientY }; };
    window.addEventListener("mousemove", move);
    const tick = () => {
      setRing(p => ({ x:p.x+(ringTarget.current.x-p.x)*.1, y:p.y+(ringTarget.current.y-p.y)*.1 }));
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf.current); };
  }, []);

  useEffect(() => {
    const ids = ["hero","about","projects","research","experience","skills","contact"];
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveNav(e.target.id); });
    }, { threshold:.3 });
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const NAV   = ["About","Projects","Research","Experience","Skills","Contact"];
  const hOn   = () => setBlend(true);
  const hOff  = () => setBlend(false);

  return (
    <div style={{ background:T.bg, color:T.fg, fontFamily:"'DM Sans',sans-serif",
      overflowX:"hidden", minHeight:"100vh", transition:"background .5s, color .5s" }}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;cursor:none!important;}
        html{scroll-behavior:smooth;}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-track{background:${T.bg};}
        ::-webkit-scrollbar-thumb{background:linear-gradient(${T.lav},${T.rose});border-radius:10px;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:none}}
        @keyframes pulse{0%,100%{opacity:.3}50%{opacity:1}}
        @keyframes sparkle{0%,100%{opacity:0;transform:scale(0) rotate(0deg)}50%{opacity:.8;transform:scale(1) rotate(180deg)}}
        @keyframes orbA{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(40px,-30px) scale(1.06)}66%{transform:translate(-25px,20px) scale(.95)}}
        @keyframes orbB{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(-30px,25px) scale(.96)}66%{transform:translate(20px,-30px) scale(1.04)}}
        @keyframes orbC{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(25px,35px) scale(1.05)}66%{transform:translate(-35px,-20px) scale(.97)}}
        @keyframes orbD{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(-20px,-25px) scale(1.03)}66%{transform:translate(30px,15px) scale(.98)}}
        @keyframes orbE{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-15px,-20px) scale(1.07)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes gradShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes shimmer{0%{opacity:.4}50%{opacity:1}100%{opacity:.4}}
        @keyframes trailSpark{0%{opacity:1;transform:translate(-50%,-50%) translate(0,0) scale(1) rotate(0deg)}100%{opacity:0;transform:translate(-50%,-50%) translate(var(--dx),var(--dy)) scale(0) rotate(240deg)}}
        @keyframes heroSparkle{0%,100%{opacity:0;transform:scale(0) rotate(0deg)}40%{opacity:1;transform:scale(1.2) rotate(120deg)}60%{opacity:.8;transform:scale(1) rotate(180deg)}}
        html{scroll-behavior:smooth;overflow-x:hidden;}
        body{overflow-x:hidden;}
        section{scroll-margin-top:96px;}
        @media(max-width:860px){section{scroll-margin-top:58px;}}
        .rd-hero{padding-top:96px;}
        @media(max-width:860px){
          .rd-2col,.rd-3col{grid-template-columns:1fr!important;}
          .rd-hero{padding-top:58px!important;padding-left:1.5rem!important;padding-right:1.5rem!important;}
          .rd-hero-grid{grid-template-columns:1fr!important;gap:3rem!important;text-align:center;}
          .rd-inner{padding:0 1.5rem!important;}
          .rd-section{padding:4.5rem 0!important;}
          .rd-ctas{flex-direction:column!important;align-items:flex-start!important;}
          .rd-hero-grid>div:last-child{order:-1;}
        }
        @media(max-width:600px){
          .rd-ctas{align-items:center!important;}
        }
      `}</style>

      {/* ── SCROLL PROGRESS ── */}
      <ScrollProgress T={T}/>

      {/* ── CURSOR SPARKLE TRAIL ── */}
      <SparkleTrail T={T}/>

      {/* ── CUSTOM CURSOR ── */}
      <div style={{ position:"fixed", zIndex:9999, pointerEvents:"none",
        left:cursor.x, top:cursor.y, transform:"translate(-50%,-50%)",
        width:blend?16:8, height:blend?16:8,
        background:T.lav, borderRadius:"50%",
        boxShadow:`0 0 ${blend?24:10}px ${T.lav}cc`,
        transition:"width .2s,height .2s,box-shadow .25s" }}/>
      <div style={{ position:"fixed", zIndex:9998, pointerEvents:"none",
        left:ring.x, top:ring.y, transform:"translate(-50%,-50%)",
        width:blend?52:30, height:blend?52:30,
        border:`1.5px solid ${T.lav}88`, borderRadius:"50%",
        boxShadow:`0 0 14px ${T.lav}44`,
        transition:"width .35s,height .35s" }}/>

      {/* ── HEADER ── */}
      <Header T={T} dark={dark} setDark={setDark} activeNav={activeNav}
        NAV={NAV} hOn={hOn} hOff={hOff}/>

      {/* ════════════════ HERO ════════════════ */}
      <section id="hero" className="rd-hero"
        style={{ minHeight:"100vh", display:"flex", alignItems:"center",
          padding:"0 4rem", position:"relative", overflow:"hidden" }}>

        <FloatingOrbs T={T}/>
        <SparkleField/>

        {/* subtle grid */}
        <div style={{ position:"absolute", inset:0, pointerEvents:"none",
          backgroundImage:`linear-gradient(${T.lav}08 1px,transparent 1px),linear-gradient(90deg,${T.lav}08 1px,transparent 1px)`,
          backgroundSize:"80px 80px", opacity:.6 }}/>

        {/* dark vignette for contrast */}
        <div style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:1,
          background:"radial-gradient(ellipse 80% 80% at 30% 50%, rgba(10,7,22,.8) 0%, transparent 65%)" }}/>

        {/* ── SPLIT LAYOUT ── */}
        <div className="rd-hero-grid" style={{
          position:"relative", zIndex:2,
          display:"grid", gridTemplateColumns:"1fr 1fr",
          gap:"5rem", alignItems:"center",
          width:"100%", maxWidth:1160, margin:"0 auto",
        }}>

          {/* LEFT — name + content */}
          <div>
            {/* status pill */}
            <div style={{ display:"inline-flex", alignItems:"center", gap:".6rem",
              background:T.lav+"15", border:`1px solid ${T.lav}35`,
              padding:".35rem 1.2rem", borderRadius:30, marginBottom:"2rem",
              opacity:0, animation:"fadeUp .7s .2s ease forwards" }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#7dffa8",
                boxShadow:"0 0 8px #7dffa8", display:"inline-block" }}/>
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".6rem",
                letterSpacing:".15em", textTransform:"uppercase", color:T.lav }}>
                M.S. Computer Engineering · NYU
              </span>
            </div>

            {/* NAME */}
            <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700,
              lineHeight:.88, letterSpacing:"-.02em", marginBottom:"1.6rem",
              opacity:0, animation:"fadeUp .9s .35s ease forwards" }}>
              <span style={{ display:"block", fontSize:"clamp(3.8rem,7.5vw,8rem)",
                color:"#ffffff",
                textShadow:`0 0 50px #c4a8ffdd, 0 0 100px #c4a8ff55, 0 2px 4px rgba(0,0,0,.5)` }}>
                Bhagya
              </span>
              <span style={{ display:"block", fontSize:"clamp(3.8rem,7.5vw,8rem)", fontStyle:"italic",
                background:"linear-gradient(135deg, #c4a8ff 0%, #ffadc7 55%, #ffd4a8 100%)",
                backgroundSize:"200% 200%",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                backgroundClip:"text",
                animation:"gradShift 4s ease infinite" }}>
                Rekha
              </span>
              <span style={{ display:"block", fontSize:"clamp(2.8rem,5.5vw,6rem)",
                color:"#ffadc7",
                textShadow:`0 0 40px #ffadc7bb, 0 0 80px #ffadc744, 0 2px 4px rgba(0,0,0,.5)` }}>
                Deenadayal.
              </span>
            </h1>

            {/* typewriter */}
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".82rem",
              letterSpacing:".12em", textTransform:"uppercase",
              color:T.fgMid, marginBottom:"2.2rem", minHeight:"1.3rem",
              opacity:0, animation:"fadeUp .8s .6s ease forwards" }}>
              {roles}
              <span style={{ animation:"blink 1s step-end infinite", color:T.lav }}>|</span>
            </div>

            {/* stats row */}
            <div style={{ display:"flex", gap:"2rem", marginBottom:"2.5rem", flexWrap:"wrap",
              opacity:0, animation:"fadeUp .8s .75s ease forwards" }}>
              {[["3+","Yrs Industry"],["80+","Students"],["2","Papers"],["5","Projects"]].map(([n,l]) => (
                <div key={l}>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700,
                    fontSize:"2rem", lineHeight:1, color:"#ffffff",
                    textShadow:`0 0 20px ${T.lav}88` }}>{n}</div>
                  <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".52rem",
                    letterSpacing:".1em", textTransform:"uppercase",
                    color:T.fgDim, marginTop:".25rem" }}>{l}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="rd-ctas" style={{ display:"flex", gap:"1rem", flexWrap:"wrap",
              opacity:0, animation:"fadeUp .8s .9s ease forwards" }}
              onMouseEnter={hOn} onMouseLeave={hOff}>
              <MagBtn href="#projects" primary T={T}>View My Work →</MagBtn>
              <MagBtn href="#contact" T={T}>Get In Touch</MagBtn>
              <MagBtn href="/resume.pdf" T={T}>Resume ↓</MagBtn>
            </div>
          </div>

          {/* RIGHT — photo */}
          <div style={{ display:"flex", justifyContent:"center", alignItems:"center",
            opacity:0, animation:"fadeUp 1s .5s ease forwards" }}>
            <div style={{ position:"relative" }}>
              {/* outer glow ring */}
              <div style={{ position:"absolute", inset:-16,
                borderRadius:"38% 62% 55% 45% / 45% 45% 55% 55%",
                background:`linear-gradient(135deg, ${T.lav}40, ${T.rose}30, ${T.mint}20)`,
                filter:"blur(20px)", animation:"orbA 8s ease-in-out infinite" }}/>
              {/* rotating border */}
              <div style={{ position:"absolute", inset:-4,
                borderRadius:"38% 62% 55% 45% / 45% 45% 55% 55%",
                background:`linear-gradient(135deg, ${T.lav}, ${T.rose}, ${T.peach}, ${T.lav})`,
                animation:"orbB 6s linear infinite", padding:3 }}>
                <div style={{ width:"100%", height:"100%", background:T.bg,
                  borderRadius:"38% 62% 55% 45% / 45% 45% 55% 55%" }}/>
              </div>
              {/* photo container */}
              <div style={{
                width:"clamp(280px,28vw,400px)", height:"clamp(280px,28vw,400px)",
                borderRadius:"38% 62% 55% 45% / 45% 45% 55% 55%",
                overflow:"hidden", position:"relative",
                border:`2px solid ${T.lav}40`,
              }}>
                  <div style={{ width:"100%", height:"100%",
                  background:`linear-gradient(145deg, ${T.bg2} 0%, #1e1540 50%, #2a1060 100%)`,
                  display:"flex", flexDirection:"column",
                  alignItems:"center", justifyContent:"center", gap:0, position:"relative" }}>
                  {/* subtle grid texture */}
                  <div style={{ position:"absolute", inset:0, pointerEvents:"none",
                    backgroundImage:`radial-gradient(circle, ${T.lav}15 1px, transparent 1px)`,
                    backgroundSize:"24px 24px" }}/>
                  {/* initials avatar */}
                  <div style={{ position:"relative", width:120, height:120, borderRadius:"50%",
                    background:`linear-gradient(135deg, ${T.lav}, ${T.rose})`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontFamily:"'Cormorant Garamond',serif", fontWeight:700,
                    fontSize:"3rem", color:"#fff",
                    boxShadow:`0 0 40px ${T.lav}70, 0 0 80px ${T.lav}30` }}>BR</div>
                </div>
              </div>
              {/* floating sparkles around photo */}
              {[["-18px","20%",T.lav],["-14px","75%",T.rose],["95%","10%",T.mint],["100%","80%",T.peach]].map(([l,t,c],i)=>(
                <div key={i} style={{ position:"absolute", left:l, top:t,
                  width:8, height:8, animation:`sparkle ${2.5+i*.4}s ${i*.6}s ease-in-out infinite` }}>
                  <svg viewBox="0 0 20 20" width={8} height={8}>
                    <path d="M10 0L11.8 8.2L20 10L11.8 11.8L10 20L8.2 11.8L0 10L8.2 8.2Z" fill={c}/>
                  </svg>
                </div>
              ))}
            </div>
          </div>

        </div>{/* end split grid */}

        {/* scroll indicator */}
        <div style={{ position:"absolute", bottom:"2.5rem", left:"50%", transform:"translateX(-50%)",
          display:"flex", flexDirection:"column", alignItems:"center", gap:".5rem",
          opacity:0, animation:"fadeUp 1s 1.3s ease forwards" }}>
          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".5rem",
            letterSpacing:".2em", textTransform:"uppercase", color:T.fgDim }}>scroll</span>
          <div style={{ width:1, height:44,
            background:`linear-gradient(to bottom,${T.lav},transparent)`,
            animation:"pulse 2s ease-in-out infinite",
            boxShadow:`0 0 8px ${T.lav}` }}/>
        </div>
      </section>

      <Divider fromBg={T.bg} toBg={T.bg1} T={T}/>

      {/* ════════════════ ABOUT ════════════════ */}
      <Spotlight bg={T.bg1} T={T}>
        <section id="about" className="rd-section" style={{ padding:"8rem 0" }}>
          <div className="rd-inner" style={{ maxWidth:1160, margin:"0 auto", padding:"0 4rem" }}>
            <div className="rd-2col" style={{ display:"grid", gridTemplateColumns:"1fr 1.6fr", gap:"6rem", alignItems:"start" }}>
              <div>
                <SectionHeader label="About Me" title="The Person<br/>Behind the<br/>Code." T={T}/>
                <Reveal delay={.2}>
                  <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
                    {[["3+","Years in Industry","#c4a8ff"],["80+","Students Mentored","#ffadc7"],["2","Published Papers","#9de8c4"],["5","Projects Shipped","#ffd4a8"]].map(([n,l,c]) => (
                      <div key={l} style={{ display:"flex", alignItems:"baseline", gap:".8rem",
                        padding:"1.1rem 0", borderBottom:`1px solid ${T.border}` }}>
                        <span style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700,
                          fontSize:"2.8rem", lineHeight:1, color:c, minWidth:"4rem",
                          textShadow:`0 0 20px ${c}60` }}>{n}</span>
                        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".6rem",
                          letterSpacing:".12em", textTransform:"uppercase", color:T.fgDim }}>{l}</span>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
              <div>
                <Reveal delay={.1}>
                  <p style={{ fontSize:"1.1rem", lineHeight:1.88, color:T.fg, fontWeight:400, marginBottom:"1.4rem" }}>
                    I got into engineering because I couldn't stop asking how things actually worked. That question led me from enterprise codebases at Accenture to building a RISC-V processor in Verilog to studying neural networks that fall apart when you add exactly the right kind of noise to an image. It's been an odd path. I like it.
                  </p>
                </Reveal>
                <Reveal delay={.16}>
                  <p style={{ fontSize:".97rem", lineHeight:1.88, color:T.fgMid, fontWeight:300, marginBottom:"1.2rem" }}>
                    Three years in enterprise software taught me that the interesting problems are rarely technical. The hard part is usually figuring out what someone actually needs versus what they wrote in the requirements doc — and then making something that doesn't break on a Friday when everyone's already left. I got good at both. I also published two research papers somewhere in between, which surprised me more than anyone.
                  </p>
                </Reveal>
                <Reveal delay={.22}>
                  <p style={{ fontSize:".97rem", lineHeight:1.88, color:T.fgMid, fontWeight:300, marginBottom:"2.2rem" }}>
                    At NYU now, doing research on where machine learning quietly fails, and running recitations in advanced mathematics on the side. Teaching turned out to be useful — nothing exposes the gaps in your own understanding like having to explain contour integration to someone who's frustrated, tired, and has three other deadlines.
                  </p>
                </Reveal>
                <Reveal delay={.28}>
                  <div style={{ background:T.glass, backdropFilter:"blur(12px)",
                    border:`1px solid ${T.lav}30`, borderRadius:16,
                    padding:"1.8rem 2rem", position:"relative", overflow:"hidden" }}>
                    <div style={{ position:"absolute", top:0, left:0, width:3, height:"100%",
                      background:`linear-gradient(to bottom,${T.lav},${T.rose})`,
                      borderRadius:"0 0 0 16px" }}/>
                    <div style={{ position:"absolute", top:-30, right:-30, width:100, height:100,
                      borderRadius:"50%", background:T.lav, filter:"blur(40px)", opacity:.12 }}/>
                    <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".64rem",
                      letterSpacing:".15em", textTransform:"uppercase",
                      color:T.lav, marginBottom:"1rem" }}>✦ Right now</p>
                    {[
                      "Running recitations for graduate PDEs & Complex Variables — making Fourier transforms make sense (mostly)",
                      "Studying how vision models fail under adversarial conditions — they fail in more interesting ways than you'd expect",
                      "Building a mental health platform, because some problems are worth the scope creep",
                      "Figuring out what cloud-scale neural architecture actually looks like when the benchmark is gone",
                    ].map((item, i) => (
                      <div key={i} style={{ display:"flex", gap:".65rem", alignItems:"flex-start",
                        marginBottom:".65rem", fontSize:".87rem", color:T.fgMid, lineHeight:1.7 }}>
                        <span style={{ width:4, height:4, background:T.lav, borderRadius:"50%",
                          marginTop:9, flexShrink:0, boxShadow:`0 0 6px ${T.lav}` }}/>
                        {item}
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      </Spotlight>

      <Divider fromBg={T.bg1} toBg={T.bg} T={T}/>

      {/* ════════════════ PROJECTS ════════════════ */}
      <Spotlight bg={T.bg} T={T}>
        <section id="projects" className="rd-section" style={{ padding:"8rem 0" }}>
          <div className="rd-inner" style={{ maxWidth:1160, margin:"0 auto", padding:"0 4rem" }}>
            <SectionHeader label="Selected Work" title="Projects." T={T}/>
            <div className="rd-3col" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)",
              gap:"1.2rem" }} onMouseEnter={hOn} onMouseLeave={hOff}>
              {PROJECTS.map((p, i) => (
                <Reveal key={p.num} delay={i*.07}>
                  <ProjectCard p={p} T={T}/>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Spotlight>

      <Divider fromBg={T.bg} toBg={T.bg1} T={T}/>

      {/* ════════════════ RESEARCH ════════════════ */}
      <Spotlight bg={T.bg1} T={T}>
        <section id="research" className="rd-section" style={{ padding:"8rem 0" }}>
          <div className="rd-inner" style={{ maxWidth:1160, margin:"0 auto", padding:"0 4rem" }}>
            <SectionHeader label="Academic Work" title="Research &amp;<br/>Publications." T={T}/>
            <div className="rd-2col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr",
              gap:"1.2rem", marginBottom:"1.5rem" }} onMouseEnter={hOn} onMouseLeave={hOff}>
              {RESEARCH.map((r, i) => (
                <Reveal key={i} delay={i*.09}>
                  <ResearchCard r={r} T={T}/>
                </Reveal>
              ))}
            </div>
            <Reveal delay={.2}>
              <div style={{ background:T.glass, backdropFilter:"blur(12px)",
                border:`1px solid ${T.border}`, borderRadius:16,
                padding:"2rem 2.5rem" }}>
                <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700,
                  fontSize:"1.2rem", color:T.fg, marginBottom:"1.2rem" }}>✦ Collaboration Highlights</h3>
                {[
                  "Co-authored and presented two papers at ISCComm-2023.",
                  "Mentored peer research teams on evaluation design and reproducible experiments.",
                  "Active collaboration across ML systems, software engineering, and digital design at NYU.",
                ].map((item, i) => (
                  <div key={i} style={{ display:"flex", gap:".65rem", alignItems:"flex-start",
                    marginBottom:".65rem", fontSize:".88rem", color:T.fgMid, lineHeight:1.7 }}>
                    <span style={{ width:4, height:4, background:T.rose, borderRadius:"50%",
                      marginTop:9, flexShrink:0, boxShadow:`0 0 6px ${T.rose}` }}/>
                    {item}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      </Spotlight>

      <Divider fromBg={T.bg1} toBg={T.bg} T={T}/>

      {/* ════════════════ EXPERIENCE ════════════════ */}
      <Spotlight bg={T.bg} T={T}>
        <section id="experience" className="rd-section" style={{ padding:"8rem 0" }}>
          <div className="rd-inner" style={{ maxWidth:1160, margin:"0 auto", padding:"0 4rem" }}>
            <SectionHeader label="Career" title="Industry<br/>Experience." T={T}/>
            <div className="rd-2col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr",
              gap:"1.2rem", marginBottom:"5rem" }} onMouseEnter={hOn} onMouseLeave={hOff}>
              {EXPERIENCE.map((e, i) => (
                <Reveal key={i} delay={i*.09}>
                  <ExpCard item={e} T={T}/>
                </Reveal>
              ))}
            </div>
            <SectionHeader label="Academia" title="Teaching &amp;<br/>Academic Roles." T={T}/>
            <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}
              onMouseEnter={hOn} onMouseLeave={hOff}>
              {TEACHING.map((t, i) => (
                <Reveal key={i} delay={i*.07}>
                  <ExpCard item={t} isTeach T={T}/>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Spotlight>

      <Divider fromBg={T.bg} toBg={T.bg1} T={T}/>

      {/* ════════════════ SKILLS ════════════════ */}
      <Spotlight bg={T.bg1} T={T}>
        <section id="skills" className="rd-section" style={{ padding:"8rem 0" }}>
          <div className="rd-inner" style={{ maxWidth:1160, margin:"0 auto", padding:"0 4rem" }}>
            <SectionHeader label="Technical Skills" title="Skills &amp;<br/>Expertise." T={T}/>
            <div style={{ background:T.glass, backdropFilter:"blur(12px)",
              border:`1px solid ${T.border}`, borderRadius:20, overflow:"hidden" }}>
              {Object.entries(SKILLS).map(([cat, items], i) => (
                <Reveal key={cat} delay={i*.06}>
                  <div style={{ display:"flex", alignItems:"flex-start", gap:"2rem",
                    padding:"1.8rem 2.5rem",
                    borderBottom:i < Object.keys(SKILLS).length-1 ? `1px solid ${T.border}` : "none" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:".5rem",
                      minWidth:"10rem", paddingTop:".35rem", flexShrink:0 }}>
                      <span style={{ fontSize:".6rem", color:SKILL_COLORS[i] }}>✦</span>
                      <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".58rem",
                        letterSpacing:".12em", textTransform:"uppercase",
                        color:SKILL_COLORS[i] }}>{cat}</span>
                    </div>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:".45rem" }}>
                      {items.map(s => <SkillTag key={s} text={s} color={SKILL_COLORS[i]} T={T}/>)}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Spotlight>

      <Divider fromBg={T.bg1} toBg={T.bg} T={T}/>

      {/* ════════════════ CONTACT ════════════════ */}
      <Spotlight bg={T.bg} T={T}>
        <section id="contact" className="rd-section" style={{ padding:"8rem 0" }}>
          <div className="rd-inner" style={{ maxWidth:1160, margin:"0 auto", padding:"0 4rem" }}>
            <SectionHeader label="Get In Touch" title="Let's<br/>Connect." T={T}/>

            <div style={{ marginBottom:"2.5rem" }} onMouseEnter={hOn} onMouseLeave={hOff}>
              {CONTACT_ROWS.map((row, i) => (
                <Reveal key={i} delay={i*.09}>
                  <ContactRow row={row} T={T}/>
                </Reveal>
              ))}
            </div>

            <Reveal delay={.3}>
              <div style={{ background:T.glass, backdropFilter:"blur(12px)",
                border:`1px solid ${T.border}`, borderRadius:20, padding:"2.2rem 2.5rem",
                position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", top:-40, right:-40, width:160, height:160,
                  borderRadius:"50%", background:T.lav, filter:"blur(60px)", opacity:.12 }}/>
                <div style={{ position:"absolute", bottom:-40, left:-40, width:120, height:120,
                  borderRadius:"50%", background:T.rose, filter:"blur(50px)", opacity:.1 }}/>
                <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".64rem",
                  letterSpacing:".15em", textTransform:"uppercase", color:T.lav, marginBottom:"1rem" }}>
                  ✦ Available for
                </p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:".8rem" }}>
                  {[
                    ["Full-Time SWE Roles", T.lav],
                    ["ML / AI Engineering", T.rose],
                    ["Research Collaborations", T.mint],
                    ["Freelance Projects", T.peach],
                  ].map(([tag, color]) => (
                    <span key={tag} style={{ fontFamily:"'JetBrains Mono',monospace",
                      fontSize:".62rem", letterSpacing:".08em", textTransform:"uppercase",
                      padding:".4rem 1.1rem", borderRadius:20,
                      border:`1px solid ${color}55`, color:color,
                      background:color+"18",
                      boxShadow:`0 0 12px ${color}25` }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </Spotlight>

      {/* ── FOOTER ── */}
      <footer style={{ background:T.bg1, borderTop:`1px solid ${T.border}`,
        padding:"2rem 4rem", display:"flex", justifyContent:"space-between",
        alignItems:"center", flexWrap:"wrap", gap:"1rem" }}>
        <span style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600,
          fontSize:"1rem", color:T.fgDim }}>
          © 2025 Bhagya Rekha Deenadayal
        </span>
        <div style={{ display:"flex", alignItems:"center", gap:".5rem" }}>
          <span style={{ color:T.lav, fontSize:".7rem" }}>✦</span>
          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".56rem",
            letterSpacing:".1em", textTransform:"uppercase", color:T.fgDim }}>
            Designed &amp; built from scratch
          </span>
          <span style={{ color:T.rose, fontSize:".7rem" }}>✦</span>
        </div>
      </footer>
    </div>
  );
}
