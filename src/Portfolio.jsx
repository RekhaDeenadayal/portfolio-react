import { useState, useEffect, useRef, useCallback } from "react";

// ── FONTS ─────────────────────────────────────────────────────────────────────
if (!document.getElementById("rd-fonts")) {
  const l = document.createElement("link");
  l.id = "rd-fonts"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap";
  document.head.appendChild(l);
}

// ── THEME TOKENS ──────────────────────────────────────────────────────────────
const DARK = {
  bg0:"#0a0a0a", bg1:"#111111", bg2:"#161616",
  fg:"#f0ede6", fgMid:"rgba(240,237,230,.62)", fgDim:"rgba(240,237,230,.32)",
  border:"rgba(255,255,255,.08)", borderHov:"rgba(255,77,77,.5)",
  accent:"#FF4D4D", accentDim:"rgba(255,77,77,.18)", accentText:"#FF4D4D",
  cardBg:"#0d0d0d", cardHov:"#131313",
  navBg:"rgba(10,10,10,.96)", ghost:"rgba(255,255,255,.04)",
  spotlight:"rgba(255,77,77,.04)",
};
const LIGHT = {
  bg0:"#fafaf8", bg1:"#f2f0eb", bg2:"#eae8e1",
  fg:"#111111", fgMid:"rgba(17,17,17,.62)", fgDim:"rgba(17,17,17,.38)",
  border:"rgba(0,0,0,.1)", borderHov:"rgba(255,77,77,.5)",
  accent:"#e03030", accentDim:"rgba(255,77,77,.1)", accentText:"#e03030",
  cardBg:"#ffffff", cardHov:"#f5f3ee",
  navBg:"rgba(250,250,248,.97)", ghost:"rgba(0,0,0,.04)",
  spotlight:"rgba(255,77,77,.03)",
};

// ── DATA ──────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    num:"01", year:"2024", type:"AI / Full-Stack",
    name:"Aether", subtitle:"AI Video Support Companion",
    impact:"60% faster support response",
    desc:"Built a real-time AI support tool that watches video alongside users. Integrated OpenVINO + LangChain + YOLO for multimodal scene understanding — the system identifies what a user is looking at and responds intelligently. Deployed with React + Node/Express.",
    tech:["React","Node.js","OpenVINO","LangChain","YOLO","Express"],
    color:"#FF4D4D",
  },
  {
    num:"02", year:"2024", type:"Safety / AI",
    name:"Self Embrace", subtitle:"Mental Health & Safety Platform",
    impact:"500+ active users · 99.9% uptime",
    desc:"Designed and shipped a crisis-support platform with SOS messaging and empathetic AI assistants powered by Amazon Bedrock. Built a FastAPI backend + Next.js frontend with streamlined CI/CD pipelines and near-perfect availability.",
    tech:["FastAPI","Next.js","MongoDB","Amazon Bedrock","AWS","CI/CD"],
    color:"#ff8c42",
  },
  {
    num:"03", year:"2023", type:"Finance / Web",
    name:"Stock Search", subtitle:"Real-Time Market Dashboard",
    impact:"10K+ daily API calls processed",
    desc:"Full-stack market dashboard with real-time autocomplete, watchlists, live news feeds, and interactive charts. Deployed on AWS Elastic Beanstalk with REST data services and smart caching to handle high request volumes reliably.",
    tech:["React","Node.js","AWS Elastic Beanstalk","Highcharts","REST APIs"],
    color:"#FF4D4D",
  },
  {
    num:"04", year:"2024", type:"Hardware / Computer Architecture",
    name:"RISC-V CPU Simulator", subtitle:"Cycle-Accurate 32-bit Processor",
    impact:"Full pipeline + hazard detection",
    desc:"Engineered a cycle-accurate simulator for a 32-bit RISC-V processor from the ground up. Implemented instruction pipeline execution, hazard detection, and stall logic. Benchmarked CPI, IPC, and throughput — demonstrating deep understanding of processor microarchitecture.",
    tech:["RISC-V","Verilog","Computer Architecture","HDL Simulation"],
    color:"#ff8c42",
  },
  {
    num:"05", year:"2024", type:"ML / AI Security",
    name:"Adversarial Pixel Attacks", subtitle:"Robustness Study on ResNet-34",
    impact:"FGSM · PGD · Patch-PGD evaluated",
    desc:"Implemented and evaluated three adversarial attack strategies — FGSM, PGD, and Patch-PGD — on ResNet-34 and DenseNet-121. Measured transferability across architectures and robustness trade-offs, analyzing defense failure modes and Top-1/Top-5 accuracy impact.",
    tech:["PyTorch","Deep Learning","Adversarial ML","DenseNet-121","ResNet-34"],
    color:"#FF4D4D",
  },
];

const RESEARCH = [
  {
    title:"Neural Network Techniques for Cloud Resource Scalability",
    venue:"ISCComm-2023",
    desc:"Designed and validated NN-based resource management models to improve scalability across multi-cloud deployments. Proposed an adaptive load model with empirical benchmarks demonstrating measurable improvements in auto-scaling response.",
    tags:["Neural Networks","Cloud Computing","Auto-Scaling","Multi-Cloud"],
    color:"#FF4D4D",
  },
  {
    title:"Streamlining Software Migration with Model-Driven Engineering",
    venue:"ISCComm-2023",
    desc:"Developed a framework that automates legacy-to-cloud migrations using model-driven engineering (MDE) with structured transformation rules — reducing manual rework and migration risk for enterprise systems.",
    tags:["MDE","Legacy Migration","Cloud","Software Engineering"],
    color:"#ff8c42",
  },
];

