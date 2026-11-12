"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* Brand colors from the ADDMARKPRO logo (see globals.css) */
const CYAN = "#19c4e2";
const CYAN_LIGHT = "#5fe3f6";
const TEAL = "#01849e";
const NAVY = "#0f1b24";

type Props = {
  /** Lower pixel ratio and fewer extras for phones and tablets. */
  lite?: boolean;
  /** Freeze continuous motion (prefers-reduced-motion). */
  still?: boolean;
  /** Pause the render loop while off screen. */
  paused?: boolean;
};

function Stage({ lite, still, paused, camera, children }: Props & { camera: [number, number, number]; children: React.ReactNode }) {
  return (
    <Canvas
      // Decoration only: it must never capture taps or block scrolling.
      style={{ pointerEvents: "none" }}
      dpr={lite ? [1, 1.5] : [1, 2]}
      camera={{ position: camera, fov: 36 }}
      gl={{ antialias: true, alpha: true }}
      frameloop={paused ? "never" : still ? "demand" : "always"}
    >
      {children}
    </Canvas>
  );
}

/** Slow sway plus mouse parallax for a whole composition. */
function Rig({ children, still, sway = 0.3 }: { children: React.ReactNode; still: boolean; sway?: number }) {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Listen on window: the canvas itself has pointer-events disabled.
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame(({ clock }, dt) => {
    const g = group.current;
    if (!g || still) return;
    const k = 1 - Math.exp(-dt * 3);
    const t = clock.elapsedTime;
    g.rotation.y += (Math.sin(t * 0.4) * sway + pointer.current.x * 0.45 - g.rotation.y) * k;
    g.rotation.x += (pointer.current.y * 0.18 - g.rotation.x) * k;
    g.position.y = Math.sin(t * 0.9) * 0.07;
  });

  return <group ref={group}>{children}</group>;
}

/* ───────────────────────── Growth: rising bars and the logo arrow ───────────────────────── */

const BARS = [0.9, 1.4, 1.15, 2.0, 2.7, 3.4];
const BAR_GAP = 0.74;
const barX = (i: number) => (i - (BARS.length - 1) / 2) * BAR_GAP;

export function GrowthScene({ lite = false, still = false, paused = false }: Props) {
  return (
    <Stage lite={lite} still={still} paused={paused} camera={[4.6, 3.1, 9.4]}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[-3, 6, 5]} intensity={1.8} color="#e8fbff" />
      <pointLight position={[3, 3, 4]} intensity={40} distance={16} color={CYAN} />
      <pointLight position={[-4, 1, -3]} intensity={18} distance={14} color={TEAL} />
      <Rig still={still}>
        <group position={[0, -1.9, 0]}>
          <Platform />
          <Bars still={still} />
          <GrowthArrow still={still} />
          <Sparks count={lite ? 40 : 90} still={still} />
        </group>
      </Rig>
    </Stage>
  );
}

function Platform() {
  return (
    <group>
      <mesh position={[0, -0.06, 0]}>
        <cylinderGeometry args={[3.1, 3.3, 0.12, 72]} />
        <meshStandardMaterial color="#0b1c26" metalness={0.7} roughness={0.3} emissive="#02303d" emissiveIntensity={0.5} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <ringGeometry args={[3.0, 3.06, 96]} />
        <meshBasicMaterial color={CYAN_LIGHT} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.004, 0]}>
        <ringGeometry args={[2.2, 2.215, 96]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.003, 0]}>
        <circleGeometry args={[3.0, 72]} />
        <meshBasicMaterial color={TEAL} transparent opacity={0.12} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Bars({ still }: { still: boolean }) {
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const colors = useMemo(
    () => BARS.map((_, i) => `#${new THREE.Color(TEAL).lerp(new THREE.Color(CYAN_LIGHT), i / (BARS.length - 1)).getHexString()}`),
    [],
  );

  useFrame(({ clock }) => {
    if (still) return;
    const t = clock.elapsedTime;
    refs.current.forEach((m, i) => {
      if (!m) return;
      // Each bar grows in turn, then keeps breathing slightly.
      const p = Math.min(1, Math.max(0, (t - 0.3 - i * 0.14) / 0.9));
      const eased = 1 - Math.pow(1 - p, 3);
      const h = Math.max(BARS[i] * eased * (1 + Math.sin(t * 1.4 + i * 0.8) * 0.04), 0.001);
      m.scale.y = h;
      m.position.y = h / 2;
    });
  });

  return (
    <>
      {BARS.map((h, i) => (
        <mesh
          key={i}
          ref={(m) => {
            refs.current[i] = m;
          }}
          position={[barX(i), h / 2, 0]}
          scale={[1, h, 1]}
        >
          <boxGeometry args={[0.46, 1, 0.46]} />
          <meshStandardMaterial color={colors[i]} emissive={colors[i]} emissiveIntensity={0.22} metalness={0.35} roughness={0.3} />
        </mesh>
      ))}
    </>
  );
}

