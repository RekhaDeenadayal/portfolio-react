import { useState, useEffect, useRef } from "react";
import * as THREE from "three";

// ── Animated coffee cup (pure SVG + CSS) ──────────────────────────────────────
function CoffeeCup({ T }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"flex-end", height:160, position:"relative" }}>
      <style>{`
        @keyframes rd-s1{0%,100%{transform:translateY(0) scaleX(1);opacity:.55}50%{transform:translateY(-20px) scaleX(1.4);opacity:0}}
        @keyframes rd-s2{0%,100%{transform:translateY(0) scaleX(1);opacity:.4}50%{transform:translateY(-26px) scaleX(.8);opacity:0}}
        @keyframes rd-s3{0%,100%{transform:translateY(0) scaleX(1);opacity:.5}50%{transform:translateY(-18px) scaleX(1.2);opacity:0}}
        @keyframes rd-swirl{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      `}</style>
      {/* Steam wisps */}
      <div style={{ position:"absolute", bottom:126, left:"50%", transform:"translateX(-50%)", display:"flex", gap:12 }}>
        <span style={{ display:"block", width:2, height:22, borderRadius:2, background:T.accent, animation:"rd-s1 2.2s ease-in-out infinite" }}/>
        <span style={{ display:"block", width:2, height:28, borderRadius:2, background:T.accent, animation:"rd-s2 2.6s ease-in-out infinite .35s" }}/>
        <span style={{ display:"block", width:2, height:20, borderRadius:2, background:T.accent, animation:"rd-s3 2s ease-in-out infinite .7s" }}/>
      </div>
      {/* Cup SVG */}
      <svg width="96" height="108" viewBox="0 0 96 108" fill="none">
        {/* Saucer */}
        <ellipse cx="48" cy="100" rx="38" ry="6" fill={T.bg1} stroke={T.accent} strokeWidth="1.2" opacity="0.7"/>
        {/* Cup body */}
        <path d="M18 24 L24 94 Q24 100 48 100 Q72 100 72 94 L78 24 Z" fill={T.bg1} stroke={T.accent} strokeWidth="1.5"/>
        {/* Latte art — outer ring */}
        <ellipse cx="48" cy="58" rx="20" ry="20" fill="none" stroke={T.accent} strokeWidth="1" opacity="0.45"/>
        {/* Latte art — leaf swirl */}
        <path d="M48 38 Q62 48 48 58 Q34 68 48 78" fill="none" stroke={T.accent} strokeWidth="1.2" opacity="0.7" strokeLinecap="round"/>
        <path d="M48 38 Q56 52 48 58 Q40 64 48 78" fill="none" stroke={T.accent} strokeWidth="0.8" opacity="0.4" strokeLinecap="round"/>
        {/* Handle */}
        <path d="M72 38 Q86 38 86 56 Q86 74 72 74" fill="none" stroke={T.accent} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </div>
  );
}

// ── Winding running path (SVG + animated dash) ────────────────────────────────
function RunPath({ T }) {
  return (
    <div style={{ height:160, display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
      <style>{`
        @keyframes rd-dash { from { stroke-dashoffset: 320 } to { stroke-dashoffset: 0 } }
        @keyframes rd-pulse { 0%,100%{r:3;opacity:.7} 50%{r:5;opacity:1} }
      `}</style>
      <svg width="260" height="80" viewBox="0 0 260 80" fill="none">
        {/* Ghost path */}
        <path d="M0 65 C30 65 30 20 65 20 C100 20 100 55 130 55 C160 55 160 15 195 15 C230 15 230 50 260 50"
          stroke={T.border} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* Animated accent path */}
        <path d="M0 65 C30 65 30 20 65 20 C100 20 100 55 130 55 C160 55 160 15 195 15 C230 15 230 50 260 50"
          stroke={T.accent} strokeWidth="1.5" fill="none" strokeLinecap="round"
          strokeDasharray="320" style={{ animation:"rd-dash 3.5s ease-in-out infinite" }}/>
        {/* Milestone dots */}
        {[[0,65],[65,20],[130,55],[195,15],[260,50]].map(([x,y], i) => (
          <circle key={i} cx={x} cy={y} r="3.5" fill={T.accent} opacity="0.6"
            style={{ animation:`rd-pulse 2s ease-in-out infinite ${i * 0.4}s` }}/>
        ))}
        {/* Mile labels */}
        {[["0",0,75],["10K",65,12],["HM",130,68],["30K",195,8],["42K",255,43]].map(([label,x,y]) => (
          <text key={label} x={x} y={y} fill={T.fgDim}
            style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"7px", letterSpacing:"0.06em" }}
            textAnchor="middle">{label}</text>
        ))}
      </svg>
    </div>
  );
}