const EXPERIENCE = [
  {
    role:"Software Engineer", company:"Accenture", period:"Mar 2022 – Aug 2024", location:"India",
    summary:"Built and shipped enterprise-grade React UIs integrated with SAP backend APIs, serving real production workflows for large-scale clients.",
    points:[
      "Engineered React front-end components tightly integrated with SAP backend APIs and data services — bridging the gap between front-end and platform teams.",
      "Improved data connectivity flows and UX consistency across multiple product surfaces, reducing friction for end users.",
      "Worked directly on SAP-powered production environments, gaining deep exposure to enterprise data pipelines and workflow systems.",
    ],
  },
  {
    role:"Software Engineering Intern", company:"Kaar Technologies", period:"Mar 2021 – Feb 2022", location:"India",
    summary:"Contributed to full-stack feature development using JavaScript and SAP frameworks in an agile team.",
    points:[
      "Delivered full-stack features using JavaScript and SAP-adjacent frameworks as part of agile sprint cycles.",
      "Wrote UI polish code and backend validation/testing scripts, improving product quality and reliability.",
      "Collaborated across team functions — planning, standups, retrospectives — developing strong delivery habits early.",
    ],
  },
];

const TEACHING = [
  {
    role:"Recitation Leader — Advanced PDE", org:"NYU Courant", period:"Sep 2025 – Present",
    points:[
      "Lead weekly recitations for graduate students on PDEs, Fourier series, and integral transforms.",
      "Design problem sets and rubrics tightly aligned with lecture objectives — improving student outcomes.",
      "Host targeted exam review sessions and 1:1 office hours for students who need extra support.",
    ],
  },
  {
    role:"Recitation Leader — Advanced Complex Variables", org:"NYU Courant", period:"Jan–May 2025",
    points:[
      "Taught analytic functions, contour integration, and complex transformations to graduate mathematics students.",
      "Developed quiz materials and worked through advanced proofs in an accessible, structured way.",
      "Managed Piazza/Gradescope with a consistent 48-hour feedback turnaround.",
    ],
  },
  {
    role:"Graduate Assistant — Advanced Control Systems", org:"NYU Tandon", period:"Jan–May 2025",
    points:[
      "Assisted in lab setup, assignment design, and grading for a graduate-level control systems course.",
      "Guided students through stability modeling and MATLAB/Simulink simulations — 40+ students mentored.",
      "Held weekly office hours focused on state-space modeling, transfer functions, and feedback design.",
    ],
  },
];

const SKILLS = {
  "Languages":      ["JavaScript","TypeScript","C","SQL","HTML/CSS","ABAP","Verilog","Python"],
  "Frameworks":     ["React","Next.js","Node.js","Express","Redux","Tailwind CSS","FastAPI"],
  "Databases":      ["MongoDB","MySQL"],
  "Cloud & DevOps": ["AWS","CI/CD","Git","Docker"],
  "ML & AI":        ["PyTorch","LangChain","OpenVINO","Amazon Bedrock","YOLO"],
  "Other Tools":    ["JIRA","Agile/Scrum","MATLAB/Simulink","Gradescope"],
};

const CONTACT_ROWS = [
  { label:"Email",    handle:"hello@rekhadeenadayal.com",          href:"mailto:hello@rekhadeenadayal.com" },
  { label:"LinkedIn", handle:"linkedin.com/in/rekhadeenadayal",    href:"https://linkedin.com/in/rekhadeenadayal" },
  { label:"GitHub",   handle:"github.com/rekhadeenadayal",         href:"https://github.com/rekhadeenadayal" },
];

