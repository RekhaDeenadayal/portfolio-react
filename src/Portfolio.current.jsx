import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import Lenis from "lenis";

// ── FONTS ─────────────────────────────────────────────────────────────────────
if (!document.getElementById("rd-fonts")) {
  const l = document.createElement("link");
  l.id = "rd-fonts"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap";
  document.head.appendChild(l);
}

// ── THEMES ────────────────────────────────────────────────────────────────────
const DARK = {
  bg:"#0C0B09", bg1:"#141210",
  fg:"#EDE9E0", fgMid:"rgba(237,233,224,.45)", fgDim:"rgba(237,233,224,.18)",
  border:"rgba(237,233,224,.07)", borderMid:"rgba(237,233,224,.13)",
  accent:"#C49A3C", accentMid:"rgba(196,154,60,.08)", accentDim:"rgba(196,154,60,.05)",
  navBg:"rgba(12,11,9,.95)",
};
const LIGHT = {
  bg:"#F9F6F0", bg1:"#F0EBE2",
  fg:"#100F0C", fgMid:"rgba(16,15,12,.45)", fgDim:"rgba(16,15,12,.18)",
  border:"rgba(16,15,12,.07)", borderMid:"rgba(16,15,12,.13)",
  accent:"#8B6014", accentMid:"rgba(139,96,20,.08)", accentDim:"rgba(139,96,20,.05)",
  navBg:"rgba(249,246,240,.95)",
};

// ── DATA ──────────────────────────────────────────────────────────────────────
const PROJECTS = [
  { num:"01", year:"2024", type:"AI · Full-Stack", name:"Aether",
    sub:"AI Video Support Companion",
    desc:"What if an AI could watch the same video as a user and understand what they're stuck on? Built the multimodal pipeline with OpenVINO, YOLO, and LangChain — so it sees what you see, not just reads what you type.",
    tech:["React","Node.js","OpenVINO","LangChain","YOLO"],
    href:"https://github.com/RekhaDeenadayal" },
  { num:"02", year:"2024", type:"Safety · AI", name:"Self Embrace",
    sub:"Mental Health & Safety Platform",
    desc:"An SOS system and AI companion that responds like it knows the stakes. The 99.9% uptime wasn't accidental — some things can't go down.",
    tech:["FastAPI","Next.js","MongoDB","Amazon Bedrock","AWS"],
    href:"https://github.com/RekhaDeenadayal" },
  { num:"03", year:"2023", type:"Finance · Web", name:"Stock Search",
    sub:"Real-Time Market Dashboard",
    desc:"A market dashboard built to handle real volume — live autocomplete, watchlists, news feeds, interactive charts. The caching layer was the interesting part.",
    tech:["React","Node.js","AWS","Highcharts","REST APIs"],
    href:"https://github.com/RekhaDeenadayal" },
  { num:"04", year:"2024", type:"Hardware", name:"RISC-V CPU",
    sub:"Cycle-Accurate 32-bit Processor",
    desc:"Built a 32-bit RISC-V processor simulator from scratch — because I wanted to know what a hazard actually is at the hardware level.",
    tech:["RISC-V","Verilog","Computer Architecture","HDL"],
    href:"https://github.com/RekhaDeenadayal" },
  { num:"05", year:"2024", type:"ML Research", name:"Adversarial Study",
    sub:"Robustness on ResNet-34",
    desc:"Made ResNet-34 and DenseNet-121 confidently wrong. The failure modes transfer between architectures in ways that should concern more people.",
    tech:["PyTorch","Adversarial ML","DenseNet","ResNet","Deep Learning"],
    href:"https://github.com/RekhaDeenadayal" },
];

const EXPERIENCE = [
  { role:"Software Engineer", company:"Accenture",
    location:"Chennai, India", period:"Mar 2022 – Aug 2024", years:"2022–2024",
    points:[
      "Engineered React components tightly integrated with SAP backend APIs for enterprise-grade dashboards.",
      "Improved data connectivity flows and UX consistency across large-scale production systems.",
      "Collaborated on end-to-end feature delivery in fast-paced, cross-functional teams.",
    ],
    tech:["React","JavaScript","TypeScript","SAP APIs","REST APIs","CI/CD"],
  },
  { role:"Software Engineering Intern", company:"Kaar Technologies",
    location:"Chennai, India", period:"Mar 2021 – Feb 2022", years:"2021–2022",
    points:[
      "Delivered full-stack features across multiple agile sprint cycles with consistent on-time delivery.",
      "Improved UI validation and form logic, reducing user-reported errors significantly.",
      "Collaborated across design, backend, and QA teams in standups and retrospectives.",
    ],
    tech:["React","Node.js","Express","MySQL","Agile/Scrum"],
  },
];

const SKILLS = {
  "Languages":      ["Python","JavaScript","TypeScript","C","SQL","HTML/CSS","Verilog","Bash"],
  "Frameworks":     ["React","Next.js","Node.js","Express","FastAPI","Flask","NumPy","Pandas"],
  "AI & ML":        ["PyTorch","LangChain","OpenVINO","Amazon Bedrock","YOLO","HuggingFace","TensorFlow"],
  "Cloud & DevOps": ["AWS (EC2, S3, Lambda)","Docker","GitHub Actions","CI/CD","Kubernetes"],
  "Databases":      ["MongoDB","MySQL","PostgreSQL","Redis","Firebase"],
  "Hardware":       ["Verilog/HDL","RISC-V","MATLAB","Fourier Analysis","PDE"],
};

// ── GRAIN ─────────────────────────────────────────────────────────────────────
function GrainOverlay() {
  return (
    <div style={{
      position:"fixed", inset:0, zIndex:1, pointerEvents:"none",
      backgroundImage:`url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='300' height='300' filter='url(%23n)' opacity='0.04'/></svg>")`,
      opacity:0.5,
    }}/>
  );
}

