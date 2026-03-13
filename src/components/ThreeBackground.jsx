import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground({ T }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Parse theme hex colors → Three.js numbers
    const toHex = str => parseInt(str.replace("#", ""), 16);
    const isLight = parseInt(T.bg.replace("#",""), 16) > 0x888888;
    const accentNum = toHex(T.accent);
    const bgNum     = toHex(T.bg);

    // Mesh face color: accent blended very dark against bg
    const meshCol  = isLight ? toHex(T.bg1)   : blendHex(bgNum, accentNum, 0.18);
    const edgeCol  = accentNum;
    const edgeOpac = isLight ? 0.18 : 0.22;

    function blendHex(a, b, t) {
      const ar = (a >> 16) & 0xff, ag = (a >> 8) & 0xff, ab = a & 0xff;
      const br = (b >> 16) & 0xff, bg = (b >> 8) & 0xff, bb = b & 0xff;
      const r = Math.round(ar + (br - ar) * t);
      const g = Math.round(ag + (bg - ag) * t);
      const bv = Math.round(ab + (bb - ab) * t);
      return (r << 16) | (g << 8) | bv;
    }

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 9;

    // Lighting tuned to theme accent
    scene.add(new THREE.AmbientLight(0xffffff, isLight ? 0.2 : 0.12));
    const key = new THREE.DirectionalLight(accentNum, isLight ? 0.35 : 0.45);
    key.position.set(5, 7, 4);
    scene.add(key);
    const fill = new THREE.DirectionalLight(accentNum, 0.1);
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

    // Scene group — entire scene rotates with scroll
    const group = new THREE.Group();
    scene.add(group);

    const objects = cfgs.map(({ geo, pos, rot, spd }) => {
      const mat  = new THREE.MeshPhongMaterial({ color: meshCol, flatShading: true, shininess: 12, specular: accentNum });
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
  }, [T]);

  return (
    <canvas ref={canvasRef} style={{
      position:"fixed", top:0, left:0,
      width:"100%", height:"100%",
      zIndex:0, pointerEvents:"none",
      opacity: 0.45,
    }}/>
  );
}