// ── HOOKS ─────────────────────────────────────────────────────────────────────
function useScramble(text, active) {
  const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
  const [disp, setDisp] = useState(text);
  const rafRef = useRef(null);
  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    if (!active) { setDisp(text); return; }
    let frame = 0; const total = 20;
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

function useMagnetic(str = 0.38) {
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

// ── REVEAL ────────────────────────────────────────────────────────────────────
function Reveal({ children, delay=0, from="bottom" }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold:.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const init = from==="left" ? "translateX(-24px)" : from==="right" ? "translateX(24px)" : "translateY(24px)";
  return (
    <div ref={ref} style={{ opacity:vis?1:0, transform:vis?"translate(0)":init,
      transition:`opacity .7s ${delay}s ease, transform .7s ${delay}s ease` }}>
      {children}
    </div>
  );
}

// ── SPOTLIGHT SECTION ────────────────────────────────────────────────────────
function Spotlight({ children, bg, T }) {
  const ref = useRef(null);
  const [m, setM] = useState({ x:-999, y:-999 });
  return (
    <div ref={ref} onMouseMove={e => { const r=ref.current.getBoundingClientRect(); setM({ x:e.clientX-r.left, y:e.clientY-r.top }); }}
      onMouseLeave={() => setM({ x:-999, y:-999 })}
      style={{ background:bg, position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:1,
        background:`radial-gradient(550px circle at ${m.x}px ${m.y}px, ${T.spotlight} 0%, transparent 70%)`,
        transition:"background .08s" }}/>
      <div style={{ position:"relative", zIndex:2 }}>{children}</div>
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
    setTilt({ x:((e.clientY-r.top)/r.height-.5)*10, y:((e.clientX-r.left)/r.width-.5)*10 });
  };
  return (
    <div ref={ref}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => { setOpen(false); setTilt({ x:0, y:0 }); }}
      onMouseMove={onMove}
      style={{
        background: open ? T.cardHov : T.cardBg,
        border:`1px solid ${open ? p.color+"55" : T.border}`,
        padding:"2rem", position:"relative", overflow:"hidden",
        transform:`perspective(900px) rotateX(${open?-tilt.x*.28:0}deg) rotateY(${open?tilt.y*.28:0}deg) translateZ(${open?6:0}px)`,
        boxShadow: open ? `0 24px 60px ${p.color}20, 0 0 0 1px ${p.color}25` : "none",
        transition:"transform .2s ease, background .3s, border-color .3s, box-shadow .3s",
        willChange:"transform", cursor:"default",
      }}>

      <div style={{ position:"absolute", top:"1.2rem", right:"1.2rem",
        background: open ? p.color+"22" : "transparent",
        border:`1px solid ${open ? p.color+"55" : "transparent"}`,
        padding:".25rem .7rem", borderRadius:2,
        fontFamily:"'JetBrains Mono',monospace", fontSize:".58rem",
        letterSpacing:".08em", textTransform:"uppercase",
        color: open ? p.color : "transparent",
        transition:"all .3s" }}>
        {p.impact}
      </div>

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"1rem" }}>
        <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"3.5rem",
          color:open?p.color:T.ghost==="rgba(255,255,255,.04)"?"rgba(255,255,255,.05)":"rgba(0,0,0,.06)",
          lineHeight:1, transition:"color .3s" }}>{p.num}</span>
        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".58rem",
          color:T.fgDim, letterSpacing:".1em" }}>{p.year}</span>
      </div>

      <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".62rem", letterSpacing:".14em",
        textTransform:"uppercase", color:p.color, marginBottom:".4rem",
        opacity:open?1:.65, transition:"opacity .3s" }}>{p.type}</p>

      <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.65rem",
        letterSpacing:"-.02em", marginBottom:".2rem", color:T.fg }}>{p.name}</h3>
      <p style={{ fontSize:".8rem", color:T.fgDim, fontStyle:"italic", marginBottom:"1rem" }}>{p.subtitle}</p>

      <div style={{ maxHeight:open?300:0, overflow:"hidden",
        transition:"max-height .45s cubic-bezier(.4,0,.2,1)", opacity:open?1:0 }}>
        <p style={{ fontSize:".88rem", lineHeight:1.78, color:T.fgMid, fontWeight:300, marginBottom:"1.2rem" }}>{p.desc}</p>
      </div>

      <div style={{ display:"flex", flexWrap:"wrap", gap:".4rem", marginBottom:open?"1.3rem":0, transition:"margin .3s" }}>
        {p.tech.map(t => (
          <span key={t} style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".57rem",
            letterSpacing:".05em", padding:".28rem .6rem", textTransform:"uppercase",
            background:open?p.color+"18":"transparent",
            border:`1px solid ${open?p.color+"44":T.border}`,
            color:open?p.color:T.fgDim,
            transition:"all .3s" }}>{t}</span>
        ))}
      </div>

      <div style={{ display:"flex", alignItems:"center", gap:".5rem",
        opacity:open?1:0, transform:open?"translateX(0)":"translateX(-10px)",
        transition:"opacity .3s .1s, transform .3s .1s" }}>
        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".63rem",
          letterSpacing:".1em", textTransform:"uppercase", color:p.color }}>View on GitHub</span>
        <span style={{ color:p.color }}>→</span>
      </div>

      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:2,
        background:`linear-gradient(90deg,transparent,${p.color},transparent)`,
        opacity:open?.85:0, transition:"opacity .4s", pointerEvents:"none" }}/>
    </div>
  );
}

// ── RESEARCH CARD ─────────────────────────────────────────────────────────────
function ResearchCard({ r, T }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background:hov?T.cardHov:T.cardBg,
        border:`1px solid ${hov?r.color+"55":T.border}`,
        padding:"2rem", transition:"all .3s", cursor:"default",
        borderTop:`3px solid ${hov?r.color:T.border}` }}>
      <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".6rem", letterSpacing:".12em",
        textTransform:"uppercase", color:r.color, display:"inline-block",
        background:r.color+"18", padding:".25rem .7rem", marginBottom:"1.2rem" }}>{r.venue}</span>
      <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1.1rem",
        letterSpacing:"-.01em", lineHeight:1.4, marginBottom:"1rem", color:T.fg }}>{r.title}</h3>
      <p style={{ fontSize:".87rem", lineHeight:1.78, color:T.fgMid, fontWeight:300, marginBottom:"1.5rem" }}>{r.desc}</p>
      <div style={{ display:"flex", flexWrap:"wrap", gap:".4rem", marginBottom:"1.5rem" }}>
        {r.tags.map(t => (
          <span key={t} style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".57rem",
            letterSpacing:".05em", padding:".28rem .6rem", textTransform:"uppercase",
            background:hov?r.color+"18":"transparent",
            border:`1px solid ${hov?r.color+"44":T.border}`,
            color:hov?r.color:T.fgDim, transition:"all .3s" }}>{t}</span>
        ))}
      </div>
      <a href="#" style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".65rem",
        letterSpacing:".1em", textTransform:"uppercase", color:r.color, textDecoration:"none",
        border:`1px solid ${r.color+"55"}`, padding:".45rem 1rem",
        display:"inline-flex", alignItems:"center", gap:6,
        background:hov?r.color+"15":"transparent", transition:"background .2s" }}>
        View PDF →
      </a>
    </div>
  );
}

// ── EXP CARD ─────────────────────────────────────────────────────────────────
function ExpCard({ item, isTeach, T }) {
  const [open, setOpen] = useState(false);
  return (
    <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}
      style={{ background:open?T.cardHov:T.bg0,
        borderLeft:`3px solid ${open?T.accent:T.border}`,
        padding:"1.8rem 2rem", transition:"background .25s,border-color .3s", cursor:"default" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"1rem", marginBottom:".6rem" }}>
        <div>
          <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1.15rem",
            letterSpacing:"-.01em", color:open?T.fg:T.fgMid, transition:"color .25s" }}>{item.role}</h3>
          <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".67rem",
            color:open?T.accent:T.fgDim, letterSpacing:".1em", marginTop:".2rem", transition:"color .25s" }}>
            {isTeach ? `${item.org} · ${item.period}` : `${item.company} · ${item.period}`}
          </p>
        </div>
      </div>
      {!open && item.summary && (
        <p style={{ fontSize:".86rem", color:T.fgDim, lineHeight:1.6, marginBottom:".5rem" }}>{item.summary}</p>
      )}
      <div style={{ maxHeight:open?300:0, overflow:"hidden",
        transition:"max-height .4s cubic-bezier(.4,0,.2,1)", opacity:open?1:0 }}>
        {item.points.map((pt, j) => (
          <div key={j} style={{ display:"flex", gap:".65rem", alignItems:"flex-start",
            marginBottom:".65rem", fontSize:".87rem", color:T.fgMid, lineHeight:1.68 }}>
            <span style={{ width:4, height:4, background:T.accent, borderRadius:"50%",
              marginTop:9, flexShrink:0, display:"inline-block" }}/>
            {pt}
          </div>
        ))}
      </div>
      <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".57rem", letterSpacing:".12em",
        textTransform:"uppercase", color:T.fgDim, marginTop:".3rem",
        opacity:open?0:1, transition:"opacity .2s" }}>hover to expand</div>
    </div>
  );
}

