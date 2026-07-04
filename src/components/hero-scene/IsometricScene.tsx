import { useEffect, useRef, type ReactNode } from "react";
import * as THREE from "three";
import { Reflector } from "three/examples/jsm/objects/Reflector.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
// Raw lucide icon node tuples — tree-shakable, no React render needed.
// Each module exports `__iconNode` = Array<[tag, attrs, children?]>.
import { __iconNode as iconFrown } from "lucide-react/dist/esm/icons/frown.mjs";
import { __iconNode as iconWaypoints } from "lucide-react/dist/esm/icons/waypoints.mjs";
import { __iconNode as iconBrain } from "lucide-react/dist/esm/icons/brain.mjs";
import { __iconNode as iconLandmark } from "lucide-react/dist/esm/icons/landmark.mjs";
import { __iconNode as iconRocket } from "lucide-react/dist/esm/icons/rocket.mjs";
import { __iconNode as iconSpeech } from "lucide-react/dist/esm/icons/speech.mjs";

type BlockSpec = {
  pos: [number, number];
  color: number;
  symbol: keyof typeof SYMBOL_ICON;
  label: string;
  labelSide: "top" | "bottom" | "left" | "right";
  labelBgOpacity?: number;
  labelTextOpacity?: number;
  labelFontWeight?: string;
};

// Lucide icon mapping. Swap any value for another lucide iconNode to re-skin.
type LucideIconNode = ReadonlyArray<readonly [string, Record<string, unknown>, ...unknown[]]>;
const SYMBOL_ICON = {
  spring: iconFrown as unknown as LucideIconNode,
  shield: iconWaypoints as unknown as LucideIconNode,
  handshake: iconBrain as unknown as LucideIconNode,
  node: iconLandmark as unknown as LucideIconNode,
  rocket: iconRocket as unknown as LucideIconNode,
  mountain: iconSpeech as unknown as LucideIconNode,
} as const;

const BLOCKS: BlockSpec[] = [
  { pos: [-9, 1], color: 0xffb84d, symbol: "spring", label: "YOUR BUSINESS RUNS\nON SCATTERED DATA.", labelSide: "bottom", labelBgOpacity: 0.92, labelTextOpacity: 1, labelFontWeight: "500" },
  { pos: [-2, -3], color: 0xff5a7a, symbol: "shield", label: "WE CONNECT EVERY\nAPP, DOCUMENT,\nAND WORKFLOW.", labelSide: "top" },
  { pos: [2, 0], color: 0x6cd4ff, symbol: "handshake", label: "AI HANDLES THE\nREPETITIVE WORK\nFOR YOUR TEAM.", labelSide: "top" },
  { pos: [2, 5], color: 0xd16cff, symbol: "node", label: "HOURS BECOME MINUTES.\nCOSTS BECOME SAVINGS.", labelSide: "bottom" },
  { pos: [10, -2.5], color: 0x55ee9a, symbol: "rocket", label: "WORK SMARTER.\nSCALE FASTER.", labelSide: "top" },
  { pos: [13.5, 5.5], color: 0xff6cd4, symbol: "mountain", label: "CONTROL WITH HUMAN\nIN THE LOOP.", labelSide: "bottom" },
];

// Sequence indices following the orange trail
const SEQUENCE = [0, 1, 2, 3, 4, 5];

// Scroll budget: animation scrubs over the first segment; the rest is a release
// zone so users can keep scrolling into the page after the last block pops.
const ANIMATION_SCROLL_VH = 300;
const RELEASE_SCROLL_VH = 100;
const TOTAL_SCROLL_VH = ANIMATION_SCROLL_VH + RELEASE_SCROLL_VH;
// How quickly the scene brightens once the user starts scrolling (viewport heights).
const SCENE_REVEAL_VH = 0.22;