/** The rising arrow from the logo, drawn as a glowing tube above the bars. */
function GrowthArrow({ still }: { still: boolean }) {
  const tubeRef = useRef<THREE.Mesh>(null);
  const headRef = useRef<THREE.Mesh>(null);

  const { geometry, tip, quaternion } = useMemo(() => {
    const pts = [
      new THREE.Vector3(barX(0) - 0.7, 1.1, 0.5),
      ...BARS.map((h, i) => new THREE.Vector3(barX(i), h + 0.6, 0.5)),
      new THREE.Vector3(barX(BARS.length - 1) + 0.75, BARS[BARS.length - 1] + 1.35, 0.5),
    ];
    const curve = new THREE.CatmullRomCurve3(pts);
    const end = curve.getPoint(1);
    const dir = curve.getTangent(1).normalize();
    return {
      geometry: new THREE.TubeGeometry(curve, 96, 0.05, 10),
      tip: end,
      quaternion: new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir),
    };
  }, []);
  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame(({ clock }) => {
    if (still) return;
    const total = geometry.index ? geometry.index.count : 0;
    const p = Math.min(1, Math.max(0, (clock.elapsedTime - 0.9) / 1.5));
    geometry.setDrawRange(0, Math.floor((total * p) / 3) * 3);
    if (headRef.current) headRef.current.visible = p >= 1;
  });

  return (
    <>
      <mesh ref={tubeRef} geometry={geometry}>
        <meshBasicMaterial color="#d9f8ff" toneMapped={false} />
      </mesh>
      <mesh ref={headRef} position={tip} quaternion={quaternion}>
        <coneGeometry args={[0.2, 0.5, 20]} />
        <meshBasicMaterial color="#d9f8ff" toneMapped={false} />
      </mesh>
    </>
  );
}

function Sparks({ count, still }: { count: number; still: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.2 + Math.random() * 2.6;
      const th = Math.random() * Math.PI * 2;
      p[i * 3] = Math.cos(th) * r;
      p[i * 3 + 1] = 0.3 + Math.random() * 4.6;
      p[i * 3 + 2] = Math.sin(th) * r;
    }
    return p;
  }, [count]);

  useFrame((_, dt) => {
    if (ref.current && !still) ref.current.rotation.y += dt * 0.06;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={CYAN_LIGHT} size={0.05} sizeAttenuation transparent opacity={0.7} depthWrite={false} toneMapped={false} />
    </points>
  );
}

/* ───────────────────────── Courses: graduation cap over a stack of books ───────────────────────── */

export function CoursesScene({ lite = false, still = false, paused = false }: Props) {
  return (
    <Stage lite={lite} still={still} paused={paused} camera={[3.3, 2.3, 7.6]}>
      <ambientLight intensity={1.15} />
      <directionalLight position={[3, 6, 5]} intensity={2.4} />
      <directionalLight position={[-4, 2, -3]} intensity={0.9} color={CYAN_LIGHT} />
      <Rig still={still} sway={0.4}>
        <group position={[0, -0.25, 0]}>
          <Books />
          <Cap still={still} />
          <SkillOrbit still={still} />
          {/* soft contact shadow so the stack sits on the light panel */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.42, 0]}>
            <circleGeometry args={[2.1, 48]} />
            <meshBasicMaterial color="#0a1218" transparent opacity={0.1} depthWrite={false} />
          </mesh>
        </group>
      </Rig>
    </Stage>
  );
}

