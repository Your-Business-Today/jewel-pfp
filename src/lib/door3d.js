// @ts-nocheck — three.js r161+ ships no types; this module is dynamic by design
/**
 * Procedural 3D fire door for the scroll-driven homepage.
 * Built with three.js — no model files. Technical-drawing look:
 * dark meshes + light edge lines, gold highlights.
 *
 * Usage (client only):
 *   const scene = createDoorScene(canvas);
 *   scene.setProgress(p);   // 0..1 scroll progress
 *   scene.setStage(i);      // active caption stage (drives highlights)
 *   scene.destroy();
 */
import * as THREE from 'three';

// JPFP Brand Guidelines, Issue 1.2: Passive Black, Gold, Passive Red
const C = {
  ink: 0x000000, // Passive Black
  ink2: 0x151517,
  ink3: 0x1d1d21,
  paper: 0xffffff,
  muted: 0x9ba0a8,
  signal: 0xd7282e, // Passive Red
  gold: 0xc19b52, // Gold — edge-line accent and highlight
  steel: 0x8b929c,
  leaf: 0x2b2b30,
  frame: 0x222226
};

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const smooth = (t) => t * t * (3 - 2 * t);

/** Stage index -> part keys to highlight */
const HIGHLIGHTS = {
  1: ['closer'],
  2: ['seals'],
  3: ['hinges', 'handle'],
  4: ['glazing'],
  5: ['leaf'],
  6: []
};

/** Camera keyframes across scroll progress (spherical around target). */
const CAM = [
  { p: 0.0,   th: -0.55, ph: 0.06, r: 3.6, tx: -0.55, ty: 0.05 }, // hero
  { p: 0.143, th: -0.15, ph: 0.42, r: 2.3, tx: 0.35,  ty: 0.8 },  // closer
  { p: 0.286, th: 0.55,  ph: 0.02, r: 2.5, tx: 0.35,  ty: 0.05 }, // seals
  { p: 0.429, th: 0.95,  ph: 0.06, r: 2.0, tx: 0.3,   ty: -0.05 },// hinges
  { p: 0.571, th: -0.12, ph: 0.12, r: 1.9, tx: 0.3,   ty: 0.4 },  // glazing
  { p: 0.714, th: 0.35,  ph: 0.1,  r: 2.6, tx: 0.3,   ty: 0.0 },  // gaps
  { p: 0.857, th: -0.45, ph: 0.22, r: 4.4, tx: 0.0,   ty: 0.1 },  // exploded
  { p: 1.0,   th: -0.6,  ph: 0.26, r: 4.7, tx: 0.0,   ty: 0.1 }
];