// ---------------------------------------------------------------------------
// Lucide → SVG string. Walks the lucide IconNode tuple structure and emits a
// standalone <svg> with the canonical lucide stroke attrs. `stroke` colour is
// parameterised so we can render shadow / highlight / body passes.
// ---------------------------------------------------------------------------
function iconNodeToSvg(node: LucideIconNode, stroke: string): string {
  const children = node
    .map(([tag, attrs]) => {
      const a = Object.entries(attrs)
        .filter(([k]) => k !== "key")
        .map(([k, v]) => `${k}="${String(v)}"`)
        .join(" ");
      return `<${tag} ${a} />`;
    })
    .join("");
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ` +
    `fill="none" stroke="${stroke}" stroke-width="2.25" ` +
    `stroke-linecap="round" stroke-linejoin="round">${children}</svg>`
  );
}

// Rasterise a lucide icon to an HTMLImageElement (async via data URL).
function loadIconImage(node: LucideIconNode, stroke: string): Promise<HTMLImageElement> {
  const svg = iconNodeToSvg(node, stroke);
  const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

// Paint a single icon image into ctx with the 3D emboss helper. Same
// shadow + highlight + body pass that the old drawSymbol used.
function paintEmbossedIcon(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  imgHighlight: HTMLImageElement,
  size: number,
) {
  const pad = size * 0.16;
  const drawAt = (src: CanvasImageSource, dx: number, dy: number) => {
    ctx.drawImage(src, pad + dx, pad + dy, size - pad * 2, size - pad * 2);
  };

  // Pass 1 — soft drop shadow
  ctx.save();
  ctx.globalAlpha = 0.4;
  ctx.filter = "blur(4px)";
  drawAt(img, size * 0.025, size * 0.03);
  ctx.restore();

  // Pass 2 — highlight, offset up-left
  ctx.save();
  ctx.globalAlpha = 0.55;
  drawAt(imgHighlight, -size * 0.012, -size * 0.012);
  ctx.restore();

  // Pass 3 — dark body on register
  drawAt(img, 0, 0);
}

// Cache per symbol so we don't re-decode SVGs for every block.
const _decalCache = new Map<BlockSpec["symbol"], THREE.CanvasTexture>();

function makeSymbolDecalTexture(symbol: BlockSpec["symbol"]) {
  const cached = _decalCache.get(symbol);
  if (cached) return cached;

  const size = 256;
  const cnv = document.createElement("canvas");
  cnv.width = cnv.height = size;
  const ctx = cnv.getContext("2d")!;

  const tex = new THREE.CanvasTexture(cnv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  _decalCache.set(symbol, tex);

  const node = SYMBOL_ICON[symbol];
  Promise.all([
    loadIconImage(node, "#0a0a0a"),
    loadIconImage(node, "rgba(255,255,255,0.9)"),
  ])
    .then(([body, highlight]) => {
      ctx.clearRect(0, 0, size, size);
      paintEmbossedIcon(ctx, body, highlight, size);
      tex.needsUpdate = true;
    })
    .catch(() => {
      /* leave decal blank on failure — brushed steel still looks fine */
    });

  return tex;
}

// Procedural brushed-metal roughness map — faint horizontal streaks.
let _brushedTex: THREE.CanvasTexture | null = null;
function getBrushedRoughnessTexture() {
  if (_brushedTex) return _brushedTex;
  const size = 512;
  const cnv = document.createElement("canvas");
  cnv.width = cnv.height = size;
  const ctx = cnv.getContext("2d")!;
  ctx.fillStyle = "#7a7a7a"; // mid roughness (~0.18 base, varied by streaks)
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 2200; i++) {
    const y = Math.random() * size;
    const x = Math.random() * size;
    const len = 20 + Math.random() * 120;
    const v = 90 + Math.floor(Math.random() * 60);
    ctx.strokeStyle = `rgba(${v},${v},${v},${0.15 + Math.random() * 0.25})`;
    ctx.lineWidth = 0.6 + Math.random() * 0.8;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + len, y + (Math.random() - 0.5) * 0.6);
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(cnv);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 2);
  tex.anisotropy = 8;
  _brushedTex = tex;
  return tex;
}

function makeLabelSprite(
  text: string,
  opts?: { bgOpacity?: number; textOpacity?: number; fontWeight?: string }
) {
  const lines = text.split("\n");
  const pad = 28;
  const fontSize = 28;
  const lineH = fontSize * 1.35;
  const cnv = document.createElement("canvas");
  const ctx = cnv.getContext("2d")!;
  const fontWeight = opts?.fontWeight ?? "300";
  ctx.font = `${fontWeight} ${fontSize}px Inter, system-ui, sans-serif`;
  const widths = lines.map((l) => ctx.measureText(l).width);
  const w = Math.ceil(Math.max(...widths) + pad * 2);
  const h = Math.ceil(lineH * lines.length + pad);
  cnv.width = w * 2;
  cnv.height = h * 2;
  const c = cnv.getContext("2d")!;
  c.scale(2, 2);
  // bubble — black mask
  const radius = h / 2;
  const bgOpacity = opts?.bgOpacity ?? 0.72;
  c.fillStyle = `rgba(0,0,0,${bgOpacity})`;
  c.beginPath();
  c.moveTo(radius, 0);
  c.lineTo(w - radius, 0);
  c.quadraticCurveTo(w, 0, w, radius);
  c.lineTo(w, h - radius);
  c.quadraticCurveTo(w, h, w - radius, h);
  c.lineTo(radius, h);
  c.quadraticCurveTo(0, h, 0, h - radius);
  c.lineTo(0, radius);
  c.quadraticCurveTo(0, 0, radius, 0);
  c.closePath();
  c.fill();
  const textOpacity = opts?.textOpacity ?? 0.82;
  c.fillStyle = `rgba(255,255,255,${textOpacity})`;
  c.font = `${fontWeight} ${fontSize}px Inter, system-ui, sans-serif`;
  c.textBaseline = "middle";
  c.textAlign = "center";
  lines.forEach((line, i) => {
    c.fillText(line, w / 2, pad / 2 + lineH * (i + 0.5));
  });
  const tex = new THREE.CanvasTexture(cnv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, depthTest: false });
  const sprite = new THREE.Sprite(mat);
  sprite.renderOrder = 999;
  const scale = 0.010;
  sprite.scale.set(w * scale, h * scale, 1);
  return sprite;
}

type BlockHandle = {
  group: THREE.Group;
  body: THREE.Group;
  bodyMat: THREE.MeshStandardMaterial;
  reflMat: THREE.MeshBasicMaterial;
  decalMat: THREE.MeshBasicMaterial;
  color: THREE.Color;
  labelMat: THREE.SpriteMaterial;
  leaderMat: THREE.LineBasicMaterial;
  dotMat: THREE.MeshBasicMaterial;
  activatedAt: number | null;
};

function createBlock(spec: BlockSpec): BlockHandle {
  const group = new THREE.Group();
  const body = new THREE.Group();
  group.add(body);
  const color = new THREE.Color(spec.color);

  // ── Frosted-glass base plate (larger footprint, sits on the floor)
  const glassW = 2.6; // ~8% larger than body (2.4)
  const glassH = 0.12;
  const glassGeo = new RoundedBoxGeometry(glassW, glassH, glassW, 12, 0.32);
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xbcd0e0,
    metalness: 0,
    roughness: 0.25,
    transmission: 0.85,
    thickness: 0.4,
    ior: 1.45,
    transparent: true,
    opacity: 0.35,
    clearcoat: 1,
    clearcoatRoughness: 0.15,
  });
  const glassPlate = new THREE.Mesh(glassGeo, glassMat);
  glassPlate.position.y = glassH / 2;
  body.add(glassPlate);

  // ── Brushed silver/chrome main body — rounded corners, soft bevel
  const bodyW = 2.4;
  const bodyH = 0.75;
  const bevel = bodyW * 0.12; // ~12% bevel radius
  const bodyGeo = new RoundedBoxGeometry(bodyW, bodyH, bodyW, 6, bevel);
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xc8c2b8, // warm stainless undertone
    metalness: 1.0,
    roughness: 0.55,
    roughnessMap: getBrushedRoughnessTexture(),
    envMapIntensity: 0.55,
    emissive: new THREE.Color(0x000000),
  });
  const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
  // body sits directly on top of the glass plate
  bodyMesh.position.y = glassH + bodyH / 2;
  body.add(bodyMesh);

  // ── Symbol decal sitting on the top face of the body
  const decalTex = makeSymbolDecalTexture(spec.symbol);
  const decalMat = new THREE.MeshBasicMaterial({
    map: decalTex,
    transparent: true,
    depthWrite: false,
  });
  const decalSize = bodyW - bevel * 1.4;
  const decal = new THREE.Mesh(new THREE.PlaneGeometry(decalSize, decalSize), decalMat);
  decal.rotation.x = -Math.PI / 2;
  decal.position.y = glassH + bodyH + 0.002;
  body.add(decal);

  // Reflection on floor (colored, fades in on activation)
  const reflGeo = new THREE.PlaneGeometry(2.6, 2.6);
  const reflMat = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide,
  });
  const refl = new THREE.Mesh(reflGeo, reflMat);
  refl.rotation.x = -Math.PI / 2;
  refl.position.y = 0.002;
  group.add(refl); // stays on ground, not lifted with body

  // Label
  const label = makeLabelSprite(spec.label, {
    bgOpacity: spec.labelBgOpacity,
    textOpacity: spec.labelTextOpacity,
    fontWeight: spec.labelFontWeight,
  });
  const labelMat = label.material as THREE.SpriteMaterial;
  labelMat.opacity = 0;
  label.layers.set(1);
  // Anchor on the block (top corner near label) and offset label away with a leader line
  let anchor = new THREE.Vector3(0, 0.95, 0);
  let labelPos = new THREE.Vector3();
  const dist = 3.2;
  switch (spec.labelSide) {
    case "top":
      anchor.set(0, 0.95, -1);
      labelPos.set(0, 1.6, -dist);
      break;
    case "bottom":
      anchor.set(0, 0.95, 1);
      labelPos.set(0, 0.4, dist);
      break;
    case "left":
      anchor.set(-1, 0.95, 0);
      labelPos.set(-dist, 0.8, 0);
      break;
    case "right":
      anchor.set(1, 0.95, 0);
      labelPos.set(dist, 0.8, 0);
      break;
  }
  label.position.copy(labelPos);
  group.add(label);

  // Leader line from anchor to label
  const leaderGeo = new THREE.BufferGeometry().setFromPoints([
    anchor,
    new THREE.Vector3(labelPos.x, anchor.y, labelPos.z),
    labelPos.clone().setY(labelPos.y),
  ]);
  const leaderMat = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0,
  });
  const leader = new THREE.Line(leaderGeo, leaderMat);
  leader.layers.set(1);
  leader.visible = false;

  // Small dot at the anchor
  const dotMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0,
  });
  const dot = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 12), dotMat);
  dot.position.copy(anchor);
  dot.layers.set(1);
  dot.visible = false;

  group.position.set(spec.pos[0], 0, spec.pos[1]);
  return {
    group,
    body,
    bodyMat,
    reflMat,
    decalMat,
    color,
    labelMat,
    leaderMat,
    dotMat,
    activatedAt: null,
  };
}

function buildPath(): THREE.Vector3[] {
  // Build a right-angled trail through the blocks in SEQUENCE,
  // starting off-screen left of block 0.
  const pts: THREE.Vector3[] = [];
  const y = 0.25;
  const start = BLOCKS[SEQUENCE[0]].pos;
  pts.push(new THREE.Vector3(start[0] - 6, y, start[1] - 2.5));
  pts.push(new THREE.Vector3(start[0], y, start[1] - 2.5));
  pts.push(new THREE.Vector3(start[0], y, start[1]));

  for (let i = 1; i < SEQUENCE.length; i++) {
    const prev = BLOCKS[SEQUENCE[i - 1]].pos;
    const cur = BLOCKS[SEQUENCE[i]].pos;
    // route: horizontal then vertical with a small offset so segments don't overlap blocks
    const midX = (prev[0] + cur[0]) / 2;
    pts.push(new THREE.Vector3(midX, y, prev[1]));
    pts.push(new THREE.Vector3(midX, y, cur[1]));
    pts.push(new THREE.Vector3(cur[0], y, cur[1]));
  }
  return pts;
}

export default function IsometricScene({ children }: { children?: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const resetRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    mount.appendChild(renderer.domElement);

    // Environment map so PBR metal/glass actually reflects something
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.35));
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.1);
    keyLight.position.set(12, 22, 8);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0xbcd0e0, 0.4);
    fillLight.position.set(-10, 8, -6);
    scene.add(fillLight);

    // Ortho camera — locked isometric view, sized so the scene fills the
    // viewport with no horizontal gaps regardless of aspect ratio.
    const CONTENT_HALF_W = 15; // half of horizontal world span to keep visible
    const CONTENT_HALF_H = 7.5; // half of vertical world span to keep visible
    const aspect = () => mount.clientWidth / mount.clientHeight;
    const computeFrustum = () => Math.max(CONTENT_HALF_W / aspect(), CONTENT_HALF_H);
    let frustum = computeFrustum();
    const camera = new THREE.OrthographicCamera(
      -frustum * aspect(),
      frustum * aspect(),
      frustum,
      -frustum,
      0.1,
      200,
    );
    camera.position.set(18, 11, 18);
    camera.lookAt(2, 0, 1);

    // Allow native page scroll over the canvas (OrbitControls sets touch-action: none).
    renderer.domElement.style.touchAction = "pan-y";

    // Mirrored glass floor beneath the grid
    const mirror = new Reflector(new THREE.PlaneGeometry(120, 120), {
      color: 0x889098,
      textureWidth: Math.floor(window.innerWidth * window.devicePixelRatio),
      textureHeight: Math.floor(window.innerHeight * window.devicePixelRatio),
    });
    mirror.rotation.x = -Math.PI / 2;
    mirror.position.y = -0.01;
    scene.add(mirror);
    // Mirror must not reflect text/leaders. The Reflector clones the main
    // camera (inheriting its layers), so we override getReflectionCamera to
    // restrict the reflection to layer 0 only. Labels live on layer 1.
    const reflectorAny = mirror as unknown as {
      getReflectionCamera: (cam: THREE.Camera) => THREE.Camera;
    };
    const origGetCam = reflectorAny.getReflectionCamera.bind(mirror);
    reflectorAny.getReflectionCamera = (cam: THREE.Camera) => {
      const rc = origGetCam(cam);
      rc.layers.disableAll();
      rc.layers.enable(0);
      return rc;
    };
    camera.layers.enable(0);
    camera.layers.enable(1);

    // Translucent glass tint plate on top of mirror so reflections look like glass
    const glassMat = new THREE.MeshBasicMaterial({
      color: 0x0a0d14,
      transparent: true,
      opacity: 0.55,
    });
    const glass = new THREE.Mesh(new THREE.PlaneGeometry(120, 120), glassMat);
    glass.rotation.x = -Math.PI / 2;
    glass.position.y = 0.0;
    scene.add(glass);

    // Grid (silver lining, bigger cells)
    const grid = new THREE.GridHelper(80, 20, 0xc8ced8, 0x6a7382);
    (grid.material as THREE.Material).transparent = true;
    const gridMat = grid.material as THREE.Material & { opacity: number };
    gridMat.opacity = 0.7;
    grid.position.y = 0.001;
    scene.add(grid);

    // Blocks (aluminum until trail hits them)
    const handles: BlockHandle[] = BLOCKS.map((spec) => {
      const h = createBlock(spec);
      scene.add(h.group);
      return h;
    });

    // Orange trail
    const pathPts = buildPath();
    const curve = new THREE.CatmullRomCurve3(pathPts, false, "catmullrom", 0.1);
    // Activation t for each block along the curve (block i is point index 2 + 3*i)
    const segments = pathPts.length - 1;
    // Small bias so blocks only light up once the orange has clearly arrived
  const activationT = BLOCKS.map((_, i) => {
      const base = (2 + 3 * i) / segments + 0.015;
      // Pop blue, purple and green slightly earlier so they don't feel late
      const offset = i === 2 ? -0.03 : i === 3 ? -0.13 : i === 4 ? -0.04 : i === 5 ? -0.025 : 0;
      return Math.min(1, base + offset);
    });
    const LABEL_FADE_MS = 500;
    const tubeSegments = 600;
    const tubeGeo = new THREE.TubeGeometry(curve, tubeSegments, 0.056, 12, false);
    const tubeMat = new THREE.MeshBasicMaterial({ color: 0xff7a3d });
    const tube = new THREE.Mesh(tubeGeo, tubeMat);
    scene.add(tube);

    // Glow tube
    const glowGeo = new THREE.TubeGeometry(curve, tubeSegments, 0.154, 12, false);
    const glowMat = new THREE.MeshBasicMaterial({ color: 0xff6a2a, transparent: true, opacity: 0.25 });
    const glowTube = new THREE.Mesh(glowGeo, glowMat);
    scene.add(glowTube);

    // Animate draw range
    const totalIndex = tubeGeo.index!.count;
    const totalGlowIndex = glowGeo.index!.count;
    tubeGeo.setDrawRange(0, 0);
    glowGeo.setDrawRange(0, 0);

    // Spark burst pool — one per block
    type Spark = {
      mesh: THREE.Mesh;
      mat: THREE.MeshBasicMaterial;
      bornAt: number | null;
    };
    const sparks: Spark[] = BLOCKS.map((spec) => {
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(spec.color).lerp(new THREE.Color(0xffffff), 0.4),
        transparent: true,
        opacity: 0,
      });
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.5, 24, 24), mat);
      mesh.position.set(spec.pos[0], 0.7, spec.pos[1]);
      mesh.visible = false;
      scene.add(mesh);
      return { mesh, mat, bornAt: null };
    });

    // Map scroll to animation progress over ANIMATION_SCROLL_VH only; scrolling
    // past that keeps the scene in its finished state while the hero unpins.
    const getScrollP = () => {
      const root = rootRef.current;
      if (!root) return 0;
      const animScrollRoom = (ANIMATION_SCROLL_VH / 100) * window.innerHeight;
      if (animScrollRoom <= 0) return 0;
      const scrolled = Math.max(0, -root.getBoundingClientRect().top);
      return Math.min(1, scrolled / animScrollRoom);
    };

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      const a = w / h;
      frustum = computeFrustum();
      camera.left = -frustum * a;
      camera.right = frustum * a;
      camera.top = frustum;
      camera.bottom = -frustum;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    const ACTIVATE_MS = 700;
    const SPARK_MS = 600;
    const RESTING_LIFT = 0.18;

    // Click → re-trigger that block's animation
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const downPos = { x: 0, y: 0 };
    const onPointerDown = (e: PointerEvent) => {
      downPos.x = e.clientX;
      downPos.y = e.clientY;
    };
    const onPointerUp = (e: PointerEvent) => {
      // ignore drags
      if (Math.hypot(e.clientX - downPos.x, e.clientY - downPos.y) > 6) return;
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      // collect candidate meshes per block
      for (const h of handles) {
        const hits = raycaster.intersectObject(h.body, true);
        if (hits.length) {
          h.activatedAt = performance.now();
          const idx = handles.indexOf(h);
          sparks[idx].bornAt = performance.now();
          break;
        }
      }
    };
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointerup", onPointerUp);

    resetRef.current = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      handles.forEach((h) => {
        h.activatedAt = null;
        h.bodyMat.color.setHex(0xc8c2b8);
        h.bodyMat.emissive.setHex(0x000000);
        h.bodyMat.roughness = 0.55;
        h.bodyMat.envMapIntensity = 0.55;
        h.body.position.y = 0;
        h.reflMat.opacity = 0;
        h.labelMat.opacity = 0;
        h.leaderMat.opacity = 0;
        h.dotMat.opacity = 0;
      });
      sparks.forEach((s) => {
        s.bornAt = null;
        s.mat.opacity = 0;
        s.mesh.visible = false;
      });
      tubeGeo.setDrawRange(0, 0);
      glowGeo.setDrawRange(0, 0);
    };

    let raf = 0;
    let smoothedEased = 0;
    const LERP = 0.04;

    const tick = () => {
      const now = performance.now();
      const target = getScrollP();
      smoothedEased += (target - smoothedEased) * LERP;

      tubeGeo.setDrawRange(0, Math.floor(totalIndex * smoothedEased));
      glowGeo.setDrawRange(0, Math.floor(totalGlowIndex * smoothedEased));

      // Fade the scene in as the user scrolls — subdued at rest but ≥~10% visible.
      const scrolledPx = rootRef.current
        ? Math.max(0, -rootRef.current.getBoundingClientRect().top)
        : 0;
      const reveal = Math.min(1, scrolledPx / (window.innerHeight * SCENE_REVEAL_VH));
      mount.style.opacity = String(0.38 + reveal * 0.62);
      if (veilRef.current) {
        veilRef.current.style.opacity = String(0.68 * (1 - reveal));
      }
      gridMat.opacity = 0.28 + reveal * 0.42;

      // Which label should be visible right now?
      let currentLabelIdx = -1;
      for (let i = 0; i < handles.length; i++) {
        if (smoothedEased >= activationT[i]) currentLabelIdx = i;
      }

      // Activation triggers
      const baseSilver = new THREE.Color(0xc8c2b8);
      handles.forEach((h, i) => {
        if (h.activatedAt == null && smoothedEased >= activationT[i]) {
          h.activatedAt = now;
          sparks[i].bornAt = now;
        }
        // Scrubbing backwards past the activation point resets the block.
        if (h.activatedAt != null && smoothedEased < activationT[i] - 0.005) {
          h.activatedAt = null;
          h.body.position.y = 0;
          h.bodyMat.color.setHex(0xc8c2b8);
          h.bodyMat.emissive.setHex(0x000000);
          h.bodyMat.roughness = 0.55;
          h.bodyMat.envMapIntensity = 0.55;
          h.reflMat.opacity = 0;
          h.labelMat.opacity = 0;
          h.leaderMat.opacity = 0;
          h.dotMat.opacity = 0;
        }
        if (h.activatedAt != null) {
          const a = Math.min(1, (now - h.activatedAt) / ACTIVATE_MS);
          // Jump: arc up then settle
          const hop = Math.sin(Math.PI * a) * 0.8;
          const settle = RESTING_LIFT * a;
          h.body.position.y = hop * (1 - a) + settle;
          // Tint the brushed metal toward the block color + emissive pop
          h.bodyMat.color.copy(baseSilver).lerp(h.color, 0.85 * a);
          h.bodyMat.emissive.copy(h.color).multiplyScalar(0.35 * a);
          h.bodyMat.roughness = 0.55 - 0.37 * a;
          h.bodyMat.envMapIntensity = 0.55 + 0.55 * a;
          h.reflMat.opacity = 0.22 * a;
          // Exclusive label: only the current block's label shows, fully opaque
          const isCurrent = i === currentLabelIdx;
          h.labelMat.opacity = isCurrent ? 1 : 0;
          h.leaderMat.opacity = isCurrent ? 0.6 : 0;
          h.dotMat.opacity = isCurrent ? 0.85 : 0;
        }
      });

      // Sparks
      sparks.forEach((s) => {
        if (s.bornAt == null) return;
        const a = (now - s.bornAt) / SPARK_MS;
        if (a >= 1) {
          s.mat.opacity = 0;
          s.mesh.visible = false;
          return;
        }
        s.mesh.visible = true;
        const scale = 0.4 + a * 4;
        s.mesh.scale.setScalar(scale);
        s.mat.opacity = (1 - a) * 0.9;
      });

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointerup", onPointerUp);
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
      resetRef.current = null;
    };
  }, []);

  return (
    <div ref={rootRef} className="relative w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div ref={mountRef} className="absolute inset-0" />
        <div
          ref={veilRef}
          className="pointer-events-none absolute inset-0 z-[5] bg-black"
          style={{ opacity: 0.68 }}
          aria-hidden
        />
        {children ? (
          <div className="pointer-events-none absolute inset-0 z-10">{children}</div>
        ) : null}
        <button
          type="button"
          onClick={() => resetRef.current?.()}
          className="absolute top-20 right-4 z-20 border border-gold/40 bg-black/50 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-gold backdrop-blur-sm transition hover:border-gold hover:bg-black/70 sm:right-8"
        >
          Reset
        </button>
      </div>
      <div style={{ height: `${TOTAL_SCROLL_VH}vh` }} aria-hidden />
    </div>
  );
}