import { useEffect, useRef } from "react";
import * as THREE from "three";
import logoUrl from "../assets/logo.png";

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

// Látkový dodgeball: volejbalové rozložení panelů – 6 stran, každá ze 3 pruhů,
// tenké švy, matný textilní povrch. Barvy: bílá, šedá, týmová červená a modrá.
const WHITE = "#ecebe7";
const GREY = "#9a9fa5";
const RED = "#d7161d";
const BLUE = "#14467f";

// [barvy pruhů, pruhy vodorovně?, logo?] pro strany +x, -x, +y, -y, +z, -z
// Na dvou protilehlých bílých stranách je natištěné logo týmu.
const FACES = [
  [[WHITE, RED, WHITE], false, false],
  [[WHITE, BLUE, WHITE], false, false],
  [[GREY, WHITE, RED], false, false],
  [[BLUE, WHITE, GREY], false, false],
  [[WHITE, WHITE, WHITE], true, true],
  [[WHITE, WHITE, WHITE], true, true],
];
const LOGO_ASPECT = 3394 / 4760; // šířka / výška loga
const LOGO_HEIGHT = 0.7; // výška loga vůči straně míče

function makeFaceTexture(colors, horizontal, S = 256) {
  const k = S / 256;
  const c = document.createElement("canvas");
  c.width = S;
  c.height = S;
  const g = c.getContext("2d");
  if (horizontal) {
    g.translate(S / 2, S / 2);
    g.rotate(Math.PI / 2);
    g.translate(-S / 2, -S / 2);
  }
  const w = S / 3;
  colors.forEach((col, i) => {
    g.fillStyle = col;
    g.fillRect(i * w, 0, w + 1, S);
  });
  // švy: měkký stín + tenká tmavá linka, mezi pruhy i po obvodu strany
  const seam = (x) => {
    g.fillStyle = "rgba(0,0,0,0.13)";
    g.fillRect(x - 6 * k, 0, 12 * k, S);
    g.fillStyle = "rgba(20,20,20,0.8)";
    g.fillRect(x - 1.25 * k, 0, 2.5 * k, S);
  };
  seam(w);
  seam(2 * w);
  g.setTransform(1, 0, 0, 1, 0, 0);
  g.strokeStyle = "rgba(0,0,0,0.13)";
  g.lineWidth = 12 * k;
  g.strokeRect(0, 0, S, S);
  g.strokeStyle = "rgba(20,20,20,0.8)";
  g.lineWidth = 2.5 * k;
  g.strokeRect(0, 0, S, S);
  // jemné zrno látky
  const img = g.getImageData(0, 0, S, S);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    const n = (Math.random() - 0.5) * 22;
    d[i] += n;
    d[i + 1] += n;
    d[i + 2] += n;
  }
  g.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

// šum pro bump mapu – vazba látky
function makeWeaveTexture() {
  const S = 64;
  const c = document.createElement("canvas");
  c.width = S;
  c.height = S;
  const g = c.getContext("2d");
  const img = g.createImageData(S, S);
  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      const v = 128 + ((x + y) % 2 ? 40 : -40) + (Math.random() - 0.5) * 60;
      const i = (y * S + x) * 4;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = 255;
    }
  }
  g.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(5, 5);
  return tex;
}

// krychle nafouknutá do koule – každá strana krychle je jeden díl míče
function makeBallGeometry() {
  const geo = new THREE.BoxGeometry(2, 2, 2, 20, 20, 20);
  const pos = geo.attributes.position;
  const nor = geo.attributes.normal;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i).normalize();
    pos.setXYZ(i, v.x, v.y, v.z);
    nor.setXYZ(i, v.x, v.y, v.z);
  }
  geo.computeBoundingSphere();
  return geo;
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

    const geometry = makeBallGeometry();
    const weave = makeWeaveTexture();
    const textures = FACES.map(([colors, horizontal, hasLogo]) =>
      makeFaceTexture(colors, horizontal, hasLogo ? 512 : 256),
    );
    const material = textures.map(
      (map) =>
        new THREE.MeshStandardMaterial({
          map,
          bumpMap: weave,
          bumpScale: 0.6,
          roughness: 0.95,
          metalness: 0,
        }),
    );

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

    // natisknout logo na bílé strany, jakmile se obrázek načte
    let disposed = false;
    const logoImg = new Image();
    logoImg.onload = () => {
      if (disposed) return;
      FACES.forEach(([, , hasLogo], i) => {
        if (!hasLogo) return;
        const tex = textures[i];
        const S = tex.image.width;
        const h = S * LOGO_HEIGHT;
        const w = h * LOGO_ASPECT;
        tex.image.getContext("2d").drawImage(logoImg, (S - w) / 2, (S - h) / 2, w, h);
        tex.needsUpdate = true;
      });
      if (reduced) renderOnce(0);
    };
    logoImg.src = logoUrl;

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
      disposed = true;
      logoImg.onload = null;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      ro.disconnect();
      if (io) io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", sync);
      geometry.dispose();
      material.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
      weave.dispose();
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