// ── THREE.JS BACKGROUND — low-poly 3D scene ───────────────────────────────────
function ThreeBackground({ dark }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 9;

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, dark ? 0.25 : 0.45));
    const key = new THREE.DirectionalLight(dark ? 0xffd580 : 0xffcc66, dark ? 0.9 : 0.7);
    key.position.set(5, 7, 4);
    scene.add(key);
    const fill = new THREE.DirectionalLight(dark ? 0x3a2a0a : 0xc8a87a, 0.35);
    fill.position.set(-5, -3, 2);
    scene.add(fill);

    // Low-poly object configs
    const cfgs = [
      { geo: new THREE.IcosahedronGeometry(1.5, 0), pos: [ 5.2,  2.5, -3.0], rot: [0.5, 0.8, 0.2], spd: 0.0038 },
      { geo: new THREE.OctahedronGeometry (1.2, 0), pos: [-5.0, -1.2, -2.5], rot: [1.2, 0.3, 0.7], spd: 0.0028 },
      { geo: new THREE.IcosahedronGeometry(1.0, 0), pos: [ 2.8, -3.8, -5.0], rot: [0.2, 1.1, 0.4], spd: 0.0048 },
      { geo: new THREE.TetrahedronGeometry (1.1, 0), pos: [-2.8,  3.8, -4.5], rot: [0.7, 0.5, 1.3], spd: 0.0042 },
      { geo: new THREE.IcosahedronGeometry(1.9, 0), pos: [ 7.5, -1.8, -6.5], rot: [1.0, 0.2, 0.9], spd: 0.0019 },
      { geo: new THREE.OctahedronGeometry (0.9, 0), pos: [-6.2,  1.8, -3.5], rot: [0.3, 1.4, 0.6], spd: 0.0052 },
      { geo: new THREE.IcosahedronGeometry(0.7, 0), pos: [ 0.5,  5.0, -4.0], rot: [0.9, 0.6, 0.3], spd: 0.0035 },
    ];

    const meshCol  = dark ? 0x2a1e08 : 0xcfb99a;
    const edgeCol  = dark ? 0xc49a3c : 0x7a5c30;
    const edgeOpac = dark ? 0.40     : 0.50;

    // Scene group — entire scene rotates with scroll
    const group = new THREE.Group();
    scene.add(group);

    const objects = cfgs.map(({ geo, pos, rot, spd }) => {
      const mat  = new THREE.MeshPhongMaterial({ color: meshCol, flatShading: true, shininess: 12, specular: dark ? 0x7a5520 : 0xa07840 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.add(new THREE.LineSegments(
        new THREE.EdgesGeometry(geo),
        new THREE.LineBasicMaterial({ color: edgeCol, transparent: true, opacity: edgeOpac })
      ));
      mesh.position.set(...pos);
      mesh.rotation.set(...rot);
      group.add(mesh);
      return { mesh, spd };
    });

    // Mouse & scroll tracking
    let scrollY = 0, targetScrollY = 0;
    let mouseX = 0, mouseY = 0, targetMX = 0, targetMY = 0;
    const onScroll = () => { targetScrollY = window.scrollY; };
    const onMouse  = e  => {
      targetMX = (e.clientX / window.innerWidth  - 0.5) * 2;
      targetMY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("scroll",   onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("resize",   onResize);

    let raf;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      // Smooth lerp all values
      scrollY += (targetScrollY - scrollY) * 0.06;
      mouseX  += (targetMX - mouseX) * 0.04;
      mouseY  += (targetMY - mouseY) * 0.04;

      // Individual object spin
      objects.forEach(({ mesh, spd }) => {
        mesh.rotation.x += spd * 0.7;
        mesh.rotation.y += spd;
      });

      // Whole group drifts with scroll (cinematic parallax depth)
      group.rotation.y = scrollY * 0.00035;
      group.rotation.x = scrollY * 0.00015;

      // Camera follows mouse + scroll
      camera.position.x  = mouseX  * 0.5;
      camera.position.y  = mouseY * -0.3 - scrollY * 0.002;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll",    onScroll);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize",    onResize);
      renderer.dispose();
    };
  }, [dark]);

  return (
    <canvas ref={canvasRef} style={{
      position:"fixed", top:0, left:0,
      width:"100%", height:"100%",
      zIndex:0, pointerEvents:"none",
    }}/>
  );
}

