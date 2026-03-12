import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { COFFEE_IMGS } from "../constants/data";

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