// ── SKILL TAG ────────────────────────────────────────────────────────────────
function SkillTag({ text, T }) {
  const [hov, setHov] = useState(false);
  const { ref, off, onMove, onLeave } = useMagnetic(.5);
  return (
    <span ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); onLeave(); }}
      onMouseMove={onMove}
      style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".61rem", letterSpacing:".07em",
        padding:".42rem .9rem", textTransform:"uppercase",
        background:hov?T.accent:"transparent",
        border:`1px solid ${hov?T.accent:T.border}`,
        color:hov?"#fff":T.fgMid,
        transform:`translate(${off.x}px,${off.y}px)`,
        transition:"background .2s,border-color .2s,color .2s,transform .35s cubic-bezier(.23,1,.32,1)",
        display:"inline-block", cursor:"default", willChange:"transform" }}>
      {text}
    </span>
  );
}

// ── MAGNETIC BTN ─────────────────────────────────────────────────────────────
function MagBtn({ children, href, primary, T }) {
  const { ref, off, onMove, onLeave } = useMagnetic(.42);
  return (
    <a href={href} ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ display:"inline-flex", alignItems:"center", gap:8,
        background:primary?T.accent:"transparent",
        color:primary?"#fff":T.fg,
        border:primary?"none":`1px solid ${T.border}`,
        fontFamily:"'JetBrains Mono',monospace", fontSize:".74rem",
        fontWeight:500, letterSpacing:".12em", textTransform:"uppercase",
        textDecoration:"none", padding:"1rem 2rem",
        transform:`translate(${off.x}px,${off.y}px)`,
        transition:"transform .4s cubic-bezier(.23,1,.32,1),background .2s,box-shadow .2s",
        boxShadow:primary?`0 8px 30px ${T.accent}40`:"none",
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
        padding:"1.4rem 2rem", paddingLeft:hov?"2.6rem":"2rem",
        background:hov?T.cardHov:T.bg0,
        textDecoration:"none", color:T.fg,
        borderLeft:`3px solid ${hov?T.accent:"transparent"}`,
        transition:"background .25s,padding-left .35s cubic-bezier(.23,1,.32,1),border-color .25s" }}>
      <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.5rem", letterSpacing:"-.01em" }}>{scrambled}</span>
      <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".67rem", color:T.fgDim, letterSpacing:".05em" }}>{row.handle}</span>
      <span style={{ color:T.accent, fontSize:"1.1rem", opacity:hov?1:0,
        transform:hov?"translateX(0)":"translateX(-10px)", transition:"opacity .2s,transform .2s" }}>↗</span>
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
        <p onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
          style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".67rem", letterSpacing:".22em",
            textTransform:"uppercase", color:T.accent, marginBottom:".7rem", cursor:"default" }}>
          {scrambled}
        </p>
      </Reveal>
      <Reveal delay={delay+.08}>
        <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800,
          fontSize:"clamp(2.6rem,4.8vw,4.2rem)", lineHeight:.93,
          letterSpacing:"-.03em", marginBottom:"3rem", color:T.fg }}
          dangerouslySetInnerHTML={{ __html:title }}/>
      </Reveal>
    </>
  );
}