function InterestsContent({ T }) {
  return (
    <div style={{ animation:"rd-reveal-up .9s cubic-bezier(.16,1,.3,1) both" }}>

      {/* Header */}
      <div style={{ padding:"0 48px", marginBottom:56 }}>
        <div style={{ display:"flex", alignItems:"center", gap:20 }}>
          <div style={{ flex:1, height:1, background:T.border }}/>
          <span style={{
            fontFamily:"'DM Sans',sans-serif", fontSize:10, fontWeight:400,
            letterSpacing:"0.22em", textTransform:"uppercase", color:T.accent,
          }}>Beyond the Code</span>
          <div style={{ flex:1, height:1, background:T.border }}/>
        </div>
      </div>

      {/* Two compact cards side by side */}
      <div style={{
        display:"grid", gridTemplateColumns:"1fr 1fr",
        borderTop:`1px solid ${T.border}`,
        margin:"0 48px",
      }}>

        {/* ── Coffee card ── */}
        <div style={{
          borderRight:`1px solid ${T.border}`,
          padding:"48px 40px 52px",
          display:"flex", flexDirection:"column", gap:28,
        }}>
          <div style={{
            fontFamily:"'DM Sans',sans-serif", fontSize:9,
            letterSpacing:"0.22em", textTransform:"uppercase", color:T.accent,
          }}>01 — Coffee</div>

          <CoffeeCup T={T} />

          <div>
            <h3 style={{
              fontFamily:"'Cormorant Garamond',serif",
              fontSize:"clamp(24px,2.8vw,40px)",
              fontWeight:300, fontStyle:"italic",
              color:T.fg, margin:"0 0 16px",
              letterSpacing:"-0.02em", lineHeight:1.1,
            }}>Latte art &amp; the ritual of brewing.</h3>
            <p style={{
              fontFamily:"'DM Sans',sans-serif", fontSize:12, fontWeight:300,
              color:T.fgMid, lineHeight:1.85, margin:"0 0 20px",
            }}>
              Lattes, pour-overs, flat whites. Each brew is slightly different — that's exactly why it's interesting.
            </p>
            <div style={{
              fontFamily:"'Cormorant Garamond',serif", fontSize:11, fontStyle:"italic",
              color:T.fgDim, letterSpacing:"0.04em",
            }}>Espresso · Latte · Pour-over · Flat white</div>
          </div>
        </div>

        {/* ── Running card ── */}
        <div style={{
          padding:"48px 40px 52px",
          display:"flex", flexDirection:"column", gap:28,
        }}>
          <div style={{
            fontFamily:"'DM Sans',sans-serif", fontSize:9,
            letterSpacing:"0.22em", textTransform:"uppercase", color:T.accent,
          }}>02 — Running</div>

          {/* Big number + path */}
          <div style={{ position:"relative" }}>
            <div style={{
              fontFamily:"'Cormorant Garamond',serif",
              fontSize:"clamp(64px,8vw,110px)",
              fontWeight:300, color:T.border,
              lineHeight:1, letterSpacing:"-0.04em",
              userSelect:"none", marginBottom:8,
            }}>26.2</div>
            <RunPath T={T} />
          </div>

          <div>
            <h3 style={{
              fontFamily:"'Cormorant Garamond',serif",
              fontSize:"clamp(24px,2.8vw,40px)",
              fontWeight:300, fontStyle:"italic",
              color:T.fg, margin:"0 0 16px",
              letterSpacing:"-0.02em", lineHeight:1.1,
            }}>Long distances, early mornings.</h3>
            <p style={{
              fontFamily:"'DM Sans',sans-serif", fontSize:12, fontWeight:300,
              color:T.fgMid, lineHeight:1.85, margin:0,
            }}>
              The problems that feel stuck in front of a screen tend to untangle themselves somewhere on a long road before sunrise.
            </p>
          </div>
        </div>
      </div>

      <div style={{ height:1, background:T.border, margin:"0 48px" }}/>
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
export default function Interests({ T }) {
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