export function createDoorScene(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(C.ink, 1);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(C.ink, 5.5, 11);

  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);

  // ---- lights ----
  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 1.15);
  key.position.set(2.5, 3.5, 4);
  scene.add(key);
  const rim = new THREE.DirectionalLight(C.gold, 0.35);
  rim.position.set(-3.5, 1, -2.5);
  scene.add(rim);

  // ---- blueprint grid floor ----
  const grid = new THREE.GridHelper(9, 36, C.ink3, C.ink2);
  grid.position.y = -1.05;
  scene.add(grid);

  // ---- part registry ----
  /** @type {Array<{key:string, group:THREE.Group, explode:THREE.Vector3, range:[number,number], meshes:THREE.Mesh[], edges:THREE.LineSegments[]}>} */
  const parts = [];

  function box(w, h, d, color, opts = {}) {
    const geo = new THREE.BoxGeometry(w, h, d);
    const mat = new THREE.MeshStandardMaterial({
      color,
      roughness: opts.roughness ?? 0.85,
      metalness: opts.metalness ?? 0.1,
      transparent: opts.opacity !== undefined,
      opacity: opts.opacity ?? 1,
      emissive: opts.emissive ?? 0x000000,
      emissiveIntensity: opts.emissiveIntensity ?? 0
    });
    const mesh = new THREE.Mesh(geo, mat);
    const edge = new THREE.LineSegments(
      new THREE.EdgesGeometry(geo),
      new THREE.LineBasicMaterial({ color: opts.edge ?? C.muted, transparent: true, opacity: 0.5 })
    );
    mesh.add(edge);
    mesh.userData.edge = edge;
    edge.userData.baseColor = opts.edge ?? C.muted;
    return mesh;
  }

  function part(key, explode, range) {
    const group = new THREE.Group();
    const rec = { key, group, explode: new THREE.Vector3(...explode), range, meshes: [], edges: [] };
    rec.add = (mesh, x = 0, y = 0, z = 0, rz = 0) => {
      mesh.position.set(x, y, z);
      mesh.userData.home = mesh.position.clone();
      if (rz) mesh.rotation.z = rz;
      group.add(mesh);
      rec.meshes.push(mesh);
      rec.edges.push(mesh.userData.edge);
      return mesh;
    };
    parts.push(rec);
    return rec;
  }

  const door = new THREE.Group();
  scene.add(door);

  // ---- frame (static anchor) ----
  const frame = part('frame', [0, 0, 0], [0, 0]);
  frame.add(box(0.06, 2.11, 0.1, C.frame), -0.5, 0.02, 0);
  frame.add(box(0.06, 2.11, 0.1, C.frame), 0.5, 0.02, 0);
  frame.add(box(1.06, 0.06, 0.1, C.frame), 0, 1.1, 0);

  // ---- leaf ----
  const leaf = part('leaf', [0, 0, 0.42], [0.67, 0.77]);
  leaf.add(box(0.93, 2.04, 0.054, C.leaf, { edge: C.gold }), 0, 0, 0);
  // NOTE: leaf edges in Jewel Gold per enterprise accent
  // vision panel aperture (reads as a hole)
  leaf.add(box(0.32, 0.62, 0.058, C.ink), 0, 0.33, 0);
  // signage disc
  const sign = new THREE.Mesh(
    new THREE.CylinderGeometry(0.055, 0.055, 0.006, 32),
    new THREE.MeshStandardMaterial({ color: C.gold, roughness: 0.5, metalness: 0.4 })
  );
  sign.rotation.x = Math.PI / 2;
  sign.position.set(0, 0.82, 0.031);
  sign.userData.edge = new THREE.LineSegments(
    new THREE.EdgesGeometry(sign.geometry),
    new THREE.LineBasicMaterial({ color: C.muted, transparent: true, opacity: 0 })
  );
  leaf.group.add(sign);
  leaf.meshes.push(sign);
  leaf.edges.push(sign.userData.edge);

  // ---- intumescent + smoke seals ----
  const seals = part('seals', [0, 0, 0.12], [0.25, 0.34]);
  const sealOpts = { emissive: C.signal, emissiveIntensity: 0.45, edge: C.signal };
  const sl = seals.add(box(0.008, 2.0, 0.034, C.signal, sealOpts), -0.464, 0, 0);
  const sr = seals.add(box(0.008, 2.0, 0.034, C.signal, sealOpts), 0.464, 0, 0);
  const st = seals.add(box(0.91, 0.008, 0.034, C.signal, sealOpts), 0, 1.016, 0);
  // sideways explode per strip (overrides group explode in update)
  sl.userData.explode = new THREE.Vector3(-0.38, 0, 0.1);
  sr.userData.explode = new THREE.Vector3(0.38, 0, 0.1);
  st.userData.explode = new THREE.Vector3(0, 0.42, 0.1);

  // ---- hinges ×3 ----
  const steelOpts = { metalness: 0.7, roughness: 0.35, edge: C.muted };
  const hinges = part('hinges', [-0.52, 0, 0.22], [0.39, 0.49]);
  [0.72, 0, -0.72].forEach((y, i) => {
    const h = hinges.add(box(0.032, 0.11, 0.02, C.steel, steelOpts), -0.472, y, 0);
    h.userData.explode = new THREE.Vector3(-0.5 - i * 0.06, 0, 0.18 + i * 0.05);
  });

  // ---- handle + latch ----
  const handle = part('handle', [0.5, 0, 0.24], [0.39, 0.49]);
  handle.add(box(0.15, 0.024, 0.024, C.steel, steelOpts), 0.36, -0.01, 0.045); // lever
  handle.add(box(0.045, 0.17, 0.008, C.steel, steelOpts), 0.42, -0.01, 0.031); // backplate
  handle.add(box(0.012, 0.16, 0.03, C.steel, steelOpts), 0.462, -0.01, 0);     // latch plate

  // ---- overhead closer ----
  const closer = part('closer', [0, 0.55, 0.45], [0.1, 0.2]);
  closer.add(box(0.34, 0.075, 0.062, C.ink3, { edge: C.gold }), 0, 0.9, 0.06);
  closer.add(box(0.26, 0.02, 0.016, C.steel, steelOpts), 0.12, 0.985, 0.07, -0.18); // arm
  closer.add(box(0.16, 0.018, 0.014, C.steel, steelOpts), 0.26, 1.03, 0.045, 0.35); // arm 2

  // ---- fire-rated glazing ----
  const glazing = part('glazing', [0, 0, 0.68], [0.53, 0.63]);
  glazing.add(
    box(0.28, 0.58, 0.008, C.muted, { opacity: 0.18, roughness: 0.15, metalness: 0.4, edge: C.muted }),
    0, 0.33, 0
  );
  // glazing beads
  const bead = { edge: C.muted };
  glazing.add(box(0.32, 0.02, 0.018, C.leaf, bead), 0, 0.63, 0.02);
  glazing.add(box(0.32, 0.02, 0.018, C.leaf, bead), 0, 0.03, 0.02);
  glazing.add(box(0.02, 0.58, 0.018, C.leaf, bead), -0.15, 0.33, 0.02);
  glazing.add(box(0.02, 0.58, 0.018, C.leaf, bead), 0.15, 0.33, 0.02);

  parts.forEach((p) => door.add(p.group));

  // ---- state ----
  let targetP = 0;
  let curP = 0;
  let stage = 0;
  let raf = 0;
  let disposed = false;
  const t0 = performance.now();

  function camAt(p) {
    let i = 0;
    while (i < CAM.length - 2 && CAM[i + 1].p <= p) i++;
    const a = CAM[i];
    const b = CAM[i + 1];
    const t = smooth(clamp((p - a.p) / (b.p - a.p), 0, 1));
    const th = a.th + (b.th - a.th) * t;
    const ph = a.ph + (b.ph - a.ph) * t;
    const r = a.r + (b.r - a.r) * t;
    const tx = a.tx + (b.tx - a.tx) * t;
    const ty = a.ty + (b.ty - a.ty) * t;
    return { th, ph, r, tx, ty };
  }

  function update() {
    if (disposed) return;
    raf = requestAnimationFrame(update);

    curP += (targetP - curP) * 0.09;
    const p = curP;
    const time = (performance.now() - t0) / 1000;

    // gentle idle motion
    door.rotation.y = Math.sin(time * 0.3) * 0.02;

    // explode offsets
    for (const part of parts) {
      const [s, e] = part.range;
      const t = e > s ? smooth(clamp((p - s) / (e - s), 0, 1)) : 0;
      let hasOverride = false;
      // per-mesh overrides (seal strips, staggered hinges)
      for (const m of part.meshes) {
        if (m.userData.explode && m.userData.home) {
          hasOverride = true;
          const h = m.userData.home;
          const ex = m.userData.explode;
          m.position.set(h.x + ex.x * t, h.y + ex.y * t, h.z + ex.z * t);
        }
      }
      if (hasOverride) part.group.position.set(0, 0, 0);
      else part.group.position.set(part.explode.x * t, part.explode.y * t, part.explode.z * t);
    }

    // highlights
    const hot = HIGHLIGHTS[stage] ?? [];
    for (const part of parts) {
      const on = hot.includes(part.key);
      for (let i = 0; i < part.meshes.length; i++) {
        const mat = part.meshes[i].material;
        const base = part.key === 'seals' ? 0.45 : 0;
        const want = on ? (part.key === 'seals' ? 0.9 : 0.55) : base;
        mat.emissiveIntensity += (want - mat.emissiveIntensity) * 0.12;
        if (on && mat.emissive.getHex() === 0x000000) mat.emissive.setHex(C.gold);
        const edge = part.edges[i];
        if (edge) edge.material.color.setHex(on ? C.gold : edge.userData.baseColor ?? C.muted);
      }
    }

    // camera
    const c = camAt(p);
    const th = c.th + Math.sin(time * 0.22) * 0.015;
    camera.position.set(
      c.tx + c.r * Math.sin(th) * Math.cos(c.ph),
      c.ty + c.r * Math.sin(c.ph),
      c.r * Math.cos(th) * Math.cos(c.ph)
    );
    camera.lookAt(c.tx, c.ty, 0);

    renderer.render(scene, camera);
  }

  function resize() {
    const w = canvas.clientWidth || canvas.parentElement?.clientWidth || 1;
    const h = canvas.clientHeight || canvas.parentElement?.clientHeight || 1;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }
  resize();
  update();

  return {
    setProgress(p) {
      targetP = clamp(p, 0, 1);
    },
    setStage(i) {
      stage = i;
    },
    /** jump without damping (reduced motion) */
    snap() {
      curP = targetP;
    },
    resize,
    destroy() {
      disposed = true;
      cancelAnimationFrame(raf);
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose());
      });
      renderer.dispose();
    }
  };
}
