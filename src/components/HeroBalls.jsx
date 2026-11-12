import { useEffect, useRef } from "react";
import * as THREE from "three";

// Ruční rozmístění míčů: x, y v normalizovaných souřadnicích obrazovky (-1..1),
// z = hloubka, s = velikost.
const DESKTOP = [
  { x: 0.93, y: 0.58, z: 0, s: 0.95 },
  { x: 1.0, y: -0.98, z: 1.5, s: 1.3 },
  { x: 0.97, y: -0.2, z: -3, s: 0.7 },
  { x: -0.95, y: 0.5, z: -1, s: 0.5 },
  { x: -0.92, y: -0.88, z: 1, s: 0.5 },
  { x: 0.12, y: 0.8, z: -4, s: 0.45 },
  { x: 0.05, y: -0.75, z: -7, s: 0.6 },
];
const MOBILE = [
  { x: -1.05, y: 0.6, z: 0, s: 0.3 },
  { x: 1.0, y: 0.76, z: -1, s: 0.26 },
  { x: 0.98, y: 0.02, z: -2, s: 0.3 },
  { x: 0.8, y: -0.36, z: -4, s: 0.22 },
];

const CAM_Z = 10;
const FOV = 40;

// Šest stočených panelů (bílá / modrá / červená) s černými švy – jako míč v logu.
function makeTexture() {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 512;
  const g = c.getContext("2d");
  const colors = ["#ffffff", "#14467f", "#d7161d"];
  const w = c.width / 6;
  const twist = w * 1.5; // o kolik se panel posune mezi póly
  const H = c.height;
  for (let i = -2; i < 7; i++) {
    g.fillStyle = colors[((i % 3) + 3) % 3];
    g.beginPath();
    g.moveTo(i * w, 0);
    g.lineTo((i + 1) * w + 1, 0);
    g.lineTo((i + 1) * w + twist + 1, H);
    g.lineTo(i * w + twist, H);
    g.closePath();
    g.fill();
  }
  g.strokeStyle = "#0a0a0a";
  g.lineWidth = 16;
  for (let i = -2; i < 8; i++) {
    g.beginPath();
    g.moveTo(i * w, 0);
    g.lineTo(i * w + twist, H);
    g.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

export default function HeroBalls() {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      wrap.style.display = "none";
      return undefined;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x111312, 9, 19);
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 50);
    camera.position.set(0, 0, CAM_Z);
    camera.lookAt(0, 0, 0);

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const key = new THREE.DirectionalLight(0xffffff, 2.4);
    key.position.set(-5, 6, 8);
    scene.add(key);
    const rim = new THREE.PointLight(0x12b484, 80, 30);
    rim.position.set(6, 1, -4);
    scene.add(rim);

    const geometry = new THREE.SphereGeometry(1, 48, 32);
    const texture = makeTexture();
    const material = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.5, metalness: 0 });

    const group = new THREE.Group();
    scene.add(group);
    let balls = [];
    let heroHeight = 1;

    const build = (mobile) => {
      balls.forEach((b) => group.remove(b.mesh));
      balls = (mobile ? MOBILE : DESKTOP).map((d, i) => {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.scale.setScalar(d.s);
        mesh.rotation.set(i * 0.7, i * 1.3, 0);
        group.add(mesh);
        return {
          mesh,
          d,
          base: new THREE.Vector3(),
          phase: i * 1.7,
          amp: 0.08 + (i % 3) * 0.04,
          speed: 0.6 + (i % 4) * 0.15,
          spin: new THREE.Vector3(0.1 + (i % 3) * 0.08, 0.15 + (i % 2) * 0.12, 0.05),
          depth: (d.z + 8) / 8,
        };
      });
    };

    let isMobile = null;
    const layout = () => {
      const w = Math.max(wrap.clientWidth, 1);
      const h = Math.max(wrap.clientHeight, 1);
      heroHeight = h;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      const mobile = window.innerWidth < 768;
      if (mobile !== isMobile) {
        isMobile = mobile;
        build(mobile);
      }
      const tan = Math.tan((FOV / 2) * (Math.PI / 180));
      balls.forEach((b) => {
        const halfH = (CAM_Z - b.d.z) * tan;
        b.base.set(b.d.x * halfH * camera.aspect, b.d.y * halfH, b.d.z);
      });
    };

    const pointer = { x: 0, y: 0 };
    const cur = { x: 0, y: 0, scroll: 0 };
    let last = performance.now();
    const delta = () => {
      const now = performance.now();
      const dt = (now - last) / 1000;
      last = now;
      return dt;
    };
    let elapsed = 0;

    const draw = (dt) => {
      elapsed += dt;
      const p = Math.min(Math.max(window.scrollY / heroHeight, 0), 1);
      cur.x += (pointer.x - cur.x) * 0.05;
      cur.y += (pointer.y - cur.y) * 0.05;
      cur.scroll += (p - cur.scroll) * 0.08;
      group.rotation.y = cur.x * 0.12;
      group.rotation.x = cur.y * 0.08;
      group.position.y = cur.scroll * 2.5;
      group.scale.setScalar(1 + cur.scroll * 0.15);
      balls.forEach((b) => {
        const bob = Math.sin(elapsed * b.speed + b.phase) * b.amp;
        b.mesh.position.set(
          b.base.x + cur.x * 0.5 * b.depth,
          b.base.y + bob - cur.y * 0.4 * b.depth,
          b.base.z,
        );
        b.mesh.rotation.x += b.spin.x * dt;
        b.mesh.rotation.y += b.spin.y * dt;
        b.mesh.rotation.z += b.spin.z * dt;
      });
      renderer.render(scene, camera);
    };

    let first = true;
    const renderOnce = (dt) => {
      draw(dt);
      if (first) {
        first = false;
        canvas.style.opacity = "1";
      }
    };

    layout();

    let raf = 0;
    let visible = true;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      renderOnce(Math.min(delta(), 0.1));
    };
    const sync = () => {
      const shouldRun = visible && !document.hidden;
      if (shouldRun && !raf) {
        delta();
        raf = requestAnimationFrame(loop);
      } else if (!shouldRun && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const ro = new ResizeObserver(() => {
      layout();
      if (reduced) renderOnce(0);
    });
    ro.observe(wrap);

    let io;
    const onPointer = (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    if (reduced) {
      renderOnce(0);
    } else {
      window.addEventListener("pointermove", onPointer, { passive: true });
      document.addEventListener("visibilitychange", sync);
      io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        sync();
      });
      io.observe(wrap);
      sync();
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      ro.disconnect();
      if (io) io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", sync);
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={wrapRef} aria-hidden="true" className="pointer-events-none absolute inset-0">
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
        style={{ opacity: 0, transition: "opacity 0.8s ease-out" }}
      />
    </div>
  );
}