// ── CURSOR — mix-blend-mode:difference ────────────────────────────────────────
function Cursor() {
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

// ── INTRO — typewriter → gold sweep → curtain lift ────────────────────────────
function Intro({ onDone }) {
  const FULL = "Rekha Deenadayal";
  const [typed,   setTyped]  = useState("");
  const [lineW,   setLineW]  = useState(0);
  const [lifting, setLift]   = useState(false);
  const [gone,    setGone]   = useState(false);

  useEffect(() => {
    let idx = 0;
    // Phase 1: type the name
    const typeId = setInterval(() => {
      idx++;
      setTyped(FULL.slice(0, idx));
      if (idx >= FULL.length) {
        clearInterval(typeId);
        // Phase 2: gold line sweeps left → right
        const t0  = Date.now();
        const DUR = 520;
        const sweep = () => {
          const p = Math.min((Date.now() - t0) / DUR, 1);
          setLineW(p * 100);
          if (p < 1) { requestAnimationFrame(sweep); }
          else {
            // Phase 3: curtain lifts
            setTimeout(() => {
              setLift(true);
              setTimeout(() => { setGone(true); onDone(); }, 1050);
            }, 160);
          }
        };
        requestAnimationFrame(sweep);
      }
    }, 52);
    return () => clearInterval(typeId);
  }, [onDone]);

  if (gone) return null;

  return (
    <div style={{
      position:"fixed", inset:0, zIndex:8000,
      background:"#0C0B09",
      display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center", gap:20,
      transform: lifting ? "translateY(-100vh)" : "translateY(0)",
      transition: lifting ? "transform 1.05s cubic-bezier(.76,0,.24,1)" : "none",
      pointerEvents: lifting ? "none" : "auto",
    }}>

      {/* Typed name */}
      <div style={{
        fontFamily:"'Cormorant Garamond',serif",
        fontSize:"clamp(28px,4.5vw,58px)",
        fontWeight:300, fontStyle:"italic",
        color:"#EDE9E0", letterSpacing:"0.08em",
        minHeight:"1.2em", display:"flex", alignItems:"center",
      }}>
        {typed}
        {/* blinking cursor — hides once line starts */}
        <span style={{
          display:"inline-block", width:2, height:"0.75em",
          background:"#C49A3C", marginLeft:5, verticalAlign:"middle",
          opacity: lineW > 0 ? 0 : 1,
          transition:"opacity .15s",
          animation: lineW > 0 ? "none" : "rd-blink .75s step-end infinite",
        }}/>
      </div>

      {/* Gold sweep line */}
      <div style={{
        width:"clamp(220px,38vw,420px)", height:1,
        background:"rgba(237,233,224,0.08)",
        position:"relative", overflow:"hidden",
      }}>
        <div style={{
          position:"absolute", top:0, left:0, bottom:0,
          width:`${lineW}%`,
          background:"#C49A3C",
          boxShadow:"0 0 10px #C49A3C80",
        }}/>
      </div>

      {/* Role label */}
      <div style={{
        fontFamily:"'DM Sans',sans-serif", fontSize:9, fontWeight:400,
        letterSpacing:"0.22em", textTransform:"uppercase",
        color:"rgba(237,233,224,0.25)",
        opacity: lineW > 50 ? 1 : 0,
        transform: lineW > 50 ? "translateY(0)" : "translateY(6px)",
        transition:"opacity .4s ease, transform .4s ease",
      }}>Software Engineer · AI Systems</div>

    </div>
  );
}

// ── FIT TEXT — fills container width exactly ──────────────────────────────────
function FitText({ children, T, italic=false, delay=0 }) {
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

// ── REVEAL — 3D perspective entrance ──────────────────────────────────────────
function Reveal({ children, delay=0, y=28 }) {
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

// ── SCROLL PROGRESS ───────────────────────────────────────────────────────────
function ScrollProgress({ T }) {
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

// ── NAV ───────────────────────────────────────────────────────────────────────
function Nav({ T, dark, setDark, active, onNavClick }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const LINKS = [["Work","work"],["Experience","experience"],["Skills","skills"],["Contact","contact"]];

  return (
    <nav style={{
      position:"fixed", top:0, left:0, right:0, zIndex:200,
      background: scrolled ? T.navBg : "transparent",
      borderBottom: scrolled ? `1px solid ${T.border}` : "none",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      transition:"all .35s",
    }}>
      <div style={{
        padding:"0 48px", display:"flex",
        alignItems:"center", justifyContent:"space-between", height:56,
      }}>
        <a href="#" style={{ textDecoration:"none" }}>
          <span style={{
            fontFamily:"'Cormorant Garamond',serif", fontSize:17, fontWeight:400,
            fontStyle:"italic", letterSpacing:"0.06em", color:T.fg,
          }}>RD</span>
        </a>
        <div style={{ display:"flex", alignItems:"center", gap:32 }}>
          {LINKS.map(([label, id]) => {
            const isActive = active === id;
            return (
              <a key={id}
                href={`#${id}`}
                data-hover
                onClick={e => { e.preventDefault(); onNavClick(id); }}
                style={{
                  fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:400,
                  letterSpacing:"0.08em", textTransform:"uppercase",
                  color: isActive ? T.accent : T.fgMid,
                  textDecoration:"none", transition:"color .3s",
                  position:"relative", paddingBottom:2,
                }}
              >
                {label}
                <span style={{
                  position:"absolute", bottom:0, left:0,
                  width: isActive ? "100%" : "0%",
                  height:1, background:T.accent, display:"block",
                  transition:"width .4s cubic-bezier(.4,0,.2,1)",
                }}/>
              </a>
            );
          })}
          <button onClick={() => setDark(d => !d)} data-hover style={{
            background:"none", border:`1px solid ${T.border}`,
            padding:"4px 12px", cursor:"pointer",
            color:T.fgDim, fontSize:10, fontFamily:"'DM Sans',sans-serif",
            letterSpacing:"0.1em", textTransform:"uppercase", transition:"all .2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor=T.accent; e.currentTarget.style.color=T.accent; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor=T.border; e.currentTarget.style.color=T.fgDim; }}
          >{dark?"Light":"Dark"}</button>
        </div>
      </div>
    </nav>
  );
}

// ── HERO — multi-layer parallax ───────────────────────────────────────────────
function Hero({ T }) {
  const sy = useRef(0);
  const nameRef  = useRef(null);
  const metaRef  = useRef(null);
  const ghostRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    let raf;
    const tick = () => {
      const s = window.scrollY;
      sy.current = s;
      if (nameRef.current)  nameRef.current.style.transform  = `translateY(${s * 0.14}px)`;
      if (metaRef.current)  metaRef.current.style.transform  = `translateY(${s * 0.05}px)`;
      if (ghostRef.current) ghostRef.current.style.transform = `translateY(${s * 0.24}px)`;
      if (labelRef.current) labelRef.current.style.transform =
        `translateY(calc(-50% + ${s * 0.03}px)) rotate(-90deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section style={{
      minHeight:"100vh", display:"flex", flexDirection:"column",
      justifyContent:"flex-end", padding:"0 48px 52px",
      position:"relative", overflow:"hidden",
    }}>

      {/* Depth 3 — ghost year, moves fastest */}
      <div ref={ghostRef} style={{
        position:"absolute", right:"-3vw", top:"10%",
        fontFamily:"'Cormorant Garamond',serif",
        fontSize:"clamp(100px,18vw,260px)",
        fontWeight:300, color:T.border,
        lineHeight:1, letterSpacing:"-0.05em",
        userSelect:"none", pointerEvents:"none",
        willChange:"transform", zIndex:1,
      }}>2025</div>

      {/* Depth 1 — vertical label, barely moves */}
      <div ref={labelRef} style={{
        position:"absolute", left:48, top:"50%",
        transformOrigin:"center center",
        fontFamily:"'DM Sans',sans-serif", fontSize:9, fontWeight:400,
        letterSpacing:"0.28em", textTransform:"uppercase",
        color:T.fgDim, whiteSpace:"nowrap",
        pointerEvents:"none", willChange:"transform", zIndex:2,
      }}>Software Engineer · AI Systems · NYU Tandon</div>

      {/* Scroll indicator — right edge */}
      <div style={{
        position:"absolute", right:48, bottom:100,
        display:"flex", flexDirection:"column", alignItems:"center", gap:8, zIndex:2,
      }}>
        <div style={{ width:1, height:60, background:T.border }}/>
        <span style={{
          fontFamily:"'DM Sans',sans-serif", fontSize:8,
          letterSpacing:"0.2em", textTransform:"uppercase", color:T.fgDim,
          writingMode:"vertical-rl",
        }}>Scroll</span>
      </div>

      {/* Depth 2 — name, primary parallax layer */}
      <div ref={nameRef} style={{
        marginBottom:40, willChange:"transform",
        position:"relative", zIndex:2,
      }}>
        <FitText T={T} italic={false} delay={0.1}>Rekha</FitText>
        <FitText T={T} italic={true}  delay={0.22}>Deenadayal</FitText>
      </div>

      {/* Depth 1 — bottom meta, barely moves */}
      <div ref={metaRef} style={{
        display:"flex", justifyContent:"space-between", alignItems:"flex-end",
        flexWrap:"wrap", gap:24,
        borderTop:`1px solid ${T.border}`, paddingTop:28,
        position:"relative", zIndex:2, willChange:"transform",
      }}>
        <Reveal delay={0.6} y={12}>
          <p style={{
            fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:300,
            color:T.fgMid, lineHeight:1.9, margin:0, maxWidth:380,
          }}>
            Building at the intersection of AI and full-stack engineering —
            from multimodal pipelines to hardware simulators.
            MS candidate at NYU Tandon.
          </p>
        </Reveal>
        <Reveal delay={0.7} y={12}>
          <div style={{ display:"flex", gap:24, alignItems:"center" }}>
            <a href="#work" data-hover style={{
              fontFamily:"'DM Sans',sans-serif", fontSize:10, fontWeight:500,
              letterSpacing:"0.14em", textTransform:"uppercase",
              color:T.bg, background:T.fg,
              padding:"11px 26px", textDecoration:"none", transition:"opacity .2s",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity=".7"}
            onMouseLeave={e => e.currentTarget.style.opacity="1"}
            >View Work</a>
            <a href="/resume.pdf" target="_blank" data-hover style={{
              fontFamily:"'DM Sans',sans-serif", fontSize:10, fontWeight:400,
              letterSpacing:"0.1em", textTransform:"uppercase",
              color:T.fgMid, textDecoration:"none",
              borderBottom:`1px solid ${T.borderMid}`, paddingBottom:2,
              transition:"color .2s, border-color .2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.color=T.accent; e.currentTarget.style.borderColor=T.accent; }}
            onMouseLeave={e => { e.currentTarget.style.color=T.fgMid; e.currentTarget.style.borderColor=T.borderMid; }}
            >Résumé ↗</a>
          </div>
        </Reveal>
      </div>

      {/* Stats */}
      <Reveal delay={0.8} y={8}>
        <div style={{ display:"flex", gap:40, marginTop:32, position:"relative", zIndex:2 }}>
          {[["3+","Yrs industry"],["5","Projects"],["MS","NYU Tandon"]].map(([v,l]) => (
            <div key={l}>
              <div style={{
                fontFamily:"'Cormorant Garamond',serif", fontSize:24,
                fontWeight:300, color:T.fg, lineHeight:1, marginBottom:4,
              }}>{v}</div>
              <div style={{
                fontFamily:"'DM Sans',sans-serif", fontSize:9,
                letterSpacing:"0.16em", textTransform:"uppercase", color:T.fgDim,
              }}>{l}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

// ── PROJECTS — sticky horizontal carousel ─────────────────────────────────────
function Projects({ T }) {
  const wrapRef  = useRef(null);
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const N = PROJECTS.length;

  useEffect(() => {
    const onScroll = () => {
      const wrap  = wrapRef.current;
      const track = trackRef.current;
      if (!wrap || !track) return;
      const { top } = wrap.getBoundingClientRect();
      const scrolled = -top;
      const range    = wrap.offsetHeight - window.innerHeight;
      if (range <= 0) return;
      const t        = Math.max(0, Math.min(1, scrolled / range));
      const rawIdx   = t * (N - 1);
      // Direct DOM manipulation — no React re-render lag
      track.style.transform = `translateX(-${rawIdx * (100 / N)}%)`;
      setActive(Math.round(rawIdx));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [N]);

  return (
    <section id="work">
      {/* Sticky carousel */}
      <div ref={wrapRef} style={{ height:`${(N + 1.5) * 100}vh` }}>
        <div style={{ position:"sticky", top:0, height:"100vh", overflow:"hidden" }}>

          {/* Section label — top left */}
          <div style={{
            position:"absolute", top:40, left:48, zIndex:10,
            fontFamily:"'DM Sans',sans-serif", fontSize:9, fontWeight:400,
            letterSpacing:"0.22em", textTransform:"uppercase", color:T.accent,
          }}>Selected Work</div>

          {/* Counter — top right */}
          <div style={{
            position:"absolute", top:38, right:48, zIndex:10,
            fontFamily:"'Cormorant Garamond',serif", fontSize:14,
            fontStyle:"italic", color:T.fgDim,
          }}>
            {String(active + 1).padStart(2,"0")} / {String(N).padStart(2,"0")}
          </div>

          {/* Progress dots — bottom center */}
          <div style={{
            position:"absolute", bottom:40, left:"50%",
            transform:"translateX(-50%)", display:"flex", gap:8, zIndex:10,
          }}>
            {PROJECTS.map((_, i) => (
              <div key={i} style={{
                width: i === active ? 28 : 8, height:2,
                background: i === active ? T.accent : T.borderMid,
                transition:"width .4s cubic-bezier(.4,0,.2,1), background .3s",
              }}/>
            ))}
          </div>

          {/* Horizontal track */}
          <div ref={trackRef} style={{
            display:"flex", width:`${N * 100}%`, height:"100%",
            willChange:"transform",
          }}>
            {PROJECTS.map((proj, i) => (
              <div key={i} style={{
                width:`${100 / N}%`, height:"100%",
                display:"grid", gridTemplateColumns:"1fr 1fr",
                alignItems:"center", gap:"6vw",
                padding:"0 8vw", boxSizing:"border-box",
              }}>
                {/* Left — number + name */}
                <div>
                  <div style={{
                    fontFamily:"'Cormorant Garamond',serif",
                    fontSize:"clamp(80px,13vw,180px)",
                    fontWeight:300, color:T.border, lineHeight:0.85,
                    letterSpacing:"-0.05em", userSelect:"none",
                  }}>{proj.num}</div>
                  <h2 style={{
                    fontFamily:"'Cormorant Garamond',serif",
                    fontSize:"clamp(32px,4.5vw,64px)",
                    fontWeight:300, color:T.fg,
                    margin:"0 0 10px", letterSpacing:"-0.02em", lineHeight:1.0,
                  }}>{proj.name}</h2>
                  <div style={{
                    fontFamily:"'DM Sans',sans-serif", fontSize:12,
                    fontWeight:300, color:T.fgMid, marginBottom:16,
                  }}>{proj.sub}</div>
                  <div style={{ display:"flex", gap:16, alignItems:"center" }}>
                    <span style={{
                      fontFamily:"'DM Sans',sans-serif", fontSize:9,
                      color:T.accent, letterSpacing:"0.16em", textTransform:"uppercase",
                    }}>{proj.type}</span>
                    <span style={{ width:20, height:1, background:T.borderMid, display:"block" }}/>
                    <span style={{
                      fontFamily:"'DM Sans',sans-serif", fontSize:9,
                      color:T.fgDim, letterSpacing:"0.1em",
                    }}>{proj.year}</span>
                  </div>
                </div>

                {/* Right — description + tech + link */}
                <div>
                  <p style={{
                    fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:300,
                    color:T.fgMid, lineHeight:1.85, margin:"0 0 28px", maxWidth:500,
                  }}>{proj.desc}</p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:36 }}>
                    {proj.tech.map(t => (
                      <span key={t} style={{
                        fontFamily:"'DM Sans',sans-serif", fontSize:9,
                        letterSpacing:"0.12em", textTransform:"uppercase",
                        color:T.accent, border:`1px solid ${T.accent}`,
                        padding:"4px 10px", opacity:0.7,
                      }}>{t}</span>
                    ))}
                  </div>
                  <a href={proj.href} target="_blank" rel="noreferrer" data-hover style={{
                    display:"inline-flex", alignItems:"center", gap:10,
                    fontFamily:"'DM Sans',sans-serif", fontSize:11,
                    letterSpacing:"0.14em", textTransform:"uppercase",
                    color:T.fgMid, textDecoration:"none",
                    borderBottom:`1px solid ${T.borderMid}`, paddingBottom:4,
                    transition:"color .2s, border-color .2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color=T.accent; e.currentTarget.style.borderColor=T.accent; }}
                  onMouseLeave={e => { e.currentTarget.style.color=T.fgMid; e.currentTarget.style.borderColor=T.borderMid; }}
                  >View on GitHub ↗</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── EXPERIENCE ────────────────────────────────────────────────────────────────
function Experience({ T }) {
  const [active, setActive] = useState(0);
  const [key, setKey] = useState(0);
  const e = EXPERIENCE[active];

  function switchTo(i) {
    if (i === active) return;
    setActive(i); setKey(k => k+1);
  }

  return (
    <section id="experience" style={{ padding:"140px 48px" }}>
      <style>{`@keyframes exp-up{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>

      {/* Section header */}
      <Reveal>
        <div style={{ display:"flex", alignItems:"center", gap:20, marginBottom:80 }}>
          <div style={{ flex:1, height:1, background:T.border }}/>
          <span style={{
            fontFamily:"'DM Sans',sans-serif", fontSize:10, fontWeight:400,
            letterSpacing:"0.22em", textTransform:"uppercase", color:T.accent,
          }}>Experience</span>
          <div style={{ flex:1, height:1, background:T.border }}/>
        </div>
      </Reveal>

      <div style={{ display:"grid", gridTemplateColumns:"200px 1fr", gap:0 }}>

        {/* Left */}
        <div style={{ position:"relative", paddingRight:40 }}>
          <div style={{ position:"absolute", right:0, top:0, bottom:0, width:1, background:T.border }}/>
          <div style={{
            position:"absolute", right:0,
            top: active * 88, height:64, width:2,
            background:T.accent,
            transition:"top .35s cubic-bezier(.4,0,.2,1)",
          }}/>
          {EXPERIENCE.map((ex,i) => (
            <div key={i} data-hover onClick={() => switchTo(i)} style={{
              height:88, display:"flex", flexDirection:"column", justifyContent:"center",
              cursor:"pointer", paddingRight:24,
              opacity: active === i ? 1 : 0.35, transition:"opacity .25s",
            }}>
              <div style={{
                fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:500,
                color: active === i ? T.fg : T.fgMid,
                marginBottom:4, transition:"color .2s",
              }}>{ex.company}</div>
              <div style={{
                fontFamily:"'DM Sans',sans-serif", fontSize:10, fontWeight:300,
                letterSpacing:"0.04em", color:T.fgDim,
              }}>{ex.years}</div>
            </div>
          ))}
        </div>

        {/* Right */}
        <div key={key} style={{ paddingLeft:56, animation:"exp-up .4s ease both" }}>
          <div style={{
            fontFamily:"'Cormorant Garamond',serif",
            fontSize:"clamp(28px,3.5vw,48px)",
            fontWeight:300, color:T.fg,
            letterSpacing:"-0.02em", lineHeight:1.1, marginBottom:8,
          }}>{e.role}</div>

          <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:44, flexWrap:"wrap" }}>
            <span style={{
              fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:500,
              letterSpacing:"0.1em", textTransform:"uppercase", color:T.accent,
            }}>{e.company}</span>
            <span style={{ width:3, height:3, borderRadius:"50%", background:T.fgDim, flexShrink:0 }}/>
            <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:300, color:T.fgDim }}>{e.period}</span>
            <span style={{ width:3, height:3, borderRadius:"50%", background:T.fgDim, flexShrink:0 }}/>
            <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:300, color:T.fgDim }}>{e.location}</span>
          </div>

          {e.points.map((pt,j) => (
            <div key={j} style={{
              display:"grid", gridTemplateColumns:"28px 1fr",
              gap:"0 16px", marginBottom:22, alignItems:"start",
            }}>
              <div style={{
                fontFamily:"'Cormorant Garamond',serif", fontSize:12,
                color:T.accent, letterSpacing:"0.08em", paddingTop:2,
              }}>{String(j+1).padStart(2,"0")}</div>
              <div style={{
                fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:300,
                color:T.fgMid, lineHeight:1.85,
              }}>{pt}</div>
            </div>
          ))}

          <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginTop:32 }}>
            {e.tech.map(t => (
              <span key={t} style={{
                fontFamily:"'DM Sans',sans-serif", fontSize:10,
                color:T.fgDim, border:`1px solid ${T.border}`,
                padding:"4px 12px", letterSpacing:"0.04em",
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}



// ── MAGNETIC CARD — skill tag with 3D tilt + cursor glow ─────────────────────
function MagneticCard({ T, skill }) {
  const ref = useRef(null);
  const [hov, setHov]   = useState(false);
  const [glow, setGlow] = useState({ x:50, y:50 });
  const [tilt, setTilt] = useState({ x:0, y:0 });

  const onMove = e => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top)  / r.height;
    setGlow({ x: px * 100, y: py * 100 });
    setTilt({ x: (py - 0.5) * -14, y: (px - 0.5) * 14 });
  };

  return (
    <div
      ref={ref}
      data-hover
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setTilt({ x:0, y:0 }); }}
      onMouseMove={onMove}
      style={{
        padding:"9px 18px",
        border:`1px solid ${hov ? T.accent : T.border}`,
        background: hov ? T.accentDim : "transparent",
        position:"relative", overflow:"hidden",
        cursor:"default",
        transform:`perspective(400px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition:"border-color .2s, background .2s, box-shadow .25s, transform .08s",
        boxShadow: hov ? `0 0 24px ${T.accent}28, inset 0 0 16px ${T.accent}0a` : "none",
        willChange:"transform",
      }}
    >
      {hov && (
        <div style={{
          position:"absolute", width:100, height:100,
          borderRadius:"50%",
          background:`radial-gradient(circle, ${T.accent}38 0%, transparent 70%)`,
          pointerEvents:"none",
          left:`calc(${glow.x}% - 50px)`,
          top:`calc(${glow.y}% - 50px)`,
        }}/>
      )}
      <span style={{
        fontFamily:"'DM Sans',sans-serif",
        fontSize:"clamp(9px,0.85vw,11px)", fontWeight:400,
        letterSpacing:"0.13em", textTransform:"uppercase",
        color: hov ? T.accent : T.fgMid,
        position:"relative", zIndex:1,
        transition:"color .2s",
      }}>{skill}</span>
    </div>
  );
}

// ── SKILLS — Sticky scroll + magnetic cards + glow ───────────────────────────
function Skills({ T }) {
  const sectionRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const cats = Object.keys(SKILLS);
  const N    = cats.length;

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect     = el.getBoundingClientRect();
      const progress = -rect.top / (rect.height - window.innerHeight);
      setActiveIdx(Math.max(0, Math.min(N - 1, Math.floor(progress * N))));
    };
    window.addEventListener("scroll", onScroll, { passive:true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [N]);

  const cat    = cats[activeIdx];
  const skills = SKILLS[cat];

  return (
    <section ref={sectionRef} id="skills" style={{ height:`${(N + 0.5) * 100}vh` }}>
      <style>{`@keyframes rd-skill-in { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }`}</style>

      <div style={{
        position:"sticky", top:0, height:"100vh",
        display:"grid", gridTemplateColumns:"1fr 1.7fr",
        overflow:"hidden", background:T.bg,
      }}>

        {/* ── LEFT PANEL ── */}
        <div style={{
          borderRight:`1px solid ${T.border}`,
          display:"flex", flexDirection:"column",
          justifyContent:"space-between",
          padding:"72px 48px",
        }}>
          <div>
            <div style={{
              fontFamily:"'DM Sans',sans-serif", fontSize:9,
              letterSpacing:"0.26em", textTransform:"uppercase",
              color:T.accent, marginBottom:24,
            }}>Technologies & Tools</div>
            <div style={{
              fontFamily:"'Cormorant Garamond',serif",
              fontSize:"clamp(52px,6vw,88px)",
              fontWeight:300, color:T.fg,
              letterSpacing:"-0.03em", lineHeight:0.9,
              userSelect:"none",
            }}>SKILLS</div>
          </div>

          {/* Category list with animated active indicator */}
          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
            {cats.map((c, i) => (
              <div key={c} style={{
                display:"flex", alignItems:"center", gap:14,
                opacity: i === activeIdx ? 1 : 0.28,
                transition:"opacity .4s",
              }}>
                <div style={{
                  width: i === activeIdx ? 28 : 8, height:1,
                  background:T.accent,
                  transition:"width .4s cubic-bezier(.16,1,.3,1)",
                  flexShrink:0,
                }}/>
                <span style={{
                  fontFamily:"'DM Sans',sans-serif", fontSize:10,
                  letterSpacing:"0.15em", textTransform:"uppercase",
                  color: i === activeIdx ? T.accent : T.fgDim,
                  transition:"color .4s",
                }}>{c}</span>
              </div>
            ))}
          </div>

          {/* Big index number */}
          <div style={{
            fontFamily:"'Cormorant Garamond',serif",
            fontSize:"clamp(64px,8vw,110px)",
            fontWeight:300, color:T.border,
            lineHeight:1, letterSpacing:"-0.04em",
            userSelect:"none",
          }}>0{activeIdx + 1}</div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div style={{
          padding:"72px 56px",
          display:"flex", flexDirection:"column", justifyContent:"center",
        }}>
          <div key={cat} style={{ animation:"rd-skill-in .5s cubic-bezier(.16,1,.3,1) both" }}>
            <h2 style={{
              fontFamily:"'Cormorant Garamond',serif",
              fontSize:"clamp(44px,5.5vw,80px)",
              fontWeight:300, fontStyle:"italic",
              color:T.fg, margin:"0 0 44px",
              letterSpacing:"-0.025em", lineHeight:1.0,
            }}>{cat}</h2>

            <div style={{ display:"flex", flexWrap:"wrap", gap:"12px 14px" }}>
              {skills.map((s, si) => (
                <div key={s} style={{ animation:`rd-skill-in .4s cubic-bezier(.16,1,.3,1) ${si * 0.04}s both` }}>
                  <MagneticCard T={T} skill={s} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── INTERESTS ─────────────────────────────────────────────────────────────────
// Coffee images — replace with your own latte art photos in /public/
const COFFEE_IMGS = [
  "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1485808191679-5f86510bd0a0?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80",
];

function InterestsContent({ T }) {
  return (
    <div style={{ animation:"rd-reveal-up .9s cubic-bezier(.16,1,.3,1) both" }}>

      <div style={{ padding:"0 48px", marginBottom:72 }}>
        <div style={{ display:"flex", alignItems:"center", gap:20 }}>
          <div style={{ flex:1, height:1, background:T.border }}/>
          <span style={{
            fontFamily:"'DM Sans',sans-serif", fontSize:10, fontWeight:400,
            letterSpacing:"0.22em", textTransform:"uppercase", color:T.accent,
          }}>Beyond the Code</span>
          <div style={{ flex:1, height:1, background:T.border }}/>
        </div>
      </div>

      {/* Coffee */}
      <div style={{ borderTop:`1px solid ${T.border}`, borderBottom:`1px solid ${T.border}` }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", minHeight:480 }}>
          <div style={{
            padding:"64px 48px",
            borderRight:`1px solid ${T.border}`,
            display:"flex", flexDirection:"column", justifyContent:"space-between",
          }}>
            <div style={{
              fontFamily:"'DM Sans',sans-serif", fontSize:9, fontWeight:400,
              letterSpacing:"0.22em", textTransform:"uppercase", color:T.accent, marginBottom:32,
            }}>01 — Coffee</div>
            <div>
              <h3 style={{
                fontFamily:"'Cormorant Garamond',serif",
                fontSize:"clamp(36px,4vw,60px)",
                fontWeight:300, fontStyle:"italic",
                color:T.fg, margin:"0 0 28px",
                letterSpacing:"-0.02em", lineHeight:1.0,
              }}>Latte art &amp; the ritual of brewing.</h3>
              <p style={{
                fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:300,
                color:T.fgMid, lineHeight:1.9, margin:0, maxWidth:380,
              }}>
                I make different types of coffees — lattes, pour-overs, flat whites.
                The latte art is a work in progress. Each brew is slightly different
                and that's exactly why it's interesting.
              </p>
            </div>
            <div style={{
              fontFamily:"'Cormorant Garamond',serif", fontSize:13, fontStyle:"italic",
              color:T.fgDim, marginTop:40,
            }}>Espresso · Latte · Pour-over · Flat white</div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:2 }}>
            {COFFEE_IMGS.map((src, i) => (
              <div key={i} style={{ overflow:"hidden", background:T.bg1 }}>
                <img
                  src={src} alt={`coffee ${i+1}`}
                  style={{
                    width:"100%", height:"100%", objectFit:"cover", display:"block",
                    filter:"grayscale(20%)", transition:"transform .6s ease",
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform="scale(1.04)"}
                  onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}
                  onError={e => { e.currentTarget.parentElement.style.background = T.bg1; e.currentTarget.style.display="none"; }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Running */}
      <div style={{ borderBottom:`1px solid ${T.border}` }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", minHeight:320 }}>
          <div style={{
            borderRight:`1px solid ${T.border}`,
            padding:"64px 48px",
            display:"flex", flexDirection:"column", justifyContent:"space-between",
          }}>
            <div style={{
              fontFamily:"'DM Sans',sans-serif", fontSize:9, fontWeight:400,
              letterSpacing:"0.22em", textTransform:"uppercase", color:T.accent,
            }}>02 — Running</div>
            <div style={{
              fontFamily:"'Cormorant Garamond',serif",
              fontSize:"clamp(80px,10vw,140px)",
              fontWeight:300, color:T.border,
              lineHeight:1, letterSpacing:"-0.04em", userSelect:"none",
            }}>26.2</div>
          </div>
          <div style={{
            padding:"64px 48px",
            display:"flex", flexDirection:"column", justifyContent:"center",
          }}>
            <h3 style={{
              fontFamily:"'Cormorant Garamond',serif",
              fontSize:"clamp(30px,3.5vw,50px)",
              fontWeight:300, fontStyle:"italic",
              color:T.fg, margin:"0 0 24px",
              letterSpacing:"-0.02em", lineHeight:1.1,
            }}>Long distances, early mornings.</h3>
            <p style={{
              fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:300,
              color:T.fgMid, lineHeight:1.9, margin:0, maxWidth:380,
            }}>
              There's a particular kind of thinking that only happens at mile six.
              The problems that feel stuck in front of a screen tend to untangle themselves
              somewhere on a long road before sunrise.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 3D FLYTHROUGH CANVAS — warp-speed hyperspace ──────────────────────────────
function FlyCanvas({ T, onDone }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth  || window.innerWidth;
    const H = mount.clientHeight || window.innerHeight;

    const scene   = new THREE.Scene();
    const bgColor = new THREE.Color(T.bg);
    const acColor = new THREE.Color(T.accent);
    scene.fog     = new THREE.FogExp2(bgColor, 0.038);

    const camera = new THREE.PerspectiveCamera(68, W / H, 0.1, 140);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(bgColor, 1);
    renderer.setSize(W, H);
    mount.appendChild(renderer.domElement);

    // ── Dense star-particle tunnel (2 layers: close + far)
    const makeParticles = (count, rMin, rMax, zSpread, size, opacity) => {
      const pos = [];
      for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const r = rMin + Math.random() * (rMax - rMin);
        pos.push(Math.cos(theta) * r, Math.sin(theta) * r, (Math.random() - 0.5) * zSpread);
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ color: acColor, size, transparent: true, opacity, sizeAttenuation: true });
      const pts = new THREE.Points(geo, mat);
      scene.add(pts);
      return mat;
    };
    const nearMat = makeParticles(600,  0.6, 2.2, 65, 0.07, 0.9);
    const farMat  = makeParticles(1200, 1.8, 5.0, 65, 0.04, 0.5);

    // ── Portal rings the camera flies through
    const rings = [];
    [-4, -9, -14, -20, -27, -35].forEach((z, i) => {
      const geo  = new THREE.TorusGeometry(1.6 + i * 0.12, 0.018, 6, 72);
      const mat  = new THREE.MeshBasicMaterial({ color: acColor, transparent: true, opacity: 0.55 - i * 0.05 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.z = z;
      mesh.rotation.x = (Math.random() - 0.5) * 0.25;
      mesh.rotation.y = (Math.random() - 0.5) * 0.25;
      scene.add(mesh);
      rings.push({ mesh, mat });
    });

    // ── Speed-streak lines — radiating from centre, invisible at rest
    const streakPositions = [];
    const STREAK_N = 120;
    for (let i = 0; i < STREAK_N; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r0 = 0.05 + Math.random() * 0.3;
      const r1 = r0 + 0.8 + Math.random() * 6;
      streakPositions.push(
        Math.cos(theta) * r0, Math.sin(theta) * r0, 0,
        Math.cos(theta) * r1, Math.sin(theta) * r1, -1.5,
      );
    }
    const streakGeo = new THREE.BufferGeometry();
    streakGeo.setAttribute("position", new THREE.Float32BufferAttribute(streakPositions, 3));
    const streakMat = new THREE.LineBasicMaterial({ color: acColor, transparent: true, opacity: 0 });
    scene.add(new THREE.LineSegments(streakGeo, streakMat));

    // ── Converging rail lines (tunnel outline)
    for (let i = 0; i < 10; i++) {
      const ang = (i / 10) * Math.PI * 2;
      const r = 2.0;
      const g = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(Math.cos(ang) * r,        Math.sin(ang) * r,        9),
        new THREE.Vector3(Math.cos(ang) * r * 0.04, Math.sin(ang) * r * 0.04, -38),
      ]);
      scene.add(new THREE.Line(g, new THREE.LineBasicMaterial({ color: acColor, transparent: true, opacity: 0.08 })));
    }

    // ── Floating wireframe shapes
    const objs = [];
    for (let i = 0; i < 12; i++) {
      const geo = i % 3 === 0
        ? new THREE.OctahedronGeometry(0.1 + Math.random() * 0.22, 0)
        : new THREE.IcosahedronGeometry(0.1 + Math.random() * 0.2, 0);
      const edge = new THREE.EdgesGeometry(geo);
      const mesh = new THREE.LineSegments(edge, new THREE.LineBasicMaterial({
        color: acColor, transparent: true, opacity: 0.2 + Math.random() * 0.3,
      }));
      mesh.position.set((Math.random() - 0.5) * 3.5, (Math.random() - 0.5) * 2.5, -2 - i * 3);
      scene.add(mesh);
      objs.push(mesh);
    }

    // ── Fly animation
    const startT = performance.now();
    const flyDur  = 3000;
    const startZ  = 8;
    const endZ    = -28;

    let raf;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const elapsed = performance.now() - startT;
      const p = Math.min(elapsed / flyDur, 1);

      // Cubic ease-in-out — slow → fast → slow
      const ease = p < 0.5
        ? 4 * p * p * p
        : 1 - Math.pow(-2 * p + 2, 3) / 2;

      camera.position.z = startZ + (endZ - startZ) * ease;

      // Dynamic FOV: widens at peak speed (mid-flight)
      camera.fov = 68 + Math.sin(p * Math.PI) * 20;
      camera.updateProjectionMatrix();

      // Subtle camera shake during high-speed phase
      const shake = Math.sin(p * Math.PI) * 0.018;
      camera.position.x = Math.sin(elapsed * 0.009) * shake;
      camera.position.y = Math.cos(elapsed * 0.013) * shake * 0.7;

      // Speed streaks peak in the middle
      const streakAlpha = Math.max(0, Math.sin(p * Math.PI) * 0.75);
      streakMat.opacity = streakAlpha;

      // Particles brighten at peak speed
      const pulseBright = Math.sin(p * Math.PI) * 0.35;
      nearMat.opacity = Math.min(1, 0.9 + pulseBright);
      farMat.opacity  = Math.min(1, 0.5 + pulseBright * 0.6);

      // Rings pulse glow
      rings.forEach(({ mesh, mat }, i) => {
        mesh.rotation.z += 0.005 + i * 0.002;
        mat.opacity = Math.max(0, (0.55 - i * 0.05) * (1 + Math.sin(p * Math.PI) * 0.5));
      });

      // Rotate objects
      objs.forEach((o, i) => {
        o.rotation.x += 0.006 + i * 0.001;
        o.rotation.y += 0.005 + i * 0.0009;
      });

      // White-out flash at peak, then fade to black → content
      if (p > 0.75) {
        mount.style.opacity = String(Math.max(0, 1 - (p - 0.75) / 0.25));
      }

      renderer.render(scene, camera);

      if (p >= 1) {
        cancelAnimationFrame(raf);
        onDone();
      }
    };
    tick();

    const ro = new ResizeObserver(() => {
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    ro.observe(mount);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [T, onDone]);

  return <div ref={mountRef} style={{ width:"100%", height:"100vh" }} />;
}

// ── INTERESTS ─────────────────────────────────────────────────────────────────
function Interests({ T }) {
  const [phase, setPhase]   = useState("ask"); // "ask" | "fly" | "show"
  const [hovBtn, setHovBtn] = useState(false);

  return (
    <section id="interests" style={{ padding: phase === "show" ? "140px 0" : 0, overflow:"hidden" }}>
      <style>{`
        @keyframes rd-reveal-up {
          from { opacity:0; transform:translateY(56px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>

      {/* ── ASK PHASE ── */}
      {phase === "ask" && (
        <div style={{
          display:"flex", flexDirection:"column",
          alignItems:"center", justifyContent:"center",
          padding:"80px 48px 120px", textAlign:"center", minHeight:"55vh",
        }}>
          <div style={{
            fontFamily:"'DM Sans',sans-serif", fontSize:9,
            letterSpacing:"0.26em", textTransform:"uppercase",
            color:T.accent, marginBottom:36,
          }}>Beyond the Code</div>

          <h2 style={{
            fontFamily:"'Cormorant Garamond',serif",
            fontSize:"clamp(38px,5.5vw,78px)",
            fontWeight:300, fontStyle:"italic",
            color:T.fg, margin:"0 0 20px",
            letterSpacing:"-0.02em", lineHeight:1.08,
          }}>
            Curious what I do<br/>when I'm not coding?
          </h2>

          <p style={{
            fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:300,
            color:T.fgDim, margin:"0 0 52px",
            maxWidth:400, lineHeight:1.85,
          }}>
            There's a whole person behind the terminal.<br/>Want to meet her?
          </p>

          <button
            data-hover
            onClick={() => setPhase("fly")}
            onMouseEnter={() => setHovBtn(true)}
            onMouseLeave={() => setHovBtn(false)}
            style={{
              fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:400,
              letterSpacing:"0.2em", textTransform:"uppercase",
              color: hovBtn ? T.bg : T.accent,
              background: hovBtn ? T.accent : "transparent",
              border:`1px solid ${T.accent}`,
              padding:"16px 44px", cursor:"pointer",
              transition:"background .3s, color .3s",
            }}
          >Continue →</button>
        </div>
      )}

      {/* ── FLY PHASE — 3D camera flythrough ── */}
      {phase === "fly" && (
        <FlyCanvas T={T} onDone={() => setPhase("show")} />
      )}

      {/* ── SHOW PHASE ── */}
      {phase === "show" && <InterestsContent T={T} />}
    </section>
  );
}

// ── CONTACT ───────────────────────────────────────────────────────────────────
function Contact({ T }) {
  const links = [
    { label:"Email",    val:"hello@rekhadeenadayal.com",       href:"mailto:hello@rekhadeenadayal.com" },
    { label:"LinkedIn", val:"linkedin.com/in/rekhadeenadayal", href:"https://linkedin.com/in/rekhadeenadayal" },
    { label:"GitHub",   val:"github.com/RekhaDeenadayal",     href:"https://github.com/RekhaDeenadayal" },
  ];
  return (
    <section id="contact" style={{ padding:"140px 48px 80px" }}>
      {/* Heading */}
      <div style={{ marginBottom:80 }}>
        <div style={{ overflow:"hidden" }}>
          <Reveal y={40}>
            <h2 style={{
              fontFamily:"'Cormorant Garamond',serif",
              fontSize:"clamp(44px,7vw,96px)",
              fontWeight:300, color:T.fg, margin:0,
              letterSpacing:"-0.025em", lineHeight:0.9,
            }}>Let's build</h2>
          </Reveal>
        </div>
        <div style={{ overflow:"hidden" }}>
          <Reveal delay={0.1} y={40}>
            <h2 style={{
              fontFamily:"'Cormorant Garamond',serif",
              fontSize:"clamp(44px,7vw,96px)",
              fontWeight:300, fontStyle:"italic",
              color:T.fg, margin:0,
              letterSpacing:"-0.025em", lineHeight:0.9,
            }}>something together.</h2>
          </Reveal>
        </div>
      </div>

      <div style={{ borderTop:`1px solid ${T.border}` }}>
        {links.map((lk,i) => (
          <Reveal key={lk.label} delay={i * 0.07}>
            <ContactRow T={T} lk={lk} last={i === links.length-1} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ContactRow({ T, lk, last }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={lk.href} target={lk.href.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer"
      style={{ textDecoration:"none", display:"block" }}>
      <div data-hover
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display:"flex", justifyContent:"space-between", alignItems:"center",
          padding:"22px 0",
          borderBottom: last ? "none" : `1px solid ${T.border}`,
        }}>
        <span style={{
          fontFamily:"'DM Sans',sans-serif", fontSize:10, fontWeight:400,
          letterSpacing:"0.18em", textTransform:"uppercase",
          color: hov ? T.accent : T.fgDim, transition:"color .25s",
        }}>{lk.label}</span>
        <span style={{
          fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:300,
          color: hov ? T.fg : T.fgMid, transition:"color .25s",
          display:"flex", alignItems:"center", gap:10,
        }}>
          {lk.val}
          <span style={{
            display:"inline-block",
            transform: hov ? "translate(4px,-4px)" : "translate(0,0)",
            color: hov ? T.accent : T.fgDim,
            transition:"transform .25s, color .25s",
          }}>↗</span>
        </span>
      </div>
    </a>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
function Footer({ T }) {
  return (
    <footer style={{
      borderTop:`1px solid ${T.border}`, padding:"22px 48px",
      display:"flex", justifyContent:"space-between", alignItems:"center",
    }}>
      <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:300, color:T.fgDim, letterSpacing:"0.04em" }}>
        © 2025 Bhagya Rekha Deenadayal
      </span>
      <a href="https://github.com/RekhaDeenadayal" target="_blank" rel="noreferrer" style={{
        fontFamily:"'Cormorant Garamond',serif", fontSize:13, fontStyle:"italic",
        color:T.fgDim, textDecoration:"none", transition:"color .2s",
      }}
      onMouseEnter={e => e.target.style.color=T.accent}
      onMouseLeave={e => e.target.style.color=T.fgDim}
      >github.com/RekhaDeenadayal</a>
    </footer>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
const SECTION_LABELS = { work:"Work", experience:"Experience", skills:"Skills", contact:"Contact" };

export default function Portfolio() {
  const [dark, setDark]             = useState(true);
  const [intro, setIntro]           = useState(true);
  const [activeSection, setActive]  = useState(null);
  // "idle" | "in" | "out"
  const [transPhase, setTransPhase] = useState("idle");
  const [transLabel, setTransLabel] = useState("");
  const T = dark ? DARK : LIGHT;

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    let raf;
    const loop = time => { lenis.raf(time); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);

  // Track active section for nav underline
  useEffect(() => {
    const ids = ["work","experience","skills","contact"];
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { threshold:0.35 });
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  // Curtain wipe: shoots up from bottom → mid → flies off top
  const onNavClick = (id) => {
    if (transPhase !== "idle") return;
    setTransLabel(SECTION_LABELS[id] || "");
    setTransPhase("in");
    setTimeout(() => {
      // Jump-scroll while curtain is fully covering the screen
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior:"instant" });
      setTransPhase("out");
      setTimeout(() => setTransPhase("idle"), 700);
    }, 540);
  };

  useEffect(() => {
    document.body.style.background = T.bg;
    document.body.style.margin = "0";
    document.body.style.overflowX = "hidden";
    document.body.style.cursor = "none";
    return () => { document.body.style.cursor = ""; };
  }, [T.bg]);

  // Curtain transform per phase
  const curtainTransform =
    transPhase === "idle" ? "translateY(101%)" :
    transPhase === "in"   ? "translateY(0)"    :
                            "translateY(-101%)";
  const curtainTransition =
    transPhase === "idle" ? "none" :
    transPhase === "in"   ? "transform .54s cubic-bezier(.76,0,.24,1)" :
                            "transform .62s cubic-bezier(.76,0,.24,1)";

  return (
    <div style={{ background:T.bg, color:T.fg, minHeight:"100vh", position:"relative" }}>
      <style>{`
        *, *::before, *::after { cursor: none !important; }
        body { -webkit-font-smoothing: antialiased; }
        @keyframes rd-blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>

      <ThreeBackground dark={dark} />
      <GrainOverlay />
      <ScrollProgress T={T} />
      <Cursor />

      {/* Section-to-section curtain */}
      <div style={{
        position:"fixed", inset:0, zIndex:7000,
        background:"#0C0B09",
        transform: curtainTransform,
        transition: curtainTransition,
        pointerEvents: transPhase === "idle" ? "none" : "auto",
        display:"flex", alignItems:"center", justifyContent:"center",
        overflow:"hidden",
      }}>
        <span style={{
          fontFamily:"'Cormorant Garamond',serif",
          fontSize:"clamp(72px,13vw,180px)",
          fontWeight:300, fontStyle:"italic",
          color:"rgba(237,233,224,0.06)",
          letterSpacing:"-0.03em", userSelect:"none",
          whiteSpace:"nowrap",
        }}>{transLabel}</span>
      </div>

      {intro && <Intro onDone={() => setIntro(false)} />}
      <Nav T={T} dark={dark} setDark={setDark} active={activeSection} onNavClick={onNavClick} />
      <div style={{ position:"relative", zIndex:2 }}>
        <Hero T={T} />
        <Projects T={T} />
        <Experience T={T} />
        <Skills T={T} />
        <Interests T={T} />
        <Contact T={T} />
      </div>
      <Footer T={T} />
    </div>
  );
}