const BOOKS = [
  { y: -1.2, rot: 0.14, cover: CYAN, w: 2.5 },
  { y: -0.84, rot: -0.2, cover: "#172733", w: 2.3 },
  { y: -0.48, rot: 0.08, cover: TEAL, w: 2.4 },
];

function Books() {
  return (
    <>
      {BOOKS.map((b) => (
        <group key={b.y} position={[0, b.y, 0]} rotation={[0, b.rot, 0]}>
          <mesh>
            <boxGeometry args={[b.w, 0.34, 1.7]} />
            <meshStandardMaterial color={b.cover} metalness={0.15} roughness={0.45} />
          </mesh>
          {/* pages, visible on the front and right edges */}
          <mesh position={[0.05, 0, 0.04]}>
            <boxGeometry args={[b.w, 0.24, 1.7]} />
            <meshStandardMaterial color="#f4f7f9" roughness={0.9} />
          </mesh>
        </group>
      ))}
    </>
  );
}

function Cap({ still }: { still: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current || still) return;
    const t = clock.elapsedTime;
    ref.current.position.y = 0.95 + Math.sin(t * 1.2) * 0.12;
    ref.current.rotation.y = t * 0.45;
    ref.current.rotation.z = Math.sin(t * 0.8) * 0.06;
  });
  const corner = 2.3 / Math.SQRT2;
  return (
    <group ref={ref} position={[0, 0.95, 0]} rotation={[0.12, 0.5, 0]}>
      {/* board */}
      <mesh rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[2.3, 0.1, 2.3]} />
        <meshStandardMaterial color={NAVY} metalness={0.5} roughness={0.35} />
      </mesh>
      <mesh rotation={[0, Math.PI / 4, 0]} position={[0, -0.06, 0]}>
        <boxGeometry args={[2.36, 0.03, 2.36]} />
        <meshBasicMaterial color={CYAN} toneMapped={false} />
      </mesh>
      {/* skull cap */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.8, 0.92, 0.68, 40]} />
        <meshStandardMaterial color="#172733" metalness={0.4} roughness={0.4} />
      </mesh>
      {/* button, cord and tassel */}
      <mesh position={[0, 0.09, 0]}>
        <sphereGeometry args={[0.1, 20, 20]} />
        <meshBasicMaterial color={CYAN_LIGHT} toneMapped={false} />
      </mesh>
      <mesh position={[corner / 2, 0.075, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.025, 0.025, corner, 8]} />
        <meshBasicMaterial color={CYAN} toneMapped={false} />
      </mesh>
      <mesh position={[corner, -0.3, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.75, 8]} />
        <meshBasicMaterial color={CYAN} toneMapped={false} />
      </mesh>
      <mesh position={[corner, -0.78, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.11, 0.3, 16]} />
        <meshBasicMaterial color={CYAN_LIGHT} toneMapped={false} />
      </mesh>
    </group>
  );
}

/** A tilted ring with small gems travelling around it, one per idea of "skills in orbit". */
function SkillOrbit({ still }: { still: boolean }) {
  const orbit = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (orbit.current && !still) orbit.current.rotation.z += dt * 0.35;
  });
  const gems = [0, 1, 2, 3, 4];
  const R = 2.75;
  return (
    <group rotation={[1.32, 0.18, 0.1]}>
      <mesh>
        <torusGeometry args={[R, 0.012, 8, 160]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.7} />
      </mesh>
      <group ref={orbit}>
        {gems.map((i) => {
          const a = (i / gems.length) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * R, Math.sin(a) * R, 0]}>
              <icosahedronGeometry args={[i % 2 ? 0.13 : 0.18, 0]} />
              <meshStandardMaterial color={i % 2 ? TEAL : CYAN} metalness={0.3} roughness={0.25} flatShading />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}
