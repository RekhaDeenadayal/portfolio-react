import { useState, useEffect } from "react";
import Lenis from "lenis";

import { DARK, LIGHT } from "./constants/themes";
import GrainOverlay from "./components/GrainOverlay";
import ThreeBackground from "./components/ThreeBackground";
import Cursor from "./components/Cursor";
import Intro from "./components/Intro";
import ScrollProgress from "./components/ScrollProgress";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Interests from "./components/Interests";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

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

  // Curtain wipe: shoots up from bottom -> mid -> flies off top
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