// ── HEADER ───────────────────────────────────────────────────────────────────
function Header({ T, dark, setDark, activeNav, NAV, hOn, hOff }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 860);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 860);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  const SOCIALS = [
    { label:"GitHub",   icon:"GH", href:"https://github.com/rekhadeenadayal" },
    { label:"LinkedIn", icon:"in", href:"https://linkedin.com/in/rekhadeenadayal" },
    { label:"Email",    icon:"@",  href:"mailto:hello@rekhadeenadayal.com" },
  ];

  return (
    <header style={{ position:"fixed", top:0, left:0, right:0, zIndex:100,
      background:T.navBg, backdropFilter:"blur(12px)",
      borderBottom:`1px solid ${T.border}`,
      transition:"background .4s, border-color .4s" }}>

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
        padding:isMobile ? ".9rem 1.5rem" : "1rem 4rem",
        borderBottom:`1px solid ${T.border}` }}>

        <div style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
          <div style={{ width:38, height:38, borderRadius:"50%", flexShrink:0,
            background:`linear-gradient(135deg,${T.accent},#ff8c42)`,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:".8rem", color:"#fff" }}>BR</div>

          <div>
            <a href="#hero" onClick={handleNavClick}
              style={{ fontFamily:"'Syne',sans-serif", fontWeight:800,
                fontSize:isMobile ? ".95rem" : "1.05rem",
                color:T.fg, textDecoration:"none", letterSpacing:"-.02em",
                display:"block", lineHeight:1.15 }}>
              Bhagya Rekha Deenadayal
            </a>
            {!isMobile && (
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".58rem",
                letterSpacing:".1em", textTransform:"uppercase", color:T.fgDim }}>
                Engineer · Researcher · Educator
              </span>
            )}
          </div>

          {!isMobile && (
            <div style={{ display:"flex", alignItems:"center", gap:6,
              background:T.accentDim, border:`1px solid ${T.accent}44`,
              padding:".25rem .7rem", marginLeft:".2rem" }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#4cff91",
                display:"inline-block", boxShadow:"0 0 6px #4cff91bb" }}/>
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".56rem",
                letterSpacing:".1em", textTransform:"uppercase", color:T.accent }}>
                Open to Roles
              </span>
            </div>
          )}
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:".75rem" }}>
          {!isMobile && SOCIALS.map(s => (
            <a key={s.label} href={s.href} title={s.label}
              onMouseEnter={hOn} onMouseLeave={hOff}
              style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".65rem",
                fontWeight:600, width:30, height:30,
                display:"flex", alignItems:"center", justifyContent:"center",
                border:`1px solid ${T.border}`, color:T.fgDim,
                textDecoration:"none", transition:"border-color .2s, color .2s" }}>
              {s.icon}
            </a>
          ))}

          {!isMobile && <div style={{ width:1, height:18, background:T.border }}/>}

          <button onClick={() => setDark(d => !d)} onMouseEnter={hOn} onMouseLeave={hOff}
            style={{ background:T.accentDim, border:`1px solid ${T.accent}44`,
              color:T.accent, fontFamily:"'JetBrains Mono',monospace",
              fontSize:".58rem", letterSpacing:".1em", textTransform:"uppercase",
              padding:".35rem .75rem", transition:"background .2s", cursor:"default",
              whiteSpace:"nowrap" }}>
            {dark ? "☀ Light" : "☾ Dark"}
          </button>

          {isMobile && (
            <button onClick={() => setMenuOpen(o => !o)}
              style={{ background:"transparent", border:`1px solid ${T.border}`,
                color:T.fg, width:34, height:34, display:"flex",
                flexDirection:"column", alignItems:"center", justifyContent:"center",
                gap:5, padding:"0 8px", cursor:"default", flexShrink:0 }}>
              <span style={{ width:"100%", height:1.5, background:menuOpen?T.accent:T.fg,
                display:"block", transform:menuOpen?"translateY(6.5px) rotate(45deg)":"none",
                transition:"transform .25s, background .2s" }}/>
              <span style={{ width:"100%", height:1.5, background:T.fg,
                display:"block", opacity:menuOpen?0:1, transition:"opacity .2s" }}/>
              <span style={{ width:"100%", height:1.5, background:menuOpen?T.accent:T.fg,
                display:"block", transform:menuOpen?"translateY(-6.5px) rotate(-45deg)":"none",
                transition:"transform .25s, background .2s" }}/>
            </button>
          )}
        </div>
      </div>

      {!isMobile && (
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
          padding:".6rem 4rem" }}>
          <ul style={{ display:"flex", gap:"2rem", listStyle:"none", alignItems:"center" }}>
            {NAV.map(n => (
              <li key={n}>
                <a href={`#${n.toLowerCase()}`} onMouseEnter={hOn} onMouseLeave={hOff}
                  style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".61rem",
                    letterSpacing:".14em", textTransform:"uppercase", textDecoration:"none",
                    color:activeNav===n.toLowerCase()?T.accent:T.fgDim,
                    borderBottom:`1px solid ${activeNav===n.toLowerCase()?T.accent:"transparent"}`,
                    paddingBottom:2, transition:"color .2s, border-color .2s" }}>
                  {n}
                </a>
              </li>
            ))}
          </ul>
          <div style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".57rem",
              letterSpacing:".1em", textTransform:"uppercase", color:T.fgDim }}>
              📍 New York, NY
            </span>
            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".57rem",
              letterSpacing:".1em", textTransform:"uppercase",
              color:T.accent, border:`1px solid ${T.accent}44`,
              padding:".18rem .55rem", background:T.accentDim }}>
              NYU M.S. 2026
            </span>
          </div>
        </div>
      )}

      {isMobile && (
        <div style={{ maxHeight:menuOpen?"420px":"0px", overflow:"hidden",
          transition:"max-height .4s cubic-bezier(.4,0,.2,1)",
          background:T.navBg,
          borderTop:menuOpen?`1px solid ${T.border}`:"none" }}>
          <ul style={{ listStyle:"none", padding:"1rem 1.5rem .5rem" }}>
            {NAV.map(n => (
              <li key={n}>
                <a href={`#${n.toLowerCase()}`} onClick={handleNavClick}
                  style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
                    fontFamily:"'JetBrains Mono',monospace", fontSize:".75rem",
                    letterSpacing:".14em", textTransform:"uppercase", textDecoration:"none",
                    color:activeNav===n.toLowerCase()?T.accent:T.fg,
                    padding:".85rem 0",
                    borderBottom:`1px solid ${T.border}`,
                    transition:"color .2s" }}>
                  <span>{n}</span>
                  {activeNav===n.toLowerCase() && (
                    <span style={{ width:6, height:6, borderRadius:"50%", background:T.accent, display:"inline-block" }}/>
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
                <a key={s.label} href={s.href} title={s.label}
                  style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".65rem",
                    fontWeight:600, width:32, height:32,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    border:`1px solid ${T.border}`, color:T.fgDim,
                    textDecoration:"none", borderRadius:2 }}>
                  {s.icon}
                </a>
              ))}
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:6,
              background:T.accentDim, border:`1px solid ${T.accent}44`, padding:".25rem .65rem" }}>
              <span style={{ width:5, height:5, borderRadius:"50%", background:"#4cff91",
                display:"inline-block", boxShadow:"0 0 5px #4cff91aa" }}/>
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".55rem",
                letterSpacing:".1em", textTransform:"uppercase", color:T.accent }}>
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
  const [dark, setDark]          = useState(true);
  const [cursor, setCursor]      = useState({ x:-100, y:-100 });
  const [ring,   setRing]        = useState({ x:-100, y:-100 });
  const [blend,  setBlend]       = useState(false);
  const [activeNav, setActiveNav]= useState("hero");
  const ringTarget = useRef({ x:-100, y:-100 });
  const raf = useRef(null);
  const T = dark ? DARK : LIGHT;

  useEffect(() => {
    const move = e => { setCursor({ x:e.clientX, y:e.clientY }); ringTarget.current = { x:e.clientX, y:e.clientY }; };
    window.addEventListener("mousemove", move);
    const tick = () => {
      setRing(p => ({ x:p.x+(ringTarget.current.x-p.x)*.12, y:p.y+(ringTarget.current.y-p.y)*.12 }));
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

  const NAV = ["About","Projects","Research","Experience","Skills","Contact"];
  const hOn  = () => setBlend(true);
  const hOff = () => setBlend(false);

  return (
    <div style={{ background:T.bg0, color:T.fg, fontFamily:"'DM Sans',sans-serif",
      overflowX:"hidden", minHeight:"100vh", transition:"background .4s,color .4s" }}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;cursor:none!important;}
        html{scroll-behavior:smooth;}
        ::-webkit-scrollbar{width:2px;}
        ::-webkit-scrollbar-track{background:${T.bg0};}
        ::-webkit-scrollbar-thumb{background:${T.accent};}
        @keyframes rdFU{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes rdPulse{0%,100%{opacity:.3}50%{opacity:1}}
        section{scroll-margin-top:96px;}
        @media(max-width:860px){section{scroll-margin-top:58px;}}
        .rd-hero{padding-top:96px;}
        @media(max-width:860px){
          .rd-2col{grid-template-columns:1fr!important;}
          .rd-3col{grid-template-columns:1fr!important;}
          .rd-hero{padding:58px 1.5rem 4rem 1.5rem!important;}
          .rd-inner{padding:0 1.5rem!important;}
          .rd-section{padding:4rem 0!important;}
          .rd-scroll-ind{display:none!important;}
        }
        @media(max-width:600px){
          .rd-ctas{flex-direction:column!important;}
        }
      `}</style>

      {/* ── CURSOR ── */}
      <div style={{ position:"fixed", zIndex:9999, pointerEvents:"none",
        left:cursor.x, top:cursor.y, transform:"translate(-50%,-50%)",
        width:blend?18:10, height:blend?18:10,
        background:blend?"#FF4D4D":T.accent, borderRadius:"50%",
        mixBlendMode:"difference",
        transition:"width .15s,height .15s,background .15s" }}/>
      <div style={{ position:"fixed", zIndex:9998, pointerEvents:"none",
        left:ring.x, top:ring.y, transform:"translate(-50%,-50%)",
        width:blend?56:36, height:blend?56:36,
        border:`1.5px solid ${blend?"#FF4D4D":T.accent}`, borderRadius:"50%",
        mixBlendMode:"difference",
        transition:"width .3s,height .3s,border-color .3s" }}/>

      {/* ── HEADER ── */}
      <Header T={T} dark={dark} setDark={setDark} activeNav={activeNav} NAV={NAV} hOn={hOn} hOff={hOff}/>

      {/* ════════ HERO ════════ */}
      <section id="hero" className="rd-hero"
        style={{ minHeight:"100vh", display:"flex", flexDirection:"column",
          justifyContent:"flex-end", padding:"0 4rem 6rem",
          position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0,
          backgroundImage:`linear-gradient(${T.accent}18 1px,transparent 1px),linear-gradient(90deg,${T.accent}18 1px,transparent 1px)`,
          backgroundSize:"60px 60px", opacity:.4 }}/>
        <div style={{ position:"absolute", inset:0,
          background:`radial-gradient(ellipse 70% 55% at 75% 32%,${T.accent}12 0%,transparent 55%),radial-gradient(ellipse 40% 40% at 12% 75%,${T.accent}08 0%,transparent 55%)` }}/>
        <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800,
          fontSize:"clamp(9rem,19vw,17rem)", lineHeight:.85,
          color:"transparent", WebkitTextStroke:`1px ${dark?"rgba(255,255,255,.04)":"rgba(0,0,0,.05)"}`,
          position:"absolute", right:"-1rem", top:"50%", transform:"translateY(-50%)",
          userSelect:"none", pointerEvents:"none", letterSpacing:"-.04em" }}>BRD</div>

        <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".7rem", letterSpacing:".2em",
          textTransform:"uppercase", color:T.accent, marginBottom:".9rem",
          opacity:0, animation:"rdFU .7s .2s ease forwards" }}>
          M.S. Computer Engineering · NYU · Engineer &amp; Educator
        </p>
        <h1 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800,
          fontSize:"clamp(3.5rem,9vw,8.5rem)", lineHeight:.92, letterSpacing:"-.04em",
          marginBottom:"1.8rem", color:T.fg,
          opacity:0, animation:"rdFU .8s .35s ease forwards" }}>
          Bhagya<br/><span style={{ color:T.accent }}>Rekha</span><br/>Deenadayal.
        </h1>
        <p style={{ maxWidth:540, fontSize:"1.05rem", lineHeight:1.82,
          color:T.fgMid, fontWeight:300, marginBottom:"1.5rem",
          opacity:0, animation:"rdFU .8s .55s ease forwards" }}>
          I build intelligent systems and teach the people who will build them next. Engineer by training at NYU, educator at heart — ex-Accenture software engineer with published AI/cloud research and hands-on experience shipping products that serve thousands.
        </p>
        <div style={{ display:"flex", gap:"2.5rem", marginBottom:"2.5rem", flexWrap:"wrap",
          opacity:0, animation:"rdFU .8s .65s ease forwards" }}>
          {[["🎓","M.S. NYU, 2024–26"],["💼","Ex-Accenture SWE"],["📄","2 Published Papers"],["👩‍🏫","80+ Students Mentored"]].map(([icon,txt]) => (
            <div key={txt} style={{ display:"flex", alignItems:"center", gap:".5rem" }}>
              <span style={{ fontSize:"1rem" }}>{icon}</span>
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".67rem",
                letterSpacing:".08em", color:T.fgMid, textTransform:"uppercase" }}>{txt}</span>
            </div>
          ))}
        </div>
        <div className="rd-ctas" style={{ display:"flex", gap:"1.2rem", flexWrap:"wrap",
          opacity:0, animation:"rdFU .8s .8s ease forwards" }}
          onMouseEnter={hOn} onMouseLeave={hOff}>
          <MagBtn href="#projects" primary T={T}>View My Work →</MagBtn>
          <MagBtn href="#contact" T={T}>Get In Touch</MagBtn>
        </div>
        <div className="rd-scroll-ind" style={{ position:"absolute", right:"4rem", bottom:"5rem",
          display:"flex", flexDirection:"column", alignItems:"center", gap:".6rem",
          opacity:0, animation:"rdFU 1s 1.1s ease forwards" }}>
          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".54rem",
            letterSpacing:".2em", textTransform:"uppercase", color:T.fgDim, writingMode:"vertical-rl" }}>scroll</span>
          <div style={{ width:1, height:48, background:`linear-gradient(to bottom,${T.accent},transparent)`, animation:"rdPulse 2s infinite" }}/>
        </div>
      </section>

      {/* ════════ ABOUT ════════ */}
      <Spotlight bg={T.bg1} T={T}>
        <section id="about" className="rd-section" style={{ padding:"7rem 0" }}>
          <div className="rd-inner" style={{ maxWidth:1160, margin:"0 auto", padding:"0 4rem" }}>
            <div className="rd-2col" style={{ display:"grid", gridTemplateColumns:"1fr 1.7fr", gap:"6rem", alignItems:"start" }}>
              <div>
                <SectionHeader label="About Me" title="The Person<br/>Behind<br/>the Code." T={T}/>
                <Reveal delay={.2}>
                  <div style={{ display:"flex", flexDirection:"column", gap:"1.4rem" }}>
                    {[["3+","Years in Industry"],["80+","Students Mentored"],["2","Published Papers"],["5","Projects Shipped"]].map(([n,l]) => (
                      <div key={l} style={{ display:"flex", alignItems:"baseline", gap:".9rem",
                        paddingBottom:"1.2rem", borderBottom:`1px solid ${T.border}` }}>
                        <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:800,
                          fontSize:"2.6rem", color:T.accent, lineHeight:1, minWidth:"3.5rem" }}>{n}</span>
                        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".62rem",
                          letterSpacing:".12em", textTransform:"uppercase", color:T.fgDim }}>{l}</span>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
              <div>
                <Reveal delay={.1}>
                  <p style={{ fontSize:"1.1rem", lineHeight:1.85, color:T.fg, fontWeight:400, marginBottom:"1.4rem" }}>
                    I'm Bhagya Rekha Deenadayal — an engineer by training and an educator at heart. I build with equal parts curiosity and care, translating research and constraints into experiences that feel clear and dependable.
                  </p>
                </Reveal>
                <Reveal delay={.15}>
                  <p style={{ fontSize:".97rem", lineHeight:1.85, color:T.fgMid, fontWeight:300, marginBottom:"1.2rem" }}>
                    Before NYU, I spent 3+ years at Accenture as a software engineer, shipping real products for enterprise clients using React and SAP platforms. I've also published research on neural networks and cloud systems, and presented at ISCComm-2023.
                  </p>
                </Reveal>
                <Reveal delay={.2}>
                  <p style={{ fontSize:".97rem", lineHeight:1.85, color:T.fgMid, fontWeight:300, marginBottom:"2rem" }}>
                    Today I'm an M.S. student at NYU, exploring how intelligent systems can be both resilient and humane. I teach PDEs and Control Systems as a recitation leader — because I believe the best engineers are also the ones who can explain things clearly.
                  </p>
                </Reveal>
                <Reveal delay={.25}>
                  <div style={{ padding:"1.8rem 2rem", border:`1px solid ${T.accent}30`,
                    background:T.accentDim, position:"relative", overflow:"hidden" }}>
                    <div style={{ position:"absolute", top:0, left:0, width:3, height:"100%", background:T.accent }}/>
                    <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".67rem",
                      letterSpacing:".15em", textTransform:"uppercase", color:T.accent, marginBottom:"1rem" }}>Currently</p>
                    {[
                      "Teaching PDEs & Advanced Control Systems at NYU — 80+ students across two courses",
                      "Researching NN optimization for cloud auto-scaling infrastructure",
                      "Building AI-powered applications with LLM integration and modern web stacks",
                      "Deepening expertise in ML, distributed systems, and embedded computing",
                    ].map((item, i) => (
                      <div key={i} style={{ display:"flex", gap:".7rem", alignItems:"flex-start",
                        marginBottom:".7rem", fontSize:".87rem", color:T.fgMid, lineHeight:1.68 }}>
                        <span style={{ width:4, height:4, background:T.accent, borderRadius:"50%",
                          marginTop:9, flexShrink:0, display:"inline-block" }}/>
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

      {/* ════════ PROJECTS ════════ */}
      <Spotlight bg={T.bg0} T={T}>
        <section id="projects" className="rd-section" style={{ padding:"7rem 0" }}>
          <div className="rd-inner" style={{ maxWidth:1160, margin:"0 auto", padding:"0 4rem" }}>
            <SectionHeader label="Selected Work" title="Projects." T={T}/>
            <div className="rd-3col" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)",
              gap:"1px", background:T.border }} onMouseEnter={hOn} onMouseLeave={hOff}>
              {PROJECTS.map((p, i) => (
                <Reveal key={p.num} delay={i*.07}>
                  <ProjectCard p={p} T={T}/>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Spotlight>

      {/* ════════ RESEARCH ════════ */}
      <Spotlight bg={T.bg1} T={T}>
        <section id="research" className="rd-section" style={{ padding:"7rem 0" }}>
          <div className="rd-inner" style={{ maxWidth:1160, margin:"0 auto", padding:"0 4rem" }}>
            <SectionHeader label="Academic Work" title="Research &amp;<br/>Publications." T={T}/>
            <div className="rd-2col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr",
              gap:"1px", background:T.border, marginBottom:"1px" }} onMouseEnter={hOn} onMouseLeave={hOff}>
              {RESEARCH.map((r, i) => (
                <Reveal key={i} delay={i*.08}>
                  <ResearchCard r={r} T={T}/>
                </Reveal>
              ))}
            </div>
            <Reveal delay={.2}>
              <div style={{ background:T.cardBg, border:`1px solid ${T.border}`, padding:"2rem 2.5rem" }}>
                <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1.15rem",
                  letterSpacing:"-.01em", marginBottom:"1.2rem", color:T.fg }}>Collaboration Highlights</h3>
                {[
                  "Co-authored and presented two papers at ISCComm-2023 on NN-driven resource allocation and MDE-based migration.",
                  "Mentored peer research teams on evaluation design, reproducible experiments, and clear documentation.",
                  "Active collaboration across software engineering, ML systems, and digital design coursework at NYU.",
                ].map((item, i) => (
                  <div key={i} style={{ display:"flex", gap:".7rem", alignItems:"flex-start",
                    marginBottom:".7rem", fontSize:".88rem", color:T.fgMid, lineHeight:1.68 }}>
                    <span style={{ width:4, height:4, background:T.accent, borderRadius:"50%",
                      marginTop:9, flexShrink:0, display:"inline-block" }}/>
                    {item}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      </Spotlight>

      {/* ════════ EXPERIENCE ════════ */}
      <Spotlight bg={T.bg0} T={T}>
        <section id="experience" className="rd-section" style={{ padding:"7rem 0" }}>
          <div className="rd-inner" style={{ maxWidth:1160, margin:"0 auto", padding:"0 4rem" }}>
            <SectionHeader label="Career" title="Industry<br/>Experience." T={T}/>
            <div className="rd-2col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr",
              gap:"1px", background:T.border, marginBottom:"5rem" }} onMouseEnter={hOn} onMouseLeave={hOff}>
              {EXPERIENCE.map((e, i) => (
                <Reveal key={i} delay={i*.08}>
                  <ExpCard item={e} T={T}/>
                </Reveal>
              ))}
            </div>
            <SectionHeader label="Academia" title="Teaching &amp;<br/>Academic Roles." T={T}/>
            <div style={{ display:"flex", flexDirection:"column", gap:"1px", background:T.border }}
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

      {/* ════════ SKILLS ════════ */}
      <Spotlight bg={T.bg1} T={T}>
        <section id="skills" className="rd-section" style={{ padding:"7rem 0" }}>
          <div className="rd-inner" style={{ maxWidth:1160, margin:"0 auto", padding:"0 4rem" }}>
            <SectionHeader label="Technical Skills" title="Skills &amp;<br/>Expertise." T={T}/>
            <div style={{ display:"flex", flexDirection:"column", gap:0, border:`1px solid ${T.border}` }}>
              {Object.entries(SKILLS).map(([category, items], i) => (
                <Reveal key={category} delay={i*.06}>
                  <div style={{ display:"flex", alignItems:"flex-start", gap:"2rem",
                    padding:"1.6rem 2rem",
                    borderBottom:i < Object.keys(SKILLS).length-1 ? `1px solid ${T.border}` : "none" }}>
                    <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".6rem",
                      letterSpacing:".12em", textTransform:"uppercase", color:T.accent,
                      minWidth:"9rem", paddingTop:".4rem", flexShrink:0 }}>{category}</span>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:".5rem" }}>
                      {items.map(s => <SkillTag key={s} text={s} T={T}/>)}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Spotlight>

      {/* ════════ CONTACT ════════ */}
      <Spotlight bg={T.bg0} T={T}>
        <section id="contact" className="rd-section" style={{ padding:"7rem 0" }}>
          <div className="rd-inner" style={{ maxWidth:1160, margin:"0 auto", padding:"0 4rem" }}>
            <SectionHeader label="Get In Touch" title="Let's<br/>Connect." T={T}/>
            <div style={{ border:`1px solid ${T.border}`, display:"flex", flexDirection:"column", gap:"1px",
              background:T.border, marginBottom:"3rem" }}>
              {CONTACT_ROWS.map((row, i) => (
                <Reveal key={i} delay={i*.08}>
                  <ContactRow row={row} T={T}/>
                </Reveal>
              ))}
            </div>
            <Reveal delay={.3}>
              <div style={{ padding:"2.5rem 3rem", background:T.bg1,
                border:`1px solid ${T.border}`, position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", top:0, left:0, width:3, height:"100%", background:T.accent }}/>
                <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".67rem",
                  letterSpacing:".15em", textTransform:"uppercase", color:T.accent, marginBottom:".8rem" }}>
                  Available for
                </p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"1rem" }}>
                  {["Full-Time SWE Roles","ML / AI Engineering","Research Collaborations","Freelance Projects"].map(tag => (
                    <span key={tag} style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".63rem",
                      letterSpacing:".08em", textTransform:"uppercase",
                      padding:".4rem 1rem",
                      border:`1px solid ${T.accent}55`,
                      color:T.accent, background:T.accentDim }}>
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
        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".58rem",
          letterSpacing:".1em", textTransform:"uppercase", color:T.fgDim }}>
          © 2025 Bhagya Rekha Deenadayal
        </span>
        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".58rem",
          letterSpacing:".1em", textTransform:"uppercase", color:T.fgDim }}>
          Designed &amp; built from scratch · React
        </span>
      </footer>
    </div>
  );
}
