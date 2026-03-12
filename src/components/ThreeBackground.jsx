import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground({ dark }) {
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
